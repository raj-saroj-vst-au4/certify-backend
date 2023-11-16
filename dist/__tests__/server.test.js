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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
describe("Server", () => {
    it("health check returns 200", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)((0, server_1.createServer)())
            .get("/status")
            .expect(200)
            .then((res) => {
            expect(res.ok).toBe(true);
        });
    }));
    it("message endpoint says hello", () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, supertest_1.default)((0, server_1.createServer)())
            .get("/message/jared")
            .expect(200)
            .then((res) => {
            expect(res.body).toEqual({ message: "hello jared" });
        });
    }));
});
