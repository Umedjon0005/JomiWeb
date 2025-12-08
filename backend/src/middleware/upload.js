const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure uploads directory exists
const uploadDir = process.env.UPLOAD_PATH || './uploads';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  if (!file) {
    return cb(null, false);
  }

  // Accept all image MIME types
  const isImageMime = file.mimetype && file.mimetype.startsWith('image/');
  
  // Accept common image extensions (including less common ones)
  const allowedExt = /\.(jpe?g|png|gif|webp|svg|heic|heif|bmp|tiff|tif|ico|avif|jfif)$/i.test(
    path.extname(file.originalname)
  );

  // Accept if it's an image MIME type OR has an image extension
  if (isImageMime || allowedExt) {
    return cb(null, true);
  }

  cb(new Error('Only image files are allowed'));
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB - increased for higher quality images
  fileFilter: fileFilter
});

module.exports = upload;

