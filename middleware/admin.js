const admin  = (req, res , next) => {
    if(req.user && req.user.isAdmin) {
        console.log('if block' , req.user);
        console.log('if block' , req.user.isAdmin);
        next();
    } else {
        // //console.log('Not Authorized');
        console.log('else' , req.user)
        console.log('else' , req.user.isAdmin);
        res.status(500).json({msg:"Not Admin"});
        //next();
    }
}

module.exports  = admin;
