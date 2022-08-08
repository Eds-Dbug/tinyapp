const { Template } = require('ejs');
const express = require('express');
const app = express();
const PORT = 8080;

app.set("view engine","ejs")

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
}

app.get("/", (request,response) => {
  response.send('Hello')
});

// app.get("/urls", (req,res) => {
//   templateVars = {urls:urlDatabase}
//   res.render("urls_index",templateVars)
// })

app.get("/u/new", (req,res) => {
  templateVars = {urls:urlDatabase}
  res.render("u_new_index",templateVars)
})

app.get("/urls/:id", (req, res) => {
  const shortUrl = req.params.id;
  //console.log(req.params)
  const templateVars = { id: shortUrl, longURL: urlDatabase[shortUrl] /* What goes here? */ };
  //console.log(templateVars)
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

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});