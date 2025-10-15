import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// ustteki cloudinary formatini kullanarak resim yukleme ornegidir.

const upload = async (next, file_path, folder) => {
  // file_path -> yuklenecek dosyanin yoludur.
  return await cloudinary.uploader.upload(
    file_path,
    {
      folder,
    },
    (err) => {
      if (err)
        return next(new Error("Something went wrog while uploading Assay!"));
     
    }
  );
};

export { upload };
