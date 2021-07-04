/* eslint-disable require-jsdoc */
import {PDFDocument, rgb} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
// import downloadjs from 'downloadjs';
import {toCurrency, sanitize, isNumeric} from '../../helpers/customStrings';

import fontBytes from '../../assets/fonts/ipaexg.ttf';

async function modifyPDF(records) {
  console.log(records);
  /* Destruction Records */
  let {
    お客様名: {value: customerName},
    作成日時: {value: createDateTime},
    工事名称: {value: projectName},
    税込金額: {value: amountAfterTax},
    税抜金額: {value: amountBeforeTax},
    消費税: {value: taxAmount},
    内訳: {value: table},
  } = records;

  amountAfterTax = toCurrency(amountAfterTax);
  amountBeforeTax = toCurrency(amountBeforeTax);
  taxAmount = toCurrency(taxAmount);

  const templateUrl =
    'https://dl.dropbox.com/s/9hxfzp3hjyyijdf/%E8%A6%8B%E7%A9%8D%E3%82%8A%E9%9B%9B%E5%BD%A2_202106250914.pdf?dl=0';
  const existingPdfBytes = await fetch(templateUrl).then((res) =>
    res.arrayBuffer(),
  );
  const textColor = rgb(0, 0, 0);
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  pdfDoc.registerFontkit(fontkit);

  //  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
  // const fontBytes = await fetch('https://dl.dropbox.com/s/ywc9c3yhojuwpli/ipaexg.ttf?dl=0').then((res) => res.arrayBuffer());
  const font = await pdfDoc.embedFont(fontBytes);

  const pages = pdfDoc.getPages();
  const firstPage = pages[0];
  const {height} = firstPage.getSize();
  console.log(`height ${height}`);

  /* お客様名 */
  firstPage.drawText(customerName, {
    x: 100,
    y: 728,
    size: 16,
    font: font,
    color: textColor,
  });

  /* 工事名 */
  firstPage.drawText(projectName, {
    x: 120,
    y: 702,
    size: 16,
    font: font,
    color: textColor,
  });

  /* 作成日 */
  firstPage.drawText(createDateTime, {
    x: 420,
    y: 702,
    size: 10,
    font: font,
    color: textColor,
  });

  /* 税込み金額金額 */
  firstPage.drawText(amountAfterTax, {
    x: adjustedX(amountAfterTax, font, 16, 320),
    y: 672,
    size: 16,
    font: font,
    color: textColor,
  });

  /* 税抜き金額 */
  firstPage.drawText(amountBeforeTax, {
    x: adjustedX(amountBeforeTax, font, 12, 320),
    y: 650,
    size: 12,
    font: font,
    color: textColor,
  });

  /* 税額 */
  firstPage.drawText(taxAmount, {
    x: adjustedX(taxAmount, font, 12, 320),
    y: 632,
    size: 12,
    font: font,
    color: textColor,
  });

  drawTable(
      {
        大項目: {x: 0, width: 75},
        中項目: {x: 80, width: 75},
        部材名: {x: 160, width: 75},
        数量: {x: 245, width: 16},
        単位: {x: 275, width: 16},
        単価: {x: 305, width: 52},
        金額: {x: 370, width: 53},
      },
      table,
      firstPage,
      {
        x: 55,
        y: 557,
        font: font,
        size: 12,
        color: textColor,
        rowHeight: 20.7,
      },
  );

  const pdfBytes = await pdfDoc.save();
  console.log(typeof pdfBytes);
  // openPDF(pdfBytes, pdfWindow);

  return pdfBytes;
  // downloadjs(pdfBytes, `${customerName}.pdf`, 'application/pdf');
}

function drawTable(keys, srcTable, page, props) {
  let rowY = props.y;
  const rowX = props.x;
  console.log(props.font.widthOfTextAtSize('text', props.size));
  srcTable.forEach(({value: row}) => {
    for (const [col, rowProp] of Object.entries(keys)) {
      const text = sanitize(row[col]['value']);

      /* Resolve x position */
      const currentX = rowX + rowProp.x;
      const resolvedX = isNumeric(text.replace(',', '')) ?
        adjustedX(text, props.font, props.size, currentX + rowProp.width) :
        currentX;
      /* End X resolve */

      /* Resolve Font Size */
      const resolvedFontSize = adjustFontSize(
          text,
          rowProp.width,
          props.font,
          props.size,
      );
      /* End Resolve Font Size */

      /* resosolve Y */
      const resolvedY = verticalAlign(
          rowY,
          props.rowHeight,
          props.font,
          resolvedFontSize,
      );
      /* End resolve Y */

      page.drawText(text, {
        x: resolvedX,
        y: resolvedY,
        size: resolvedFontSize,
        font: props.font,
        color: props.textColor,
      });

      /* For debugging */
      // drawRectangle(page, currentX, rowY, rowProp.width, props.rowHeight);
    }

    rowY -= props.rowHeight;
  });
}

function adjustFontSize(text, width, font, fontSize) {
  console.log(fontSize);
  return font.widthOfTextAtSize(text, fontSize) > width ?
    adjustFontSize(text, width, font, fontSize - 1) :
    fontSize;
}

/* For debugging */
/* function drawRectangle(page, x, y, width, height) {
  page.drawRectangle({
    x: x,
    y: y,
    width: width,
    height: height,
    borderWidth: 1,
    borderColor: rgb(0, 1, 0),
    borderOpacity: 0.7,
  });
} */

function verticalAlign(y, height, font, fontSize) {
  const textHeight = font.heightAtSize(fontSize);
  const result = height / 2 - textHeight / 2 + y;

  return result;
}

function adjustedX(text, font, size, rightBoundX) {
  const result = rightBoundX - font.widthOfTextAtSize(text, size);
  console.log(font.widthOfTextAtSize(text, size));
  return result;
}


export default modifyPDF;
