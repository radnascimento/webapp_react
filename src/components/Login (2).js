import { FC, FormEvent, useState, useEffect } from "react";
import { Form, Input, Button, Card, Typography, notification } from "antd";
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { ReactComponent as Logo } from '../logo/logoipsum-346.svg';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../components/AuthContext';
import LoginService from '../services/LoginService';
import { IpHelper } from '../utils/IpHelper';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Swal from 'sweetalert2';

const { Title } = Typography;

const Login: FC = () => {
    const [loading, setLoading] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [ipAddress, setIpAddress] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

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

    const handleLoginSuccess = async (response) => {
        console.log("Login Success:", response);
        setLoading(true);

        try {
            const token = response.credential;
            /*const jsonPayload = JSON.parse(atob(token.split('.')[1]));*/
            const { token: userToken, user } = await LoginService.googlelogin(token, ipAddress);
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

    const handleLoginFailure = (error) => {
        console.error("Login Failed:", error);
    };

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const { token, user } = await LoginService.login(values.username, values.password, ipAddress);
            notification.success({ message: 'Login successful!' });
            login(token, user);
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

    return (
        <div className="login-container">
            <Card className="login-card">
                <div className="logo-container">
                    <Logo className="logo" />
                </div>
                <div className="text-center">
                    <Title level={2} className="login-title">Login</Title>
                </div>
                <Form name="login_form" className="login-form" onFinish={onFinish}>
                    <Form.Item name="username" rules={[{ required: true, message: "Please input your Username!" }]}>
                        <Input prefix={<UserOutlined />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item name="password" rules={[{ required: true, message: "Please input your Password!" }]}>
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Password"
                            iconRender={visible => visible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                            visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible
                            }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" block loading={loading}>Log in</Button>
                    </Form.Item>
                </Form>
                <GoogleOAuthProvider clientId="1098760243833-akesrh6fq895qka13h8ljovimtfgf620.apps.googleusercontent.com">
                    <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginFailure} useOneTap />
                </GoogleOAuthProvider>
            </Card>
        </div>
    );
};

export default Login;
