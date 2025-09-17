import multer from "multer";
import path from "path";
import fs from "fs";

export const createUploadMiddleware = (folderName) => {

  const dir = `public/images/${folderName}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, dir);
    },
    filename: (req, file, cb) => {    
      const ext = path.extname(file.originalname);
      const fecha = new Date().toISOString().slice(0, 10); 
      cb(null, `image-${folderName}-${ext}`);
    },
  });

  return multer({ storage });
};
