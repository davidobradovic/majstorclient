import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  TextInput,
  Alert,
  Share,
  Linking,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '../../context/AuthContext';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const InviteFriends = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [inviteCode, setInviteCode] = useState('TREBAMI2024');
  const [inviteLink, setInviteLink] = useState('https://trebami.app/invite/TREBAMI2024');
  const [referralStats, setReferralStats] = useState({
    totalInvites: 12,
    successfulInvites: 8,
    pendingInvites: 4,
    totalEarnings: 2400
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

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Pozivam te da se pridružiš TrebaMi platformi! Koristi moj pozivni kod ${inviteCode} za bonus na prvoj rezervaciji. ${inviteLink}`,
        title: 'Pozivam te na TrebaMi!',
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Greška', 'Došlo je do greške prilikom deljenja');
    }
  };

  const handleCopyCode = () => {
    // In a real app, you would use Clipboard API
    Alert.alert('Uspešno', 'Pozivni kod je kopiran u clipboard!');
  };

  const handleCopyLink = () => {
    // In a real app, you would use Clipboard API
    Alert.alert('Uspešno', 'Link je kopiran u clipboard!');
  };

  const handleWhatsAppShare = () => {
    const message = `Pozivam te da se pridružiš TrebaMi platformi! Koristi moj pozivni kod ${inviteCode} za bonus na prvoj rezervaciji. ${inviteLink}`;
    const whatsappUrl = `whatsapp://send?text=${encodeURIComponent(message)}`;
    
    Linking.canOpenURL(whatsappUrl)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(whatsappUrl);
        } else {
          Alert.alert('Greška', 'WhatsApp nije instaliran na vašem uređaju');
        }
      })
      .catch((err) => {
        Alert.alert('Greška', 'Došlo je do greške prilikom otvaranja WhatsApp-a');
      });
  };

  const handleFacebookShare = () => {
    Alert.alert('Info', 'Deljenje na Facebook-u će biti dostupno uskoro');
  };

  const handleInstagramShare = () => {
    Alert.alert('Info', 'Deljenje na Instagram-u će biti dostupno uskoro');
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
            Pozovi prijatelje
          </Text>
          <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
            Zarađujte pozivajući prijatelje
          </Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6 py-6`}>
          {/* Info Card */}
                          <View style={tw`bg-green-50 p-4 rounded-xl mb-6 border border-green-200`}>
            <View style={tw`flex-row items-start`}>
              <Ionicons name="gift" size={24} color="#4ade80" style={tw`mr-3 mt-1`} />
              <View style={tw`flex-1`}>
                <Text style={[tw`text-base text-green-800 mb-2`, { fontFamily: 'Mont-SemiBold' }]}>
                  Kako funkcioniše?
                </Text>
                                  <Text style={[tw`text-sm text-green-700`, { fontFamily: 'Mont-Regular' }]}>
                  Pozovite prijatelje koristeći vaš pozivni kod. Za svakog prijatelja koji se registruje i napravi prvu rezervaciju, oboje dobijate 300 RSD bonusa!
                </Text>
              </View>
            </View>
          </View>

          {/* Referral Stats */}
          <View style={tw`mb-6`}>
            <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
              Vaša statistika
            </Text>
            
            <View style={tw`grid grid-cols-2 gap-4`}>
              <View style={tw`bg-white p-4 rounded-xl border border-gray-200`}>
                <Text style={[tw`text-2xl text-green-500 mb-1`, { fontFamily: 'Mont-Bold' }]}>
                  {referralStats.totalInvites}
                </Text>
                <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
                  Ukupno poziva
                </Text>
              </View>
              
              <View style={tw`bg-white p-4 rounded-xl border border-gray-200`}>
                <Text style={[tw`text-2xl text-green-500 mb-1`, { fontFamily: 'Mont-Bold' }]}>
                  {referralStats.successfulInvites}
                </Text>
                <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
                  Uspešnih poziva
                </Text>
              </View>
              
              <View style={tw`bg-white p-4 rounded-xl border border-gray-200`}>
                <Text style={[tw`text-2xl text-yellow-500 mb-1`, { fontFamily: 'Mont-Bold' }]}>
                  {referralStats.pendingInvites}
                </Text>
                <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
                  Na čekanju
                </Text>
              </View>
              
              <View style={tw`bg-white p-4 rounded-xl border border-gray-200`}>
                <Text style={[tw`text-2xl text-purple-500 mb-1`, { fontFamily: 'Mont-Bold' }]}>
                  {referralStats.totalEarnings} RSD
                </Text>
                <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
                  Ukupno zarađeno
                </Text>
              </View>
            </View>
          </View>

          {/* Invite Code Section */}
          <View style={tw`mb-6`}>
            <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
              Vaš pozivni kod
            </Text>
            
            <View style={tw`bg-white p-4 rounded-xl border border-gray-200 mb-4`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-1`}>
                  <Text style={[tw`text-sm text-gray-600 mb-1`, { fontFamily: 'Mont-Regular' }]}>
                    Pozivni kod
                  </Text>
                  <Text style={[tw`text-xl font-mono`, { fontFamily: 'Mont-Bold' }]}>
                    {inviteCode}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={tw`bg-green-500 px-4 py-2 rounded-lg`}
                  onPress={handleCopyCode}
                >
                  <Text style={[tw`text-white`, { fontFamily: 'Mont-Medium' }]}>
                    Kopiraj
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={tw`bg-white p-4 rounded-xl border border-gray-200`}>
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-1`}>
                  <Text style={[tw`text-sm text-gray-600 mb-1`, { fontFamily: 'Mont-Regular' }]}>
                    Pozivni link
                  </Text>
                  <Text style={[tw`text-sm text-green-500`, { fontFamily: 'Mont-Regular' }]} numberOfLines={1}>
                    {inviteLink}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={tw`bg-gray-500 px-4 py-2 rounded-lg`}
                  onPress={handleCopyLink}
                >
                  <Text style={[tw`text-white`, { fontFamily: 'Mont-Medium' }]}>
                    Kopiraj
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Share Options */}
          <View style={tw`mb-6`}>
            <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
              Podelite sa prijateljima
            </Text>
            
            <View style={tw`space-y-3 flex flex-row gap-3`}>
              <TouchableOpacity
                style={tw`flex-1 bg-green-500 p-4 rounded-lg flex-row items-center justify-center`}
                onPress={handleWhatsAppShare}
              >
                <Ionicons name="logo-whatsapp" size={24} color="white" />
               
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-1 bg-green-600 p-4 rounded-lg flex-row items-center justify-center`}
                onPress={handleFacebookShare}
              >
                <Ionicons name="logo-facebook" size={24} color="white" />
                
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-1 bg-purple-500 p-4 rounded-lg flex-row items-center justify-center`}
                onPress={handleInstagramShare}
              >
                <Ionicons name="logo-instagram" size={24} color="white" />
                
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`flex-1 bg-gray-600 p-4 rounded-lg flex-row items-center justify-center`}
                onPress={handleShare}
              >
                <Ionicons name="share-social" size={24} color="white" />
                
              </TouchableOpacity>
            </View>
          </View>

          {/* How It Works */}
          <View style={tw`mb-6`}>
            <Text style={[tw`text-lg mb-4`, { fontFamily: 'Mont-SemiBold' }]}>
              Kako funkcioniše?
            </Text>
            
            <View style={tw`space-y-4`}>
              <View style={tw`flex-row items-start`}>
                <View style={tw`bg-green-500 w-8 h-8 rounded-full items-center justify-center mr-4 mt-1`}>
                  <Text style={[tw`text-white text-sm`, { fontFamily: 'Mont-Bold' }]}>1</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={[tw`text-base mb-1`, { fontFamily: 'Mont-Medium' }]}>
                    Podelite pozivni kod
                  </Text>
                  <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
                    Pošaljite svoj pozivni kod prijateljima putem poruke, društvenih mreža ili direktno.
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row items-start`}>
                <View style={tw`bg-green-500 w-8 h-8 rounded-full items-center justify-center mr-4 mt-1`}>
                  <Text style={[tw`text-white text-sm`, { fontFamily: 'Mont-Bold' }]}>2</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={[tw`text-base mb-1`, { fontFamily: 'Mont-Medium' }]}>
                    Prijatelj se registruje
                  </Text>
                  <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
                    Vaš prijatelj se registruje koristeći vaš pozivni kod.
                  </Text>
                </View>
              </View>

              <View style={tw`flex-row items-start`}>
                <View style={tw`bg-green-500 w-8 h-8 rounded-full items-center justify-center mr-4 mt-1`}>
                  <Text style={[tw`text-white text-sm`, { fontFamily: 'Mont-Bold' }]}>3</Text>
                </View>
                <View style={tw`flex-1`}>
                  <Text style={[tw`text-base mb-1`, { fontFamily: 'Mont-Medium' }]}>
                    Prva rezervacija
                  </Text>
                  <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
                    Kada vaš prijatelj napravi prvu rezervaciju, oboje dobijate 300 RSD bonusa!
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Terms */}
          <View style={tw`bg-gray-50 p-4 rounded-xl border border-gray-200`}>
            <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
              * Bonus se aktivira nakon što pozvani korisnik napravi prvu rezervaciju. Bonus se može koristiti za popust na sledeće rezervacije. Uslovi se mogu promeniti.
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

export default InviteFriends;
