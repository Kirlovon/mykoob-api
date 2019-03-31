/** Interface for requests. */
export interface MykoobAPIConfig {

	/** Authorization email. */
	email?: string;

	/** Authorization password. */
	password?: string;

	/** Access token for authentification. */
	accessToken?: string;

	/** Request timeout. */
	timeout?: number;
}

/** Config for userActivities() method. */
export interface TimeFrame {

	/** Beginning of time frame in "YYYY-MM-DD" format. */
	from?: string | number;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to?: string | number;
}

/** Config for lessonsPlan() method */
export interface TimeFrameWithInfo {

	/** Beginning of time frame in "YYYY-MM-DD" format. */
	from?: string | number;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to?: string | number;

	/** Classes ID from userData() method. */
	schoolClassesID?: number;

	/** User ID from userData() method. */
	schoolUserID?: number;
}

/** Config for userGrades(), userAttendance() and userAssignments() methods. */
export interface TimeFrameWithSortingType {

	/** Beginning of time frame in "YYYY-MM-DD" format. */
	from?: string | number;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to?: string | number;

	/** Classes ID from userData() method. */
	schoolClassesID?: number;

	/** User ID from userData() method. */
	schoolUserID?: number;

	/** Sorting type. ( 1 - by order, 0 - by execution ) */
	sortingType?: 0 | 1;
}

/** Object with users info from getUsers method. */
export type UsersList = {
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

/** Type for image size. */
export type ImageSize = 'SMALL' | 'MEDIUM';

/** Type for callback with error. */
export type ErrorCallback = (error: Error) => void;
