import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";
//This service will take the image buffer received from Multer and upload it to Cloudinary.
// Upload image buffer to Cloudinary
export const uploadImageToCloudinary = async (
  fileBuffer: Buffer
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "socialgram/profile-images",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(new Error("Cloudinary upload failed"));
        }
        // swcure_url: gives us https image url
        resolve(result.secure_url);
      }
    );

    // Convert buffer into a readable stream
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};
