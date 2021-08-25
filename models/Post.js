const { stirlingS2Dependencies } = require('mathjs');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Post = new Schema({
    user: {
        type: String,
    },
    Borough: {
        type: String, required: [true, 'Borough is required']
    },
    CrimeType: {
        type: String, required: [true, 'Pleasea select an incident type']
    },
    Message: {
        type: String,
        required: [true, 'Your message is required']
    },
    Date: {
        type: Date,
        required: true,
    },
    City: {
        type: String,
        required: true,
    },
    PostCode: {
        type: String,
    },
    UserID: {
        type: String,
        required: true,
    },
    Comments: [
        {
            Comment: {
                type: String,
            },
            Date: {
                type: String,        
            }
        },
    ],
});

module.exports = mongoose.model("Post", Post);

