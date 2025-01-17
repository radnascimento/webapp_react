import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUsers } from 'react-icons/fa'; // Import the users icon from react-icons

const Users = () => {
    // State to store the list of users
    const [users, setUsers] = useState([]);

    // Simulating fetching users from an API
    useEffect(() => {
        const mockUsers = [
            { id: 1, username: 'johndoe', email: 'johndoe@example.com', status: 'active' },
            { id: 2, username: 'janedoe', email: 'janedoe@example.com', status: 'active' },
            { id: 3, username: 'alice', email: 'alice@example.com', status: 'blocked' },
        ];
        setUsers(mockUsers);
    }, []);

    return (
        <div className="container mt-5">
            {/* Wrapper div with white background and border-radius */}
            <div className="bg-white p-4 rounded shadow-sm">
                {/* Header with icon and button in the same row */}
                <div className="d-flex align-items-center justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                        <FaUsers size={30} className="mr-3" /> {/* Icon with margin to create space */}
                        <h2 className="mb-0">Users</h2> {/* Title */}
                    </div>
                    {/* Register Button */}
                    <Link to="/register" className="btn btn-success btn-sm">
                        <i className="fas fa-user-plus"></i> {/* Plus icon */}
                        
                    </Link>
                </div>


                {/* Breadcrumbs Tracker */}
                <div className="mb-3">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/home" className="text-decoration-none">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Users Management
                            </li>
                        </ol>
                    </nav>
                </div>

             

                {/* Users Table */}
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Username</th>
                            <th className="d-none d-sm-table-cell">Email</th>
                            <th className="d-none d-sm-table-cell">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/user-details/${user.id}`} className="text-decoration-none">
                                        {user.username}
                                    </Link>
                                </td>
                                <td className="d-none d-sm-table-cell">{user.email}</td>
                                <td className="d-none d-sm-table-cell">{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br></br>
        </div>
        
    );
};

export default Users;
