/** Authorization data */
export interface authorize {
	/** Authorization Email */
	readonly email: string;

	/** Authorization Password */
	readonly password: string;
}

/** Config for userActivities() method */
export interface timeFrame {
	/** Beginning of time frame in "YYYY-MM-DD" format */
	readonly from: string;

	/** Ending of time frame in "YYYY-MM-DD" format */
	readonly to: string;
}

/** Config for lessonsPlan() method */
export interface timeFrameWithInfo {
	/** Beginning of time frame in "YYYY-MM-DD" format */
	readonly from: string;

	/** Ending of time frame in "YYYY-MM-DD" format */
	readonly to: string;

	/** Classes ID from userData() method */
	readonly schoolClassesID: number;

	/** User ID from userData() method */
	readonly schoolUserID: number;
}

/** Config for userGrades(), userAttendance() and userAssignments() methods */
export interface timeFrameWithSortingType {
	/** Beginning of time frame in "YYYY-MM-DD" format */
	readonly from: string;

	/** Ending of time frame in "YYYY-MM-DD" format */
	readonly to: string;

	/** Classes ID from userData() method */
	readonly schoolClassesID: number;

	/** User ID from userData() method */
	readonly schoolUserID: number;

	/** Sorting type ( 1 - by order, 0 - by execution ) */
	readonly sortingType: 0 | 1;
}

/** Image size for userProfileImage() method */
export type imageSize = 'SMALL' | 'MEDIUM';
