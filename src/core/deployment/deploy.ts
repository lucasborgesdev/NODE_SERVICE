import { occAPI } from '@/api';

export async function deploy() {
  try {
    console.log('Connecting to the OCC admin server...');
    const {
      data: { access_token },
    } = await occAPI.login();

    console.log('Uploading bundle file...');
    const {
      data: { success },
    } = await occAPI.uploadExtension(access_token);

    console.log(`${success ? 'Successful' : 'Unsuccessful'} deployment.`);
  } catch (error) {
    console.error(
      'Deployment error.',
      occAPI.getErrorData(error as Error),
    );
  }
}
