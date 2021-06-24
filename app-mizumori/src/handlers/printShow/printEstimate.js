import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import downloadjs from 'downloadjs';

async function printEstimate() {
  console.log('Printing..');
  const pdfDoc = await PDFDocument.create()
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  const page = pdfDoc.addPage()
  const { width, height } = page.getSize()
  const fontSize = 30
  page.drawText('Testing', {
    x: 50,
    y: height - 4 * fontSize,
    size: fontSize,
    font: timesRomanFont,
    color: rgb(0, 0.53, 0.71),
  });


  const pdfBytes = await pdfDoc.save()
  // Trigger the browser to download the PDF document
  downloadjs(pdfBytes, "pdf-lib_creation_example.pdf", "application/pdf");
}

export default printEstimate;