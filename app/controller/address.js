const service = require('../service/address');
const helper = require('../util/helper');
const validInput = require('../util/addressValidation')
const logger = require('logger').createLogger("logger/development.log");
class AddressBookController {
    saveAddressBookData = (req, res) => {
        const userValidInput = validInput.validate(req.body);
        if (userValidInput.error) {
            return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).json({
                success: false,
                message: userValidInput.error.message
            })
		} 

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
                logger.error(`${helper.httpStatusCodeEnum.BAD_REQUEST} - ${err.message}`);
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
            logger.error(`${helper.httpStatusCodeEnum.BAD_REQUEST} - ${err.message}`);
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
                logger.error(`${helper.httpStatusCodeEnum.BAD_REQUEST} - Please enter valid addressbook id`);
                return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).send({
                    success: false,
                    message: "Please enter valid addressbook id"
                });
            } else if (addressBookData === null) {
                logger.error(`${helper.httpStatusCodeEnum.BAD_REQUEST} - Data Not Found`);
                 return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).send({
                    success: false,
                    message: "Please enter valid addressbook id"
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

            const userValidInput = validInput.validate(req.body);
            if (userValidInput.error) {
                logger.error(`${helper.httpStatusCodeEnum.BAD_REQUEST} - ${userValidInput.error.message}`);
                return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).json({
                    success: false,
                    message: userValidInput.error.message
                })
            } 

            service.updateAddressBookData(addressBookId,addressBookData, (err, addressBookData) => {
                if (err) {
                    logger.error(`${helper.httpStatusCodeEnum.BAD_REQUEST} - Please enter valid addressbook id`);
                    return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).send({
                        success: false,
                        message: "Please enter valid addressbook id"
                    });
                }
                res.status(helper.httpStatusCodeEnum.OK).send({
                success: true,
                message: `Record updated successfully`
                });
            });
        } 
        catch(ex) {
            logger.error(`${helper.httpStatusCodeEnum.INTERNAL_SERVER} - ${ex.message}`);
            res.status(helper.httpStatusCodeEnum.INTERNAL_SERVER).send({
                success: false,
                message: ex.message,
            });
        }
    }

    deleteAddressBookDataById = (req, res) => {
        try {
            const addressBookId = req.params.addressBookId;
            service.deleteAddressBookDataById(addressBookId, (err, data) => {
                if (err) {
                    logger.error(`${helper.httpStatusCodeEnum.BAD_REQUEST} - Please check for valid addressbook id`);
                    return res.status(helper.httpStatusCodeEnum.BAD_REQUEST).send({
                        success: false,
                        message: "Please check for valid addressbook id"
                    });
                } 
               res.status(helper.httpStatusCodeEnum.OK).send({
                    success: true,
                    message: `AddressBook Deleted Successfully`,
                });
            });
        }
        catch(ex) {
            logger.error(`${helper.httpStatusCodeEnum.INTERNAL_SERVER} - ${ex.message}`);
            res.status(helper.httpStatusCodeEnum.INTERNAL_SERVER).send({
                success: false,
                message: ex.message
            });
        }
    }
}

module.exports = new AddressBookController();