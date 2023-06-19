const { body } = require('express-validator')
const photoValidation = [
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
    body('email', 'Неверный формат электронной почты').isEmail(),
    body('password', 'Пароль слишком короткий. Минимум 5 символов').isLength({ min: 5 }),
    body('avatarURL', 'Неверная ссылка на аватарку').optional().isURL(),
]
module.exports = photoValidation;