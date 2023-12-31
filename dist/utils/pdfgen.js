"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puppeteer_1 = __importDefault(require("puppeteer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const pdfupload_1 = __importDefault(require("./pdfupload"));
const handleGeneratePdf = (name, certifyurl, certid) => __awaiter(void 0, void 0, void 0, function* () {
    const certbinchunks = fs_1.default
        .readFileSync(`${path_1.default.resolve(__dirname, "../../public/printtempbg.png")}`)
        .toString("base64");
    try {
        const browser = yield puppeteer_1.default.launch({
            headless: "new",
        });
        const page = yield browser.newPage();
        let html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>100xDevs certificate</title>
          <style>
            body {
              width: 100%;
              height: 100%;
              margin: 0;
              padding: 0;
              background-color: #fafafa;
              font: 12pt “Tahoma”;
            }
            * {
              box-sizing: border-box;
              -moz-box-sizing: border-box;
            }
            .page {
              width: 297mm;
              min-height: 210mm;
              padding: 10mm;
              border: 1px #d3d3d3 solid;
              border-radius: 5px;
              background-image: url("data:image/png;base64,${certbinchunks}");
              background-size: 105% 107%;
              background-repeat: no-repeat;
              background-position: top;
              box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
              position: relative;
            }
      
            .qrcodeimg {
              position: absolute;
              top: 10mm;
              left: 10mm;
              background-color: transparent;
            }
            .qrtext {
              position: absolute;
              top: 38mm;
              left: 10mm;
              font-weight: 600;
              color: black;
            }
      
            .name {
              position: absolute;
              top: 110mm;
              right: 50mm;
              font-size: 25mm;
              font-weight: 800;
              font-style: italic;
              color: rgb(56 189 248 / 1);
            }
      
            .certid {
              color: #fafafa;
              position: absolute;
              bottom: 20mm;
              left: 75mm;
              font-size: 6mm;
              font-weight: 550;
            }
      
            .issuedate {
              position: absolute;
              color: #fafafa;
              bottom: 20mm;
              right: 12mm;
              font-size: 6mm;
              font-weight: 550;
            }
      
            .certifyurl {
              position: absolute;
              color: black;
              font-size: 4mm;
              font-weight: 600;
              bottom: 2mm;
              right: 10mm;
            }
            @page {
              size: landscape;
              margin: 0;
            }
            @media print {
              html,
              body {
                width: 297mm;
                height: 210mm;
              }
            }
          </style>
        </head>
        <body>
          <div class="page">
            <div>
              <div class="qrdiv">
                <img
                  class="qrcodeimg"
                  src="https://api.qrserver.com/v1/create-qr-code/?data=${certifyurl}/certify/${certid}&size=100x100"
                  alt="qr"
                  title="verify"
                />
              </div>
              <div class="qrtext">100xdevs.com</div>
            </div>
            <div class="name">${name}</div>
            <div class="certid">Certificate ID : ${certid}</div>
            <div class="issuedate">Date of Issue : 10th of November 2023</div>
            <div class="certifyurl">${certifyurl}/certify/${certid}</div>
          </div>
        </body>
      </html>
      `;
        yield page.setContent(html, {
            waitUntil: "networkidle0",
        });
        yield page.pdf({
            format: "A4",
            printBackground: true,
            preferCSSPageSize: true,
            landscape: true,
            path: `${certid}.pdf`,
        });
        const gendata = {
            certid,
            path: `${certid}.pdf`,
        };
        yield browser.close();
        // console.log("closed browser");
        const uploaded_url = yield (0, pdfupload_1.default)(gendata);
        return uploaded_url;
    }
    catch (e) {
        console.log(e);
        return null;
    }
});
exports.default = handleGeneratePdf;
