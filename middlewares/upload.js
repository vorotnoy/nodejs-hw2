const multer = require("multer");
const path = require('path');

const uploadDir = path.join(__dirname, '..', 'tmp');

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  },
})

const upload = multer({
  storage: storage,
})

module.exports = upload;