const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:id', async (req, res) => {
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

        //TODO: Add a boolean property post.sameUser if the session.username === post.user.username
        // console.log(dbBlogData);
        const post = dbBlogData.get({ plain: true});
        console.log(post);
        res.render('post', { 
            post,
            loggedIn: req.session.loggedIn })
        // res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//! Show editing screen
router.get('edit/:id', async (req, res) => {
    try{
        //TODO: GET ROUTE TO selfEdit

        //res.render('selfEdit', )
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/edit/:id', async (req, res) => {
    try {
         //TODO: POST ROUTE TO selfEdit


        //res.redirect('/../../')
    } catch (err) {
        res.status(500).json(err);
    }
})

//TODO: Test this route
router.delete('edit/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.destroy({
            where: {
                id: req.params.id
            },
        });
        res.status(200).json(dbBlogData);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;