import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ secure: true });

interface UploaderProps {
  path: string;
}

const handleUploadPdf = async ({ path }: UploaderProps) => {
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true,
  };
  try {
    const uploadresult = await cloudinary.uploader
      .upload(path, options)
      .then((upldata) => {
        fs.unlink(path, (err) => {
          if (err) {
            console.log("Deletion err", err);
          }
        });
        return upldata;
      });

    return uploadresult.secure_url;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default handleUploadPdf;
