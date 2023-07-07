
const UserModel = require("./../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
       

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
}

const login = async (req, res) => {
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
}


const getMe = async (req, res) => {
    try {
        /* тут мы должны расшифровать токен, который будем передавать и решить может ли пользователь получить информацию о себе. для того надо сделать специальную функцию - checkAuth - она передается вторым параметром*/
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }
        const { passwordHash, ...userData } = user._doc;

        res.json( userData );
    } catch (error) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа",
        });
    }
}

module.exports = { register, login, getMe }