import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS for styling
import LogDash from '../Dashboard/LogDash';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple validation
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }

        // TODO: Implement your authentication logic here
        // For demonstration, let's assume any non-empty email/password is valid
        console.log('Email:', email);
        console.log('Password:', password);

        // Clear the form and error
        setEmail('');
        setPassword('');
        setError('');

        // Redirect to the home page upon successful login
        navigate('/home');
    };

    return (
        <div className='login_main'><LogDash/>
            <div className="login-container">
                <h2>Community Crusaders!</h2>
                <h3>Volunteer login</h3>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
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
            </div>

    );

};

export default Login;
