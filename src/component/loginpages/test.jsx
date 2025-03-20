import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import mainImage from "../../assets/mainLogo.png";
import flag from "../../assets/flag.png";
import lock from "../../assets/locked.png";
import { Link } from "react-router-dom";

const Login = () => {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const loginData = {
            phone,
            password,
        };

        try {
            const response = await fetch("https://numasoft.org/magic_number/public/api/user-login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            const result = await response.json();

            if (response.ok) {
                // Store token (optional)
                localStorage.setItem("token", result.token);

                // Redirect to dashboard
                navigate("/dashboard");
            } else {
                setError(result.message || "Login failed");
            }
        } catch (err) {
            setError("Network error, please try again later.");
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <div className="flaglogo-lock">
                            <img src={lock} alt="Lock" />
                        </div>
                    </div>
                    {error && <p className="error">{error}</p>}
                    <button type="submit" className="fromSubmitButton">Log in</button>
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
