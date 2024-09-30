import { Alert, StyleSheet, Text, View, TextInput, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-native-elements';

export default function GameScreen({ phoneNumber }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentGuess, setCurrentGuess] = useState('');
  const [hintUsed, setHintUsed] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const [feedback, setFeedback] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const lastDigit = phoneNumber[phoneNumber.length - 1];
  
  // Generate a new target number
  function generateNewTarget() {
    const multiples = []
    for (let i = parseInt(lastDigit); i <= 100; i += parseInt(lastDigit)) {
      multiples.push(i);
    }

    const randomIndex = Math.floor(Math.random() * multiples.length);
    const newTarget = multiples[randomIndex];
    return newTarget;
  }

  // Start the game
  function startGame() {
    setCurrentTarget(generateNewTarget());
    setGameStarted(true);
    setAttemptsLeft(4);
    setTimeLeft(60);
    setHintUsed(false);
    setHintMessage('');
    setGameOver(false);
    setHasWon(false);
    setFeedback('');
    setShowFeedback(false);
  }

  // Use a hint
  function useHint() {
    if (!hintUsed) {
      setHintUsed(true);
      if (currentTarget <= 50) {
        setHintMessage('The number is between 1 and 50');
      } else {
        setHintMessage('The number is between 50 and 100');
      }
    }
  }

  // When the user make a guess
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
      setHasWon(true);
    } else {
      const guessDirection = guess < currentTarget ? 'higher' : 'lower';
      setFeedback(`You did not guess correct! You should guess ${guessDirection}`);
      setShowFeedback(true);
    }

    setCurrentGuess('');
  }

  // Timer
  useEffect(() => {
    let interval;
    if (gameStarted && !hasWon && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timeLeft === 0 && !hasWon) {
      endGame('time');
    }
    return () => clearInterval(interval);
  }, [gameStarted, timeLeft, hasWon]);

  function handleTryAgain() {
    setAttemptsLeft((prevAttemptLeft) => prevAttemptLeft - 1);
    setFeedback('');
    setShowFeedback(false);
  }

  function handleUserEndGame() {
    setFeedback('');
    endGame();
  }

  // Logic to end the game
  function endGame(reason) {
    if (reason === 'time') {
      setFeedback("You're out of time.");
    }
    if (reason === 'attempts') {
      setFeedback("You're out of attempts.");
    }
    setGameStarted(false);
    setGameOver(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.restartBtn}>
        <Button title="Restart" onPress={startGame} />
      </View>

      {!gameStarted && !gameOver ? (
        // Game not started
        <View style={styles.card}>
          <Text style={styles.text}>Guess a number between 1 & 100 that is multiply of {lastDigit}.</Text>
          <View style={styles.button}>
            <Button title="Start" onPress={startGame} />
          </View>
        </View>
      ) : !gameOver ? (
        // Game is running
        hasWon ? (
          // Show user won screen
          <View style={styles.card}>
            <Text style={styles.text}>You guessed correct!</Text>
            <Text style={styles.text}>Attempts Used: {4 - attemptsLeft + 1}</Text>
            <Image
              style={styles.image}
              source={{ uri: `https://picsum.photos/id/${currentTarget}/100/100` }}
            />
            <View style={styles.button}>
              <Button title="New Game" onPress={startGame} />
            </View>
          </View>
        ) : showFeedback ? (
          // Show feedback screen
          <View style={styles.card}>
            <Text>{feedback}</Text>
            <View style={styles.button}>
              <Button title="Try Again" onPress={handleTryAgain} />
            </View>
            <View style={styles.button}>
              <Button title="End the Game" onPress={handleUserEndGame} />
            </View>
          </View>
        ) : (
          // Make guess screen
          <View style={styles.card}>
            <Text style={styles.text}>Guess a number between 1 & 100 that is multiply of {lastDigit}.</Text>

            <TextInput
              style={styles.input}
              value={currentGuess}
              onChangeText={setCurrentGuess}
              placeholder="Enter your guess"
              keyboardType="numeric"
            />

            {hintMessage !== '' && <Text style={styles.hintText}>{hintMessage}</Text>}
            <Text style={styles.msgText}>Attempts left: {attemptsLeft}</Text>
            <Text style={styles.msgText}>Timer: {timeLeft}s</Text>


            <View style={styles.button}>
              <Button title="Use a hint" onPress={useHint} disabled={hintUsed} />
            </View>
            <View style={styles.button}>
              <Button title="Submit" onPress={handleGuess} />
            </View>

            {feedback !== '' && <Text>{feedback}</Text>}
          </View>
        )
      ) : (
        // Game Over
        <View style={styles.card}>
          <Text style={styles.text}>The game is over!</Text>
          <Image
            source={require('../assets/sad-smiley.png')}
            style={styles.image}
          />
          <Text style={styles.text}>{feedback}</Text>
          <View style={styles.button}>
            <Button title="New Game" onPress={startGame} />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  restartBtn: {
    position: 'absolute',
    top: 150,
    right: 0,
    margin: 10,
  },

  card: {
    backgroundColor: '#dcdcdc',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  text: {
    fontSize: 16,
    marginBottom: 20,
    color: 'indigo',
  },

  hintText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
  },

  msgText: {
    fontSize: 14,
    color: 'dimgrey',
    marginBottom: 10,
  },

  image: {
    marginBottom: 20,
    width: 100,
    height: 100,
  },

  button: {
    marginBottom: 20,
    marginHorizontal: 30,
    borderColor: 'blue',
  },

  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    padding: 10,
    fontSize: 16,
  },
})