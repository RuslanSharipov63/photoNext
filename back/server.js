const express = require ('express');
const PORT = 4000;
const app = express(); 

app.listen(PORT, (err) => {
err ? console.log(err) : console.log(`Listening port ${PORT}`)
})