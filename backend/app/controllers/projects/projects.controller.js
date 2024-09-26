import Project from "../../models/projects.js";

export async function getProjects(req, res){
    try{
        const {user} = req.body;
        if (user.rol === "ADMIN") { 
            const [projects, total] = await Promise.all([
                Project.find({},{createdAt: 0, __v: 0}).populate('users', 'firstName lastName email'),
                Project.countDocuments()
            ]);
            return res.status(200).json({
                projects,
                total
            });
        } else {
            const [projects, total] = await Promise.all([
                Project.find({users: { $in: user._id}}, {createdAt: 0, __v: 0}).populate('users', 'firstName lastName email'),
                Project.countDocuments()
            ]);
            return res.status(200).json({
                projects,
                total
            });
        }


        
    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "Projectos no encontrados" });
    }
}

export async function createProject(req, res) {

    try{
        
        const { name, description, users = [] } = req.body;

        const newProject = await new Project({
            name, description, users
        });

        newProject.save();

        return res.status(200).json({
            result: "Proyecto creado satisfactoriamente",
            project: newProject
        });

    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "el contenido no se econtro " });
    }
}
