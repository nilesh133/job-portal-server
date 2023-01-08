const { model, Schema } = require("mongoose");

const recuiterSchema = new Schema({
    name: {
        type: "String",
        required: true
    },
    email: {
        type: "String",
        required: true
    },
    password: {
        type: "String",
        required: true
    },
    isRecruiter: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: "Boolean"
    },
    lastSeen: {
        type: "Date"
    }
},
    {
        timestamps: true
    });

const userSchema = new Schema({
    name: {
        type: "String",
        required: true
    },

    email: {
        type: "String",
        required: true
    },
    isActive: {
        type: "Boolean"
    },
    lastSeen: {
        type: "Date"
    },
    headline: {
        type: "String",
    },

    phone: {
        type: "Number",
    },

    dob: {
        type: "String"
    },
    
    githublink: {
        type: "String"
    },

    linkedinlink: {
        type: "String"
    },
    
    userPhotoUrl: {
        type: "String",
        default: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80"
    },

    education: [{
        id: {
            type: "Number"
        },
        college: {
            type: "String"
        },
        degree: {
            type: "String"
        },
        start: {
            type: "String"
        },
        end: {
            type: "String"
        },
        grades: {
            type: "String"
        },
        field: {
            type: "String"
        }
    }],
    experience: [{
        id: {
            type: "Number"
        },
        company: {
            type: "String"
        },
        location: {
            type: "String"
        },
        designation: {
            type: "String"
        },
        start: {
            type: "String"
        },
        end: {
            type: "String"
        },
    }],
    appliedCompany: [
        {
            companyid: {
                type: "String"
            },
            companyname: {
                type: "String"
            },
            jobprofile: {
                type: "String"
            },
            noofapplicants: {
                type: "Number"
            },
            appliedAt: {
                type: "Date"
            },
            viewStatus: {
                type: "Boolean",
                default: false
            }
        },
        {
            timestamps: true
        }
    ],

    password: {
        type: "String",
        required: true
    },
    isRecruiter: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    });

module.exports.Recruiter = model('recruiter', recuiterSchema);
module.exports.User = model('user', userSchema);