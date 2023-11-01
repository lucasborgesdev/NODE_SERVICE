import { generateRandomString } from '@/helpers/string';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import dayjs from 'dayjs';

interface MessagePayload {
  'full-name': string;
  telephone: string;
  email: string;
  curvature: string;
}

export class BlackFridayService {
  private s3Client = new S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  private getContentSha256 = (payload: string) => {
    const hash = crypto.createHash('sha256');
    hash.update(payload);

    return hash.digest('hex');
  };

  private getBucketKey = () => {
    const uniq = this.getContentSha256(generateRandomString(10));
    const date = dayjs().format('YYYYMMDD');

    const env = process.env.OCC_STORE_URL.includes('prd')
      ? 'ECOM-PRD/ECBF-PRD'
      : 'ECOM-TST/ECBF-TST';

    return `/${env}/occ-promocao-black-friday-${date}-${uniq}.txt`;
  };

  sendMessage = async (payload: MessagePayload) => {
    const key = this.getBucketKey();

    const command = new PutObjectCommand({
      Bucket: 'salonlinelp',
      Key: key,
      Body: JSON.stringify(payload),
    });

    return this.s3Client.send(command);
  };
}
