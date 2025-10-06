import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../services/ApiService';

const WokerScreen = ({ navigation, route }) => {
  const { user, apiLoading, error: apiError } = useAuth();
  const [worker, setWorker] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [loaded, fontError] = useFonts({
    "Mont-Black": require("../../assets/fonts/Montserrat-Black.ttf"),
    "Mont-BlackItalic": require("../../assets/fonts/Montserrat-BlackItalic.ttf"),
    "Mont-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Mont-BoldItalic": require("../../assets/fonts/Montserrat-BoldItalic.ttf"),
    "Mont-ExtraBold": require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
    "Mont-ExtraBoldItalic": require("../../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
    "Mont-ExtraLight": require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
    "Mont-ExtraLightItalic": require("../../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
    "Mont-Italic": require("../../assets/fonts/Montserrat-Italic.ttf"),
    "Mont-Light": require("../../assets/fonts/Montserrat-Light.ttf"),
    "Mont-LightItalic": require("../../assets/fonts/Montserrat-LightItalic.ttf"),
    "Mont-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
    "Mont-MediumItalic": require("../../assets/fonts/Montserrat-MediumItalic.ttf"),
    "Mont-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
    "Mont-SemiBold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
    "Mont-SemiBoldItalic": require("../../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
    "Mont-Thin": require("../../assets/fonts/Montserrat-Thin.ttf"),
    "Mont-ThinItalic": require("../../assets/fonts/Montserrat-ThinItalic.ttf"),
  });

  // Load worker data
  useEffect(() => {
    const loadWorkerData = async () => {
      try {
        setLoading(true);
        const workerId = route.params?.workerId;
        
        if (workerId) {
          const response = await ApiService.getWorkerById(workerId);
          if (response.success) {
            setWorker(response.data);
          } else {
            setError(response.message);
          }
        } else {
          setError('Worker ID not provided');
        }
      } catch (error) {
        console.error('Error loading worker data:', error);
        setError('Failed to load worker data');
      } finally {
        setLoading(false);
      }
    };

    loadWorkerData();
  }, [route.params?.workerId]);

  const [activeTab, setActiveTab] = useState('about');
  const [selectedService, setSelectedService] = useState(null);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleBookNow = () => {
    Alert.alert(
      'Rezervacija',
      'Da li želite da rezervišete uslugu kod ovog majstora?',
      [
        { text: 'Otkaži', style: 'cancel' },
        { 
          text: 'Rezerviši', 
          onPress: () => {
            Alert.alert('Uspešno', 'Vaša rezervacija je uspešno kreirana!');
          }
        }
      ]
    );
  };

  const handleMessage = () => {
    navigation.navigate('Chat', { workerId: worker.id, workerName: worker.name });
  };

  const handleCall = () => {
    Alert.alert('Poziv', 'Poziv će biti uspostavljen uskoro...');
  };

  const handleVideoCall = () => {
    Alert.alert('Video poziv', 'Video poziv će biti uspostavljen uskoro...');
  };

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <View style={styles.reviewerInfo}>
          <Text style={[styles.reviewerName, { fontFamily: 'Mont-SemiBold' }]}>
            {item.user}
          </Text>
          <Text style={[styles.reviewService, { fontFamily: 'Mont-Regular' }]}>
            {item.service}
          </Text>
        </View>
        <View style={styles.reviewRating}>
          <Ionicons name="star" size={16} color="#F59E0B" />
          <Text style={[styles.ratingText, { fontFamily: 'Mont-Medium' }]}>
            {item.rating}
          </Text>
        </View>
      </View>
      
      <Text style={[styles.reviewComment, { fontFamily: 'Mont-Regular' }]}>
        {item.comment}
      </Text>
      
      <Text style={[styles.reviewDate, { fontFamily: 'Mont-Regular' }]}>
        {item.date}
      </Text>
    </View>
  );

  if (!loaded && !fontError) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4ade80" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4ade80" />
          <Text style={[styles.loadingText, { fontFamily: 'Mont-Regular' }]}>
            Učitavanje podataka o radniku...
          </Text>
        </View>
      </View>
    );
  }

  // Show error state
  if (error || !worker) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#4ade80" />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
          <Text style={[styles.errorText, { fontFamily: 'Mont-Medium' }]}>
            {error || 'Radnik nije pronađen'}
          </Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.retryText, { fontFamily: 'Mont-Medium' }]}>
              Nazad
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4ade80" />
      
      {/* Header with worker image */}
      <View style={styles.header}>
        <Image 
          source={{ 
            uri: worker.avatar || worker.profileImage || 
                 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'
          }} 
          style={styles.headerImage} 
        />
        <View style={styles.headerOverlay} />
        
        {/* Back button */}
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        
        {/* Action buttons */}
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={handleMessage} style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCall} style={styles.actionButton}>
            <Ionicons name="call-outline" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleVideoCall} style={styles.actionButton}>
            <Ionicons name="videocam-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Worker info card */}
      <View style={styles.workerInfoCard}>
        <View style={styles.workerHeader}>
          <View style={styles.workerBasicInfo}>
            <Text style={[styles.workerName, { fontFamily: 'Mont-Bold' }]}>
              {worker.firstName ? `${worker.firstName} ${worker.lastName}` : worker.name || 'Nepoznati radnik'}
            </Text>
            <View style={styles.workerMeta}>
              <Text style={[styles.workerCategory, { fontFamily: 'Mont-Medium' }]}>
                {worker.category?.name || worker.category || 'Usluga'}
              </Text>
              {worker.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#10B981" />
                </View>
              )}
            </View>
          </View>
          
          <View style={styles.workerStats}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { fontFamily: 'Mont-Bold' }]}>
                {worker.rating || worker.averageRating || 4.5}
              </Text>
              <View style={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Ionicons
                    key={star}
                    name={star <= (worker.rating || worker.averageRating || 4.5) ? "star" : "star-outline"}
                    size={16}
                    color="#F59E0B"
                  />
                ))}
              </View>
              <Text style={[styles.statLabel, { fontFamily: 'Mont-Regular' }]}>
                {worker.reviewCount || worker.reviews || 0} ocena
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.workerDetails}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={16} color="#6B7280" />
            <Text style={[styles.detailText, { fontFamily: 'Mont-Regular' }]}>
              {worker.location || worker.city || 'Beograd'} • {worker.distance || 'N/A'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={16} color="#6B7280" />
            <Text style={[styles.detailText, { fontFamily: 'Mont-Regular' }]}>
              Odgovor u {worker.responseTime || '2-4 sata'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="briefcase-outline" size={16} color="#6B7280" />
            <Text style={[styles.detailText, { fontFamily: 'Mont-Regular' }]}>
              {worker.experience || worker.yearsOfExperience || 'N/A'} iskustva
            </Text>
          </View>
          
          {worker.hourlyRate && (
            <View style={styles.detailRow}>
              <Ionicons name="cash-outline" size={16} color="#6B7280" />
              <Text style={[styles.detailText, { fontFamily: 'Mont-Regular' }]}>
                {worker.hourlyRate} RSD/sat
              </Text>
            </View>
          )}
        </View>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity onPress={handleBookNow} style={styles.bookButton}>
            <Ionicons name="calendar-outline" size={20} color="white" />
            <Text style={[styles.bookButtonText, { fontFamily: 'Mont-SemiBold' }]}>
              Rezerviši sada
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleMessage} style={styles.messageButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#4ade80" />
            <Text style={[styles.messageButtonText, { fontFamily: 'Mont-SemiBold' }]}>
              Pošalji poruku
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'about' && styles.activeTab]}
            onPress={() => setActiveTab('about')}
          >
            <Text style={[
              styles.tabText, 
              { fontFamily: 'Mont-Medium' },
              activeTab === 'about' && styles.activeTabText
            ]}>
              O majstoru
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
            style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
            onPress={() => setActiveTab('reviews')}
          >
            <Text style={[
              styles.tabText, 
              { fontFamily: 'Mont-Medium' },
              activeTab === 'reviews' && styles.activeTabText
            ]}>
              Ocene ({reviews.length})
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Tab content */}
      <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
        {activeTab === 'about' && (
          <View style={styles.aboutSection}>
            <Text style={[styles.sectionTitle, { fontFamily: 'Mont-SemiBold' }]}>
              O meni
            </Text>
            <Text style={[styles.description, { fontFamily: 'Mont-Regular' }]}>
              {worker.description || worker.bio || 'Profesionalni radnik sa dugogodišnjim iskustvom u svojoj oblasti. Posvećen kvalitetu i zadovoljstvu klijenata.'}
            </Text>
            
            {worker.languages && worker.languages.length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { fontFamily: 'Mont-SemiBold' }]}>
                  Jezici
                </Text>
                <View style={styles.languagesContainer}>
                  {worker.languages.map((language, index) => (
                    <View key={index} style={styles.languageBadge}>
                      <Text style={[styles.languageText, { fontFamily: 'Mont-Medium' }]}>
                        {language}
                      </Text>
                    </View>
                  ))}
                </View>
              </>
            )}
            
            {worker.workingHours && (
              <>
                <Text style={[styles.sectionTitle, { fontFamily: 'Mont-SemiBold' }]}>
                  Radno vreme
                </Text>
                <Text style={[styles.workingHours, { fontFamily: 'Mont-Regular' }]}>
                  {worker.workingHours}
                </Text>
              </>
            )}
            
            <Text style={[styles.sectionTitle, { fontFamily: 'Mont-SemiBold' }]}>
              Statistika
            </Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={[styles.statCardValue, { fontFamily: 'Mont-Bold' }]}>
                  {worker.completedJobs || worker.totalJobs || 0}
                </Text>
                <Text style={[styles.statCardLabel, { fontFamily: 'Mont-Regular' }]}>
                  Završenih poslova
                </Text>
              </View>
              <View style={styles.statCard}>
                <Text style={[styles.statCardValue, { fontFamily: 'Mont-Bold' }]}>
                  {worker.satisfactionRate || worker.successRate || '95%'}
                </Text>
                <Text style={[styles.statCardLabel, { fontFamily: 'Mont-Regular' }]}>
                  Stopa zadovoljstva
                </Text>
              </View>
            </View>
          </View>
        )}
        
        {activeTab === 'services' && (
          <View style={styles.servicesSection}>
            <Text style={[styles.sectionTitle, { fontFamily: 'Mont-SemiBold' }]}>
              Usluge koje pružam
            </Text>
            {(worker.services || worker.skills || []).length > 0 ? (
              (worker.services || worker.skills || []).map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.serviceItem}
                  onPress={() => setSelectedService(service)}
                >
                  <Ionicons name="checkmark-circle" size={20} color="#10B981" />
                  <Text style={[styles.serviceText, { fontFamily: 'Mont-Medium' }]}>
                    {typeof service === 'string' ? service : service.name || service.title}
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyServices}>
                <Text style={[styles.emptyServicesText, { fontFamily: 'Mont-Regular' }]}>
                  Nema dostupnih usluga
                </Text>
              </View>
            )}
          </View>
        )}
        
        {activeTab === 'reviews' && (
          <View style={styles.reviewsSection}>
            <Text style={[styles.sectionTitle, { fontFamily: 'Mont-SemiBold' }]}>
              Ocene korisnika
            </Text>
            <FlatList
              data={reviews}
              renderItem={renderReview}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    height: 300,
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  headerActions: {
    position: 'absolute',
    top: 50,
    right: 16,
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
  },
  workerInfoCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    marginTop: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  workerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  workerBasicInfo: {
    flex: 1,
  },
  workerName: {
    fontSize: 24,
    color: '#1F2937',
    marginBottom: 4,
  },
  workerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  workerCategory: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 8,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  workerStats: {
    alignItems: 'flex-end',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 4,
  },
  ratingStars: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  workerDetails: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 12,
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 16,
  },
  messageButton: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  messageButtonText: {
    color: '#4ade80',
    fontSize: 16,
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
  tabContent: {
    flex: 1,
    padding: 16,
  },
  aboutSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 16,
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  languageBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  languageText: {
    fontSize: 14,
    color: '#4ade80',
  },
  workingHours: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  statCardValue: {
    fontSize: 24,
    color: '#4ade80',
    marginBottom: 4,
  },
  statCardLabel: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  servicesSection: {
    marginBottom: 20,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  serviceText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 12,
  },
  reviewsSection: {
    marginBottom: 20,
  },
  reviewCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 2,
  },
  reviewService: {
    fontSize: 14,
    color: '#6B7280',
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#374151',
    marginLeft: 4,
  },
  reviewComment: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  loadingContainer: {
    flex: 1,
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    padding: 20,
  },
  errorText: {
    marginTop: 16,
    fontSize: 18,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    backgroundColor: '#EF4444',
    borderRadius: 8,
  },
  retryText: {
    color: 'white',
    fontSize: 16,
  },
  emptyServices: {
    padding: 20,
    alignItems: 'center',
  },
  emptyServicesText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});

export default WokerScreen;
