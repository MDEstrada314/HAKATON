import mongoose from 'mongoose';
import bcryptjs from "bcryptjs";

const usersModel = mongoose.Schema({
    
    name : {
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
        enum: ["Male", "Female"],
        required: true,
    }


}
);

usersModel.statics.encryptPassword = async(password) => {

    const salt = await bcryptjs.genSalt();
    const encryptedPassword =  await bcryptjs.hash(password, salt);
    return encryptedPassword;

};

usersModel.statics.comparePasswords = async(password, passwordRecieved) => {

    const comparedPasswords = await bcryptjs.compare(password, passwordRecieved);
    return comparedPasswords;

};


const users = mongoose.model("users", usersModel);

export default users;