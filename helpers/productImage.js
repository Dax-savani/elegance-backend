require('dotenv').config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const uploadProductImage = async (fileBuffer) => {
    try {
        const fileSize = fileBuffer?.length;
        const maxFileSize = 10 * 1024 * 1024;

        if (fileSize > maxFileSize) {
            throw new Error("File size exceeds the maximum allowed limit.");
        }

        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: "elegance-product-images",
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
const uploadOffersImage = async (fileBuffer) => {
    try {
        const fileSize = fileBuffer?.length;
        const maxFileSize = 10 * 1024 * 1024;

        if (fileSize > maxFileSize) {
            throw new Error("File size exceeds the maximum allowed limit.");
        }

        return new Promise((resolve, reject) => {
            const uploadOptions = {
                folder: "elegance-offer-images",
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

module.exports = { uploadProductImage, uploadCategoryImage, uploadSubCategoryImage , uploadOffersImage };
