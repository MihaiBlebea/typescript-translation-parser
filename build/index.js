"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TranslationParser_1 = __importDefault(require("./TranslationParser"));
// export default TranslationParser
let parser = new TranslationParser_1.default();
parser.execute('./content.json').then((result) => {
    console.log(result);
}).catch((error) => {
    console.log(error);
});
