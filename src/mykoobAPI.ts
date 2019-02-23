// Dependencies
import axios from 'axios';
import qs from 'qs';

// Declarations
import { RequestConfig } from './declarations';

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
	 * Get mykoob access token
	 * @param data Authorization data
	 * @returns Returns object with access token and authorization status
	 */
	public async authorize(config: RequestConfig = {}): Promise<any> {

		// Get email
		let email;
		if (typeof config.email === 'string') {
			email = config.email;
		} else if (typeof this.email === 'string') {
			email = this.email;
		} else {
			throw new Error('Email is not specified');
		}

		// Get password
		let password;
		if (typeof config.password === 'string') {
			password = config.password;
		} else if (typeof this.password === 'string') {
			password = this.password;
		} else {
			throw new Error('Password is not specified');
		}

		// Send request
		const response = await axios({
			method: 'POST',
			timeout: this.timeout,
			url: this.authorizationURL,
			data: qs.stringify({
				use_oauth_proxy: 1,
				client: 'MykoobMobile',
				username: email,
				password: password,
			}),
		});

		return response.data;
	}

}

export = MykoobAPI;
