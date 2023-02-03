class ApiError extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4)?'fail':'error';
        this.isoptional = true;
    }
}

module.exports = ApiError;