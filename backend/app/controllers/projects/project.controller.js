import Project from "../../models/project.js";

async function getProjects(req, res){
    try{
        const [projects, total] = await Promise.all([
            Project.find(),
            Project.countDocuments()
        ]);

        return res.status(200).json({
            projects,
            total
        });
    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "Projectos no encontrados" });
    }
}

async function createProject(req, res) {
    try{
        const { name_project } = req.body;

        const newProject = await new Project({
            name_project
        });

        newProject.save();

        return res.status(200).json({
            result: "project created successfully",
            project: newProject
        });

    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "project not created" });
    }
}

export {
    getProjects,
    createProject
}