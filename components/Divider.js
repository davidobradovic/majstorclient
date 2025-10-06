
import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({ 
  height = 1, 
  color = '#E5E7EB', 
  marginVertical = 20,
  marginHorizontal = 0,
  style 
}) => {
  return (
    <View 
      style={[
        styles.divider, 
        { 
          height, 
          backgroundColor: color, 
          marginVertical, 
          marginHorizontal 
        },
        style
      ]} 
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});

export default Divider;
