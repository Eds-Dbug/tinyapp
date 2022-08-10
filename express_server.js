const express = require('express');
const cookieParser = require('cookie-parser');
const {generateRandomString} = require('./generate_string/generateRandomString')
const app = express();
const PORT = 8080;


const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk",
  },
};

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

/********************************************************************************
 * App Uses
 ******************************************************************************/
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));


/********************************************************************************
 * GET ROUTES
 ******************************************************************************/

/*****************************
 * / ROUTE (for sending hello world on default page)
*****************************/
app.get('/',(req, res) => {
  res.send('Hello World!');
});
/*****************************
 * /URLS ROUTE (for rendering urls_index)
*****************************/
app.get('/urls',(req, res) => {
  const user_id = req.cookies.user_id;
  const templateVars = {
    urls: urlDatabase,
    user: users[user_id]
  };
  res.render('urls_index', templateVars);
});
/*****************************
 * /U/:ID ROUTE (for redirecting short links to the longURL link)
*****************************/
app.get("/u/:id", (req, res) => {
  const shortURL = req.params.id
  if(urlDatabase[shortURL]){
    res.redirect(urlDatabase[shortURL]);
  }
  res.status(400).send("No link here");
  
});
/*****************************
 * /URLS/NEW ROUTE (for rending urls_new page)
*****************************/
app.get('/urls/new',(req, res) => {
  const user_id = req.cookies.user_id;
  const templateVars = {
    user : users[user_id]
  };
  res.render('urls_new',templateVars);
});
/*****************************
 * /URLS/:ID ROUTE (for rendering urls_show page)
*****************************/
app.get('/urls/:id',(req, res) => {
//console.log(req.cookies)
  const user_id = req.cookies.user_id;_
  const templateVars = {
    id: req.params.id, 
    longURL: urlDatabase[req.params.id],
    user: users[user_id]
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
 * /RESGISTER ROUTE (for rending register page)
 ******************************************************************************/
app.get('/register',(req,res) => {
  res.render('register')
})

/********************************************************************************
 * POST ROUTES
 ******************************************************************************/

/*****************************
 * /URLS ROUTE (for creating new link)
*****************************/
app.post('/urls', (req, res) => {
  //console.log(req.body);
  const longURL = req.body.longURL
  const genId = generateRandomString();
  urlDatabase[genId] = longURL;
  res.redirect(`/urls/${genId}`);
});

/*****************************
 * /URLS/:ID ROUTE (for updating)
*****************************/
app.post('/urls/:id', (req, res) => {
  console.log(req.body)
  const longURL = req.body.longURL
  const id = req.params.id;
  urlDatabase[id] = longURL;
  res.redirect(`/urls/${id}`);

})
/*****************************
 * /URLS/:ID/DELETE ROUTE
*****************************/
app.post('/urls/:id/delete', (req,res)=> {
  //console.log(req.params.id)
  //console.log(req.params)
  delete urlDatabase[req.params.id]
  return res.redirect('/urls')
}) 

/*****************************
 * /REGISTER ROUTE
*****************************/
app.post('/register',(req,res) => {
  //console.log(req.body)
  const newEmail = req.body.email;
  const password = req.body.password
  const id = generateRandomString();
  const keys = Object.keys(users)
  if(!newEmail || !password) {
    return res.status(400).send("400 : Empty email or password");
  }
  for(let key of keys) {
    //console.log(users[key].email)
    if(users[key].email === newEmail){
      //console.log(users)
      return res.status(400).send("400 : Email already exists");
    }
  }
  users[id] = {id, email:newEmail, password}
  
  res.cookie('user_id',id);
  return res.redirect('/urls')
})

/*****************************
 * /LOGIN ROUTE
*****************************/
app.post('/login', (req,res) => {
  res.cookie('username',req.body.username) 
  return res.redirect('/urls')
})

/*****************************
 * /LOGOUT ROUTE
*****************************/
 app.post('/logout', (req,res) => {
  res.clearCookie('username',req.body.username)
  return res.redirect('/urls');
})


/********************************************************************************
 * LISTENER
 ******************************************************************************/
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});