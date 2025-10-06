import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFonts } from 'expo-font';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

const BestServices = () => {
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

  // Fake data for best services
  const bestServices = [
    {
      id: 1,
      title: "Servis veš mašine",
      worker: "Marko Petrović",
      rating: 4.9,
      reviews: 156,
      price: "od 2500 RSD",
      image: "https://images.unsplash.com/photo-1631241470625-8c3cb167ef06?w=400&h=300&fit=crop",
      category: "Aparati",
      verified: true,
      experience: "8 godina"
    },
    {
      id: 2,
      title: "Popravka rerna",
      worker: "Ana Jovanović",
      rating: 4.8,
      reviews: 142,
      price: "od 3000 RSD",
      image: "https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=400&h=300&fit=crop",
      category: "Aparati",
      verified: true,
      experience: "5 godina"
    },
    {
      id: 3,
      title: "Elektro instalacija",
      worker: "Stefan Nikolić",
      rating: 4.9,
      reviews: 203,
      price: "od 4000 RSD",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop",
      category: "Električar",
      verified: true,
      experience: "12 godina"
    },
    {
      id: 4,
      title: "Vodoinstalacija",
      worker: "Mila Đorđević",
      rating: 4.7,
      reviews: 98,
      price: "od 3500 RSD",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      category: "Vodoinstalater",
      verified: false,
      experience: "6 godina"
    }
  ];

  const handleServicePress = (service) => {
    // Handle service press - navigate to service details
    console.log('Service pressed:', service.title);
  };

  const handleViewAll = () => {
    // Navigate to all services screen
    console.log('View all services');
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { fontFamily: 'Mont-Bold' }]}>
          Najbolje usluge
        </Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={[styles.viewAllText, { fontFamily: 'Mont-Medium' }]}>
            Pogledaj sve
          </Text>
        </TouchableOpacity>
      </View>

      {/* Services Grid */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.servicesContainer}
      >
        {bestServices.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() => handleServicePress(service)}
            activeOpacity={0.9}
          >
            {/* Service Image */}
            <Image
              source={{ uri: service.image }}
              style={styles.serviceImage}
              resizeMode="cover"
            />
            
            {/* Category Badge */}
            <View style={styles.categoryBadge}>
              <Text style={[styles.categoryText, { fontFamily: 'Mont-Medium' }]}>
                {service.category}
              </Text>
            </View>

            {/* Content */}
            <View style={styles.serviceContent}>
              <Text style={[styles.serviceTitle, { fontFamily: 'Mont-SemiBold' }]} numberOfLines={2}>
                {service.title}
              </Text>
              
              {/* Worker Info */}
              <View style={styles.workerInfo}>
                <View style={styles.workerDetails}>
                  <Text style={[styles.workerName, { fontFamily: 'Mont-Medium' }]}>
                    {service.worker}
                  </Text>
                  <View style={styles.workerMeta}>
                    <Text style={[styles.experienceText, { fontFamily: 'Mont-Regular' }]}>
                      {service.experience}
                    </Text>
                    {service.verified && (
                      <View style={styles.verifiedBadge}>
                        <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                      </View>
                    )}
                  </View>
                </View>
              </View>

              {/* Rating and Price */}
              <View style={styles.serviceMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text style={[styles.ratingText, { fontFamily: 'Mont-Medium' }]}>
                    {service.rating}
                  </Text>
                  <Text style={[styles.reviewsText, { fontFamily: 'Mont-Regular' }]}>
                    ({service.reviews})
                  </Text>
                </View>
                
                <Text style={[styles.priceText, { fontFamily: 'Mont-Bold' }]}>
                  {service.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#1F2937',
    fontWeight: '600',
  },
  viewAllText: {
    fontSize: 15,
    color: '#4ade80',
    fontWeight: '600',
  },
  servicesContainer: {
    paddingHorizontal: 20,
  },
  serviceCard: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 160,
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(74, 222, 128, 0.95)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  categoryText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  serviceContent: {
    padding: 20,
  },
  serviceTitle: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 16,
    lineHeight: 24,
  },
  workerInfo: {
    marginBottom: 16,
  },
  workerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  workerName: {
    fontSize: 14,
    color: '#374151',
    flex: 1,
  },
  workerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    fontSize: 17,
    color: '#4ade80',
    fontWeight: '600',
  },
});

export default BestServices;
