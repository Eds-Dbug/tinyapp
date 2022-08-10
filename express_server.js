const express = require('express');
const cookieParser = require('cookie-parser');
const {generateRandomString} = require('./generate_string/generateRandomString')
const app = express();
const PORT = 8080;


app.set('view engine', 'ejs');



const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

/********************************************************************************
 * App Uses
 ******************************************************************************/
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


/********************************************************************************
 * GET ROUTES
 ******************************************************************************/
app.get('/',(req, res) => {
  res.send('Hello World!');
});

app.get('/urls',(req, res) => {
  const templateVars = {
    urls: urlDatabase,
    username: req.cookies["username"]
  };
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
  const templateVars = {
    username: req.cookies["username"]
  };
  res.render('urls_new',templateVars);
});

app.get('/urls/:id',(req, res) => {
  //console.log(req.params)
const templateVars = {
  id: req.params.id, 
  longURL: urlDatabase[req.params.id],
  username: req.cookies["username"]
};
  res.render('urls_show', templateVars);
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});



/********************************************************************************
 * POST ROUTES
 ******************************************************************************/

app.post('/urls', (req, res) => {
  //console.log(req.body);
  const longURL = req.body.longURL
  const genId = generateRandomString();
  urlDatabase[genId] = longURL;
  res.redirect(`/urls/${genId}`);
});

/**for update */
app.post('/urls/:id', (req, res) => {
  console.log(req.body)
  const longURL = req.body.longURL
  const id = req.params.id;
  urlDatabase[id] = longURL;
  res.redirect(`/urls/${id}`);

})

app.post('/urls/:id/delete', (req,res)=> {
  //console.log(req.params.id)
  console.log(req.params)
  delete urlDatabase[req.params.id]
  res.redirect('/urls')
}) 

/********************************************************************************
 * LOGIN ROUTE
 ******************************************************************************/
app.post('/login', (req,res) => {
 
  console.log('body', req.body)
  console.log(req.cookies);
  res.cookie('username',req.body.username)
  
  res.redirect('/urls')
})

/********************************************************************************
 * LOGOUT ROUTE
 ******************************************************************************/
 app.post('/logout', (req,res) => {
 
  console.log('body', req.body)
  console.log(req.cookies);
  res.clearCookie('username',req.body.username)
  
  res.redirect('/urls')
})


/********************************************************************************
 * LISTENER
 ******************************************************************************/
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});