import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import mainImage from "../../assets/mainLogo.png";
import flag from "../../assets/flag.png";

const Registration = () => {
    const navigate = useNavigate();

    // ✅ Define state for each input field
    const [full_name, setFullName] = useState("");
    const [phone_number, setPhoneNumber] = useState("");
    const [referral_code, setReferralCode] = useState("");
    const [email, setEmail] = useState("");
    const [state, setState] = useState("Karnataka");
    const [password, setPassword] = useState("");
    const [password_confirmation, setPasswordConfirmation] = useState("");

    const handleRegistration = async (e) => {
        e.preventDefault();
        
        const formData = {
            id:57,
            full_name,
            phone_number,
            referral_code,
            email,
            state,
            password,
            password_confirmation
        };
    
        try {
            const response = await fetch("http://localhost/magic_number_5_admin/public/api/user-full-details", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            console.log("🔍 API Response:", data); // Debugging
    
            if (response.ok && data.success) {
                console.log("✅ Registration Successful:", data);
                navigate("/dashboard"); // Redirect to Dashboard
            } else {
                console.error("❌ Registration Error:", data.errors);
                alert(JSON.stringify(data.errors, null, 2)); // Show error in alert
            }
        } catch (error) {
            console.error("❌ API Error:", error);
        }
    };
     

    return (
        <div className="loginpages">
            <h3>Sign Up</h3>
            <span>Fill your details to continue!</span>
            <div className="loginForm">
                <form onSubmit={handleRegistration}>
                    <div className="form-group-registration">
                        <label>Name</label>
                        <input type="text" placeholder="Full Name" value={full_name} onChange={(e) => setFullName(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input type="text" placeholder="+91 87654 69704" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} maxLength={10} />
                        <div className="flaglogo">
                            <img src={flag} alt="flag" />
                        </div>
                    </div>

                    <div className="form-group-registration">
                        <label>Referral Code (Optional)</label>
                        <input type="text" placeholder="MAGIC_7542" value={referral_code} onChange={(e) => setReferralCode(e.target.value)} />
                    </div>

                    <div className="form-group-registration">
                        <label>Email</label>
                        <input type="email" placeholder="magic@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className="form-group-registration">
                        <label>State</label>
                        <select value={state} onChange={(e) => setState(e.target.value)}>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Goa">Goa</option>
                        </select>
                    </div>

                    <div className="form-group-registration">
                        <label>Set Password</label>
                        <input type="password" placeholder="*******" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group-registration">
                        <label>Confirm Password</label>
                        <input type="password" placeholder="******" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                    </div>

                    <div className="agreeTermsBtn">
                        <input type="checkbox" required /> <span>I agree to the terms and conditions.</span>
                    </div>

                    <button className="fromSubmitButton" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default Registration;
