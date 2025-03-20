import { NavLink } from "react-router-dom";
import "./BottomMenu.css";
import wallet from "../../assets/wallet.png";
import str from "../../assets/str.png";
import centerlogo from "../../assets/centerlogo.png";
import history from "../../assets/history.png";
import profile from "../../assets/profile.png";
import Topmenu from "./Topmenu";
import Wallet from "./pages/Profile";
const BottomMenu = () => {
  return (
    <>
      <div className="mainBottom">
        <div className="bottomInner">
          <NavLink
            to="/wallet"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={wallet} alt="" srcset="" />
          </NavLink>
          <NavLink
            to="/winnigstrategy"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={str} alt="" srcset="" />
          </NavLink>
          <NavLink to="/dashboard"  className={({ isActive }) => (isActive ? "active" : "")}>
            <img src={centerlogo} alt="" srcset="" />
          </NavLink>
          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={history} alt="" srcset="" />
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <img src={profile} alt="" srcset="" />
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default BottomMenu;
