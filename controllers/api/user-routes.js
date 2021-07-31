const router = require('express').Router();
const { User } = require('../../models');

// localhost:3001/api/users/
//CREATE a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(userData);
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});