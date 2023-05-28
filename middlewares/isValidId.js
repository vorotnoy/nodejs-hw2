const {isValidObjectId} = require('mongoose');
const { HttpError } = require('../helper');

const isValidId = (req, res, next) =>{
    const {id} = req.params;
    if (!isValidObjectId(id)){
        next(HttpError(400, `${id} is not valid ID format`))
    };

    next()
}

module.exports = isValidId