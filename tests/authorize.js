const mykoobAuth = require('./mykoobAuth.json');
const mykoobAPI = require('../dist/mykoobAPI');
const api = new mykoobAPI();

(async () => {
	console.time("Authorization Request");
	let auth = await api.authorize(mykoobAuth);
	console.timeEnd("Authorization Request");
	console.log(auth);
})();