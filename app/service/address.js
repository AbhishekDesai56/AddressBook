const model = require("../model/address");

class AddressBookService {
    saveAddressBookDetails = (addressBookData, saveAddressBookDataCallback) => {
        model.saveAddressBookDetails(addressBookData, (err, data) => {
            return (err) ? saveAddressBookDataCallback(err, null) : saveAddressBookDataCallback(err, data);
        });
    }
}

module.exports = new AddressBookService();