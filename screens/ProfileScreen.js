import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "twrnc";
import { useFonts } from "expo-font";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useEffect } from "react";
import Divider from "../components/Divider";

import { useAuth } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

const paths = [
  {
    title: "Uredi Profil",
    icon: "person-circle-outline",
    path: "EditProfile",
    color: "#156adc"
  },
  {
    title: "Postani Radnik",
    icon: "briefcase-outline",
    path: "BecomeWorker",
    color: "#20637d"
  },
  {
    title: "Pozovi Prijatelje",
    icon: "share-outline",
    path: "InviteFriends",
    color: "#15dc6b"
  },
  {
    title: "Adrese",
    icon: "home-outline",
    path: "Addresses",
    color: "#151515"
  }
]

export default function ProfileScreen() {

  const navigation = useNavigation();
  const { profile, logout, user } = useAuth();

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
  
  console.log(user, profile)

  return (
    <View style={styles.container}>
      <SafeAreaView>

        <View style={[ tw`flex items-center my-6` ]}>
          {profile.images && (
            <Image
              source={{ uri: `https://backend.davidtesla.online/uploads/${profile.images[0].filename}` }}
              style={{ width: 160, height: 160, borderRadius: 100 }} // moraš postaviti stilove (širinu i visinu)
            />
          )}
          <Text style={[ tw`mt-3`, { fontFamily: 'Mont-SemiBold' } ]}>{profile.email}</Text>
        </View>
        <View style={[ tw`flex mx-4 rounded-xl bg-gray-100 overflow-hidden` ]}>
          {
            paths.map((path, index) => {
              return (
                <TouchableOpacity onPress={() => navigation.navigate(path.path)} key={index} style={[ tw`p-4 border-gray-200 flex flex-row items-center gap-3 border-b` ]}>
                  <IonIcons name={path.icon} size={24} color={path.color} />
                  <Text>{path.title}</Text>
                </TouchableOpacity>
              )
            })
          }
          {/* <TouchableOpacity style={[ tw`p-4 border-gray-200 flex flex-row items-center gap-3` ]}>
            <IonIcons name="ban-outline" size={24} color="#dc153d" />
            <Text>Deaktiviraj Nalog</Text>
          </TouchableOpacity> */}
        </View>
        <View style={[ tw`flex flex-row items-center justify-center mt-4 px-4` ]}>
          <TouchableOpacity onPress={logout} style={[ tw`p-4 bg-red-600 flex w-full flex-row items-center justify-center gap-3`, { borderRadius: 50 } ]}>
            <IonIcons name="exit-outline" size={24} color="white" />
            <Text style={[ tw`text-white`, { fontFamily: 'Mont-Medium' } ]}>Odjavi se</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
