const jwt = require("jsonwebtoken");
SECRET_KEY = process.env.SECRET_KEY;

function authorize(req, res, next){
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    const token = authorization.slice("Bearer ".length);
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        req.user = payload;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}
module.exports = {authorize};