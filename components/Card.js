import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../colors';

export const Card = ({ children, style }) => (
  <View style={{ ...styles.card, ...style }}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: colors.shadow,
  },
});