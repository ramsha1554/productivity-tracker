import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, PieChart, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return <Outlet />;

    return (
        <div className="min-h-screen bg-light-cream flex flex-col font-sans bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-beige/50 via-light-cream to-white">
            <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-soft-teal/20 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold tracking-tight hover:text-soft-teal transition group">
                        <span className="text-teal-blue group-hover:text-soft-teal transition-colors">Productivity</span>
                        <span className="text-soft-red">Tracker</span>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-teal-blue transition relative group">
                            <PieChart size={20} />
                            <span className="font-medium">Dashboard</span>
                            {location.pathname === '/' && (
                                <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-blue rounded-full" />
                            )}
                        </Link>
                        <Link to="/log" className="flex items-center space-x-1 text-gray-600 hover:text-teal-blue transition relative">
                            <PlusCircle size={20} />
                            <span className="font-medium">Log Activity</span>
                            {location.pathname === '/log' && (
                                <motion.div layoutId="nav-underline" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-teal-blue rounded-full" />
                            )}
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-1 bg-soft-red/10 text-soft-red px-4 py-2 rounded-full hover:bg-soft-red hover:text-white transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
                        >
                            <LogOut size={16} />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="flex-grow max-w-6xl mx-auto w-full px-4 py-8 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            <footer className="text-center py-6 text-teal-800/40 text-sm font-medium">
                © {new Date().getFullYear()} Productivity Tracker. Crafted for focus.
            </footer>
        </div>
    );
};

export default Layout;
