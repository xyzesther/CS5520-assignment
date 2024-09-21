import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import StartScreen from './screens/StartScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('StartScreen');
  const [userData, setUserData] = useState({name: '', email: '', phoneNumber: ''});

  const handleRegister = (name, email, phoneNumber) => {
    setUserData({ name, email, phoneNumber});
    setCurrentScreen('ConfirmScreen');
  }

  return (
    <SafeAreaView style={styles.container}>
      {currentScreen === 'StartScreen' && (
        <StartScreen onRegister={handleRegister} />
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
