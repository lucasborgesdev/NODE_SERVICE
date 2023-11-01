import axios from 'axios';

interface MessagePayload {
  orgid: string;
  retURL: string;
  '00N5f00000hgydC': string;
  '00N5f00000hgycw': string;
  '00N5f00000hgyd0': string;
  '00N5f00000hgydD': string;
  '00N5f00000hgyct': string;
  '00N5f00000hgyfF': string;
  '00N5f00000hgyd7': string;
  '00N5f00000hgyd4': string;
}

export class FaqService {
  sendMessage = async (payload: MessagePayload) => {
    let urlFetch = 'https://webto.salesforce.com/servlet/servlet.WebToCase';
    //let urlFetch =  'https://webhook.site/a009f063-f25f-4fd5-b3a0-c04c2d71cc8e';
    let params = '?encoding=UTF-8';

    for (const [key, value] of Object.entries(payload)) {
      params += `&${key}=${value.replace(/ /gm, '+')}`;
    }

    const url = new URL(`${urlFetch}${params}`).href;

    const { data } = await axios.post(url, null, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return data;
  };
}
