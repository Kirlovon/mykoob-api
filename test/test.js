const mykoobAuth = require('./mykoobAuth.json');
const mykoobAPI = require('../dist/mykoobAPI');
const api = new mykoobAPI();

(async () => {

    // authorize() test
	console.log('--------------------------------');
    console.time("authorize Request");
    let auth = await api.authorize(mykoobAuth);
    console.timeEnd("authorize Request");
	console.info(auth);
    console.log('--------------------------------');

	// apisDetailed() test
	console.time("apisDetailed Request");
	var apisDetailed = await api.apisDetailed(auth.access_token);
	console.timeEnd("apisDetailed Request");
	console.log(apisDetailed);
	console.log('--------------------------------');

	// userData test
	console.time("userData Request");
	var userData = await api.userData(auth.access_token);
	console.timeEnd("userData Request");
	console.log(userData);
	console.log('--------------------------------');

	// userGrades test
	console.time("userGrades Request");
	var userGrades = await api.userGrades(auth.access_token, {
		from: "2018-10-10",
		to: "2018-10-20",
		schoolClassesID: userData.user_data.user[0].school[0].class[0].school_classes_id,
		schoolUserID: userData.user_data.user[0].school[0].school_user_id,
		sortingType: 1
	});
	console.timeEnd("userGrades Request");
	console.log(userGrades);
	console.log('--------------------------------');

	// userAttendance test
	console.time("userAttendance Request");
	var userAttendance = await api.userAttendance(auth.access_token, {
		from: "2018-10-10",
		to: "2018-10-20",
		schoolClassesID: userData.user_data.user[0].school[0].class[0].school_classes_id,
		schoolUserID: userData.user_data.user[0].school[0].school_user_id,
		sortingType: 1
	});
	console.timeEnd("userAttendance Request");
	console.log(userAttendance);
	console.log('--------------------------------');

	// userActivities test
	console.time("userActivities Request");
	var userActivities = await api.userActivities(auth.access_token, {
		from: "2018-10-10",
		to: "2018-10-20",
		schoolClassesID: userData.user_data.user[0].school[0].class[0].school_classes_id,
		schoolUserID: userData.user_data.user[0].school[0].school_user_id
	});
	console.timeEnd("userActivities Request");
	console.log(userActivities);
	console.log('--------------------------------');

	// lessonsPlan test
	console.time("lessonsPlan Request");
	var lessonsPlan = await api.lessonsPlan(auth.access_token, {
		from: "2018-10-10",
		to: "2018-10-20",
		schoolClassesID: userData.user_data.user[0].school[0].class[0].school_classes_id,
		schoolUserID: userData.user_data.user[0].school[0].school_user_id
	});
	console.timeEnd("lessonsPlan Request");
	console.log(lessonsPlan);
	console.log('--------------------------------');

	// userProfileImage test
	console.time("userProfileImage Request");
	var userProfileImage = await api.userProfileImage(auth.access_token, "SMALL");
	console.timeEnd("userProfileImage Request");
	console.log(userProfileImage);
	console.log('--------------------------------');

	// unseenEvents test
	console.time("unseenEvents Request");
	var unseenEvents = await api.unseenEvents(auth.access_token);
	console.timeEnd("unseenEvents Request");
	console.log(unseenEvents);
	console.log('--------------------------------');

	// markAsSeen test
	console.time("markAsSeen Request");
	var markAsSeen = await api.markAsSeen(auth.access_token);
	console.timeEnd("markAsSeen Request");
	console.log(markAsSeen);
	console.log('--------------------------------');

	// plusServicesInfo test
	console.time("plusServicesInfo Request");
	var plusServicesInfo = await api.plusServicesInfo(auth.access_token);
	console.timeEnd("plusServicesInfo Request");
	console.log(plusServicesInfo);
	console.log('--------------------------------');
	
})();