import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OTPVerification.css';

const OTPVerification = ({ email }) => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);
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
        if (resendDisabled) return;
        
        setError('');
        setLoading(true);
        setResendDisabled(true);
        setCountdown(60);

        try {
            const response = await axios.post('https://localhost:7001/api/auth/resend-otp', {
                email
            });

            if (response.data.message === 'OTP resent successfully') {
                // Start countdown
                const timer = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(timer);
                            setResendDisabled(false);
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);

                alert('New OTP has been sent to your email');
            }
        } catch (err) {
            setError(err.response?.data || 'Failed to resend OTP');
            setResendDisabled(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="otp-verification-box">
                <h2>Email Verification</h2>
                <div className="email-info">
                    <p>We've sent a verification code to:</p>
                    <p className="email-address">{email}</p>
                </div>
                <p className="instruction">Please enter the 6-digit code to complete your registration</p>
                
                <form onSubmit={handleSubmit}>
                    <div className="otp-input-group">
                        <input
                            type="text"
                            maxLength="6"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                            placeholder="Enter 6-digit code"
                            required
                            autoFocus
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
                        disabled={resendDisabled || loading}
                        className="resend-button"
                    >
                        {resendDisabled ? `Resend OTP (${countdown}s)` : 'Resend OTP'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification; 