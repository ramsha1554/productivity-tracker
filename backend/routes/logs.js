import express from 'express';
import ActivityLog from '../models/ActivityLog.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get all logs for user
router.get('/', auth, async (req, res) => {
    try {
        const logs = await ActivityLog.find({ user: req.user.userId }).sort({ date: -1 });
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create new log
router.post('/', auth, async (req, res) => {
    try {
        const { taskName, category, durationMinutes, focusLevel, notes, date } = req.body;

        const newLog = new ActivityLog({
            user: req.user.userId,
            taskName,
            category,
            durationMinutes,
            focusLevel,
            notes,
            date: date || Date.now()
        });

        const savedLog = await newLog.save();
        res.status(201).json(savedLog);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Invalid data' });
    }
});

// Delete log
router.delete('/:id', auth, async (req, res) => {
    try {
        const log = await ActivityLog.findOne({ _id: req.params.id, user: req.user.userId });
        if (!log) return res.status(404).json({ message: 'Log not found' });

        await ActivityLog.deleteOne({ _id: req.params.id });
        res.json({ message: 'Log removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
