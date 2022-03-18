const { Session } = require('../models/Session.js');

const authentication = async (req, res, next) => {
    const query = { sessionIdentifier: req.cookies.sessionID };
    const session = await Session.findOne(query);
    if (!session){  
        return res.status(401).send('Unathorized to access requested content.');
    } 
    req.emailIdentifier = session.associatedSessionEmail;
    next();
};

module.exports = authentication;