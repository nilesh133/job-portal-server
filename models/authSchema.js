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
    companyLogo: {
        type: "String",
        default: "https://iabc.bc.ca/wp-content/uploads/2018/05/unknown_profile.png"
    },
    aboutCompany: {
        type: "String"
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
        default: "https://iabc.bc.ca/wp-content/uploads/2018/05/unknown_profile.png"
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