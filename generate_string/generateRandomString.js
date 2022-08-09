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

// function generateRandomString() {
//   let result = '';
//   let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
//   for (let i = 6; i > 0; i--) {
//     result += chars[Math.floor(Math.random() * chars.length)];
//   }
//   return result;
// };

//const genrateId = generateRandomString();

module.exports = {generateRandomString}