import "./Login.css";
import mainImage from "../../assets/mainLogo.png";
import flag from "../../assets/flag.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError("");

        if (!phoneNumber || phoneNumber.length < 10) {
            setError("Please enter a valid phone number.");
            return;
        }

        setLoading(true);
        try {
            console.log("🔍 Sending OTP request for:", phoneNumber);

            const response = await fetch("http://localhost/magic_number_5_admin/public/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone_number: phoneNumber }),
            });

            const data = await response.json();
            console.log("✅ API Response:", data);

            if (!data.success) {
                throw new Error(data.message || "Failed to send OTP.");
            }

            // Store phone number & session ID in localStorage
            localStorage.setItem("phoneNumber", phoneNumber);
            localStorage.setItem("sessionid", data.response?.SessionId || "");

            // Redirect to OTP page
            navigate("/otp");
        } catch (error) {
            console.error("❌ OTP Request Error:", error.message);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginpages">
            <div className="loginImage">
                <img src={mainImage} alt="Main Logo" />
            </div>
            <h3>Forgot Password?</h3>
            <span>No problem! Enter your registered phone number and we'll send you an OTP to reset your password.</span>
            <div className="loginForm">
                <form onSubmit={handleSendOtp}>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            placeholder="+91 87654 69704"
                            className="phonenumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            maxLength={10}
                        />
                        <div className="flaglogo">
                            <img src={flag} alt="Country Flag" />
                        </div>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="fromSubmitButton" disabled={loading}>
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                    <div className="signUpBtn">
                        <span>Already have an account?</span>
                        <Link to="/login"> Log in</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
