import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import mainImage from "../../assets/mainLogo.png";
import flag from "../../assets/flag.png";
import lock from "../../assets/locked.png";
// import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // To redirect after login
  // const userData = JSON.parse(localStorage.getItem("user"));
  // const { login } = useAuth();

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
      password: password,
    };
  
    try {
      const response = await axios.post(
        "https://numasoft.org/magic_number/public/api/user-login",
        loginDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("API Response:", response.data);
      if (response.data) {
        // Store both in localStorage and context
        localStorage.setItem("user_id", response.data.user.id)
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Update to pass both id and user data
        // login(response.data.user.id, response.data.user);
        
        // Add slight delay to ensure state updates
        // await new Promise(resolve => setTimeout(resolve, 50));
        
        navigate("/dashboard");
      } else {
        setError("Login failed: Invalid credentials or server error.");
      }
    } catch (err) {
      console.error("Login Error:", err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || "Something went wrong! Please try again.");
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
