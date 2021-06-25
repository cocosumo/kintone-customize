import {degrees, PDFDocument, rgb} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import downloadjs from 'downloadjs';
import fontURL from '../../assets/fonts/ipaexg.ttf';

async function modifyPDF(records) {
  console.log(records);
  const {お客様名} = records;
  console.log(お客様名);
  const url = 'https://dl.dropbox.com/s/9hxfzp3hjyyijdf/%E8%A6%8B%E7%A9%8D%E3%82%8A%E9%9B%9B%E5%BD%A2_202106250914.pdf?dl=0';
  const existingPdfBytes = await fetch(url).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const font = await pdfDoc.embedFont(fontURL);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const {height} = firstPage.getSize();
  firstPage.drawText('Javascriptで追加したぜ!', {
    x: 5,
    y: height / 2 + 300,
    size: 50,
    font: font,
    color: rgb(0.95, 0.1, 0.1),
    rotate: degrees(-45),
  });

  const pdfBytes = await pdfDoc.save();
  downloadjs(pdfBytes, 'Edit.pdf', 'application/pdf');
}

export default modifyPDF;
