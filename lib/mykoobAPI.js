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
const qs_1 = __importDefault(require("qs"));
const axios_1 = __importDefault(require("axios"));
class mykoobAPI {
    constructor() {
        this.timeout = 10000;
        this.filter = true;
        this.resourcesURL = 'https://www.mykoob.lv/?api/resource';
        this.authorizationURL = 'https://www.mykoob.lv/?oauth2/authorizeDevice';
    }
    authorize(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.authorizationURL,
                data: qs_1.default.stringify({
                    use_oauth_proxy: 1,
                    client: 'MykoobMobile',
                    username: data.email,
                    password: data.password,
                }),
            });
            if (this.filter) {
                delete response.data.token_type;
                delete response.data.refresh_token;
                delete response.data.scope;
            }
            return response.data;
        });
    }
    apisDetailed(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'all_device_apis_detailed',
                    access_token: token,
                }),
            });
            if (this.filter) {
                delete response.data.register_device;
                delete response.data.unregister_device;
                delete response.data.notification_settings;
            }
            return response.data;
        });
    }
    userData(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_data',
                    access_token: token,
                }),
            });
            if (this.filter) {
                delete response.data.user_data.plus_ends;
                delete response.data.user_data.plus_service;
                delete response.data.user_data.plus_owner_name;
                delete response.data.user_data.plus_provider;
                delete response.data.user_data.plus_price_display;
            }
            return response.data;
        });
    }
    userGrades(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_grades',
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType,
                }),
            });
            return response.data;
        });
    }
    userAttendance(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_attendance',
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType,
                }),
            });
            return response.data;
        });
    }
    userAssignments(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_assignments',
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType,
                }),
            });
            return response.data;
        });
    }
    userActivities(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_activities',
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                }),
            });
            return response.data;
        });
    }
    lessonsPlan(token, config) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_lessonsplan',
                    access_token: token,
                    date_from: config.from,
                    date_to: config.to,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                }),
            });
            return response.data;
        });
    }
    userProfileImage(token, size) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_profile_image',
                    access_token: token,
                    own_image: true,
                    use_base64: true,
                    dont_use_json: false,
                    image_size: size,
                }),
            });
            return response.data;
        });
    }
    unseenEvents(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'unseen_events_count',
                    access_token: token,
                }),
            });
            if (this.filter) {
                return response.data.unseen_events_count.activities;
            }
            return response.data;
        });
    }
    markAsSeen(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'mark_user_activities_seen',
                    access_token: token,
                }),
            });
            return response.data;
        });
    }
    plusServicesInfo(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'plus_services',
                    access_token: token,
                }),
            });
            return response.data;
        });
    }
}
module.exports = mykoobAPI;
