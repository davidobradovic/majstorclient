import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '../context/AuthContext';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const { user, logout, profile } = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLogout = () => {
    Alert.alert(
      'Odjava',
      'Da li ste sigurni da se želite odjaviti?',
      [
        {
          text: 'Otkaži',
          style: 'cancel',
        },
        {
          text: 'Odjavi se',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true);
            try {
              await logout();
            } catch (error) {
              console.error('Logout error:', error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const profileOptions = [
    {
      title: 'Izmeni profil',
      icon: 'person-outline',
      onPress: () => navigation.navigate('ProfileUpdate'),
      color: '#4ade80',
    },
    {
      title: 'Moje adrese',
      icon: 'location-outline',
      onPress: () => navigation.navigate('Addresses'),
      color: '#10B981',
    },
    {
      title: 'Postani radnik',
      icon: 'briefcase-outline',
      onPress: () => navigation.navigate('BecomeWorker'),
      color: '#F59E0B',
    },
    {
      title: 'Pozovi prijatelje',
      icon: 'people-outline',
      onPress: () => navigation.navigate('InviteFriends'),
      color: '#8B5CF6',
    },
  ];

  const settingsOptions = [
    {
      title: 'Obaveštenja',
      icon: 'notifications-outline',
      onPress: () => Alert.alert('Info', 'Obaveštenja će biti dostupna uskoro'),
      color: '#EF4444',
    },
    {
      title: 'Privatnost',
      icon: 'shield-outline',
      onPress: () => Alert.alert('Info', 'Privatnost će biti dostupna uskoro'),
      color: '#6B7280',
    },
    {
      title: 'Pomoć',
      icon: 'help-circle-outline',
      onPress: () => Alert.alert('Info', 'Pomoć će biti dostupna uskoro'),
      color: '#059669',
    },
    {
      title: 'O aplikaciji',
      icon: 'information-circle-outline',
      onPress: () => Alert.alert('Info', 'TrebaMi v1.0.0\n\nAplikacija za pronalaženje usluga'),
      color: '#7C3AED',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[tw`px-6 pt-4 pb-6 bg-white border-b border-gray-100`]}>
          <Text style={[tw`text-2xl mb-2`, { fontFamily: 'Mont-Bold' }]}>
            Profil
          </Text>
        </View>

        {/* Profile Section */}
        <View style={[tw`px-6 py-6 bg-white border-b border-gray-100`]}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`mr-4`}>
              <Image
                source={require('../assets/icon.png')}
                style={tw`w-20 h-20 rounded-full`}
              />
            </View>
            <View style={tw`flex-1`}>
              <Text style={[tw`text-xl mb-1`, { fontFamily: 'Mont-Bold' }]}>
                {user?.fullName || 'Korisnik'}
              </Text>
              <Text style={[tw`text-gray-600 mb-2`, { fontFamily: 'Mont-Regular' }]}>
                {user?.email || 'email@example.com'}
              </Text>
              <Text style={[tw`text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
                {profile?.phone || '+381 60 123 4567'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ProfileUpdate')}
              style={tw`p-2`}
            >
              <Ionicons name="pencil" size={20} color="#4ade80" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Options */}
        <View style={[tw`px-6 py-4 bg-white border-b border-gray-100`]}>
          <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
            Profil
          </Text>
          {profileOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={tw`flex-row items-center py-4 border-b border-gray-100`}
              onPress={option.onPress}
            >
              <View style={[tw`w-10 h-10 rounded-full items-center justify-center mr-4`, { backgroundColor: `${option.color}20` }]}>
                <Ionicons name={option.icon} size={20} color={option.color} />
              </View>
              <Text style={[tw`flex-1 text-base`, { fontFamily: 'Mont-Medium' }]}>
                {option.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings Options */}
        <View style={[tw`px-6 py-4 bg-white border-b border-gray-100`]}>
          <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
            Podešavanja
          </Text>
          {settingsOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={tw`flex-row items-center py-4 border-b border-gray-100`}
              onPress={option.onPress}
            >
              <View style={[tw`w-10 h-10 rounded-full items-center justify-center mr-4`, { backgroundColor: `${option.color}20` }]}>
                <Ionicons name={option.icon} size={20} color={option.color} />
              </View>
              <Text style={[tw`flex-1 text-base`, { fontFamily: 'Mont-Medium' }]}>
                {option.title}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <View style={tw`px-6 py-6`}>
          <TouchableOpacity
            style={tw`bg-red-500 py-4 rounded-lg items-center`}
            onPress={handleLogout}
            disabled={isLoading}
          >
            <Text style={[tw`text-white text-lg`, { fontFamily: 'Mont-SemiBold' }]}>
              {isLoading ? 'Odjavljivanje...' : 'Odjavi se'}
            </Text>
          </TouchableOpacity>
        </View>
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

export default ProfileScreen;
