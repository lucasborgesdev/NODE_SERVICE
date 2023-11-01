"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BlackFridayService = void 0;

var _string = require("../helpers/string");

var _clientS = require("@aws-sdk/client-s3");

var _crypto = _interopRequireDefault(require("crypto"));

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class BlackFridayService {
  s3Client = new _clientS.S3Client({
    region: 'us-east-1',
    credentials: {
      accessKeyId: process && process.env && process.env.AWS_ACCESS_KEY_ID || "AKIA46EFKALDVR3CTBLM",
      secretAccessKey: process && process.env && process.env.AWS_SECRET_ACCESS_KEY || "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"
    }
  });
  getContentSha256 = payload => {
    const hash = _crypto.default.createHash('sha256');

    hash.update(payload);
    return hash.digest('hex');
  };
  getBucketKey = () => {
    const uniq = this.getContentSha256((0, _string.generateRandomString)(10));
    const date = (0, _dayjs.default)().format('YYYYMMDD');
    const env = (process && process.env && process.env.OCC_STORE_URL || "https://p7724145c1tst-store.occa.ocs.oraclecloud.com").includes('prd') ? 'ECOM-PRD/ECBF-PRD' : 'ECOM-TST/ECBF-TST';
    return `/${env}/occ-promocao-black-friday-${date}-${uniq}.txt`;
  };
  sendMessage = async payload => {
    const key = this.getBucketKey();
    const command = new _clientS.PutObjectCommand({
      Bucket: 'salonlinelp',
      Key: key,
      Body: JSON.stringify(payload)
    });
    return this.s3Client.send(command);
  };
}

exports.BlackFridayService = BlackFridayService;