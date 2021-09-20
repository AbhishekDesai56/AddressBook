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
    phoneNumber: {
        type: Number,
        required: true,
        unique: true
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
            phoneNumber: addressBookData.phoneNumber,
            city: addressBookData.city,
            pinCode: addressBookData.pinCode,
            address: addressBookData.address,
        });

        addressBookDetails.save((err, data) => {
            return err ? serviceAddressBookCallback(err, null) : serviceAddressBookCallback(null, data);
        });
    }

    getAddressBookData = (getAddressBookDataServiceCallback) => {
        AddressBookModelDB.find({}, (err, data) => {
            return err ? getAddressBookDataServiceCallback(err, null) : getAddressBookDataServiceCallback(null, data);
      });
    }

    getAddressBookDataById = (addressBookId, getAddressBookDataByIdServiceCallback) => {
        AddressBookModelDB.findById(addressBookId, (err, data) => {
            return err ? getAddressBookDataByIdServiceCallback(err, null) : getAddressBookDataByIdServiceCallback(null, data);
        });
    }

    updateAddressBookData = (addressBookId, addressBookData, serviceUpdateAddressBookCallback) => {
        AddressBookModelDB.findByIdAndUpdate(addressBookId, addressBookData, (err, data) => {
            return err ? serviceUpdateAddressBookCallback(err, null) : serviceUpdateAddressBookCallback(null, data);
        });
    }

    deleteAddressBookDataById = (addressBookId, serviceDeleteAddressBookCallback) => {
        AddressBookModelDB.findByIdAndRemove(addressBookId, (err, data) => {
            return err ? serviceDeleteAddressBookCallback(err, null) : serviceDeleteAddressBookCallback(null, data);
        });
    }
}

module.exports = new AddressBookModel();