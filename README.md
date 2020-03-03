<p align="center">
	<img src="https://raw.githubusercontent.com/Kirlovon/Mykoob-API/master/logo/logo.svg?sanitize=true" width="900">
</p>

<p align="center">
	<img src="https://img.shields.io/github/license/Kirlovon/Mykoob-API.svg" alt="License">
	<img src="https://img.shields.io/github/last-commit/Kirlovon/Mykoob-API.svg" alt="Last commit">
	<img src="https://img.shields.io/npm/v/mykoob-api.svg" alt="NPM version">
	<img src="https://img.shields.io/npm/types/mykoob-api.svg" alt="Types">
</p>

<h4 align="center">
	<a href="https://kirlovon.github.io/Mykoob-API/">📚 Documentation</a>
</h4>

## About

Mykoob API is a basic Node.js module that allows you to interact with the Mykoob very easily! This library wraps the Mykoob REST Api, which is used by Mykoob mobile app, so some features available only for the Mykoob Plus subscribers!

## Installation

```
npm install mykoob-api --save
```

## Features

-   Authorization _( Access token receiving )_
-   Available APIs list receiving
-   User data receiving
-   User profile image receiving
-   Activities receiving _( Feed )_
-   Lessons plan receiving
-   Receiving number of unseen events
-   Mark events as seen
-   Receiving info about Mykoob Plus
-   Attendance receiving _( Mykoob Plus Only )_
-   Homework receiving _( Mykoob Plus Only )_
-   Grades receiving _( Mykoob Plus Only )_

## Example

```javascript
const MykoobAPI = require('mykoob-api');
const api = new MykoobAPI({
	email: 'example@outlook.com',
	password: 'qwerty123'
});

// Self-executing async function
(async () => {

	// Get list of available users on account
	const usersList = await api.getUsers();

	// Get user profile data
	const userData = await api.userData();

	// Get number of unseen events
	const unseenEvents = await api.unseenEvents();

	// Mark events as seen
	const markStatus = await api.markAsSeen();

	// Get profile image in base64
	const profileImage = await api.userProfileImage('SMALL');

	// Get lessons plan
	const lessonPlan = await api.lessonsPlan({
		from: Date.now() - 86400,
		to: Date.now(),
		schoolClassesID: usersList[0].schoolClassesID,
		schoolUserID: usersList[0].schoolUserID
	});

	// Get user activities
	const userActivities = await api.userActivities({
		from: Date.now() - 86400,
		to: Date.now(),
		schoolClassesID: usersList[0].schoolClassesID,
		schoolUserID: usersList[0].schoolUserID
	});

})();
```

_This Wrapper supports only the basic functionality of Mykoob REST Api. I do not plan to add support for something more specific, like chats._
