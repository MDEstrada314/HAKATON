import mongoose from 'mongoose';
import bcryptjs from "bcryptjs";

const usersModel = mongoose.Schema({
    
    firstName : {
        type: String,
        trim: true,
        required: true
    },

    middleName: {
        type: String,
        trim: true,
        default: ""
    },

    lastName: {
        type: String,
        trim: true,
        required: true
    },

    secondLastName: {
        type: String,
        trim: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },

    password: {
        type: String,
        trim: true,
        required: true
    },

    rol: {
        type: String,
        enum: ["ADMIN", "USER"],
        default: "USER",
        required: true,
    },

    sex: {
        type: String,
        enum: ["M", "F"],
        required: true,
    },

    profileImage: {
        type: String,
    }


}
);

usersModel.statics.encryptPassword = (password = "") => {
    const salt =  bcryptjs.genSaltSync();
    const encryptedPassword =   bcryptjs.hashSync(password, salt);
    return encryptedPassword;

};

usersModel.statics.comparePasswords = (password, passwordRecieved) => {

    const comparedPasswords = bcryptjs.compareSync(password, passwordRecieved);
    return comparedPasswords;

};


const users = mongoose.model("users", usersModel);

export default users;