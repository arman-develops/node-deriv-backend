import { config } from 'dotenv';
config();

const app_id = process.env.DERIV_APP_ID;
const token = process.env.DERIV_APP_TOKEN;

// import DerivAPIBasic from 'https://cdn.skypack.dev/@deriv/deriv-api/dist/DerivAPIBasic';
import DerivAPIBasic from '@deriv/deriv-api/dist/DerivAPIBasic.js';


function getWsConnection() {
    const connection = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${app_id}`);

    const api = new DerivAPIBasic({connection});
    return({connection, api});
}


function getAccountToken(Useraccount){
    try {
      let account_token;
      const token_data_object = localStorage.getItem('token_data_object');
      const token_data = JSON.parse(token_data_object);
      const account = Useraccount;
      Object.values(token_data).forEach((item) => {
        if(account === item.account) {
          account_token = item.token;
        }
      });
      return account_token; 
    }catch(err) {
      console.log(err.error.message);
    }
}

export {app_id, token, getWsConnection, getAccountToken}