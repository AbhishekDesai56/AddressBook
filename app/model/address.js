const mongoose = require("mongoose");

const addressBookSchema =  new mongoose.Schema({
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
const AddressBookModelDB = mongoose.model("addressBook", addressBookSchema);

class AddressBookModel {
     saveAddressBookDetails = (addressBookData, serviceAddressBookCallback) => {
        const addressBookDetails = new AddressBookModelDB({
            firstName: addressBookData.firstName,
            lastName: addressBookData.lastName,
            city: addressBookData.city,
            pinCode: addressBookData.pinCode,
            address: addressBookData.address,
        });

        addressBookDetails.save((err, data) => {
            return err ? serviceAddressBookCallback(err, null) : serviceAddressBookCallback(null, data);
        });
    }

    getAddressBookData = (getAddressBookDataServiceCallback) => {
        AddressBookModelDB.find({}, (error, data) => {
        return error ? getAddressBookDataServiceCallback(error, null) : getAddressBookDataServiceCallback(null, data);
      });
    }
}

module.exports = new AddressBookModel();