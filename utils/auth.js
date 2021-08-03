const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
        // console.log(window.location.toString());
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;