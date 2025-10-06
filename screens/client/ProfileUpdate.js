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
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '../../context/AuthContext';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileUpdate = () => {
  const { user, profile, updateUser } = useAuth();
  const navigation = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    bio: ''
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

  const cities = [
    'Novi Sad', 'Beograd', 'Niš', 'Kragujevac', 'Subotica', 'Zrenjanin', 
    'Pančevo', 'Čačak', 'Novi Pazar', 'Kraljevo', 'Leskovac', 'Užice'
  ];

  useEffect(() => {
    if (user && profile) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        city: profile.city || 'Novi Sad',
        postalCode: profile.postalCode || '',
        bio: profile.bio || ''
      });
    }
  }, [user, profile]);

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

    if (!formData.address.trim()) {
      Alert.alert("Greška", "Molimo unesite adresu");
      return;
    }

    if (!formData.city) {
      Alert.alert("Greška", "Molimo odaberite grad");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update user data
      const updatedUser = { ...user, fullName: formData.fullName, email: formData.email };
      const updatedProfile = { ...profile, ...formData };
      
      updateUser(updatedUser);
      
      Alert.alert(
        "Uspešno",
        "Vaš profil je uspešno ažuriran!",
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
        "Došlo je do neočekivane greške prilikom ažuriranja profila."
      );
      console.error("Update error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChangePassword = () => {
    Alert.alert('Info', 'Promena lozinke će biti dostupna uskoro');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Brisanje naloga',
      'Da li ste sigurni da želite da obrišete svoj nalog? Ova akcija se ne može poništiti.',
      [
        { text: 'Otkaži', style: 'cancel' },
        { 
          text: 'Obriši', 
          style: 'destructive',
          onPress: () => Alert.alert('Info', 'Brisanje naloga će biti dostupno uskoro')
        }
      ]
    );
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
            Izmeni profil
          </Text>
          <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
            Ažurirajte svoje lične podatke
          </Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6 py-6`}>
          {/* Profile Picture Section */}
          <View style={tw`items-center mb-8`}>
            <View style={tw`relative`}>
              <Image
                source={require('../../assets/icon.png')}
                style={tw`w-24 h-24 rounded-full`}
              />
              <TouchableOpacity
                style={tw`absolute bottom-0 right-0 bg-green-500 p-2 rounded-full`}
                onPress={() => Alert.alert('Info', 'Promena profilne slike će biti dostupna uskoro')}
              >
                <Ionicons name="camera" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={tw`mt-3`}
              onPress={() => Alert.alert('Info', 'Promena profilne slike će biti dostupna uskoro')}
            >
                              <Text style={[tw`text-green-500`, { fontFamily: 'Mont-Medium' }]}>
                Promeni sliku
              </Text>
            </TouchableOpacity>
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

            {/* Address Information */}
            <View>
              <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
                Adresa
              </Text>
              
              <View style={tw`space-y-4`}>
                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Ulica i broj *
                  </Text>
                  <TextInput
                    style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                    placeholder="Bulevar oslobođenja 123"
                    value={formData.address}
                    onChangeText={(value) => handleInputChange('address', value)}
                    editable={!isSubmitting}
                  />
                </View>

                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Grad *
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {cities.map((city) => (
                      <TouchableOpacity
                        key={city}
                        style={[
                          tw`px-4 py-3 rounded-full mr-3`,
                          formData.city === city ? tw`bg-green-500` : tw`bg-gray-100`
                        ]}
                        onPress={() => handleInputChange('city', city)}
                        disabled={isSubmitting}
                      >
                        <Text style={[
                          tw`text-sm`,
                          formData.city === city ? tw`text-white` : tw`text-gray-700`,
                          { fontFamily: 'Mont-Medium' }
                        ]}>
                          {city}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

                <View>
                  <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                    Poštanski broj
                  </Text>
                  <TextInput
                    style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                    placeholder="21000"
                    keyboardType="numeric"
                    value={formData.postalCode}
                    onChangeText={(value) => handleInputChange('postalCode', value)}
                    editable={!isSubmitting}
                  />
                </View>
              </View>
            </View>

            {/* Bio */}
            <View>
              <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
                O meni
              </Text>
              <TextInput
                style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                placeholder="Napišite nešto o sebi..."
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={formData.bio}
                onChangeText={(value) => handleInputChange('bio', value)}
                editable={!isSubmitting}
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                tw`w-full p-4 rounded-lg items-center mt-3`,
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
                  Sačuvaj promene
                </Text>
              )}
            </TouchableOpacity>

            {/* Additional Options */}
            <View style={tw`flex flex-row gap-3 my-3`}>
              <TouchableOpacity
                style={tw`flex-1 p-4 bg-gray-100 rounded-lg items-center`}
                onPress={handleChangePassword}
              >
                <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Medium' }]}>
                  Promeni lozinku
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-1 p-4 bg-red-100 rounded-lg items-center`}
                onPress={handleDeleteAccount}
              >
                <Text style={[tw`text-red-600`, { fontFamily: 'Mont-Medium' }]}>
                  Obriši nalog
                </Text>
              </TouchableOpacity>
            </View>

            {/* Note */}
            <Text style={[tw`text-sm text-gray-500 text-center`, { fontFamily: 'Mont-Regular' }]}>
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

export default ProfileUpdate;
