<p align="center">
	<img src="https://raw.githubusercontent.com/Kirlovon/Mykoob-API/master/logo/logo.svg?sanitize=true" width="900">
</p>

<p align="center">
	<a href="https://github.com/Kirlovon/Mykoob-API/blob/master/LICENSE"><img src="https://img.shields.io/github/license/Kirlovon/Mykoob-API.svg" alt="License"></a>
	<a href="https://github.com/Kirlovon/Mykoob-API/blob/master/package.json"><img src="https://img.shields.io/github/package-json/v/Kirlovon/Mykoob-API.svg" alt="Package version"></a>
	<a href="https://github.com/Kirlovon/Mykoob-API/commits/master"><img src="https://img.shields.io/github/last-commit/Kirlovon/Mykoob-API.svg" alt="Last commit"></a>
</p>

## About

Mykoob API is a basic Node.js module that allows you to interact with the Mykoob very easily! This library wraps the Mykoob REST Api, which is used by Mykoob mobile app, so some features available only for the Mykoob Plus subscribers!

## Installation

```
npm install mykoob-api --save
```

###### [Documentation here!](https://kirlovon.github.io/Mykoob-API)

## Example

```javascript
const mykoobAPI = require('mykoob-api');
const api = new mykoobAPI();

api.filter = false; // Removes from responses unnecessary data
api.timeout = 10000; // Requests timeout

// Self-executing async function
(async () => {
	// Get access token and other authorization data
	const auth = await api.authorize({
		email: 'email@outlook.com',
		password: 'qwerty123',
	});

	// Get profile image in base64
	const profileImage = await api.userProfileImage(auth.access_token, 'SMALL');

	// Get user data
	const userData = await api.userData(auth.access_token);

	// Get user activities
	const userActivities = await api.userActivities(auth.access_token, {
		from: '2018-10-10',
		to: '2018-10-20',
		schoolClassesID: userData.user_data.user[0].school[0].class[0].school_classes_id,
		schoolUserID: userData.user_data.user[0].school[0].school_user_id,
	});
})();
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

_This Wrapper supports only the basic functionality of Mykoob REST Api. I do not plan to add support for something more specific, like chats._
