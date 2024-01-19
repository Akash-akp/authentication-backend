const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

// authentication using passport

passport.use(new LocalStrategy({
        usernameField : 'email'
    },function(email,password,done){

        // find User and establish the identity

        User.findOne({email:email})
        .then((user)=>{
            if(!user||user.password!=password){
                console.log("Invalid Username/Password");
                return done(null,false);
            }
            return done(null,user);
        })
        .catch((err)=>{
            console.log("Error in finding user");
            return done(err);
        })

    }
))

// serialise the user to decide the key is kept in the cookie

passport.serializeUser(function(user,done){
    done(null,user.id);
})

//deserialise the user from the key in the cookie

passport.deserializeUser(function(id,done){
    User.findById(id)
    .then((user)=>{return done(null,user);})
    .catch(err=>console.log("error in deserializing"))
})

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    // console.log(req.isAuthenticated());
    if(req.isAuthenticated()){
        next();
    }else if(req.url=='/'){
        return res.redirect('User/SignIn')
    }else{
        return res.redirect('SignIn');
    }
}


passport.setAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}

passport.alreadysignedin = function(req,res,next){
    if(req.isAuthenticated()){
        return res.redirect('/');
    }else{
        next();
    }
}

module.exports = passport;