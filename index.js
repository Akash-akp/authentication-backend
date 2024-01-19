const express = require("express");
const cookieParser = require("cookie-parser");
const port = 8000;

// contect to server
const db = require('./config/mongoose');
const app = express();

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')

const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());

// app use layout
const ExpressLayout = require('express-ejs-layouts');
const { urlencoded } = require("express");
app.use(ExpressLayout);

// set up view 
app.set('view engine','ejs');
app.set('views','./views');

// connect home.ejs with css and js file
app.use(express.static('./assets'));

// extract style and script from subpage into layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(session({
    name: "Website",
    // TODO change the secret before deployement in production mode
    secret: "_secret",
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100)
    },
    // store: MongoStore.create({ mongoUrl : 'mongodb://localhost:27017/auth' },function(err){console.log("error connecting mongoStore")})
    store: MongoStore.create({ mongoUrl : 'mongodb://localhost:27017/auth' },function(err){console.log("error connecting mongoStore")})
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthentication);

// config routes
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("server error",err);
    }
    console.log("Server is running on the port: ",port);
})