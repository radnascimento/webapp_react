import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, Input, Button, Typography, message } from "antd";
import LoginService from "../services/LoginService";

const { Title } = Typography;

const ResetPassword: React.FC = () => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    const [loading, setLoading] = useState(false);

    const onFinish = async (values: { password: string; confirmPassword: string }) => {
        if (values.password !== values.confirmPassword) {
            message.error("Passwords do not match!");
            return;
        }

        if (!userId || !token) {
            message.error("Invalid reset link.");
            return;
        }

        setLoading(true);

        try {
            await LoginService.resetPassword(userId, token, values.password);
            message.success("Password successfully reset!");
        } catch (error) {
            message.error(error.message || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
            <Title level={2}>Reset Password</Title>
            {userId && token ? (
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label="New Password"
                        name="password"
                        rules={[{ required: true, message: "Please enter your new password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: "Please confirm your password!" }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={loading}>
                        Change Password
                    </Button>
                </Form>
            ) : (
                <p style={{ color: "red" }}>Invalid reset link</p>
            )}
        </div>
    );
};

export default ResetPassword;