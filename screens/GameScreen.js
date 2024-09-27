import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button } from 'react-native-elements';

export default function GameScreen({ phoneNumber, onRestart }) {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentTarget, setCurrentTarget] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(4);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentGuess, setCurrentGuess] = useState('');
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
        <Text>Game Started</Text>
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