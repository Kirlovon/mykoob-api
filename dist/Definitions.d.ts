export interface authorize {
    readonly email: string;
    readonly password: string;
}
export interface timeFrame {
    readonly from: string;
    readonly to: string;
}
export interface timeFrameInfo {
    readonly from: string;
    readonly to: string;
    readonly schoolClassesID: number;
    readonly schoolUserID: number;
}
export declare type imageSize = "SMALL" | "MEDIUM";
