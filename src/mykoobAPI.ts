/** Dependencies */
import request from "request-promise"

/** Interfaces */
import { authorizationData, timeFrame } from "./Interfaces"

/** Rest API wrapper to work with Mykoob! */
class mykoobAPI {

	/** 
	 * Ping www.mykoob.lv 
	 * @returns Returns status code
	*/
	public async ping(): Promise<number> {

		let response = await request({
			method: "GET",
			timeout: 10000,
			resolveWithFullResponse: true,
			url: "https://www.mykoob.lv/",
		})

		return response.statusCode
	}

	/** 
	 * Get mykoob authorization token
	 * @param userData Authorization data
	 * @returns Returns object with data and authorization status
	*/
	public async authorize(userData: authorizationData): Promise<object> {

		let response = await request({
			method: "POST",
			timeout: 10000,
			url: "https://www.mykoob.lv/?oauth2/authorizeDevice",
			form: {
				use_oauth_proxy: 1,
				client: "MykoobMobile",
				username: userData.username,
				password: userData.password
			}
		})

		return JSON.parse(response)
	}

	/** 
	 * Get api's detailed information
	 * @param token Authorization token from authorize() method
	 * @returns Returns object with available api's
	*/
	public async apisDetailed(token: string) {

		let response = await request({
			method: "POST",
			timeout: 10000,
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
	 * @param token Authorization token from authorize() method
	 * @returns Returns object with all data about user
	*/
	public async userData(token: string) {

		let response = await request({
			method: "POST",
			timeout: 10000,
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
	 * @param token Authorization token from authorize() method
	 * @param date Time frame of the necessary information
	 * @returns Returns object with all user activities
	*/
	public async userActivities(token: string, date: timeFrame) {

		let response = await request({
			method: "POST",
			timeout: 10000,
			url: "https://www.mykoob.lv//?api/resource",
			form: {
				api: "user_activities",
				access_token: token,
				date_from: date.from,
				date_to: date.to
			}
		})

		return JSON.parse(response)
	}

}

/** Class export */
export = mykoobAPI