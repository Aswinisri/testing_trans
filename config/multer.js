const { storage } = require('./storage');
const multer = require('multer');
module.exports = upload = multer({ storage });