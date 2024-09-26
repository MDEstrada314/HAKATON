import mongoose from 'mongoose';

const activitySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }],
    timeSpent: {
        type: Number, 
        required: true
    },
    finished: {
        type: Boolean,
        default: false,
        required: true
    },

    startedAt: {
        type: Date,
        required: true
    },

    finishedAt: {
        type: Date,
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const activity = mongoose.model('activities', activitySchema);
export default activity;