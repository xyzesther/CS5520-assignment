import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Alert, Button, SafeAreaView } from 'react-native'
import { CheckBox } from 'react-native-elements'

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
    if (!email || !email.includes('@')) {
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
      <View style={styles.form}>
        <Text style={styles.label}>Name: </Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={handleNameChange}
        />
        {errorMsg.name ? <Text style={styles.errorMsg}>{errorMsg.name}</Text> : null}

        <Text style={styles.label}>Email Address: </Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={handleEmailChange}
          keyboardType="email-address"
        />
        {errorMsg.email ? <Text style={styles.errorMsg}>{errorMsg.email}</Text> : null}

        <Text style={styles.label}>Phone Number: </Text>
        <TextInput 
          style={styles.input}
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
          <View style={styles.button}>
            <Button 
              title="Reset" 
              onPress={handleReset} 
              color="red"/>
          </View>
          <View style={styles.button}>
            <Button 
              title="Register" 
              onPress={handleRegister} 
              disabled={!isCheckBoxChecked}
              color="blue"
            />
          </View>
        </View>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEFA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    backgroundColor: '#A9A9A9',
    borderRadius: 20,
    padding: 20,
    width: '90%',
  },

  welcome: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'indigo',
    marginBottom: 20,
    textAlign: 'center',
  },

  label: {
    color: 'indigo',
    fontSize: 18,
    marginBottom: 5,
    marginTop: 10,
  },

  input: {
    borderBottomColor: 'indigo',
    borderBottomWidth: 2,
    marginBottom: 10,
    fontSize: 16,
    paddingVertical: 5,
  },

  errorMsg: {
    color: 'red',
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
    color: 'indigo',
    fontSize: 16,
    paddingLeft: 0,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  button: {
    marginHorizontal: 30,
    borderColor: 'blue',
  },
});
