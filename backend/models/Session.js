const mongoose = require('mongoose');

const { Schema } = mongoose;

const SessionSchema = new Schema(
    {
        sessionIdentifier: {
            type: String,
            required: true
        },
        associatedSessionEmail: {
            type: String,
            required: true
        }
    },
    { collection : 'sessions' }  
);

module.exports = {
    Session: mongoose.model('Session', SessionSchema)
};