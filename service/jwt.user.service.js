const config = require('config')
const jwt = require('jsonwebtoken')

class JwtUserService{
    constructor(accessKey, refreshKey, accessTime, refreshTime){
        this.accessKey = accessKey,
        this.refreshKey = refreshKey,
        this.accessTime = accessTime,
        this.refreshTime = refreshTime
    }

    generateTokens(payload){
        const accessToken = jwt.sign(payload, this.accessKey, {
            expiresIn: this.accessTime
        })
        const refreshToken = jwt.sign(payload, this.refreshKey, {
            expiresIn: this.refreshTime
        })

        return{
            accessToken,
            refreshToken
        }
    }

    async verifyAccessToken(token){
        return jwt.verify(token, this.accessKey)
    }

    async verifyRefreshToken(token){
        return jwt.verify(token, this.refreshKey)
    }

}

module.exports = new JwtUserService(
    config.get("userAccessKey"),
    config.get("userRefreshKey"),
    config.get("userAccessTime"),
    config.get("userRefteshTime")
)