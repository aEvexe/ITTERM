const config = require('config')
const jwt = require('jsonwebtoken')

class JwtService{
    constructor(accessKey, refreshKey, accessTime, refreshTime){
        this.accessKey = accessKey
        this.refreshKey = refreshKey
        this.accessTime = accessTime
        this.refreshTime = refreshTime
    }

    generateTokens(payload){
        const accesToken = jwt.sign(payload, this.accessKey, {
            expiresIn: this.accessTime
        })
         const refreshToken = jwt.sign(payload, this.refreshKey, {
            expiresIn: "1d"
        })

        return {
            accesToken,
            refreshToken,
        };
    }

    async verifyAccessToken(token){
        return jwt.verify(token, this.accessKey)
    }

    async verifyRefreshToken(token){
        return jwt.verify(token, this.refreshKey)
    }
}

const authorJwtService = new JwtService(
    config.get("access_key"),
    config.get("refresh_key"),
    config.get("access_time"),
    config.get("refresh_key")
)

const adminJwtService = new JwtService(
    config.get("adminAccess_key"),
    config.get("adminRefresh_key"),
    config.get("adminAccess_time"),
    config.get("adminRefresh_time")
)

const userJwtService = new JwtService(
    config.get("userAccessKey"),
    config.get("userRefreshKey"),
    config.get("userAccessTime"),
    config.get("userRefteshTime")
)



module.exports = {
    authorJwtService,
    adminJwtService,
    userJwtService
}