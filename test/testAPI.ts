import * as authData from './mykoobAuth.json';
import MykoobAPI from '../index.js';

const api = new MykoobAPI({
	email: authData.email,
	password: authData.password
});

// Self-executing async function
(async () => {

	console.time('authorize');
	await api.authorize();
	console.timeEnd('authorize');
	console.log('');

	console.time('getAuthentificationData');
	const result1 = await api.getAuthentificationData();
	console.timeEnd('getAuthentificationData');
	console.info(result1);
	console.log('');

	console.time('getUsers');
	const result2 = await api.getUsers();
	console.timeEnd('getUsers');
	console.log(result2);
	console.log('');

	console.time('userData');
	const result3 = await api.userData();
	console.timeEnd('userData');
	console.info(result3);
	console.log('');

	console.time('apisDetailed');
	const result4 = await api.apisDetailed();
	console.timeEnd('apisDetailed');
	console.info(result4);
	console.log('');

	console.time('unseenEvents');
	const result5 = await api.unseenEvents();
	console.timeEnd('unseenEvents');
	console.info(result5);
	console.log('');

	console.time('markAsSeen');
	const result6 = await api.markAsSeen();
	console.timeEnd('markAsSeen');
	console.info(result6);
	console.log('');

	console.time('plusServicesInfo');
	const result7 = await api.plusServicesInfo();
	console.timeEnd('plusServicesInfo');
	console.info(result7);
	console.log('');

	console.time('userProfileImage');
	const result8 = await api.userProfileImage('SMALL');
	console.timeEnd('userProfileImage');
	console.info(result8);
	console.log('');

	console.time('lessonsPlan');
	const result9 = await api.lessonsPlan({
		from: Date.now() - 10000,
		to: Date.now(),
		schoolUserID: result2[0].school_user_id,
		schoolClassesID: result2[0].school_classes_id
	});
	console.timeEnd('lessonsPlan');
	console.info(result9);
	console.log('');

	console.time('userActivities');
	const result10 = await api.userActivities({
		from: Date.now() - 10000,
		to: Date.now()
	});
	console.timeEnd('userActivities');
	console.info(result10);
	console.log('');

	console.time('userGrades');
	const result11 = await api.userGrades({
		from: Date.now() - 10000,
		to: Date.now(),
		schoolUserID: result2[0].school_user_id,
		schoolClassesID: result2[0].school_classes_id,
		sortingType: 0
	});
	console.timeEnd('userGrades');
	console.info(result11);
	console.log('');

	console.time('userAttendance');
	const result12 = await api.userAttendance({
		from: Date.now() - 10000,
		to: Date.now(),
		schoolUserID: result2[0].school_user_id,
		schoolClassesID: result2[0].school_classes_id,
		sortingType: 0
	});
	console.timeEnd('userAttendance');
	console.info(result12);
	console.log('');

	console.time('userAssignments');
	const result13 = await api.userAssignments({
		from: Date.now() - 10000,
		to: Date.now(),
		schoolUserID: result2[0].school_user_id,
		schoolClassesID: result2[0].school_classes_id,
		sortingType: 0
	});
	console.timeEnd('userAssignments');
	console.info(result13);
	console.log('');

})();
