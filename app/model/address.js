const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const addressBookSchema =  new Schema({
	firstName: {
		type:  String,
		required: true
	},
	lastName: {
		type:  String,
		required: true
	},
	city: {
		type:  String,
		required: true
	},
	pinCode: {
		type:  Number,
		required: true
	},
	address: {
		type:  String,
		required: true
	},
});

// Compile model from schema
const AddressBookModel = mongoose.model("addressBook", addressBookSchema);

