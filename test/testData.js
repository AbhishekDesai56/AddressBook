const chai = require("chai");
const chaiHttp = require("chai-http");
const userData = require("./data.json");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

describe("validatingUserRegistrationDataTestCases", () => {
  it("registeringDataWithProperInput", (done) => {
    const user = userData.user.userData;
    chai.request(server).post("/saveUserData").send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("success").eql(true);
      res.body.should.have.property("message").eql("User Data has been save successfully");
      done();
    });
  });

  it("registerUserWithoutFirstname", (done) => {
    const user = userData.user.registerUserWithoutFirstname;
    chai.request(server).post("/saveUserData").send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("\"firstName\" is required");
      done();
    });
  });
  it("registerUserWithoutLastname", (done) => {
    const user = userData.user.registerUserWithoutLastname;
    chai.request(server).post("/saveUserData").send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("\"lastName\" is required");
      done();
    });
  });
  it("registerUserWithoutEmail", (done) => {
    const user = userData.user.registerUserWithoutEmail;
    chai.request(server).post("/saveUserData").send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("\"email\" is required");
      done();
    });
  });
  it("registerUserWithoutPassword", (done) => {
    const user = userData.user.registerUserWithoutPassword;
    chai.request(server).post("/saveUserData").send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("message").eql("\"password\" is required");
      done();
    });
  });
});

/* Login user test cases */
describe("validatingUserLoginDataTestCases", () => {
  it("loginUserWithValidLoginCredentials", (done) => {
    const user = userData.user.login.loginUserWithValidCredentials;
    chai.request(server).post("/login").send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("success").eql(true);
      res.body.should.have.property("message").eql("User logged in successfully");
      done();
    });
  });
  it("loginUserWithIncorrectPassword", (done) => {
    const user = userData.user.login.loginUserWithIncorrectPassword;
    chai.request(server).post("/login").send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("success").eql(false);
      res.body.should.have.property("message").eql("Password doesn't match!");
      done();
    });
  });

  it("loginUserWith_InvalidCredentials", (done) => {
    const user = userData.user.login.loginUserWithInvalidCredentials;
    chai.request(server).post("/login").send(user).end((error, res) => {
      if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("success").eql(false);
      res.body.should.have.property("message").eql("Invalid User Credentials");
      done();
    });
  });
});

// /**
//  * name: AddressBook Testcase
//  */
describe("TokenGeneration", () => {
  let token = "";

  beforeEach((done) => {
    const user = userData.user.login.loginUserWithValidCredentials;
    chai.request(server).post("/login").send(user).end((error, res) => {
      token = res.body.token;
       if (error) {
        return done(error);
      }
      res.body.should.be.a("object");
      res.body.should.have.property("success").eql(true);
      res.body.should.have.property("message").eql("User logged in successfully");
      done();
    });
  });

  describe("AddressTestcase", () => {
    it("addressBookDataWithProperInput", (done) => {
      const addressBookData = userData.user.addressBook.addressBookDetails;
      chai.request(server).post("/saveAddressBookData").send(addressBookData).set("token", token)
        .end((error, res) => {
          res.should.have.status(201);
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("Address Book Data has been save successfully");
          done();
        });
    });

    it("addressBookWithoutFirstName", (done) => {
      const addressBookData = userData.user.addressBook.addressBookDetailsWithNoFirstName;
      chai.request(server).post("/saveAddressBookData").send(addressBookData).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("\"firstName\" is required");
          done();
        });
    });

    
    it("addressBookWithoutLastName", (done) => {
      const addressBookData = userData.user.addressBook.addressBookDetailsWithNoLastName;
      chai.request(server).post("/saveAddressBookData").send(addressBookData).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("\"lastName\" is required");
          done();
        });
    });

    it("addressBookWithoutPhoneNumber", (done) => {
      const addressBookData = userData.user.addressBook.addressBookDetailsWithNoPhoneNumber;
      chai.request(server).post("/saveAddressBookData").send(addressBookData).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("\"phoneNumber\" is required");
          done();
        });
    });

    it("addressBookWithoutCity", (done) => {
      const addressBookData = userData.user.addressBook.addressBookDetailsWithNoCity;
      chai.request(server).post("/saveAddressBookData").send(addressBookData).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("\"city\" is required");
          done();
        });
    });

    it("addressBookWithoutPinCode", (done) => {
      const addressBookData = userData.user.addressBook.addressBookDetailsWithNoPinCode;
      chai.request(server).post("/saveAddressBookData").send(addressBookData).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("\"pinCode\" is required");
          done();
        });
    });

    it("addressBookWithoutAddress", (done) => {
      const addressBookData = userData.user.addressBook.addressBookDetailsWithNoAddress;
      chai.request(server).post("/saveAddressBookData").send(addressBookData).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("\"address\" is required");
          done();
        });
    });
    
    it("addressBookDetailsWithInvalidPhoneNumber", (done) => {
      const addressBookData = userData.user.addressBook.addressBookDetailsWithInvalidPhoneNumber;
      chai.request(server).post("/saveAddressBookData").send(addressBookData).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("\"phoneNumber\" must be greater than or equal to 1000000000");
          done();
        });
    });

    it("fetchaddressBookdata", (done) => {
      chai.request(server).get("/getAddressBookData").set("token", token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("Data is fetch successfully");
          done();
        });
    });

    it("fetchaddressBookwithvalidAddressBookId", (done) => {
      const addressBookId = userData.user.addressBook.addressBookId.id;
      chai.request(server).get(`/getAddressBookData/${addressBookId}`).set("token", token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql(`Record is found with id ${addressBookId}`);
          res.body.should.have.property("data");
          done();
        });
    });

    
    it("fetchaddressBookwithinvalidAddressBookId", (done) => {
      const addressBookId = userData.user.addressBook.incorrectAddressBookId.id;
      chai.request(server).get(`/getAddressBookData/${addressBookId}`).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("Please enter valid addressbook id");
          done();
        });
    });

    it("updateaddressBookdetails", (done) => {
      const addressBookId = userData.user.addressBook.addressBookId.id;
      const { updateaddressBookDetails } = userData.user.addressBook;
      chai.request(server)
        .put(`/updateAddressBookData/${addressBookId}`)
        .set("token", token)
        .send(updateaddressBookDetails)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("Record updated successfully");
          done();
        });
    });

    it("updateaddressBookDetailsIncorrectId", (done) => {
      const addressBookId = userData.user.addressBook.incorrectAddressBookId.id;
      const { updateaddressBookDetails } = userData.user.addressBook;
      chai.request(server)
        .put(`/updateAddressBookData/${addressBookId}`)
        .set("token", token)
        .send(updateaddressBookDetails)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("Please enter valid addressbook id");
          done();
        });
    });

    it("deleteAddressBookDetailsWithValidinput", (done) => {
      const addressBookId = userData.user.addressBook.addressBookId.id;
      chai.request(server).delete(`/deleteAddressBookData/${addressBookId}`).set("token", token)
        .end((error, res) => {
          res.should.have.status(200);
          res.body.should.have.property("success").eql(true);
          res.body.should.have.property("message").eql("AddressBook Deleted Successfully");
          done();
        });
    });

    it("deleteAddressBookDetailsWithInValidinput", (done) => {
      const addressBookId = userData.user.addressBook.incorrectAddressBookId.id;
      chai.request(server).delete(`/deleteAddressBookData/${addressBookId}`).set("token", token)
        .end((error, res) => {
          res.should.have.status(400);
          res.body.should.have.property("success").eql(false);
          res.body.should.have.property("message").eql("Please check for valid addressbook id");
          done();
        });
    });
  });
});

