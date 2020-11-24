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
	UserProfile,
	ImageSize,
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
	public resourcesURL: string = 'https://www.mykoob.lv/?api/resource';

	/** URL for Mykoob Authorization API. */
	public authorizationURL: string = 'https://www.mykoob.lv/?oauth2/authorizeDevice';

	/** Parse config. */
	constructor(config: Partial<MykoobAPIConfig> = {}) {
		if (typeof config.email === 'string') {
			this.email = config.email;
		}
		if (typeof config.password === 'string') {
			this.password = config.password;
		}
		if (typeof config.access_token === 'string') {
			this.accessToken = config.access_token;
		}
		if (typeof config.timeout === 'number') {
			this.timeout = config.timeout;
		}
	}

	/**
	 * Authorization, requests Mykoob access token and saves it.
	 */
	public async authorize(): Promise<void> {
		if (typeof this.email !== 'string') throw new TypeError('Invalid email specified');
		if (typeof this.password !== 'string') throw new TypeError('Invalid password specified');

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

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);
		if (typeof response.data.access_token !== 'string') throw new Error('Response does not contain a token');

		this.accessToken = response.data.access_token;
	}

	/**
	 * Get mykoob access token and other authentication data.
	 * @returns Returns object with authentification data
	 */
	public async getAuthentificationData(): Promise<GetAuthentificationDataResponse> {
		if (typeof this.email !== 'string') throw new Error('Invalid email specified');
		if (typeof this.password !== 'string') throw new Error('Invalid password specified');

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

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);
		if (typeof response.data.access_token !== 'string') throw new Error('Response does not contain an access token');

		return response.data;
	}

	/**
	 * Get list of users and their ids. ( Uses userData method )
	 * @returns List of users profiles.
	 */
	public async getUsers(): Promise<UserProfile[]> {
		if (typeof this.accessToken !== 'string') await this.authorize();
		const usersProfiles: UserProfile[] = [];

		const response = await this.userData();
		const Users = response.user_data;

		try {
			for (const User of Users.user) {
				for (const School of User.school) {
					for (const Class of School.class) {
						const profile: UserProfile = {
							user_id: User.user_info.user_id,
							age: User.user_info.age,
							sex: User.user_info.sex,
							user_name: User.user_info.user_name,
							user_surname: User.user_info.user_surname,
							phone_number: User.user_info.phone_number,
							profile_image_base64: User.user_info.profile_image_base64,
							school_id: School.school_id,
							school_name: School.name,
							school_user_id: School.school_user_id,
							class_name: Class.class_name,
							school_classes_id: Class.school_classes_id,
							school_classes_students_id: Class.school_classes_students_id
						};

						// Replace empty results with undefined
						for (const key in profile) {
							if (profile[key] === '') profile[key] = undefined;
						}

						usersProfiles.push(profile);
					}
				}
			}
		} catch (error) {
			if (error.name === 'TypeError') {
				throw new Error('Error parsing user data, try to get users manually, using userData() method');
			} else {
				throw error;
			}
		}

		return usersProfiles;
	}

	/**
	 * Get user data.
	 * @returns Returns object with all data about user.
	 */
	public async userData(): Promise<UserDataResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'user_data',
				access_token: this.accessToken,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get api's detailed information.
	 * @returns Returns object with available api's.
	 */
	public async apisDetailed(): Promise<ApisDetailedResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'all_device_apis_detailed',
				access_token: this.accessToken,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get number of unseen events.
	 * @returns Returns number of unseen events.
	 */
	public async unseenEvents(): Promise<UnseenEventsResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'unseen_events_count',
				access_token: this.accessToken,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);
		
		return response.data;
	}

	/**
	 * Mark all events as seen.
	 * @returns Action status.
	 */
	public async markAsSeen(): Promise<MarkAsSeenResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'mark_user_activities_seen',
				access_token: this.accessToken,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get info about plus services.
	 * @returns Returns object plus services info.
	 */
	public async plusServicesInfo(): Promise<PlusServicesInfoResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'plus_services',
				access_token: this.accessToken,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;

	}

	/**
	 * Get user profile image.
	 * @param size Image size. ( "SMALL" or "MEDIUM")
	 * @returns Returns image in base64 format.
	 */
	public async userProfileImage(size: ImageSize): Promise<string> {
		if (typeof this.accessToken !== 'string') await this.authorize();

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

		return response.data;
	}

	/**
	 * Get lessons plan.
	 * @param config Time frame, school classes id and school user id.
	 * @returns Returns object with lessons plan.
	 */
	public async lessonsPlan(config: Partial<TimeFrameWithInfo> = {}): Promise<LessonsPlanResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
		const dateTo = DayJS(config.to).format('YYYY-MM-DD');

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'user_lessonsplan',
				access_token: this.accessToken,
				date_from: dateFrom,
				date_to: dateTo,
				school_classes_id: config.school_classes_id,
				school_user_id: config.school_user_id,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get user activities.
	 * @param config Time frame.
	 * @returns Returns object with all user activities.
	 */
	public async userActivities(config: TimeFrame): Promise<UserActivitiesResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
		const dateTo = DayJS(config.to).format('YYYY-MM-DD');

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

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get user grades. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @returns Returns object with grades.
	 */
	public async userGrades(config: TimeFrameWithSortingType): Promise<UserGradesResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
		const dateTo = DayJS(config.to).format('YYYY-MM-DD');

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'user_grades',
				access_token: this.accessToken,
				date_from: dateFrom,
				date_to: dateTo,
				school_classes_id: config.school_classes_id,
				school_user_id: config.school_user_id,
				sorting_type: config.sorting_type,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;

	}

	/**
	 * Get user attendance. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @returns Returns object with attendance.
	 */
	public async userAttendance(config: TimeFrameWithSortingType): Promise<UserAttendanceResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
		const dateTo = DayJS(config.to).format('YYYY-MM-DD');

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'user_attendance',
				access_token: this.accessToken,
				date_from: dateFrom,
				date_to: dateTo,
				school_classes_id: config.school_classes_id,
				school_user_id: config.school_user_id,
				sorting_type: config.sorting_type,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get user assignments. ( Mykoob Plus Only )
	 * @param config Time frame, sorting type, school classes id and school user id.
	 * @returns Returns object with assignments.
	 */
	public async userAssignments(config: TimeFrameWithSortingType): Promise<UserAssignmentsResponse> {
		if (typeof this.accessToken !== 'string') await this.authorize();

		const dateFrom = DayJS(config.from).format('YYYY-MM-DD');
		const dateTo = DayJS(config.to).format('YYYY-MM-DD');

		const response = await Axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.resourcesURL,
			data: Qs.stringify({
				api: 'user_assignments',
				access_token: this.accessToken,
				date_from: dateFrom,
				date_to: dateTo,
				school_classes_id: config.school_classes_id,
				school_user_id: config.school_user_id,
				sorting_type: config.sorting_type,
			}),
		});

		if (typeof response.data !== 'object') throw new Error('Response contains invalid data');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

}

export = MykoobAPI;
