/** Interface for requests. */
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

/** Interface for authorization. */
export interface AuthorizationConfig {

	/** Authorization email. */
	email?: string;

	/** Authorization password. */
	password?: string;

	/** Request timeout. */
	timeout?: number;
}

/** Response from getAuthentificationData method. */
export type AuthentificationData = {
	access_token?: string;
	expires_in?: string | number;
	token_type?: string;
	scope?: string;
	refresh_token?: string;
	user_id?: number;
} | any;
