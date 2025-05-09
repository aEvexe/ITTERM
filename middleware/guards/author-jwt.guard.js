const { sendErrorResponse } = require("../../helpers/send_error_response")
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization){
            return res.status(401).send({message: "authorized not found"})
        }

        const bearer = authorization.split(" ")[0]
        const token = authorization.split(" ")[1]

        if(bearer !== "Bearer" || !token){
            return res.status(401).send({message: "bearer not found"})
        }

        const decodedPayload = jwt.verify(token, config.get("tokenKey"));
        // if (!decodedPayload.is_active){
        //     return res.status(403).send({message: "not active user"})
        // }


        req.author = decodedPayload;
        console.log(req)
        next()
    } catch (error) {
        sendErrorResponse(error, res)
    }
}