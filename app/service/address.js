const model = require("../model/address");

class AddressBookService {
    saveAddressBookDetails = (addressBookData, saveAddressBookDataCallback) => {
        model.saveAddressBookDetails(addressBookData, (err, data) => {
            return (err) ? saveAddressBookDataCallback(err, null) : saveAddressBookDataCallback(err, data);
        });
    }

    getAddressBookData = (addressBookDataCallback) => {
        model.getAddressBookData((err, data) => {
            return err ? addressBookDataCallback(err, null) : addressBookDataCallback(null, data);
        });
    }

    getAddressBookDataById = (addressBookId, addressBookDataCallback) => {
        model.getAddressBookDataById(addressBookId, (err, data) => {
            return err ? addressBookDataCallback(err, null) : addressBookDataCallback(null, data);
        });
    }
}

module.exports = new AddressBookService();