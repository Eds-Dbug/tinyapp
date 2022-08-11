const { expect } = require('chai');
const { findEmail, urlsForUser } = require('../helperFunc.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

const testUrlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "userRandomID",
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "user2RandomID",
  },
  a23456: {
    longURL: "https://www.youtube.com",
    userID: "user2RandomID",
  },
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = findEmail(testUsers,"user@example.com")
    const expectedUserID = "userRandomID";
    expect(user.id).to.be.equal(expectedUserID)
  });

  it('should return a same user with same email', function() {
    const user = findEmail(testUsers,"user@example.com")
    const expectedUserEmail = "user@example.com";
    // Write your assert statement here
    expect(user.email).to.be.equal(expectedUserEmail)
  });

  it('should return a user via email', function() {
    const user = findEmail(testUsers,"user2@example.com")
    console.log('user',user)
    const expectedUser = {
      id: "user2RandomID", 
      email: "user2@example.com", 
      password: "dishwasher-funk"
    };
    expect(user).to.be.deep.equal(expectedUser)
  });

  it('should return a false when not given an email', function() {
    const user = findEmail(testUsers,"user2RandomID")
    expect(user).to.be.false
  });

  it('should return a false when not given an email in database', function() {
    const user = findEmail(testUsers,"user2RandomID@gmail.com") 
    expect(user).to.be.false
  });

});

describe('#urlsForUser', () => {
  it('should return the urls associated with a given user', () => {
    const urls =  urlsForUser(testUrlDatabase,"user2RandomID");
    const keys = Object.keys(urls);
    expect(keys).to.be.deep.equal(['i3BoGr','a23456']);
  })
})
