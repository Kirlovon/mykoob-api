import * as definitions from "./definitions";
declare class mykoobAPI {
    timeout: number;
    filter: boolean;
    authorize(data: definitions.authorize): Promise<any>;
    apisDetailed(token: string): Promise<any>;
    userData(token: string): Promise<any>;
    userActivities(token: string, config: definitions.userActivities): Promise<any>;
    lessonsPlan(token: string, config: definitions.lessonsPlan): Promise<any>;
    userProfileImage(token: string, size: definitions.imageSize): Promise<any>;
}
export default mykoobAPI;
