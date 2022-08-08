const { Template } = require('ejs');
const {generateRandomString} = require('./generate_string/generateRandomString')
const express = require('express');
const app = express();
const PORT = 8080;

/********************************************************
 * GENERATE LETTERS
 *******************************************************/
const generateString =  generateRandomString();
/********************************************************
 * SETTERS
 *******************************************************/

app.set("view engine","ejs")

/********************************************************
 * Parse buffer for app
 *******************************************************/

app.use(express.urlencoded({ extended: true }));

/********************************************************
 * Database
 *******************************************************/

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
}

/********************************************************
 * GETTERS
 *******************************************************/

app.get("/", (request,response) => {
  response.send('Hello')
});

app.get("/urls", (req,res) => {
  templateVars = {urls:urlDatabase}
  res.render("urls_index",templateVars)
})

app.get("/urls/new", (req, res) => {
  console.log(req.params)
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  const shortUrl = req.params.id;
  //console.log(req.params)
  const templateVars = { id: shortUrl, longURL: urlDatabase[shortUrl] /* What goes here? */ };
  console.log(templateVars)
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req,res) => {
  res.json(urlDatabase);
})

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
 });
 
 app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
 });

/********************************************************
 * POST
 *******************************************************/
 app.post("/urls", (req, res) => {
  console.log(req.body); // Log the POST request body to the console
  res.send("Ok"); // Respond with 'Ok' (we will replace this)
});

/********************************************************
 * LISTEN
 *******************************************************/
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});