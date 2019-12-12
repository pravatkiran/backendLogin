const User = require('../models/user.model');

exports.getLogin = (req, res) => {
    // console.log(req.get('Cookie').trim().split('=')[1]);
    console.log(req.session.isLoggedIn);
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: false
    })
}


exports.getSignup = (req, res) => {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: 'Signup',
        isAuthenticated: false
    })
}
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.getByEmail(email, oldUser => {
        if (!oldUser) return res.redirect('/login');
        if (oldUser.email === email && oldUser.password === password) {
            req.session.isLoggedIn = true;
            req.session.oldUser = oldUser;
            return req.session.save(err => {
                console.log(err);
                res.redirect('/');
            })
        }
        res.redirect('/login'); return
    })
    // res.setHeader('Set-Cookie', 'loggedIn=true');
}

exports.postSignup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.getByEmail(email, oldUser => {
        if (oldUser) {
            return res.redirect('/signup')
        }
        const user = new User(email, password);
        user.save();
        res.redirect('/');
    })
};


exports.postLogout = (req, res) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });

}