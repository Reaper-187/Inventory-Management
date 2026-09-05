import { randomUUID } from 'crypto';
import { diskStorage } from 'multer';
import { extname } from 'path';

export const productImageStorage = diskStorage({
  destination: './uploads/products',
  filename: (req, file, cb) => {
    const uniqueName = `${randomUUID()}${extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
