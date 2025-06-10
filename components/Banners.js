import { StatusBar } from "expo-status-bar";
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
  Modal,
  Pressable,
  FlatList,
  ImageBackground
} from "react-native";
import tw from "twrnc";
import { useFonts } from "expo-font";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Feather from "react-native-vector-icons/Feather";
import IonIcons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useEffect, useState, useRef } from "react";
import { BlurView } from "expo-blur";


export default function Banners() {
    return (
                <View style={[tw`p-3`]}>
                  <Image
                    source={require("../assets/banner.jpg")}
                    style={[tw`w-full h-50 rounded-xl`]}
                  />
                </View>
    )
}