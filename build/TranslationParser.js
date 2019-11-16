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
const fs_1 = __importDefault(require("fs"));
class TranslationParser {
    execute(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = yield this.getContent(path);
                // Init empty object
                let result = {};
                // Parse to a pure object
                Object.keys(payload).forEach((key) => {
                    let keyParts = key.split('_');
                    this.assign(result, keyParts, payload[key]);
                });
                // Group similar keys together
                result = this.groupToArray(result);
                return result;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getContent(path) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                fs_1.default.readFile(path, 'utf8', (error, content) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(JSON.parse(content));
                });
            });
        });
    }
    assign(payload, keys, value) {
        keys = keys.map((key) => key.toUpperCase());
        let lastKeyIndex = keys.length - 1;
        for (var i = 0; i < lastKeyIndex; ++i) {
            let key = keys[i];
            if (!(key in payload)) {
                payload[key] = {};
            }
            payload = payload[key];
        }
        payload[keys[lastKeyIndex]] = value;
    }
    groupToArray(payload) {
        // If you reach the end of the line and value is not an object then return and exit
        if (typeof Object.values(payload)[0] === 'string') {
            return payload;
        }
        return Object.keys(payload).reduce((result, key) => {
            if (this.isArray(key)) {
                let stringKey = this.extractStringFromKey(key);
                if (stringKey in result) {
                    result[stringKey].push(this.groupToArray(payload[key]));
                }
                else {
                    result[stringKey] = [];
                }
            }
            else {
                result[key] = this.groupToArray(payload[key]);
            }
            return result;
        }, Object.create(null));
    }
    isArray(key) {
        const regex = /[a-zA-Z]+\d/gm;
        let result = regex.exec(key);
        return result !== null;
    }
    extractStringFromKey(key) {
        const regex = /[a-zA-Z]+/gm;
        let result = regex.exec(key);
        return result !== null ? result[0] : null;
    }
}
exports.default = TranslationParser;
