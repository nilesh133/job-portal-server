const { body, validationResult } = require("express-validator");
require('dotenv').config();
const { Recruiter, User } = require("../models/authSchema");
const { Messages } = require("../models/messagesSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '7d',
    });
};

module.exports.registerValidation = [
    body("name").not().isEmpty().trim().withMessage("Please fill the name"),
    body("email").not().isEmpty().trim().withMessage("Please fill the Email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
]

module.exports.registerRecruiter = async (req, res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.array());
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const checkRecruiter = await Recruiter.findOne({ email });
        if (checkRecruiter) {
            return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const recruiter = await Recruiter.create({
                name,
                email,
                isActive: true,
                lastSeen: new Date(),
                password: hash
            });

            const recruiterForMessages = await Messages.create({
                recruiter_id: recruiter._id,
                messagesList: []
            });

            const token = generateToken(recruiter);
            // console.log(token)
            return res.status(200).json({ msg: 'Your account has been created', token });
        }
        catch (err) {
            // console.log(err)
            return res.status(500).json({ errors: err });
        }
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }

}

module.exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.array());
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const checkRecruiter = await User.findOne({ email });
        if (checkRecruiter) {
            return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        try {
            const user = await User.create({
                name,
                email,
                isActive: true,
                lastSeen: new Date(),
                password: hash
            });

            const token = generateToken(user);
            // console.log(token)
            return res.status(200).json({ msg: 'Your account has been created', token });
        }
        catch (err) {
            // console.log(err)
            return res.status(500).json({ errors: err });
        }
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }
}

module.exports.loginValidation = [
    body("email").not().isEmpty().trim().withMessage("Please fill the Email").isEmail().withMessage("Email is not valid"),
    body("password").isLength({ min: 8 }).withMessage("Password must be 8 characters long"),
]

module.exports.recruiterLogin = async (req, res) => {
    // console.log(req.body)
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.array());
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const recruiterValid = await Recruiter.findOne({ email });
        if (recruiterValid) {
            const verifyPassword = await bcrypt.compare(password, recruiterValid.password);
            if (verifyPassword) {
                const reponse = await Recruiter.findOneAndUpdate({ email }, {
                    isActive: true,
                    lastSeen: new Date(),
                }, { new: true });
                const token = generateToken(reponse);
                return res.status(200).json({ msg: 'Login Successful', token })
            }
            else {
                return res.status(401).json({ errors: [{ msg: "Password is not correct" }] });
            }
        }
        else {
            return res.status(400).json({ errors: [{ msg: 'Email not found' }] })
        }
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }
}

module.exports.userLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userValid = await User.findOne({ email });
        if (userValid) {
            const verifyPassword = await bcrypt.compare(password, userValid.password);
            if (verifyPassword) {
                const reponse = await User.findOneAndUpdate({ email }, {
                    isActive: true,
                    lastSeen: new Date(),
                }, { new: true });
                const token = generateToken(reponse);
                return res.status(200).json({ msg: 'Login Successful', token })
            }
            else {
                return res.status(401).json({ errors: [{ msg: "Password is not correct" }] });
            }
        }
        else {
            return res.status(400).json({ errors: [{ msg: 'Email not found' }] })
        }
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }
}

module.exports.logout = async (req, res) => {
    // console.log(req.body)
    try {
        if (req.body.isRecruiter) {
            await Recruiter.findByIdAndUpdate(req.body.user._id, {
                isActive: false,
                lastSeen: req.body.time,
            }, { new: true })
            return res.status(200).json({ msg: "Logged out successfully" })
        }
        else {
            await User.findByIdAndUpdate(req.body.user._id, {
                isActive: false,
                lastSeen: req.body.time,
            }, { new: true })
            return res.status(200).json({ msg: "Logged out successfully" })
        }
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }
}