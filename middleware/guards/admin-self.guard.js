const { sendErrorResponse } = require("../../helpers/send_error_response")


module.exports = (req, res, next) =>{
    try {
        //logics
        if(req.params.id != req.admin.id){
            return res.status(403).send({message: "Not allowed admin"})
        }


        next()
    } catch (error) {
        sendErrorResponse(error, res)
    }
}