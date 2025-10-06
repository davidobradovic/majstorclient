import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../services/AuthService";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigation = useNavigation();

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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    // Form validation
    if (!formData.firstName.trim()) {
      Alert.alert("Greška", "Molimo unesite ime");
      return;
    }

    if (!formData.lastName.trim()) {
      Alert.alert("Greška", "Molimo unesite prezime");
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

    if (!formData.password) {
      Alert.alert("Greška", "Molimo unesite lozinku");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Greška", "Lozinke se ne poklapaju");
      return;
    }

    if (formData.password.length < 6) {
      Alert.alert("Greška", "Lozinka mora imati najmanje 6 karaktera");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await AuthService.register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (result.success) {
        Alert.alert(
          "Uspešno",
          result.message || "Registracija je uspešna! Možete se prijaviti.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login")
            }
          ]
        );
      } else {
        Alert.alert(
          "Greška",
          result.message || "Došlo je do greške prilikom registracije."
        );
      }
    } catch (error) {
      Alert.alert(
        "Greška",
        "Došlo je do neočekivane greške prilikom registracije."
      );
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading screen while fonts are loading
  if (!loaded) {
    return (
      <SafeAreaView style={tw`flex-1 items-center justify-center`}>
        <ActivityIndicator size="large" color="#4ade80" />
      </SafeAreaView>
    );
  }

  return (
    <View style={tw`flex-1`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1 flex bg-gradient-to-b from-green-50 via-white to-green-50 justify-end`}
      >
        <ScrollView 
          style={tw`relative z-10 bg-white px-8 pb-16`} 
          contentContainerStyle={tw`justify-center items-center`}
          showsVerticalScrollIndicator={false}
        >
          {/* Back Button */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={tw`w-12 h-12 bg-gray-100 rounded-2xl items-center justify-center self-start mb-8`}
          >
            <Text style={tw`text-2xl text-gray-700`}>←</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={tw`w-full mb-10`}>
            <Text style={[tw`text-4xl text-gray-900 mb-3 text-center`, { fontFamily: "Mont-Bold" }]}>
              Kreirajte nalog
            </Text>
            <Text style={[tw`text-lg text-gray-600 text-center leading-relaxed`, { fontFamily: "Mont-Regular" }]}>
              Registrujte se na TrebaMi i započnite sa korišćenjem usluga
            </Text>
          </View>

          <View style={tw`w-full mb-6`}>
            <Text
              style={[tw`mb-3 text-gray-700 font-semibold`, { fontFamily: "Mont-SemiBold" }]}
            >
              Ime
            </Text>
            <View style={tw`bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 shadow-sm`}>
              <TextInput
                style={[tw`text-base text-gray-900`, { fontFamily: "Mont-Regular" }]}
                placeholder="Unesite vaše ime"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                autoCorrect={false}
                value={formData.firstName}
                onChangeText={(value) => handleInputChange('firstName', value)}
                editable={!isSubmitting}
              />
            </View>
          </View>

          <View style={tw`w-full mb-6`}>
            <Text
              style={[tw`mb-3 text-gray-700 font-semibold`, { fontFamily: "Mont-SemiBold" }]}
            >
              Prezime
            </Text>
            <View style={tw`bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 shadow-sm`}>
              <TextInput
                style={[tw`text-base text-gray-900`, { fontFamily: "Mont-Regular" }]}
                placeholder="Unesite vaše prezime"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                autoCorrect={false}
                value={formData.lastName}
                onChangeText={(value) => handleInputChange('lastName', value)}
                editable={!isSubmitting}
              />
            </View>
          </View>

          <View style={tw`w-full mb-6`}>
            <Text
              style={[tw`mb-3 text-gray-700 font-semibold`, { fontFamily: "Mont-SemiBold" }]}
            >
              Email
            </Text>
            <View style={tw`bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 shadow-sm`}>
              <TextInput
                style={[tw`text-base text-gray-900`, { fontFamily: "Mont-Regular" }]}
                placeholder="Unesite email adresu"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                editable={!isSubmitting}
              />
            </View>
          </View>

          <View style={tw`w-full mb-6`}>
            <Text
              style={[tw`mb-3 text-gray-700 font-semibold`, { fontFamily: "Mont-SemiBold" }]}
            >
              Broj telefona
            </Text>
            <View style={tw`bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 shadow-sm`}>
              <TextInput
                style={[tw`text-base text-gray-900`, { fontFamily: "Mont-Regular" }]}
                placeholder="+381 60 123 4567"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                editable={!isSubmitting}
              />
            </View>
          </View>

          <View style={tw`w-full mb-6`}>
            <Text
              style={[tw`mb-3 text-gray-700 font-semibold`, { fontFamily: "Mont-SemiBold" }]}
            >
              Lozinka
            </Text>
            <View style={tw`bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 shadow-sm`}>
              <TextInput
                style={[tw`text-base text-gray-900`, { fontFamily: "Mont-Regular" }]}
                placeholder="Unesite lozinku"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                editable={!isSubmitting}
              />
            </View>
          </View>

          <View style={tw`w-full mb-8`}>
            <Text
              style={[tw`mb-3 text-gray-700 font-semibold`, { fontFamily: "Mont-SemiBold" }]}
            >
              Potvrdite lozinku
            </Text>
            <View style={tw`bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 shadow-sm`}>
              <TextInput
                style={[tw`text-base text-gray-900`, { fontFamily: "Mont-Regular" }]}
                placeholder="Ponovite lozinku"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                editable={!isSubmitting}
              />
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              tw`w-full py-5 rounded-2xl items-center shadow-lg`,
              isSubmitting ? tw`bg-green-300` : tw`bg-green-500`,
            ]}
            onPress={handleRegister}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color="white" size="large" />
            ) : (
              <Text
                style={[
                  tw`text-white text-xl font-semibold`,
                  { fontFamily: "Mont-SemiBold" },
                ]}
              >
                Registrujte se
              </Text>
            )}
          </TouchableOpacity>

          {/* Login Link */}
          <View style={tw`flex-row justify-center pt-8`}>
            <Text style={[tw`text-gray-600 text-base`, { fontFamily: "Mont-Regular" }]}>
              Već imate nalog?{" "}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              disabled={isSubmitting}
            >
              <Text
                style={[tw`text-green-600 text-base font-semibold`, { fontFamily: "Mont-SemiBold" }]}
              >
                Prijavite se
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({});
