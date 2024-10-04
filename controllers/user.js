const User = require("../models/user");
const { generateToken } = require("../auth/jwt");
const asyncHandler = require("express-async-handler");


const errorResponse = (res, message, statusCode = 400) => {
    return res.status(statusCode).json({ message, status: statusCode });
};

const formatUserData = (user) => ({
    first_name: user?.first_name,
    last_name: user?.last_name,
    dob: user?.dob,
    phone_number: user?.phone_number,
    email: user?.email,
    address_details: user?.address_details,
    token: user?.token,
});


const register = asyncHandler(async (req, res) => {
    const { email, phone_number } = req.body;

    const userExists = await User.exists({
        $or: [{ email }, { phone_number }]
    });

    if (userExists) {
        return errorResponse(res, "User already exists", 409);
    }

    const newUser = await User.create(req.body);

    return res.status(201).json({
        data: newUser,
        message: "Registered successfully",
        status: 201,
    });
});

const me = asyncHandler(async (req, res) => {
    const currentUser = req.user;
    return res.status(201).json({
        data: currentUser,
        status: 201,
    });
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return errorResponse(res, "User not found", 404);
    }

    const isMatch = await user.isPasswordMatched(password);

    if (!isMatch) {
        return errorResponse(res, "Invalid credentials", 401);
    }

    const authToken = generateToken(user._id);
    res.cookie("token", authToken);

    const userData = formatUserData(user);
    userData.token = authToken;

    return res.json({
        data: userData,
        message: "Logged in successfully",
        status: 200,
    });
});

module.exports = { register, login , me};
