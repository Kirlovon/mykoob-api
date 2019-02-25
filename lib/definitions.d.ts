export interface MykoobAPIConfig {
    email?: string;
    password?: string;
    accessToken?: string;
    timeout?: number;
}
export interface TimeFrame {
    from?: string;
    to?: string;
}
export interface TimeFrameWithInfo {
    from?: string;
    to?: string;
    schoolClassesID?: number;
    schoolUserID?: number;
}
export interface TimeFrameWithSortingType {
    from?: string;
    to?: string;
    schoolClassesID?: number;
    schoolUserID?: number;
    sortingType?: 0 | 1;
}
export declare type ImageSize = 'SMALL' | 'MEDIUM';
