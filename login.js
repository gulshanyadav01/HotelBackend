const user = require("./model/user");

exports.getSignup = (req, res, next) =>{
    res.render("/singup");
}

exports.postSignup = (req, res, next) =>{
    const email = req.body.email;
    const password  = req.body.password;
    
    user.findOne({email : email })
    .then( user =>{
        if(user){
        console.log("emial is already exits ");
        return res.redirect("/signup");
        }
        bcrypt.hash(password, 12)
        .then( hashed =>{
            const user = new user({
                email: email,
                password: password
            })
            return user.save();

        })
        .then(result =>{
            console.log("user is created");
            res.redirect("/login");
        })
        .catch()
        .catch()
        

    })
}

exports.getLogin = (req, res, next) =>{
    res.render("/login")

}

exports.postLogin = (req, res,  next) =>{
    const email = req.body.email;
    const pass = req.body.pass;
    user.findOne({email : email})
    .then( user =>{
        if(!user){
            return res.redirect("/signup");
        }
        bcrypt.compare(password, pass)
        .then(doMatch  =>{
            if(doMatch){
                req.session.isLoggedIn = true,
            req.session.user = user;
            return req.session.save();
            }
            res.redirect("/login");
        })
        .catch(err=>{
            res.redirect("/login");
        })
    })
    .catch(err=>{
        console.log(err);
    })

}