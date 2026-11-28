import cloudinary from "../../config/cloudinary";
import { Readable } from "stream";
//This service will take the image buffer received from Multer and upload it to Cloudinary.
// Upload image buffer to Cloudinary
// Upload an image buffer to Cloudinary
export const uploadImageToCloudinary = async (
  fileBuffer: Buffer,
  folder: string = "socialgram/profile-images"
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(new Error("Cloudinary upload failed"));
        }

        // Return the secure URL of the uploaded image
        resolve(result.secure_url);
      }
    );

    // Convert the buffer into a readable stream
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};
