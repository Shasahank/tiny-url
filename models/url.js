const mongoose = require('mongoose')

const urlSchema = new mongoose.Schema(
    {
        shortId:{
            type: String,
            unique: true,
            required: true
        },
        redirectURL:{
            type: String,
            required: true
        },
        visitHistory:[{timeStamp:{type:Number}}],
        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    {
        timestamps: true
    }
)

const URL = mongoose.model('URL', urlSchema)

module.exports = URL