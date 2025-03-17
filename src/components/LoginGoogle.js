import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Swal from 'sweetalert2';


const App = () => {
    const handleLoginSuccess = (response) => {
        console.log("Login Success:", response);


        Swal.fire({
            title: 'Please wait...',
            text: response.credential,
            icon: 'info', // Adds an information icon
            allowOutsideClick: false, // Disables closing the alert by clicking outside
            onBeforeOpen: () => {
                Swal.showLoading();
            },
            confirmButtonText: 'Got it!', // Customize the button text
            customClass: {
                confirmButton: 'btn btn-success' // Apply the Bootstrap success button class
            },
            buttonsStyling: false,  // Disable SweetAlert2's default button styling
        });



        // Send the token to your backend for verification and authentication
        const token = response.credential;  // token sent by Google OAuth
        console.log("Google Token:", token);
        // You can send this token to your backend for authentication, for example:
        // fetch('/api/auth/google', { method: 'POST', body: JSON.stringify({ token }) })
    };

    const handleLoginFailure = (error) => {
        console.error("Login Failed:", error);
    };

    return (
        <GoogleOAuthProvider clientId="1098760243833-akesrh6fq895qka13h8ljovimtfgf620.apps.googleusercontent.com">
            <div>
                <h1>Login com Google</h1>
                <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                    useOneTap
                />
            </div>
        </GoogleOAuthProvider>
    );
};

export default App;
