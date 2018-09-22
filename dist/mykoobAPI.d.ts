import * as interfaces from "./Interfaces";
declare class mykoobAPI {
    timeout: number;
    ping(): Promise<number>;
    getAppTranslations(): Promise<any>;
    authorize(data: interfaces.authorize): Promise<any>;
    apisDetailed(token: string): Promise<any>;
    userData(token: string): Promise<any>;
    userActivities(token: string, config: interfaces.userActivities): Promise<any>;
    lessonsPlan(token: string, config: interfaces.lessonsPlan): Promise<any>;
}
export = mykoobAPI;
