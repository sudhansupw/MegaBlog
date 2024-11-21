import conf from "../conf/conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client;
    databases;
    bucket;

    constructor() {
        // Initialize the client
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl) // Your Appwrite endpoint
            .setProject(conf.appwriteProjectId); // Your Appwrite project ID

        // Initialize services
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage: featuredImage, // Changed to match database schema
                    status,
                    userid: userId, // Changed to match database schema
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
            throw error; // Propagate error for handling in UI
        }
    }
    // async getFilePreview(fileId) {
    //     try {
    //         // Assuming you want to get a file preview (like a URL) from the Appwrite Storage
    //         const file = await this.bucket.getFileView(conf.appwriteBucketId, fileId);
    //         console.log(file);
            
    //         return file.href; // Returns the file URL for preview
    //     } catch (error) {
    //         console.error("Error fetching file preview", error);
    //         return null;
    //     }
    // }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage: featuredImage, // Changed to match database schema
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // File upload service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        if (!fileId) return ''; // Return empty string or a default image URL
        
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId
            );
        } catch (error) {
            console.error("Appwrite service :: getFilePreview :: error", error);
            return ''; // Return empty string or a default image URL
        }
    }
}

const service = new Service();
export default service;
