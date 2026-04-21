import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        enum: ['Work', 'Study', 'Health', 'Personal', 'Other'],
        required: true
    },
    durationMinutes: {
        type: Number,
        required: true,
        min: 1
    },
    focusLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    notes: {
        type: String,
        trim: true
    },
    productivityScore: {
        type: Number,
     
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to calculate score
activityLogSchema.pre('save', function (next) {
    if (this.durationMinutes && this.focusLevel) {
    
        this.productivityScore = (this.durationMinutes / 60) * this.focusLevel * 10;
    }
    next()
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
