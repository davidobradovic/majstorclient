import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '../../context/AuthContext';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const BecomeWorker = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    phone: '',
    category: '',
    experience: '',
    description: '',
    hourlyRate: '',
    availability: '',
    documents: []
  });

  const [loaded, error] = useFonts({
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

  const categories = [
    'Aparati', 'Električar', 'Vodoinstalater', 'Moler', 'Stolar', 'Čistačica',
    'Vrtlar', 'IT usluge', 'Prevoz', 'Ostalo'
  ];

  const experienceLevels = [
    'Početnik (0-2 godine)',
    'Iskusan (3-5 godina)',
    'Profesionalac (5-10 godina)',
    'Ekspert (10+ godina)'
  ];

  const availabilityOptions = [
    'Puno radno vreme',
    'Polovično radno vreme',
    'Vikend',
    'Po dogovoru',
    'Hitne intervencije'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Form validation
    if (!formData.fullName.trim()) {
      Alert.alert("Greška", "Molimo unesite puno ime");
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert("Greška", "Molimo unesite email adresu");
      return;
    }

    if (!formData.phone.trim()) {
      Alert.alert("Greška", "Molimo unesite broj telefona");
      return;
    }

    if (!formData.category) {
      Alert.alert("Greška", "Molimo odaberite kategoriju");
      return;
    }

    if (!formData.experience) {
      Alert.alert("Greška", "Molimo odaberite nivo iskustva");
      return;
    }

    if (!formData.description.trim()) {
      Alert.alert("Greška", "Molimo unesite opis usluga");
      return;
    }

    if (!formData.hourlyRate.trim()) {
      Alert.alert("Greška", "Molimo unesite satnicu");
      return;
    }

    if (!formData.availability) {
      Alert.alert("Greška", "Molimo odaberite dostupnost");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        "Uspešno",
        "Vaša prijava je uspešno poslata! Kontaktiraćemo vas u najkraćem roku.",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      Alert.alert(
        "Greška",
        "Došlo je do neočekivane greške prilikom slanja prijave."
      );
      console.error("Submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={tw`px-6 pt-4 pb-4 bg-white border-b border-gray-100 flex-row items-center`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`mr-4 p-2`}
        >
          <Ionicons name="arrow-back" size={24} color="#4ade80" />
        </TouchableOpacity>
        
        <View style={tw`flex-1`}>
          <Text style={[tw`text-xl`, { fontFamily: 'Mont-Bold' }]}>
            Postani radnik
          </Text>
          <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
            Prijavite se da postanete radnik na platformi
          </Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6 py-6`}>
          {/* Info Card */}
                          <View style={tw`bg-green-50 p-4 rounded-xl mb-6 border border-green-200`}>
            <View style={tw`flex-row items-start`}>
              <Ionicons name="information-circle" size={24} color="#4ade80" style={tw`mr-3 mt-1`} />
              <View style={tw`flex-1`}>
                <Text style={[tw`text-base text-green-800 mb-2`, { fontFamily: 'Mont-SemiBold' }]}>
                  Kako funkcioniše?
                </Text>
                                  <Text style={[tw`text-sm text-green-700`, { fontFamily: 'Mont-Regular' }]}>
                  Pošaljite prijavu sa vašim podacima i iskustvom. Naš tim će pregledati vašu prijavu i kontaktirati vas u najkraćem roku za dalje korake.
                </Text>
              </View>
            </View>
          </View>

          {/* Form */}
          <View style={tw`space-y-6`}>
            {/* Personal Information */}
            <View>
              <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
                Lični podaci
              </Text>
              
              <View style={tw`space-y-4`}>
                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Puno ime *
                  </Text>
                  <TextInput
                    style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                    placeholder="Vaše puno ime"
                    value={formData.fullName}
                    onChangeText={(value) => handleInputChange('fullName', value)}
                    editable={!isSubmitting}
                  />
                </View>

                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Email *
                  </Text>
                  <TextInput
                    style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                    placeholder="Vaš email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={formData.email}
                    onChangeText={(value) => handleInputChange('email', value)}
                    editable={!isSubmitting}
                  />
                </View>

                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Broj telefona *
                  </Text>
                  <TextInput
                    style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                    placeholder="+381 60 123 4567"
                    keyboardType="phone-pad"
                    value={formData.phone}
                    onChangeText={(value) => handleInputChange('phone', value)}
                    editable={!isSubmitting}
                  />
                </View>
              </View>
            </View>

            {/* Professional Information */}
            <View>
              <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
                Profesionalni podaci
              </Text>
              
              <View style={tw`space-y-4`}>
                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Kategorija usluga *
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {categories.map((category) => (
                      <TouchableOpacity
                        key={category}
                        style={[
                          tw`px-4 py-3 rounded-full mr-3`,
                          formData.category === category ? tw`bg-green-500` : tw`bg-gray-100`
                        ]}
                        onPress={() => handleInputChange('category', category)}
                        disabled={isSubmitting}
                      >
                        <Text style={[
                          tw`text-sm`,
                          formData.category === category ? tw`text-white` : tw`text-gray-700`,
                          { fontFamily: 'Mont-Medium' }
                        ]}>
                          {category}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Nivo iskustva *
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {experienceLevels.map((level) => (
                      <TouchableOpacity
                        key={level}
                        style={[
                          tw`px-4 py-3 rounded-full mr-3`,
                          formData.experience === level ? tw`bg-green-500` : tw`bg-gray-100`
                        ]}
                        onPress={() => handleInputChange('experience', level)}
                        disabled={isSubmitting}
                      >
                        <Text style={[
                          tw`text-sm`,
                          formData.experience === level ? tw`text-white` : tw`text-gray-700`,
                          { fontFamily: 'Mont-Medium' }
                        ]}>
                          {level}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Opis usluga *
                  </Text>
                  <TextInput
                    style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                    placeholder="Opisite detaljno koje usluge pružate..."
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    value={formData.description}
                    onChangeText={(value) => handleInputChange('description', value)}
                    editable={!isSubmitting}
                  />
                </View>

                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Satnica (RSD) *
                  </Text>
                  <TextInput
                    style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                    placeholder="500"
                    keyboardType="numeric"
                    value={formData.hourlyRate}
                    onChangeText={(value) => handleInputChange('hourlyRate', value)}
                    editable={!isSubmitting}
                  />
                </View>

                <View style={[ tw`mb-3` ]}>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Dostupnost *
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {availabilityOptions.map((option) => (
                      <TouchableOpacity
                        key={option}
                        style={[
                          tw`px-4 py-3 rounded-full mr-3`,
                          formData.availability === option ? tw`bg-green-500` : tw`bg-gray-100`
                        ]}
                        onPress={() => handleInputChange('availability', option)}
                        disabled={isSubmitting}
                      >
                        <Text style={[
                          tw`text-sm`,
                          formData.availability === option ? tw`text-white` : tw`text-gray-700`,
                          { fontFamily: 'Mont-Medium' }
                        ]}>
                          {option}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                tw`w-full p-4 rounded-lg items-center`,
                isSubmitting ? tw`bg-green-300` : tw`bg-green-500`,
              ]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text
                  style={[
                    tw`text-white text-lg`,
                    { fontFamily: "Mont-SemiBold" },
                  ]}
                >
                  Pošaljite prijavu
                </Text>
              )}
            </TouchableOpacity>

            {/* Note */}
            <Text style={[tw`text-sm text-gray-500 text-center mt-3`, { fontFamily: 'Mont-Regular' }]}>
              * Obavezna polja
            </Text>
          </View>
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

export default BecomeWorker;
