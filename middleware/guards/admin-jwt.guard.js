const { sendErrorResponse } = require("../../helpers/send_error_response");
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: "Authorization header missing" });
    }

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      return res.status(401).send({ message: "Invalid token format" });
    }

    // const decodedPayload = jwt.verify(token, config.get("adminTokenKey"));
    const decodedPayload = await jwtService.verifyAccessToken();

    req.admin = decodedPayload; 
    console.log("Authenticated admin:", req.admin);

    next();
  } catch (error) {
    sendErrorResponse(error, res);
  }
};
