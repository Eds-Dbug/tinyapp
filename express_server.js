const express = require('express');
const cookieParser = require('cookie-parser');
const {generateRandomString,findEmail,urlsForUser} = require('./helper/helperFunc')
const app = express();
const PORT = 8080;


const users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "y",
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "x",
  },
};

const urlDatabase = {
  b6UTxQ: {
    longURL: "https://www.tsn.ca",
    userID: "userRandomID",
  },
  i3BoGr: {
    longURL: "https://www.google.ca",
    userID: "user2RandomID",
  },
};



/********************************************************************************
 *******************************************************************************
 * APP USES
 ******************************************************************************
 *******************************************************************************/
app.set('view engine', 'ejs');
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));



/********************************************************************************
 *******************************************************************************
 * GET ROUTES
 ******************************************************************************
 *******************************************************************************/


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
    urls: {},
    user: users[user_id],
    loggedIn: false,
    notLoggedInMsg: "Log in to see URLs !"
  };
  if(user_id) {
    templateVars.loggedIn = true;
    templateVars.urls = urlsForUser(urlDatabase, user_id)
  }
  return res.render('urls_index', templateVars);
});
/*****************************
 * /U/:ID ROUTE (for redirecting short links to the longURL link)
*****************************/
app.get("/u/:id", (req, res) => {
  const shortURL = req.params.id;
  //if entry exists in database

  if(!urlDatabase[shortURL]){
    return res.send('Error: id does not exits\n');
  }
  if(urlDatabase[shortURL]){
   return res.redirect(urlDatabase[shortURL].longURL);
  }
  res.status(400).send("No link here");
  
});
/*****************************
 * /URLS/NEW ROUTE (for rending urls_new page)
*****************************/
app.get('/urls/new',(req, res) => {
  const user_id = req.cookies.user_id;
  if(!user_id) {
    return res.redirect('/login')
  }
  const templateVars = {
    user : users[user_id]
  };
  res.render('urls_new',templateVars);
});

/*****************************
 * /URLS/:ID ROUTE (for rendering urls_show page)
*****************************/

app.get('/urls/:id',(req, res) => {
  const user_id = req.cookies.user_id;
  const templateVars = {
    id: req.params.id, 
    longURL: urlDatabase[req.params.id].longURL,
    user: users[user_id]
  };
  if(!user_id) {
    return res.status(400).send("Error : Please Login")   
  }

  res.render('urls_show', templateVars);
});

/*****************************
 * /LOGIN (for users to login)
*****************************/

app.get('/login',(req,res) => {
  const user_id = req.cookies.user_id;
  const templateVars = {
    urls: urlDatabase,
    user: users[user_id]
  };
  if(user_id){
    return res.redirect('/urls')
  }
  return res.render('login',templateVars)
})

/*****************************
 * /REGISTER (for rendering urls_show page)
*****************************/

app.get('/register',(req,res) => {
  const user_id = req.cookies.user_id;
  const templateVars = {
    urls: urlDatabase,
    user: users[user_id]
  };
  if(user_id) {
    return res.redirect('/urls')
  }
  return res.render('register',templateVars)
});


app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/hello', (req, res) => {
  res.send('<html><body>Hello <b>World</b></body></html>\n');
});

/********************************************************************************
 *******************************************************************************
 * POST ROUTES
 ******************************************************************************
 *******************************************************************************/

/*****************************
 * /URLS ROUTE (for creating new link)
*****************************/

app.post('/urls', (req, res) => {
  //console.log(req.body);
  const user_id = req.cookies.user_id;
  const newLongURL = req.body.longURL
  const genId = generateRandomString();
  if(!user_id) {
    return res.send('Please login to shorten URL!\n')
  }

  urlDatabase[genId] = {userID: user_id ,longURL: newLongURL} ;
  res.redirect(`/urls/${genId}`);
});

/*****************************
 * /URLS/:ID ROUTE (for updating)
*****************************/
app.post('/urls/:id', (req, res) => {
  //console.log(req.body)
  const longURL = req.body.longURL
  const url_id = req.params.id;
  const user_id = req.cookies.user_id;
  const urlsUser = urlsForUser(urlDatabase,user_id)
  //console.log(req.cookies)
  if(!user_id) {
    return res.status(403).send(`Error: is not logged in\n`);
  }
  if(!urlDatabase[url_id]){
    return res.status(404).send(`Error: id:${url_id} does not exist\n`);
  }
  if(!urlsUser[url_id]){
    return res.status(403).send(`Error: User does not own URL ${url_id}\n`);
  }

  urlDatabase[url_id] = {userID: user_id ,longURL};
  res.redirect(`/urls/${url_id}`);
});
/*****************************
 * /URLS/:ID/DELETE ROUTE
*****************************/

app.post('/urls/:id/delete', (req,res)=> {
  //console.log(req.params.id)
  //console.log(req.params)
  const user_id = req.cookies.user_id;
  const urlsUser = urlsForUser(urlDatabase,user_id)
  const url_id = req.params.id;

  if(!user_id) {
    return res.status(403).send(`Error: is not logged in\n`);
  }
  if(!urlDatabase[url_id]){
    return res.status(404).send(`Error: id:${url_id} does not exist\n`);
  }
  if(!urlsUser[url_id]){
    return res.status(403).send(`Error: User does not own URL ${url_id}\n`);
  }
  
  delete urlDatabase[url_id]
  //console.log(urlDatabase)
  res.redirect('/urls')
}) 

/*****************************
 * /REGISTER ROUTE
*****************************/
app.post('/register',(req,res) => {
  const newEmail = req.body.email;
  const password = req.body.password
  const id = generateRandomString();
  
  if(!newEmail || !password) {
    return res.status(400).send("400 : Empty email or password");
  }
  if(findEmail(users,newEmail)) {
    return res.status(400).send("400 : Email already exists");
  }
    users[id] = {id, email: newEmail, password}
    res.cookie('user_id',id);
    res.redirect('/urls');
})

/*****************************
 * /LOGIN ROUTE
*****************************/
app.post('/login', (req,res) => {
  //console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;
  const user = findEmail(users,email);
  //lookup the email adress 
  //if email adress doesnt exist response 403
  if(!findEmail(users,email)){
    return res.status(403).send("403 : Email does not exist");
  }else{
    //if email exists than compare passwords with the form pass if no match 403
    if(findEmail(users,email).password === password){
      //if the pass words do match set the user_id cookie matching user id than redirect to /urls
      
      res.cookie('user_id',String(user.id)) 
      return res.redirect('/urls')
    }else {
      return res.status(403).send("403 : Wrong Password");
    }
  }
})

/*****************************
 * /LOGOUT ROUTE
*****************************/
 app.post('/logout', (req,res) => {
  const email = req.body.email;
  const user = findEmail(users,email);
  res.clearCookie('user_id',user.id)
  return res.redirect('/urls');
})


/********************************************************************************
 * LISTENER
 ******************************************************************************/
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});