const address = require("../controller/address");
const user = require("../controller/user");

module.exports = (app) => {
	//User Routes
	app.post("/saveUserData", user.saveUserData);
	app.post("/login", user.login);
	
	app.post("/saveAddressBookData", address.saveAddressBookData);
	app.get("/getAddressBookData", address.getAddressBookData);
	app.get("/getAddressBookData/:addressBookId", address.getAddressBookDataById);
	app.put("/updateAddressBookData/:addressBookId", address.updateAddressBookData);
	app.delete("/deleteAddressBookData/:addressBookId", address.deleteAddressBookDataById);
};