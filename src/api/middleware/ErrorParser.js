const errorParser = (err, req, res, next) => {
    if (err) {
        const status = err.status ? err.status : 400;
        
        const errorResponse = {
            success: false,
            message: err.message,
        };
        
        if(err.errors){
            const errors = err.errors.map(x => x.messages).join(', ')
            errorResponse.errors = errors;
        }
        
        return res.status(status).send(errorResponse);
    } else {
        return next(err); // let subsequent error handlers or connect handle
    }
}

module.exports = errorParser;