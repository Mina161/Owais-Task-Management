var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { createUserWithEmailAndPassword, signInWithEmailAndPassword, deleteUser, sendEmailVerification, signOut, updateProfile } = require("firebase/auth");
const { auth } = require("../config/firebase");
const { verifyPatient } = require("../auth/jwt-auth");
const { createDocument, getDocumentWithId, createDocumentWithId } = require('../controllers/documentController');

// Authentication
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = await getDocumentWithId("users", userCredential.user.uid)
        console.log(user)
        if (user) {
            jwt.sign(
                user.id,
                process.env.JWT_SECRET,
                //{expiresIn: 86400},
                (err, token) => {
                    if (err) {
                        throw Error(err)
                    }
                    return res.status(200).json({ message: "Success", payload: user, token: `Bearer ${token}` })
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
        const { email, name, password } = req.body
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await createDocumentWithId("users", {
            name,
            email
        }, userCredential.user.uid);
        return res.status(201).json({ message: `Welcome ${name}` });
    } catch (err) {
        return res.status(400).json({ message: err.message })
    }
})

module.exports = router;