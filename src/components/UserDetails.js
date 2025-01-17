import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UserDetails = () => {
    const { userId } = useParams();
    const navigate = useNavigate(); // Hook to programmatically navigate

    // Simulating fetching user details from an API
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Replace this with an actual API call to fetch the user details
        const mockUserDetails = {
            id: userId,
            username: userId === '1' ? 'johndoe' : userId === '2' ? 'janedoe' : 'alice',
            email: userId === '1' ? 'johndoe@example.com' : userId === '2' ? 'janedoe@example.com' : 'alice@example.com',
            status: userId === '1' ? 'active' : userId === '2' ? 'active' : 'blocked',
        };
        setUser(mockUserDetails);
    }, [userId]);

    // Function to block a user
    const blockUser = () => {
        alert(`User with ID: ${userId} is blocked.`);
    };

    // Function to edit a user
    const editUser = () => {
        alert(`Editing user with ID: ${userId}`);
    };

    // Navigate back to Users page
    const goBackToUsers = () => {
        navigate('/'); // Navigates to the Users page (root)
    };

    if (!user) {
        return <div>Loading user details...</div>;
    }

    return (
        <div className="container mt-5">
            <h2>User Details: {user.username}</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> {user.status}</p>

            {/* Action buttons */}
            <div className="mt-4">
                <button
                    className="btn btn-warning btn-sm mx-2"
                    disabled={user.status === 'blocked'}
                    onClick={blockUser}
                >
                    {user.status === 'blocked' ? 'Blocked' : 'Block'}
                </button>
                <button
                    className="btn btn-primary btn-sm mx-2"
                    onClick={editUser}
                >
                    Edit
                </button>
            </div>

            {/* Back button */}
            <div className="mt-4">
                <button className="btn btn-secondary btn-sm" onClick={goBackToUsers}>
                    Back to Users List
                </button>
            </div>
        </div>
    );
};

export default UserDetails;
