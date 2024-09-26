import { check } from "express-validator";

export const checkMongoId = async(mongoIds= "") => {
    mongoIds.forEach(id => {
        if (!check(id).isMongoId()) {
            throw new Error;
        } else {
            return true;
        }
    });
}