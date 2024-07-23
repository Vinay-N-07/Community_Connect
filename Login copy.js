import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS for styling

const Author = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setName] = useState('');
    const [error, setError] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Simple authentication logic (replace with your own authentication mechanism)
        if (email === 'admin@mail.com' && password === 'password') {
            setError('');
            navigate('/home');
        } else {
            setError('Invalid username or password');
        }
    };


    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            fetch(`http://localhost:5000/addUser/${username}/${email}/${password}`, { mode: 'no-cors' })
                .then(response => {
                    setApiResponse(response);
                })
                .catch(() => setError('Signup failed'));
        }
    };

    return (
        <div className='auth_main'>
            <div className='text-header'>
                Welcome to community crusaders
            </div>
            <div className='text-layer'>Unity among us.</div>
            <div className="auth-container">
                <h2>Community Crusaders!</h2>
                <select onChange={(e) => setIsLogin(e.target.value === 'login')} className="auth-dropdown">
                    <option value="login">Volunteer Login</option>
                    <option value="signup">Create an Account</option>
                </select>
                {error && <p className="error">{error}</p>}
                {isLogin ? (
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
                        <button type="submit" className='auth-button'>Login</button>
                    </form>
                ) : (
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="form-group">
                            <label>Confirm Password:</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className='auth-button'>Sign Up</button>
                    </form>
                )}
                {error && <p className="error">{error}</p>}
                <div>
                    {apiResponse && <pre>Account Created successfully</pre>}
                </div>
            </div>
        </div>
    );
};

export default Author;
