const PhotoModel = require('./../models/Photo')

const getAll = async (req, res) => {
    
}

const create = async (req, res) => {
    try {
        const doc = new PhotoModel({
            imageURL: req.body.imageURL,
            tags: req.body.tags,
            size: req.body.size,
            user: req.userId,
        })

        const post = await doc.save();
        res.json(post)
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось добавить фото'
        })
    }
}

module.exports = create;