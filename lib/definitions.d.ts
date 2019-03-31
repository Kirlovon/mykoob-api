export interface MykoobAPIConfig {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout?: number;
}
export interface TimeFrame {
    from?: string | number;
    to?: string | number;
}
export interface TimeFrameWithInfo {
    from?: string | number;
    to?: string | number;
    schoolClassesID?: number;
    schoolUserID?: number;
}
export interface TimeFrameWithSortingType {
    from?: string | number;
    to?: string | number;
    schoolClassesID?: number;
    schoolUserID?: number;
    sortingType?: 0 | 1;
}
export declare type UsersList = {
    userID?: number | string | null;
    userAge?: string | number | null;
    userSex?: string | null;
    userName?: string | null;
    userSurname?: string | null;
    userPhoneNumber?: string | number | null;
    userProfileImage?: string | null;
    schoolID?: number | null;
    schoolName?: string | null;
    schoolUserID?: number | null;
    className?: string | null;
    schoolClassesID?: number | null;
    schoolClassesStudentsID?: number | null;
}[];
export declare type ImageSize = 'SMALL' | 'MEDIUM';
export declare type ErrorCallback = (error: Error) => void;
