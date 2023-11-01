"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaqService = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FaqService {
  sendMessage = async payload => {
    let urlFetch = 'https://webto.salesforce.com/servlet/servlet.WebToCase'; //let urlFetch =  'https://webhook.site/a009f063-f25f-4fd5-b3a0-c04c2d71cc8e';

    let params = '?encoding=UTF-8';

    for (const [key, value] of Object.entries(payload)) {
      params += `&${key}=${value.replace(/ /gm, '+')}`;
    }

    const url = new URL(`${urlFetch}${params}`).href;
    const {
      data
    } = await _axios.default.post(url, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return data;
  };
}

exports.FaqService = FaqService;