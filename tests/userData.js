const mykoobAuth = require('./mykoobAuth.json');
const mykoobAPI = require('../dist/mykoobAPI');
const api = new mykoobAPI();

(async () => {
	let auth = await api.authorize(mykoobAuth);

	console.time("User Data Request");
	let data = await api.userData(auth.access_token);
	console.timeEnd("User Data Request");

	console.log(data);
})();