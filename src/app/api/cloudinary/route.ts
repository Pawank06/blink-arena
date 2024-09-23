import { v2 as cloudinary } from "cloudinary";
import formidable, { File } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

cloudinary.config({
  cloud_name: "dbpcujcmp",
  api_key: "726329914236117",
  api_secret: "As5eLEqRHKnRtFd7fjtfMgIq1wI",
});

// Disable body parsing to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: "Error parsing the files" });
      return;
    }

    // Log the files object for debugging
    console.log("Files received:", files);

    // Check if files.file exists and is not undefined
    const file = files?.file as File | undefined;

    if (!file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    try {
      const result = await uploadFileToCloudinary(file.filepath);
      res.status(200).json({ url: result });
    } catch (error) {
      res.status(500).json({ message: "Error uploading to Cloudinary", error });
    }
  });
}

async function uploadFileToCloudinary(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      { resource_type: "image", upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url || "");
        }
      }
    );
  });
}
