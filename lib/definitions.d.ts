export interface MykoobAPIConfig {
    email: string;
    password: string;
    accessToken: string;
    timeout: number;
}
export declare type TimeFrame = Partial<{
    from: string | number;
    to: string | number;
}>;
export declare type TimeFrameWithInfo = Partial<{
    from: string | number;
    to: string | number;
    schoolClassesID: number;
    schoolUserID: number;
}>;
export declare type TimeFrameWithSortingType = Partial<{
    from: string | number;
    to: string | number;
    schoolClassesID: number;
    schoolUserID: number;
    sortingType: 0 | 1;
}>;
export interface UserProfile {
    user_id: number | string | null;
    age: string | number | null;
    sex: string | null;
    user_name: string | null;
    user_surname: string | null;
    phone_number: string | number | null;
    profile_image_base64: string | null;
    school_id: number | null;
    school_name: string | null;
    school_user_id: number | null;
    class_name: string | null;
    school_classes_id: number | null;
    school_classes_students_id: number | null;
}
export declare type ImageSize = 'SMALL' | 'MEDIUM';
