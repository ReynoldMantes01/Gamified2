import React, { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, onValue, query, orderByChild } from 'firebase/database';
import bgImage from '../assets/bg.gif';

const SCORES_PER_PAGE = 5;

const Scoreboard = ({ onMainMenu }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [longestWords, setLongestWords] = useState([]);
    const [showLongestWordScoreboard, setShowLongestWordScoreboard] = useState(false);
    const [gameBeatScores, setGameBeatScores] = useState([]);
    const [showGameBeatScoreboard, setShowGameBeatScoreboard] = useState(false);


    useEffect(() => {
        const db = getDatabase();
    
        // Fetch Longest Words
        const longestWordRef = query(ref(db, 'users'), orderByChild('longestWord/timestamp'));
        const unsubscribeLongestWords = onValue(longestWordRef, (snapshot) => {
            const data = snapshot.val();
            const words = [];
            Object.entries(data).forEach(([userId, userData]) => {
                if (userData.longestWord) {
                    words.push({
                        name: userData.profile?.username || 'Anonymous',
                        word: userData.longestWord.word,
                        timestamp: new Date(userData.longestWord.timestamp).toLocaleDateString(),
                        userId
                    });
                }
            });
            setLongestWords(words);
        });
    
        // Fetch Fastest Game Clear Times (Game Beat Scoreboard)
        const gameBeatRef = query(ref(db, 'gameBeatScores'), orderByChild('time'));
        const unsubscribeGameBeat = onValue(gameBeatRef, (snapshot) => {
            const data = snapshot.val();
            const sortedScores = [];
    
            Object.entries(data).forEach(([userId, userData]) => {
                sortedScores.push({
                    name: userData.username || 'Anonymous',
                    time: userData.time, // Completion time in seconds
                    timestamp: new Date(userData.timestamp).toLocaleDateString(),
                    userId
                });
            });
    
            setGameBeatScores(sortedScores); // Store in state
        });
    
        return () => {
            unsubscribeLongestWords();
            unsubscribeGameBeat();
        };
    }, []);




    const processScores = useCallback((data) => {
        if (!data) return [];
        const userScores = [];
        Object.entries(data).forEach(([userId, userData]) => {
            if (userData.miniGameScores) {
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
        
        const unsubscribe = onValue(scoresRef, (snapshot) => {
            const data = snapshot.val();
            const processedScores = processScores(data);
            setScores(processedScores);
            setLoading(false);
        });

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

    const handleKeyPress = (event) => {
        switch (event.key) {
            case 'ArrowLeft':
                handlePrevious();
                break;
            case 'ArrowRight':
                handleNext();
                break;
            case 'Escape':
                onMainMenu();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [currentPage, scores]);

    return (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
            <div className="bg-gray-900 p-8 max-w-2xl w-full mx-4 relative border-4 border-gray-700"
                 style={{
                     backgroundImage: `url(${bgImage})`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     imageRendering: 'pixelated',
                     boxShadow: '0 0 0 4px #000, 0 0 0 8px #333'
                 }}>
                
                {/* Back Button */}
                <button 
                    onClick={onMainMenu}
                    className="absolute top-4 left-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                    {'<'} 
                </button>
                
                {/* Title */}
                <h2 className="text-4xl font-bold text-white text-center mb-8" style={{ letterSpacing: '-1px' }}>
                    SCOREBOARD
                </h2>
    
                    {/* Toggle Buttons */}
                    <div className="flex justify-center space-x-4 mb-4">
                        <button 
                            onClick={() => {
                                setShowLongestWordScoreboard(false);
                                setShowGameBeatScoreboard(false);
                            }} 
                            className={`px-4 py-2 rounded-lg text-lg font-bold ${!showLongestWordScoreboard && !showGameBeatScoreboard ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                        >
                            Main Scoreboard
                        </button>
                        
                        <button 
                            onClick={() => {
                                setShowLongestWordScoreboard(true);
                                setShowGameBeatScoreboard(false);
                            }} 
                            className={`px-4 py-2 rounded-lg text-lg font-bold ${showLongestWordScoreboard ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
                        >
                            Longest Word Scoreboard
                        </button>
                    </div>



                
    
                {/* Main Scoreboard */}
                {!showLongestWordScoreboard && !showGameBeatScoreboard && (
                    <div className="bg-black bg-opacity-90 p-6 mb-4 border-4 border-gray-800">
                        <div className="grid grid-cols-4 gap-4 mb-6 text-white font-bold text-xl border-b-2 border-white pb-4">
                            <div className="text-center">Rank</div>
                            <div className="text-center">Player</div>
                            <div className="text-center">Score</div>
                            <div className="text-center">Date</div>
                        </div>
    
                        {loading ? (
                            <div className="text-white text-center py-4">Loading scores...</div>
                        ) : (
                            currentScores.map((player) => (
                                <div 
                                    key={`${player.userId}-${player.score}`}
                                    className={`grid grid-cols-4 gap-4 p-4 mb-3 transform transition-all duration-500 ${
                                        player.isNew ? 'scale-105' : ''
                                    }`}
                                    style={{
                                        fontSize: '14px',
                                        background: player.rank === 1 ? '#854d0e ' : 
                                                  player.rank === 2 ? '#4b5563' : 
                                                  player.rank === 3 ? '#78350f' : 
                                                  '#1f2937', 
                                        border: '2px solid',
                                        borderColor: player.rank === 1 ? '#eab308' : 
                                                     player.rank === 2 ? '#9ca3af' : 
                                                     player.rank === 3 ? '#b45309' :
                                                     '#4b5563', 
                                        boxShadow: player.rank <= 3 ? '0 0 6px #FFF' : 'none',
                                        color: player.rank === 1 ? '#fef08a' :
                                               player.rank === 2 ? '#e5e7eb' : 
                                               player.rank === 3 ? '#fcd34d' : 
                                               '#9ca3af' 
                                    }}
                                >
                                    <div className="text-center font-bold">{player.rank}</div>
                                    <div className="text-center">{player.name}</div>
                                    <div className="text-center">{player.score}</div>
                                    <div className="text-center">{player.timestamp}</div>
                                </div>
                            ))
                        )}
                    </div>
                )}
                
    
                {/* Longest Word Scoreboard */}
                {showLongestWordScoreboard && (
                    <div className="bg-black bg-opacity-90 p-6 mb-4 border-4 border-gray-800">
                        <h2 className="text-4xl text-white text-center mb-8">Longest Word Spelled</h2>
                        <div className="grid grid-cols-3 gap-4 text-center text-white font-bold text-xl border-b-2 border-white pb-4">
                            <div>Player</div>
                            <div>Longest Word</div>
                            <div>Date</div>
                        </div>
    
                        {loading ? (
                            <div className="text-white text-center py-4">Loading longest words...</div>
                        ) : (
                            longestWords.map((entry, index) => (
                                <div 
                                    key={entry.userId} 
                                    className={`grid grid-cols-3 gap-4 p-4 mb-3 ${index % 2 === 0 ? 'bg-gray-700' : 'bg-gray-800'}`}
                                >
                                    <div className="text-center">{entry.name}</div>
                                    <div className="text-center">{entry.word}</div>
                                    <div className="text-center">{entry.timestamp}</div>
                                </div>
                            ))
                        )}
                    </div>
                )}


                    {/* Pagination */}
                    {!showLongestWordScoreboard && !showGameBeatScoreboard && (
                    <div className="flex justify-between mt-4">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 0}
                            className={`bg-blue-800 text-white px-4 py-2 border-b-4 border-blue-900  ${
                                currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                            }`}
                        >
                             {'< PREV'}
                        </button>
                        <span className="text-white flex items-center">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={endIndex >= scores.length}
                            className={`bg-blue-500 text-white px-4 py-2 rounded ${
                                endIndex >= scores.length ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                            }`}
                        >
                            {'NEXT >'}
                        </button>
                    </div>
                )}  
            </div>
        </div>
    );
    
};

export default Scoreboard;
