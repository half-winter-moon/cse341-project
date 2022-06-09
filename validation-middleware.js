const validator = require('./validate.js');
const saveGuest = (req, res, next) => {
    const validationRule = {
        "firstName":"required|string",
        "lastName":"required|string",
        "invitationSent":"required|boolean",
        "invitedToCeremony":"required|boolean",
        "foodAllergies": {
            "dairy":"boolean",
            "gluten":"boolean",
            "other":"string"
                },
        "address":"required|string",
        "role":"required|string"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status){
            res.status(412)
                .send({
                    success:false,
                    message:'Incorrect entry',
                    data:err
                });
        }
        else{
            next();
        }
    })
}

const saveUser = (req, res, next) => {
    const validationRule = {
        "tenant":"string", 
        "connection":"string", 
        "email":"required|string", 
        "password":"required|string",
        "debug":"boolean",
        "email_verified":"boolean"
    }
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status){
            res.status(412)
                .send({
                    success:false,
                    message:'Incorrect entry',
                    data:err
                });
        }
        else{
            next();
        }
    })
}

module.exports = {
    saveGuest,
    saveUser
}