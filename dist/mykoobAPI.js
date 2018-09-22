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
const request_promise_1 = __importDefault(require("request-promise"));
class mykoobAPI {
    constructor() {
        this.timeout = 10000;
    }
    ping() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "GET",
                timeout: this.timeout,
                resolveWithFullResponse: true,
                url: "https://www.mykoob.lv/",
            });
            return response.statusCode;
        });
    }
    getAppTranslations() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: "https://www.mykoob.lv/?oauth2/getAppTranslations",
                form: { all: true }
            });
            return JSON.parse(response);
        });
    }
    authorize(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: "https://www.mykoob.lv/?oauth2/authorizeDevice",
                form: {
                    use_oauth_proxy: 1,
                    client: "MykoobMobile",
                    username: data.username,
                    password: data.password
                }
            });
            return JSON.parse(response);
        });
    }
    apisDetailed(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: "https://www.mykoob.lv//?api/resource",
                form: {
                    api: "user_data",
                    access_token: token,
                }
            });
            return JSON.parse(response);
        });
    }
    userData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: "https://www.mykoob.lv//?api/resource",
                form: {
                    api: "user_data",
                    access_token: token,
                }
            });
            return JSON.parse(response);
        });
    }
    userActivities(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: "https://www.mykoob.lv//?api/resource",
                form: {
                    api: "user_activities",
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to
                }
            });
            return JSON.parse(response);
        });
    }
    lessonsPlan(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: "https://www.mykoob.lv//?api/resource",
                form: {
                    api: "user_lessonsplan",
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.classesID,
                    school_user_id: config.userID
                }
            });
            return JSON.parse(response);
        });
    }
}
module.exports = mykoobAPI;
