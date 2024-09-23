import mongoose from 'mongoose';
import bcryptjs from "bcryptjs";
const usersModel = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    middleName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    secondLastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
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