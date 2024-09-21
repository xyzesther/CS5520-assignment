import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, Alert, Button } from 'react-native'
import { CheckBox } from 'react-native-elements'

function StartScreen({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState({name: '', email: '', phoneNumber: ''});

  const validateName = (name) => {
    if (!name || name.length < 2 || name.isNaN()) {
      return 'Please enter a valid name (non-numeric, at least 2 characters)';
    }
    return '';
  }

  const validateEmail = (email) => {
    if (!email || !email.includes('@')) {
      return 'Please enter a valid email address';
    }
    return '';
  }

  const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber || phoneNumber.length < 10 
       || phoneNumber.length > 10 || phoneNumber.indexOF('0') !== 10 
       || phoneNumber.indexOF('1') !== 10) {
      return 'Please enter a valid phone number (10 numerical characters)';
    }
    return '';
  }

  const validateForm = () => {
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const phoneNumberError = validatePhoneNumber(phoneNumber);
    setErrorMsg({name: nameError, email: emailError, phoneNumber: phoneNumberError});
    return !nameError && !emailError && !phoneNumberError;
  }

  const handleRegister = () => {
    if (validateForm()) {
      onRegister({ name, email, phoneNumber });
    } else {
      Alert.alert('Invalid input', 'Please check your input', [{text: 'OK'}]);
    }
  }

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhoneNumber('');
    setIsCheckBoxChecked(false);
    setErrorMsg({name: '', email: '', phoneNumber: ''});
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Name: </Text>
        <TextInput 
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        {errorMsg.name ? <Text style={styles.errorMsg}>{errorMsg.name}</Text> : null}

        <Text style={styles.label}>Email Address: </Text>
        <TextInput 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errorMsg.email ? <Text style={styles.errorMsg}>{errorMsg.email}</Text> : null}

        <Text style={styles.label}>Phone Number: </Text>
        <TextInput 
          style={styles.input}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="numeric"
        />
        {errorMsg.phoneNumber ? <Text style={styles.errorMsg}>{errorMsg.phoneNumber}</Text> : null}
      
        <View style={styles.checkboxContainer}>
          <CheckBox 
            value={isCheckBoxChecked}
            onValueChange={setIsCheckBoxChecked}
          />
          <Text>I am not a robot</Text>
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
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },

  form: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },

  label: {
    color: "blue",
    fontSize: 16,
    marginBottom: 5,
  },

  input: {
    borderBottomColor: "blue",
    borderBottomWidth: 2,
    marginBottom: 20,
  },

  errorMsg: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  buttonContainer: {
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    marginHorizontal: 30,
    borderColor: 'blue',
  },
});

export default StartScreen
