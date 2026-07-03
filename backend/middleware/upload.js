const multer = require('multer');
const path = require('path');
const { fileTypeFromBuffer } = require('file-type');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = async (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (!mimetype || !extname) {
    return cb(new Error('Only image files are allowed!'));
  }

  // Additional content validation
  try {
    // In multer 2.x, we can validate file content more thoroughly
    // For now, we'll rely on mimetype and extension
    cb(null, true);
  } catch (error) {
    cb(new Error('Invalid file content'));
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 5 // Maximum 5 files
  },
  fileFilter: fileFilter
});

module.exports = upload;
