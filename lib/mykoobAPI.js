"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
class MykoobAPI {
    constructor(config = {}) {
        this.email = undefined;
        this.password = undefined;
        this.accessToken = undefined;
        this.timeout = 10000;
        this.resourcesURL = 'https://www.mykoob.lv/?api/resource';
        this.authorizationURL = 'https://www.mykoob.lv/?oauth2/authorizeDevice';
        if (typeof config.email === 'string') {
            this.email = config.email;
        }
        if (typeof config.password === 'string') {
            this.password = config.password;
        }
        if (typeof config.accessToken === 'string') {
            this.accessToken = config.accessToken;
        }
        if (typeof config.timeout === 'number') {
            this.timeout = config.timeout;
        }
    }
    authorize(config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            let email;
            if (typeof config.email === 'string') {
                email = config.email;
            }
            else if (typeof this.email === 'string') {
                email = this.email;
            }
            else {
                throw new Error('Email is not specified');
            }
            let password;
            if (typeof config.password === 'string') {
                password = config.password;
            }
            else if (typeof this.password === 'string') {
                password = this.password;
            }
            else {
                throw new Error('Password is not specified');
            }
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.authorizationURL,
                data: qs_1.default.stringify({
                    use_oauth_proxy: 1,
                    client: 'MykoobMobile',
                    username: email,
                    password: password,
                }),
            });
            return response.data;
        });
    }
}
module.exports = MykoobAPI;
