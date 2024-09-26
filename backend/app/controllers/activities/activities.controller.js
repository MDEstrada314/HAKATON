import Activities from "../../models/activities.js";
import Project from "../../models/projects.js";
export async function getActivities(req, res){
    try{
        const { user } = req.body;
            const [activities, total] = await Promise.all([
                Activities.find({users: user._id}).populate({path: "users", select: { password:0,  __v:0 , profileImage: 0}}),
                Activities.countDocuments({users: user._id})
            ]);
            
            return res.status(200).json({
                total,
                activities
            });

    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "Las actividades no se encontraron, Intentalo de Nuevo" });
    }
}

export async function createActivity(req, res) {
    try{
        const { 
            name,
            description,
            project,
            users,
            timeSpent,
            startedAt,
            finishedAt,
            finished
        } = req.body;

        const newActivity = await new Activities({ 
            name,
            description,
            project,
            users,
            startedAt,
            finishedAt,
            timeSpent,
            finished
        });

        newActivity.save();

        return res.status(200).json({
            result: "La actividad fue creada exitosamente.",
            activity: newActivity
        });

    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "No fue posible crear la actividad. Intentelo Nuevamente" });
    }
}

export async function updateActivity(req, res) {
    try{
        const { id } = req.params;
        const { finished } = req.body;

        const newActivity = await Activities.findByIdAndUpdate(id, { finished }, {new: true}).populate({path: "users", select: { password:0, __v:0 }});

        return res.status(200).json({
            result: "activity updated successfully",
            activity: newActivity
        });

    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "activity not created" });
    }
}

export async function getProjectActivities(req, res) { 
    try{
        const { user } = req.body;
                const activities = await Project.aggregate([
                    {
                        $match: {}
                    },
                    {
                        $lookup: {
                            from: 'activities',
                            localField: '_id',  
                            foreignField: 'project', 
                            as: 'activities' 
                        }
                    },
                    {
                        
                        $project: {
                            name: 1,           
                            description: 1,     
                            createdAt: 1,       
                            activities: {
                                name: 1,         
                                description: 1,  
                                timeSpent: 1,    
                                users: 1        
                            }
                        }
                    }
                ])
            
            return res.status(200).json({
                result: activities
            });

    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "Las actividades no se encontraron, Intentalo de Nuevo" });
    }

}
