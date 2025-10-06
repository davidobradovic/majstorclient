import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  RefreshControl,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '../context/AuthContext';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/ApiService';

const BookingScreen = () => {
  const { user, bookings, statusFormatter, apiLoading, error: apiError, fetchBookings } = useAuth();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
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

  // Load bookings data
  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        console.log('BookingScreen - User object:', user);
        console.log('BookingScreen - User ID:', user?.id);
        if (user?.id) {
          await fetchBookings(user.id);
        } else {
          console.log('BookingScreen - No user ID available, skipping bookings fetch');
        }
      } catch (error) {
        console.error('Error loading bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBookings();
  }, [user?.id, fetchBookings]);

  // Process bookings data for display
  const processBookingsData = (bookingsData) => {
    if (!bookingsData || !Array.isArray(bookingsData) || bookingsData.length === 0) return [];
    
    return bookingsData.map(booking => ({
      id: booking.id,
      title: booking.title || booking.description || 'Usluga',
      description: booking.description || booking.notes || 'Detalji usluge',
      price: booking.price || booking.totalAmount || 0,
      status: booking.status || 'requested',
      date: booking.scheduledDate ? new Date(booking.scheduledDate).toLocaleDateString('sr-RS') : new Date().toLocaleDateString('sr-RS'),
      time: booking.scheduledTime || 'N/A',
      worker: {
        id: booking.worker?.id,
        name: booking.worker?.firstName ? `${booking.worker.firstName} ${booking.worker.lastName}` : booking.worker?.name || 'Nepoznati radnik',
        rating: booking.worker?.rating || booking.worker?.averageRating || 4.5,
        avatar: booking.worker?.avatar || booking.worker?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      category: booking.category?.name || booking.serviceType || 'Usluga',
      address: booking.address || booking.location || 'Adresa nije specificirana',
      orderNumber: booking.orderNumber,
      createdAt: booking.createdAt
    }));
  };

  const displayBookings = processBookingsData(bookings);

  const filteredBookings = activeTab === 'all' 
    ? displayBookings 
    : displayBookings.filter(booking => booking.status === activeTab);

  const tabs = [
    { key: 'all', label: 'Sve', count: displayBookings.length },
    { key: 'requested', label: 'Zatraženo', count: displayBookings.filter(b => b.status === 'requested').length },
    { key: 'accepted', label: 'Prihvaćeno', count: displayBookings.filter(b => b.status === 'accepted').length },
    { key: 'inProgress', label: 'U toku', count: displayBookings.filter(b => b.status === 'inProgress').length },
    { key: 'completed', label: 'Završeno', count: displayBookings.filter(b => b.status === 'completed').length },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      if (user?.id) {
        await fetchBookings();
      }
    } catch (error) {
      console.error('Error refreshing bookings:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleBookingAction = async (booking, action) => {
    switch (action) {
      case 'cancel':
        Alert.alert(
          'Otkaži rezervaciju',
          'Da li ste sigurni da želite da otkažete ovu rezervaciju?',
          [
            { text: 'Otkaži', style: 'cancel' },
            { 
              text: 'Otkaži rezervaciju', 
              style: 'destructive',
              onPress: async () => {
                try {
                  const response = await ApiService.updateOrderStatus(booking.id, 'cancelled');
                  if (response.success) {
                    Alert.alert('Uspešno', 'Rezervacija je otkazana');
                    await fetchBookings(); // Refresh bookings
                  } else {
                    Alert.alert('Greška', response.message || 'Neuspešno otkazivanje rezervacije');
                  }
                } catch (error) {
                  Alert.alert('Greška', 'Došlo je do greške prilikom otkazivanja rezervacije');
                }
              }
            }
          ]
        );
        break;
      case 'rate':
        Alert.alert('Ocenjivanje', 'Ocenjivanje će biti dostupno uskoro');
        break;
      case 'rebook':
        Alert.alert('Ponovna rezervacija', 'Ponovna rezervacija će biti dostupna uskoro');
        break;
      case 'chat':
        navigation.navigate('Chat', { 
          workerId: booking.worker?.id, 
          workerName: booking.worker?.name,
          orderId: booking.id
        });
        break;
    }
  };

  const getStatusColor = (status) => {
    const statusInfo = statusFormatter(status);
    return statusInfo.color;
  };

  const getStatusText = (status) => {
    const statusInfo = statusFormatter(status);
    return statusInfo.text;
  };

  if (!loaded && !fontError) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[tw`px-6 pt-4 pb-4 bg-white border-b border-gray-100`]}>
          <Text style={[tw`text-2xl mb-2`, { fontFamily: 'Mont-Bold' }]}>
            Moje rezervacije
          </Text>
          <Text style={[tw`text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
            Pratite status vaših rezervacija
          </Text>
        </View>
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color="#4ade80" />
          <Text style={[tw`text-gray-600 mt-4`, { fontFamily: 'Mont-Regular' }]}>
            Učitavanje rezervacija...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[tw`px-6 pt-4 pb-4 bg-white border-b border-gray-100`]}>
        <Text style={[tw`text-2xl mb-2`, { fontFamily: 'Mont-Bold' }]}>
          Moje rezervacije
        </Text>
        <Text style={[tw`text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
          Pratite status vaših rezervacija
        </Text>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={tw`bg-white border-b border-gray-100`}
        contentContainerStyle={tw`px-6 py-4`}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              tw`px-4 py-2 rounded-full mr-3 flex-row items-center`,
                              activeTab === tab.key ? tw`bg-green-500` : tw`bg-gray-100`
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[
              tw`text-sm`,
              activeTab === tab.key ? tw`text-white` : tw`text-gray-700`,
              { fontFamily: 'Mont-Medium' }
            ]}>
              {tab.label}
            </Text>
            <View style={[
              tw`ml-2 px-2 py-1 rounded-full`,
                              activeTab === tab.key ? tw`bg-green-400` : tw`bg-gray-200`
            ]}>
              <Text style={[
                tw`text-xs`,
                activeTab === tab.key ? tw`text-white` : tw`text-gray-600`,
                { fontFamily: 'Mont-Medium' }
              ]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bookings List */}
      <ScrollView 
        style={tw`flex-1`}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      >
        {filteredBookings.length === 0 ? (
          <View style={tw`flex-1 items-center justify-center py-20`}>
            <Ionicons name="calendar-outline" size={64} color="#9CA3AF" />
            <Text style={[tw`text-lg text-gray-500 mt-4`, { fontFamily: 'Mont-Medium' }]}>
              Nema rezervacija
            </Text>
            <Text style={[tw`text-gray-400 text-center mt-2 px-8`, { fontFamily: 'Mont-Regular' }]}>
              {activeTab === 'all' 
                ? 'Nemate još uvek rezervacija. Započnite sa pronalaženjem usluga!'
                : `Nemate rezervacija sa statusom "${tabs.find(t => t.key === activeTab)?.label}"`
              }
            </Text>
          </View>
        ) : (
          <View style={tw`px-6 py-4`}>
            {filteredBookings.map((booking) => (
              <View key={booking.id} style={tw`bg-white rounded-xl p-4 mb-4 shadow-sm border border-gray-100`}>
                {/* Header */}
                <View style={tw`flex-row justify-between items-start mb-3`}>
                  <View style={tw`flex-1`}>
                    <Text style={[tw`text-lg mb-1`, { fontFamily: 'Mont-Bold' }]}>
                      {booking.title}
                    </Text>
                    <Text style={[tw`text-gray-600 mb-2`, { fontFamily: 'Mont-Regular' }]}>
                      {booking.description}
                    </Text>
                  </View>
                  <View style={[
                    tw`px-3 py-1 rounded-full`,
                    { backgroundColor: `${getStatusColor(booking.status)}20` }
                  ]}>
                    <Text style={[
                      tw`text-sm`,
                      { fontFamily: 'Mont-Medium', color: getStatusColor(booking.status) }
                    ]}>
                      {getStatusText(booking.status)}
                    </Text>
                  </View>
                </View>

                {/* Worker Info */}
                <View style={tw`flex-row items-center mb-3`}>
                  <Image
                    source={{ uri: booking.worker?.avatar }}
                    style={tw`w-12 h-12 rounded-full mr-3`}
                  />
                  <View style={tw`flex-1`}>
                    <Text style={[tw`text-base`, { fontFamily: 'Mont-SemiBold' }]}>
                      {booking.worker?.name}
                    </Text>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="star" size={16} color="#F59E0B" />
                      <Text style={[tw`text-sm text-gray-600 ml-1`, { fontFamily: 'Mont-Regular' }]}>
                        {booking.worker?.rating}
                      </Text>
                    </View>
                  </View>
                  <Text style={[tw`text-lg font-bold`, { fontFamily: 'Mont-Bold' }]}>
                    {booking.price} RSD
                  </Text>
                </View>

                {/* Details */}
                <View style={tw`mb-4`}>
                  <View style={tw`flex-row items-center mb-2`}>
                    <Ionicons name="calendar-outline" size={16} color="#6B7280" />
                    <Text style={[tw`text-gray-600 ml-2`, { fontFamily: 'Mont-Regular' }]}>
                      {booking.date} u {booking.time}
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center mb-2`}>
                    <Ionicons name="location-outline" size={16} color="#6B7280" />
                    <Text style={[tw`text-gray-600 ml-2`, { fontFamily: 'Mont-Regular' }]}>
                      {booking.address}
                    </Text>
                  </View>
                  <View style={tw`flex-row items-center`}>
                    <Ionicons name="briefcase-outline" size={16} color="#6B7280" />
                    <Text style={[tw`text-gray-600 ml-2`, { fontFamily: 'Mont-Regular' }]}>
                      {booking.category}
                    </Text>
                  </View>
                </View>

                {/* Actions */}
                <View style={tw`flex-row gap-2`}>
                  <TouchableOpacity
                    style={tw`flex-1 bg-green-500 py-3 rounded-lg items-center`}
                    onPress={() => handleBookingAction(booking, 'chat')}
                  >
                    <Text style={[tw`text-white`, { fontFamily: 'Mont-Medium' }]}>
                      Poruka
                    </Text>
                  </TouchableOpacity>
                  
                  {booking.status === 'requested' && (
                    <TouchableOpacity
                      style={tw`flex-1 bg-red-500 py-3 rounded-lg items-center`}
                      onPress={() => handleBookingAction(booking, 'cancel')}
                    >
                      <Text style={[tw`text-white`, { fontFamily: 'Mont-Medium' }]}>
                        Otkaži
                      </Text>
                    </TouchableOpacity>
                  )}
                  
                  {booking.status === 'completed' && (
                    <TouchableOpacity
                      style={tw`flex-1 bg-green-500 py-3 rounded-lg items-center`}
                      onPress={() => handleBookingAction(booking, 'rate')}
                    >
                      <Text style={[tw`text-white`, { fontFamily: 'Mont-Medium' }]}>
                        Oceni
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});

export default BookingScreen;
