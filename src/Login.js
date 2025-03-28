import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { IpHelper } from './ipHelper';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [ipAddress, setIpAddress] = useState("");

    useEffect(() => {
        const fetchIp = async () => {
            try {
                const ip = await IpHelper.getIpAddress();
                if (ip) {
                    setIpAddress(ip);
                } else {
                    console.error("IP not found");
                }
            } catch (error) {
                console.error("Error fetching IP:", error);
            }
        };

        fetchIp();
    }, []);

    // Show IP **AFTER** it's updated
    useEffect(() => {
        if (ipAddress) {
            Swal.fire({
                title: "IP Address Found",
                text: `Your IP: ${ipAddress}`,
                icon: "info",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });
            console.log("User's IP Address:", ipAddress);
        }
    }, [ipAddress]); // ✅ Runs when `ipAddress` changes

    const handleSubmit = async (e) => {
        e.preventDefault();

        alert('dsds');
        const ip = await IpHelper.getIpAddress();

        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, ip: ipAddress }), // ✅ Send IP in request
        });

        if (response.ok) {
            const data = await response.json();
            Swal.fire({
                title: "Success!",
                text: `Welcome, ${data.name}!`,
                icon: "success",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });

        } else {
            Swal.fire({
                title: "Error!",
                text: "Invalid login credentials!",
                icon: "error",
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn btn-success", // Add your class here
                },
                buttonsStyling: true
            });
        }
    };

    return (
        <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
