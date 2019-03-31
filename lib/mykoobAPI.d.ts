import { MykoobAPIConfig, TimeFrame, TimeFrameWithInfo, TimeFrameWithSortingType, UsersList, ImageSize, ErrorCallback } from './definitions';
import { GetAuthentificationDataResponse, UserDataResponse, PlusServicesInfoResponse, ApisDetailedResponse, UnseenEventsResponse, MarkAsSeenResponse, LessonsPlanResponse, UserActivitiesResponse, UserGradesResponse, UserAttendanceResponse, UserAssignmentsResponse } from './responses';
declare class MykoobAPI {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout: number;
    private readonly resourcesURL;
    private readonly authorizationURL;
    constructor(config?: MykoobAPIConfig);
    getAuthentificationData(errorCallback?: ErrorCallback): Promise<GetAuthentificationDataResponse>;
    getUsers(errorCallback?: ErrorCallback): Promise<UsersList>;
    userData(errorCallback?: ErrorCallback): Promise<UserDataResponse>;
    apisDetailed(errorCallback?: ErrorCallback): Promise<ApisDetailedResponse>;
    unseenEvents(errorCallback?: ErrorCallback): Promise<UnseenEventsResponse>;
    markAsSeen(errorCallback?: ErrorCallback): Promise<MarkAsSeenResponse>;
    plusServicesInfo(errorCallback?: ErrorCallback): Promise<PlusServicesInfoResponse>;
    userProfileImage(size: ImageSize, errorCallback?: ErrorCallback): Promise<string>;
    lessonsPlan(config?: TimeFrameWithInfo, errorCallback?: ErrorCallback): Promise<LessonsPlanResponse>;
    userActivities(config: TimeFrame, errorCallback?: ErrorCallback): Promise<UserActivitiesResponse>;
    userGrades(config: TimeFrameWithSortingType, errorCallback?: ErrorCallback): Promise<UserGradesResponse>;
    userAttendance(config: TimeFrameWithSortingType, errorCallback?: ErrorCallback): Promise<UserAttendanceResponse>;
    userAssignments(config: TimeFrameWithSortingType, errorCallback?: ErrorCallback): Promise<UserAssignmentsResponse>;
}
export = MykoobAPI;
