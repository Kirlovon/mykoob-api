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
const dayjs_1 = __importDefault(require("dayjs"));
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
            if (typeof response.data !== 'object')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            if (typeof response.data.access_token !== 'string')
                throw new Error('Response error');
            return response.data;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.userData();
                const Users = response.user_data;
                const usersList = [];
                for (const User of Users.user) {
                    for (const School of User.school) {
                        for (const Class of School.class) {
                            const keys = {
                                userID: User.user_info.user_id,
                                userAge: User.user_info.age,
                                userSex: User.user_info.sex,
                                userName: User.user_info.user_name,
                                userSurname: User.user_info.user_surname,
                                userPhoneNumber: User.user_info.phone_number,
                                userProfileImage: User.user_info.profile_image_base64,
                                schoolID: School.school_id,
                                schoolName: School.name,
                                schoolUserID: School.school_user_id,
                                className: Class.class_name,
                                schoolClassesID: Class.school_classes_id,
                                schoolClassesStudentsID: Class.school_classes_students_id
                            };
                            for (const key in keys) {
                                if (keys[key] === '')
                                    keys[key] = undefined;
                            }
                            usersList.push(keys);
                        }
                    }
                }
                return usersList;
            }
            catch (error) {
                if (error.name === 'TypeError') {
                    throw new Error('Error parsing user data! Try to get users manually, using userData() method!');
                }
                else {
                    throw error;
                }
            }
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
            if (typeof response.data !== 'object')
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
            if (typeof response.data !== 'object')
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
            if (typeof response.data !== 'object')
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
            if (typeof response.data !== 'object')
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
            if (typeof response.data !== 'object')
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
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            if (typeof response.data !== 'string')
                throw new Error('Response error');
            return response.data;
        });
    }
    lessonsPlan(config = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const dateFrom = dayjs_1.default(config.from).format('YYYY-MM-DD');
            const dateTo = dayjs_1.default(config.to).format('YYYY-MM-DD');
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_lessonsplan',
                    access_token: this.accessToken,
                    date_from: dateFrom,
                    date_to: dateTo,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data !== 'object')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    userActivities(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const dateFrom = dayjs_1.default(config.from).format('YYYY-MM-DD');
            const dateTo = dayjs_1.default(config.to).format('YYYY-MM-DD');
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_activities',
                    access_token: this.accessToken,
                    date_from: dateFrom,
                    date_to: dateTo,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data !== 'object')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    userGrades(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const dateFrom = dayjs_1.default(config.from).format('YYYY-MM-DD');
            const dateTo = dayjs_1.default(config.to).format('YYYY-MM-DD');
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_grades',
                    access_token: this.accessToken,
                    date_from: dateFrom,
                    date_to: dateTo,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data !== 'object')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    userAttendance(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const dateFrom = dayjs_1.default(config.from).format('YYYY-MM-DD');
            const dateTo = dayjs_1.default(config.to).format('YYYY-MM-DD');
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_attendance',
                    access_token: this.accessToken,
                    date_from: dateFrom,
                    date_to: dateTo,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data !== 'object')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
    userAssignments(config) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.accessToken !== 'string') {
                const authentificationData = yield this.getAuthentificationData();
                this.accessToken = authentificationData.access_token;
            }
            const dateFrom = dayjs_1.default(config.from).format('YYYY-MM-DD');
            const dateTo = dayjs_1.default(config.to).format('YYYY-MM-DD');
            const response = yield axios_1.default({
                method: 'POST',
                timeout: this.timeout,
                url: this.resourcesURL,
                data: qs_1.default.stringify({
                    api: 'user_assignments',
                    access_token: this.accessToken,
                    date_from: dateFrom,
                    date_to: dateTo,
                    school_classes_id: config.schoolClassesID,
                    school_user_id: config.schoolUserID,
                    sorting_type: config.sortingType,
                }),
            });
            if (response.status !== 200)
                throw new Error('Response error');
            if (typeof response.data !== 'object')
                throw new Error('Response error');
            if (typeof response.data.error !== 'undefined')
                throw new Error(response.data.error.message);
            return response.data;
        });
    }
}
module.exports = MykoobAPI;
//# sourceMappingURL=mykoobAPI.js.map