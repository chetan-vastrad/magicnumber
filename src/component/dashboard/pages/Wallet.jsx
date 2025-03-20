import { useEffect, useState } from "react";
import BottomMenu from "../BottomMenu";
import Topmenu from "../Topmenu";
import cancel from "../../../assets/cancel.png";
import qrimg from "../../../assets/qrimg.png";
const Wallet = () => {
  const [walletData, setWalletData] = useState([]);
  const [amountChangeHandlre, setAmountChangeHandler] = useState("");
  const [showErrorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [storeAmount, setStoreAmount] = useState("");
  const [showAddAmount, setShowAddAmount] = useState(false);
  const [showUpiForm, setShowUpiForm] = useState(false);
  const [upiTransactionID, setUpiTransactionID] = useState("");
  const [recivedRes, setRecivedRes] = useState([]);
  const [loading, setLoading] = useState(true)
  const [allRequest, setAllRequest] = useState(true);
  const [withdrawValue, setWithDrawValue] = useState("");
  const [withdrawUpiID, setWithdrwaUpiId] = useState ("")
  const [showWithDraw, setShowWithDraw] = useState (false)
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetcheWalletData = async () => {
      try {
        const response = await fetch(
          `https://numasoft.org/magic_number/public/api/balance/${userData.id}`
        );
        const data = await response.json();
        if (response.ok) {
          setWalletData(data.data.user);
          setRecivedRes(data.data.transactions)
        } else {
          alert("Data Is NOt Comming");
        }
      } catch (err) {
        alert("Data In Catch Block");
      }finally{
        setLoading(false);
      }
    };
    fetcheWalletData();
  }, []);

  //Amount Fomr Show
  const showAmountForm = () => {
    setShowAddAmount(true);
    setAllRequest(false);
  };
  // WithDraw Fomr Show
  const shoWithdraw = () =>{
    setShowWithDraw(true);
    setAllRequest(false);
  }
  const amountOnSubmit = (e) => {
    e.preventDefault();
    const enteredAmount = parseFloat(amountChangeHandlre);
    setStoreAmount(enteredAmount);
    if (amountChangeHandlre.trim === "") {
      setErrorMessage("Please Enter An Amount ");
      setErrorPopup(true);
      return;
    }
    if (isNaN(enteredAmount) || enteredAmount < 100) {
      setErrorMessage("Minimum top-up amount is ₹100.");
      setErrorPopup(true);
      return;
    }
    setAmountChangeHandler("");
    setShowUpiForm(true);
    setShowAddAmount(false);
  };
  // Balnce Request Api 
  const upiFormSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://numasoft.org/magic_number/public/api/user-balance-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userData.id,
            transaction_id: upiTransactionID,
            requested_balance: storeAmount,
          }),
        }
      );
      const data = await response.json();
      if(response.ok){
        setShowUpiForm(false);
        setAllRequest(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      
    }
  };
  // Withdrwa Request API
const withdrawUpiIDFromHandler = async (e) =>{
e.preventDefault();
try{
  const response = await fetch("https://numasoft.org/magic_number/public/api/user-Withdrawal-request",
    {
     method:"POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       user_id: userData.id,
       withdrawal_amount: withdrawValue,
       upi_id : withdrawUpiID,
     }),
    }
  )
  const data =await response.json();
  if(response.ok){
    console.log(data);
  }
  
}catch(err){
  console.log(err);
}
}
  return (
    <div>
      <div className="mainPage">
        <Topmenu />
        {loading ? (
          <div className="loading-overlay">
            <p>Loading...</p>
          </div>
        ) : (
          <div>
            <div className="walletsection">
              <div class="predictbigbullenterNumber">
                <div class="bigbullbalances">
                  <div class="bigbullbalance">
                    <span>Balance</span>
                    <p>{walletData.balance_amount}</p>
                  </div>
                  <div class="bigbullbalance">
                    <span>Winnigs</span>
                    <p>{walletData.winning_amount}</p>
                  </div>
                  <div class="bigbullbalance">
                    <span>Bonus</span>
                    <p>{walletData.bonus_amount}</p>
                  </div>
                </div>
                <div class="predictNumberAddBtn">
                  <p onClick={showAmountForm}>Add</p>
                  <p onClick={shoWithdraw}>Withdraw</p>
                </div>
              </div>
            </div>
            {allRequest && (
              <div className="allrequest">
                {recivedRes.map((item, index) => (
                  <ul key={index}>
                    <li>
                      <span>Amount</span> <br /> {item.usage_amount}
                    </li>
                    <li>
                      <span>Result</span> <br />
                      {item.status}
                    </li>
                    <li>
                      <span>Type</span>
                      <br /> {item.type}
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
        )}
        {showAddAmount && (
          <div className="addamount">
            <form onSubmit={amountOnSubmit}>
              <h3>Add Balnace</h3>
              <label htmlFor="">Enter The Amount To Add</label>
              <input
                type="text"
                placeholder="₹"
                value={amountChangeHandlre}
                onChange={(e) => {
                  setAmountChangeHandler(e.target.value);
                }}
              />
              <span>Min Topup Is 100</span>
              <button>+ Add Balance</button>
            </form>
          </div>
        )}
        {showUpiForm && (
          <div className="addupi">
            <h3>Add Balance</h3>
            <div className="qrcode">
              <img src={qrimg} alt="Qr Code" srcset="" />
              <span>Scan To Pay Any UPI App</span>
              <p>abc@upi.com</p>
            </div>
            <span>
              After completing the payment, it is mandatory to enter the amount
              you have added and the UPI transaction ID.
            </span>
            <div className="addupifrom">
              <form onSubmit={upiFormSubmitHandler}>
                <h4>Amount Added</h4>
                <input type="text" value={storeAmount} readOnly />
                <h4>UPI Transaction ID</h4>
                <input
                  type="text"
                  placeholder="example@upi.com"
                  onChange={(e) => {
                    setUpiTransactionID(e.target.value);
                  }}
                />
                <button>+ Add Balance</button>
              </form>
            </div>
          </div>
        )}
        {showErrorPopup && (
          <div className="overlay">
            <div className="errorPopup">
              <img src={cancel} alt="Cancel" />
              <p>{errorMessage}</p>
              <button onClick={() => setErrorPopup(false)}>Close</button>
            </div>
          </div>
        )}
       {showWithDraw && <div className="withdraw">
          <form onSubmit={withdrawUpiIDFromHandler}>
            <h3>Withdraw</h3>
            <h5>Enter The Withdraw Amount</h5>
            <input type="number" placeholder="₹ 1000" value={withdrawValue} onChange={(e)=>{setWithDrawValue(e.target.value)}}/>
            <span></span>
            <h5>UPI ID</h5>
            <input type="text" placeholder="text@upi.com" value={withdrawUpiID} onChange={(e)=>{setWithdrwaUpiId(e.target.value)}} />
            <button>WithDraw</button>
          </form>
        </div>}
        <BottomMenu />
      </div>
    </div>
  );
};
export default Wallet;
