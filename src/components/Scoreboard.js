import React, { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, onValue, query, orderByChild } from 'firebase/database';
import bgImage from '../assets/bg.gif';

const SCORES_PER_PAGE = 6;

const Scoreboard = ({ onMainMenu }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    const processScores = useCallback((data) => {
        if (!data) return [];
        const userScores = [];
        Object.entries(data).forEach(([userId, userData]) => {
            if (userData.miniGameScores) {
                // Get the highest score for each user
                const highestScore = Object.entries(userData.miniGameScores)
                    .reduce((highest, [timestamp, scoreData]) => {
                        return (!highest || scoreData.score > highest.score) 
                            ? { score: scoreData.score, timestamp }
                            : highest;
                    }, null);

                if (highestScore) {
                    userScores.push({
                        name: userData.profile?.username || 'Anonymous',
                        score: highestScore.score,
                        timestamp: new Date(parseInt(highestScore.timestamp)).toLocaleDateString(),
                        userId
                    });
                }
            }
        });
        
        // Sort scores and add ranks
        userScores.sort((a, b) => b.score - a.score);
        return userScores.map((score, index) => ({
            ...score,
            rank: index + 1,
            isNew: score.timestamp === new Date().toLocaleDateString()
        }));
    }, []);

    useEffect(() => {
        setLoading(true);
        const db = getDatabase();
        const scoresRef = ref(db, 'users');
        
        // Set up real-time listener
        const unsubscribe = onValue(scoresRef, (snapshot) => {
            const data = snapshot.val();
            const processedScores = processScores(data);
            setScores(processedScores);
            setLoading(false);
        });

        // Cleanup listener on component unmount
        return () => unsubscribe();
    }, [processScores]);

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
                    {loading ? (
                        <>
                            <div className="grid grid-cols-4 gap-4 mb-6 text-white font-bold text-xl border-b-2 border-white pb-4">
                                <div className="text-center">Rank</div>
                                <div className="text-center">Player</div>
                                <div className="text-center">Score</div>
                                <div className="text-center">Date</div>
                            </div>
                            
                            {/* Top 3 Trophy Placeholders */}
                            <div className="grid grid-cols-4 gap-4 p-4 rounded-lg mb-3 bg-yellow-500 bg-opacity-70 text-white">
                                <div className="text-center font-bold text-3xl">🏆</div>
                                <div className="text-center">---</div>
                                <div className="text-center">---</div>
                                <div className="text-center">---</div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 p-4 rounded-lg mb-3 bg-gray-400 bg-opacity-70 text-white">
                                <div className="text-center font-bold text-3xl">🥈</div>
                                <div className="text-center">---</div>
                                <div className="text-center">---</div>
                                <div className="text-center">---</div>
                            </div>
                            <div className="grid grid-cols-4 gap-4 p-4 rounded-lg mb-3 bg-yellow-700 bg-opacity-70 text-white">
                                <div className="text-center font-bold text-3xl">🥉</div>
                                <div className="text-center">---</div>
                                <div className="text-center">---</div>
                                <div className="text-center">---</div>
                            </div>
                            <div className="text-white text-center py-4">Loading scores...</div>
                        </>
                    ) : (
                        <>
                            <div className="grid grid-cols-4 gap-4 mb-6 text-white font-bold text-xl border-b-2 border-white pb-4">
                                <div className="text-center">Rank</div>
                                <div className="text-center">Player</div>
                                <div className="text-center">Score</div>
                                <div className="text-center">Date</div>
                            </div>
                            
                            {currentScores.map((player) => (
                                <div 
                                    key={`${player.userId}-${player.score}`}
                                    className={`grid grid-cols-4 gap-4 p-4 rounded-lg mb-3 transform transition-all duration-500 ${
                                        player.rank === 1 ? 'bg-yellow-500 bg-opacity-70' :
                                        player.rank === 2 ? 'bg-gray-400 bg-opacity-70' :
                                        player.rank === 3 ? 'bg-yellow-700 bg-opacity-70' :
                                        'bg-white bg-opacity-20'
                                    } ${player.isNew ? 'scale-105' : ''} text-white`}
                                >
                                    <div className="text-center font-bold">{player.rank}</div>
                                    <div className="text-center">{player.name}</div>
                                    <div className="text-center">{player.score}</div>
                                    <div className="text-center">{player.timestamp}</div>
                                </div>
                            ))}
                        </>
                    )}
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 0}
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${
                            currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={endIndex >= scores.length}
                        className={`bg-blue-500 text-white px-4 py-2 rounded ${
                            endIndex >= scores.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                        }`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Scoreboard;