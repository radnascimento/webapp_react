import { FC, FormEvent, useState } from "react";
import { Form, Input, Button, Card, Typography, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { ReactComponent as Logo } from '../logo/logoipsum-346.svg'; // Import your SVG file here
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import { useAuth } from '../components/AuthContext';

import LoginService from '../services/loginService'; // Adjust the import path if needed

const { Title } = Typography;

interface Values {
    username: string;
    password: string;
    remember: boolean;
}

const Login: FC = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize the navigate hook
    const { login } = useAuth();

    const onFinish = async (values: Values) => {
        setLoading(true);
        try {
            const { token, user } = await LoginService.login(values.username, values.password); // Assume API returns token & user data
            notification.success({ message: 'Login successful!' });

            // Use AuthContext's login method
            login(token, user);

            // Redirect to the Home page after successful login
            navigate('/home');
        } catch (error) {
            notification.error({
                message: 'Login failed',
                description: error.message || 'An unexpected error occurred',
            });
            console.error('Login error:', error); // Log error for better debugging
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = (e: FormEvent) => {
        e.preventDefault();
        // Add logic for forgot password (e.g., redirect to password reset page)
        console.log("Handle password recovery logic here");
    };

    const handleRegister = (e: FormEvent) => {
        e.preventDefault();
        // Redirect to the register page
        navigate('/register');
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="logo-container">
                    <Logo className="logo" />
                </div>
                <div className="text-center">
                    <Title level={2} className="login-title">Login</Title>
                </div>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "Please input your Username!" }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="Username"
                            className="login-input"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: "Please input your Password!" }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            className="login-input"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                            block
                            loading={loading}
                        >
                            Log in
                        </Button>
                        <div className="register-link">
                            <a href="" onClick={handleRegister}>
                                Don't have an account? Sign up
                            </a>
                        </div>
                        {/* Forgot password link */}
                        <div className="forgot-password-link">
                            <a href="" onClick={handleForgotPassword}>
                                Forgot password?
                            </a>
                        </div>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;
