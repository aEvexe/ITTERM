const { sendErrorResponse } = require("../../helpers/send_error_response")


module.exports = (req, res, next) =>{
    try {
        //logics
        if(!req.author.is_expert){
            return res.status(403).send({message: "You are not expert"})
        }


        next()
    } catch (error) {
        sendErrorResponse(error, res)
    }
}