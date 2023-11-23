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
exports.createServer = void 0;
const body_parser_1 = require("body-parser");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const dbmethods_1 = __importDefault(require("./controllers/dbmethods"));
const createServer = () => {
    const app = (0, express_1.default)();
    app
        .disable("x-powered-by")
        .use((0, body_parser_1.urlencoded)({ extended: true }))
        .use((0, body_parser_1.json)())
        .use((0, cors_1.default)())
        .use(express_1.default.static(path_1.default.resolve(__dirname, "..") + "/public"))
        .post("/generatepdf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { mailid, digits } = req.body;
        const gencertid = yield dbmethods_1.default.handleGenerateCertificate(mailid, digits);
        if (gencertid) {
            return res.status(200).json({ certid: gencertid });
        }
        else {
            return res.status(404).json("Invalid / Not found");
        }
    }))
        // .post("/addstudent", async (req: Request, res: Response) => {
        //   const { name, phone, email } = req.body;
        //   dbmethods.handleAddStudent(name, phone, email).then((output) => {
        //     return res.json(output);
        //   });
        // })
        .post("/fetchcertdata", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { certid } = req.body;
        const certifydata = yield dbmethods_1.default.handleFetchCertData(certid);
        if (certifydata) {
            return res.status(200).json(certifydata);
        }
        return res.status(404).json({ data: "Certid not found" });
    }))
        .get("/certifydown/:certid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const resultcert = yield dbmethods_1.default.handleFetchCertUrl(parseInt(req.params.certid));
        if (resultcert) {
            return res.redirect(resultcert);
        }
        return res.status(404).json({ certurl: "not found" });
    }))
        .get("/", (_, res) => {
        return res.json({ status: { alive: true } });
    });
    return app;
};
exports.createServer = createServer;
