const PhotoModel = require("./../models/Photo");

/* получаем все фото */

const getAll = async (req, res) => {
  try {
    /* здесь мы не только получаем все фото, но еще и юзера нашего. в схеме мы сделали эту связь. выполняем populate и передаем в него наш параметр, можно строку, а можно если надо и объект. exec - это выполнить запрос. passwordHash можно удалить */
    const photos = await PhotoModel.find().populate("user").exec();
    res.json(photos);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось загрузить фотографии",
    });
  }
};
/* получаем одну фото */
const getOne = async (req, res) => {
  try {
    const photoId = req.params.id;
    /* у  mongodb есть метод findOneById - чтобы получить что-то по id. но нам надо вместе с открытием фото еще и обновлять кол-во просмотров. поэтому сделаем по-другому. это он сделает, а нам число просмотров не надо */
    const photo = await PhotoModel.findById(photoId);
    if (!photo) {
      return res.json({
        mesage: "Фотография не найдена",
      });
    }
    return res.json(photo);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Ошибка сервера",
    });
  }
};

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

/* удаляем фото */
const remove = async (req, res) => {
  const photoId = await req.params.id;
  try {
    await PhotoModel.findByIdAndDelete({ _id: photoId });
    return res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не удалось удалить фотографию",
    });
  }
};

const updateTags = async (req, res) => {
  try {
    const photoId = await req.params.id;
    await PhotoModel.updateOne({
      _id: photoId,
    }, {
      tags: req.body.tags
    })
    return res.json({
      success: true
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Не удалось обновить статью",
    });
  }
}

module.exports = { create, getAll, getOne, remove, updateTags };
