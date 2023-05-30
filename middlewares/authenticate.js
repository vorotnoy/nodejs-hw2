const { HttpError } = require("../helper");
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = process.env;
const {User} = require('../models')

const authenticate = async (req, res, next)=>{
    const {authorization  = ''}= req.headers;
    const{bearer, token} = authorization.split('');

    if (bearer !=='Bearer'){
        next(HttpError(401, 'Unauthenticate'))
    }

    try{
        const {id} = jwt.verify(token, SECRET_KEY);
        const {user} = await User.findById(id);
        if (!user){
            next(HttpError(401, 'Unauthenticate'));
        }    
        req.user = user;
        next()
    }
    catch(error){
        next(HttpError(401, 'Unauthenticate'))
    }
}
module.exports = authenticate
