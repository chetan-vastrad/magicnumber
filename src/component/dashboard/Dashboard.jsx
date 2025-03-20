import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bullTrading from "../../assets/bull_trading.png";
import bigbullTrading from "../../assets/bigbull.png";
import BottomMenu from "./BottomMenu";
import Topmenu from "./Topmenu";
import win from "../../assets/w.png";
import loss from "../../assets/l.png";
import cancel from "../../assets/cancel.png";
const Dashboard = () => {
  const [viewTradePop, setViewTradePop] = useState(false);
  const [selectedValues, setSelectedValues] = useState(null);
  const myValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [enteredBullAmount, setEnteredBullAmount] = useState(null);
  const [minTradAmount, setMinTradeAmount] = useState(false);
  const [viewAllData, setViewAllData] = useState([]);
  const [tradeSucess, setTradeSucess] = useState(false);
  const [walletData, setWalletData] = useState([]);
  const [bullOpenNumber, setBullOpenNumber] = useState([]);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showLossPopup, setShowLossPopup] = useState(false);
  const [timeOverPoup, setTimeOverPoup] = useState(false);
  const [pageLoading, setLoading] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));

  // Timer 120 Sec Start
  const countdownDuration = 120; // 120 seconds (2 minutes)
  const fullDaySeconds = 86400; // 24 hours in seconds

  const getRemainingTime = () => {
    // Get the start of the day from localStorage or initialize at midnight
    let startOfDay = localStorage.getItem("startOfDay");

    if (!startOfDay) {
      const now = new Date();
      startOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
      ).getTime(); // Midnight timestamp
      localStorage.setItem("startOfDay", startOfDay);
    } else {
      startOfDay = parseInt(startOfDay);
    }

    // Calculate elapsed time since midnight
    const elapsedTime = Math.floor((Date.now() - startOfDay) / 1000);

    // Get current 120s slot number (0 to 719)
    const currentSlot = Math.floor(elapsedTime / countdownDuration);

    // Remaining time in the current slot
    return countdownDuration - (elapsedTime % countdownDuration);
  };

  // Function to calculate remaining time
  const [timeLeft, setTimeLeft] = useState(getRemainingTime());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 1) return prevTime - 1;

        // Reset countdown for next slot
        return countdownDuration;
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  // Timer 120 Sec End

  // All Entere Data Should Be store in Local
  useEffect(() => {
    // Load saved data from localStorage when the component mounts
    const savedData = localStorage.getItem("viewAllData");
    if (savedData) {
      setViewAllData(JSON.parse(savedData));
    }
  }, []);

  // Getting Values From Enter number

  const gettingValues = (e) => {
    // setTimeOverPoup(true);
    // return;
    if (timeLeft <= 10) {
      console.log("Trade selection not allowed at 10 seconds!");
      setTimeOverPoup(true); // Show error popup
      return; // Stop function execution
    }

    const newValue = e.target.textContent;
    setSelectedValues(newValue); // Store the selected number
    setViewTradePop(true);
  };
  const closePopup = () => {
    setViewTradePop(false);
  };
  const bullAmount = (e) => {
    setEnteredBullAmount(e.target.value);
  };

  // Submit Trade Form
  const submitBullTrade = async (e) => {
    e.preventDefault();

    if (timeLeft <= 10) {
      console.log("Trade selection not allowed at 10 seconds!");
      setTimeOverPoup(true); // Show error popup
      return; // Stop function execution
    }
    if (enteredBullAmount < 10) {
      setMinTradeAmount(true);
      return;
    }
    try {
      const response = await fetch(
        "https://numasoft.org/magic_number/public/api/user-place-trade",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            allusers_id: userData.id,
            trade_amount: enteredBullAmount,
            trade_number: selectedValues,
            trade_type: "bull",
          }),
        }
      );

      const data = await response.json();
      console.log(data.user);
      if (response.ok) {
        const allData = {
          enteredBullAmount: enteredBullAmount,
          selectedValues: selectedValues,
        };
        // setViewAllData((prevData) => [...prevData, allData]);
        setViewAllData((prevData) => {
          const updatedData = [...prevData, allData];
          // Save updated data in localStorage
          localStorage.setItem("viewAllData", JSON.stringify(updatedData));
          return updatedData;
        });

        // Update localStorage with new values
        setViewTradePop((pre) => !pre);
        setEnteredBullAmount(" ");
        setTradeSucess((pre) => !pre);
      } else {
        console.error("Failed to fetch wallet balance:", data.message);
      }
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");

    if (!isLoggedIn) {
      navigate("/login"); // Redirect to login if user is not logged in
    }
  }, [navigate]);

  // Wallet Balance
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        console.log("Fetching wallet balance...");
        const response = await fetch(
          `https://numasoft.org/magic_number/public/api/balance/${userData.id}`
        );

        const data = await response.json();
        console.log("Fetched Wallet Data:", data.data.user.winning_amount);
        setWalletData(data.data.user);
      } catch (err) {
        console.error("Error fetching wallet balance:", err);
        alert("Failed to fetch wallet balance. Please check your network.");
      } finally {
      }
    };

    fetchWalletData();
  }, [tradeSucess]);

  // Winning Number Api
  useEffect(() => {
    const fetcOpenNumber = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://numasoft.org/magic_number/public/api/winning-number"
        );
        const data = await response.json();
        if (response.ok) {
          setBullOpenNumber(data.bull);
        } else {
          console.log("error");
        }
      } catch (err) {
        console.log("error", err);
      } finally {
        setLoading(false);
      }
    };
    fetcOpenNumber();
  }, []);
  // close Win Popup Button

  useEffect(() => {
    if (timeLeft === 10) {
      compareWinningNumber();
      localStorage.removeItem("viewAllData"); // Remove data from storage
    }
  }, [timeLeft]); // Only runs when timeLeft changes
  const compareWinningNumber = () => {
    if (viewAllData.length === 0) {
      return;
    }
    if (viewAllData.some((item) => item.selectedValues === bullOpenNumber)) {
      setShowWinPopup(true);
      setShowLossPopup(false); // Hide loss popup
      setViewAllData([]);
    } else {
      setShowWinPopup(false); // Hide win popup
      setShowLossPopup(true);
      setViewAllData([]);
    }
  };
  return (
    <div>
      <div className="mainPage">
        <Topmenu />
        <div className="bulltrading-main">
          <div className="bullTrading">
            <img src={bullTrading} alt="Bull Logo" srcSet="" />
            <div className="predictLogo">
              {timeLeft <= 10 && bullOpenNumber.length > 0 ? (
                <h3>{bullOpenNumber}</h3>
              ) : (
                <p>
                  Predict your Numbers
                  <br />
                  before the time
                  <br />
                  runs out!
                </p>
              )}
            </div>
            <p>Time Left</p>
            <span>{timeLeft} Sec </span>
          </div>
          <div className="predictNumberField">
            <div className="predictNumberFieldText">
              <span>Your Prediction</span>
            </div>
            <div className="predictNumberFieldInner">
              <ul>
                {viewAllData && viewAllData.length > 0 ? (
                  viewAllData.map((item, index) => (
                    <li key={index}>
                      <span>{item.selectedValues}</span>
                      <p>- ₹{item.enteredBullAmount}</p>
                    </li>
                  ))
                ) : (
                  <p></p>
                )}
              </ul>
            </div>
          </div>
          <div className="predictNumberSection">
            <h3>Predict Your Number</h3>
            <span>You can predict multiple number, mulitiple times</span>
          </div>
          <div className="predictNumbers">
            <ul className="predictNumber">
              {myValues.map((value, index) => (
                <li key={index} onClick={gettingValues}>
                  {value}
                </li> // Rendering each value inside <li>
              ))}
            </ul>
          </div>
        </div>
        {/* Predic Number Poupo */}
        <div className="bigBullTrading">
          <div className="bigbullinner">
            <img src={bigbullTrading} alt="Big Bull Image" />
          </div>
          <div className="disbigbull">
            <span>
              Trades must involve two-digit numbers, ranging from 00 to 99.
              Participants are allowed to trade multiple pairs of numbers, with
              an entry fee applicable for each pair. For example, eligible pairs
              include 00, 55, 64, 87, and so on. 10% Platform charge is
              applicable for each win.
            </span>
          </div>
          <div className="slotOne">
            <Link to="/biggbullfirst">
              <div className="slotHead">
                <button>Slot 1</button>
                <div>
                  <p>Time </p>
                  <span>{timeLeft} SEC</span>
                </div>
              </div>
              <hr className="centerrow" />
              <div className="slotButtom">
                <div className="slotButtom-inner">
                  <span>Prize Pool</span>
                  <p>₹100,000</p>
                </div>
                <div className="slotButtom-inner">
                  <span>Spots</span>
                  <p>100/100</p>
                </div>
                <div className="slotButtom-inner">
                  <span>Entry</span>
                  <p>₹100</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="slotOne">
            <Link to="/biggbullsecond">
              <div className="slotHead">
                <button>Slot 2</button>
                <div>
                  <p>Time </p>
                  <span>{timeLeft} Sec </span>
                </div>
              </div>
              <hr className="centerrow" />
              <div className="slotButtom">
                <div className="slotButtom-inner">
                  <span>Prize Pool</span>
                  <p>₹100,000</p>
                </div>
                <div className="slotButtom-inner">
                  <span>Spots</span>
                  <p>100/100</p>
                </div>
                <div className="slotButtom-inner">
                  <span>Entry</span>
                  <p>₹500</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {viewTradePop && (
        <div className="predictNumberPoup">
          <div className="predictNumberPoupHeader">
            <button onClick={closePopup} className="closeBtn">
              X
            </button>
            <div className="predictNumberWalletInner">
              <div className="predictNumberWallet">
                <span>Balance</span>
                <p>{walletData.balance_amount}</p>
              </div>
              <div className="predictNumberWallet">
                <span>Winning</span>
                <p>{walletData.winning_amount}</p>
              </div>
              <div className="predictNumberWallet">
                <span>Bonus</span>
                <p>{walletData.bonus_amount}</p>
              </div>
            </div>
            <div className="predictNumberAddBtn">
              <p>Add</p>
              <p>Withdraw</p>
            </div>
          </div>
          <div className="popupCenter">
            <form onSubmit={submitBullTrade}>
              <h4>Trade On</h4>
              <div className="enteredValue">
                <h5>{selectedValues}</h5>
              </div>
              <h4>Enter your Trade Amount</h4>
              <input
                type="number"
                onChange={bullAmount}
                value={enteredBullAmount}
                placeholder="₹ 10"
              />
              <span>* 8</span>
              {minTradAmount && (
                <p style={{ color: "red", marginBottom: "0" }}>
                  Min Trade Amount Should be 100
                </p>
              )}
              <p>The trades are allowed from ₹10 and above ₹10.</p>
              <div className="addBonusBtn">
                <input type="checkbox" />
                <span>Add 50% of fee from Bonus.</span>
              </div>
              <div className="totalAmount">
                <h6>You Win</h6>
                <h6>{`${enteredBullAmount * 8}`}</h6>
              </div>
              <button className="tradeBtn">Trade</button>
            </form>
          </div>
        </div>
      )}
      {showWinPopup && (
        // <div class="overlay"></div>
        <div className="winpoup">
          <img src={win} alt="" srcSet="" />
          <p>Your Trade on</p>
          <span>{bullOpenNumber}</span>
          <h3>Matched the Open Number.</h3>
          <p>You won</p>
          <h2>$10000</h2>
          <div className="winpoupclosebtn">
            <button onClick={() => setShowWinPopup(false)}>Close</button>
            <button onClick={() => setShowWinPopup(false)}>Trade Again</button>
          </div>
        </div>
      )}
      {showLossPopup && (
        <div className="loss">
          <img src={loss} alt="" srcSet="" />
          <h3>None of your trades matched the Open Number.</h3>
          <div className="winpoupclosebtn">
            <button
              onClick={() => {
                setShowLossPopup(false);
              }}
            >
              Close
            </button>
            <button
              onClick={() => {
                setShowLossPopup(false);
              }}
            >
              Trade Again
            </button>
          </div>
        </div>
      )}
      {timeOverPoup && (
        <div className="overlay">
          <div className="errorPopup">
            <img src={cancel} alt="Cancel Img" />
            <p>Now you Are able to Play try After 10 Sec</p>
            <button onClick={() => setTimeOverPoup(false)}>Close</button>
          </div>
        </div>
      )}
      <BottomMenu />
    </div>
  );
};
export default Dashboard;
