
import { useState,useEffect } from "react";
import "./Bigbull.css";

const PredictBigBullNumber = ({onClose, numberGettingFromPredict}) => { 
  const [bigBullOne, setBigBullOne] = useState ("")
  const [addBigbullNumber, setAddBigbullNumber] = useState ([])
  const [walletData,setWalletData] = useState([]);
  const [tradeSucess,setTradeSucess] = useState(false);
  const [selectedValues, setSelectedValues] = useState ([]);

    // Local User Data
    const userData = JSON.parse(localStorage.getItem("user"));
  
    // Fetching Data From Main Wallet
useEffect(() =>{
  const fetcheWalletData = async () =>{
    try{
      const response = await fetch(`https://numasoft.org/magic_number/public/api/balance/${userData.id}`);
      const data = await response.json();  
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
// console.log("wallet" ,walletData);

// Input Entered Values Stored Here
  const bigBullChnageHandlerOne = (e) =>{
    setBigBullOne(e.target.value);
  }

// All Values Coming here
  const addNuumberHandler = () =>{
    setAddBigbullNumber((prev) => [...prev, bigBullOne]);
    setBigBullOne("")
  }

  const bigBullSubmitHandlerHandlerTwo = async (e) =>{
    e.preventDefault()

    try {
      // Map each trade_number value into a separate fetch request
      const requests = addBigbullNumber.map((tradeNumber) =>
        fetch("https://numasoft.org/magic_number/public/api/user-place-trade", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            allusers_id: userData.id,
            trade_amount: 500,  // Fixed trade amount
            trade_number: tradeNumber,  // Send each value separately
            trade_type: "bigbull500",
          }),
        })
      );
  
      // Execute all requests simultaneously
      const responses = await Promise.all(requests);
      
      // Convert responses to JSON
      const data = await Promise.all(responses.map((res) => res.json()));
      console.log(data);
      
      // Update state after successful submission
      if (responses.every((res) => res.ok)) {
        setSelectedValues({ addBigbullNumber }); 
        setTradeSucess((pre) => !pre)
        numberGettingFromPredict(addBigbullNumber);
        onClose()

      } else {
        console.log("Error in one or more API requests");
      }
  
    } catch (err) {
      console.error("Error submitting trades:", err);
      alert("Error occurred while submitting trades");
    }
  }
  console.log(addBigbullNumber);
  
  return (
    <>
      <div class="overlay"></div>
      <div className="predictbigbull">
        <div className="predictbigbullnumber">
          <button className="closeBtn" onClick={onClose}>
            X
          </button>
          <div className="predictbigbullenterNumber">
            <div className="bigbullbalances">
              <div className="bigbullbalance">
                <span>Balance</span>
                <p>{walletData.balance_amount}</p>
              </div>
              <div className="bigbullbalance">
                <span>Winnigs</span>
                <p>{walletData.winning_amount}</p>
              </div>
              <div className="bigbullbalance">
                <span>Bonus</span>
                <p>{walletData.bonus_amount}</p>
              </div>
            </div>
            <div className="predictNumberAddBtn">
              <p>Add</p>
              <p>Withdraw</p>
            </div>
          </div>
          <p className="bigbullText">
            Trades must involve two-digit numbers, ranging from 00 to 99.
            Participants are allowed to trade multiple pairs of numbers, with an
            entry fee applicable for each pair. <br />
            For example, eligible pairs include 00, 55, 64, 87, and so on.
            <br />
            10% Platform charge is applicable for each win.
          </p>
          <div className="prizpool">
            <div className="slotButtom">
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
          <form  onSubmit={bigBullSubmitHandlerHandlerTwo}>
            <div className="bbtradenumber">
              <p>Your Trade Number</p>
              <div className="bbtradenumbers">
                <ul>
                  {addBigbullNumber.map((data, index) => (
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
                maxLength={99}
                onChange={bigBullChnageHandlerOne}
                value={bigBullOne}
              />
              <button type="button" onClick={addNuumberHandler}>
                +
              </button>
            </div>
            <div className="winnigamount">
              <p>You Win</p>
              <h6>$50,000</h6>
              <button type="submit" >
                Pay 500 * { addBigbullNumber.length}  And Trade
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default PredictBigBullNumber;
