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
    getAuthentificationData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.email === 'undefined')
                throw new Error('Email is not specified');
            if (typeof this.password === 'undefined')
                throw new Error('Password is not specified');
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.authorizationURL,
                data: qs_1.default.stringify({
                    use_oauth_proxy: 1,
                    client: 'MykoobMobile',
                    username: this.email,
                    password: this.password,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data === 'undefined')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            if (typeof response.data.access_token !== 'string')
                throw new Error('Response error');
            return response.data;
        });
    }
    userData() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_data',
                    access_token: this.accessToken,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data === 'undefined')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    apisDetailed() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'all_device_apis_detailed',
                    access_token: this.accessToken,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data === 'undefined')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    unseenEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'unseen_events_count',
                    access_token: this.accessToken,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data === 'undefined')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    markAsSeen() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'mark_user_activities_seen',
                    access_token: this.accessToken,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data === 'undefined')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    plusServicesInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'plus_services',
                    access_token: this.accessToken,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data === 'undefined')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    userProfileImage(size) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_profile_image',
                    access_token: this.accessToken,
                    own_image: true,
                    use_base64: true,
                    dont_use_json: false,
                    image_size: size,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data === 'undefined')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    lessonsPlan(config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_lessonsplan',
                    access_token: this.accessToken,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data === 'undefined')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
}
module.exports = MykoobAPI;
//# sourceMappingURL=mykoobAPI.js.map