/** Dependencies */
import request from "request-promise"

/** Definitions */
import * as definitions from "./definitions"

/** Rest API wrapper to work with Mykoob! */
class mykoobAPI {

	/** Requests timeout */
	public timeout: number = 10000

	/** Removes from responses unnecessary data */
	public filter: boolean = true

	/** URL for Mykoob Resources API */
	private resourcesURL: string = "https://www.mykoob.lv//?api/resource"

	/** URL for Mykoob Authorization API */
	private authorizationURL: string = "https://www.mykoob.lv/?oauth2/authorizeDevice"

	/** 
	 * Get mykoob access token
	 * @param data Authorization data
	 * @returns Returns object with access token and authorization status
	*/
	public async authorize(data: definitions.authorize): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: this.authorizationURL,
			form: {
				use_oauth_proxy: 1,
				client: "MykoobMobile",
				username: data.email,
				password: data.password
			}
		})

		let parsedResponse = JSON.parse(response)

		// Remove useless data
		if (this.filter) {
			delete parsedResponse.token_type
			delete parsedResponse.refresh_token
			delete parsedResponse.scope
		}

		return parsedResponse
	}

	/** 
	 * Get api's detailed information
	 * @param token Access token from authorize() method
	 * @returns Returns object with available api's
	*/
	public async apisDetailed(token: string): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			form: {
				api: "all_device_apis_detailed",
				access_token: token,
			}
		})

		let parsedResponse = JSON.parse(response)

		// Remove useless data
		if (this.filter) {
			for (let index in parsedResponse) {
				delete parsedResponse[index].in
				delete parsedResponse[index].out
				delete parsedResponse[index].errors
			}
			delete parsedResponse.register_device
			delete parsedResponse.unregister_device
			delete parsedResponse.notification_settings
		}

		return parsedResponse
	}

	/** 
	 * Get user data
	 * @param token Access token from authorize() method
	 * @returns Returns object with all data about user
	*/
	public async userData(token: string): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			form: {
				api: "user_data",
				access_token: token,
			}
		})

		let parsedResponse = JSON.parse(response)

		// Remove useless data
		if (this.filter) {
			delete parsedResponse.user_data.plus_ends
			delete parsedResponse.user_data.plus_service
			delete parsedResponse.user_data.plus_owner_name
			delete parsedResponse.user_data.plus_provider
			delete parsedResponse.user_data.plus_price_display
		}

		return parsedResponse
	}

	/** 
	 * Get user grades
	 * @param token Access token from authorize() method
	 * @param config Time frame, school classes id and school user id
	 * @returns Returns object with grades
	*/
	public async userGrades(token: string, config: definitions.timeFrameInfo) {
		
		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			form: {
				api: "user_grades",
				access_token: token,
				date_from: config.from,
				date_to: config.to,
				school_classes_id: config.schoolClassesID,
				school_user_id: config.schoolUserID
			}
		})

		return JSON.parse(response)
	}

	/** 
	 * Get user activities
	 * @param token Access token from authorize() method
	 * @param config Time frame
	 * @returns Returns object with all user activities
	*/
	public async userActivities(token: string, config: definitions.timeFrame): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			form: {
				api: "user_activities",
				access_token: token,
				date_from: config.from,
				date_to: config.to
			}
		})

		return JSON.parse(response)
	}

	/** 
	 * Get lessons plan
	 * @param token Access token from authorize() method
	 * @param config Time frame, school classes id and school user id
	 * @returns Returns object with lessons plan
	*/
	public async lessonsPlan(token: string, config: definitions.timeFrameInfo): Promise<any> {

		let response = await request({
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
		})

		return JSON.parse(response)
	}

	/** 
	 * Get user profile image
	 * @param token Access token from authorize() method
	 * @param size Image size ( "SMALL" or "MEDIUM")
	 * @returns Returns image in base64 format
	*/
	public async userProfileImage(token: string, size: definitions.imageSize): Promise<any> {

		let response = await request({
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
		})

		return JSON.parse(response)
	}

	/** 
	 * Get number of unseen events
	 * @param token Access token from authorize() method
	 * @returns Returns number of unseen events
	*/
	public async unseenEvents(token: string): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			form: {
				api: "unseen_events_count",
				access_token: token,
			}
		})

		let parsedResponse = JSON.parse(response)
		
		// Remove useless data
		if (this.filter) {
			return parsedResponse.unseen_events_count.activities
		}

		return parsedResponse
	}

	/** 
	 * Mark all events as seen
	 * @param token Access token from authorize() method
	 * @returns Action status
	*/
	public async markAsSeen(token: string): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			form: {
				api: "mark_user_activities_seen",
				access_token: token,
			}
		})
		
		return JSON.parse(response)
	}

	/**
	 * Get info about plus services
	 * @param token Access token from authorize() method
	 * @returns Returns object plus services info
	 */
	public async plusServicesInfo(token: string): Promise<any> {
		
		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			form: {
				api: "plus_services",
				access_token: token,
			}
		})

		return JSON.parse(response)
	}

}

/** Class export */
export default mykoobAPI