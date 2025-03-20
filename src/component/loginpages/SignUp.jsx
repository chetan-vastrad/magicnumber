import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Login.css";
import mainImage from "../../assets/mainLogo.png";
import flag from "../../assets/flag.png";

const SignUp = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handlePhoneNumberChange = (e) => {
        setPhoneNumber(e.target.value);
    };

    const API_URL = "http://localhost/magic_number_5_admin/public/api/user-register-phone"; 

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setError(""); // Reset previous errors

        // ✅ Phone number validation (Only 10-digit numbers allowed)
        if (!/^\d{10}$/.test(phoneNumber)) {
            setError("Please enter a valid 10-digit phone number");
            return;
        }

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ phone_number: phoneNumber }),
            });

            const data = await response.json();
            
            console.log("✅ API Response:", data);
            if (response.ok && data.success) {
                // ✅ Redirect user to OTP page and pass phone number
                navigate("/otp", { state: { phoneNumber } });
            } else {
                setError(data.message || "OTP sending failed. Try again.");
            }
        } catch (error) {
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="loginpages">
            <div className="loginImage">
                <img src={mainImage} alt="Main Logo" />
            </div>
            <h3>Sign Up</h3>
            <span>Enter your phone number to receive OTP</span>
            <div className="loginForm">
                <form onSubmit={handleSendOtp}>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="text"
                            placeholder="Enter your phone number"
                            className="phonenumber"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            maxLength={10}
                        />
                        <div className="flaglogo">
                            <img src={flag} alt="Country Flag" />
                        </div>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button className="fromSubmitButton" type="submit">Send OTP</button>
                    <div className="signUpBtn">
                        <span>Already have an account?</span>
                        <Link to="/login"> Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
