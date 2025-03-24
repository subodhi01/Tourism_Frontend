import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css';

const OTPVerification = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('https://localhost:7001/api/auth/verify-email', {
                email,
                otp
            });

            if (response.data.message === 'Email verified successfully') {
                // Show success message
                alert('Email verified successfully! Please login.');
                navigate('/login');
            }
        } catch (err) {
            setError(err.response?.data || 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResendOTP = async () => {
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('https://localhost:7001/api/auth/resend-otp', {
                email
            });

            if (response.data.message === 'OTP resent successfully') {
                alert('New OTP has been sent to your email');
            }
        } catch (err) {
            setError(err.response?.data || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="otp-verification-box">
                <h2>Email Verification</h2>
                <p>Please enter the verification code sent to your email</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="otp-input-group">
                        <input
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 6-digit code"
                            required
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify OTP'}
                    </button>
                </form>

                <div className="resend-otp">
                    <p>Didn't receive the code?</p>
                    <button 
                        onClick={handleResendOTP} 
                        disabled={loading}
                        className="resend-button"
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification; 