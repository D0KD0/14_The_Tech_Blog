const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const userData = await User.findOne({ where: { name: userName } });
        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect login info. Please retry.' });
            return;
        }

        const validPassword = await userData.checkPassword(password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect login info. Please retry.' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.json({ user: userData, message: 'Successfully logged in' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.post("/", async (req, res) => {
    try {
        console.log(req.body)
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
