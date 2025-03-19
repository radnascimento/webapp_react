import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';

import Header from './components/Head';
import Footer from './components/Footer';
import Users from './components/Users'; // Import Users component
import UserDetails from './components/UserDetails'; // Your user details page
import RegisterUser from './components/RegisterUser'; // Register User Page
import EditUser from './components/EditUser'; // Register User Page



import Login from './components/Login'; // Import Login component
import { PrivateRoute } from './components/PrivateRoute'; // Corrected import for PrivateRoute
import Levels from './components/Levels';
import AddLevel from './components/AddLevel';
import Topics from './components/Topics';
import AddTopic from './components/AddTopic';
import EditTopic from './components/EditTopic';
import DetailStudy from './components/DetailStudy';



import Study from './components/Study';
import AddStudy from './components/AddStudy';
import EditStudy from './components/EditStudy';

import Material from './components/Material';
import AddMaterial from './components/AddMaterial';
import EditMaterial from './components/EditMaterial';

import StudyReview from './components/StudyReview';
import SpacedLearningPage from './components/SpacedLearningPage';
import ContactUs from './components/ContactUs';
import ResetPassword from './components/ResetPassword';
import Quiz from './components/Quiz';
import QuizAdmin from './components/admin/QuizAdmin';

import LoginGoogle from './components/LoginGoogle';

import FlipCard from './components/FlipCard';
import DateSelector from './components/DateSelector';


const App = () => {
    return (
        <>
            {/* Header will be shown on all pages */}
            <Header />

            <div className="app-container">
                <Routes>
                    {/* Set Login as the initial page */}
                    <Route path="/" element={<Login />} />

                    {/* Protected Routes */}
                    <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
                    
                    <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
                    <Route path="/user-details/:userId" element={<PrivateRoute><UserDetails /></PrivateRoute>} />
                    <Route path="/editUser" element={<PrivateRoute><EditUser /></PrivateRoute>} />


                    <Route path="/levels" element={<PrivateRoute><Levels /></PrivateRoute>} />
                    <Route path="/addLevel" element={<PrivateRoute><AddLevel /></PrivateRoute>} />

                    <Route path="/topics" element={<PrivateRoute><Topics /></PrivateRoute>} />
                    <Route path="/addTopic" element={<PrivateRoute><AddTopic /></PrivateRoute>} />
                    <Route path="/editTopic/:id" element={<PrivateRoute><EditTopic /></PrivateRoute>} />

                    


                    <Route path="/study" element={<PrivateRoute><Study /></PrivateRoute>} />
                    <Route path="/addStudy" element={<PrivateRoute><AddStudy /></PrivateRoute>} />
                    <Route path="/addStudy/:idTopic" element={<PrivateRoute><AddStudy /></PrivateRoute>} />
                    <Route path="/editStudy/:id" element={<PrivateRoute><EditStudy /></PrivateRoute>} />
                    <Route path="/detailStudy/:id" element={<PrivateRoute><DetailStudy /></PrivateRoute>} />
                    


                    <Route path="/studyReview" element={<PrivateRoute><StudyReview /></PrivateRoute>} />

                    <Route path="/material" element={<PrivateRoute><Material /></PrivateRoute>} />
                    <Route path="/addMaterial" element={<PrivateRoute><AddMaterial /></PrivateRoute>} />
                    <Route path="/editMaterial/:id" element={<PrivateRoute><EditMaterial /></PrivateRoute>} />


                    
                    <Route path="/contactUs" element={<ContactUs />} />
                    <Route path="/spacedLearningPage" element={<SpacedLearningPage />} />
                    <Route path="/resetPassword" element={<ResetPassword />} />

                    <Route path="/quiz" element={<PrivateRoute><Quiz /></PrivateRoute>} />
                        <Route path="/quiz/:id" element={<PrivateRoute><Quiz /></PrivateRoute>} />
                    <Route path="/admin/quizAdmin" element={<QuizAdmin />} />


                    <Route path="/loginGoogle" element={<LoginGoogle />} />

                    <Route path="/flipcard" element={<FlipCard />} />
                    <Route path="/DateSelector" element={<DateSelector />} />
                    


                    {/* Public Routes */}
                    <Route path="/register" element={<RegisterUser />} />
                    {/* Add other routes as needed */}
                </Routes>
            </div>

            {/* Footer will be shown on all pages */}
            <Footer className="footer" />

        </>
    );
};

export default App;
