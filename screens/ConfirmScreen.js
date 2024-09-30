import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { colors } from '../colors'

export default function ConfirmScreen({ modalVisible, name, email, phoneNumber, onGoBack, onContinue }) {
  return (
    <Modal 
      animationType='slide' 
      transparent={true}
      visible={modalVisible} 
    >
      <View style={styles.modalBackground}>
        <Card style={styles.modalContainer}>
          <Text style={styles.text}>Hello {name}</Text>
          <Text style={styles.text}>Here is the information you entered: </Text>
          <Text style={styles.text}>{email}</Text>
          <Text style={styles.text}>{phoneNumber}</Text>
          <Text style={styles.text}>If it is not correct, please go back and edit them.</Text>
          
          <View style={styles.buttonContainer}>
            <Button 
              title="Go Back" 
              onPress={onGoBack}
              color="secondary" 
            />
            <Button 
              title="Continue" 
              onPress={onContinue}
              color="primary" 
            />
          </View>
        </Card>
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
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
    alignItems: 'flex-start',
  },

  text: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 5,
  },

  buttonContainer: {
    width: '80%',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

})