import { FC, FormEvent, useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, notification } from "antd";
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ReactComponent as Logo } from '../logo/logoipsum-346.svg';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import LoginService from '../services/LoginService';
import { IpHelper } from '../utils/IpHelper';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Login: FC = () => {
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ipAddress, setIpAddress] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const [captchaToken, setCaptchaToken] = useState("");

    // Load reCAPTCHA script on component mount
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

    // Function to execute reCAPTCHA and get the token
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

    // Handle form submission
    const onFinish = async (values) => {
        setLoading(true);

        try {
            // Get reCAPTCHA token
            const token = await getRecaptchaToken();
            if (!token) {
                notification.error({ message: 'Please complete the reCAPTCHA' });
                return;
            }

            // Call your login service with username, password, IP, and reCAPTCHA token
            const { token: userToken, user } = await LoginService.login(
                values.username,
                values.password,
                ipAddress,
                token // Pass the reCAPTCHA token to your backend
            );

            // Notify success and navigate to home
            notification.success({ message: 'Login successful!' });
            login(userToken, user);
            navigate('/home');
        } catch (error) {
            notification.error({
                message: 'Login failed',
                description: error.message || 'An unexpected error occurred',
            });
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch IP address on component mount
    useEffect(() => {
        const fetchIp = async () => {
            try {
                const ip = await IpHelper.getIpAddress();
                setIpAddress(ip);
            } catch (error) {
                console.error("Failed to fetch IP address.", error);
            }
        };
        fetchIp();
    }, []);

    // Handle Google login success
    const handleLoginSuccess = async (response) => {
        console.log("Login Success:", response);
        setLoading(true);

        try {


            const recaptcha = await getRecaptchaToken();

            if (!recaptcha) {
                notification.error({ message: 'Please complete the reCAPTCHA' });
                return;
            }


            const token = response.credential;
            const { token: userToken, user } = await LoginService.googlelogin(token, ipAddress, recaptcha);
            notification.success({ message: 'Login successful!' });
            login(userToken, user);
            navigate('/home');
        } catch (error) {
            notification.error({
                message: 'Login failed',
                description: error.message || 'An unexpected error occurred',
            });
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle Google login failure
    const handleLoginFailure = (error) => {
        console.error("Login Failed:", error);
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="logo-container">
                    {/* <Logo className="logo" /> */}
                </div>
                <div className="text-center">
                    <Title level={2} className="login-title">Login</Title>
                </div>

                <Form name="login_form" className="login-form" onFinish={onFinish}>
                    <Form.Item name="username" rules={[{ required: true, message: "Informe seu nome de usuário!" }]}>
                        <Input prefix={<UserOutlined />} placeholder="Nome de usuário" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Informe sua senha!" }]}>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Senha"
                            iconRender={visible => visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Link to="/forgotPassword">
                            <span>Esqueci a senha</span>
                        </Link>
                        <hr></hr>
                        <Button type="primary" className="login-form-button" htmlType="submit" block loading={loading}>
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
                <GoogleOAuthProvider clientId="1098760243833-akesrh6fq895qka13h8ljovimtfgf620.apps.googleusercontent.com">
                    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} useOneTap />
                </GoogleOAuthProvider>
                <hr></hr>
                <Link to="/register">
                    <span>Não possui conta? Cadastre-se</span>
                </Link>

            </Card>
            
        </div>
    );
};

export default Login;