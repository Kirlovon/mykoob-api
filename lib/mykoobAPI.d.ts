import { MykoobAPIConfig, TimeFrame, TimeFrameWithInfo, TimeFrameWithSortingType, UserProfile, ImageSize } from './definitions';
import { GetAuthentificationDataResponse, UserDataResponse, PlusServicesInfoResponse, ApisDetailedResponse, UnseenEventsResponse, MarkAsSeenResponse, LessonsPlanResponse, UserActivitiesResponse, UserGradesResponse, UserAttendanceResponse, UserAssignmentsResponse } from './responses';
declare class MykoobAPI {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout: number;
    resourcesURL: string;
    authorizationURL: string;
    constructor(config?: Partial<MykoobAPIConfig>);
    authorize(): Promise<void>;
    getAuthentificationData(): Promise<GetAuthentificationDataResponse>;
    getUsers(): Promise<UserProfile[]>;
    userData(): Promise<UserDataResponse>;
    apisDetailed(): Promise<ApisDetailedResponse>;
    unseenEvents(): Promise<UnseenEventsResponse>;
    markAsSeen(): Promise<MarkAsSeenResponse>;
    plusServicesInfo(): Promise<PlusServicesInfoResponse>;
    userProfileImage(size: ImageSize): Promise<string>;
    lessonsPlan(config?: Partial<TimeFrameWithInfo>): Promise<LessonsPlanResponse>;
    userActivities(config: TimeFrame): Promise<UserActivitiesResponse>;
    userGrades(config: TimeFrameWithSortingType): Promise<UserGradesResponse>;
    userAttendance(config: TimeFrameWithSortingType): Promise<UserAttendanceResponse>;
    userAssignments(config: TimeFrameWithSortingType): Promise<UserAssignmentsResponse>;
}
export = MykoobAPI;
