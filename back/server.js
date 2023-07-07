const express = require("express");
/* multer  - библиотека для загрузки изображений */
const multer = require("multer");
const registerValidation = require("./validations/auth");
const loginValidation = require("./validations/login");
const photoValidation = require("./validations/photo");
const mongoose = require("mongoose");
const checkAuth = require("./utils/checkAuth");
const { register, login, getMe } = require("./controllers/UserController");
const {
    create,
    getAll,
    getOne,
    remove,
    updateTags,
} = require("./controllers/PhotoController");
const handleValidationErrors = require("./utils/handleValidationsErrors");

const PORT = 4000;
const URL = "mongodb://localhost:27017/photobox";

const app = express();

/* мы должны сказать express, что ты должен проверить если тебе придет любой запрос на uploads то тогда из библиотеки express возьми функцию static и проверяем есть ли в этой папке uploads то что тебе дают. это нужно если например мы откроем http::/localhost:4000/и имя нашего файла - чтобы отображалась картинка, а то ее не будет, будет ошибка - что такого роута нет*/
app.use(express.json());

app.use("/uploads", express.static("/uploads"));
/* создаем хранилище где будем сохранять наши картинки*/
const storage = multer.diskStorage({
    /* сейчас мы должны написать путь куда будем сохранять картинки. эта функция ожидает несколько параметров, но мы пока пропишем пустые места и только callback передадим */
    destination: (_, __, cb) => {
        /* мы должен сказать, что эта функция не ожидаем никаких ошибок, и второе должна сохранить картинки в папку uploads */
        cb(null, "back/uploads");
    },
    /* далее мы объясняем как будет называться наши файлы */
    fileName: (_, file, cb) => {
        /* та же функция, но мы вторым параметром передаем названием файла и а в callback говорим что хотим вытащить его оригинальное название */
        cb(null, file.originalname);
    },
});

/* теперь мы должны эту логику, которую прописали в хранилище картинок storsge применить к express */

const upload = multer({ storage });

app.use(express.urlencoded({ extended: true }));

mongoose
    .connect(URL)
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
/* авторизация */
app.post("/auth/login", loginValidation, handleValidationErrors, login);

/* регистрация */
app.post("/auth/register", registerValidation, handleValidationErrors, register);

/* нам нужно проверить можем ли мы получить информацию о себе */
/* может ли пользователь получить информацию о себе */

app.get("auth/me", checkAuth, getMe);

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
    /* если все нормально (а за  это отвечает второй параметр функции), то мы возвращаем путь к файлу, то есть ссылку */
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

/* получение всех фото */
app.get("/photos", getAll);
//получаем одно фото
app.get("/photo/:id", getOne);
//создаем одно фото
app.post("/photo", checkAuth, photoValidation, handleValidationErrors, create);
/* удаляем фото */
app.delete("/photo/:id", checkAuth, remove);
/* обновляем фото */
app.patch("/photo/:id", checkAuth, photoValidation, handleValidationErrors, updateTags);
