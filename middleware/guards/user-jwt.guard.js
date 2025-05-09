const { sendErrorResponse } = require("../../helpers/send_error_response")
const jwt = require('jsonwebtoken');
const config = require('config');


module.exports = async (req, res, next) => {
    try {
        const userAuth = req.headers.authorization;
        if (!userAuth){
            return res.status(401).send({message: "authorized not found"})
        }

        const bearer = userAuth.split(" ")[0]
        const token = userAuth.split(" ")[1]

        if(bearer !== "Bearer" || !token){
            return res.status(401).send({message: "bearer not found"})
        }

        const decodedPayload = jwt.verify(token, config.get("userTokenKey"));


        req.userAuth = decodedPayload;
        console.log(req)
        next()
    } catch (error) {
        sendErrorResponse(error, res)
    }
}