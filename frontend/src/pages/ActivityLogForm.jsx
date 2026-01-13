import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClipboardList, Star, Save, ArrowLeft, Calendar, Watch } from 'lucide-react';

const ActivityLogForm = () => {
    const { api } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        taskName: '',
        category: 'Work',
        durationMinutes: '',
        focusLevel: 3,
        notes: '',
        date: new Date().toISOString().split('T')[0]
    });

    const categories = ['Work', 'Study', 'Health', 'Personal', 'Other'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/logs', formData);
            navigate('/');
        } catch (error) {
            console.error(error);
            alert('Failed to log activity');
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
        >
            <button
                onClick={() => navigate('/')}
                className="mb-6 flex items-center text-gray-500 hover:text-teal-blue transition group text-sm font-semibold"
            >
                <ArrowLeft size={18} className="mr-1 group-hover:-translate-x-1 transition-transform" />
                Back to Dashboard
            </button>

            <div className="glass-panel p-8 rounded-2xl shadow-xl border border-white/60 bg-white/80 backdrop-blur-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                    <ClipboardList size={120} />
                </div>

                <h2 className="text-3xl font-bold text-teal-blue mb-1 font-heading">Log Activity</h2>
                <p className="text-gray-500 mb-8">What did you accomplish today?</p>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="date"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-soft-teal/20 focus:border-soft-teal outline-none transition-all bg-white/50"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Category</label>
                            <div className="flex bg-white/50 p-1 rounded-xl border border-gray-200">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, category: cat })}
                                        className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${formData.category === cat
                                                ? 'bg-teal-blue text-white shadow-md'
                                                : 'text-gray-500 hover:bg-gray-100'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 block">Task Name</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Completed Project X Report"
                            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-soft-teal/20 focus:border-soft-teal outline-none transition-all bg-white/50 placeholder:text-gray-400"
                            value={formData.taskName}
                            onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Duration (minutes)</label>
                            <div className="relative">
                                <Watch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="number"
                                    required
                                    min="1"
                                    placeholder="45"
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-soft-teal/20 focus:border-soft-teal outline-none transition-all bg-white/50"
                                    value={formData.durationMinutes}
                                    onChange={(e) => setFormData({ ...formData, durationMinutes: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-700 block">Focus Level (1-5)</label>
                            <div className="flex items-center space-x-2 bg-white/50 border border-gray-200 rounded-xl p-3 h-[50px]">
                                {[1, 2, 3, 4, 5].map((level) => (
                                    <button
                                        key={level}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, focusLevel: level })}
                                        className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                                    >
                                        <Star
                                            size={28}
                                            fill={level <= formData.focusLevel ? "#ffc107" : "none"}
                                            stroke={level <= formData.focusLevel ? "none" : "#cbd5e1"}
                                            className={level <= formData.focusLevel ? "filter drop-shadow-sm" : ""}
                                        />
                                    </button>
                                ))}
                                <span className="ml-auto text-sm font-bold text-gray-500">{formData.focusLevel}/5</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 block">Notes (Optional)</label>
                        <textarea
                            className="w-full px-5 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-soft-teal/20 focus:border-soft-teal outline-none transition-all bg-white/50 min-h-[100px]"
                            placeholder="Any reflectons on this session?"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                    </div>

                    <div className="pt-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-blue text-white font-bold py-4 rounded-xl hover:bg-soft-teal transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-lg disabled:opacity-70"
                        >
                            {loading ? 'Saving...' : (
                                <>
                                    <Save size={20} /> Save Activity
                                </>
                            )}
                        </motion.button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default ActivityLogForm;
