export interface RequestConfig {

	/** Authorization email. */
	email?: string;

	/** Authorization password. */
	password?: string;

	/** Access token for authentification. */
	accessToken?: string;

	/** Request timeout. */
	timeout?: number;
}
