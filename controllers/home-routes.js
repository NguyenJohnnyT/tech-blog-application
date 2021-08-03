const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
//TODO: Add withAuth

// GET all blogs for homepage
router.get('/', async (req, res) => {
    try {
        if (!req.session.loggedIn) {
            res.render('home', {loggedIn: false})
            return;
        };
        const blogData = await Blog.findAll({
            include: [
                {
                    model: User,
                    attributes: [
                        'username',
                    ]
                }
            ],
            order: [["date", 'DESC']]
        });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        // console.log('blogs', blogs);
        
        res.render('home', {
            blogs,
            loggedIn: req.session.loggedIn,
            sessionUser: req.session.username
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async(req, res) => { //req.session.username
    try {
        // if (!req.session.loggedIn) {
        //     res.redirect('/login');
        //     return
        // }
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
        const post = [dbUserData[0].get({ plain: true})];
        // res.status(200).json(dbUserData);
        console.log(post);
        res.status(200).render('dash', {
            post,
            loggedIn: req.session.loggedIn,
            sessionUser: req.session.username
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//TODO: Add dashboard/add POST route for new blogs
router.get('/dashboard/add', withAuth, async (req, res) => {
    try {
        res.status(200).render('selfCreate', {loggedIn: req.session.loggedIn, sessionUser: req.session.username});
    }catch (err) {
        res.status(500).json(err)
    }
})

router.post('/dashboard/add', withAuth, async (req, res) => {
    try{
        const dbUser = await User.findOne({
            where: {
                username: req.session.username
            },
        });

        const user = dbUser.get({ plain: true });
        // console.log(user)

        const dbNewPost = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            date: new Date(),
            user_id: user.id
        })

        const post = dbNewPost.get({ plain: true });
        res.status(200).redirect('/');
    } catch (err) {
        res.status(550).json(err);
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