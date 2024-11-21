import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import store from './store/Store.js';
import Home from './pages/Home.jsx';
import { AuthLayout, Login } from './components/index.js';

import AddPost from './pages/AddPost.jsx';
import Signup from './pages/Signup.jsx';
import EditPost from './pages/EditPost.jsx';

import Post from './pages/Post.jsx';

import AllPosts from './pages/AllPosts.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/login',
                element: (
                    <AuthLayout authentication={false}>
                        <Login />
                    </AuthLayout>
                ),
            },
            {
                path: '/signup',
                element: (
                    <AuthLayout authentication={false}>
                        <Signup />
                    </AuthLayout>
                ),
            },
            {
                path: '/all-posts',
                element: (
                    <AuthLayout authentication>
                        <AllPosts />
                    </AuthLayout>
                ),
            },
            {
                path: '/add-post',
                element: (
                    <AuthLayout authentication>
                        <AddPost />
                    </AuthLayout>
                ),
            },
            {
                path: '/edit-post/:slug',
                element: (
                    <AuthLayout authentication>
                        <EditPost />
                    </AuthLayout>
                ),
            },
            {
                path: '/post/:slug',
                element: <Post />,
            },
        ],
    },
]);

// Use createRoot here instead of ReactDOM.createRoot
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>
);
