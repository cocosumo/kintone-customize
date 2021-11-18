import sendMessageToChatWork from './../../../kintone-api/typescript/chatwork';
import generateMessage from './generateMessage';

const cwToken = '7bc795ef967064f642aa70956cde3cad';
const roomId = '213232379';


const sendToChatWork = (event: SaveFields) => {
  sendMessageToChatWork(generateMessage(event), roomId, cwToken);
};

export default sendToChatWork;