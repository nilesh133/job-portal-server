require('dotenv').config();
const { User } = require("../models/authSchema");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    return jwt.sign({ user }, process.env.SECRET, {
        expiresIn: '7d',
    });
};

module.exports.updateUserProfile = async (req, res) => {
    try {
        const response = await User.findByIdAndUpdate(req.body.id,
            {
                name: req.body.name,
                email: req.body.email,
                headline: req.body.headline,
                phone: req.body.phone,
                dob: req.body.dob,
                githublink: req.body.githublink,
                linkedinlink: req.body.linkedinlink,
                userPhotoUrl: req.body.userPhotoUrl,
                education: req.body.education,
                experience: req.body.experience
            },
            { new: true }
        );
        // console.log(response);
        const token = generateToken(response);
        return res.status(200).json({ msg: "User profile updated", token });
    }
    catch (err) {
        return res.status(500).json({ errors: err });
    }
}