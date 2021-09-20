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

    updateAddressBookData = (addressBookId, addressBookData, addressBookDataCallback) => {
        model.updateAddressBookData(addressBookId, addressBookData, (err, data) => {
            return err ? addressBookDataCallback(err, null) : addressBookDataCallback(null,data);
        });
    }

    deleteAddressBookDataById = (employeeId, deleteAddressBookById) => {
    try {
      model.deleteAddressBookDataById(employeeId, (error, data) => {
        return error ? deleteAddressBookById(error, null) : deleteAddressBookById(null, data);
      });
    } catch (ex) {
      return deleteAddressBookById(ex.message, null);
    }
  }
}

module.exports = new AddressBookService();