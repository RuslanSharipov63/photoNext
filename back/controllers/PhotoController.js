const PhotoModel = require("./../models/Photo");

const getAll = async (req, res) => { };

const create = async (req, res) => {
  try {
    const doc = new PhotoModel({
      imageURL: req.body.imageURL,
      tags: req.body.tags,
      size: req.body.size,
      user: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось добавить фото",
    });
  }
};

module.exports = create;


/* 
{
  "imageURL": "https://w.forfun.com/fetch/4a/4af0bcc2b0c34fd573eca9f1be9ab245.jpeg",
      "tags": ["react", "js"],
      "size": 333,
      "user": "",
}

*/