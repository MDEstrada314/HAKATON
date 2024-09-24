import {validationResult} from 'express-validator';


const validateDocuments = (req, res, next) => {
    let errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()){
        return res.status(400).json(errors);
    }
    next();
}

export default validateDocuments;