import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('StartScreen');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  function handleRegister({name, email, phoneNumber}) {
    setName(name);
    setEmail(email);
    setPhoneNumber(phoneNumber);
    setCurrentScreen('ConfirmScreen');
  }

  function handleConfirm() {
    setCurrentScreen('GameScreen');
  }

  function handleGoBack() {
    setCurrentScreen('StartScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {currentScreen === 'StartScreen' && (
        <StartScreen onRegister={handleRegister} />
      )}
      {currentScreen === 'ConfirmScreen' && (
        <ConfirmScreen
          visible
          name={name}
          email={email}
          phoneNumber={phoneNumber}
          onGoBack={handleGoBack}
          onContinue={handleConfirm}
        />
      )}
      {currentScreen === 'GameScreen' && (
        <GameScreen />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
