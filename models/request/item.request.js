function validateItemWithId(item) {
    const schema = {
        _id: Joi.objectId().required(),
        name: Joi.string().min(2).max(255).required(),
        userId: Joi.objectId().required(),
        description: Joi.string().min(10).max(500).required(),
        imageUrl: Joi.string(),
        subCategoryId: Joi.objectId().required()

    };

    return Joi.validate(item, schema);
}

function validateItemId(item) {
    const schema = {
        _id: Joi.objectId().required()
    };

    return Joi.validate(item, schema);
}

function validateItemWithOutId(item) {
    const schema = {
        name: Joi.string().min(2).max(255).required(),
        userId: Joi.objectId().required(),
        description: Joi.string().min(10).max(500).required(),
        imageUrl: Joi.string(),
        subCategoryId: Joi.objectId().required()
    };

    return Joi.validate(item, schema);
}

exports.validateWithId = validateItemWithId;
exports.validateId = validateItemId;
exports.validateWithOutId = validateItemWithOutId;