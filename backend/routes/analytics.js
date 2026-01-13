import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import { auth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get daily productivity stats
router.get('/dashboard', auth, async (req, res) => {
    try {
        const userId = new mongoose.Types.ObjectId(req.user.userId);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // 1. Calculate today's total productivity score
        const todayLogs = await ActivityLog.find({
            user: userId,
            date: { $gte: today }
        });

        const todayScore = todayLogs.reduce((acc, log) => acc + (log.productivityScore || 0), 0);

        // 2. Category distribution (All time or last 30 days? Let's do all time for now)
        const categoryStats = await ActivityLog.aggregate([
            { $match: { user: userId } },
            { $group: { _id: '$category', totalDuration: { $sum: '$durationMinutes' }, count: { $sum: 1 } } }
        ]);

        // 3. Last 7 days productivity (Line Chart)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);

        const weeklyStats = await ActivityLog.aggregate([
            {
                $match: {
                    user: userId,
                    date: { $gte: sevenDaysAgo }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                    dailyScore: { $sum: "$productivityScore" },
                    totalFocus: { $avg: "$focusLevel" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            todayScore,
            categoryStats,
            weeklyStats
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
