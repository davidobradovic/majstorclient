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

export default function NextThingOnYourMind() {
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
    <View style={[ tw`px-4` ]}>
    <View style={[ tw`flex flex-row items-center justify-between` ]}>
      <Text style={[ tw`text-xl max-w-2/3`, { fontFamily: 'Mont-Bold' }  ]}>Next Thing On Your Mind</Text>
      <TouchableOpacity style={[ tw`flex flex-row gap-1 items-center` ]}>
        <Text style={[ tw`text-base text-blue-500`, { fontFamily: 'Mont-Bold' }  ]}>View all</Text>
        <Feather name='chevrons-right' size={18} style={[ tw`text-blue-500` ]} />
      </TouchableOpacity>
    </View>
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={[ tw`mt-4` ]}>
      <View style={[ tw`flex-1 overflow-hidden`, { minWidth: 180 } ]}>
        <Image source={require('../assets/img.webp')} style={[ tw`w-full h-28 rounded-xl` ]} />
        <View style={[ tw`pt-1` ]}>
          <Text style={[ tw`text-base opacity-75`, { fontFamily: 'Mont-SemiBold' }  ]}>Bathroom Cleaning</Text>
          <Text style={[ tw`text-sm opacity-50`, { fontFamily: 'Mont-SemiBold' }  ]}>Service at Home</Text>
          <View style={[ tw`flex flex-row gap-1 mt-0.5` ]}>
            <Text style={[ tw`text-xs opacity-50`, { fontFamily: 'Mont-SemiBold' }  ]}>Start at</Text>
            <Text style={[ tw`text-xs text-green-600 opacity-75`, { fontFamily: 'Mont-SemiBold' }  ]}>1.500 RSD</Text>
          </View>
        </View>
      </View>
      <View style={[ tw`flex-1 overflow-hidden ml-3`, { minWidth: 180 } ]}>
        <Image source={require('../assets/img.webp')} style={[ tw`w-full h-28 rounded-xl` ]} />
        <View style={[ tw`pt-1` ]}>
          <Text style={[ tw`text-base opacity-75`, { fontFamily: 'Mont-SemiBold' }  ]}>Bathroom Cleaning</Text>
          <Text style={[ tw`text-sm opacity-50`, { fontFamily: 'Mont-SemiBold' }  ]}>Service at Home</Text>
          <View style={[ tw`flex flex-row gap-1 mt-0.5` ]}>
            <Text style={[ tw`text-xs opacity-50`, { fontFamily: 'Mont-SemiBold' }  ]}>Start at</Text>
            <Text style={[ tw`text-xs text-green-600 opacity-75`, { fontFamily: 'Mont-SemiBold' }  ]}>1.500 RSD</Text>
          </View>
        </View>
      </View>
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
