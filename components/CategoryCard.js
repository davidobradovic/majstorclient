import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const CategoryCard = ({ 
  category, 
  onPress, 
  isSelected = false,
  showArrow = true,
  compact = false 
}) => {
  const [loaded, error] = useFonts({
    "Mont-Black": require("../assets/fonts/Montserrat-Black.ttf"),
    "Mont-BlackItalic": require("../assets/fonts/Montserrat-BlackItalic.ttf"),
    "Mont-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
    "Mont-BoldItalic": require("../assets/fonts/Montserrat-BoldItalic.ttf"),
    "Mont-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Mont-ExtraBoldItalic": require("../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    "Mont-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Mont-ExtraLightItalic": require("../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    "Mont-Italic": require("../assets/fonts/Montserrat-Italic.ttf"),
    "Mont-Light": require("../assets/fonts/Montserrat-Light.ttf"),
    "Mont-LightItalic": require("../assets/fonts/Montserrat-LightItalic.ttf"),
    "Mont-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
    "Mont-MediumItalic": require("../assets/fonts/Montserrat-MediumItalic.ttf"),
    "Mont-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
    "Mont-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "Mont-SemiBoldItalic": require("../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Mont-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
    "Mont-ThinItalic": require("../assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  if (!loaded && !error) {
    return null;
  }

  const handlePress = () => {
    if (onPress) {
      onPress(category);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        compact && styles.compactContainer,
        isSelected && styles.selectedContainer
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {/* Icon or Image */}
      {category.image ? (
        <Image
          source={{ uri: category.image }}
          style={[styles.image, compact && styles.compactImage]}
          resizeMode="cover"
        />
      ) : (
        <View style={[
          styles.iconContainer, 
          compact && styles.compactIconContainer,
          { backgroundColor: category.color || '#4ade80' }
        ]}>
          <Ionicons 
            name={category.icon || 'construct-outline'} 
            size={compact ? 20 : 24} 
            color="white" 
          />
        </View>
      )}

      {/* Content */}
      <View style={[styles.content, compact && styles.compactContent]}>
        <Text 
          style={[
            styles.title, 
            { fontFamily: 'Mont-SemiBold' },
            compact && styles.compactTitle,
            isSelected && styles.selectedTitle
          ]} 
          numberOfLines={compact ? 1 : 2}
        >
          {category.name}
        </Text>
        
        {!compact && category.description && (
          <Text 
            style={[
              styles.description, 
              { fontFamily: 'Mont-Regular' }
            ]} 
            numberOfLines={2}
          >
            {category.description}
          </Text>
        )}

        {!compact && category.serviceCount && (
          <View style={styles.serviceCount}>
            <Text style={[styles.serviceCountText, { fontFamily: 'Mont-Regular' }]}>
              {category.serviceCount} usluga
            </Text>
          </View>
        )}
      </View>

      {/* Arrow */}
      {showArrow && (
        <View style={styles.arrowContainer}>
          <Ionicons 
            name="chevron-forward" 
            size={16} 
            color={isSelected ? '#4ade80' : '#9CA3AF'} 
          />
        </View>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <View style={styles.selectionIndicator}>
          <Ionicons name="checkmark-circle" size={20} color="#4ade80" />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  compactContainer: {
    padding: 12,
    marginBottom: 8,
  },
  selectedContainer: {
    backgroundColor: '#EFF6FF',
    borderWidth: 2,
    borderColor: '#4ade80',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 16,
  },
  compactImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  compactIconContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  compactContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
    lineHeight: 22,
  },
  compactTitle: {
    fontSize: 14,
    marginBottom: 0,
  },
  selectedTitle: {
    color: '#4ade80',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
    lineHeight: 20,
  },
  serviceCount: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  serviceCountText: {
    fontSize: 12,
    color: '#374151',
  },
  arrowContainer: {
    marginLeft: 8,
  },
  selectionIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

export default CategoryCard;
