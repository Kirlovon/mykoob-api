// Dependencies
import Axios from 'axios';
import Qs from 'qs';

// Definitions
import { RequestConfig, AuthorizationConfig, AuthentificationData } from './definitions';

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
	constructor(config: RequestConfig = {}) {
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
	public async getAuthentificationData(config: AuthorizationConfig = {}): Promise<AuthentificationData> {

		// Get data
		const timeout = this.getTimeout(config.timeout);
		const email = this.getEmail(config.email);
		const password = this.getPassword(config.password);

		// Throws error, if data is undefined
		if (typeof email === 'undefined') throw new Error('Email is not specified');
		if (typeof password === 'undefined') throw new Error('Password is not specified');

		// Send request
		const response = await Axios({
			method: 'POST',
			timeout: timeout,
			url: this.authorizationURL,
			data: Qs.stringify({
				use_oauth_proxy: 1,
				client: 'MykoobMobile',
				username: email,
				password: password,
			}),
		});

		// Throws error, if something goes wrong
		if (typeof response.data.error !== 'undefined') throw new Error(response.data.error.message);
		if (typeof response.data === 'undefined' || response.status !== 200) throw new Error('Response error');

		return response.data;
	}

	/** 
	 * Get timeout
	 * @param timeout
	 * @returns Returns timeout
	 */
	private getTimeout(timeout?: number): number {
		if (typeof timeout === 'number') {
			return timeout;
		} else if (typeof this.timeout === 'number') {
			return this.timeout;
		} else {
			return 10000;
		}
	}

	/** 
	 * Get email
	 * @param email
	 * @returns Returns email
	 */
	private getEmail(email?: string): string | undefined {
		if (typeof email === 'string') {
			return email;
		} else if (typeof this.email === 'string') {
			return this.email;
		} else {
			return undefined;
		}
	}

	/** 
	 * Get password
	 * @param password
	 * @returns Returns password
	 */
	private getPassword(password?: string): string | undefined {
		if (typeof password === 'string') {
			return password;
		} else if (typeof this.password === 'string') {
			return this.password;
		} else {
			return undefined;
		}
	}

	/** 
	 * Get access token
	 * @param accessToken
	 * @returns Returns access token
	 */
	private getAccessToken(accessToken?: string): string | undefined {
		if (typeof accessToken === 'string') {
			return accessToken;
		} else if (typeof this.accessToken === 'string') {
			return this.accessToken;
		} else {
			return undefined;
		}
	}

}

export = MykoobAPI;
