const {model, Schema} = require("mongoose");

const messagesSchema = new Schema({
    recruiter_id: {
        type: "String",
        required: true
    },
    messagesList: [
        {
            user_id: {
                type: "String",
            },
            messages: [
                {
                    from: {
                        type: "String",
                    },
                    message: {
                        type: "String"
                    },
                    time: {
                        type: "Date",
                        default: new Date().getTime()
                    }
                }
            ]
        }
    ],
})

module.exports.Messages = model('messages', messagesSchema);