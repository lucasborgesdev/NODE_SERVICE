import fs from 'fs';
import path from 'path';
import axios, { AxiosResponse } from 'axios';
import FormData from 'form-data';

const instanceAdmin = axios.create({
  baseURL: `${process.env.OCC_ADMIN_URL}/ccadmin/v1`,
});

const instanceStore = axios.create({
  baseURL: `${process.env.OCC_STORE_URL}/ccstore/v1`,
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4=',
  },
});

export function login(): Promise<AxiosResponse<{ access_token: string }>> {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');

  return instanceAdmin.post('login', data, {
    headers: {
      Authorization: `Bearer ${process.env.OCC_APP_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
}

export function uploadExtension(
  access_token: string,
): Promise<AxiosResponse<{ success: boolean }>> {
  const filePath = path.resolve(process.cwd(), 'dist', 'bundle.zip');
  const data = new FormData();
  data.append('filename', `${process.env.SSE_NAME}.zip`);
  data.append('uploadType', 'extensions');
  data.append('force', 'true');
  data.append('fileUpload', fs.createReadStream(filePath));

  return instanceAdmin.post('serverExtensions', data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
}

export const updateProductPrices = async ({
  body = {},
  worksetId = '',
}): Promise<Record<string, any>> => {
  const {
    data: { access_token },
  } = await login();

  const { data } = await instanceAdmin.put('/prices', body, {
    headers: {
      'X-CC-Workset': worksetId,
      Authorization: `Bearer ${access_token}`,
    },
  });

  return data;
};

export const listProductsPrice = async ({
  offset = 0,
}): Promise<Record<string, any>> => {
  const { data } = await instanceStore.get('/products', {
    params: {
      fields: 'id,listPrices,childSKUs.repositoryId',
      limit: 250,
      offset,
    },
  });

  return data;
};

export const publish = async ({
  worksetId = '',
}): Promise<Record<string, any>> => {
  const {
    data: { access_token },
  } = await login();

  const { data } = await instanceAdmin.post(
    '/publishingChangeLists/publish',
    { worksetId },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  return data;
};

export const createWorkset = async ({
  name = '',
}): Promise<Record<string, any>> => {
  const {
    data: { access_token },
  } = await login();

  const { data } = await instanceAdmin.post(
    '/worksets',
    { name },
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );

  return data;
};

export function getErrorData(error: Error) {
  return (axios.isAxiosError(error) && error.response?.data) || error.message;
}
