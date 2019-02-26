
/** Response from getAuthentificationData method. */
export interface getAuthentificationDataResponse {
	access_token: string;
	expires_in: string | number;
	token_type: string;
	scope: string;
	refresh_token: string;
	user_id: number;
}

/** Response from apisDetailed method. */
export interface ApisDetailedResponse {
	user_data: { free: boolean, in: any[], out: any[], errors: any[] };
	user_profile_image: { free: boolean, in: any[], out: any[], errors: any[] };
	plus_services: { free: boolean, in: any[], out: any[], errors: any[] };
	user_lessonsplan: { free: boolean, in: any[], out: any[], errors: any[] };
	user_assignments: { free: boolean, in: any[], out: any[], errors: any[] };
	user_attendance: { free: boolean, in: any[], out: any[], errors: any[] };
	user_grades: { free: boolean, in: any[], out: any[], errors: any[] };
	register_device: { free: boolean, in: any[], out: any[], errors: any[] };
	unregister_device: { free: boolean, in: any[], out: any[], errors: any[] };
	notification_settings: { free: boolean, in: any[], out: any[], errors: any[] };
	user_activities: { free: boolean, in: any[], out: any[], errors: any[] };
	mark_user_activities_seen: { free: boolean, in: any[], out: any[], errors: any[] };
}

/** Response from userData method. */
export interface UserDataResponse {
	user_data: {
		is_parent: boolean;
		is_studen: boolean;
		plus_ends: string | number;
		plus_active: boolean;
		trial_available: boolean;
		free_period_active: boolean;
		own_data: {
			age: string | number;
			sex: string;
			user_name: string;
			user_surname: string;
			phone_number: string | number;
			user_id: number | string;
			locale: string;
		};
		plus_service: string,
		plus_owner_name: string,
		plus_provider: string,
		plus_price_display: string,
		user: {
			user_info: {
				age: string | number;
				sex: string;
				user_name: string;
				user_surname: string;
				phone_number: number | string;
				user_id: number | string;
				profile_image_base64: string;
			};
			school: {
				region: string;
				country_code: string;
				school_id: number;
				name: string;
				school_user_id: number;
				school_gate_enabled: boolean | null;
				class: {
					school_classes_id: number;
					class_name: string;
					school_classes_students_id: number;
				}[];
			}[];
		}[];
	};
	data_hash: string;
}

/** Response from plusServicesInfo method. */
export interface PlusServicesInfoResponse {
	plus_services: {
		type: number;
		name: string;
		price: string;
		currency: string;
		payment_types: any[];
		bonuses: string[] | null;
		available_for: string[] | null;
		trial_available: boolean;
		period: string;
	}[];
	data_hash: string;
}

/** Response from markAsSeen method. */
export interface MarkAsSeenResponse {
	status: string;
	status_text: string;
}

/** Response from unseenEvents method. */
export interface UnseenEventsResponse {
	unseen_events_count: {
		activities: number;
		messages: number;
	};
}

/** Response from lessonsPlan method. */
export interface LessonsPlanResponse {
	lessonsplan: {
		dates: {
			date: string | number;
			lessons: {
				lesson_number: number;
				time_from: string;
				time_to: string;
				discipline: string;
				teacher: string;
				notes: string | null;
				theme: string;
				last_changes: string | null;
				classroom: string;
			}[];
		}[];
	};
	data_hash: string;
}

/** Response from lessonsPlan method. */
export interface UserActivitiesResponse {
	activities: {
		activity: {
			code: string;
			event_date: string;
			discipline_name: string;
			lesson_type: string;
			user_name: string;
			content_value: string;
			visited_yn: boolean;
			activity_id: number;
			creation_date: string;
			actor_id: number;
			seen: boolean;
		}[] | {
			code: string;
			event_date: string;
			discipline_name: string;
			grade_value: string;
			lesson_type: string;
			user_name: string;
			visited_yn: boolean;
			activity_id: number;
			creation_date: string;
			actor_id: number;
			seen: boolean;
		}[] | {
			code: string;
			event_date: string;
			discipline_name: string;
			user_name: string;
			visited_yn: boolean;
			activity_id: number;
			creation_date: string;
			attendance_type: string;
			actor_id: number;
			seen: boolean;
		}[];
		date: string;
	}[];
	selected_child_yn: boolean;
	data_hash: string;
}
