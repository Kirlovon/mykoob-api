// Dependencies
import Axios from 'axios';
import Qs from 'qs';

// Definitions
import {
	MykoobAPIConfig,
	TimeFrame,
	TimeFrameWithInfo,
	TimeFrameWithSortingType,
	ImageSize
} from './definitions';

// API Responses
import {
	getAuthentificationDataResponse,
	UserDataResponse,
	PlusServicesInfoResponse,
	ApisDetailedResponse,
	UnseenEventsResponse,
	MarkAsSeenResponse,
	LessonsPlanResponse,
	UserActivitiesResponse
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
	 * 
	 * ### Example
	 * ```javascript
	 * const api = new MykoobAPI({ 
	 * 	email: 'email@outlook.com',
	 * 	password: 'qwerty123'
	 * });
	 * 
	 * api.getAuthentificationData().then(data => {
	 * 	console.info(data.access_token); // '0a1b3c4d......'
	 * 	console.info(data.user_id);	// 12345
	 * 	console.info(data.expires_in); // 9876543
	 * });
	 * ```
	 */
	public async getAuthentificationData(): Promise<getAuthentificationDataResponse | any> {

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
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);
		if (typeof response.data.access_token !== 'string') throw new Error('Response error');

		return response.data;
	}

	/**
	 * Get user data.
	 * @returns Returns object with all data about user.
	 */
	public async userData(): Promise<UserDataResponse | any> {

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
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get api's detailed information.
	 * @returns Returns object with available api's.
	 */
	public async apisDetailed(): Promise<ApisDetailedResponse | any> {

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
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get number of unseen events
	 * @returns Returns number of unseen events
	 */
	public async unseenEvents(): Promise<UnseenEventsResponse | any> {

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
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Mark all events as seen.
	 * @returns Action status.
	 */
	public async markAsSeen(): Promise<MarkAsSeenResponse | any> {

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
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get info about plus services.
	 * @returns Returns object plus services info.
	 */
	public async plusServicesInfo(): Promise<PlusServicesInfoResponse | any> {

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
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get user profile image.
	 * @param size Image size ( "SMALL" or "MEDIUM").
	 * @returns Returns image in base64 format.
	 */
	public async userProfileImage(size: ImageSize): Promise<string | any> {

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
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get lessons plan.
	 * @param config Time frame, school classes id and school user id.
	 * @returns Returns object with lessons plan.
	 */
	public async lessonsPlan(config: TimeFrameWithInfo = {}): Promise<LessonsPlanResponse | any> {

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
				api: 'user_lessonsplan',
				access_token: this.accessToken,
				date_from: config.from,
				date_to: config.to,
				school_classes_id: config.schoolClassesID,
				school_user_id: config.schoolUserID,
			}),
		});

		// Throws error, if something goes wrong
		if (response.status !== 200) throw new Error('Response error');
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

	/**
	 * Get user activities.
	 * @param config Time frame.
	 * @returns Returns object with all user activities.
	 */
	public async userActivities(config: TimeFrame): Promise<UserActivitiesResponse | any> {

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
				api: 'user_activities',
				access_token: this.accessToken,
				date_from: config.from,
				date_to: config.to,
			}),
		});

		// Throws error, if something goes wrong
		if (response.status !== 200) throw new Error('Response error');
		if (typeof response.data === 'undefined') throw new Error('Response error');
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);

		return response.data;
	}

}

export = MykoobAPI;
