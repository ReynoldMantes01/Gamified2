import React, { useState, useEffect } from 'react';
import '../styles/FunFact.css';

const funFacts = {
    biology: [
        "The human body contains enough carbon to make around 900 pencils!",
        "A single human brain generates more electrical impulses in a day than all the telephones in the world combined!",
        "The DNA in all living things on Earth is related!",
        "Your body has over 37 trillion cells working together!",
        "Butterflies taste with their feet!",
        "Your heart beats about 100,000 times every day!",
        "Humans share 50% of their DNA with bananas!",
        "The human eye can distinguish about 10 million different colors!",
        "Octopuses have three hearts!",
        "A snail can sleep for three years at a time!",
        "The average person produces enough saliva in their lifetime to fill two swimming pools!",
        "Jellyfish have survived for over 650 million years without brains!",
        "Hummingbirds are the only birds that can fly backwards!",
        "A giraffe's tongue is about 50 centimeters long!",
        "Sloths take two weeks to digest their food!",
        "Honeybees can recognize human faces!",
        "The human skeleton renews itself completely every 10 years!",
        "Cats can't taste sweetness!",
        "A cockroach can live for a week without its head!",
        "The blue whale's heart is so big that a human could swim through its arteries!",
        "Penguins have knees!",
        "A chameleon's tongue is twice the length of its body!",
        "Elephants are the only mammals that can't jump!",
        "Polar bears have black skin under their white fur!",
        "The human body contains enough iron to make a 3-inch nail!",
        "Starfish don't have brains!",
        "A human's small intestine is about 20 feet long!",
        "Dolphins sleep with one half of their brain at a time!",
        "The average person has 67 different species of bacteria in their belly button!",
        "Koalas have fingerprints almost identical to humans!"
    ],
    physics: [
        "Light travels at 299,792,458 meters per second!",
        "A teaspoonful of neutron star would weigh about 6 billion tons!",
        "Time passes faster at your head than at your feet!",
        "Atoms are 99.99999999% empty space!",
        "The universe is expanding faster than the speed of light!",
        "One day on Venus is longer than its year!",
        "Sound travels about 4.3 times faster in water than in air!",
        "The coldest possible temperature is -273.15°C, known as absolute zero!",
        "Lightning strikes the Earth about 100 times every second!",
        "The Sun loses 4 million tons of mass every second!",
        "A day on Mars is only 40 minutes longer than a day on Earth!",
        "The Great Red Spot on Jupiter has been storming for at least 400 years!",
        "The speed of light in glass is slower than in a vacuum!",
        "The average cloud weighs about 1.1 million pounds!",
        "Black holes can 'sing' - they emit sound waves!",
        "The human body emits light that's 1,000 times weaker than what our eyes can see!",
        "Gravity bends light!",
        "Time stops at the edge of a black hole!",
        "The Sun is so large that about 1.3 million Earths could fit inside it!",
        "The fastest wind speed ever recorded was 253 miles per hour!",
        "The temperature at the Sun's core is about 15 million degrees Celsius!",
        "Astronauts grow taller in space!",
        "A single bolt of lightning contains enough energy to toast 100,000 slices of bread!",
        "The Earth's core is as hot as the surface of the Sun!",
        "The International Space Station travels at 17,500 miles per hour!",
        "A neutron star can spin at a rate of 600 rotations per second!",
        "The universe is mostly made of dark energy and dark matter!",
        "Radio waves travel at the speed of light!",
        "The largest known star, UY Scuti, is 1,700 times larger than our Sun!",
        "The Earth's magnetic field is weakening by about 5% every century!"
    ],
    chemistry: [
        "Gold is edible!",
        "One bucket of water contains more atoms than there are buckets of water in the Atlantic Ocean!",
        "Diamonds and pencils are made of the same material - carbon!",
        "The only letter not in the periodic table is the letter J!",
        "Water expands when it freezes, unlike most other substances!",
        "Glass is actually a liquid that flows very, very slowly!",
        "Helium is the only element discovered in space before Earth!",
        "Every atom in your body is billions of years old!",
        "The human body contains enough phosphorus to make 2,200 match heads!",
        "Coca-Cola was originally green!",
        "The rarest naturally occurring element is astatine!",
        "A pure copper penny would turn green in just 20 minutes!",
        "The only two liquid elements at room temperature are mercury and bromine!",
        "Salt is the only rock humans eat!",
        "Bananas are slightly radioactive!",
        "The first man-made plastic was created from peanuts!",
        "Hydrogen is the most abundant element in the universe!",
        "The average human body contains enough sulfur to kill all fleas on a dog!",
        "Oxygen makes up about 65% of the mass of the human body!",
        "Lightning creates ozone, which makes the air smell clean after a thunderstorm!",
        "The noble gases were once called inert gases because they didn't react with anything!",
        "The hardest natural substance is diamond, but it can be shattered by a hammer!",
        "The fastest chemical reaction takes place in less than a trillionth of a second!",
        "The human body contains enough carbon to make 900 pencils!",
        "The first artificial element was technetium!",
        "A rubber band is made of polymers that can stretch up to 500% their original length!",
        "The average pencil can draw a line 35 miles long!",
        "Gallium melts in your hand because its melting point is just 85.6°F!",
        "The only letter that doesn't appear in the periodic table is 'J'!",
        "A teaspoon of honey represents the life work of 12 bees!"
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
        <div className="fun-fact-container" style={{ userSelect: 'none' }}>
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
