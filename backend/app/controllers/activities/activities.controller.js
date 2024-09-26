import Activities from "../../models/activities.js";

async function getActivities(req, res){
    try{
        const [activities, total] = await Promise.all([
            Activities.find(),
            Activities.countDocuments()
        ]);

        return res.status(200).json({
            activities,
            total
        });
    }catch(err){
        console.log(err);
        return res.status(404).json({ result: "Activities not found" });
    }
}

async function createActivities(req, res) {
    try{
        const { 
            name,
            description,
            project,
            users,
            timeSpent,
            finished,
            createdAt
        } = req.body;

        const newActivity = await new Project({ 
            name,
            description,
            project,
            users,
            timeSpent,
            finished,
            createdAt
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

export {
    getActivities,
    createActivities
}