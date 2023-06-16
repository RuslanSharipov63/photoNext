const express = require('express');
const registerValidation = require('./validations/auth')
const { validationResult } = require('express-validator');
const UserModel = require('./models/User');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
/* const { connectionToDb, getDb } = require('./db') */

const PORT = 4000;
const app = express();

mongoose
    .connect('mongodb://localhost:27017/photobox')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))



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

    const user = doc.save();

    res.json(user)
})


/* let db;
connectionToDb((error) => {
    if (!error) {
        app.listen(PORT, (err) => {
            err ? console.log(err) : console.log(`Listening port ${PORT}`)
        })
        db = getDb();
    } else {
        console.log(`DB connection error: ${error}`)
    }
}) */
