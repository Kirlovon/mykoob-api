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
    getAuthentificationData(config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const timeout = this.getTimeout(config.timeout);
            const email = this.getEmail(config.email);
            const password = this.getPassword(config.password);
            if (typeof email === 'undefined')
                throw new Error('Email is not specified');
            if (typeof password === 'undefined')
                throw new Error('Password is not specified');
            const response = yield axios_1.default({
                method: 'POST',
                timeout: timeout,
                url: this.authorizationURL,
                data: qs_1.default.stringify({
                    use_oauth_proxy: 1,
                    client: 'MykoobMobile',
                    username: email,
                    password: password,
                }),
            });
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            if (typeof response.data === 'undefined' || response.status !== 200)
                throw new Error('Response error');
            return response.data;
        });
    }
    getTimeout(timeout) {
        if (typeof timeout === 'number') {
            return timeout;
        }
        else if (typeof this.timeout === 'number') {
            return this.timeout;
        }
        else {
            return 10000;
        }
    }
    getEmail(email) {
        if (typeof email === 'string') {
            return email;
        }
        else if (typeof this.email === 'string') {
            return this.email;
        }
        else {
            return undefined;
        }
    }
    getPassword(password) {
        if (typeof password === 'string') {
            return password;
        }
        else if (typeof this.password === 'string') {
            return this.password;
        }
        else {
            return undefined;
        }
    }
    getAccessToken(accessToken) {
        if (typeof accessToken === 'string') {
            return accessToken;
        }
        else if (typeof this.accessToken === 'string') {
            return this.accessToken;
        }
        else {
            return undefined;
        }
    }
}
module.exports = MykoobAPI;
//# sourceMappingURL=mykoobAPI.js.map