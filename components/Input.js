import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../colors';

export const Input = ({ value, onChangeText, ...props }) => (
  <TextInput
    style={styles.input}
    value={value}
    onChangeText={onChangeText}
    {...props}
  />
);

const styles = StyleSheet.create({
  input: {
    borderBottomColor: colors.accent,
    borderBottomWidth: 2,
    marginBottom: 10,
    fontSize: 18,
    paddingVertical: 5,
    textAlign: 'center',
    color: colors.accent,
    fontWeight: 'bold',
  },
});