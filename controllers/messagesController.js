require('dotenv').config();
const { Messages } = require("../models/messagesSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

module.exports.sendMessage = async (req, res) => {
    try {
        const recruiter = await Messages.findOne({ recruiter_id: req.body.from });

        if (recruiter === null) {
            // console.log("Entry 1")
            const response = await Messages.create({
                recruiter_id: req.body.from,
                messagesList: [
                    {
                        user_id: req.body.to,
                        messages: [
                            {
                                from: req.body.from,
                                message: req.body.messageContent
                            }
                        ]
                    }
                ]
            })
            return res.status(200).json({ response: response });
        }
        else {
            let newMessagesList = []
            let isUserPresent = false
            if (recruiter?.messagesList?.length > 0) {
                recruiter.messagesList.map((user) => {
                    if (user.user_id === req.body.to) {
                        isUserPresent = true
                        user.messages.push({
                            from: req.body.from === req.body.sender ? req.body.from : req.body.sender,
                            message: req.body.messageContent
                        });
                    }
                })
                if (isUserPresent === false) {
                        recruiter.messagesList.push({
                            user_id: req.body.to,
                            messages: [
                                {
                                    from: req.body.from === req.body.sender ? req.body.from : req.body.sender,
                                    message: req.body.messageContent
                                }
                            ]
                        })
                    }
            }
            else {
                recruiter.messagesList.push({
                    user_id: req.body.to,
                    messages: [
                        {
                            from: req.body.from === req.body.sender ? req.body.from : req.body.sender,
                            message: req.body.messageContent
                        }
                    ]
                })
            }

            newMessagesList = recruiter.messagesList
            // console.log(newMessagesList)

            const response = await Messages.findOneAndUpdate({ recruiter_id: req.body.from }, {
                messagesList: newMessagesList
            }, { new: true })

            return res.status(200).json({ response: response });
        }
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }
}

module.exports.fetchRecruiterMessages = async (req, res) => {
    try {
        // console.log("->", req.body.recruiter_id)
        const response = await Messages.findOne({ recruiter_id: req.params.recruiter_id })
        return res.status(200).json({ response });
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }
}

module.exports.fetchAllRecruiterMessages = async (req, res) => {
    try {
        const response = await Messages.find({})
        return res.status(200).json({ response });
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ errors: err });
    }
}