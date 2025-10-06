import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

const NextThingOnYourMind = () => {
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

  // Quick action suggestions
  const quickActions = [
    {
      id: 1,
      title: "Čišćenje kuće",
      subtitle: "Profesionalno čišćenje",
      icon: "home-outline",
      color: "#10B981",
      bgColor: "#D1FAE5",
      action: "cleaning"
    },
    {
      id: 2,
      title: "Popravka aparata",
      subtitle: "Servis kućnih aparata",
      icon: "construct-outline",
      color: "#4ade80",
      bgColor: "#DBEAFE",
      action: "appliance"
    },
    {
      id: 3,
      title: "Električar",
      subtitle: "Elektro instalacije",
      icon: "flash-outline",
      color: "#F59E0B",
      bgColor: "#FEF3C7",
      action: "electrical"
    },
    {
      id: 4,
      title: "Vodoinstalater",
      subtitle: "Vodoinstalacije",
      icon: "water-outline",
      color: "#06B6D4",
      bgColor: "#CFFAFE",
      action: "plumbing"
    },
    {
      id: 5,
      title: "Moleraj",
      subtitle: "Farbanje i tapetiranje",
      icon: "brush-outline",
      color: "#8B5CF6",
      bgColor: "#EDE9FE",
      action: "painting"
    },
    {
      id: 6,
      title: "Bastovan",
      subtitle: "Održavanje bašte",
      icon: "leaf-outline",
      color: "#059669",
      bgColor: "#D1FAE5",
      action: "gardening"
    }
  ];

  const handleQuickAction = (action) => {
    // Handle quick action selection
    console.log('Quick action selected:', action);
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.sectionTitle, { fontFamily: 'Mont-Bold' }]}>
          Šta vam je na umu?
        </Text>
        <Text style={[styles.sectionSubtitle, { fontFamily: 'Mont-Regular' }]}>
          Brzi pristup popularnim uslugama
        </Text>
      </View>

      {/* Quick Actions Grid */}
      <View style={styles.actionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={[styles.actionCard, { backgroundColor: action.bgColor }]}
            onPress={() => handleQuickAction(action.action)}
            activeOpacity={0.8}
          >
            {/* Icon */}
            <View style={[styles.iconContainer, { backgroundColor: action.color }]}>
              <Ionicons name={action.icon} size={24} color="white" />
            </View>

            {/* Content */}
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, { fontFamily: 'Mont-SemiBold' }]} numberOfLines={1}>
                {action.title}
              </Text>
              <Text style={[styles.actionSubtitle, { fontFamily: 'Mont-Regular' }]} numberOfLines={1}>
                {action.subtitle}
              </Text>
            </View>

            {/* Arrow */}
            <Ionicons 
              name="chevron-forward" 
              size={16} 
              color={action.color} 
              style={styles.arrowIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Info */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#6B7280" />
          <Text style={[styles.infoText, { fontFamily: 'Mont-Regular' }]}>
            Brzi odgovor u roku od 2 sata
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="shield-checkmark-outline" size={16} color="#6B7280" />
          <Text style={[styles.infoText, { fontFamily: 'Mont-Regular' }]}>
            Verifikovani majstori
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="card-outline" size={16} color="#6B7280" />
          <Text style={[styles.infoText, { fontFamily: 'Mont-Regular' }]}>
            Sigurno plaćanje
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#1F2937',
    marginBottom: 8,
    fontWeight: '600',
  },
  sectionSubtitle: {
    fontSize: 15,
    color: '#6B7280',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 15,
    color: '#1F2937',
    marginBottom: 4,
    fontWeight: '600',
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#6B7280',
  },
  arrowIcon: {
    marginLeft: 12,
  },
  additionalInfo: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 10,
  },
});

export default NextThingOnYourMind;
