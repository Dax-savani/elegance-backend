const Contact = require('../models/contact');
const asyncHandler = require("express-async-handler");


const handleErrorResponse = (res, message, statusCode = 500, error = null) => {
    return res.status(statusCode).json({
        status: statusCode,
        message,
        error: error ? error.message : undefined
    });
};


const GetAllContacts = asyncHandler(async (req, res) => {
    try {
        const contacts = await Contact.find().exec();
        return res.status(200).json({
            status: 200,
            data: contacts
        });
    } catch (error) {
        console.error("Error fetching contacts: ", error);
        return handleErrorResponse(res, 'Failed to fetch contacts', 500, error);
    }
});


const GetSingleContact = asyncHandler(async (req, res) => {
    const { contactId } = req.params;

    try {
        const contact = await Contact.findById(contactId).exec();
        if (!contact) {
            return handleErrorResponse(res, 'Contact not found', 404);
        }

        return res.status(200).json({
            status: 200,
            data: contact
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to fetch the contact', 500, error);
    }
});


const AddContact = asyncHandler(async (req, res) => {
    const { name, phone_number, email, message } = req.body;

    try {
        if (!name || !phone_number || !email || !message) {
            return handleErrorResponse(res, 'All fields are required', 400);
        }

        const newContact = await Contact.create({
            name,
            phone_number,
            email,
            message
        });

        return res.status(201).json({
            status: 201,
            message: 'Contact created successfully',
            data: newContact
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to create contact', 500, error);
    }
});


const EditContact = asyncHandler(async (req, res) => {
    const { contactId } = req.params;
    const { name, phone_number, email, message } = req.body;

    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            { name, phone_number, email, message },
            { new: true, runValidators: true }
        ).exec();

        if (!updatedContact) {
            return handleErrorResponse(res, 'Contact not found', 404);
        }

        return res.status(200).json({
            status: 200,
            message: 'Contact updated successfully',
            data: updatedContact
        });
    } catch (error) {
        return handleErrorResponse(res, 'Failed to update contact', 500, error);
    }
});

module.exports = {
    GetAllContacts,
    GetSingleContact,
    AddContact,
    EditContact
};
