import { useState, useEffect } from "react";

const TimerComponent = ({ timerRunning }) => {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        let interval;

        if (timerRunning) {
            interval = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerRunning]);

    return (
        <div className="text-white text-xl">
            Time: {elapsedTime}s
        </div>
    );
};

export default TimerComponent;
