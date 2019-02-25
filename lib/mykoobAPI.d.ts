import { MykoobAPIConfig, TimeFrame, TimeFrameWithInfo, ImageSize } from './definitions';
import { getAuthentificationDataResponse, UserDataResponse, PlusServicesInfoResponse, ApisDetailedResponse, UnseenEventsResponse, MarkAsSeenResponse, LessonsPlanResponse, UserActivitiesResponse } from './responses';
declare class MykoobAPI {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout: number;
    private readonly resourcesURL;
    private readonly authorizationURL;
    constructor(config?: MykoobAPIConfig);
    getAuthentificationData(): Promise<getAuthentificationDataResponse | any>;
    userData(): Promise<UserDataResponse | any>;
    apisDetailed(): Promise<ApisDetailedResponse | any>;
    unseenEvents(): Promise<UnseenEventsResponse | any>;
    markAsSeen(): Promise<MarkAsSeenResponse | any>;
    plusServicesInfo(): Promise<PlusServicesInfoResponse | any>;
    userProfileImage(size: ImageSize): Promise<string | any>;
    lessonsPlan(config?: TimeFrameWithInfo): Promise<LessonsPlanResponse | any>;
    userActivities(config: TimeFrame): Promise<UserActivitiesResponse | any>;
}
export = MykoobAPI;
