// This is simply a method that can be used to return a contract in the pdf format
// When requested so. The contract format is not decided yet so I am simply putting the 
// instructions here. TODO: Adapt the method to the contract format
const pdf = require("pdfkit");

const generate_pdf = (sales, res)=>{
    const doc = new pdf({ size: "A4" });
    const buffers = [];

    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=contract.pdf"
      );
      res.send(pdfData);
    });

    const body = "This is to verify that on " + sales.date.toString() + " _____________________" + "completed the transaction with Epoka Filters."
    const footer = "Buyer: ______________________" + "                                   " + "Sales agent: _____________________________"

    doc.fontSize(25).text("Sale contract", 80, doc.y);
    doc.moveDown();
    doc.fontSize(11).text(body, 80, doc.y);
    doc.moveDown(4);
    doc.fontSize(15).text(footer, 80, doc.y);

    doc.end();
}

module.exports = {
  generate_pdf
};