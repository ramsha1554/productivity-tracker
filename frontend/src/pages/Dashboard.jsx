import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Activity, Zap, Clock, Star, TrendingUp, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const { api, user } = useAuth();
    const [stats, setStats] = useState(null);
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, logsRes] = await Promise.all([
                    api.get('/analytics/dashboard'),
                    api.get('/logs')
                ]);
                setStats(statsRes.data);
                setLogs(logsRes.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [api]);

    // Colors for charts
    const COLORS = ['#3F9AAE', '#F96E5B', '#79C9C5', '#FDE68A', '#FB923C'];

    if (loading) return (
        <div className="flex justify-center items-center h-[60vh]">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-soft-teal/20 border-t-teal-blue rounded-full animate-spin"></div>
            </div>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.header
                variants={itemVariants}
                className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-blue to-soft-teal font-heading">
                        Hello, {user.username}!
                    </h1>
                    <p className="text-gray-500 mt-1 font-medium">Ready to crush your goals today?</p>
                </div>

                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="glass-panel p-5 rounded-2xl shadow-lg border border-white/50 min-w-[180px] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={48} className="text-soft-red" />
                    </div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Today's Score</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-extrabold text-soft-red">{Math.round(stats?.todayScore || 0)}</span>
                        <span className="text-sm text-gray-400 font-medium">points</span>
                    </div>
                </motion.div>
            </motion.header>

            {/* Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weekly Trend */}
                <motion.div
                    variants={itemVariants}
                    className="glass-panel p-6 rounded-2xl shadow-xl card-hover bg-white/60"
                >
                    <h3 className="text-xl font-bold text-teal-blue mb-6 flex items-center font-heading">
                        <div className="p-2 bg-teal-blue/10 rounded-lg mr-3">
                            <Activity className="text-teal-blue" size={20} />
                        </div>
                        Weekly Productivity
                    </h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={stats?.weeklyStats || []}>
                                <defs>
                                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3F9AAE" stopOpacity={0.2} />
                                        <stop offset="95%" stopColor="#3F9AAE" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                <XAxis
                                    dataKey="_id"
                                    tick={{ fontSize: 12, fill: '#6b7280' }}
                                    axisLine={false}
                                    tickLine={false}
                                    tickMargin={10}
                                />
                                <YAxis
                                    hide={true}
                                    domain={[0, 'auto']}
                                />
                                <Tooltip
                                    cursor={{ stroke: '#3F9AAE', strokeWidth: 1, strokeDasharray: '4 4' }}
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        padding: '12px',
                                        fontFamily: 'Outfit'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="dailyScore"
                                    stroke="#3F9AAE"
                                    strokeWidth={4}
                                    dot={{ r: 0 }}
                                    activeDot={{ r: 6, fill: '#3F9AAE', stroke: '#fff', strokeWidth: 2 }}
                                    fill="url(#colorScore)"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Category Distribution */}
                <motion.div
                    variants={itemVariants}
                    className="glass-panel p-6 rounded-2xl shadow-xl card-hover bg-white/60"
                >
                    <h3 className="text-xl font-bold text-teal-blue mb-6 flex items-center font-heading">
                        <div className="p-2 bg-soft-teal/10 rounded-lg mr-3">
                            <Zap className="text-soft-teal" size={20} />
                        </div>
                        Focus by Category
                    </h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.categoryStats || []} layout="vertical" barSize={20}>
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                                <XAxis type="number" hide={true} />
                                <YAxis
                                    dataKey="_id"
                                    type="category"
                                    width={100}
                                    tick={{ fontSize: 13, fill: '#4b5563', fontWeight: 500 }}
                                    axisLine={false}
                                    tickLine={false}
                                />
                                <Tooltip
                                    cursor={{ fill: '#f3f4f6', radius: 4 }}
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Bar dataKey="totalDuration" radius={[0, 10, 10, 0]}>
                                    {stats?.categoryStats?.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>
            </div>

            {/* Recent Activity List */}
            <motion.div
                variants={itemVariants}
                className="glass-panel p-6 rounded-2xl shadow-xl border border-white/60 bg-white/60"
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-teal-blue flex items-center font-heading">
                        <div className="p-2 bg-beige rounded-lg mr-3">
                            <Clock className="text-warm-orange" size={20} />
                        </div>
                        Recent Activities
                    </h3>
                    <button className="text-sm text-soft-teal font-semibold hover:text-teal-blue transition">View All</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="text-gray-400 text-xs uppercase tracking-wider font-semibold border-b border-gray-100/50">
                                <th className="pb-4 pl-4">Task</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4">Duration</th>
                                <th className="pb-4">Focus</th>
                                <th className="pb-4">Score</th>
                                <th className="pb-4 text-right pr-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {logs.slice(0, 5).map((log, i) => ( // Show top 5
                                <motion.tr
                                    key={log._id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-white/50 transition-colors group"
                                >
                                    <td className="py-4 pl-4 font-semibold text-gray-700 group-hover:text-teal-blue transition-colors">
                                        {log.taskName}
                                    </td>
                                    <td className="py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                            ${log.category === 'Work' ? 'bg-blue-100 text-blue-800' :
                                                log.category === 'Study' ? 'bg-purple-100 text-purple-800' :
                                                    log.category === 'Health' ? 'bg-green-100 text-green-800' :
                                                        'bg-orange-100 text-orange-800'
                                            }`}
                                        >
                                            {log.category}
                                        </span>
                                    </td>
                                    <td className="py-4 text-gray-500 font-medium">{log.durationMinutes} min</td>
                                    <td className="py-4">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(s => (
                                                <Star key={s} size={14}
                                                    fill={s <= log.focusLevel ? "#ffc107" : "none"}
                                                    stroke={s <= log.focusLevel ? "none" : "#cbd5e1"}
                                                    className={s <= log.focusLevel ? "filter drop-shadow-sm" : ""}
                                                />
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-4 font-bold text-teal-blue">{Math.round(log.productivityScore || 0)}</td>
                                    <td className="py-4 text-right pr-4 text-gray-400 text-sm flex items-center justify-end gap-1">
                                        <Calendar size={12} />
                                        {new Date(log.date).toLocaleDateString()}
                                    </td>
                                </motion.tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="py-12 text-center text-gray-400">
                                        <div className="flex flex-col items-center justify-center space-y-3">
                                            <div className="bg-gray-100 p-4 rounded-full">
                                                <Clock size={32} className="text-gray-300" />
                                            </div>
                                            <p>No activities logged yet. Start crushing it!</p>
                                        </div>

                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default Dashboard;
