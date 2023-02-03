const ApiError = require("../utils/apiError");

const sendErroForDev = (err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        error:err,
        message:err.message,
        stack:err.stack
    })
}
const sendErroForPro = (err,res)=>{
    return res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
}

const globalError = (err,req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    switch(process.env.NODE_ENV){
        case 'development':
            sendErroForDev(err,res);
            break;
        case 'production':
            sendErroForPro(err,res);     
    }
} 



module.exports = globalError;


