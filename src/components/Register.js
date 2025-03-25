import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import OTPVerification from './OTPVerification';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'User'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showOTPVerification, setShowOTPVerification] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            const requestData = {
                fullName: formData.fullName,
                email: formData.email,
                password: formData.password,
                role: formData.role
            };

            console.log('Sending registration request with data:', requestData);

            const response = await axios.post('https://localhost:7001/api/auth/register', requestData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });

            console.log('Full response:', response);
            console.log('Response status:', response.status);
            console.log('Response data:', response.data);
            console.log('Response headers:', response.headers);

            // Check if the response is successful
            if (response.status === 200) {
                console.log('Registration successful, showing OTP verification form');
                setShowOTPVerification(true);
            } else {
                console.log('Unexpected response status:', response.status);
                setError('Registration failed. Please try again.');
            }
        } catch (err) {
            console.error('Registration error:', err);
            console.error('Error response:', err.response?.data);
            console.error('Error status:', err.response?.status);
            console.error('Error headers:', err.response?.headers);
            
            if (err.response?.data) {
                setError(err.response.data);
            } else if (err.message) {
                setError(err.message);
            } else {
                setError('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    // Debug log for component state
    console.log('Current component state:', {
        showOTPVerification,
        formData,
        error,
        loading
    });

    if (showOTPVerification) {
        console.log('Rendering OTP verification component with email:', formData.email);
        return <OTPVerification email={formData.email} />;
    }

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength="6"
                        />
                    </div>

                    <div className="form-group">
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className="login-link">
                    Already have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
};

export default Register; 