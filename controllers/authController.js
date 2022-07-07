const User = require('../models/user')
const bcrypt = require('bcrypt');
const passport = require('passport');
const user = require('../models/user');

const login = (req, res) => {
    res.render('login');
}

const postLogin = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.log(err);
            return next(err);
        }

        if(!user){
            console.log("User is not there");
            res.redirect('login')
        }

        req.logIn(user, (err) => {
            if(err){
                console.log(err);
                return next(err);
            }
            res.redirect('/')
        })
    })(req, res, next)

}

const register = (req, res) => {
    res.render('register');
}

const postRegister = async(req, res) => {
    const {name, email, password} = req.body;

    // Validating req
    if(!name || !email || !password){
        res.redirect('/register');
    }

    // Validating email
    // User.exists(({email: email}, {err, result}) => {
    //     console.log("User exists");
    //     res.redirect('/register');
    // })

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Creating user
    const user = new User({
        name: name,
        email: email,
        password: hashedPassword
    })

    user.save().then((user) => {
        res.redirect('/');
    }).catch(err => {
        console.log(err);
        res.redirect('/register');
    })

    console.log(req.body);
}

const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
}

module.exports = {login, postLogin, register, postRegister, logout};
// Express ko nahi pata konsa data received ho raha hain