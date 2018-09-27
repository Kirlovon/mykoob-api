import fs from "fs"
import { assert } from "chai"
import mykoobAPI from "../dist/mykoobAPI"

describe('Authorization', function () {

	this.timeout(30000)

	// Get authorization data from mykoobAuth.json
	var email: string;
	var password: string;

	before(() => {
		let mykoobAuth = fs.readFileSync("./test/mykoobAuth.json", { encoding: "utf-8" })
		let authData = JSON.parse(mykoobAuth)
		email = Buffer.from(authData.email, 'base64').toString('utf-8')
		password = Buffer.from(authData.password, 'base64').toString('utf-8')
	});

	it('Try to authorize', () => {
		const client = new mykoobAPI()
		return client.authorize({
			email: email,
			password: password
		}).then(data => {
			assert.isDefined(data.access_token)
			assert.isDefined(data.expires_in)
			assert.isDefined(data.user_id)
		});
	});

	it('Try to authorize with invalid data', () => {
		const client = new mykoobAPI()
		return client.authorize({
			email: "admin",
			password: "admin"
		}).then(data => {
			assert.isDefined(data.error)
		});
	});

})