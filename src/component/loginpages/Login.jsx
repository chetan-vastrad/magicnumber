import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import mainImage from "../../assets/mainLogo.png";
import flag from "../../assets/flag.png";
import lock from "../../assets/locked.png";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate(); // To redirect after login
    const userData = JSON.parse(localStorage.getItem("user"));
    const { login } = useAuth();
    const phoneChangeHandler = (e) => {
        setPhone(e.target.value);
    };

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
    
        const loginDetails = {
            phone_number: phone,
            password: password
        };
    
        try {
            const response = await fetch("https://numasoft.org/magic_number/public/api/user-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginDetails)
            });
    
            const data = await response.json();
            console.log("Login API Response:", data);
    
            if (data.user && data.user.id) {  // Ensure API returns user.id
                localStorage.setItem("user_id", data.user.id);
                login(data.user.id); // Call AuthContext login function
                navigate("/dashboard");
            } else {
                console.error("Login failed: No user ID received");
            }
        } catch (err) {
            setError("Something went wrong! Please try again.");
        }
    }; 
    return (
        <div className="loginpages">
            <div className="loginImage">
                <img src={mainImage} alt="Logo" />
            </div>
            <h3>Login To Win!</h3>
            <span>Enter your phone number and password to log in</span>

            <div className="loginForm">
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="text"
                            placeholder="+91 87654 69704"
                            className="phonenumber"
                            maxLength={10}
                            value={phone}
                            onChange={phoneChangeHandler}
                        />
                        <div className="flaglogo">
                            <img src={flag} alt="Flag" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={passwordChangeHandler}
                        />
                        <div className="flaglogo-lock">
                            <img src={lock} alt="Lock" />
                        </div>
                    </div>

                    {/* Show Error Message */}
                    {error && <p className="error-message">{error}</p>}

                    <button className="fromSubmitButton">Log in</button>

                    <div className="forgotPasswordBtn">
                        <Link to="/forgotpassword">Forgot Password?</Link>
                    </div>

                    <div className="signUpBtn">
                        <span>Don't have an account?</span>
                        <Link to="/signup"> Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
