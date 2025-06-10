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
import { useCallback, useEffect, useState } from "react";
import Divider from "../components/Divider";
import CleaningAndPest from "../components/CleaningAndPest";
import BestServices from "../components/BestServices";
import NextThingOnYourMind from "../components/NextThingOnYourMind";
import Categories from "../components/Categories";
import Banners from "../components/Banners";
import { useAuth } from "../context/AuthContext";

export default function HomeScreen() {
  
  const { categories } = useAuth();

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

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        
        <View
          style={[
            tw`px-3 flex justify-end h-auto gap-3 mb-3 bg-white pb-3`,
            { paddingTop: Platform.OS === "ios" ? 60 : "auto" },
          ]}
        >
          
          <View  style={[
            tw`flex flex-row gap-3 items-end justify-between mb-3`
          ]} >
          <View style={[tw`flex-1 flex flex-row items-center gap-2`]}>
            <IonIcons
              name="location-sharp"
              size={26}
              style={[tw`opacity-50`]}
            />
            <View>
              <Text
                style={[
                  tw`text-xs opacity-50 mb-[-3]`,
                  { fontFamily: "Mont-SemiBold" },
                ]}
              >
                Trenutna lokacija
              </Text>
              <Text style={[tw`text-lg`, { fontFamily: "Mont-Bold" }]}>
                Novi Sad
              </Text>
            </View>
          </View>

          <View
            style={[
              tw`p-3 bg-gray-50 border border-gray-200`,
              { borderRadius: 100 },
            ]}
          >
            <AntDesign name="user" size={20} />
          </View>
          </View>
          <View style={[ tw`flex items-center flex-row gap-3 pl-4 bg-gray-50 w-full  border border-gray-200`, {  borderRadius: 100 } ]}>
            <AntDesign name="search1" size={20} style={[ tw`text-gray-400` ]} />
            <TextInput placeholder="Unesite pojam za pretragu" style={[ tw`flex-1 py-4 pr-4`, { fontFamily: 'Mont-SemiBold' } ]} />
          </View>
        </View>

        <Banners />

        <Categories categories={categories} />

        {/* <Divider />

        <CleaningAndPest />

        <Divider />

        <BestServices />

        <Divider />

        <NextThingOnYourMind /> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
