import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const CleaningAndPest = () => {
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

  // Cleaning services data
  const cleaningServices = [
    {
      id: 1,
      title: "Čišćenje kuće",
      description: "Kompletno čišćenje svih prostorija",
      price: "od 2000 RSD",
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 234,
      features: ["Profesionalno", "Eco-friendly", "Brzo"]
    },
    {
      id: 2,
      title: "Čišćenje kancelarije",
      description: "Čišćenje poslovnih prostora",
      price: "od 3000 RSD",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 156,
      features: ["Redovno", "Discrete", "Efikasno"]
    },
    {
      id: 3,
      title: "Čišćenje nakon renoviranja",
      description: "Čišćenje nakon građevinskih radova",
      price: "od 5000 RSD",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 89,
      features: ["Detaljno", "Stručno", "Kompletno"]
    }
  ];

  // Pest control services data
  const pestServices = [
    {
      id: 1,
      title: "Dezinsekcija",
      description: "Uklanjanje insekata i buba",
      price: "od 4000 RSD",
      image: "https://images.unsplash.com/photo-1584269600519-112d071b35e6?w=400&h=300&fit=crop",
      rating: 4.6,
      reviews: 67,
      features: ["Sigurno", "Efikasno", "Garantovano"]
    },
    {
      id: 2,
      title: "Deratizacija",
      description: "Uklanjanje glodara",
      price: "od 6000 RSD",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 45,
      features: ["Profesionalno", "Trajno", "Sigurno"]
    }
  ];

  const handleServicePress = (service, type) => {
    console.log(`${type} service pressed:`, service.title);
  };

  const handleBookNow = (service, type) => {
    console.log(`Book now for ${type}:`, service.title);
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Cleaning Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="sparkles-outline" size={24} color="#10B981" />
            <Text style={[styles.sectionTitle, { fontFamily: 'Mont-Bold' }]}>
              Čišćenje
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { fontFamily: 'Mont-Medium' }]}>
              Pogledaj sve
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesContainer}
        >
          {cleaningServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
                resizeMode="cover"
              />
              
              <View style={styles.serviceContent}>
                <Text style={[styles.serviceTitle, { fontFamily: 'Mont-SemiBold' }]} numberOfLines={2}>
                  {service.title}
                </Text>
                
                <Text style={[styles.serviceDescription, { fontFamily: 'Mont-Regular' }]} numberOfLines={2}>
                  {service.description}
                </Text>

                {/* Features */}
                <View style={styles.featuresContainer}>
                  {service.features.map((feature, index) => (
                    <View key={index} style={styles.featureBadge}>
                      <Text style={[styles.featureText, { fontFamily: 'Mont-Regular' }]}>
                        {feature}
                      </Text>
                    </View>
                  ))}
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

                {/* Action Button */}
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookNow(service, 'cleaning')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.bookButtonText, { fontFamily: 'Mont-SemiBold' }]}>
                    Rezerviši sada
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Pest Control Services Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleContainer}>
            <Ionicons name="shield-outline" size={24} color="#EF4444" />
            <Text style={[styles.sectionTitle, { fontFamily: 'Mont-Bold' }]}>
              Kontrola štetočina
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { fontFamily: 'Mont-Medium' }]}>
              Pogledaj sve
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.servicesContainer}
        >
          {pestServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <Image
                source={{ uri: service.image }}
                style={styles.serviceImage}
                resizeMode="cover"
              />
              
              <View style={styles.serviceContent}>
                <Text style={[styles.serviceTitle, { fontFamily: 'Mont-SemiBold' }]} numberOfLines={2}>
                  {service.title}
                </Text>
                
                <Text style={[styles.serviceDescription, { fontFamily: 'Mont-Regular' }]} numberOfLines={2}>
                  {service.description}
                </Text>

                {/* Features */}
                <View style={styles.featuresContainer}>
                  {service.features.map((feature, index) => (
                    <View key={index} style={styles.featureBadge}>
                      <Text style={[styles.featureText, { fontFamily: 'Mont-Regular' }]}>
                        {feature}
                      </Text>
                    </View>
                  ))}
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

                {/* Action Button */}
                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() => handleBookNow(service, 'pest')}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.bookButtonText, { fontFamily: 'Mont-SemiBold' }]}>
                    Rezerviši sada
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Special Offer Banner */}
      <View style={styles.specialOffer}>
        <View style={styles.offerContent}>
          <View style={styles.offerTextContainer}>
            <Text style={[styles.offerTitle, { fontFamily: 'Mont-Bold' }]}>
              Paket usluga
            </Text>
            <Text style={[styles.offerDescription, { fontFamily: 'Mont-Regular' }]}>
              Čišćenje + Dezinsekcija sa 20% popusta
            </Text>
            <TouchableOpacity style={styles.offerButton}>
              <Text style={[styles.offerButtonText, { fontFamily: 'Mont-SemiBold' }]}>
                Iskoristi ponudu
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.offerIconContainer}>
            <Ionicons name="gift-outline" size={48} color="#10B981" />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    color: '#1F2937',
    marginLeft: 10,
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
    width: 320,
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
    height: 180,
  },
  serviceContent: {
    padding: 20,
  },
  serviceTitle: {
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 12,
    lineHeight: 24,
  },
  serviceDescription: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 22,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  featureBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 6,
  },
  featureText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '500',
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
  bookButton: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  bookButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  specialOffer: {
    marginHorizontal: 20,
    backgroundColor: '#F0FDF4',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#D1FAE5',
  },
  offerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerTextContainer: {
    flex: 1,
  },
  offerTitle: {
    fontSize: 20,
    color: '#1F2937',
    marginBottom: 8,
    fontWeight: '600',
  },
  offerDescription: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 16,
  },
  offerButton: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
    shadowColor: '#10B981',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  offerButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  offerIconContainer: {
    marginLeft: 20,
  },
});

export default CleaningAndPest;
