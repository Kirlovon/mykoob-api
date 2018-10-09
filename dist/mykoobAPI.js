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
        this.filter = true;
        this.resourcesURL = "https://www.mykoob.lv//?api/resource";
        this.authorizationURL = "https://www.mykoob.lv/?oauth2/authorizeDevice";
    }
    authorize(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.authorizationURL,
                form: {
                    use_oauth_proxy: 1,
                    client: "MykoobMobile",
                    username: data.email,
                    password: data.password
                }
            });
            let parsedResponse = JSON.parse(response);
            if (this.filter) {
                delete parsedResponse.token_type;
                delete parsedResponse.refresh_token;
                delete parsedResponse.scope;
            }
            return parsedResponse;
        });
    }
    apisDetailed(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "all_device_apis_detailed",
                    access_token: token,
                }
            });
            let parsedResponse = JSON.parse(response);
            if (this.filter) {
                for (let index in parsedResponse) {
                    delete parsedResponse[index].in;
                    delete parsedResponse[index].out;
                    delete parsedResponse[index].errors;
                }
                delete parsedResponse.register_device;
                delete parsedResponse.unregister_device;
                delete parsedResponse.notification_settings;
            }
            return parsedResponse;
        });
    }
    userData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "user_data",
                    access_token: token,
                }
            });
            let parsedResponse = JSON.parse(response);
            if (this.filter) {
                delete parsedResponse.user_data.plus_ends;
                delete parsedResponse.user_data.plus_service;
                delete parsedResponse.user_data.plus_owner_name;
                delete parsedResponse.user_data.plus_provider;
                delete parsedResponse.user_data.plus_price_display;
            }
            return parsedResponse;
        });
    }
    userGrades(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "user_grades",
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType
                }
            });
            return JSON.parse(response);
        });
    }
    userAttendance(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "user_attendance",
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType
                }
            });
            return JSON.parse(response);
        });
    }
    userAssignments(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "user_assignments",
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType
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
                url: this.resourcesURL,
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
                url: this.resourcesURL,
                form: {
                    api: "user_lessonsplan",
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID
                }
            });
            return JSON.parse(response);
        });
    }
    userProfileImage(token, size) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "user_profile_image",
                    access_token: token,
                    own_image: true,
                    use_base64: true,
                    dont_use_json: false,
                    image_size: size
                }
            });
            return JSON.parse(response);
        });
    }
    unseenEvents(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "unseen_events_count",
                    access_token: token,
                }
            });
            let parsedResponse = JSON.parse(response);
            if (this.filter) {
                return parsedResponse.unseen_events_count.activities;
            }
            return parsedResponse;
        });
    }
    markAsSeen(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "mark_user_activities_seen",
                    access_token: token,
                }
            });
            return JSON.parse(response);
        });
    }
    plusServicesInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield request_promise_1.default({
                method: "POST",
                timeout: this.timeout,
                url: this.resourcesURL,
                form: {
                    api: "plus_services",
                    access_token: token,
                }
            });
            return JSON.parse(response);
        });
    }
}
module.exports = mykoobAPI;
