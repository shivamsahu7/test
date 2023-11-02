function handleApiSuccess(req,res,data,message,status){
    return res.status(status).json({
        status:true,
        message,
        data
    })
}

function handleApiError(req,res,errors,message,status){
    return res.status(status).json({
        status:false,
        message,
        errors
    })
}

module.exports = {
    handleApiSuccess,
    handleApiError
}