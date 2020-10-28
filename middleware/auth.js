const jwt = require('jsonwebtoken');
const User = require('../model/user')

module.exports = async (req, res , next) => {
   const token = req.header('x-auth-token')

   if(!token) {
    return res.status(401).json({msg:"No Token"})
   }

   try {
      const decoded = jwt.verify(token , process.env.JWT_SECRET)
      
      req.user = await User.findById(decoded.user.id).select('-password')

      // console.log('auth middleware', req.user._id)
      // console.log('auth middleware', req.user.isAdmin)

      next();
   } catch(err) {
      
    console.log(err.message);
    return res.status(500).json({ msg: 'Invalid token' });
   }

}