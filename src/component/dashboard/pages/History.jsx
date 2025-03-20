import { useEffect, useState } from "react";
import Topmenu from "../Topmenu";
import BottomMenu from "../BottomMenu";
import "./Allpages.css";
import BullTradinImg from "../../../assets/bull_trading.png";

const History = () => {
    const [err, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [winningData, setWinningData] = useState([]);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserData(JSON.parse(storedUser)); // Load user data from localStorage
        }
    }, []);

    useEffect(() => {
        if (!userData || !userData.id) return; // Ensure userData is available

        const fetchHistory = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    `https://numasoft.org/magic_number/public/api/trades/history/${userData.id}`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                console.log("Fetched data:", data); // Debugging
                setWinningData(data.data || []); // Ensure data is set correctly
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [userData]); // Fetch when userData is available

    console.log("Winning Data:", winningData); // Debugging

    return (
        <div>
            <div className="mainPage">
                <Topmenu />
                <h2>History</h2>
                <div className="bulltradinghistory">
                    <img src={BullTradinImg} alt="Trading History" />
                    <div className="maintradehistrorybg">
                        {loading ? (
                            <p>Loading...</p>
                        ) : err ? (
                            <p>Error: {err}</p>
                        ) : winningData.length > 0 ? (
                            winningData.map((trade) => (
                                <div className="alltrade" key={trade.id}>
                                    <ul className="tradeamount">
                                        <li><strong>Trade Amount</strong></li>
                                        <li>{trade.trade_amount || "N/A"}</li>
                                        <li>{trade.updated_at ? new Date(trade.updated_at).toLocaleString() : "N/A"}</li>
                                    </ul>
                                    <ul className="result">
                                        <li><strong>Result</strong></li>
                                        <li>{trade.status || "N/A"}</li>
                                    </ul>
                                    <ul className="earning">
                                        <li><strong>Earning</strong></li>
                                        <li>{trade.winning_amount ?? "N/A"}</li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <p>No trade history available</p>
                        )}
                    </div>
                </div>
                <BottomMenu />
            </div>
        </div>
    );
};

export default History;
