import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingSpinner = ({ 
  size = "large", 
  color = "#4ade80", 
  message = "Učitavanje...",
  showMessage = true 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      {showMessage && (
        <Text style={[styles.message, { fontFamily: 'Mont-Regular' }]}>
          {message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  message: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default LoadingSpinner;
