const JWT = require('jsonwebtoken');

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1]
        JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(401).send({
                    message: 'Authentication failed',
                    success: false,
                    err
                })
            }
            else {
                req.body.userId = decode.userId;
                next();
            }
        })
    } catch (error) {
        console.log(`Authentication Failed`);
        return res.status(401).send({
            message: 'Authentication Failed',
            success: true,
            error
        })
    }
}