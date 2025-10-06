import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

// Import components
import Banners from '../components/Banners';
import Categories from '../components/Categories';
import BestServices from '../components/BestServices';
import NextThingOnYourMind from '../components/NextThingOnYourMind';
import CleaningAndPest from '../components/CleaningAndPest';
import Divider from '../components/Divider';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorBoundary from '../components/ErrorBoundary';

const HomeScreen = ({ navigation }) => {
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

  const { user, profile, categories, apiLoading, error } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Beograd, Srbija');

  useEffect(() => {
    // Load user location or use default
    if (profile?.address?.city) {
      setCurrentLocation(`${profile.address.city}, Srbija`);
    }
  }, [profile]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Search', { query: searchQuery });
    }
  };

  const handleLocationPress = () => {
    // Navigate to location selection
    console.log('Location pressed');
  };

  const handleNotificationPress = () => {
    // Handle notifications
    console.log('Notifications pressed');
  };

  if (!loaded && !fontError) {
    return <LoadingSpinner message="Učitavanje aplikacije..." />;
  }

  // Show error state
  if (error) {
    return (
      <ErrorBoundary 
        error={error}
        onRetry={() => window.location.reload()}
        title="Greška u aplikaciji"
        message="Došlo je do greške prilikom učitavanja aplikacije"
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.locationContainer}>
            <TouchableOpacity onPress={handleLocationPress} style={styles.locationButton}>
              <Ionicons name="location-outline" size={20} color="#4ade80" />
              <Text style={[styles.locationText, { fontFamily: 'Mont-Medium' }]}>
                {currentLocation}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6B7280" />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={handleNotificationPress} style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#374151" />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>

        {/* Welcome Message */}
        <View style={styles.welcomeContainer}>
          <Text style={[styles.welcomeText, { fontFamily: 'Mont-Regular' }]}>
            Dobrodošli,
          </Text>
          <Text style={[styles.userName, { fontFamily: 'Mont-Bold' }]}>
            {user?.firstName || profile?.firstName || 'Korisnik'}!
          </Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
            <TextInput
              style={[styles.searchInput, { fontFamily: 'Mont-Regular' }]}
              placeholder="Pretražite usluge ili majstore..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Banners */}
        <Banners />
        
        <Divider marginVertical={8} />
        
        {/* Quick Actions
        <NextThingOnYourMind />
         */}
        <Divider marginVertical={8} />
        
        {/* Categories */}
        <Categories categories={categories} />
        
        <Divider marginVertical={12} />
        
        {/* Best Services */}
        <BestServices />
        
        <Divider marginVertical={12} />
        
        {/* Cleaning and Pest Control */}
        <CleaningAndPest />
        
        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 24,
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  locationContainer: {
    flex: 1,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  locationText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 6,
    marginRight: 4,
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  welcomeContainer: {
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 8,
  },
  userName: {
    fontSize: 26,
    color: '#1F2937',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  clearButton: {
    marginLeft: 8,
  },
  searchButton: {
    backgroundColor: '#4ade80',
    padding: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4ade80',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  bottomSpacing: {
    height: 32,
  },
});

export default HomeScreen;
