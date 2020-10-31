//multer config file used to upload the jpeg

const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];             //get the extention
    callback(null, name + Date.now() + '.' + extension);    //file name is name + date + extention
  }
});

module.exports = multer({storage: storage}).single('image');