import { useNavigate, Link} from "react-router-dom";
import { useState, useRef, useEffect  } from "react";
import refimg from "../../assets/refimg.png";
import logo1 from "../../assets/logo1.png";
import menu from "../../assets/menu.png";
import BackImg from "../../assets/back.png"
const Topmenu = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
 const [viewMenu, setViewMenu]  = useState (false);
 const menuRef = useRef(null);

 const menuViewChnageHandler = () =>{
    setViewMenu(true)
 }
//  Close Menu
 useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setViewMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className="mainHeader">
        <Link to="/dashboard">
                  <img src={BackImg} alt="" srcset="" />
                </Link>
        <img src={logo1} alt="" />
        <img src={menu} alt="" srcset=""  onClick={menuViewChnageHandler}/>
      </div>
     {viewMenu && <div className="topmenuinner" ref={menuRef}>
        <div className="topmenuheader">
          <span>Live Traders</span>
          <p>22K</p>
          <h3>Good Morning Chetan!</h3>
        </div>
        <div className="topmenucenter">
          <ul>
            <li>
              <a href="">Profile</a>
            </li>
            <li>
              <a href="">Wallet</a>
            </li>
            <li>
              <a href="">Strategy</a>
            </li>
            <li>
              <a href="">History</a>
            </li>
            <li>
              <a href="">How to Play</a>
            </li>
            <li>
              <a href="">About Us</a>
            </li>
            <li>
              <a href="">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="topmenubottom">
          <div className="referal">
            <h4>Your Referral Link</h4>
            <a>{userData.referral_code}</a>
            <div className="copy-btn">
              <button>Copy</button>
              <button>Share</button>
            </div>
          </div>
          <div className="logoutbtn">
            <span>Trems & Condition</span>
            <h6 onClick={handleLogout}>Logout</h6>
          </div>
        </div>
      </div>}
    </div>
  );
};
export default Topmenu;
