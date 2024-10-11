import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import StartScreen from './screens/StartScreen';
import ConfirmScreen from './screens/ConfirmScreen';
import GameScreen from './screens/GameScreen';
import { colors } from './colors';

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
    <LinearGradient
        colors={colors.background}
        style={styles.container}
      >
      <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
        {currentScreen === 'StartScreen' && (
          <StartScreen 
          onRegister={handleRegister} 
          initialName={name}
          initialEmail={email}
          initialPhoneNumber={phoneNumber}
          />
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
          <GameScreen 
            phoneNumber={phoneNumber}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
  },
});