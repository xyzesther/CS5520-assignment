import React, { useState } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { colors } from '../colors';

export default function StartScreen({ onRegister, initialName, initialEmail, initialPhoneNumber }) {
  const [name, setName] = useState(initialName || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState({name: '', email: '', phoneNumber: ''});

  function validateName(name) {
    if (!name || name.length < 2 || !isNaN(name)) {
      return 'Please enter a valid name';
    }
    return '';
  }

  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  function validatePhoneNumber(phoneNumber) {
    const numericRegex = /^[0-9]+$/;
    const lastDigit = phoneNumber.charAt(phoneNumber.length - 1);

    if (!phoneNumber || !numericRegex.test(phoneNumber) 
        || phoneNumber.length !== 10 
        || lastDigit === '1' || lastDigit === '0') {
      return 'Please enter a valid phone number';
    }
    return '';
  }

  function handleNameChange(name) {
    setName(name);
    setErrorMsg({...errorMsg, name: validateName(name)});
  }

  function handleEmailChange(email) {
    setEmail(email);
    setErrorMsg({...errorMsg, email: validateEmail(email)});
  }

  function handlePhoneNumberChange(phoneNumber) {
    setPhoneNumber(phoneNumber);
    setErrorMsg({...errorMsg, phoneNumber: validatePhoneNumber(phoneNumber)});
  }

  function handleCheckBox() {
    setIsCheckBoxChecked(!isCheckBoxChecked);
  }

  function handleRegister() {
    if (!errorMsg.name && !errorMsg.email && !errorMsg.phoneNumber) {
      onRegister({ name, email, phoneNumber });
    } else {
      Alert.alert('Invalid input', 'Please check input values', [{text: 'OK'}]);
    }
  }

  function handleReset() {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setIsCheckBoxChecked(false);
    setErrorMsg({name: '', email: '', phoneNumber: ''});
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text> 
      <Card>
        <Text style={styles.label}>Name: </Text>
        <Input 
          value={name}
          onChangeText={handleNameChange}
          autoCapitalize="none"
        />
        {errorMsg.name ? <Text style={styles.errorMsg}>{errorMsg.name}</Text> : null}

        <Text style={styles.label}>Email Address: </Text>
        <Input 
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {errorMsg.email ? <Text style={styles.errorMsg}>{errorMsg.email}</Text> : null}

        <Text style={styles.label}>Phone Number: </Text>
        <Input 
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
          keyboardType="numeric"
        />
        {errorMsg.phoneNumber ? <Text style={styles.errorMsg}>{errorMsg.phoneNumber}</Text> : null}
      
        <View style={styles.checkboxContainer}>
          <CheckBox 
            checked={isCheckBoxChecked}
            onPress={handleCheckBox}
            iconType="material-community"
            checkedIcon="checkbox-outline"
            uncheckedIcon="checkbox-blank-outline"
          />
          <Text style={styles.checkboxText}>I am not a robot</Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button 
            title="Reset" 
            onPress={handleReset} 
            color="secondary"
          />
          <Button 
            title="Register" 
            onPress={handleRegister} 
            disabled={!isCheckBoxChecked}
            color="primary"
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.accent,
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    color: colors.text.primary,
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },

  errorMsg: {
    color: colors.error,
    fontSize: 12,
    marginBottom: 5,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },

  checkboxText: {
    color: colors.text.primary,
    fontSize: 16,
    paddingLeft: 0,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginButton: 20,
  },

});
