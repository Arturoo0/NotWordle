const express = require('express');
const joi = require('joi');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { User } = require('../models/User.js');
const { Session } = require('../models/Session.js');
const errorMessages = require('../utils/errorMessages.js');
const authRouter = express.Router();

const saltRounds = 10;

const userSchema = joi.object({
    email: joi.string()
        .email()
        .required(), 
    username: joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    password: joi.string()
        .required()
})

const validateUserCredentials = (credentials) => {
    const userValidation = userSchema.validate(credentials);
    const {
        value: credentialsObject, 
        error: _error
    } = userValidation;
    return {
        userCredentials: credentialsObject,
        error: _error 
    };
}

const includeAndSaveSessionCookie = async (res, email) => {
    if (Session.exists({ email })) await Session.deleteOne({'email' : email});
    newSessionIdentifier = await crypto.randomBytes(16).toString('base64');
    const newSession = new Session({
        sessionIdentifier: newSessionIdentifier, 
        associatedSessionEmail: email
    });
    await newSession.save();
    res.header('Access-Control-Allow-Credentials', true);
    res.cookie('sessionID', newSessionIdentifier);
    return newSessionIdentifier;
};  

const authSuccess = (msg, _sessionId) => {
    return {
        message: msg, 
        sessionId: _sessionId 
    };
};

authRouter.post('/login', async (req, res) => {
    if (validateUserCredentials(req.body).error){
        return res.send(errorMessages.missingOrIncorrectCredentialsProvided());
    };
    const {
        email,
        username,
        password
    } = req.body; 

    const user = await User.findOne({ email });
    if (!user){
        return res.send(errorMessages.noAssociatedUserCredential('email'));
    }

    const doesUsernameMatch = user.username === username;
    const doesPasswordMatch = await bcrypt.compare(password, user.password);
    if (!doesUsernameMatch || !doesPasswordMatch){
        return res.send(errorMessages.credentialMismatchProvided());
    }
    const sessionId = await includeAndSaveSessionCookie(res, email);
    return res.send(authSuccess('Successfully signed in.', sessionId));
});

authRouter.post('/sign-up', async (req, res) => {
    if (validateUserCredentials(req.body).error){
        return res.send(errorMessages.missingOrIncorrectCredentialsProvided());
    };
    const {
        email,
        username,
        password
    } = req.body; 

    isExistingEmailCredential = await User.exists({ email });
    if (isExistingEmailCredential){   
        return res.send(errorMessages.foundAssociatedUserCredential());
    }

    isExistingUsernameCredential = await User.exists({ username });
    if (isExistingUsernameCredential){
        return res.send(errorMessages.foundAssociatedUserCredential());
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
        email, 
        username,
        password: hashedPassword
    });

    await newUser.save();
    const sessionId = await includeAndSaveSessionCookie(res, email);
    return res.send(authSuccess('Successfully signed up.', sessionId));
});

authRouter.get('/is-valid-session', async (req, res) => {
    let associatedUsername;
    const currentSession = await Session.findOne({
        sessionIdentifier: req.cookies.sessionID
    });
    if (currentSession){
        associatedUsername = await User.findOne({
            email: currentSession.associatedSessionEmail
        });
    }   

    console.log({
        isValidSession: currentSession ? true : false,
        username: (currentSession && associatedUsername) ? associatedUsername.username : null
    });
    return res.send({
        isValidSession: currentSession ? true : false,
        username: (currentSession && associatedUsername) ? associatedUsername.username : null
    });
});

module.exports = authRouter;