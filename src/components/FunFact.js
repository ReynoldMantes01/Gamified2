import React, { useState, useEffect } from 'react';
import '../styles/FunFact.css';

const funFacts = {
    biology: [
        "The human body contains enough carbon to make around 900 pencils!",
        "A single human brain generates more electrical impulses in a day than all the telephones in the world combined!",
        "The DNA in all living things on Earth is related!",
        "Your body has over 37 trillion cells working together!",
        "Butterflies taste with their feet!"
    ],
    physics: [
        "Light travels at 299,792,458 meters per second!",
        "A teaspoonful of neutron star would weigh about 6 billion tons!",
        "Time passes faster at your head than at your feet!",
        "Atoms are 99.99999999% empty space!",
        "The universe is expanding faster than the speed of light!"
    ],
    chemistry: [
        "Gold is edible!",
        "One bucket of water contains more atoms than there are buckets of water in the Atlantic Ocean!",
        "Diamonds and pencils are made of the same material - carbon!",
        "The only letter not in the periodic table is the letter J!",
        "Water expands when it freezes, unlike most other substances!"
    ]
};

const FunFact = ({ onLoadingComplete }) => {
    const [fact, setFact] = useState('');
    const [category, setCategory] = useState('');
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Select random category and fact
        const categories = Object.keys(funFacts);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const facts = funFacts[randomCategory];
        const randomFact = facts[Math.floor(Math.random() * facts.length)];

        setCategory(randomCategory);
        setFact(randomFact);

        // Check internet connectivity
        const connectionSpeed = navigator.connection ? navigator.connection.downlink : 10;
        const loadingTime = connectionSpeed < 1 ? 5000 : 3000; // Longer loading time for slower connections

        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) {
                onLoadingComplete();
            }
        }, loadingTime);

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    if (!isVisible) return null;

    return (
        <div className="fun-fact-container">
            <div className="fun-fact-content">
                <div className="loading-spinner"></div>
                <h3>Did you know?</h3>
                <p className="fact-text">{fact}</p>
                <p className="category-text">Category: {category.charAt(0).toUpperCase() + category.slice(1)}</p>
            </div>
        </div>
    );
};

export default FunFact;
