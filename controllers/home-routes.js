const router = require('express').Router();
const { Blog } = require('../models/blog');
const withAuth = require('../utils/auth');

// GET all blogs for homepage
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({})
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('home', {
            blogs,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// GET one blog

//Return to homepage if already logged in and somehow user goes to /login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

module.exports = router;