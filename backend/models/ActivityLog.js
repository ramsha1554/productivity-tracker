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
        // This can be a calculated field: e.g., duration * focusLevel / 60
        // But helpful to store for quick aggregation
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Pre-save hook to calculate score
activityLogSchema.pre('save', function (next) {
    if (this.durationMinutes && this.focusLevel) {
        // Example score calculation: (duration in hours) * focusLevel * 10
        // 60 mins task with focus 5 = 1 * 5 * 10 = 50 points
        this.productivityScore = (this.durationMinutes / 60) * this.focusLevel * 10;
    }
    next();
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
