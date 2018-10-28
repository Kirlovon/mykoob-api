const mykoobAuth = require('./mykoobAuth.json');
const mykoobAPI = require('../dist/mykoobAPI');
const api = new mykoobAPI();

(async () => {
	let auth = await api.authorize(mykoobAuth);

	console.time("APIs Detailed Request");
	let data = await api.apisDetailed(auth.access_token);
	console.timeEnd("APIs Detailed Request");

	console.log(data);
})();