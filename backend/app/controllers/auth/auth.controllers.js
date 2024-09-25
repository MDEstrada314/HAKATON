import userModel from "../../models/users.js";
import generateJWT from "../../helpers/generateJWT.js";

export const authUser = async (req, res) => { 
    try {
        const {email, password} = req.body;
        const findUser = await userModel.findOne({ email }, {password: 1, _id: 1});
        const comparePassword = await userModel.comparePasswords(password,
            findUser.password
        );

        if (!comparePassword)  
            return res.status(404).json({ result: "La contraseña es incorrecta" });

        const jwt = await generateJWT(findUser._id);
        res.status(200).json({
            jwt
        });


    } catch (error) {
        console.log(error);
        return res.status(404).json({
            result: "El contenido no se encontro"
        });
    }


}