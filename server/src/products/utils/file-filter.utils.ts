import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

export const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: any,
) => {
  const allowedExtensions = /jpg|jpeg|png|webp/;
  const isValidExt = allowedExtensions.test(
    extname(file.originalname).toLowerCase(),
  );
  const isValidMime = allowedExtensions.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(
      new BadRequestException(
        'Invalid file type. Only jpg, jpeg, png, webp are allowed.',
      ),
      false,
    );
  }
};
