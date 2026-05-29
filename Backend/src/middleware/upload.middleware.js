const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const userId = req.user?.id || '000000000000000000000001';
    
    // Define path: uploads/userId/
    const dir = path.join(__dirname, '../../uploads', userId.toString());

    // Create the directory if it doesn't exist (recursive: true handles nested folders)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // Make the filename unique to prevent overwriting files with the same name
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const uploadDisk = multer({ 
  storage: storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

module.exports = uploadDisk;