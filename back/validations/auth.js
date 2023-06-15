const { body } = require('express-validator')
module.exports = registerValidation = [
    body('email', 'Неверный формат электронной почта').isEmail(),
    body('password', 'Пароль слишком короткий. Минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя' ).isLength({ min: 3 }),
    body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
]