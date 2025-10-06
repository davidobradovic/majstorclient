import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmptyState = ({ 
  icon = "document-outline",
  title = "Nema podataka",
  message = "Trenutno nema dostupnih podataka",
  actionText,
  onAction,
  iconColor = "#9CA3AF",
  iconSize = 64
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name={icon} size={iconSize} color={iconColor} />
        <Text style={[styles.title, { fontFamily: 'Mont-Medium' }]}>
          {title}
        </Text>
        <Text style={[styles.message, { fontFamily: 'Mont-Regular' }]}>
          {message}
        </Text>
        {actionText && onAction && (
          <TouchableOpacity style={styles.actionButton} onPress={onAction}>
            <Text style={[styles.actionText, { fontFamily: 'Mont-Medium' }]}>
              {actionText}
            </Text>
            <Ionicons name="arrow-forward" size={16} color="#4ade80" />
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
    padding: 20,
    backgroundColor: '#F9FAFB',
  },
  content: {
    alignItems: 'center',
    maxWidth: 280,
  },
  title: {
    fontSize: 18,
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4ade80',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    color: '#4ade80',
    fontSize: 16,
  },
});

export default EmptyState;
