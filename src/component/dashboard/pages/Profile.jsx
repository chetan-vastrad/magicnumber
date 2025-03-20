import { useEffect, useState } from "react";
import Topmenu from "../Topmenu";
import BottomMenu from "../BottomMenu";
import "./Allpages.css";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const userData = JSON.parse(localStorage.getItem("user"));
console.log(userData.phone_number);

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://numasoft.org/magic_number/public/api/update-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: userData.phone_number,
            password: password,
            password_confirmation: confirmPassword,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      
      if(response.ok){
        setPassword("")
        setConfirmPassword("")
      }
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  return (
    <div>
      <div className="mainPage">
        <Topmenu />
        <form onSubmit={passwordChangeHandler}>
          <div className="profileform">
            <h2>Profile</h2>
            <div className="form-input">
              <label htmlFor="">Full Name</label>
              <input type="text" value={userData.full_name} readOnly/>
            </div>
            <div className="form-input">
              <label htmlFor="">Phone Number</label>
              <input type="number" value={userData.phone_number} readOnly />
            </div>
            <div className="form-input">
              <label htmlFor="">Email</label>
              <input type="text" value={userData.email} readOnly />
            </div>
            <div className="form-input">
              <label htmlFor="">State</label>
              <input type="text" value={userData.state} readOnly />
            </div>
            <div className="form-input">
              <label htmlFor="">Passwword</label>
              <input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <label htmlFor="">Confirm Passwword</label>
              <input
                type="password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-input">
              <button className="profileformbtn">Update</button>
            </div>
          </div>
        </form>
        <BottomMenu />
      </div>
    </div>
  );
};
export default Profile;
