export interface authorize {
    readonly email: string;
    readonly password: string;
}
export interface timeFrame {
    readonly from: string;
    readonly to: string;
}
export interface timeFrameWithInfo {
    readonly from: string;
    readonly to: string;
    readonly schoolClassesID: number;
    readonly schoolUserID: number;
}
export interface timeFrameWithSortingType {
    readonly from: string;
    readonly to: string;
    readonly schoolClassesID: number;
    readonly schoolUserID: number;
    readonly sortingType: 0 | 1;
}
export declare type imageSize = "SMALL" | "MEDIUM";
