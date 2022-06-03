
const generateErrorMessage = (errorMessage) => {
    return {
        error: errorMessage
    };
};

const noAssociatedUserCredential = (credentialType) => {
    return generateErrorMessage(`No existing user found with that ${credentialType} credential`); 
}   

const foundAssociatedUserCredential = () => {
    return generateErrorMessage('Username or email credential already taken');
}

const credentialMismatchProvided = () => {
    return generateErrorMessage('Provided user credentials present a mismatch')
}

const missingOrIncorrectCredentialsProvided = () => {
    return generateErrorMessage('Missing or incorrect credentials were provided');
};

module.exports = {
    noAssociatedUserCredential,
    foundAssociatedUserCredential,
    credentialMismatchProvided,
    missingOrIncorrectCredentialsProvided
};