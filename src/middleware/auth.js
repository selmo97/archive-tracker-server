//JWT verify middleware + sets req.userId
const jwt = require("jsonwebtoken");

//reads authorization header and checks the token
function requireUser(req, res, next) {
    try{
        const auth =
        req.headers.authorization;
        if (!auth) {
            return
            res.status(401).json({ error: 
                "Authorization header required"
            });
        }
       

    } catch {

    }
}
