import config from "../config/config";
import { Client, Databases, Query } from "appwrite";

export class DatabaseService {
  client = new Client();
  databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);

    this.databases = new Databases(this.client);
  }

  async createBlog({ title, slug, content, featuredImage, status, userID }) {
    try {
      return await this.databases.createDocument(config.appwriteDatabaseID, config.appwriteCollectionID, slug, { title, content, featuredImage, status, userID });
    } catch (error) {
      throw error;
    }
  }

  async updateBlog(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(config.appwriteDatabaseID, config.appwriteCollectionID, slug, { title, content, featuredImage, status })
    } catch (error) {
      throw error;
    }
  }

  async deleteBlog(slug) {
    try {
      await this.databases.deleteDocument(config.appwriteDatabaseID, config.appwriteCollectionID, slug)

      return true;
    } catch (error) {
      console.log("Appwrite Service :: deleteBlog :: error :: ", error);
      return false;
    }
  }

  async getBlog(slug) {
    try {
      return await this.databases.getDocument(config.appwriteDatabaseID, config.appwriteCollectionID, slug);
    } catch (error) {
      console.log("Appwrite Service :: getBlog :: error :: ", error);
      return false;
    }

  }

  async getAllBlogs() {
    try {
      return await this.databases.listDocuments(config.appwriteDatabaseID, config.appwriteCollectionID, [Query.equal("status", true)]);
    } catch (error) {
      console.log("Appwrite Service :: getListOfBlogs :: error :: ", error);
      return false;
    }
  }
};

const databaseService = new DatabaseService();
export default databaseService;