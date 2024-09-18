import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dbpcujcmp",
  api_key: "726329914236117",
  api_secret: "As5eLEqRHKnRtFd7fjtfMgIq1wI",
});

export async function uploadImageToStorage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64data = reader.result as string;

      cloudinary.uploader.upload_stream(
        { resource_type: "image", upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result?.secure_url || "");
          }
        }
      ).end(base64data.split(',')[1]);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}
