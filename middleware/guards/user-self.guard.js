const { sendErrorResponse } = require("../../helpers/send_error_response")


module.exports = (req, res, next) =>{
    try {
        //logics
        if(req.params.id != req.userAuth.id){
            return res.status(403).send({message: "Not allowed user"})
        }


        next()
    } catch (error) {
        sendErrorResponse(error, res)
    }
}