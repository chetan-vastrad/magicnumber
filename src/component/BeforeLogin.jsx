import { useState, useEffect } from "react"
import styles from "../App"
import mainImage from "../assets/mainLogo.png"
import bullTrading from "../assets/bull_trading.png"
import logo1 from "../assets/logo1.png"
import menu from "../assets/menu.png"
import predictLogo from "../assets/predictlogo-1.png"
import Login from "./loginpages/Login"
const BeforeLogin = () => {
    const [showImage, setShowImage] = useState(true);
    const [showMyDiv, setShowMyDiv] = useState(false)
    const myValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowImage(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    const hideMyDiv = () => {
        setShowMyDiv(true);
    }
    return (
        <div>
            {!showMyDiv ? <div className="" onClick={hideMyDiv}>
                {showImage ? (
                    <div className="bgforAllPages">
                        <img src={mainImage} alt="mainlogo" className="mainlogo" />
                    </div>
                ) : (
                    <div className="mainPage">
                        <div className="mainHeader">
                            <img src={menu} alt="" srcset="" />
                            <img src={logo1} alt="" />
                            <img src={menu} alt="" srcset="" />
                        </div>
                        <div className="bullTrading">
                            <img src={bullTrading} alt="Bull Logo" srcset="" />
                            <img src={predictLogo} alt="Prdict Bull Logo" srcset="" />
                            <p>Time Left</p>
                            <span>120 Sec </span>
                        </div>
                        <div className="predictNumberInput">
                            <input type="text" />
                            <div className="predictionInput">
                                <span>Your Prediction</span>
                            </div>
                        </div>
                        <div className="predictNumberSection">
                            <h3>Predict Your Number</h3>
                            <span>You can predict multiple number, mulitiple times</span>
                        </div>
                        <div className="predictNumbers">
                            <ul className="predictNumber">
                                {myValues.map((value, index) => (
                                    <li key={index}>{value}</li> // Rendering each value inside <li>
                                ))}
                            </ul>
                        </div>
                    </div>
                )}
            </div> :
                <Login />
            }

        </div>
    )
}
export default BeforeLogin;