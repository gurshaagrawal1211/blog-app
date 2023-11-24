import config from "../config/config";

import {Client, Account, ID, Databases, Storage, Query} from "appwrite"

export class Service{
    client = new Client() 
    databases
    storage

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
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug, //id
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
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
            return await this.databases(
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
                queries
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
    
    async deleteFile(fileTd){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileTd
            )
            return true
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileTd){
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileTd
        )
    }

   
}

const service = new Service()

export default service