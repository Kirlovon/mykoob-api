export interface authorize {
    readonly username: string;
    readonly password: string;
}
export interface userActivities {
    readonly from: string;
    readonly to: string;
}
export interface lessonsPlan {
    readonly from: string;
    readonly to: string;
    readonly classesID: number;
    readonly userID: number;
}
export declare type imageSize = "SMALL" | "MEDIUM";
