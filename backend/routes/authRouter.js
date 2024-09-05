var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } = require("firebase/auth");
const { auth } = require("../config/firebase");
const { getDocumentWithId, createDocumentWithId } = require('../controllers/documentController');
const { loginSchema, signupSchema } = require('../schemas/authSchemas');

// Authentication
router.post("/login", async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { email, password } = req.body
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = await getDocumentWithId("users", userCredential.user.uid)
        if (user) {
            jwt.sign(
                user.id,
                process.env.JWT_SECRET,
                //{expiresIn: 86400},
                (err, token) => {
                    if (err) {
                        throw Error(err)
                    }
                    return res.status(200).json({ message: `Welcome back ${user.name}`, payload: user, token: `Bearer ${token}` })
                }
            )
        } else {
            return res.status(400).json({ message: "Invalid email or password" })
        }
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

router.post("/signup", async (req, res) => {
    try {
        const { error, value } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { email, name, password } = req.body
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await createDocumentWithId("users", {
            name,
            email
        }, userCredential.user.uid);

        const user = await getDocumentWithId("users", userCredential.user.uid)
        if (user) {
            jwt.sign(
                user.id,
                process.env.JWT_SECRET,
                //{expiresIn: 86400},
                (err, token) => {
                    if (err) {
                        throw Error(err)
                    }
                    return res.status(200).json({ message: `Welcome ${name}`, payload: user, token: `Bearer ${token}` })
                }
            )
        } else {
            return res.status(400).json({ message: "Invalid email or password" })
        }
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router;