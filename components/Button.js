import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../colors';

export const Button = ({ title, onPress, color = 'primary', disabled }) => (
  <TouchableOpacity
    style={[
      styles.button,
      { backgroundColor: disabled ? colors.button.disabled : colors.button[color] },
      disabled && styles.disabledButton
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[styles.buttonText, disabled && styles.disabledButtonText]}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  disabledButton: {
    backgroundColor: colors.button.disabled,
  },

  disabledButtonText: {
    color: colors.button.disabledText,
  },
});