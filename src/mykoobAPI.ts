/** Dependencies */
import qs from "qs"
import axios from "axios"
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
	private resourcesURL: string = "https://www.mykoob.lv/?api/resource"

	/** URL for Mykoob Authorization API */
	private authorizationURL: string = "https://www.mykoob.lv/?oauth2/authorizeDevice"

	/** 
	 * Get mykoob access token
	 * @param data Authorization data
	 * @returns Returns object with access token and authorization status
	*/
	public async authorize(data: definitions.authorize): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.authorizationURL,
			data: qs.stringify({
				use_oauth_proxy: 1,
				client: "MykoobMobile",
				username: data.email,
				password: data.password
			})
		})

		// Remove useless data
		if (this.filter) {
			delete response.data.token_type
			delete response.data.refresh_token
			delete response.data.scope
		}

		return response.data
	}

	/** 
	 * Get api's detailed information
	 * @param token Access token from authorize() method
	 * @returns Returns object with available api's
	*/
	public async apisDetailed(token: string): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "all_device_apis_detailed",
				access_token: token,
			})
		})

		// Remove useless data
		if (this.filter) {
			for (let index in response) {
				delete response.data[index].in
				delete response.data[index].out
				delete response.data[index].errors
			}
			delete response.data.register_device
			delete response.data.unregister_device
			delete response.data.notification_settings
		}

		return response.data
	}

	/** 
	 * Get user data
	 * @param token Access token from authorize() method
	 * @returns Returns object with all data about user
	*/
	public async userData(token: string): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "user_data",
				access_token: token,
			})
		})

		// Remove useless data
		if (this.filter) {
			delete response.data.user_data.plus_ends
			delete response.data.user_data.plus_service
			delete response.data.user_data.plus_owner_name
			delete response.data.user_data.plus_provider
			delete response.data.user_data.plus_price_display
		}

		return response.data
	}

	/** 
	 * Get user grades ( Mykoob Plus Only )
	 * @param token Access token from authorize() method
	 * @param config Time frame, sorting type, school classes id and school user id
	 * @returns Returns object with grades
	*/
	public async userGrades(token: string, config: definitions.timeFrameWithSortingType) {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "user_grades",
				access_token: token,
				date_from: config.from,
				date_to: config.to,
				school_classes_id: config.schoolClassesID,
				school_user_id: config.schoolUserID,
				sorting_type: config.sortingType
			})
		})

		return response.data
	}

	/** 
	 * Get user attendance ( Mykoob Plus Only )
	 * @param token Access token from authorize() method
	 * @param config Time frame, sorting type, school classes id and school user id
	 * @returns Returns object with attendance
	*/
	public async userAttendance(token: string, config: definitions.timeFrameWithSortingType) {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "user_attendance",
				access_token: token,
				date_from: config.from,
				date_to: config.to,
				school_classes_id: config.schoolClassesID,
				school_user_id: config.schoolUserID,
				sorting_type: config.sortingType
			})
		})

		return response.data
	}

	/** 
	 * Get user assignments ( Mykoob Plus Only )
	 * @param token Access token from authorize() method
	 * @param config Time frame, sorting type, school classes id and school user id
	 * @returns Returns object with assignments
	*/
	public async userAssignments(token: string, config: definitions.timeFrameWithSortingType) {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "user_assignments",
				access_token: token,
				date_from: config.from,
				date_to: config.to,
				school_classes_id: config.schoolClassesID,
				school_user_id: config.schoolUserID,
				sorting_type: config.sortingType
			})
		})

		return response.data
	}

	/** 
	 * Get user activities
	 * @param token Access token from authorize() method
	 * @param config Time frame
	 * @returns Returns object with all user activities
	*/
	public async userActivities(token: string, config: definitions.timeFrame): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "user_activities",
				access_token: token,
				date_from: config.from,
				date_to: config.to
			})
		})

		return response.data
	}

	/** 
	 * Get lessons plan
	 * @param token Access token from authorize() method
	 * @param config Time frame, school classes id and school user id
	 * @returns Returns object with lessons plan
	*/
	public async lessonsPlan(token: string, config: definitions.timeFrameWithInfo): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "user_lessonsplan",
				access_token: token,
				date_from: config.from,
				date_to: config.to,
				school_classes_id: config.schoolClassesID,
				school_user_id: config.schoolUserID
			})
		})

		return response.data
	}

	/** 
	 * Get user profile image
	 * @param token Access token from authorize() method
	 * @param size Image size ( "SMALL" or "MEDIUM")
	 * @returns Returns image in base64 format
	*/
	public async userProfileImage(token: string, size: definitions.imageSize): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "user_profile_image",
				access_token: token,
				own_image: true,
				use_base64: true,
				dont_use_json: false,
				image_size: size
			})
		})

		return response.data
	}

	/** 
	 * Get number of unseen events
	 * @param token Access token from authorize() method
	 * @returns Returns number of unseen events
	*/
	public async unseenEvents(token: string): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "unseen_events_count",
				access_token: token,
			})
		})

		// Remove useless data
		if (this.filter) {
			return response.data.unseen_events_count.activities
		}

		return response.data
	}

	/** 
	 * Mark all events as seen
	 * @param token Access token from authorize() method
	 * @returns Action status
	*/
	public async markAsSeen(token: string): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "mark_user_activities_seen",
				access_token: token,
			})
		})

		return response.data
	}

	/**
	 * Get info about plus services
	 * @param token Access token from authorize() method
	 * @returns Returns object plus services info
	 */
	public async plusServicesInfo(token: string): Promise<any> {

		let response = await axios({
			method: "POST",
			timeout: this.timeout,
			url: this.resourcesURL,
			data: qs.stringify({
				api: "plus_services",
				access_token: token,
			})
		})

		return response.data
	}

}

/** Class export */
export = mykoobAPI