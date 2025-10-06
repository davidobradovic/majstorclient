import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useFonts } from 'expo-font';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import ApiService from '../services/ApiService';

const { width } = Dimensions.get('window');

const Banners = () => {
  const { banners, apiLoading, error: apiError, fetchBanners } = useAuth();
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);

  const [loaded, fontError] = useFonts({
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

  // Load banners from API
  useEffect(() => {
    const loadBanners = async () => {
      if (banners.length === 0) {
        await fetchBanners();
      }
      setLoading(false);
    };
    loadBanners();
  }, [banners.length, fetchBanners]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleBannerPress = async (banner) => {
    try {
      // Record banner click
      await ApiService.recordBannerClick(banner.id);
      
      // Handle banner press - navigate to specific screen or show modal
      console.log('Banner pressed:', banner.title);
      
      // You can add navigation logic here based on banner type
      if (banner.actionUrl) {
        // Handle external URL
        console.log('Navigate to:', banner.actionUrl);
      }
    } catch (error) {
      console.error('Error recording banner click:', error);
    }
  };

  if (!loaded && !fontError) {
    return null;
  }

  // Show loading state
  if (loading || apiLoading) {
    return (
      <View style={styles.container}>
        <View style={[styles.bannerContainer, styles.loadingContainer]}>
          <ActivityIndicator size="large" color="#4ade80" />
          <Text style={[styles.loadingText, { fontFamily: 'Mont-Regular' }]}>
            Učitavanje banera...
          </Text>
        </View>
      </View>
    );
  }

  // Show error state
  if (apiError) {
    return (
      <View style={styles.container}>
        <View style={[styles.bannerContainer, styles.errorContainer]}>
          <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
          <Text style={[styles.errorText, { fontFamily: 'Mont-Medium' }]}>
            Greška pri učitavanju banera
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => {
              setLoading(true);
              fetchBanners();
            }}
          >
            <Text style={[styles.retryText, { fontFamily: 'Mont-Medium' }]}>
              Pokušaj ponovo
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Show empty state
  if (!banners || banners.length === 0) {
    return (
      <View style={styles.container}>
        <View style={[styles.bannerContainer, styles.emptyContainer]}>
          <Ionicons name="image-outline" size={48} color="#9CA3AF" />
          <Text style={[styles.emptyText, { fontFamily: 'Mont-Medium' }]}>
            Trenutno nema aktivnih banera
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.bannerContainer}>
        {banners[currentBanner] && (
          <TouchableOpacity
            key={banners[currentBanner].id}
            onPress={() => handleBannerPress(banners[currentBanner])}
            activeOpacity={0.9}
          >
            <Image
              source={{ 
                uri: banners[currentBanner].imageUrl || banners[currentBanner].image || 
                     'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=400&fit=crop'
              }}
              style={styles.bannerImage}
              resizeMode="cover"
            />
            
            {/* Gradient overlay */}
            <View style={[styles.overlay, { backgroundColor: `${banners[currentBanner].color || '#4ade80'}80` }]} />
            
            {/* Content */}
            <View style={styles.bannerContent}>
              <View style={styles.bannerText}>
                <Text style={[styles.bannerTitle, { fontFamily: 'Mont-Bold' }]}>
                  {banners[currentBanner].title || 'Specijalna ponuda'}
                </Text>
                <Text style={[styles.bannerSubtitle, { fontFamily: 'Mont-SemiBold' }]}>
                  {banners[currentBanner].subtitle || 'Ograničeno vreme'}
                </Text>
                <Text style={[styles.bannerDescription, { fontFamily: 'Mont-Regular' }]}>
                  {banners[currentBanner].description || banners[currentBanner].content || 'Saznajte više o našoj ponudi'}
                </Text>
              </View>
              
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: banners[currentBanner].color || '#4ade80' }]}
                onPress={() => handleBannerPress(banners[currentBanner])}
              >
                <Text style={[styles.actionText, { fontFamily: 'Mont-SemiBold' }]}>
                  {banners[currentBanner].actionText || banners[currentBanner].action || 'Saznaj više'}
                </Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        </View>

      {/* Pagination dots */}
      {banners.length > 1 && (
        <View style={styles.pagination}>
          {banners.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentBanner(index)}
              style={[
                styles.dot,
                currentBanner === index && styles.activeDot
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  bannerContainer: {
    position: 'relative',
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bannerContent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    justifyContent: 'space-between',
  },
  bannerText: {
    flex: 1,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 24,
    color: 'white',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 8,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  bannerDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.8,
    lineHeight: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    color: 'white',
    fontSize: 14,
    marginRight: 8,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#4ade80',
    width: 28,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: '#EF4444',
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#EF4444',
    borderRadius: 20,
  },
  retryText: {
    color: 'white',
    fontSize: 14,
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default Banners;