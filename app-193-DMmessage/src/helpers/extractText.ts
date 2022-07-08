/**
 * <BODY>タグの中身のみを取得する処理
 * @param content HTMLメール本文
 * @returns string HTMLメール本文
 */
const extractText = (content : string) => {
  // メール本文からBODYの中身だけ取得する
  // console.log('置換前：：', content);
  let newContent = content.replace(/[\s\S]*<body.*>|[\s\S]*<BODY.*>/g, '');
  newContent = newContent.replace(/<\/body>[\s\S]*|<\/BODY>[\s\S]*/g, '');
  newContent = newContent.replace(/[\s]*/, ''); // 文頭の空改行の削除
  // console.log('置換後：：', newContent);

  return newContent;
};

export default extractText;