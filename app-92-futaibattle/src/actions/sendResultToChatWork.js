import sendMessageToChatWork from '../../../kintone-api/chatwork';
import generateMessage from './generateMessage';
/* Room Ids
* 225800073 test
* 213232379 RPA
* 6732051  本番
*/

const cwToken = '7bc795ef967064f642aa70956cde3cad';
const roomId = '6732051';

const sendResultToChatWork = (event) => {
  const message = generateMessage(event);
  sendMessageToChatWork(message, roomId, cwToken);
};

export default sendResultToChatWork;
