const Product = require('../models/product');
const Order = require('../models/order');
const asyncHandler = require("express-async-handler");
const moment = require('moment');
const {uploadProductImage} = require("../helpers/productImage");

async function handleFileUploads(files) {
    const thumbnailImage = files['thumbnail'] ? files['thumbnail'][0] : null;
    const productImages= files['gallery'] ? files['gallery'] : null;
    console.log(productImages)
    const thumbnailImageUrl = thumbnailImage ? await uploadProductImage(thumbnailImage.buffer) : null;
    const productImageUrls = productImages ? await Promise.all(productImages.map(async (e) => {
        const url = await uploadProductImage(e.buffer);
        return url.trim();
    })) : [];

    return {thumbnailImageUrl, productImageUrls};
}

const GetAllProducts = asyncHandler(async (req, res) => {

    const {category} = req.query
    let query = {}

    if(category){
        query.pCate = category
    }
    const products = await Product.find(query).populate('pCate').populate('cate').sort({ createdAt: -1 });
    return res.json(products);
});

const GetSingleProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.productId);
    if (product) {
        return res.json(product)
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})

const AddProduct = asyncHandler(async (req, res) => {
    try {
        const {
            title,
            pCate,
            cate,
            price,
            salePrice,
            description,
            shortDesText,
            shortDesListItem,
        } = req.body;

        const {thumbnailImageUrl, productImageUrls} = await handleFileUploads(req.files);

        const parsedDescription = JSON.parse(description);
        const createdProduct = await Product.create({
            title,
            pCate,
            thumbnail: thumbnailImageUrl,
            cate,
            price: Number(price),
            salePrice: Number(salePrice),
            shortDes: {
                text: shortDesText,
                listItem: shortDesListItem
            },
            description: parsedDescription,
            gallery: productImageUrls
        });

        return res.status(201).json({
            status: 'success',
            data: createdProduct
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

const BestSellingProduct = asyncHandler(async (req, res) => {
    try {
        const lastWeekStart = moment().subtract(7, 'days').startOf('day').toDate();
        const todayEnd = moment().endOf('day').toDate();
        const orders = await Order.find({
            createdAt: { $gte: lastWeekStart, $lte: todayEnd },
            status: { $ne: 'cancelled' }
        })

        const productSales = {};

        orders.forEach(order => {
            const productId = order.product_id
            if (productSales[productId]) {
                productSales[productId]++;
            } else {
                productSales[productId] = 1;
            }
        });

        const sortedProductIds = Object.keys(productSales)
            .sort((a, b) => productSales[b] - productSales[a]);

        const topProductIds = sortedProductIds.slice(0, 14);

        const bestSellers = await Product.find({ _id: { $in: topProductIds } }).exec();

        const sortedBestSellers = topProductIds.map(id =>
            bestSellers.find(product => product._id.toString() === id)
        );

        return res.status(200).json({
            status: 200,
            data: sortedBestSellers
        });
    } catch (error) {
        console.error("Error fetching best-seller products: ", error);
        return res.status(500).json({ message: "Failed to fetch product", error: error.message })
    }
});


const EditProduct = asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const {
        title,
        pCate,
        cate,
        price,
        salePrice,
        shortDesListItem,
        shortDesText,
        description
    } = req.body;


    const parsedDescription = JSON.parse(description);

    const payload = {
        title,
        pCate,
        cate,
        price: Number(price),
        salePrice: Number(salePrice),
        shortDes: {
            text: shortDesText,
            listItem: shortDesListItem
        },
        description: parsedDescription,
    }

    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
        return res.status(404).json({ status: 404, message: "Product not found" });
    }

    if (req.files && Object.keys(req.files).length > 0) {
        const {thumbnailImageUrl, productImageUrls} = await handleFileUploads(req.files);

        if(thumbnailImageUrl) payload.thumbnail= thumbnailImageUrl
        if(productImageUrls) payload.gallery = productImageUrls
    }

    try {

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            payload,
            { runValidators: true, new: true }
        );

        return res.status(200).json({
            status: 200,
            message: "Product updated successfully",
            data: updatedProduct
        });

    } catch (err) {
        console.error("Error updating product:", err.message);
        return res.status(500).json({ message: "Failed to update product", error: err.message });
    }
});


const DeleteProduct = asyncHandler(async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.productId);
    if (deletedProduct) {
        return res.json({message: "Product removed", deletedProduct})
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
})


module.exports = {AddProduct, GetAllProducts, DeleteProduct, GetSingleProduct, EditProduct,BestSellingProduct}
