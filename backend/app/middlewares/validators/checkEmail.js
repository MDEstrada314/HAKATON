import users from "../../models/users.js";

export const checkEmail = async (email = "") => {

        const checkEmailDb = await users.findOne({email});
        if (checkEmailDb) throw new Error;
};