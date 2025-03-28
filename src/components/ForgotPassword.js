import React, { useState , useEffect} from "react";
import LoginService from "../services/LoginService";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");

 
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=6LcWofsqAAAAAHHF2tLREYKb08bKY-E4GqaiAMxs';
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const getRecaptchaToken = async () => {
        return new Promise((resolve, reject) => {
            if (window.grecaptcha) {
                window.grecaptcha.ready(() => {
                    window.grecaptcha
                        .execute('6LcWofsqAAAAAHHF2tLREYKb08bKY-E4GqaiAMxs', { action: 'login' })
                        .then((token) => {
                            setCaptchaToken(token);
                            resolve(token);

                        })
                        .catch((error) => {
                            console.error("reCAPTCHA error:", error);
                            reject(null);
                        });
                });
            } else {
                reject(new Error('reCAPTCHA script not loaded'));
            }
        });
    };


  const handleSubmit = async () => {
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {

      const token = await getRecaptchaToken();

      const response = await LoginService.forgotPassword(email,token);

      Swal.fire({
        title: "Esqueci a Senha",
        text: "Sua nova senha foi enviada ao e-mail informado.",
        icon: "success",
        confirmButtonText: "OK",
        customClass: {
            confirmButton: "btn btn-success", // Add your class here
        },
        buttonsStyling: true
    });

    } 
    catch (error) {

           Swal.fire({
                      title: "Esqueci a Senha",
                      text: error,
                      icon: "warning",
                      confirmButtonText: "OK",
                      customClass: {
                          confirmButton: "btn btn-success", // Add your class here
                      },
                      buttonsStyling: true
                  });
      
      // setMessage("Failed to send reset email. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-sm" style={{ width: "400px" }}>
        <h3 className="text-center mb-3">Esqueci a Senha</h3>
        {message && <div className="alert alert-info">{message}</div>}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          className="login-form-button" 
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Enviando..." : "Receber Senha"}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;




