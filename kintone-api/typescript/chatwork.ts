

const sendMessageToChatWork = (body:string, roomId : string, cwToken: string) => {
  const selfUnread = 1;

  const url = `https://api.chatwork.com/v2/rooms/${roomId}/messages`;
  const headers = {
    'X-ChatWorkToken': cwToken,
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const params = `body=${body}&self_unread=${selfUnread}`;

  kintone.proxy(url, 'POST', headers, params).then((args : any) => {
    console.log(args[1], JSON.parse(args[0]), args[2]);
  });
};

export default sendMessageToChatWork;
