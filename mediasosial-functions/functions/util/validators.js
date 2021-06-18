//Check email validation
const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    if(email.match(emailRegEx)) return true;
    else return false;
};

//Check to make sure everything is filled 
const isEmpty = (string) => {
    if(string.trim() === '') return true;
    else return false;
};


exports.validateSignupData = (data) => {
    let errors = {};

    if(isEmpty(data.email)){
        errors.email = 'Must not empty';
    } else if(!isEmail(data.email)){
        errors.email = 'Must be a valid email address';
    }

    if(isEmpty(data.password)) errors.password = 'Must not empty';
    if(data.password !== data.confirmPassword) errors.confirmPassword = 'Password must match';
    if(isEmpty(data.handle)) errors.handle = 'Must not empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

exports.validateLoginData = (data) => {
    let errors = {};

    if(isEmpty(data.email)) errors.email = 'Must not empty';
    if(isEmpty(data.password)) errors.password = 'Must not empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    };
};

//Purpose: If details are not filled, dont take it
exports.reduceUserDetails = (data) => {
    let userDetails = {};

    //"trim" removes white spaces
    if(!isEmpty(data.bio.trim())) {
        userDetails.bio = data.bio;
    };
    if(!isEmpty(data.website.trim())) {
        //we wanna check http, h = 1st, p = 4th
        if(data.website.trim().substring(0, 4) !== 'http'){
            userDetails.website = `http://${data.website.trim()}`;
        } else userDetails.website = data.website;     
    };
    if(!isEmpty(data.location.trim())) {
        userDetails.location = data.location;
    };

    return userDetails;
}