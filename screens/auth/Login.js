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
} from "react-native";
import React, { useState } from "react";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, loading: authLoading } = useAuth();
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

  const handleLogin = async () => {
    // Form validation
    if (!email.trim()) {
      Alert.alert("Greška", "Molimo unesite email adresu");
      return;
    }

    if (!password) {
      Alert.alert("Greška", "Molimo unesite lozinku");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Authed" }],
        });
      } else {
        Alert.alert(
          "Greška",
          result.message || "Neuspešna prijava. Proverite svoje podatke."
        );
      }
    } catch (error) {
      Alert.alert(
        "Greška",
        "Došlo je do neočekivane greške prilikom prijavljivanja."
      );
      console.error("Login error:", error);
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
    <View style={tw`flex-1 bg-white`}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1 flex bg-gradient-to-b from-green-50 via-white to-green-50 justify-end`}
      >
        <View style={tw`relative z-10 bg-white px-8 justify-center items-center pb-16`}>

          {/* Header */}
          <View style={tw`w-full mb-10`}>
            <Text style={[tw`text-4xl text-gray-900 mb-3 text-center`, { fontFamily: "Mont-Bold" }]}>
              Dobrodošli nazad
            </Text>
            <Text style={[tw`text-lg text-gray-600 text-center leading-relaxed`, { fontFamily: "Mont-Regular" }]}>
              Prijavite se na TrebaMi i nastavite sa vašim projektima
            </Text>
          </View>

          {/* Form */}
          <View style={tw`w-full space-y-6`}>
            {/* Email Input */}
            <View style={tw`space-y-3`}>
              <Text style={[tw`text-base text-gray-700 font-semibold`, { fontFamily: "Mont-SemiBold" }]}>
                Email adresa
              </Text>
              <View style={tw`bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 shadow-sm`}>
                <TextInput
                  style={[tw`text-base text-gray-900`, { fontFamily: "Mont-Regular" }]}
                  placeholder="Unesite email adresu"
                  placeholderTextColor="#9CA3AF"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={tw`space-y-3`}>
              <Text style={[tw`text-base text-gray-700 font-semibold`, { fontFamily: "Mont-SemiBold" }]}>
                Lozinka
              </Text>
              <View style={tw`bg-gray-50 rounded-2xl border-2 border-gray-100 px-5 py-4 shadow-sm`}>
                <TextInput
                  style={[tw`text-base text-gray-900`, { fontFamily: "Mont-Regular" }]}
                  placeholder="Unesite lozinku"
                  placeholderTextColor="#9CA3AF"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isSubmitting}
                />
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity style={tw`self-end`}>
              <Text style={[tw`text-green-600 text-sm`, { fontFamily: "Mont-Medium" }]}>
                Zaboravili ste lozinku?
              </Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                tw`w-full py-4 rounded-2xl items-center shadow-lg mt-4`,
                isSubmitting ? tw`bg-green-300` : tw`bg-green-500`,
              ]}
              onPress={handleLogin}
              disabled={isSubmitting || authLoading}
            >
              {isSubmitting ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={[tw`text-white text-lg font-semibold`, { fontFamily: "Mont-SemiBold" }]}>
                  Prijavi se
                </Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View style={tw`flex-row items-center my-8`}>
              <View style={tw`flex-1 h-px bg-gray-200`} />
              {/* <Text style={[tw`px-4 text-gray-400 text-sm`, { fontFamily: "Mont-Medium" }]}>
                ili
              </Text> */}
              <View style={tw`flex-1 h-px bg-gray-200`} />
            </View>

            {/* Social Login Buttons */}
            {/* <View style={tw`space-y-4`}>
              <TouchableOpacity
                style={tw`w-full py-4 rounded-2xl border-2 border-gray-100 bg-white items-center flex-row justify-center shadow-sm`}
              >
                <Text style={tw`text-xl mr-3`}>🔍</Text>
                <Text style={[tw`text-gray-700 text-base font-semibold`, { fontFamily: "Mont-SemiBold" }]}>
                  Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={tw`w-full py-4 rounded-2xl border-2 border-gray-100 bg-white items-center flex-row justify-center shadow-sm`}
              >
                <Text style={tw`text-xl mr-3`}>📘</Text>
                <Text style={[tw`text-gray-700 text-base font-semibold`, { fontFamily: "Mont-SemiBold" }]}>
                  Facebook
                </Text>
              </TouchableOpacity>
            </View> */}

            {/* Register Link */}
            <View style={tw`flex-row justify-center pt-6`}>
              <Text style={[tw`text-gray-600 text-base`, { fontFamily: "Mont-Regular" }]}>
                Nemate nalog?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                disabled={isSubmitting}
              >
                <Text style={[tw`text-green-600 text-base font-semibold`, { fontFamily: "Mont-SemiBold" }]}>
                  Registrujte se
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
