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
    readonly classesID: string;
    readonly userID: string;
}
