import { storage } from "../firebaseConfig";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  UploadResult,
  StorageReference,
  deleteObject,
} from "firebase/storage";

export const uploadFile = (file: File, destination: string) => {
  return new Promise<string>((resolve, reject) => {
    const storageRef: StorageReference = ref(
      storage,
      `${destination}/` + file.name
    );

    uploadBytes(storageRef, file)
      .then((snapshot: UploadResult) => {
        console.log(snapshot.ref.fullPath); // folder path in Firebase Storage
        return getDownloadURL(snapshot.ref);
      })
      .then((url: string) => {
        resolve(url); // URL of the uploaded picture
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
};

export const deleteFile = (filePath: string) => {
  return new Promise<void>((resolve, reject) => {
    const storageRef: StorageReference = ref(storage, filePath);

    deleteObject(storageRef)
      .then(() => {
        console.log(`File ${filePath} deleted successfully.`);
        resolve();
      })
      .catch((error: Error) => {
        console.error(`Error deleting file ${filePath}:`, error);
        reject(error);
      });
  });
};
