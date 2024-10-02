require('dotenv').config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadFiles = async (fileBuffers) => {
    try {
        const urls = await Promise.all(fileBuffers.map(fileBuffer =>
            new Promise((resolve, reject) => {
                const uploadOptions = { folder: "Elegance-productImages" };
                const stream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error.message);
                        reject(error);
                    } else {
                        resolve(result.secure_url);
                    }
                });
                stream.end(fileBuffer);
            })
        ));
        return urls;
    } catch (error) {
        console.error("Error uploading files:", error.message);
        throw new Error("Error uploading files.");
    }
};

const uploadCategoryImage = async (fileBuffer) => {
    try {
        const fileSize = fileBuffer?.length;
        const maxFileSize = 10 * 1024 * 1024;

        if (fileSize > maxFileSize) {
            throw new Error("File size exceeds the maximum allowed limit.");
        }

        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: "elegance-category-images",
            };

            cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    reject(error.message);
                } else {
                    resolve(result.secure_url);
                }
            }).end(fileBuffer);
        });
    } catch (error) {
        console.log(error.message);
        throw new Error("Error uploading file..");
    }
};

const uploadSubCategoryImage = async (fileBuffer) => {
    try {
        const fileSize = fileBuffer?.length;
        const maxFileSize = 10 * 1024 * 1024;

        if (fileSize > maxFileSize) {
            throw new Error("File size exceeds the maximum allowed limit.");
        }

        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: "elegance-subcategory-images",
            };

            cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
                if (error) {
                    reject(error.message);
                } else {
                    resolve(result.secure_url);
                }
            }).end(fileBuffer);
        });
    } catch (error) {
        console.log(error.message);
        throw new Error("Error uploading file..");
    }
};

module.exports = { uploadFiles, uploadCategoryImage, uploadSubCategoryImage };
