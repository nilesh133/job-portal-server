const {model, Schema} = require("mongoose");

const jobSchema = new Schema({
    recruiter_id: {
        type: "String",
        required: true
    },

    companyname: {
        type: "String",
        required: true
    },

    jobprofile: {
        type: "String",
        required: true
    },

    jobtype: {
        type: "String",
        required: true
    },

    minsalary: {
        type: "Number",
        required: true
    },

    maxsalary: {
        type: "Number",
        required: true
    },

    aboutcompany: {
        type: "String",
        required: true
    },

    minexperience: {
        type: "Number",
        required: true
    },

    maxexperience: {
        type: "Number",
        required: true
    },
    location: {
        type: "String",
        required: true
    },
    deadline: {
        type: "String",
        required: true
    },
    responsibilities: [
        {
            id: {
                type: "Number",
                required: true
            },
            responsibility: {
                type: "String",
                required: true
            }
        }
    ],
    appliedUsers: [
        {
            user_id: "String",
            name: "String",
            appliedAt: "Date"
        },
    ]
},

    {
        timestamps: true
    }
)

module.exports.Job = model('job', jobSchema);