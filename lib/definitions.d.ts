export interface RequestConfig {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout?: number;
}
export interface AuthorizationConfig {
    email?: string;
    password?: string;
    timeout?: number;
}
export declare type AuthentificationData = {
    access_token?: string;
    expires_in?: string | number;
    token_type?: string;
    scope?: string;
    refresh_token?: string;
    user_id?: number;
} | any;
