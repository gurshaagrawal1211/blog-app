import config from "../config/config";

import {Client, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client = new Client() 
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    // post methods
    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            console.log(featuredImage)
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, //id
                {
                    title,
                    content,
                    'featured-Image': featuredImage,
                    status,
                    'userID':userId
                }
            )
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }

    async updatePost(slug,{title, content, featuredImage, status})
    {
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
            return false
        }
    }

     async getPosts(queries = [Query.equal("status","true")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            throw error
            return false
        }
    }


    // File methods

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }
    
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId){
        //console.log(fileId)
        const encodedFileId = (encodeURIComponent(fileId))
        //console.log(encodedFileId)
            return this.storage.getFilePreview(
            config.appwriteBucketId,
            encodedFileId
            )
        
    }

   
}

const service = new Service()

export default service