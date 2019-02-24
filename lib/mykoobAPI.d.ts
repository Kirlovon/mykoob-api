import { RequestConfig, AuthorizationConfig, AuthentificationData } from './definitions';
declare class MykoobAPI {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout: number;
    private readonly resourcesURL;
    private readonly authorizationURL;
    constructor(config?: RequestConfig);
    getAuthentificationData(config?: AuthorizationConfig): Promise<AuthentificationData>;
    private getTimeout;
    private getEmail;
    private getPassword;
    private getAccessToken;
}
export = MykoobAPI;
