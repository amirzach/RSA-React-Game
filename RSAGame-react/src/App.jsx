import { useState, useEffect } from "react";
import { Box } from "@mantine/core";
import "./App.css";
import SelectDifficultyCard from "./SelectDifficultyCard";
import StageOneCard from "./StageOneCard";
import StageTwoCard from "./StageTwoCard";
import StageThreeCard from "./StageThreeCard";
import StageFourCard from "./StageFourCard";
import NicknameCard from "./NicknameCard";
import LeaderboardCard from "./LeaderboardCard";
import GameTimer from "./GameTimer";

function App() {

  // useState variables
  const [difficultySelected, setDifficultySelected] = useState(false);
  const [possiblePValues, setPossiblePValues] = useState([]);
  const [possibleQValues, setPossibleQValues] = useState([]);
  const [buttonPValueStatus, setButtonPValueStatus] = useState({});
  const [buttonQValueStatus, setButtonQValueStatus] = useState({});
  const [buttonsPValueDisabled, setButtonsPValueDisabled] = useState(false);
  const [buttonsQValueDisabled, setButtonsQValueDisabled] = useState(false);
  const [selectedPrimeP, setSelectedPrimeP] = useState(null);
  const [selectedPrimeQ, setSelectedPrimeQ] = useState(null);
  const [selectedNotPrimeP, setSelectedNotPrimeP] = useState(false);
  const [selectedNotPrimeQ, setSelectedNotPrimeQ] = useState(false);
  const [isBothPrimeSelected, setIsBothPrimeSelected] = useState(false);
  const [nValue, setNValue] = useState(0);
  const [phiValue, setPhiValue] = useState(0);
  const [validEs, setValidEs] = useState([]);
  const [keyMap, setKeyMap] = useState(new Map);
  const [eValue, setEValue] = useState(0);
  const [dValue, setDValue] = useState(0);
  const [message, setMessage] = useState("");
  const [encryptedMessage, setEncryptedMessage] = useState([]);
  const [inputD, setInputD] = useState("");
  const [isInputDCorrect, setIsInputDCorrect] = useState(false);
  const [decryptedMessage, setDecryptedMessage] = useState("");
   
  const [stageTwo, setStageTwo] = useState(false);
  const [stageThree, setStageThree] = useState(false);
  const [stageFour, setStageFour] = useState(false);

  const [nickname, setNickname] = useState("");
  const [hasEnteredNickname, setHasEnteredNickname] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [currentDifficulty, setCurrentDifficulty] = useState("");    

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(() => {
        setCurrentTime((time) => time + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  // Format time function for timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Handle nickname submission
  const handleNicknameSubmit = () => {
    setHasEnteredNickname(true);
  };

  // Handle game completion
  const handleGameComplete = () => {
    setIsTimerActive(false);
    const newScore = {
      nickname,
      time: currentTime,
      difficulty: currentDifficulty,
      date: new Date().toLocaleDateString()
    };
    
    setLeaderboardData(prev => {
      const newData = [...prev, newScore]
        .sort((a, b) => {
          // First sort by difficulty (hard > medium > easy)
          const difficultyOrder = { hard: 3, medium: 2, easy: 1 };
          const diffComp = difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
          if (diffComp !== 0) return diffComp;
          // Then sort by time
          return a.time - b.time;
        })
        .slice(0, 10);
      localStorage.setItem('leaderboard', JSON.stringify(newData));
      return newData;
    });
    setShowLeaderboard(true);
  };

  // Handle play again
  const handlePlayAgain = () => {
    // Reset all necessary state variables
    setDifficultySelected(false);
    setNickname("");
    setHasEnteredNickname(false);
    setCurrentTime(0);
    setIsTimerActive(false);
    setShowLeaderboard(false);
    setCurrentDifficulty("");
    setPossiblePValues([]);
    setPossibleQValues([]);
    setButtonPValueStatus({});
    setButtonQValueStatus({});
    setButtonsPValueDisabled(false);
    setButtonsQValueDisabled(false);
    setSelectedPrimeP(null);
    setSelectedPrimeQ(null);
    setSelectedNotPrimeP(false);
    setSelectedNotPrimeQ(false);
    setIsBothPrimeSelected(false);
    setNValue(0);
    setPhiValue(0);
    setValidEs([]);
    setKeyMap(new Map());
    setEValue(0);
    setDValue(0);
    setMessage("");
    setEncryptedMessage([]);
    setInputD("");
    setIsInputDCorrect(false);
    setDecryptedMessage("");
    setStageTwo(false);
    setStageThree(false);
    setStageFour(false);
  };

  // Load leaderboard data on mount
  useEffect(() => {
    const savedLeaderboard = localStorage.getItem('leaderboard');
    if (savedLeaderboard) {
      setLeaderboardData(JSON.parse(savedLeaderboard));
    }
  }, []);

  // Modified SelectDifficultyCard to track difficulty
  const wrappedSetDifficultySelected = (value) => {
    setDifficultySelected(value);
    setIsTimerActive(true); // Start timer when difficulty is selected
  };

  // Return JSX code
  return (
    <>
      <Box width="100%" height="100%">
        {!hasEnteredNickname && (
          <NicknameCard
            nickname={nickname}
            setNickname={setNickname}
            onSubmit={handleNicknameSubmit}
          />
        )}

        {hasEnteredNickname && !showLeaderboard && (
          <>
            <GameTimer
              isActive={isTimerActive}
              currentTime={currentTime}
              formatTime={formatTime}
            />

            <SelectDifficultyCard 
              setDifficultySelected={wrappedSetDifficultySelected}
              setPossiblePValues={setPossiblePValues} 
              setPossibleQValues={setPossibleQValues}
              difficultySelected={difficultySelected}
              stageTwo={stageTwo}
              stageThree={stageThree}
              stageFour={stageFour}
              onDifficultySelect={(difficulty) => setCurrentDifficulty(difficulty)}
            />
            
            <StageOneCard 
              setDifficultySelected={setDifficultySelected} 
              setStageTwo={setStageTwo}
              setButtonPValueStatus={setButtonPValueStatus}
              setButtonsPValueDisabled={setButtonsPValueDisabled}
              setSelectedPrimeP={setSelectedPrimeP}
              setSelectedNotPrimeP={setSelectedNotPrimeP}
              setPossiblePValues={setPossiblePValues}
              setButtonQValueStatus={setButtonQValueStatus}
              setButtonsQValueDisabled={setButtonsQValueDisabled}
              setSelectedPrimeQ={setSelectedPrimeQ} 
              setSelectedNotPrimeQ={setSelectedNotPrimeQ} 
              setPossibleQValues={setPossibleQValues} 
              setIsBothPrimeSelected={setIsBothPrimeSelected} 
              setNValue={setNValue}
              setPhiValue={setPhiValue}
              setValidEs={setValidEs}
              setKeyMap={setKeyMap}
              difficultySelected={difficultySelected}
              possiblePValues={possiblePValues}
              selectedPrimeP={selectedPrimeP}
              selectedNotPrimeP={selectedNotPrimeP}
              possibleQValues={possibleQValues}
              selectedPrimeQ={selectedPrimeQ}
              selectedNotPrimeQ={selectedNotPrimeQ}
              isBothPrimeSelected={isBothPrimeSelected}
              buttonPValueStatus={buttonPValueStatus}
              buttonsPValueDisabled={buttonsPValueDisabled}
              buttonQValueStatus={buttonQValueStatus}
              buttonsQValueDisabled={buttonsQValueDisabled}
            />

            <StageTwoCard 
              setStageTwo={setStageTwo}
              setStageThree={setStageThree}
              setEValue={setEValue}
              setDValue={setDValue}
              stageTwo={stageTwo}
              nValue={nValue}
              phiValue={phiValue}
              eValue={eValue}
              dValue={dValue}
              validEs={validEs}
              keyMap={keyMap}
            />

            <StageThreeCard 
              setStageThree={setStageThree}
              setStageFour={setStageFour}
              setMessage={setMessage}
              setEncryptedMessage={setEncryptedMessage}
              stageThree={stageThree}
              nValue={nValue}
              phiValue={phiValue}
              eValue={eValue}
              message={message}
              encryptedMessage={encryptedMessage}
            />

            <StageFourCard 
              setIsInputDCorrect={setIsInputDCorrect}
              setInputD={setInputD}
              setDecryptedMessage={setDecryptedMessage}
              stageFour={stageFour}
              nValue={nValue}
              phiValue={phiValue}
              eValue={eValue}
              dValue={dValue}
              inputD={inputD}
              isInputDCorrect={isInputDCorrect}
              encryptedMessage={encryptedMessage}
              decryptedMessage={decryptedMessage}
              onComplete={handleGameComplete}
            />
          </>
        )}

        {showLeaderboard && (
          <LeaderboardCard
            leaderboardData={leaderboardData}
            formatTime={formatTime}
            onPlayAgain={handlePlayAgain}
          />
        )}
      </Box>
    </>
  );
}

export default App