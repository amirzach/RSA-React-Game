import { lazy, Suspense, useState, useEffect, useCallback, useMemo } from "react";
import { Box, Loader } from "@mantine/core";
import "./App.css";

// Lazy load components
const SelectDifficultyCard = lazy(() => import("./SelectDifficultyCard"));
const StageOneCard = lazy(() => import("./StageOneCard"));
const StageTwoCard = lazy(() => import("./StageTwoCard"));
const StageThreeCard = lazy(() => import("./StageThreeCard"));
const StageFourCard = lazy(() => import("./StageFourCard"));
const NicknameCard = lazy(() => import("./NicknameCard"));
const LeaderboardCard = lazy(() => import("./LeaderboardCard"));
const GameOver = lazy(() => import('./GameOver'));
const GameTimer = lazy(() => import("./GameTimer"));

function App() {
  // Group useState variables
  const [gameState, setGameState] = useState({
    difficultySelected: false,
    stageTwo: false,
    stageThree: false,
    stageFour: false,
    currentDifficulty: "",
    isGameOver: false,
    hasEnteredNickname: false,
    showLeaderboard: false,
  });

  const [timerState, setTimerState] = useState({
    currentTime: 0,
    isTimerActive: false,
    timeLimit: 0,
  });

  const [primeState, setPrimeState] = useState({
    possiblePValues: [],
    possibleQValues: [],
    buttonPValueStatus: {},
    buttonQValueStatus: {},
    buttonsPValueDisabled: false,
    buttonsQValueDisabled: false,
    selectedPrimeP: null,
    selectedPrimeQ: null,
    selectedNotPrimeP: false,
    selectedNotPrimeQ: false,
    isBothPrimeSelected: false,
  });

  const [calculatedValues, setCalculatedValues] = useState({
    nValue: 0,
    phiValue: 0,
    validEs: [],
    keyMap: new Map(),
    eValue: 0,
    dValue: 0,
  });

  const [messageState, setMessageState] = useState({
    message: "",
    encryptedMessage: [],
    inputD: "",
    isInputDCorrect: false,
    decryptedMessage: "",
  });

  const [nickname, setNickname] = useState("");

  const [leaderboardData, setLeaderboardData] = useState(() => {
    const saved = localStorage.getItem("leaderboard");
    return saved ? JSON.parse(saved) : [];
  });

  // Memoized format time function
  const formatTime = useCallback((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

// Timer effect with useCallback
useEffect(() => {
  let interval;
  if (timerState.isTimerActive) {
    interval = setInterval(() => {
      setTimerState(prev => {
        if (prev.currentTime >= prev.timeLimit - 1) {
          return {
            ...prev,
            isTimerActive: false,
            currentTime: prev.timeLimit
          };
        }
        return { ...prev, currentTime: prev.currentTime + 1 };
      });
      
      setGameState(prev => {
        if (timerState.currentTime >= timerState.timeLimit - 1) {
          return { ...prev, isGameOver: true };
        }
        return prev;
      });
    }, 1000);
  }
  return () => clearInterval(interval);
}, [timerState.isTimerActive, timerState.currentTime, timerState.timeLimit]);

  // Memoized difficulty selection handler
  const handleDifficultySelect = useCallback((difficulty) => {
    const limits = {
      easy: 5 * 60,
      medium: 7 * 60,
      hard: 10 * 60,
    };

    setTimerState(prev => ({ 
      ...prev,
      isTimerActive: true,
      timeLimit: limits[difficulty]
    }));

    setGameState(prev => ({
      ...prev,
      currentDifficulty: difficulty,
      difficultySelected: true
    }));
  }, []);

  // Memoized game completion handler
  const handleGameComplete = useCallback(() => {
    setTimerState(prev => ({
      ...prev,
      isTimerActive: false
    }));

    const newScore = {
      nickname,
      time: timerState.currentTime,
      difficulty: gameState.currentDifficulty,
      date: new Date().toLocaleDateString()
    };

    setLeaderboardData(prev => {
      const newData = [...prev, newScore].sort((a, b) => {
        const difficultyOrder = { hard: 3, medium: 2, easy: 1 };
        const diffComp = difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
        return diffComp !== 0 ? diffComp : a.time - b.time;
      }).slice(0, 10);
      localStorage.setItem('leaderboardData', JSON.stringify(newData));
      return newData;
    });

    setGameState(prev => ({
      ...prev,
      showLeaderboard: true
    }));
  }, [nickname, timerState.currentTime, gameState.currentDifficulty]);

  // Memoized reset function
  const resetGame = useCallback(() => {
    setGameState({
      difficultySelected: false,
      stageTwo: false,
      stageThree: false,
      stageFour: false,
      currentDifficulty: "",
      isGameOver: false,
      hasEnteredNickname: false,
      showLeaderboard: false,
    });

    setTimerState({
      currentTime: 0,
      isTimerActive: false,
      timeLimit: 0,
    });

    setPrimeState({
      possiblePValues: [],
      possibleQValues: [],
      buttonPValueStatus: {},
      buttonQValueStatus: {},
      buttonsPValueDisabled: false,
      buttonsQValueDisabled: false,
      selectedPrimeP: null,
      selectedPrimeQ: null,
      selectedNotPrimeP: false,
      selectedNotPrimeQ: false,
      isBothPrimeSelected: false,
    });
    
    setCalculatedValues({
      nValue: 0,
      phiValue: 0,
      validEs: [],
      keyMap: new Map(),
      eValue: 0,
      dValue: 0,
    });
    
    setMessageState({
      message: "",
      encryptedMessage: [],
      inputD: "",
      isInputDCorrect: false,
      decryptedMessage: "",
    });
  }, []);

  const timeRemaining = useMemo(() => 
    timerState.timeLimit - timerState.currentTime, 
    [timerState.timeLimit, timerState.currentTime]
  );

  // Return JSX code
  return (
    <Box width="100%" height="100%">
      <Suspense fallback={<Loader />}>
        {gameState.isGameOver && (
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              zIndex: 999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <GameOver
              onRestart={resetGame}
              formatTime={formatTime}
              currentTime={timerState.currentTime}
            />
          </div>
        )}
    
        <div style={{ pointerEvents: gameState.isGameOver ? 'none' : 'auto' }}>
          {!gameState.hasEnteredNickname ? (
            <NicknameCard
              nickname={nickname}
              setNickname={setNickname}
              onSubmit={() => setGameState(prev => ({
                ...prev,
                hasEnteredNickname: true
              }))}
            />
          ) : !gameState.showLeaderboard ? (
            <>
              <GameTimer
                isActive={timerState.isTimerActive}
                currentTime={timeRemaining}
                formatTime={formatTime}
              />
    
              <SelectDifficultyCard 
                {...gameState}
                {...primeState}
                {...calculatedValues}
                setPrimeState={setPrimeState}
                onDifficultySelect={handleDifficultySelect}
              />
              
              <StageOneCard 
                {...gameState}
                {...primeState}
                {...calculatedValues}
                setGameState={setGameState}
                setPrimeState={setPrimeState}
                setCalculatedValues={setCalculatedValues}
              />
    
              <StageTwoCard 
                {...gameState}
                {...calculatedValues}
                setGameState={setGameState}
                setCalculatedValues={setCalculatedValues}
              />
    
              <StageThreeCard 
                {...gameState}
                {...calculatedValues}
                {...messageState}
                setGameState={setGameState}
                setMessageState={setMessageState}
              />
    
              <StageFourCard 
                {...gameState}
                {...calculatedValues}
                {...messageState}
                setMessageState={setMessageState}
                onComplete={handleGameComplete}
              />
            </>
          ) : (
            <LeaderboardCard
              leaderboardData={leaderboardData}
              formatTime={formatTime}
              onPlayAgain={resetGame}
            />
          )}
        </div>
      </Suspense>
    </Box>
  );
}

export default App