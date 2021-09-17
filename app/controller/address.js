const service = require('../service/address');
const helper = require('../util/helper');

class AddressBookController {
    saveAddressBookData = (req, res) => {
        const addressBookData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            city: req.body.city,
            pinCode: req.body.pinCode,
            address: req.body.address,
        };

        service.saveAddressBookDetails(addressBookData, (err, data) => {
            if (err) {
                return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).json({
                    success: false,
                    message: err.message
                });
            } else {
                return res.status(helper.httpStatusCodeEnum.CREATED).json({
                    success: true,
                    message: "Address Book Data has been save successfully",
                });
            }
        });
    }

    getAddressBookData = (req, res) => {
        service.getAddressBookData((err, addressBookData) => {
          if (err) {
            return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).send({
              success: false,
              message: err.message
            });
          }
          res.status(helper.httpStatusCodeEnum.OK).send({
            success: true,
            message: 'Data is fetch successfully',
            data: addressBookData
          });
        });
    }

    getAddressBookDataById = (req, res) => {
        const addressBookId = req.params.addressBookId;
        service.getAddressBookDataById(addressBookId, (err, addressBookData) => {
            if (err) {
            return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).send({
                success: false,
                message: err.message
            });
            }
            res.status(helper.httpStatusCodeEnum.OK).send({
            success: true,
            message: `Record is found with id ${addressBookId}`,
            data: addressBookData
            });
        });
    }

    updateAddressBookData = (req, res) => {
        try {
            const addressBookId = req.params.addressBookId;
            const addressBookData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                city: req.body.city, 
                pinCode: req.body.pinCode,
                address: req.body.address,
            };

            service.updateAddressBookData(addressBookId,addressBookData, (err, addressBookData) => {
                if (err) {
                    return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).send({
                        success: false,
                        message: err.message
                    });
                }
                res.status(helper.httpStatusCodeEnum.OK).send({
                success: true,
                message: `Record updated successfully`
                });
            });
        } 
        catch(ex) {
            res.status(helper.httpStatusCodeEnum.INTERNAL_SERVER).send({
                success: false,
                message: ex.message,
            });
        }
    }
}

module.exports = new AddressBookController();