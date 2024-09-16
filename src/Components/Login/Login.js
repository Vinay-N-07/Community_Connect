import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css'; 
import { Alert } from 'reactstrap';
import { Add_user, Get_data } from '../API';

const Auth = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState([]);
    const [interest, setInterest] = useState([]);
    const [adminEmail, setAdemail] = useState('');
    const [adminPass, setAdpass] = useState('');
    const [error, setError] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [authMode, setAuthMode] = useState('login');
    const navigate = useNavigate();

    const collname = 'UserData';

    useEffect(() => {
        fetch(`${Get_data}/${collname}`)
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                console.log(data);
            });
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(user => user.email === email && user.password === password);
    
        if (user) {
            Alert(`Welcome ${user.username}! Authentication is successful, Click OK to continue`);
            const userdata = { user };
            navigate('/home', { state: userdata });
        } else {
            toast.error('Invalid email or password');
            setError('Invalid email or password');
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            const selectedTypes = interest.join(',');
            const selectedRole = type.join('');
            fetch(`${Add_user}/${username}/${password}/${email}/${address}/${phone}/${selectedRole}/${selectedTypes}/${age}`)
                .then(response => response.json())
                .then(data => {
                    setApiResponse(data);
                    console.log(data);
                });
        }
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (adminEmail === 'admin@communitycompass.com' && adminPass === 'password') {
            setError('');
            navigate('/Admin');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setInterest(prevInterest => [...prevInterest, value]);
        } else {
            setInterest(prevInterest => prevInterest.filter(i => i !== value));
        }
    };

    const handleVolunteerCheck = (e) => {
        const { value } = e.target;
        setType([value]);
    };

    return (
        <div className='auth_main'>
            <div className='text-header'>
                Welcome to Community Compass
            </div>
            <div className='text-layer'>Unity among us.</div>
            <div className="auth-container">
                <h2>Get Started</h2>
                <select onChange={(e) => setAuthMode(e.target.value)} className="auth-dropdown">
                    <option value="login">Volunteer Login</option>
                    <option value="signup">Create an Account</option>
                    <option value="admin">Administrator Login</option>
                </select>
                <ToastContainer position="top-right" autoClose={5000}/>
                {authMode === 'login' && (
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
                )}
                {authMode === 'signup' && (
                    <form onSubmit={handleSignup}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                        <div className="form-group">
                            <label>Address:</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Age:</label>
                            <input
                                type="number"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Area of interest:</label>
                            <div className='checkitems'> 
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Plantation"
                                        checked={interest.includes('Plantation')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Plantation
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Blood Donation"
                                        checked={interest.includes('Blood Donation')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Blood Donation
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Orphanage"
                                        checked={interest.includes('Orphanage')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Orphanage
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Elderly care"
                                        checked={interest.includes('Elderly care')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Elderly Care
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Animal rescue"
                                        checked={interest.includes('Animal rescue')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Animal Rescue
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Volunteer type:</label>
                            <div className='checkitems'> 
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Student"
                                        checked={type.includes('Student')}
                                        onChange={handleVolunteerCheck}
                                    />
                                    Student
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="Working professional"
                                        checked={type.includes('Working professional')}
                                        onChange={handleVolunteerCheck}
                                    />
                                    Working professional
                                </label>
                            </div>
                        </div>
                        <button type="submit" className='auth-button'>Sign Up</button>
                    </form>
                )}

                {authMode === 'admin' && (
                    <form onSubmit={handleAdminLogin}>
                        <div className="form-group">
                            <label>Email:</label>
                            <input
                                type="email"
                                value={adminEmail}
                                onChange={(e) => setAdemail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={adminPass}
                                onChange={(e) => setAdpass(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className='auth-button'>Login</button>
                    </form>
                )}
                {apiResponse && <div className='response'>{apiResponse[0].message}</div>}
                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};

export default Auth;
