import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bigbullTrading from "../../../assets/bigbull.png";
import menu from "../../../assets/menu.png";
import logo1 from "../../../assets/logo1.png";
import "./Bigbull.css";
import Topmenu from "../Topmenu";
import BottomMenu from "../BottomMenu";
import win from "../../../assets/w.png"
import loss from "../../../assets/l.png";
import cancel from "../../../assets/cancel.png"

const BiggBullTradingFirst = () => {
  const [viewPopup, setViewPopup] = useState(false);
  const [number, setNumbers] = useState("");
  // const [allEnteredValues, setAllEnteredValues] = useState([]);
  const [walletData,setWalletData] = useState([]);
  const [tradeSucess,setTradeSucess] = useState(false)
  const [selectedValues, setSelectedValues] = useState ([]);
  const [bigbullOpenNumberOne, setBigBullOpenNumberOne] = useState([]);
  const [showWinPopup, setShowWinPopup] = useState(false);
  const [showLossPopup, setShowLossPopup] = useState(false);
  const [timeOverPoup, setTimeOverPoup] = useState(false);

  const [allEnteredValues, setAllEnteredValues] = useState(() => {
    const savedData = localStorage.getItem("allEnteredValues");
    return savedData ? JSON.parse(savedData) : []; // Load from storage or set empty array
  });

  // Local User Data
  const userData = JSON.parse(localStorage.getItem("user"));

// 
useEffect(() =>{
  const fetcheWalletData = async () =>{
    try{
      const response = await fetch(`https://numasoft.org/magic_number/public/api/balance/${userData.id}`);
      const data = await response.json();
      console.log("teched Wallet", data.data.user.winning_amount);     
      if(response.ok){
        setWalletData(data.data.user)
      }else{
        alert("Data Is NOt Comming")
      }
    }
    catch (err){
      alert("Data In Catch Block")
    }
  }
  fetcheWalletData();
},[tradeSucess]);

  // View Popup
  const showPredictNumber = () => {
    setViewPopup(true);
  };
  // Close Popup
  const closePopupHandler = () => {
    setViewPopup(false);
  };
  //Number Submit Handler
  const allSubmitHander = () => {
    setAllEnteredValues((prev) => {
      const updatedValues = [...prev, number];
      
      // Store updated values in localStorage
      localStorage.setItem("allEnteredValues", JSON.stringify(updatedValues));
  
      return updatedValues;
    });
  
    setNumbers("");
  };
// 
  const formSubmitChangeHandler = async (e) => {
    e.preventDefault();

    if(timeLeft <= 10){
      setTimeOverPoup(true);
      return;
    }
    try {
      // Map each trade_number value into a separate fetch request
      const requests = allEnteredValues.map((tradeNumber) =>
        fetch("https://numasoft.org/magic_number/public/api/user-place-trade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            allusers_id: userData.id,
            trade_amount: 100,  // Fixed trade amount
            trade_number: tradeNumber,  // Send each value separately
            trade_type: "bigbull100",
          }),
        })
      );
  
      // Execute all requests simultaneously
      const responses = await Promise.all(requests);
      
      // Convert responses to JSON
      const data = await Promise.all(responses.map((res) => res.json()));

  
      // Update state after successful submission
      if (responses.every((res) => res.ok)) {
        setAllEnteredValues((prevValues) => {
          const updatedValues = [...prevValues, ...allEnteredValues]; 
          
          // Save updated values in localStorage
          localStorage.setItem("selectedValues", JSON.stringify(updatedValues));
        
          return updatedValues;
        });
        setViewPopup(false);
        setTradeSucess((pre) => !pre)
      } else {
        console.log("Error in one or more API requests");
      }
  
    } catch (err) {
      console.error("Error submitting trades:", err);
      alert("Error occurred while submitting trades");
    }
  };

  // Open Number
  useEffect(()=>{
    const fetchBillBullOne = async () =>{
      try{
        const response = await fetch("https://numasoft.org/magic_number/public/api/winning-number");
        const data = await response.json();
        if(response.ok){
          setBigBullOpenNumberOne(data.bigbull100);
        }else{
          console.log("error");
        }
      }catch(err){
        console.log("error", err); 
      }
      finally{
      
      }
    }
    fetchBillBullOne();
  }, [])

    // Timer 120 Sec Start
    const countdownDuration = 120; // 120 seconds (2 minutes)
    const fullDaySeconds = 86400; // 24 hours in seconds
    
    const getRemainingTime = () => {
      // Get the start of the day from localStorage or initialize at midnight
      let startOfDay = localStorage.getItem("startOfDay");
    
      if (!startOfDay) {
        const now = new Date();
        startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); // Midnight timestamp
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

      // Compare Vlaues and Show there
      useEffect(() => {
        if (timeLeft === 10) {
          compareWinningNumber();
          localStorage.removeItem("allEnteredValues"); // Clear stored trade numbers
          setAllEnteredValues([]); // Clear state
        }
      }, [timeLeft]);
      

      const compareWinningNumber = () =>{
        if(allEnteredValues.length === 0){
          return;
        }
        if (allEnteredValues.includes(bigbullOpenNumberOne)) {
          setShowWinPopup(true);
          setShowLossPopup(false); // Hide loss popup
          setAllEnteredValues([])
        } else {
          setShowWinPopup(false); // Hide win popup
          setShowLossPopup(true);
          setAllEnteredValues([])
        }
      }
      // useEffect(() => {
      //   const savedData = localStorage.getItem("allEnteredValues");
      //   if (savedData) {
      //     setAllEnteredValues(JSON.parse(savedData)); 
      //   }
      // }, []);

    useEffect(() => {
      localStorage.setItem(
        "allEnteredValues",
        JSON.stringify(allEnteredValues)
      );
    }, [allEnteredValues]);

      
  return (
    <div className="mainPage">
      <Topmenu />
      <div className="bigBullTrading" style={{ marginBottom: "20px" }}>
        <div className="bigbullinner">
          <img src={bigbullTrading} alt="Big Bull Image" />
        </div>
        <div className="bigbullopennumber">
          {timeLeft <= 10 && bigbullOpenNumberOne.length > 0 ? (
            <h3>{bigbullOpenNumberOne}</h3>
          ) : (
            <p>
              Predict your
              <br /> Numbers <br /> before the time <br /> runs out!
            </p>
          )}
        </div>
        <div className="bigbullmainpage">
          <p>Time Left</p>
          <span>{timeLeft} Sec</span>
        </div>
        <hr />
        <div className="slotButtom" style={{ marginTop: "15px" }}>
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
      </div>
      <div className="predictNumberFieldText">
        <span>Your Predictions </span>
      </div>
      <div className="bigbulltadebtnsection">
        {allEnteredValues.length > 0 ? (
          <div className="addmoreValues">
            <ul>
              {allEnteredValues.map((data, index) => (
                <li key={index}>
                  <span>{data}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                setViewPopup(true);
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button onClick={showPredictNumber}> + Enter Trade Number</button>
        )}
      </div>
      {viewPopup && (
        <div className="predictNumberPoup">
          <div
            className="predictNumberPoupHeader"
            style={{ marginBottom: "10px" }}
          >
            <button className="closeBtn" onClick={closePopupHandler}>
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
          <p style={{ color: "gray", fontSize: "12px" }}>
            Trades must involve two-digit numbers, ranging from 00 to 99.
            Participants are allowed to trade multiple pairs of numbers, with an
            entry fee applicable for each pair. For example, eligible pairs
            include 00, 55, 64, 87, and so on.
          </p>
          <div className="prizpool">
            <div className="slotButtom">
              <div className="slotButtom-inner">
                <span>Prize Pool</span>
                <p>₹10,000</p>
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
          </div>
          <form onSubmit={formSubmitChangeHandler}>
            <div className="bbtradenumber">
              <p>Your Trade Number</p>
              <div className="bbtradenumbers">
                <ul>
                  {allEnteredValues.map((data, index) => (
                    <li key={index}>
                      <span>{data}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p>Enter Trade Number</p>
            <div className="enterbbtradenumber">
              <input
                type="number"
                placeholder="00"
                maxLength={2}
                value={number}
                onChange={(e) => setNumbers(e.target.value)}
              />
              <button type="button" onClick={allSubmitHander}>
                +
              </button>
            </div>
            <div className="winnigamount">
              <p>You Win</p>
              <h6>$10,000</h6>
              <button type="submit">
                Pay 500 * {allEnteredValues.length} And Trade
              </button>
            </div>
          </form>
        </div>
      )}
      {showWinPopup && (
        // <div class="overlay"></div>
        <div className="winpoup">
          <img src={win} alt="" srcset="" />
          <p>Your Trade on</p>
          <span>{bigbullOpenNumberOne}</span>
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
          <img src={loss} alt="" srcset="" />
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
            <p>Now you Are Not able to Play try After 10 Sec</p>
            <button onClick={() => setTimeOverPoup(false)}>Close</button>
          </div>
        </div>
      )}
      <BottomMenu />
    </div>
  );
};
export default BiggBullTradingFirst;
