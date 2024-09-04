const jwt = require("jsonwebtoken");
const { getDocumentWithId, getDocumentReference } = require("../controllers/documentController");

function isAuthenticated(req, res, next) {
    try{
        const header = req.headers['owitasks-access-token']?.split(' ')
        const token = header[1]
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if (err) {
                    throw Error(err)
                }
                req.requesterId = decoded
                req.userRef = getDocumentReference("users", decoded)
                req.user = await getDocumentWithId("users", decoded)
                if (req.requesterId !== undefined) {
                    next()
                } else {
                    throw Error("Incorrect Token")
                }
            })
        } else {
           throw Error("Token not Found")
        }
    } catch (error) {
        res.status(403).json({message: error.message})
    }
}

module.exports = { isAuthenticated }