import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const StatusBadge = ({ status, size = 'medium' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'requested':
        return { text: 'Zatraženo', color: '#3B82F6', bgColor: '#EFF6FF' };
      case 'accepted':
        return { text: 'Prihvaćeno', color: '#10B981', bgColor: '#ECFDF5' };
      case 'inProgress':
        return { text: 'U toku', color: '#F59E0B', bgColor: '#FFFBEB' };
      case 'completed':
        return { text: 'Završeno', color: '#059669', bgColor: '#ECFDF5' };
      case 'cancelled':
        return { text: 'Otkazano', color: '#DC2626', bgColor: '#FEF2F2' };
      case 'rejected':
        return { text: 'Odbijeno', color: '#DC2626', bgColor: '#FEF2F2' };
      default:
        return { text: status || 'Nepoznato', color: '#6B7280', bgColor: '#F3F4F6' };
    }
  };

  const config = getStatusConfig(status);
  const sizeStyles = getSizeStyles(size);

  return (
    <View style={[styles.container, sizeStyles.container, { backgroundColor: config.bgColor }]}>
      <Text style={[
        styles.text, 
        sizeStyles.text, 
        { color: config.color, fontFamily: 'Mont-Medium' }
      ]}>
        {config.text}
      </Text>
    </View>
  );
};

const getSizeStyles = (size) => {
  switch (size) {
    case 'small':
      return {
        container: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
        text: { fontSize: 12 }
      };
    case 'large':
      return {
        container: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
        text: { fontSize: 16 }
      };
    default: // medium
      return {
        container: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
        text: { fontSize: 14 }
      };
  }
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '500',
  },
});

export default StatusBadge;
