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
	from?: string;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to?: string;
}

/** Config for lessonsPlan() method */
export interface TimeFrameWithInfo {

	/** Beginning of time frame in "YYYY-MM-DD" format. */
	from?: string;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to?: string;

	/** Classes ID from userData() method. */
	schoolClassesID?: number;

	/** User ID from userData() method. */
	schoolUserID?: number;
}

/** Config for userGrades(), userAttendance() and userAssignments() methods. */
export interface TimeFrameWithSortingType {

	/** Beginning of time frame in "YYYY-MM-DD" format. */
	from?: string;

	/** Ending of time frame in "YYYY-MM-DD" format. */
	to?: string;

	/** Classes ID from userData() method. */
	schoolClassesID?: number;

	/** User ID from userData() method. */
	schoolUserID?: number;

	/** Sorting type. ( 1 - by order, 0 - by execution ) */
	sortingType?: 0 | 1;
}

/** Type for image size. */
export type ImageSize = 'SMALL' | 'MEDIUM';
