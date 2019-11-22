"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
let parser = new _1.default();
parser.execute('./content.json').then((result) => {
    console.log(JSON.stringify(result.META.MEDIUM));
}).catch((error) => {
    console.log(error);
});
