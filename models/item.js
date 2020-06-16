const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    product: {
        name: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255,
            required: true
        },
        userId: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 500
        },
        imageUrl: {
            type: String
        },
        subCategory: {
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 255
            },
            category: {
                name: {
                    type: String,
                    required: true,
                    minlength: 2,
                    maxlength: 255
                }
            }
        }

    },
    unit: {
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    },
    price: {
        type: Number,
        required: true
    },
    isPurchased: {
        type: Boolean,
        required: true,
    },
    stockQuantity: {
        type: Number,
        required: true
    }
});

exports.Item = mongoose.model('Item', itemSchema);