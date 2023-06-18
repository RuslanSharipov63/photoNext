const express = require("express");
const registerValidation = require("./validations/auth");
const { validationResult } = require("express-validator");
const UserModel = require("./models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const checkAuth = require("./utils/checkAuth");

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
app.post("/auth/login", async (req, res) => {
  try {
    /* сначала мы должны понять есть ли пользователь в базе данных */
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      /* мы уточняем почему не происходит авторизация только для себя, в реальном приложении ни в коем случае нельзя говорить, что именно не совпадает, нужно максимально обще сообщать, например, неверный пользователь или пароль */
      return res.status(404).json({ message: "Пользователь не найден" });
    }
    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );
    if (!isValidPass) {
      return res.status(400).json({ message: "Неверный логин или пароль" });
    }
    /* если пользователь авторизовался, то мы создаем новый токен */
    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
});

/* регистрация */
app.post("/auth/register", registerValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      fullName: req.body.fullName,
      email: req.body.email,
      avatarURL: req.body.avatarURL,
      passwordHash: hash,
    });

    const user = await doc.save();
    const token = jwt.sign({ _id: user._id }, "secret123", {
      expiresIn: "30d",
    });

    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
});

/* нам нужно проверить можем ли мы получить информацию о себе */
/* может ли пользователь получить информацию о себе */

app.get("auth/me", checkAuth, async (req, res) => {
  try {
    /* тут мы должны расшифровать токен, который будем передавать и решить может ли пользователь получить информацию о себе. для того надо сделать специальную функцию - checkAuth - она передается вторым параметром*/
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    res.json({
      succes: true,
    });
  } catch (error) {}
});
