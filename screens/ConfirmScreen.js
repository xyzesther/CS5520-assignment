import { StyleSheet, Text, View, Modal, Button } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function ConfirmScreen({ modalVisible, name, email, phoneNumber, onGoBack, onContinue }) {
  return (
    <Modal animationType='slide' visible={modalVisible} >
      <LinearGradient 
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={styles.gradientBackground}
      />
      <View style={styles.container}>
        <View style={styles.insideContainer}>
          <Text>Hello {name}</Text>
          <Text>Here is the information you entered: </Text>
          <Text>{email}</Text>
          <Text>{phoneNumber}</Text>
          <Text>If it is not correct, please go back and edit them</Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button 
                style={styles.backButton}
                title="Go Back" 
                onPress={onGoBack} 
              />
            </View>
            <View style={styles.continueButton}>
              <Button 
                title="Continue" 
                onPress={onContinue} 
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gradientBackground: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },

  insideContainer: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },

  buttonContainer: {
    width: '40%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    marginHorizontal: 10,
  },
})