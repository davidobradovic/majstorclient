import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const ModernCard = ({ 
  children, 
  onPress, 
  style, 
  padding = 16,
  margin = 0,
  shadow = true,
  borderRadius = 12,
  backgroundColor = 'white'
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[
        styles.card,
        {
          padding,
          margin,
          borderRadius,
          backgroundColor,
          ...(shadow && styles.shadow)
        },
        style
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </CardComponent>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default ModernCard;
