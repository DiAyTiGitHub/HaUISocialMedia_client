import imageDb from "@/config/firepage";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { ref as storageRef } from "firebase/storage";
import { v4 } from "uuid";

export const handleUploadImage = (image: File) => {
  return new Promise((resolve, reject) => {
    if (image !== null) {
      const id = v4();
      const imgRef = storageRef(imageDb, `files/${id}`);

      uploadBytes(imgRef, image)
        .then((value) => getDownloadURL(value.ref))
        .then((url) => resolve(url))
        .catch((error) => reject(error));
    } else {
      reject("No image selected");
    }
  });
};
