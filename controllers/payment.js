const asyncHandler = require("express-async-handler");
// const stripe = require('stripe')('sk_test_51MwfO7SGB2xsizzqgOM4A3OZKXiTm3MzlybFDSA7o1pioj3Hcjys9VKqySz6Ez4owzkgpClyOgLxAbX9xyR7ORoe00AqS7Wxmv')
const Razorpay = require('razorpay');



const makePayment = asyncHandler(async (req, res) => {
    try {

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        })

        const options = req.body

        const order = await razorpay.orders.create(options)

        if(!order){
            return res.status(400).send("Bad Request")
        }

        res.status(200).json(order)

    } catch (err) {
        return res.status(500).json({
            status: 500,
            message: 'Something went wrong.',
            error: err.message
        });
    }
});
//
// const makePayment = asyncHandler(async (req, res) => {
//     try {
//         // Expect an array of products with name, unit_amount, and quantity from req.body
//         const { products } = req.body;
//
//         // Initialize an empty array for line items
//         const lineItems = [];
//
//         // Loop through each product received from req.body
//         for (let product of products) {
//             // Create the product on Stripe
//             const stripeProduct = await stripe.products.create({
//                 name: product.name
//             });
//
//             // Create the price for the product
//             if (stripeProduct) {
//                 const price = await stripe.prices.create({
//                     product: stripeProduct.id,
//                     unit_amount: product.price,
//                     currency: 'inr',
//                 });
//
//                 // Add the product to line items if the price is successfully created
//                 if (price.id) {
//                     lineItems.push({
//                         price: price.id,
//                         quantity: product.quantity // Dynamic quantity from req.body
//                     });
//                 }
//             }
//         }
//
//         // Proceed to create a session if there are line items
//         if (lineItems.length > 0) {
//             const session = await stripe.checkout.sessions.create({
//                 line_items: lineItems, // Array of products and quantities
//                 mode: "payment",
//                 success_url: "http://localhost:3000/success",
//                 cancel_url: "http://localhost:3000/cancel",
//                 customer_email: "kaushalsojitra19@gmail.com", // You can make this dynamic as well
//                 payment_intent_data: {
//                     shipping: {
//                         name: "Kaushal Sojitra", // You can make this dynamic as well
//                         address: {
//                             line1: "City center",
//                             city: "Surat",
//                             state: "Gujarat",
//                             postal_code: "395010",
//                             country: "India"
//                         }
//                     }
//                 }
//             });
//
//             return res.status(200).json(session);
//         } else {
//             return res.status(400).json({
//                 status: 400,
//                 message: 'No products available for checkout.'
//             });
//         }
//     } catch (err) {
//         return res.status(500).json({
//             status: 500,
//             message: 'Something went wrong.',
//             error: err.message
//         });
//     }
// });




module.exports = {makePayment};