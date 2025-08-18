const express = require('express');
const bcrypt = require('bcrypt');
const userSchema = require('../models/userModel'); 
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userSchema.findOne({ email });
        if (!user) {
            return res.status(400).send('<h3>User not found</h3><a href="/login">Go back</a>');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send('<h3>Invalid Password</h3><a href="/login">Go back</a>');
        }

        req.session.user = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        res.redirect('/dashboard'); 
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
