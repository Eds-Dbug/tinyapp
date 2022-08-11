function generateRandomString() {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charLen = characters.length;
  
  //loop up to 6
  for(let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * 
 charLen));
  }
  return result;
}

function findEmail(users,email) {
  const keys = Object.keys(users)
  for(let key of keys) {
    //console.log(users[key].email)
    if(users[key].email === email){
      //console.log(users)
      return users[key];
    }
  }
  return false;
}

function urlsForUser(urlDatabase,id) {
  const keys = Object.keys(urlDatabase)
  let resultURLS = {}
  for(let key of keys) {
    if(urlDatabase[key].userID === id) {
      resultURLS[key] = {longURL: urlDatabase[key].longURL}
    }
  }
  return resultURLS;
}

// function generateRandomString() {
//   let result = '';
//   let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   for (let i = 6; i > 0; i--) {
//     result += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return result;
// };

//const genrateId = generateRandomString();



module.exports = {generateRandomString,findEmail,urlsForUser}