import Activities from "../../models/activities.js";

async function getActivities(req, res){
    try{
        const { id_user, rol } = req.body;
        const queries = rol === "ADMIN" ? {} : { users: id_user };

        if(id_user){
            const [activities, total] = await Promise.all([
                Activities.find(queries).populate({path: "users", select: { password:0,  __v:0 }}),
                Activities.countDocuments(queries)
            ]);
    
            return res.status(200).json({
                total,
                activities
            });
        }else{
            return res.status(404).json({result: "id_user is required"});
        }
    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "Activities not found" });
    }
}

async function createActivity(req, res) {
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
            result: "activity created successfully",
            activity: newActivity
        });

    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "activity not created" });
    }
}

async function updateActivity(req, res){
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

export {
    getActivities,
    createActivity,
    updateActivity
}