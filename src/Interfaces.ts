/** Authorization data */
export interface authorize {

	/** Authorization Email */
	readonly username: string

	/** Authorization Password */
	readonly password: string
}

/** Config for userActivities() method */
export interface userActivities {

	/** Beginning of time frame in "YYYY-MM-DD" format */
	readonly from: string

	/** Ending of time frame in "YYYY-MM-DD" format */
	readonly to: string
}

/** Config for lessonsPlan() method */
export interface lessonsPlan {

	/** Beginning of time frame in "YYYY-MM-DD" format */
	readonly from: string

	/** Ending of time frame in "YYYY-MM-DD" format */
	readonly to: string

	/** Classes ID from userData() method */
	readonly classesID: string

	/** User ID from userData() method */
	readonly userID: string
}