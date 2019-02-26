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
	ImageSize
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
	private readonly resourcesURL: string = 'https://www.mykoob.lv/?api/resource';

	/** URL for Mykoob Authorization API. */
	private readonly authorizationURL: string = 'https://www.mykoob.lv/?oauth2/authorizeDevice';

	/** Parse default config. */
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
	 * @returns Returns object with authentification data
	 */
	public async getAuthentificationData(): Promise<GetAuthentificationDataResponse> {

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
	}

	/**
	 * Get list of users and their ids. ( Uses userData method )
	 * @returns List of users.
	 */
	public async getUsers(): Promise<UsersList> {
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
				throw new Error('Error parsing user data! Try to get users manually, using userData() method!');
			} else {
				throw error;
			}
		}
	}

	/**
	 * Get user data.
	 * @returns Returns object with all data about user.
	 */
	public async userData(): Promise<UserDataResponse> {

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
	}

	/**
	 * Get api's detailed information.
	 * @returns Returns object with available api's.
	 */
	public async apisDetailed(): Promise<ApisDetailedResponse> {

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
	}

	/**
	 * Get number of unseen events.
	 * @returns Returns number of unseen events.
	 */
	public async unseenEvents(): Promise<UnseenEventsResponse> {

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
	}

	/**
	 * Mark all events as seen.
	 * @returns Action status.
	 */
	public async markAsSeen(): Promise<MarkAsSeenResponse> {

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
	}

	/**
	 * Get info about plus services.
	 * @returns Returns object plus services info.
	 */
	public async plusServicesInfo(): Promise<PlusServicesInfoResponse> {

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
	}

	/**
	 * Get user profile image.
	 * @param size Image size. ( "SMALL" or "MEDIUM")
	 * @returns Returns image in base64 format.
	 */
	public async userProfileImage(size: ImageSize): Promise<string> {

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
	}

	/**
	 * Get lessons plan.
	 * @param config Time frame, school classes id and school user id.
	 * @returns Returns object with lessons plan.
	 */
	public async lessonsPlan(config: TimeFrameWithInfo = {}): Promise<LessonsPlanResponse> {

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
	}

	/**
	 * Get user activities.
	 * @param config Time frame.
	 * @returns Returns object with all user activities.
	 */
	public async userActivities(config: TimeFrame): Promise<UserActivitiesResponse> {

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
	}

	/**
	 * Get user grades. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @returns Returns object with grades.
	 */
	public async userGrades(config: TimeFrameWithSortingType): Promise<UserGradesResponse> {

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
	}

	/**
	 * Get user attendance. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @returns Returns object with attendance.
	 */
	public async userAttendance(config: TimeFrameWithSortingType): Promise<UserAttendanceResponse> {

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
	}

	/**
	 * Get user assignments. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @returns Returns object with assignments.
	 */
	public async userAssignments(config: TimeFrameWithSortingType): Promise<UserAssignmentsResponse> {

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
	}

}

export = MykoobAPI;
