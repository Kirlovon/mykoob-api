// Dependencies
import Axios from 'axios';
import DayJS from 'dayjs';
import Qs from 'qs';

// Definitions
import {
	MykoobAPIConfig,
	TimeFrame,
	TimeFrameWithInfo,
	TimeFrameWithSortingType,
	UsersList,
	ImageSize,
	ErrorCallback
} from './definitions';

// API Responses
import {
	GetAuthentificationDataResponse,
	UserDataResponse,
	PlusServicesInfoResponse,
	ApisDetailedResponse,
	UnseenEventsResponse,
	MarkAsSeenResponse,
	LessonsPlanResponse,
	UserActivitiesResponse,
	UserGradesResponse,
	UserAttendanceResponse,
	UserAssignmentsResponse
} from './responses';

/** Rest API Client for Mykoob! */
class MykoobAPI {

	/** Authorization email. */
	public email?: string = undefined;

	/** Authorization password. */
	public password?: string = undefined;

	/** Access token for authentification. */
	public accessToken?: string = undefined;

	/** Requests timeout. */
	public timeout: number = 10000;

	/** URL for Mykoob Resources API. */
	private resourcesURL: string = 'https://www.mykoob.lv/?api/resource';

	/** URL for Mykoob Authorization API. */
	private authorizationURL: string = 'https://www.mykoob.lv/?oauth2/authorizeDevice';

