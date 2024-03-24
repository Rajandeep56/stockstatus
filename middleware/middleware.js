const jwt = require("jsonwebtoken");
SECRET_KEY = process.env.SECRET_KEY;
const userData = require("../data/users.json");

function authorize(requiredPermissions){return (req, res, next) =>{
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    const token = authorization.slice("Bearer ".length);
    try {
        const payload = jwt.verify(token, SECRET_KEY);
        const user = userData.find(item => item.username === payload.username);
        if (!user || !user.permissions || user.status !== "enable") {
            return res.sendStatus(403); 
        }
        const hasPermission = requiredPermissions.some(permission =>
            user.permissions.includes(permission)
        );
        if (!hasPermission) {
            return res.sendStatus(403); 
        }
        if (req.method === "PATCH" && !user.permissions.includes("edit_stock") && !user.permissions.includes("editupdate_users")) {
            return res.sendStatus(403);
        }
        req.user = payload;
        next();
    } catch (error) {
        res.sendStatus(401);
    }
}
}
module.exports = {authorize};