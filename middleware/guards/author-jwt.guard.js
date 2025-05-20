const { sendErrorResponse } = require("../../helpers/send_error_response");
const { authorJwtService } = require("../../service/jwt.service");

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).send({ message: "authorized not found" });
        }

        const [bearer, token] = authorization.split(" ");

        if (bearer !== "Bearer" || !token) {
            return res.status(401).send({ message: "bearer not found" });
        }

        const decodedPayload = await authorJwtService.verifyAccessToken(token);

        req.author = decodedPayload;
        next();
    } catch (error) {
        sendErrorResponse(error, res);
    }
};
