const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
// TODO: Add withAuth

router.get('/:id', 
// withAuth,
 async (req, res) => {
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
        // console.log(post);
        res.render('post', { 
            post,
            loggedIn: req.session.loggedIn })
        // res.json(post);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/comment/add/:id', async (req, res) => {
    try {
        const dbUser = await User.findOne({
            where: {
                username: req.session.id
            },
        });

        const user = dbUser.get({ plain: true });

        console.log(user);

        await Comment.create({
            content: req.body.content,
            date: new Date(),
            user_id: user.id,
            blog_id: req.params.id
        })

        res.status(200).redirect('/');
    } catch (err) {
        console.log(err);
    }
});

//! Show editing screen
router.get('/edit/:id', async (req, res) => {
    try{
        const dbBlogData = await Blog.findByPk(req.params.id)
        post = dbBlogData.get({ plain: true })

        res.status(200).render('selfEdit', post)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/edit/:id', async (req, res) => {
    try {
         //req.body returns a { title, content}
        const dbBlogData = await Blog.update(
            {
                title: req.body.title,
                content: req.body.content,
                date: new Date(),
                edited: req.body.edited
            }, {
            where: {
                id: req.params.id,    
            },
        });

        if (!dbBlogData) {
            res.status(404).json({ message:"No blogpost with this id!" });
            return;
        }
        res.status(200).json({dbBlogData, message: "Blogpost edited!"});
        res.status(200).redirect('../');
        //res.redirect('/../../')
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/edit/:id', async (req, res) => {
    try {
        const dbBlogData = await Blog.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!dbBlogData) {
            res.status(404).json({ message: 'No category found with that id!' });
            return
        };

        res.status(200).json({dbBlogData, message: "blogpost deleted!"});
        // res.status(200).json({ message: 'deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;