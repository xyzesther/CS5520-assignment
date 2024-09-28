import { Alert, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-elements';

export default function GameScreen({ phoneNumber, onRestart }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentGuess, setCurrentGuess] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [feedback, setFeedback] = useState('');

  const lastDigit = phoneNumber[phoneNumber.length - 1];
  
  function generateNewTarget() {
    const multiples = []
    for (let i = lastDigit; i <= 100; i += lastDigit) {
      multiples.push(i);
    }
    const randomIndex = multiples[Math.floor(Math.random() * multiples.length)];
    const newTarget = multiples[randomIndex];
    return newTarget;
  }

  function startGame() {
    setCurrentTarget(generateNewTarget());
    setGameStarted(true);
    setAttemptsLeft(4);
    setTimeLeft(60);
  }

  function useHint() {
    if (!hintUsed) {
      setHintUsed(true);
      Alert.alert(`Hint: The target number is a multiple of ${lastDigit}`);
    }
  }

  function handleGuess() {
    const guess = parseInt(currentGuess);
    
    // Check if the guess is a valid number
    if (isNaN(guess) || guess < 1 || guess > 100) {
      Alert.alert('Invalid input', 'Please enter a number between 1 and 100', [{ text: 'OK' }]);
      return;
    }

    // Check if the guess is the target number
    if (guess === currentTarget) {
      setFeedback(`You guessed correct! Attempts Used: ${4 - attemptsLeft + 1}`);
    } else {
      setAttemptsLeft((prevAttemptLeft) => prevAttemptLeft - 1);
      const guessDirection = guess < currentTarget ? 'higher' : 'lower';
      setFeedback(`You did not guess correct! You should guess ${guessDirection}`);
      
      if (attemptsLeft === 1) {
        setFeedback('Game Over!');
      }
    }

    setCurrentGuess('');
  }

  // Timer
  useEffect(() => {
    let interval;
    if (gameStarted && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame('time');
    }
    return () => clearInterval(interval);
  }, [gameStarted, timeLeft]);

  return (
    <View style={styles.container}>
      <View style={styles.restartBtn}>
        <Button title="Restart" onPress={onRestart} />
      </View>
      {!gameStarted ? (
        <View style={styles.gameCard}>
          <Text>Guess a number between 1 & 100 that is multiply of {lastDigit}.</Text>
          <View style={styles.startButton}>
            <Button title="Start" onPress={startGame} />
          </View>
        </View>
      ) : (
        <View style={styles.gameContainer}>
          <Text>Attempts left: {attemptsLeft}</Text>
          <Text>Timer: {timeLeft}s</Text>

          <TextInput
            style={styles.input}
            value={currentGuess}
            onChangeText={setCurrentGuess}
            placeholder="Enter your guess"
            keyboardType="numeric"
          />
          <Button title="Use a hint" onPress={useHint} disabled={hintUsed} />
          <Button title="Submit" onPress={handleGuess} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  restartBtn: {
    position: 'absolute',
    top: 200,
    right: 0,
    margin: 10,
  },

  gameCard: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  startButton: {
    marginTop: 20,
  }

})