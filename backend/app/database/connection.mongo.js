import mongoose from "mongoose";

export const connectionMongoose = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
console.warn(`
||      || ||||||| ||       ||      ||||||||||
||      || ||      ||       ||      ||      ||
||      || ||      ||       ||      ||      ||
|||||||||| ||||||| ||       ||      ||      ||
||      || ||      ||       ||      ||      ||
||      || ||      ||       ||      ||      ||
||      || ||||||| |||||||  ||||||| ||||||||||   
`);

    } catch (error) {
        console.log(error);
    }
}