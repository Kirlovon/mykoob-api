/** Interface for requests. */
export interface MykoobAPIConfig {

	/** Authorization email. */
	email: string;

	/** Authorization password. */
	password: string;

	/** Access token for authentification. */
	accessToken: string;

	/** Request timeout. */
	timeout: number;
}

/** Config for userActivities() method. */
export type TimeFrame = Partial<{

	/** Beginning of time frame in "YYYY-MM-DD" format. */
	from: string | number;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to: string | number;
}>;

/** Config for lessonsPlan() method */
export type TimeFrameWithInfo = Partial<{

	/** Beginning of time frame in "YYYY-MM-DD" format. */
	from: string | number;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to: string | number;

	/** Classes ID from userData() method. */
	schoolClassesID: number;

	/** User ID from userData() method. */
	schoolUserID: number;
}>;

/** Config for userGrades(), userAttendance() and userAssignments() methods. */
export type TimeFrameWithSortingType = Partial<{

	/** Beginning of time frame in "YYYY-MM-DD" format. */
	from: string | number;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to: string | number;

	/** Classes ID from userData() method. */
	schoolClassesID: number;

	/** User ID from userData() method. */
	schoolUserID: number;

	/** Sorting type. ( 1 - by order, 0 - by execution ) */
	sortingType: 0 | 1;
}>;

/** Object with user info from getUsers method. */
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

/** Type for image size. */
export type ImageSize = 'SMALL' | 'MEDIUM';
