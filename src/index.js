import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/reset.css'; // For Ant Design v5+
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter here
import { AuthProvider } from './components/AuthContext'; // Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router> {/* Wrap the app in Router */}
            <AuthProvider> {/* Wrap the app in AuthProvider to provide authentication context */}
                <App />
            </AuthProvider>
        </Router>
    </React.StrictMode>
);

reportWebVitals();
