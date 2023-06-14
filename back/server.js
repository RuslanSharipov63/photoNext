const express = require('express');
const { registerValidator } = require('./validations/auth')
const PORT = 4000;
const app = express();



app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`)
})