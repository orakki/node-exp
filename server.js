const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();
hbs.registerPartials(__dirname + '/views/partials');

//middleware

app.use((req,res,next) =>{
  var now = new Date().toString();
  console.log(`${now}: ${req.method} ${req.url}`);
  var log = `${now}: ${req.method} ${req.url}`
  fs.appendFile('server.log',log + '\n',(error) =>{
    if(error){
      console.log("uneble to append file to server.log");
    }
  });
  next();
});

// app.use((req,res,next) => {
//   res.render('maintenence.hbs');
//
// });
app.use(express.static(__dirname + '/public'));
//middleware
app.set('view engine','hbs');

hbs.registerHelper('currentYear',() =>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();
});

app.get('/',(req,res) => {
  // res.send("<h1>hello express!</h1>");
  res.render('home.hbs',{
    pageTitle:'Home',
    welcome:'welcome to our Home Page'
  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  })
});

app.get('/bad',(req,res) =>{
  res.send({
    errorMessage:"unable to connect"
  });
});

app.listen(2000,() =>{
  console.log("server is upto port 2000");
});
