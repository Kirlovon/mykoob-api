import { MykoobAPIConfig, TimeFrame, TimeFrameWithInfo, TimeFrameWithSortingType, UsersList, ImageSize } from './definitions';
import { GetAuthentificationDataResponse, UserDataResponse, PlusServicesInfoResponse, ApisDetailedResponse, UnseenEventsResponse, MarkAsSeenResponse, LessonsPlanResponse, UserActivitiesResponse, UserGradesResponse, UserAttendanceResponse, UserAssignmentsResponse } from './responses';
declare class MykoobAPI {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout: number;
    private readonly resourcesURL;
    private readonly authorizationURL;
    constructor(config?: MykoobAPIConfig);
    getAuthentificationData(): Promise<GetAuthentificationDataResponse>;
    getUsers(): Promise<UsersList>;
    userData(): Promise<UserDataResponse>;
    apisDetailed(): Promise<ApisDetailedResponse>;
    unseenEvents(): Promise<UnseenEventsResponse>;
    markAsSeen(): Promise<MarkAsSeenResponse>;
    plusServicesInfo(): Promise<PlusServicesInfoResponse>;
    userProfileImage(size: ImageSize): Promise<string>;
    lessonsPlan(config?: TimeFrameWithInfo): Promise<LessonsPlanResponse>;
    userActivities(config: TimeFrame): Promise<UserActivitiesResponse>;
    userGrades(config: TimeFrameWithSortingType): Promise<UserGradesResponse>;
    userAttendance(config: TimeFrameWithSortingType): Promise<UserAttendanceResponse>;
    userAssignments(config: TimeFrameWithSortingType): Promise<UserAssignmentsResponse>;
}
export = MykoobAPI;
