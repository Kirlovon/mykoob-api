const authData = require('mykoobAuth.json');

const api = new MykoobAPI({
	email: authData.email,
	password: authData.password
});

// Test methods
