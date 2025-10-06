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
  FlatList,
  Image,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

const SearchScreen = ({ navigation }) => {
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

  const route = useRoute();
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [activeTab, setActiveTab] = useState('all');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fake search results data
  const fakeSearchResults = [
    {
      id: 1,
      type: 'service',
      title: 'Servis veš mašine',
      worker: 'Marko Petrović',
      rating: 4.9,
      reviews: 156,
      price: '2500 RSD',
      image: 'https://images.unsplash.com/photo-1631241470625-8c3cb167ef06?w=400&h=300&fit=crop',
      category: 'Aparati',
      verified: true,
      experience: '8 godina'
    },
    {
      id: 2,
      type: 'worker',
      name: 'Ana Jovanović',
      rating: 4.8,
      reviews: 142,
      hourlyRate: '3000 RSD',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=300&fit=crop',
      category: 'Električar',
      verified: true,
      experience: '5 godina',
      available: true
    },
    {
      id: 3,
      type: 'service',
      title: 'Popravka rerna',
      worker: 'Stefan Nikolić',
      rating: 4.9,
      reviews: 203,
      price: '3000 RSD',
      image: 'https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=400&h=300&fit=crop',
      category: 'Aparati',
      verified: true,
      experience: '12 godina'
    },
    {
      id: 4,
      type: 'worker',
      name: 'Mila Đorđević',
      rating: 4.7,
      reviews: 98,
      hourlyRate: '3500 RSD',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop',
      category: 'Vodoinstalater',
      verified: false,
      experience: '6 godina',
      available: true
    }
  ];

  useEffect(() => {
    if (searchQuery.trim()) {
      performSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const performSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const filteredResults = fakeSearchResults.filter(item => {
        const query = searchQuery.toLowerCase();
        if (item.type === 'service') {
          return item.title.toLowerCase().includes(query) ||
                 item.worker.toLowerCase().includes(query) ||
                 item.category.toLowerCase().includes(query);
        } else {
          return item.name.toLowerCase().includes(query) ||
                 item.category.toLowerCase().includes(query);
        }
      });
      setSearchResults(filteredResults);
      setIsLoading(false);
    }, 500);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      performSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleResultPress = (result) => {
    if (result.type === 'service') {
      // Navigate to service details
      console.log('Service pressed:', result.title);
    } else {
      // Navigate to worker profile
      console.log('Worker pressed:', result.name);
    }
  };

  const renderServiceResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => handleResultPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={[styles.resultTitle, { fontFamily: 'Mont-SemiBold' }]} numberOfLines={2}>
            {item.title}
          </Text>
          <View style={styles.categoryBadge}>
            <Text style={[styles.categoryText, { fontFamily: 'Mont-Medium' }]}>
              {item.category}
            </Text>
          </View>
        </View>
        
        <Text style={[styles.workerName, { fontFamily: 'Mont-Medium' }]}>
          {item.worker}
        </Text>
        
        <View style={styles.resultMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={[styles.ratingText, { fontFamily: 'Mont-Medium' }]}>
              {item.rating}
            </Text>
            <Text style={[styles.reviewsText, { fontFamily: 'Mont-Regular' }]}>
              ({item.reviews})
            </Text>
          </View>
          
          <Text style={[styles.priceText, { fontFamily: 'Mont-Bold' }]}>
            {item.price}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderWorkerResult = ({ item }) => (
    <TouchableOpacity
      style={styles.resultCard}
      onPress={() => handleResultPress(item)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultContent}>
        <View style={styles.resultHeader}>
          <Text style={[styles.resultTitle, { fontFamily: 'Mont-SemiBold' }]} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.categoryBadge}>
            <Text style={[styles.categoryText, { fontFamily: 'Mont-Medium' }]}>
              {item.category}
            </Text>
          </View>
        </View>
        
        <View style={styles.workerInfo}>
          <Text style={[styles.experienceText, { fontFamily: 'Mont-Regular' }]}>
            {item.experience} iskustva
          </Text>
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={12} color="#10B981" />
            </View>
          )}
        </View>
        
        <View style={styles.resultMeta}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#F59E0B" />
            <Text style={[styles.ratingText, { fontFamily: 'Mont-Medium' }]}>
              {item.rating}
            </Text>
            <Text style={[styles.reviewsText, { fontFamily: 'Mont-Regular' }]}>
              ({item.reviews})
            </Text>
          </View>
          
          <Text style={[styles.priceText, { fontFamily: 'Mont-Bold' }]}>
            {item.hourlyRate}/h
          </Text>
        </View>
        
        {item.available && (
          <View style={styles.availabilityBadge}>
            <Text style={[styles.availabilityText, { fontFamily: 'Mont-Medium' }]}>
              Dostupan
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const renderResult = ({ item }) => {
    if (item.type === 'service') {
      return renderServiceResult({ item });
    } else {
      return renderWorkerResult({ item });
    }
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        
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
              autoFocus
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={handleClearSearch} style={styles.clearButton}>
                <Ionicons name="close-circle" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[
              styles.tabText, 
              { fontFamily: 'Mont-Medium' },
              activeTab === 'all' && styles.activeTabText
            ]}>
              Sve
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'services' && styles.activeTab]}
            onPress={() => setActiveTab('services')}
          >
            <Text style={[
              styles.tabText, 
              { fontFamily: 'Mont-Medium' },
              activeTab === 'services' && styles.activeTabText
            ]}>
              Usluge
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tab, activeTab === 'workers' && styles.activeTab]}
            onPress={() => setActiveTab('workers')}
          >
            <Text style={[
              styles.tabText, 
              { fontFamily: 'Mont-Medium' },
              activeTab === 'workers' && styles.activeTabText
            ]}>
              Majstori
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Results */}
      <View style={styles.resultsContainer}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { fontFamily: 'Mont-Regular' }]}>
              Pretražujem...
            </Text>
          </View>
        ) : searchResults.length > 0 ? (
          <FlatList
            data={searchResults.filter(item => {
              if (activeTab === 'services') return item.type === 'service';
              if (activeTab === 'workers') return item.type === 'worker';
              return true;
            })}
            renderItem={renderResult}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.resultsList}
          />
        ) : searchQuery.trim() ? (
          <View style={styles.noResultsContainer}>
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text style={[styles.noResultsTitle, { fontFamily: 'Mont-SemiBold' }]}>
              Nema rezultata
            </Text>
            <Text style={[styles.noResultsText, { fontFamily: 'Mont-Regular' }]}>
              Pokušajte sa drugim ključnim rečima
            </Text>
          </View>
        ) : (
          <View style={styles.initialStateContainer}>
            <Ionicons name="search-outline" size={64} color="#D1D5DB" />
            <Text style={[styles.initialStateTitle, { fontFamily: 'Mont-SemiBold' }]}>
              Pretražite usluge
            </Text>
            <Text style={[styles.initialStateText, { fontFamily: 'Mont-Regular' }]}>
              Pronađite majstore i usluge u vašoj okolini
            </Text>
          </View>
        )}
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  searchContainer: {
    flex: 1,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
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
  tabsContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginRight: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4ade80',
  },
  tabText: {
    fontSize: 16,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#4ade80',
  },
  resultsContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  noResultsTitle: {
    fontSize: 20,
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  noResultsText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  initialStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  initialStateTitle: {
    fontSize: 20,
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  initialStateText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  resultsList: {
    padding: 16,
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  resultImage: {
    width: 100,
    height: 100,
  },
  resultContent: {
    flex: 1,
    padding: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 16,
    color: '#1F2937',
    flex: 1,
    marginRight: 8,
  },
  categoryBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#4ade80',
  },
  workerName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  workerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  experienceText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 8,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  resultMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
    marginRight: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  priceText: {
    fontSize: 16,
    color: '#4ade80',
  },
  availabilityBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  availabilityText: {
    fontSize: 12,
    color: '#059669',
  },
});

export default SearchScreen;
