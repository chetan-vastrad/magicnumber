import { useEffect, useState } from "react";
import Topmenu from "../Topmenu";
import BottomMenu from "../BottomMenu";

const WinningStrategy = () => {
    const [strategyData, setStrategyData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        if (hasFetched) return; // Prevent second API call
        setHasFetched(true);
        
        const fetchData = async () => {
            try {
                const response = await fetch("https://numasoft.org/magic_number/public/api/winningstrargy");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                
                setStrategyData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [hasFetched]);

    return (
        <div>
            <div className="mainPage">
                <Topmenu />
                <h2>Winning Strategy</h2>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
                <div>
                {strategyData.length > 0 ? (
                        <ul>
                            {strategyData.data.map((item, index) => (
                                <li key={index}>{item}</li> // Adjust this based on API structure
                            ))}
                        </ul>
                    ) : (
                        !loading && <p>No strategy available.</p>
                    )}
                </div>
                <BottomMenu />
            </div>
        </div>
    );
};

export default WinningStrategy;
