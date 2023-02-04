const ApiError = require("../utils/apiError");

const sendErroForDev = (err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}

const validationError = (err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}

const sendErroForPro = (err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}

const handelJwtInvalidSignature = ()=> new ApiError(`Invalid token ,pls login again..`,401);
const handelJwtExpired = ()=> new ApiError(`Expired token ,pls login again..`,401);

const globalError = (err,req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    switch(process.env.NODE_ENV){
        case 'development':
            if(err.name === "ValidationError") {
                validationError(err,res);
            } 
            else{
            sendErroForDev(err,res);
            }
        break;
        case 'production':
            if(err.name === "JsonWebTokenError") err = handelJwtInvalidSignature();
            if(err.name === "TokenExpiredError") err = handelJwtExpired();
            sendErroForPro(err,res);     
    }
} 



module.exports = globalError;


