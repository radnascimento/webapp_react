import React from 'react';
import Head from './Head';

const Page1 = () => {
  return (
    <div>
      <Head title="Users Page" />
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Welcome, John Doe</a>
        <div className="ml-auto">
          <a href="/home" target="_blank" className="btn btn-outline-light btn-sm mx-2">Home</a>
          <a href="/login" target="_blank" className="btn btn-outline-danger btn-sm">Logout</a>
        </div>
      </nav>

      <div className="container mt-5">
        <h3>User Information</h3>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Enter username" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary">Save</button>
          <button type="reset" className="btn btn-secondary">Cancel</button>
        </form>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Your Company Name. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Page1;
