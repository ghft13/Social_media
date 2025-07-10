import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'chillplay_uploads', // 🔸 folder in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'mp4'],
  },
});

export { cloudinary, storage };
