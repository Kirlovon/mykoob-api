const authData = require('./mykoobAuth.json');
const MykoobAPI = require('../index.js');

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
	let result1 = await api.getAuthentificationData()
	console.timeEnd('getAuthentificationData');
	console.info(result1);
	console.log('');

	console.time('getUsers');
	let result2 = await api.getUsers()
	console.timeEnd('getUsers');
	console.log(result2);
	console.log('');

	console.time('userData');
	let result3 = await api.userData()
	console.timeEnd('userData');
	console.info(result3);
	console.log('');

	console.time('apisDetailed');
	let result4 = await api.apisDetailed();
	console.timeEnd('apisDetailed');
	console.info(result4);
	console.log('');

	console.time('unseenEvents');
	let result5 = await api.unseenEvents();
	console.timeEnd('unseenEvents');
	console.info(result5);
	console.log('');

	console.time('markAsSeen');
	let result6 = await api.markAsSeen();
	console.timeEnd('markAsSeen');
	console.info(result6);
	console.log('');

	console.time('plusServicesInfo');
	let result7 = await api.plusServicesInfo();
	console.timeEnd('plusServicesInfo');
	console.info(result7);
	console.log('');

	console.time('userProfileImage');
	let result8 = await api.userProfileImage('SMALL');
	console.timeEnd('userProfileImage');
	console.info(result8);
	console.log('');

	console.time('lessonsPlan');
	let result9 = await api.lessonsPlan({
		from: Date.now() - 10000,
		to: Date.now(),
		schoolUserID: result2[0].schoolUserID,
		schoolClassesID: result2[0].schoolClassesID
	});
	console.timeEnd('lessonsPlan');
	console.info(result9);
	console.log('');

	console.time('userActivities');
	let result10 = await api.userActivities({
		from: Date.now() - 10000,
		to: Date.now()
	});
	console.timeEnd('userActivities');
	console.info(result10);
	console.log('');

	console.time('userGrades');
	let result11 = await api.userGrades({
		from: Date.now() - 10000,
		to: Date.now(),
		schoolUserID: result2[0].schoolUserID,
		schoolClassesID: result2[0].schoolClassesID,
		sortingType: 0
	});
	console.timeEnd('userGrades');
	console.info(result11);
	console.log('');

	console.time('userAttendance');
	let result12 = await api.userAttendance({
		from: Date.now() - 10000,
		to: Date.now(),
		schoolUserID: result2[0].schoolUserID,
		schoolClassesID: result2[0].schoolClassesID,
		sortingType: 0
	});
	console.timeEnd('userAttendance');
	console.info(result12);
	console.log('');

	console.time('userAssignments');
	let result13 = await api.userAssignments({
		from: Date.now() - 10000,
		to: Date.now(),
		schoolUserID: result2[0].schoolUserID,
		schoolClassesID: result2[0].schoolClassesID,
		sortingType: 0
	});
	console.timeEnd('userAssignments');
	console.info(result13);
	console.log('');

})();