const User = require("../models/user");

module.exports.home = (req,res)=>{
    // console.log(req.cookies);
    // if(req.cookies.user_id){
    //     User.findById(req.cookies.user_id)
    //     .catch(err=>{return;})
    //     .then(user=>{
            return res.render('home',{
                title: "Home",
            });
    //     })
    // }else{
    //     return res.redirect('SignIn')
    // }
}