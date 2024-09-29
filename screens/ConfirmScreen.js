import { StyleSheet, Text, View, Modal, Button } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function ConfirmScreen({ modalVisible, name, email, phoneNumber, onGoBack, onContinue }) {
  return (
    <Modal 
      animationType='slide' 
      transparent={true}
      visible={modalVisible} >
      <View style={styles.modalBackground}>

        <View style={styles.modalContainer}>
          <Text style={styles.text}>Hello {name}</Text>
          <Text style={styles.text}>Here is the information you entered: </Text>
          <Text style={styles.text}>{email}</Text>
          <Text style={styles.text}>{phoneNumber}</Text>
          <Text style={styles.text}>If it is not correct, please go back and edit them.</Text>
          
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button 
                title="Go Back" 
                onPress={onGoBack}
                color="red" 
              />
            </View>
            <View style={styles.button}>
              <Button 
                title="Continue" 
                onPress={onContinue}
                color="blue" 
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    width: '90%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
  },

  text: {
    fontSize: 16,
    color: 'indigo',
    marginBottom: 5,
  },

  buttonContainer: {
    width: '80%',
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  button: {
    marginHorizontal: 30,
    borderColor: 'blue',
  },
})