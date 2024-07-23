import React, { useState , useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import './Login.css'; // Import CSS for styling

const Auth = () => {
    const [users, setUsers] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setName] = useState('');
    const [error, setError] = useState('');
    const [apiResponse, setApiResponse] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [address, setAddress ] = useState('');
    const [phone, setPhone ] = useState('');
    const [type, setType ] = useState('');
    const [interest, setInterest ] = useState('');
    const navigate = useNavigate();

    const collname = 'UserData';
    
    useEffect(() => {
        // Fetch the list of users from the API
        fetch(`http://localhost:5000/getUsers/${collname}`) // Replace with your API endpoint
        .then(response => {
            return response.json();
        })
        .then(data => {
            setUsers(data);
            console.log(data);
            // const userdata = { email, password };
            // navigate('/home', { state: userdata })

        })
      }, []);
    
      const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(user => user.email === email && user.password === password);
    
        if (user) {
          // Successful login
          alert(`Welcome ${user.username}!, Authentication is successful, Click OK to continue`);
          const userdata = {user}
        //   const userdata = { user.email, user.password };
          navigate('/home', { state: userdata })
          // Redirect to home page or perform any other action
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
            fetch(`http://localhost:5000/addUser/${username}/${password}/${email}/${address}/${phone}/${type}/${interest}`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                setApiResponse(data);
                console.log(data);

            })
            
                
        }
    };

    return (
        <div className='auth_main'>
            <div className='text-header'>
                Welcome to community crusaders
            </div>
            <div className='text-layer'>Unity among us.</div>
            <div className="auth-container">
                <h2>Get started</h2>
                <select onChange={(e) => setIsLogin(e.target.value === 'login')} className="auth-dropdown">
                    <option value="login">Volunteer Login</option>
                    <option value="signup">Create an Account</option>
                </select>
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
                            <label>Votunteer type:</label>
                            <input
                                type="text"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Area of interest</label>
                            <input
                                type="text"
                                value={interest}
                                onChange={(e) => setInterest(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className='auth-button'>Sign Up</button>
                    </form>
                
                
                )}
                {error && <p className="error">{error}</p>}
                <div className='response'>
                    {apiResponse.length === 1  && <span>{apiResponse[0].message}</span>}
                </div>
                
            </div>
        </div>
    );
};

export default Auth;
