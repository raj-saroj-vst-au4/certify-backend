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
const client_1 = require("@prisma/client");
const pdfgen_1 = __importDefault(require("../utils/pdfgen"));
const prisma = new client_1.PrismaClient();
const handleFetchCertUrl = (certificateid) => __awaiter(void 0, void 0, void 0, function* () {
    const certficate = yield prisma.certificate.findUnique({
        where: {
            certId: certificateid,
        },
    });
    if (certficate) {
        return certficate.certUrl;
    }
    return null; // Return null if not found
});
const handleGenerateCertificate = (sMail, sPhoneDigits) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const result = yield prisma.student.findFirst({
            where: {
                email: sMail,
            },
        });
        if (result && parseInt(result.phone) % 10000 === parseInt(sPhoneDigits)) {
            if (result.certGen) {
                const certout = yield prisma.certificate.findFirst({
                    where: {
                        studentid: result.id,
                    },
                });
                return (_a = certout === null || certout === void 0 ? void 0 : certout.certId) !== null && _a !== void 0 ? _a : "Not Found";
            }
            else {
                let certExists = true;
                while (certExists) {
                    console.log(`Generation mail : ${sMail} and phone digits : ${sPhoneDigits} are valid`);
                    const rancertid = Math.floor(100000 + Math.random() * 900000);
                    const foundStat = yield handleFetchCertUrl(rancertid);
                    if (!foundStat) {
                        certExists = false;
                        const genpdf_url = yield (0, pdfgen_1.default)(result.name, (_b = process.env.CERTIFY_DOMAIN) !== null && _b !== void 0 ? _b : "localhost:5001", rancertid);
                        const createdCert = yield prisma.certificate
                            .create({
                            data: {
                                certId: rancertid,
                                certUrl: genpdf_url !== null && genpdf_url !== void 0 ? genpdf_url : "err",
                                student: { connect: { id: result.id } },
                            },
                        })
                            .catch((e) => console.log("certificate creation err", e));
                        if (createdCert) {
                            yield prisma.student.update({
                                where: { id: result.id },
                                data: {
                                    certGen: true,
                                    certificate: {
                                        connect: {
                                            id: createdCert.id,
                                        },
                                    },
                                },
                            });
                            return createdCert.certId;
                        }
                    }
                }
            }
        }
        else {
            throw new Error("Invalid digits");
        }
    }
    catch (err) {
        return null;
    }
});
const handleAddStudent = (name, phone, email) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield prisma.student.create({
        data: {
            name,
            phone,
            email,
        },
    });
    return student;
});
const handleFetchCertData = (uinputcertid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma.certificate.findUnique({
            where: {
                certId: uinputcertid,
            },
            include: {
                student: true,
            },
        });
        if (data) {
            return data;
        }
        else {
            return null;
        }
    }
    catch (e) {
        console.log(e);
    }
});
const dbmethods = {
    handleFetchCertUrl,
    handleGenerateCertificate,
    handleAddStudent,
    handleFetchCertData,
};
exports.default = dbmethods;
