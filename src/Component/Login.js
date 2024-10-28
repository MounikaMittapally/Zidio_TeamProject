import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';

function Login() {
    console.log("start on login");
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState(null);

    const [errorMessage] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const formData = {
            name: name,
            password: password,
        };
        try {
            const response = await axios.post('http://localhost:5000/api/login', formData);

            //console.log('User ID:', userId);

            console.log('Login successful:', response.data);
            if (response.status === 200) {
                const workStatus = response.data.workStatus;
                console.log('work status',workStatus);
                if (workStatus === 'jobSeeker')
                    navigate('/JobSeeker');
                if (workStatus === 'Employed')
                    navigate('/Employer');

                const userData = JSON.parse(response.config.data);
                localStorage.setItem('userName', userData.name);

                const fetchedUserId = response.data.userId; //getting login id from login
                localStorage.setItem('userId', fetchedUserId);

                const token = response.data.token;
                localStorage.setItem('token', token);

                setUserId(fetchedUserId);
               // navigate('/Dashboard'); // Redirect to the dashboard after login
            }
        } catch (error) {
            console.error('Login error:', error);
        }

    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Name:</label>
                        <input
                            type="text" placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>Password:</label>
                        <input
                            type="password" placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-button" type="submit">Login</button>
                    {errorMessage && <p>{errorMessage}</p>}

                    {userId && <p>User ID: {userId}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;

