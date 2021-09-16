const address = require("../controller/address");

module.exports = (app) => {
	app.post("/saveAddressBookData", address.saveAddressBookData);
};