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
const cloudinary_1 = require("cloudinary");
const fs_1 = __importDefault(require("fs"));
cloudinary_1.v2.config({ secure: true });
const handleUploadPdf = ({ path }) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {
        use_filename: true,
        unique_filename: true,
        overwrite: true,
    };
    try {
        const uploadresult = yield cloudinary_1.v2.uploader
            .upload(path, options)
            .then((upldata) => {
            fs_1.default.unlink(path, (err) => {
                if (err) {
                    console.log("Deletion err", err);
                }
            });
            return upldata;
        });
        return uploadresult.secure_url;
    }
    catch (error) {
        console.log(error);
        return null;
    }
});
exports.default = handleUploadPdf;