	/** Parse config. */
	constructor(config: MykoobAPIConfig = {}) {
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

	/**
	 * Get mykoob access token and other authentication data.
	 * @param config Authentification data
	 * @param errorCallback Callback with the error.
	 * @returns Returns object with authentification data
	 */
	public async getAuthentificationData(errorCallback?: ErrorCallback): Promise<GetAuthentificationDataResponse> {
		try {

			// Throws error, if data is undefined
			if (typeof this.email === 'undefined') throw new Error('Email is not specified');
			if (typeof this.password === 'undefined') throw new Error('Password is not specified');

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.authorizationURL,
				data: Qs.stringify({
					use_oauth_proxy: 1,
					client: 'MykoobMobile',
					username: this.email,
					password: this.password,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);
			if (typeof response.data.access_token !== 'string') throw new Error('Response error');

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}

	}

	/**
	 * Get list of users and their ids. ( Uses userData method )
	 * @param errorCallback Callback with the error.
	 * @returns List of users.
	 */
	public async getUsers(errorCallback?: ErrorCallback): Promise<UsersList> {
		try {

			// Get user data
			const response = await this.userData();
			const Users = response.user_data;

			// Parse users
			const usersList: UsersList = [];

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

						// Replace empty results with undefined
						for (const key in keys) {
							if (keys[key] === '') keys[key] = undefined;
						}

						usersList.push(keys);
					}
				}
			}

			return usersList;

		} catch (error) {
			if (error.name === 'TypeError') {
				if (typeof errorCallback === 'function') {
					errorCallback(new Error('Error parsing user data! Try to get users manually, using userData() method!'));
				} else {
					throw new Error('Error parsing user data! Try to get users manually, using userData() method!');
				}
			} else {
				if (typeof errorCallback === 'function') {
					errorCallback(error);
				} else {
					throw error;
				}
			}
		}
	}

	/**
	 * Get user data.
	 * @param errorCallback Callback with the error.
	 * @returns Returns object with all data about user.
	 */
	public async userData(errorCallback?: ErrorCallback): Promise<UserDataResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'user_data',
					access_token: this.accessToken,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get api's detailed information.
	 * @param errorCallback Callback with the error.
	 * @returns Returns object with available api's.
	 */
	public async apisDetailed(errorCallback?: ErrorCallback): Promise<ApisDetailedResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'all_device_apis_detailed',
					access_token: this.accessToken,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get number of unseen events.
	 * @param errorCallback Callback with the error.
	 * @returns Returns number of unseen events.
	 */
	public async unseenEvents(errorCallback?: ErrorCallback): Promise<UnseenEventsResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'unseen_events_count',
					access_token: this.accessToken,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Mark all events as seen.
	 * @param errorCallback Callback with the error.
	 * @returns Action status.
	 */
	public async markAsSeen(errorCallback?: ErrorCallback): Promise<MarkAsSeenResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'mark_user_activities_seen',
					access_token: this.accessToken,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get info about plus services.
	 * @param errorCallback Callback with the error.
	 * @returns Returns object plus services info.
	 */
	public async plusServicesInfo(errorCallback?: ErrorCallback): Promise<PlusServicesInfoResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'plus_services',
					access_token: this.accessToken,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get user profile image.
	 * @param size Image size. ( "SMALL" or "MEDIUM")
	 * @param errorCallback Callback with the error.
	 * @returns Returns image in base64 format.
	 */
	public async userProfileImage(size: ImageSize, errorCallback?: ErrorCallback): Promise<string> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'user_profile_image',
					access_token: this.accessToken,
					own_image: true,
					use_base64: true,
					dont_use_json: false,
					image_size: size,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);
			if (typeof response.data !== 'string') throw new Error('Response error');

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get lessons plan.
	 * @param config Time frame, school classes id and school user id.
	 * @param errorCallback Callback with the error.
	 * @returns Returns object with lessons plan.
	 */
	public async lessonsPlan(config: TimeFrameWithInfo = {}, errorCallback?: ErrorCallback): Promise<LessonsPlanResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Convert dates
			const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
			const dateTo = DayJS(config.to).format('YYYY-MM-DD');

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'user_lessonsplan',
					access_token: this.accessToken,
					date_from: dateFrom,
					date_to: dateTo,
					school_classes_id: config.schoolClassesID,
					school_user_id: config.schoolUserID,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get user activities.
	 * @param config Time frame.
	 * @param errorCallback Callback with the error.
	 * @returns Returns object with all user activities.
	 */
	public async userActivities(config: TimeFrame, errorCallback?: ErrorCallback): Promise<UserActivitiesResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Convert dates
			const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
			const dateTo = DayJS(config.to).format('YYYY-MM-DD');

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'user_activities',
					access_token: this.accessToken,
					date_from: dateFrom,
					date_to: dateTo,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get user grades. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @param errorCallback Callback with the error.
	 * @returns Returns object with grades.
	 */
	public async userGrades(config: TimeFrameWithSortingType, errorCallback?: ErrorCallback): Promise<UserGradesResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Convert dates
			const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
			const dateTo = DayJS(config.to).format('YYYY-MM-DD');

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'user_grades',
					access_token: this.accessToken,
					date_from: dateFrom,
					date_to: dateTo,
					school_classes_id: config.schoolClassesID,
					school_user_id: config.schoolUserID,
					sorting_type: config.sortingType,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get user attendance. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @param errorCallback Callback with the error.
	 * @returns Returns object with attendance.
	 */
	public async userAttendance(config: TimeFrameWithSortingType, errorCallback?: ErrorCallback): Promise<UserAttendanceResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Convert dates
			const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
			const dateTo = DayJS(config.to).format('YYYY-MM-DD');

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'user_attendance',
					access_token: this.accessToken,
					date_from: dateFrom,
					date_to: dateTo,
					school_classes_id: config.schoolClassesID,
					school_user_id: config.schoolUserID,
					sorting_type: config.sortingType,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get user assignments. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @param errorCallback Callback with the error.
	 * @returns Returns object with assignments.
	 */
	public async userAssignments(config: TimeFrameWithSortingType, errorCallback?: ErrorCallback): Promise<UserAssignmentsResponse> {
		try {
			// Authorization
			if (typeof this.accessToken !== 'string') {
				const authentificationData = await this.getAuthentificationData();
				this.accessToken = authentificationData.access_token;
			}

			// Convert dates
			const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
			const dateTo = DayJS(config.to).format('YYYY-MM-DD');

			// Send request
			const response = await Axios({
				method: 'POST',
				timeout: this.timeout,
				url: this.resourcesURL,
				data: Qs.stringify({
					api: 'user_assignments',
					access_token: this.accessToken,
					date_from: dateFrom,
					date_to: dateTo,
					school_classes_id: config.schoolClassesID,
					school_user_id: config.schoolUserID,
					sorting_type: config.sortingType,
				}),
			});

			// Throws error, if something goes wrong
			if (response.status !== 200) throw new Error('Response error');
			if (typeof response.data !== 'object') throw new Error('Response error');
			if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

			return response.data;

		} catch (error) {
			if (typeof errorCallback === 'function') {
				errorCallback(error);
			} else {
				throw error;
			}
		}
	}

}

export = MykoobAPI;
