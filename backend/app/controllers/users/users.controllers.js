import users from "../../models/users";

export const createUser = async (req, res) => {
try {
    
    const {firstName, middleName, lastName, secondLastName, email, password, rol, sex} = req.body;

    const emailExist = await users.findOne({email});

} catch (error) {
    return res.status(404).json({
            result: "El contenido no se encontro"
        });
}

};