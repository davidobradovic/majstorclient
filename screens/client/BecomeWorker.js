// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   Image,
//   Modal,
//   TextInput,
// } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import MaterialIcons from "react-native-vector-icons/MaterialIcons";
// import FontAwesome from "react-native-vector-icons/FontAwesome";
// import tw from "twrnc";
// import { useNavigation } from "@react-navigation/native";
// import { useFonts } from "expo-font";
// import Divider from "../../components/Divider";

// const BecomeWorker = () => {
//   const [loaded, error] = useFonts({
//     "Mont-Black": require("../../assets/fonts/Montserrat-Black.ttf"),
//     "Mont-BlackItalic": require("../../assets/fonts/Montserrat-BlackItalic.ttf"),
//     "Mont-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
//     "Mont-BoldItalic": require("../../assets/fonts/Montserrat-BoldItalic.ttf"),
//     "Mont-ExtraBold": require("../../assets/fonts/Montserrat-ExtraBold.ttf"),
//     "Mont-ExtraBoldItalic": require("../../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
//     "Mont-ExtraLight": require("../../assets/fonts/Montserrat-ExtraLight.ttf"),
//     "Mont-ExtraLightItalic": require("../../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
//     "Mont-Italic": require("../../assets/fonts/Montserrat-Italic.ttf"),
//     "Mont-Light": require("../../assets/fonts/Montserrat-Light.ttf"),
//     "Mont-LightItalic": require("../../assets/fonts/Montserrat-LightItalic.ttf"),
//     "Mont-Medium": require("../../assets/fonts/Montserrat-Medium.ttf"),
//     "Mont-MediumItalic": require("../../assets/fonts/Montserrat-MediumItalic.ttf"),
//     "Mont-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
//     "Mont-SemiBold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
//     "Mont-SemiBoldItalic": require("../../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
//     "Mont-Thin": require("../../assets/fonts/Montserrat-Thin.ttf"),
//     "Mont-ThinItalic": require("../../assets/fonts/Montserrat-ThinItalic.ttf"),
//   });

//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={[tw`flex-1 bg-white`]}>
//       <View style={[tw`p-4 flex-1`]}>
//         <Text style={[tw`text-2xl text-center`, { fontFamily: "Mont-Bold" }]}>
//           Postani Radnik
//         </Text>

//         <View style={[tw`flex gap-5 mt-14`]}>
//           <View>
//             <Text
//               style={[tw`text-xs mb-1 uppercase`, { fontFamily: "Mont-Bold" }]}
//             >
//               Opis Profila
//             </Text>
//             <TextInput
//               numberOfLines={10}
//               multiline={true}
//               style={[tw`p-4 bg-gray-100 rounded-xl`]}
//               placeholder="Unesite ime i prezime"
//             />
//           </View>

//           <View style={[tw`bg-yellow-100 p-3 rounded-lg`]}>
//             <Text style={[tw`text-yellow-800`, { fontFamily: "Mont-Medium" }]}>
//               Za verifikaciju je potrebno da postavite slike Vašeg identifikacionog dokumenta ( pasoš, lična dozvola ili vozačka dozvola ).
//             </Text>
//             <Text style={[tw`text-yellow-800`, { fontFamily: "Mont-Bold" }]}>
//               Opcionalno možete izabrati i dokument o Vašem poslu
//             </Text>
//           </View>

//           <TouchableOpacity style={[ tw`py-8 bg-gray-100 border border-gray-200 border-dashed rounded-2xl flex items-center justify-center` ]}>
//             <Icon name="cloud-upload-outline" style={[ tw`text-gray-500 mb-4` ]} size={30} />
//             <Text style={[ tw`text-center text-black`, { fontFamily: 'Mont-SemiBold' } ]}>Izaberite fotografije dokumenta</Text>
//             <Text style={[ tw`text-center text-gray-500 text-xs mt'1`, { fontFamily: 'Mont-SemiBold' } ]}>Dokumenti će biti pregledani od strane ovlaštenih lica sistema TrebaMi. Nijedna Vaša informacija neće biti prikazana nepoznatim licima.</Text>
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={[
//               tw`p-4 bg-blue-500 rounded-xl flex items-center justify-center`,
//             ]}
//           >
//             <Text style={[tw`text-white`, { fontFamily: "Mont-Bold" }]}>
//               Pošalji Prijavu
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// export default BecomeWorker;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Image,
  Modal,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import Divider from "../../components/Divider";

const BecomeWorker = () => {
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

  const navigation = useNavigation();

  if (!loaded) return null;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <ScrollView contentContainerStyle={tw`p-5`}>
        <Text style={[tw`text-3xl text-center mb-4`, { fontFamily: "Mont-Bold" }]}>
          Postani Radnik
        </Text>

        <View style={tw`bg-gray-50 p-4 rounded-2xl shadow-sm mb-5`}>
          <Text style={[tw`text-sm uppercase mb-2`, { fontFamily: "Mont-Bold" }]}>
            Opis Profila
          </Text>
          <TextInput
            numberOfLines={5}
            multiline
            style={[tw`p-4 bg-white rounded-xl border border-gray-200`, { fontFamily: "Mont-Regular" }]}
            placeholder="Unesite ime i prezime, kratak opis Vašeg iskustva..."
          />
        </View>

        <View style={tw`bg-yellow-100 p-4 rounded-xl mb-5`}>
          <Text style={[tw`text-yellow-800 mb-1`, { fontFamily: "Mont-Medium" }]}>
            Za verifikaciju je potrebno da postavite slike Vašeg identifikacionog dokumenta ( pasoš, lična karta ili vozačka dozvola ).
          </Text>
          <Text style={[tw`text-yellow-800 font-bold`, { fontFamily: "Mont-Bold" }]}>
            Opcionalno možete dodati i dokument o Vašem poslu.
          </Text>
        </View>

        <TouchableOpacity style={tw`py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl items-center justify-center mb-5`}>
          <Icon name="cloud-upload-outline" size={36} style={tw`text-gray-500 mb-3`} />
          <Text style={[tw`text-black`, { fontFamily: "Mont-SemiBold" }]}>
            Izaberite fotografije dokumenata
          </Text>
          <Text style={[tw`text-xs text-center text-gray-500 mt-1`, { fontFamily: "Mont-Regular" }]}>
            Dokumenti će biti pregledani isključivo od strane ovlašćenih lica sistema. Vaši podaci neće biti deljeni trećim licima.
          </Text>
        </TouchableOpacity>

        <View style={tw`bg-gray-100 p-4 rounded-2xl mb-5`}>
          <Text style={[tw`text-base mb-2`, { fontFamily: "Mont-Bold" }]}>
            Privacy Policy
          </Text>
          <Text style={[tw`text-xs leading-5 text-gray-700`, { fontFamily: "Mont-Regular" }]}>
            Registracijom kao radnik na platformi TrebaMi, pristajete na obradu i čuvanje Vaših ličnih podataka isključivo u svrhe verifikacije identiteta, komunikacije i ponude usluga preko sistema. Vaši podaci neće biti dostupni javnosti niti prodavani trećim stranama. U svakom trenutku možete zatražiti brisanje svojih podataka slanjem zahteva na email support@trebami.app. Korišćenjem naše aplikacije potvrđujete da ste pročitali i saglasni sa ovim pravilima privatnosti.
          </Text>
        </View>

        <TouchableOpacity style={tw`p-4 bg-blue-600 rounded-xl items-center justify-center shadow-md`}>
          <Text style={[tw`text-white text-lg`, { fontFamily: "Mont-Bold" }]}>
            Pošalji Prijavu
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BecomeWorker;
