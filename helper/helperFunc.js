const generateRandomString = function() {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charLen = characters.length;
  
  //loop up to 6
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() *
 charLen));
  }
  return result;
};

const findByEmail = function(users,email) {
  const keys = Object.keys(users);
  for (let key of keys) {
    //console.log(users[key].email)
    if (users[key].email === email) {
      return users[key];
    }
  }
  return false;
};

const urlsForUser = function(urlDatabase,id) {
  const keys = Object.keys(urlDatabase);

  let resultURLS = {};
  for (let key of keys) {
    if (urlDatabase[key].userID === id) {
      resultURLS[key] = {longURL: urlDatabase[key].longURL};
    }
  }
  //console.log(resultURLS)
  return resultURLS;
};

module.exports = {generateRandomString,findByEmail,urlsForUser};