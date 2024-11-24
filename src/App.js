import React, { useState } from 'react';
import "./App.css";

function App() {
  const [screen, setScreen] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [gridLetters, setGridLetters] = useState(generateRandomLetters());
  const [definition, setDefinition] = useState('');
  const [playerHearts, setPlayerHearts] = useState(3);
  const [enemyHearts, setEnemyHearts] = useState(3);
  const [errorMessage, setErrorMessage] = useState('');
  const [accounts, setAccounts] = useState({});
  const [profile, setProfile] = useState({ username: '', gender: '', age: '', avatar: 'https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg' });
  const [emptyIndices, setEmptyIndices] = useState([]);

  const computerTerms = {
    ALGORITHM: "A process or set of rules to be followed in calculations or other problem-solving operations, especially by a computer.",
    API: "Application Programming Interface, a set of rules that allow different software entities to communicate.",
    ARRAY: "A data structure that stores elements of the same type in a sequential manner.",
    ASCII: "American Standard Code for Information Interchange, a character encoding standard for text.",
    ASYNCHRONOUS: "Operations that occur independently of the main program flow.",
    AUTHENTICATION: "The process of verifying a user’s identity.",
    BACKUP: "A copy of data stored separately for recovery in case of data loss.",
    BANDWIDTH: "The maximum data transfer rate of a network or internet connection.",
    BIOS: "Basic Input/Output System, firmware for hardware initialization during booting.",
    BIT: "The smallest unit of data in computing, representing a binary value of 0 or 1.",
    BLOCKCHAIN: "A decentralized digital ledger for recording transactions securely.",
    BOOTLOADER: "A program that starts the operating system on a computer.",
    BYTE: "A unit of digital information that typically consists of 8 bits.",
    CACHE: "A high-speed storage layer that stores frequently accessed data for quick retrieval.",
    CAPTCHA: "A challenge-response test to determine whether a user is human.",
    CLASS: "A blueprint for creating objects in object-oriented programming.",
    CLOUDCOMPUTING: "Internet-based computing that provides shared resources and data.",
    CODE: "In computer programming, computer code refers to the set of instructions, or a system of rules, written in a particular programming language.",
    COMMANDLINE: "A text-based interface for interacting with an operating system or software.",
    COMPILER: "A program that translates high-level source code into machine code.",
    CPU: "Central Processing Unit, the primary component that executes instructions in a computer.",
    CSS: "Cascading Style Sheets, a language used for styling web pages.",
    DATABASE: "An organized collection of data that can be accessed and managed electronically.",
    DEBUGGING: "The process of identifying and fixing errors in software or hardware.",
    DEBUG: "The process of identifying and removing errors from computer hardware or software.",
    DHCP: "Dynamic Host Configuration Protocol, used to assign IP addresses automatically.",
    DNS: "Domain Name System, which converts human-readable domain names into IP addresses.",
    DOCKER: "A platform for developing, shipping, and running containerized applications.",
    ECOMMERCE: "Buying and selling goods or services over the internet.",
    ENCRYPTION: "The process of converting information into a secure code to prevent unauthorized access.",
    ETHERNET: "A wired networking technology for local area networks.",
    FIREWALL: "A network security device that monitors and controls incoming and outgoing traffic.",
    FIRMWARE: "Low-level software that is embedded into hardware devices.",
    FRAMEWORK: "A pre-built structure for building software applications.",
    GITHUB: "A web-based platform used for version control and collaborative software development.",
    GIT: "A distributed version control system for tracking changes in code.",
    GPU: "Graphics Processing Unit, hardware specialized for rendering images and video.",
    HARDDRIVE: "A data storage device used for storing and retrieving digital information.",
    HTML: "HyperText Markup Language, the standard language for creating web pages.",
    HTTP: "HyperText Transfer Protocol, used for transferring data over the web.",
    HTTPS: "Secure HyperText Transfer Protocol, an encrypted version of HTTP.",
    IDE: "Integrated Development Environment, a software suite for programming.",
    INTERNET: "A global network of interconnected devices for communication and data sharing.",
    IPADDRESS: "A unique numerical label assigned to devices on a network.",
    JAVA: "A programming language designed for creating platform-independent applications.",
    JSON: "JavaScript Object Notation, a lightweight format for storing and transporting data.",
    KERNEL: "The core part of an operating system that manages system resources.",
    KEYLOGGER: "A tool that records every keystroke made on a device.",
    LAN: "Local Area Network, a network of connected devices within a limited area.",
    LINUX: "An open-source operating system based on the UNIX architecture.",
    LOADBALANCER: "A device or software that distributes network or application traffic across servers.",
    MACHINELEARNING: "A subset of AI where systems learn from data and improve without explicit programming.",
    MACADDRESS: "A hardware address assigned to network devices for communication.",
    MALWARE: "Software that is specifically designed to disrupt, damage, or gain unauthorized access to a computer system.",
    NETWORK: "A group of interconnected devices for sharing resources and information.",
    NODE: "A single device or point in a network.",
    NFT: "Non-Fungible Token, a unique digital asset verified using blockchain.",
    OBJECTORIENTEDPROGRAMMING: "A programming paradigm based on objects containing data and methods.",
    OOP: "A programming paradigm based on objects containing data and methods.",
    OPERATINGSYSTEM: "System software that manages hardware and software resources.",
    OS: "System software that manages hardware and software resources.",
    OPENSOURCE: "Software with publicly available source code that can be modified and shared.",
    PACKET: "A unit of data transmitted over a network.",
    PHISHING: "A fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity.",
    PYTHON: "A high-level programming language known for its readability and versatility.",
    QUERY: "A request for information or data from a database.",
    QRCODE: "A machine-readable code for storing and retrieving information.",
    RAM: "Random Access Memory, temporary storage for data currently in use.",
    ROUTER: "A device that forwards data packets between computer networks, directing traffic on the internet.",
    SCRIPT: "A series of instructions written for a specific task.",
    SERVER: "A computer or system that provides resources, data, services, or programs to other computers, known as clients, over a network.",
    SOFTWARE: "Programs and operating information used by a computer.",
    SPAM: "Unsolicited and irrelevant messages sent online.",
    SQL: "Structured Query Language, used for managing data in relational databases.",
    SSL: "Secure Sockets Layer, a protocol for secure communication over the internet.",
    TERABYTE: "A unit of digital storage equivalent to 1,024 gigabytes.",
    THREAD: "A sequence of executable instructions within a program.",
    TROJANHORSE: "Malware disguised as legitimate software.",
    TROJAN: "A type of malware that disguises itself as legitimate software but performs malicious actions once installed.",
    UI: "User Interface, the part of software or hardware that interacts with users.",
    USB: "Universal Serial Bus, a standard for connecting peripherals to computers.",
    VIRTUALMACHINE: "Software emulating a physical computer system.",
    VIRUS: "A type of malicious software that replicates itself and spreads to other computers, often causing harm to systems and data.",
    VPN: "Virtual Private Network, encrypts internet connections for security and privacy.",
    WEBBROWSER: "Software for accessing and viewing websites.",
    WEB: "Software for accessing and viewing websites.",
    WEBSITE: "A collection of web pages accessible via the internet.",
    WIFI: "A technology that allows electronic devices to connect to a wireless local area network (WLAN), typically using radio waves.",
    XML: "Extensible Markup Language, a flexible way to structure data.",
    XSS: "Cross-Site Scripting, a web security vulnerability.",
    YOTTABYTE: "A unit of digital data storage equal to 1,024 zettabytes.",
    ZIP: "A compressed file format for reducing file size.",
    ZETTABYTE: "A unit of data storage equal to 1,024 exabytes."
  };

  function generateRandomLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomLetters = [];
    for (let i = 0; i < 16; i++) {
      randomLetters.push(letters.charAt(Math.floor(Math.random() * letters.length)));
    }
    return randomLetters;
  }

  const handleLogin = () => {
    if (accounts[username] && accounts[username] === password) {
      setScreen('menu');
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect username or password');
    }
  };

  const handleCreateAccount = () => {
    if (username && password) {
      setAccounts({ ...accounts, [username]: password });
      setScreen('login');
      setErrorMessage('');
    }
  };

  const handleSettingsSubmit = () => {
    if (profile.username && profile.gender && profile.age && profile.avatar) {
      setScreen('menu');
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile({ ...profile, avatar: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleLetterClick = (letter, index) => {
    if (letter) {
        setSelectedLetters([...selectedLetters, letter]);
        const newGridLetters = [...gridLetters];
        newGridLetters[index] = '';
        setGridLetters(newGridLetters);
        setEmptyIndices([...emptyIndices, index]);
    }
};

// Handle letter click in the selected letters box
const handleSelectedLetterClick = (letter, index) => {
    const newSelectedLetters = [...selectedLetters];
    newSelectedLetters.splice(index, 1);
    setSelectedLetters(newSelectedLetters);

    const emptyIndex = emptyIndices.shift();
    if (emptyIndex !== undefined) {
        const newGridLetters = [...gridLetters];
        newGridLetters[emptyIndex] = letter;
        setGridLetters(newGridLetters);
        setEmptyIndices(emptyIndices);
    }
};

// Handle scramble button click
const handleScramble = () => {
    const newGridLetters = generateRandomLetters();
    emptyIndices.forEach(index => {
        newGridLetters[index] = '';
    });
    setGridLetters(newGridLetters);
};

  const handleAttack = () => {
    const word = selectedLetters.join('');
    const wordLength = word.length;
    let damage = 0;

    if (wordLength >= 0 && wordLength <= 4) {
      damage = 1;
    } else if (wordLength > 4 && wordLength <= 8) {
      damage = 2;
    } else if (wordLength > 8) {
      damage = 3;
    }

    if (computerTerms[word.toUpperCase()]) {
      setDefinition(computerTerms[word.toUpperCase()]);
      setEnemyHearts(Math.max(0, enemyHearts - damage));
    } else {
      setDefinition('Invalid word. Please try again.');
      setPlayerHearts(Math.max(0, playerHearts - damage));
    }

    setSelectedLetters([]);
    setGridLetters(generateRandomLetters());
  };

  return (
    <div className="game-container">
      {screen === 'login' && (
        <div className="screen active">
          <h1 className="text-2xl mb-4">Login</h1>
          <input className="input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <button className="button" onClick={handleLogin}>Login</button>
          <button className="button" onClick={() => setScreen('create')}>Create Account</button>
        </div>
      )}
      {screen === 'create' && (
        <div className="screen active">
          <h1 className="text-2xl mb-4">Create Account</h1>
          <input className="input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="button" onClick={handleCreateAccount}>Create</button>
          <button className="button" onClick={() => setScreen('login')}>Back to Login</button>
        </div>
      )}
      {screen === 'menu' && (
        <div className="screen active">
          <h1 className="text-2xl mb-4">Main Menu</h1>
          <div className="menu-button" onClick={() => setScreen('game')}>Start Game</div>
          <div className="menu-button" onClick={() => setScreen('settings')}>Settings</div>
          <div className="menu-button" onClick={() => setScreen('login')}>Log Out</div>
        </div>
      )}
      {screen === 'settings' && (
        <div className="screen active">
          <h1 className="text-2xl mb-4">Settings</h1>
          <label htmlFor="avatar-upload">
            <img src={profile.avatar} alt="Player Avatar" className="avatar" />
          </label>
          <input type="file" id="avatar-upload" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
          <input className="input" type="text" placeholder="Username" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} />
          <select className="select" value={profile.gender} onChange={(e) => setProfile({ ...profile, gender: e.target.value })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select className="select" value={profile.age} onChange={(e) => setProfile({ ...profile, age: e.target.value })}>
            <option value="">Select Age</option>
            {[...Array(100).keys()].map(age => (
              <option key={age} value={age + 1}>{age + 1}</option>
            ))}
          </select>
          <button className="button" onClick={handleSettingsSubmit}>Submit</button>
          <button className="button" onClick={() => setScreen('menu')}>Back to Menu</button>
        </div>
      )}
      {screen === 'game' && (
        <>
          <div className="top-bar">
            <div className="menu-icon">
              <i className="fas fa-bars"></i>
            </div>
            <div className="player-info">
              {profile.avatar && <img src={profile.avatar} alt="Player Avatar" />}
              <div className="hearts">
                {[...Array(playerHearts)].map((_, i) => (
                  <i key={i} className="fas fa-heart"></i>
                ))}
              </div>
            </div>
          </div>
          <div className="top-bar" style={{ right: '10px', left: 'auto' }}>
            <div className="player-info">
              <img src="https://placehold.co/24x24" alt="Enemy Avatar" />
              <div className="hearts">
                {[...Array(enemyHearts)].map((_, i) => (
                  <i key={i} className="fas fa-heart"></i>
                ))}
              </div>
            </div>
          </div>
          <div className="game-content">
            <div className="character"></div>
            <div className="word-box">
              {selectedLetters.map((letter, index) => (
                <div key={index} className="letter" onClick={() => handleSelectedLetterClick(letter, index)}>{letter}</div>
              ))}
            </div>
            <div className="enemy"></div>
          </div>
          <div className="game-content">
            <div className="description-box">{definition}</div>
            <div className="letter-grid">
              {gridLetters.map((letter, index) => (
                <div key={index} className="grid-letter" onClick={() => handleLetterClick(letter, index)}>{letter}</div>
              ))}
            </div>
            <div className="action-buttons">
              <div className="button" onClick={handleAttack}>ATTACK</div>
              <div className="button" onClick={handleScramble}>SCRAMBLE</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;