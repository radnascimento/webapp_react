import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import Page1 from './components/Page1';
import Header from './components/Head';
import Footer from './components/Footer';
import Users from './components/Users'; // Import Users component
import UserDetails from './components/UserDetails'; // Your user details page
import RegisterUser from './components/RegisterUser'; // Register User Page
import Login from './components/Login'; // Import Login component
import { PrivateRoute } from './components/PrivateRoute'; // Corrected import for PrivateRoute
import Levels from './components/Levels';
import AddLevel from './components/AddLevel';
import Topics from './components/Topics';
import Study from './components/Study';
import Material from './components/Material';
import AddTopic from './components/AddTopic';
import AddMaterial from './components/AddMaterial';
import AddStudy from './components/AddStudy';



const App = () => {
    return (
        <>
            {/* Header will be shown on all pages */}
            <Header />

            <div>
                <Routes>
                    {/* Set Login as the initial page */}
                    <Route path="/" element={<Login />} />

                    {/* Protected Routes */}
                    <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    <Route path="/page1" element={<PrivateRoute><Page1 /></PrivateRoute>} />
                    <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                    <Route path="/user-details/:userId" element={<PrivateRoute><UserDetails /></PrivateRoute>} />

                    <Route path="/levels" element={<PrivateRoute><Levels /></PrivateRoute>} />
                    <Route path="/addLevel" element={<PrivateRoute><AddLevel /></PrivateRoute>} />

                    <Route path="/topics" element={<PrivateRoute><Topics /></PrivateRoute>} />
                    <Route path="/addTopic" element={<PrivateRoute><AddTopic /></PrivateRoute>} />

                    <Route path="/study" element={<PrivateRoute><Study /></PrivateRoute>} />
                    <Route path="/addStudy" element={<PrivateRoute><AddStudy /></PrivateRoute>} />
                    <Route path="/addStudy/:id" element={<PrivateRoute><AddStudy /></PrivateRoute>} />


                    <Route path="/material" element={<PrivateRoute><Material /></PrivateRoute>} />
                    <Route path="/addMaterial" element={<PrivateRoute><AddMaterial /></PrivateRoute>} />


                    {/* Public Routes */}
                    <Route path="/register" element={<RegisterUser />} />
                    {/* Add other routes as needed */}
                </Routes>
            </div>

            {/* Footer will be shown on all pages */}
            <Footer />
        </>
    );
};

export default App;
