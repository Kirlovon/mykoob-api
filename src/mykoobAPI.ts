/** Dependencies */
import request from "request-promise"

/** Interfaces */
import * as interfaces from "./Interfaces"

/** Rest API wrapper to work with Mykoob! */
class mykoobAPI {

	/** Requests timeout */
	public timeout: number = 10000

	/** 
	 * Ping www.mykoob.lv 
	 * @returns Returns status code
	*/
	public async ping(): Promise<number> {

		let response = await request({
			method: "GET",
			timeout: this.timeout,
			resolveWithFullResponse: true,
			url: "https://www.mykoob.lv/",
		})

		return response.statusCode
	}

	/** 
	 * Get translations
	 * @returns Returns object with translations on Latvian, Russian and English languages
	*/
	public async getAppTranslations(): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: "https://www.mykoob.lv/?oauth2/getAppTranslations",
			form: { all: true }
		})

		return JSON.parse(response)
	}

	/** 
	 * Get mykoob access token
	 * @param data Authorization data
	 * @returns Returns object with access token and authorization status
	*/
	public async authorize(data: interfaces.authorize): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: "https://www.mykoob.lv/?oauth2/authorizeDevice",
			form: {
				use_oauth_proxy: 1,
				client: "MykoobMobile",
				username: data.username,
				password: data.password
			}
		})

		return JSON.parse(response)
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
			url: "https://www.mykoob.lv//?api/resource",
			form: {
				api: "user_data",
				access_token: token,
			}
		})

		return JSON.parse(response)
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
			url: "https://www.mykoob.lv//?api/resource",
			form: {
				api: "user_data",
				access_token: token,
			}
		})

		return JSON.parse(response)
	}

	/** 
	 * Get user activities
	 * @param token Access token from authorize() method
	 * @param config Time frame of the necessary information in "YYYY-MM-DD" format
	 * @returns Returns object with all user activities
	*/
	public async userActivities(token: string, config: interfaces.userActivities): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: "https://www.mykoob.lv//?api/resource",
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
	 * @param config Time frame of the necessary lessons plan in "YYYY-MM-DD" format
	 * @returns Returns object with lessons plan
	*/
	public async lessonsPlan(token: string, config: interfaces.lessonsPlan): Promise<any> {

		let response = await request({
			method: "POST",
			timeout: this.timeout,
			url: "https://www.mykoob.lv//?api/resource",
			form: {
				api: "user_lessonsplan",
				access_token: token,
				date_from: config.from,
				date_to: config.to,
				school_classes_id: config.classesID,
				school_user_id: config.userID
			}
		})

		return JSON.parse(response)
	}
}

/** Class export */
export = mykoobAPI