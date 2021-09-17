const address = require("../controller/address");

module.exports = (app) => {
	app.post("/saveAddressBookData", address.saveAddressBookData);
	app.get("/getAddressBookData", address.getAddressBookData);
	app.get("/getAddressBookData/:addressBookId", address.getAddressBookDataById);
	app.put("/updateAddressBookData/:addressBookId", address.updateAddressBookData);
};