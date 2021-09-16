const service = require('../service/address');

class AddressBookController {
    saveAddressBookData = (req, res) => {
        const addressBookData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            city: req.body.city,
            pinCode: req.body.pinCode,
            address: req.body.address,
        };

        service.saveAddressBookDetails(addressBookData, (err, data) => {
            if (err) {
                return res.status(400).json({
                    success: false,
                    message: err.message
                });
            } else {
                return res.status(201).json({
                    success: true,
                    message: "Address Book Data has been save successfully",
                });
            }
        });
    }
}

module.exports = new AddressBookController();