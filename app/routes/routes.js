const address = require("../controller/address");
const user = require("../controller/user");
const helper = require("../util/helper")

module.exports = (app) => {
	//User Routes
	app.post("/saveUserData", user.saveUserData);
	app.post("/login", user.login);

	app.post("/saveAddressBookData", helper.verifyToken, address.saveAddressBookData);
	app.get("/getAddressBookData", helper.verifyToken, address.getAddressBookData);
	app.get("/getAddressBookData/:addressBookId", helper.verifyToken, address.getAddressBookDataById);
	app.put("/updateAddressBookData/:addressBookId",helper.verifyToken, address.updateAddressBookData);
	app.delete("/deleteAddressBookData/:addressBookId",helper.verifyToken, address.deleteAddressBookDataById);
};