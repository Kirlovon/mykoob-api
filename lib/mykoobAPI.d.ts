import { RequestConfig } from './declarations';
declare class MykoobAPI {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout: number;
    private resourcesURL;
    private authorizationURL;
    constructor(config?: RequestConfig);
    authorize(config?: RequestConfig): Promise<any>;
}
export = MykoobAPI;
