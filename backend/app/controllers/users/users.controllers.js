import User from "../../models/users.js";

export const createUser = async (req, res) => {
try {
    
    const {firstName, middleName, lastName, secondLastName, email, password, rol, sex, profileImage} = req.body;
    
    const newUser = await new User({
        firstName,
        middleName,
        lastName,
        secondLastName,
        email,
        password: User.encryptPassword(password),
        rol,
        sex,
        profileImage
    });

    newUser.save();

    return res.status(200).json({
        result: "usuario creado existosamente",
        user: newUser
    });

} catch (error) {
    console.log(error);
    return res.status(404).json({
            result: "el contenido no se encontro"
        });
}

};
