import "./Login.css"
import mainImage from "../../assets/mainLogo.png"
import flag from "../../assets/flag.png"
import lock from "../../assets/locked.png"
import { Link } from "react-router-dom"
const Login = () => {
    
    return (
        <div className="loginpages">
            <div className="loginImage">
                <img src={mainImage} alt="" srcSet="" />
            </div>
            <h3>Reset Password </h3>
            <span>Please enter new password to reset the password. </span>
            <div className="loginForm">
                <form action="">
                <div className="form-group-registration">
                        <label htmlFor="">New Password</label>
                        <input type="password" placeholder="********" />
                    </div>
                    <div className="form-group-registration">
                        <label htmlFor="">Confirm Password</label>
                        <input type="password" placeholder="********" />
                    </div>
                    <button className="fromSubmitButton">Reset Password </button>
                    <div className="signUpBtn">
                        <span>Already have an account?</span>
                        <Link to="/login"> Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default Login;