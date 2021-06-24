import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import downloadjs from 'downloadjs';
import fontURL from '../../assets/fonts/ipaexg.ttf';

// ボタン押下時の処理
async function printEstimate() {
  console.log('New Printesyr');
  // PDFドキュメント生成
  const pdfDoc = await PDFDocument.create();
  // フォント埋込のおまじない
  pdfDoc.registerFontkit(fontkit);
  

  //読み込みフォントのURLß
  //const url = 'https://dl.dropbox.com/s/ywc9c3yhojuwpli/ipaexg.ttf';
  const url = fontURL;

  //フォントを読み込んでバイト配列で保持
  //const fontBytes = await fetch(url).then((res) => res.arrayBuffer());
  //console.log(fontBytes);
  
  //フォント埋め込み
  const font = await pdfDoc.embedFont(url);

  //PDFに1ページ追加
  const page = pdfDoc.addPage();
  //印字
  page.drawText('勇者は頑張ってjavascriptでpdfを印刷し...', { x: 0, y: 800, size: 30, font: font, color: rgb(0, 0, 0) });
  page.drawText('勇者は頑張ってjavascriptでpdfを印刷し...', { x: 0, y: 770, size: 20, font: font, color: rgb(0, 0, 0) });
  page.drawText('勇者は頑張ってjavascriptでpdfを印刷し...', { x: 0, y: 750, size: 10, font: font, color: rgb(0, 0, 0) });
  page.drawText('勇者は頑張ってjavascriptでpdfを印刷し...', { x: 0, y: 740, size: 8, font: font, color: rgb(0, 0, 0) });
  //PDFのバイト配列取得
  const pdfBytes = await pdfDoc.save();
  //バイト配列をダウンロードさせる
  downloadjs(pdfBytes, "勇者は.pdf", "application/pdf");
}

export default printEstimate;