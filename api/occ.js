"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWorkset = void 0;
exports.getErrorData = getErrorData;
exports.listProductsPrice = void 0;
exports.login = login;
exports.updateProductPrices = exports.publish = void 0;
exports.uploadExtension = uploadExtension;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _axios = _interopRequireDefault(require("axios"));

var _formData = _interopRequireDefault(require("form-data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const instanceAdmin = _axios.default.create({
  baseURL: `${process && process.env && process.env.OCC_ADMIN_URL || "https://p7724145c1tst-admin.occa.ocs.oraclecloud.com"}/ccadmin/v1`
});

const instanceStore = _axios.default.create({
  baseURL: `${process && process.env && process.env.OCC_STORE_URL || "https://p7724145c1tst-store.occa.ocs.oraclecloud.com"}/ccstore/v1`,
  headers: {
    Authorization: 'Basic YWRtaW46YWRtaW4='
  }
});

function login() {
  const data = new URLSearchParams();
  data.append('grant_type', 'client_credentials');
  return instanceAdmin.post('login', data, {
    headers: {
      Authorization: `Bearer ${process && process.env && process.env.OCC_APP_KEY || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4ZmQxODRiMC03MTFlLTQzODMtYjZlMS1lNTE3NGFiOGI4MTciLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE3MTI3NTI4NjYsImlhdCI6MTY4MTIxNjg2Nn0=./dUK+fsNJ1qPbVJO9kiSJ3O5MDYiHe74JTuFC+yXE7c="}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

function uploadExtension(access_token) {
  const filePath = _path.default.resolve(process.cwd(), 'dist', 'bundle.zip');

  const data = new _formData.default();
  data.append('filename', `${process && process.env && process.env.SSE_NAME || "faq-sse"}.zip`);
  data.append('uploadType', 'extensions');
  data.append('force', 'true');
  data.append('fileUpload', _fs.default.createReadStream(filePath));
  return instanceAdmin.post('serverExtensions', data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
}

const updateProductPrices = async ({
  body = {},
  worksetId = ''
}) => {
  const {
    data: {
      access_token
    }
  } = await login();
  const {
    data
  } = await instanceAdmin.put('/prices', body, {
    headers: {
      'X-CC-Workset': worksetId,
      Authorization: `Bearer ${access_token}`
    }
  });
  return data;
};

exports.updateProductPrices = updateProductPrices;

const listProductsPrice = async ({
  offset = 0
}) => {
  const {
    data
  } = await instanceStore.get('/products', {
    params: {
      fields: 'id,listPrices,childSKUs.repositoryId',
      limit: 250,
      offset
    }
  });
  return data;
};

exports.listProductsPrice = listProductsPrice;

const publish = async ({
  worksetId = ''
}) => {
  const {
    data: {
      access_token
    }
  } = await login();
  const {
    data
  } = await instanceAdmin.post('/publishingChangeLists/publish', {
    worksetId
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  return data;
};

exports.publish = publish;

const createWorkset = async ({
  name = ''
}) => {
  const {
    data: {
      access_token
    }
  } = await login();
  const {
    data
  } = await instanceAdmin.post('/worksets', {
    name
  }, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  return data;
};

exports.createWorkset = createWorkset;

function getErrorData(error) {
  return _axios.default.isAxiosError(error) && error.response?.data || error.message;
}