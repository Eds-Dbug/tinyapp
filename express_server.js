const express = require('express');
const {generateRandomString} = require('./generate_string/generateRandomString')
const app = express();
const PORT = 8080;


app.set('view engine', 'ejs');



const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(express.urlencoded({ extended: true }));


app.get('/',(req, res) => {
  res.send('Hello World!');
});

app.get('/urls',(req, res) => {
  const templateVars = {urls: urlDatabase};
  res.render('urls_index', templateVars);
});



app.get("/u/:id", (req, res) => {
  const shortURL = req.params.id
  if(urlDatabase[shortURL]){
    res.redirect(urlDatabase[shortURL]);
  }
  res.status(400).send("No link here");
  
});


app.get('/urls/new',(req, res) => {
  res.render('urls_new');
});

app.get('/urls/:id',(req, res) => {
const templateVars = {id: req.params.id, longURL: urlDatabase[req.params.id]};
  res.render('urls_show', templateVars);
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

app.post('/urls', (req, res) => {
  console.log(req.body);
  const longURL = req.body.longURL
  const genId = generateRandomString();
  urlDatabase[genId] = longURL;
  res.redirect(`/urls/${genId}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});