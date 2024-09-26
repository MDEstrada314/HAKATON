import User from "../../models/users.js";
export const checkMongoId = async(mongoIds= "") => {
        
        const count = await User.countDocuments({
            _id: { $in : mongoIds}
        });

        if (count === mongoIds.length) {
            return true;
        } else {
            throw new Error;
        }
}