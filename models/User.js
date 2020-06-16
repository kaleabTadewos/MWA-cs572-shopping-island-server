const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    status: {
        type: String,
        enum: ['ACTIVE ', 'PENDING', 'INACTIVE'],
        default: 'PENDING'
    },
    role: {
        type: String,
        enum: ['ADMIN', 'SELLER', 'BUYER']
    },
    shoppingCart: {
        items: [{
            _id: {
                type: mongoose.Types.ObjectId,
                required: true
            },
            product: {
                _id: {
                    type: mongoose.Types.ObjectId,
                    required: true
                },
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
                    _id: {
                        type: mongoose.Types.ObjectId,
                        required: true
                    },
                    name: {
                        type: String,
                        required: true,
                        minlength: 2,
                        maxlength: 255
                    },
                    category: {
                        _id: {
                            type: mongoose.Types.ObjectId,
                            required: true
                        },
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
                _id: {
                    type: mongoose.Types.ObjectId,
                    required: true
                },
                name: {
                    type: String,
                    required: true,
                    minlength: 2,
                    maxlength: 255
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
        }]
    },
    order: {
        orderDetail: [{
            items: {
                _id: {
                    type: mongoose.Types.ObjectId,
                    required: true
                },
                product: {
                    _id: {
                        type: mongoose.Types.ObjectId,
                        required: true
                    },
                    _id: {
                        type: mongoose.Types.ObjectId,
                        required: true
                    },
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
                        _id: {
                            type: mongoose.Types.ObjectId,
                            required: true
                        },
                        name: {
                            type: String,
                            required: true,
                            minlength: 2,
                            maxlength: 255
                        },
                        category: {
                            _id: {
                                type: mongoose.Types.ObjectId,
                                required: true
                            },
                            name: {
                                type: String,
                                minlength: 2,
                                maxlength: 255
                            }
                        }
                    }

                },
                unit: {
                    _id: {
                        type: mongoose.Types.ObjectId,
                        required: true
                    },
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
                },
                orderStatus: {
                    type: String,
                    enum: ['CANCELLED', 'APPROVED', 'DELIVERED', 'SHIPPED', 'ON THE WAY', 'ORDERED'],
                    defualt: 'ORDERED'
                }
            }
        }],
        orderDate: {
            type: Date,
        },
        shippingAddress: {
            state: {
                type: String,
                minlength: 2,
                maxlength: 255
            },
            city: {
                type: String,
                minlength: 2,
                maxlength: 255
            },
            street: {
                type: String,
                minlength: 2,
                maxlength: 255
            },
            zipCode: {
                type: String,
                minlength: 5,
                maxlength: 5
            }
        },
        payment: {
            type: String,
            enum: ['PENDING', 'PAYED', 'VOID'],
            defualt: 'PENDING'
        }
    },
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    phoneNumber: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255
    },
    point: {
        type: Number,
        default: 0
    },
    coupon: {
        grade: {
            type: String,
            minlength: 2,
            maxlength: 255,
            default: 'YELLOW'
        },
        value: {
            type: Number,
        }
    },

    billingInformation: {
        state: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255
        },
        city: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255
        },
        street: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255
        },
        zipCode: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 5
        },
        accountNumber: {
            type: String,
            required: true
        },
        expiryDate: {
            type: Date,
            required: true
        },
        nameOntheCard: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 255
        },
        ccv: {
            type: Number,
            required: true,
            maxlength: 3
        }
    }

});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id, role: this.role }, config.get('jwtPrivateKey'))
    return token;
}

//user created successfully 
const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        //name: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(1024).required(),
        status: Joi.string(),
        role: Joi.string()
    };

    return Joi.validate(user, schema);
}
//exported

exports.User = User;
exports.validate = validateUser;