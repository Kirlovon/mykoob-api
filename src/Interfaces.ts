/** Wrapper config */
export interface config {
	readonly timeout?: number
}

/** Authorization data */
export interface authorizationData {
	readonly username: string
	readonly password: string
}

/** Date */
export interface timeFrame {
	readonly from: string
	readonly to: string
}