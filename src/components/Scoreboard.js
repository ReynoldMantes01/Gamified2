import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import bgImage from '../assets/bg.gif';

const SCORES_PER_PAGE = 6;

const Scoreboard = ({ onMainMenu }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [scores, setScores] = useState([
        { name: "Richard Lopez", score: 850, rank: 1, timestamp: "2025-02-18" },
        { name: "Reynold Mantes", score: 780, rank: 2, timestamp: "2025-02-18" },
        { name: "Jayson Llanes", score: 720, rank: 3, timestamp: "2025-02-18" },
        { name: "Cyrus Judiawon", score: 650, rank: 4, timestamp: "2025-02-18" },
        { name: "Hazzel Mercado", score: 580, rank: 5, timestamp: "2025-02-18" },
        { name: "Joanna Indic", score: 520, rank: 6, timestamp: "2025-02-18" },
        { name: "Kyle Pasuquin", score: 450, rank: 7, timestamp: "2025-02-18" }
    ]);

    useEffect(() => {
        const db = getDatabase();
        const scoresRef = ref(db, 'users');

        onValue(scoresRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const userScores = [];
                Object.entries(data).forEach(([userId, userData]) => {
                    if (userData.miniGameScores) {
                        Object.entries(userData.miniGameScores).forEach(([timestamp, scoreData]) => {
                            userScores.push({
                                name: userData.profile?.username || 'Anonymous',
                                score: scoreData.score,
                                timestamp: new Date(parseInt(timestamp)).toLocaleDateString()
                            });
                        });
                    }
                });
                
                // Sort scores and add ranks
                userScores.sort((a, b) => b.score - a.score);
                userScores.forEach((score, index) => {
                    score.rank = index + 1;
                });
                
                setScores(userScores);
            }
        });
    }, []);

    const startIndex = currentPage * SCORES_PER_PAGE;
    const endIndex = startIndex + SCORES_PER_PAGE;
    const currentScores = scores.slice(startIndex, endIndex);
    const totalPages = Math.ceil(scores.length / SCORES_PER_PAGE);

    const handleNext = () => {
        if (endIndex < scores.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full mx-4 relative"
                 style={{
                     backgroundImage: `url(${bgImage})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center'
                 }}>
                <button 
                    onClick={onMainMenu}
                    className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Back
                </button>
                
                <h2 className="text-6xl font-bold text-white text-center mb-8 text-stroke-black">Scoreboard</h2>
                
                <div className="bg-black bg-opacity-70 rounded-lg p-6 mb-4">
                    <div className="grid grid-cols-4 gap-4 mb-6 text-white font-bold text-xl border-b-2 border-white pb-4">
                        <div className="text-center">Rank</div>
                        <div className="text-center">Player</div>
                        <div className="text-center">Score</div>
                        <div className="text-center">Date</div>
                    </div>
                    
                    {currentScores.map((player) => (
                        <div 
                            key={player.rank}
                            className={`grid grid-cols-4 gap-4 p-4 rounded-lg mb-3 ${
                                player.rank === 1 ? 'bg-yellow-500 bg-opacity-70' :
                                player.rank === 2 ? 'bg-gray-400 bg-opacity-70' :
                                player.rank === 3 ? 'bg-yellow-700 bg-opacity-70' :
                                'bg-white bg-opacity-20'
                            } text-white`}
                        >
                            <div className="flex items-center justify-center text-2xl">
                                {player.rank === 1 && '🏆'}
                                {player.rank === 2 && '🥈'}
                                {player.rank === 3 && '🥉'}
                                {player.rank > 3 && `#${player.rank}`}
                            </div>
                            <div className="text-center text-lg">{player.name}</div>
                            <div className="text-center text-lg">{player.score}</div>
                            <div className="text-center text-lg">{player.timestamp}</div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center items-center space-x-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Previous
                    </button>
                    <span className="text-white font-bold">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <button
                        onClick={handleNext}
                        disabled={endIndex >= scores.length}
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                            endIndex >= scores.length ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        Next
                    </button>
                </div>

                <style jsx>{`
                    .text-stroke-black {
                        -webkit-text-stroke: 2px black;
                    }
                `}</style>
            </div>
        </div>
    );
};

export default Scoreboard;