const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// GET all blogs for homepage
router.get('/', async (req, res) => {
    try {
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'username',
                    ]
                }
            ]
        })
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        console.log('blogs', blogs);

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
router.get('/blog/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: [
                        'username'
                    ],
                },
                {
                    model: Comment,
                    attributes: [
                        'content',
                        'date',
                    ],
                    include: {
                        model: User,
                        attributes: [
                            'username'
                        ]
                    }
                }
            ]
        })
        // console.log(dbBlogData);
        const post = dbBlogData.get({ plain: true});
        console.log(post);
        res.render('post', { post })
        // res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.get('/dashboard', async(req, res) => { //req.session.username
    try {
        if (!req.session.loggedIn) {
            res.redirect('/login');
            return
        }
        const dbUserData = await User.findAll({
            where: {
                username: req.session.username,
            },
            attributes: [
                "username",
            ],
            include: {
                model: Blog
            }
        });

        // console.log('dbUserData', dbUserData)
        // console.log('req.session', req.session);
        const post = dbUserData[0].get({ plain: true});
        // res.status(200).json(dbUserData);
        console.log(post);
        res.status(200).render('dash', post)
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//Return to homepage if already logged in and somehow user goes to /login
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

module.exports = router;