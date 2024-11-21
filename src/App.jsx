import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import useDispatch
import authService from './appwrite/auth.js';
import { login, logout } from './store/authSlice.js';
import { Header } from './components/index.js';
import { Footer } from './components/index.js';
import { Outlet } from 'react-router-dom';

import './App.css';

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch(); // Initialize useDispatch

    useEffect(() => {
        authService
            .getCurrentUser()
            .then((userData) => {
                if (userData) {
                    dispatch(login({ userData })); // Use dispatch to login
                } else {
                    dispatch(logout()); // Use dispatch to logout
                }
            })
            .finally(() => setLoading(false));
    }, [dispatch]); // Add dispatch to the dependency array

    return !loading ? (
        <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
            <div className="w-full block">
                <Header />
                <main>
                    <Outlet />
                </main>
                <Footer />
            </div>
        </div>
    ) : null;
}

export default App;
