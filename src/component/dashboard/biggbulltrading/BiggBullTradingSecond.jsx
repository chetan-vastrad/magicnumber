import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackImg from "../../../assets/back.png";
import Logo1 from "../../../assets/logo1.png";
import Menu from "../../../assets/menu.png";
import bigbull from "../../../assets/bigbull.png";
import opennumber from "../../../assets/opennumber.png";
import PredictBigBullNumber from "./PredictBigBullNumber";
import Topmenu from "../Topmenu";
import BottomMenu from "../BottomMenu";
const BigBullTradingSecond = () => {
  const [showNumberPopup, setShowNumberPopup] = useState(false);
  const [predictNumber, setPredictNumber] = useState([]);
  const [openNumberBigBullTwo, setOpenNumberBigBullTwo] = useState([]);

  const numberPopupHandler = () => {
    setShowNumberPopup((prev) => !prev);
  };
  const closeBtnInChildHandler = () => {
    setShowNumberPopup(false);
  };
  const numberGettingFrom = (numbers) => {
    setPredictNumber(numbers);
    // setAddBigbullNumber((prev) => [...prev, bigBullOne]);
  };
  // All Entere Data Should Be store in Local
  useEffect(() => {
    // Load saved data from localStorage when the component mounts
    const savedData = localStorage.getItem("predictNumber");
    if (savedData) {
      setPredictNumber(JSON.parse(savedData));
    }
  }, []);

  //Open Number API
  useEffect(() => {
    const fetchBigBullTwo = async () => {
      try {
        const response = await fetch(
          "https://numasoft.org/magic_number/public/api/winning-number"
        );
        const data = await response.json();
        if (response.ok) {
          console.log("data", data);
          setOpenNumberBigBullTwo(data.bigbull500);
        } else {
          console.log("erro");
        }
      } catch (err) {
        console.log(err);
      } finally {
      }
    };
    fetchBigBullTwo();
  });

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

  return (
    <div className="bigbulltrading">
      <Topmenu />
      <div className="bigBullTrading" style={{ marginBottom: "20px" }}>
        <div className="bigbullinner">
          <img src={bigbull} alt="Big Bull Image" />
        </div>
        <div className="bbopennumber">
          {timeLeft <=10 && openNumberBigBullTwo.length > 0 ? (
            <h3>{openNumberBigBullTwo}</h3>
          ) : (
            <h1>Chetna</h1>
          )}
        </div>
        <div className="bbtime">
          <p>TIME LEFT</p>
          <span>{timeLeft} SEC</span>
        </div>
        <hr />
        <div className="slotButtom" style={{ marginTop: "10px" }}>
          <div className="slotButtom-inner">
            <span>Prize Pool</span>
            <p>₹50,000</p>
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
      </div>
      <div className="predictNumberFieldText">
        <span>Your Predictions </span>
      </div>
      <div className="bigbulltadebtnsection">
        {predictNumber.length > 0 ? (
          <div className="addmoreValues">
            <ul>
              {predictNumber.map((data, index) => (
                <li key={index}>
                  <span>{data}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                setShowNumberPopup(true);
              }}
            >
              +
            </button>
          </div>
        ) : (
          <button onClick={numberPopupHandler}> + Enter Trade Number</button>
        )}
      </div>
      {showNumberPopup && (
        <PredictBigBullNumber
          onClose={closeBtnInChildHandler}
          numberGettingFromPredict={numberGettingFrom}
        />
      )}
      <BottomMenu />
    </div>
  );
};
export default BigBullTradingSecond;
