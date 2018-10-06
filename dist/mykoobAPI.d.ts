import * as definitions from "./definitions";
declare class mykoobAPI {
    timeout: number;
    filter: boolean;
    private resourcesURL;
    private authorizationURL;
    authorize(data: definitions.authorize): Promise<any>;
    apisDetailed(token: string): Promise<any>;
    userData(token: string): Promise<any>;
    userGrades(token: string, config: definitions.timeFrameInfo): Promise<any>;
    userAttendance(token: string, config: definitions.timeFrameInfo): Promise<any>;
    userAssignments(token: string, config: definitions.timeFrameInfo): Promise<any>;
    userActivities(token: string, config: definitions.timeFrame): Promise<any>;
    lessonsPlan(token: string, config: definitions.timeFrameInfo): Promise<any>;
    userProfileImage(token: string, size: definitions.imageSize): Promise<any>;
    unseenEvents(token: string): Promise<any>;
    markAsSeen(token: string): Promise<any>;
    plusServicesInfo(token: string): Promise<any>;
}
export default mykoobAPI;
