import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import CSS for styling

const Auth = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [authMode, setAuthMode] = useState('login');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [type, setType] = useState([]);
    const [interest, setInterest] = useState('');
    const [adminEmail, setAdemail] = useState('');
    const [adminPass, setAdpass] = useState('');
    const navigate = useNavigate();

    const collname = 'UserData';

    useEffect(() => {
        // Fetch the list of users from the API
        fetch(`http://localhost:5000/getUsers/${collname}`)
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
            // Successful login
            alert(`Welcome ${user.username}!, Authentication is successful, Click OK to continue`);
            const userdata = { user };
            navigate('/home', { state: userdata });
        } else {
            // Failed login
            setError('Invalid email or password');
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else {
            setError('');
            const selectedTypes = interest.join(','); // Convert array to comma-separated string
            const selectedRole = type.join('');
            fetch(`http://localhost:5000/addUser/${username}/${password}/${email}/${address}/${phone}/${selectedTypes}/${selectedRole}`)
                .then(response => response.json())
                .then(data => {
                    setApiResponse(data);
                    console.log(data);
                });
        }
    };

    const handleAdminLogin = (e) => {
        e.preventDefault();
        if (adminEmail === 'admin@mail.com' && adminPass === 'password') {
            setError('');
            navigate('/Admin');
        } else {
            setError('Invalid username or password');
        }
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setInterest(prevType => [...prevType, value]);
        } else {
            setInterest(prevType => prevType.filter(t => t !== value));
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
                    <option value="admin">Admin Login</option>
                </select>
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
                            <label>Area of interest:</label>
                            <div className='checkitems'> 
                                <label>
                                    <input
                                        type="checkbox"
                                        value="plantation"
                                        checked={interest.includes('plantation')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Plantation
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="blood_donation"
                                        checked={interest.includes('blood_donation')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Blood Donation
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="orphanage"
                                        checked={interest.includes('orphanage')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Orphanage
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="elderly_care"
                                        checked={interest.includes('elderly_care')}
                                        onChange={handleCheckboxChange}
                                    />
                                    Elderly Care
                                </label>
                            </div>
                            <div className='checkitems'>
                                <label>
                                    <input
                                        type="checkbox"
                                        value="animal_rescue"
                                        checked={interest.includes('animal_rescue')}
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
