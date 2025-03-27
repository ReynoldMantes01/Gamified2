import { useState, useEffect } from 'react';

const useFunFact = () => {
    const [showFunFact, setShowFunFact] = useState(false);

    const showFunFactWithDelay = () => {
        setShowFunFact(true);
        return new Promise((resolve) => {
            // The FunFact component has its own timer to hide itself
            setTimeout(() => {
                setShowFunFact(false);
                resolve();
            }, 3000);
        });
    };

    return { showFunFact, showFunFactWithDelay };
};

export default useFunFact;
