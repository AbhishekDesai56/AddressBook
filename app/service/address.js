const model = require("../model/address");

class AddressBookService {
    saveAddressBookDetails = (addressBookData, saveAddressBookDataCallback) => {
        model.saveAddressBookDetails(addressBookData, (err, data) => {
            if (err) ? saveAddressBookDataCallback(err, null) : saveAddressBookDataCallback(err, data);
        });
    }
}

module.exports = new AddressBookService();