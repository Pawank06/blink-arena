import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
});


export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadImage(
  file: Blob,
  folder: string = ""
): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET || "",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    );

    const reader = file.stream().getReader();
    const read = () => {
      reader.read().then(({ done, value }) => {
        if (done) {
          stream.end();
          return;
        }
        stream.write(value);
        read();
      });
    };
    read();
  });
}