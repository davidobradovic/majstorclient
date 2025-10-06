import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ErrorBoundary = ({ error, onRetry, title = "Došlo je do greške", message = "Nešto je pošlo naopako" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.errorContent}>
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text style={[styles.title, { fontFamily: 'Mont-Bold' }]}>
          {title}
        </Text>
        <Text style={[styles.message, { fontFamily: 'Mont-Regular' }]}>
          {message}
        </Text>
        {error && (
          <Text style={[styles.errorDetails, { fontFamily: 'Mont-Regular' }]}>
            {error}
          </Text>
        )}
        {onRetry && (
          <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
            <Ionicons name="refresh" size={20} color="white" />
            <Text style={[styles.retryText, { fontFamily: 'Mont-Medium' }]}>
              Pokušaj ponovo
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
  errorContent: {
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    fontSize: 20,
    color: '#1F2937',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 16,
  },
  errorDetails: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4ade80',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ErrorBoundary;
