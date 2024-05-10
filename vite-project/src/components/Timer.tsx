import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";
import "../App.css";

interface TimerProps {
  currentPlayer: Player | null;
  restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
  const [selectedTime, setSelectedTime] = useState(60);
  const [blackTime, setBlackTime] = useState(selectedTime)
  const [whiteTime, setWhiteTime] = useState(selectedTime);
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)
  const [Winner, setWinner] = useState<Player | null>(null)
  const [isRunning, setIsRunning] = useState(false);
  




  useEffect(() => {
    if (isRunning && currentPlayer) { 
      startTimer();
    } else {
      clearInterval(timer.current)
    }
  }, [isRunning, currentPlayer, timer.current]);

  const handleStartTimer = () => {
    setIsRunning(true); 
  };

  const handleStopTimer = () => {
    setIsRunning(false);
    clearInterval(timer.current);
  };




  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  useEffect(() => {
  setBlackTime(selectedTime);
  setWhiteTime(selectedTime);
  }, [selectedTime]);

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    setBlackTime(selectedTime);
    setWhiteTime(selectedTime);
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementBlackTimer() {
    setBlackTime(prev => {
      if (prev === 1) {
        clearInterval(timer.current);
        const winnerColor = currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
        const winnerName = winnerColor === Colors.WHITE ? 'Белые' : 'Черные';
        alert(`${winnerName} выиграли!`);
        setWinner(currentPlayer?.color === Colors.WHITE ? currentPlayer : null)
        return 0;

        
      }
      return prev - 1;
    })
  }
  function decrementWhiteTimer() {
    setWhiteTime(prev => {
      if (prev === 1) {
        clearInterval(timer.current);
        const winnerColor = currentPlayer?.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE;
        const winnerName = winnerColor === Colors.WHITE ? 'Белые' : 'Черные';
        alert(`${winnerName} выиграли!`);
        setWinner(currentPlayer?.color === Colors.BLACK ? currentPlayer : null)
        return 0;

      }
      return prev - 1;
    })
  }

  const handleRestart = () => {
    setWhiteTime(selectedTime)
    setBlackTime(selectedTime)
    setWinner(null)
   return  restart()
   clearInterval(timer.current)
  }
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60); 
    const remainingSeconds = seconds % 60;
    return minutes + ':' + remainingSeconds.toString().padStart(2, '0'); 
    };


  

  return (
    <div>
      
      <div>
        <div className='h'>
        <h3>время на подумать :3</h3>
        </div>

      <select className='select-btn' value={selectedTime} onChange={(e) => setSelectedTime(Number(e.target.value))}>
          <option value={5}>5 секунд</option>
          <option value={10}>10 секунд</option>
          <option value={20}>20 секунд</option>
          <option value={40}>40 секунд</option>
          <option value={60}>1 минута</option>
          <option value={300}>5 минут</option>
          <option value={600}>10 минут</option>
          <option value={1200}>20 минут</option>
          <option value={1800}>30 минут</option>
          <option value={2400}>40 минут</option>
          <option value={3000}>50 минут</option>
          <option value={3600}>1 час</option>
          </select>
          
        <button className='btn-restart' onClick={handleRestart}>перезапустить</button>
      </div>
      <div className='timeH'>
  <h2>Черные - {formatTime(blackTime)}</h2>
  <h2>Белые - {formatTime(whiteTime)}</h2>
  </div>
  <div className='divButton'>
  <button className='btn-start' onClick={handleStartTimer}>Запустить таймер</button>
  <button className='btn-stop' onClick={handleStopTimer}>остановить таймер</button>
  </div>
    </div>


  );
};

export default Timer;