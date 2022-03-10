const mongoose = require('mongoose')
const { v4: uuidv4 } = require('uuid');

const { Schema } = mongoose;

const UserSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }, 
        id: {
            type: String,
            default: uuidv4()
        }
    },
    { collection: 'users' }
);

module.exports = {
    User: mongoose.model('User', UserSchema)
};