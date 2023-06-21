const express = require("express");
const registerValidation = require("./validations/auth");
const loginValidation = require("./validations/login");
const photoValidation = require("./validations/photo");
const mongoose = require("mongoose");
const checkAuth = require("./utils/checkAuth");
const { register, login, getMe } = require('./controllers/UserController')
const { create } = require('./controllers/PhotoController')

const PORT = 4000;
const URL = "mongodb://localhost:27017/photobox";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose
    .connect(URL)
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
/* авторизация */
app.post("/auth/login", loginValidation, login);

/* регистрация */
app.post("/auth/register", registerValidation, register);

/* нам нужно проверить можем ли мы получить информацию о себе */
/* может ли пользователь получить информацию о себе */

app.get("auth/me", checkAuth, getMe);

/* получение всех фото */
// app.get('/photos/', PhotoController.getAll)
//получаем одно фото
// app.get('/photos/:id', PhotoController.getOne)
//создаем одно фото
app.post('/photo', checkAuth, photoValidation, create)