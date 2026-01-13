import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Configure axios base URL
    const api = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    // Attach token to requests
    api.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    useEffect(() => {
        const checkUser = async () => {
            const token = localStorage.getItem('token');
            const savedUser = localStorage.getItem('user'); // Simple persistence
            if (token && savedUser) {
                setUser(JSON.parse(savedUser));
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    const login = async (username, password) => {
        try {
            const res = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify({ username }));
            setUser({ username });
            return true;
        } catch (error) {
            console.error(error);
            throw error.response?.data?.message || 'Login failed';
        }
    };

    const register = async (username, password) => {
        try {
            const res = await api.post('/auth/register', { username, password });
            localStorage.setItem('token', res.data.token);
            const newUser = { username }; // Assuming user is created
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
            return true;
        } catch (error) {
            console.error(error);
            throw error.response?.data?.message || 'Registration failed';
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, api }}>
            {children}
        </AuthContext.Provider>
    );
};
