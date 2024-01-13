import { Client, Storage, ID } from "appwrite";

import config from "../config/config";

export class StorageService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile(config.appwriteBucketID, ID.unique(), file)
    } catch (error) {
      console.log("Appwrite Service :: uploadFile :: error :: ", error);
      return false;
    }
  }

  async deleteFile(fileID) {
    try {
      await this.storage.deleteFile(config.appwriteBucketID, fileID);
      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteFile :: error :: ", error);
      return false;
    }
  }

  async getFilePreview(fileID) {
    try {
      return await this.storage.getFilePreview(config.appwriteBucketID, fileID);
    } catch (error) {
      console.error("Appwrite Service :: getFilePreview :: error :: ", error)
    }
  }
}

const storageService = new StorageService();

export default storageService;