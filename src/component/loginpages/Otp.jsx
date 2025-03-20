import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import mainImage from "../../assets/mainLogo.png";
import flag from "../../assets/flag.png";

const Otp = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Extract phone number and user action (sign-up/forgot password) from navigation state
    const phoneNumber = location.state?.phoneNumber || "";
    const userAction = location.state?.userAction || "signup"; // Default: signup

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle OTP input
    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return; // Allow only numbers
        let newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    // Send OTP verification API request
    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        
        const enteredOtp = otp.join("").trim();
    
        if (!phoneNumber || phoneNumber.trim() === "") {
            setError("Phone number is required.");
            return;
        }
    
        if (enteredOtp.length !== 6 || isNaN(enteredOtp)) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }
    
        // Retrieve session ID from local storage (or state)
        const sessionid = localStorage.getItem("sessionid") || "static-session-id"; // Replace with actual session logic
    
        setLoading(true);
        try {
            console.log("🔍 Sending OTP verification:", { phone_number: phoneNumber, otp: enteredOtp, sessionid });
    
            const response = await fetch("http://localhost/magic_number_5_admin/public/api/user-verifyotp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    otp: enteredOtp,
                    sessionid: sessionid, // 🔥 Added session ID
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("✅ API Response:", data);
    
            if (!data.success) {
                throw new Error(data.message || "OTP verification failed.");
            }
    
            // Redirect based on user state
            if (data.redirect_to === "/registration") {
                navigate("/dashboard", { state: { phoneNumber } });
            } else {
                navigate("/registration");
            }
        } catch (error) {
            console.error("❌ OTP Verification Error:", error.message);
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
            <h3>OTP</h3>
            <span>
                We've sent a One-Time Password (OTP) to your phone number. Please enter it below to verify your identity.
            </span>
            <br />
            <span>The OTP is valid for 5 minutes. If you don't receive it, you can request a new one.</span>

            <div className="loginForm">
                <form onSubmit={handleVerifyOtp}>
                    <div className="form-otp">
                        <label>OTP</label>
                        <div className="enterOtp">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                />
                            ))}
                        </div>
                    </div>

                    {error && <p className="error">{error}</p>}
                    <button className="fromSubmitButton" type="submit" disabled={loading}>
                        {loading ? "Verifying..." : "Continue"}
                    </button>

                    <div className="forgotPasswordBtn">
                        <button type="button" onClick={() => console.log("Resend OTP logic here")}>
                            Resend OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Otp;
