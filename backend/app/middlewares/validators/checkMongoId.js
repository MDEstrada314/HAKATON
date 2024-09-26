import User from "../../models/users.js";
import { response, request } from "express";
import Project from "../../models/projects.js";

export const checkUsersMongoID = async(mongoIds= "") => {
        
        const count = await User.countDocuments({
            _id: { $in : mongoIds}
        });

        if (count === mongoIds.length) {
            return true;
        } else {
            throw new Error;
        }
};

export const checkUserProjectMongoID = async(req = request, res = response, next)=> {
        const {project, users} = req.body;
        const findProject = await Project.findOne({_id: project, users: { $in: users}});
        console.log(findProject);
        if (findProject) {
            next();
        } else {
            res.status(400).json({
                result: "El usuario no se encuentra registrado en este proyecto"
            });
        }
};