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

module.exports = {generateRandomString}