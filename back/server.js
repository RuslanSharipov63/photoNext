const express = require('express');
const { registerValidation } = require('./validations/auth')
const { validationResult } = require('express-validator');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const PORT = 4000;
const app = express();

app.post('/auth/register', registerValidation, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
        email: req.body.email,
        fullName: req.body.fullName,
        avatarURL: req.body.avatarURL,
        passwordHash,

    })

    res.json({
        succes: true,
    })
})

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`)
})