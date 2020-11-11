const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const getToken = require('../config/getToken')

exports.postSignup = async(req, res, next) => {
    const { name, email, password } = req.body

    try {

        const userExists = await User.findOne({ email: email });

        if (userExists) {
            return res.status(400).json({ msg: "user already exists" })
        }

        const user = new User({
            name,
            email,
            password
        })

        const salt = await bcrypt.genSalt(10);

        const hash = await bcrypt.hash(password, salt);

        user.password = hash;

        await user.save();

        const payload = {
            user: {
                id: user._id
            }
        }

        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;

            res.json({
                token: token,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                _id: user._id
            })
        })

    } catch (err) {
        console.log('err', err)
    }

}



exports.postLogin = async(req, res, next) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: "No User Found" })
        } else {
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ msg: 'No user Found' });
            }

            const payload = {
                user: {
                    id: user._id,
                }
            }

            jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 }, (err, token) => {

                if (err) throw err;

                res.status(200).json({
                    token: token,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    _id: user._id

                })
            })


        }

    } catch (err) {
        console.log(err)
    }
}

// information of user after login 

exports.getUserInfo = async(req, res, next) => {
    try {
        const user = await (await User.findById(req.user.id).populate('book')).execPopulate()

        if (!user) {
            return res.status(401).json({ msg: "Not authorized" })
        }

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
    }
}