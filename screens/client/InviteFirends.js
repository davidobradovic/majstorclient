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

// const InviteFriends = () => {
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

//   if (!loaded) return null;

//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <ScrollView contentContainerStyle={tw`p-5`}>
//         <Text
//           style={[tw`text-3xl text-center mb-4`, { fontFamily: "Mont-Bold" }]}
//         >
//           Pozovi Prijatelje
//         </Text>
//         <View style={[ tw`mt-20` ]}>
//           <TextInput 
//             style={[ tw`p-5 bg-gray-100 rounded-xl`, { fontFamily: 'Mont-Bold' }]}
//             value="https://trebami.rs/invite/diu41udsa9u"
//           />
//           <TouchableOpacity style={[ tw`flex flex-row gap-3 justify-center items-center bg-blue-500 p-4 rounded-xl mt-4` ]}>
//             <Icon name="share-outline" size={22} color="white" />
//             <Text style={[ tw`text-lg text-white`, { fontFamily: 'Mont-Bold' } ]}>Pozovi prijatelja</Text>
//           </TouchableOpacity>
//         </View>
//         <View style={[ tw`p-8 bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex items-center mt-4` ]}>
//           <Text style={[ tw`text-2xl`, { fontFamily: 'Mont-Bold' } ]}>60</Text>
//           <Text style={[ tw``, { fontFamily: 'Mont-Bold' } ]}>Ukupno pozivnica</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default InviteFriends;

import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const InviteFriends = () => {
  const [loaded] = useFonts({
    "Mont-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Mont-Regular": require("../../assets/fonts/Montserrat-Regular.ttf"),
  });

  const navigation = useNavigation();
  const totalInvites = 60;

  const rewards = [
    { id: 1, invitesRequired: 10, reward: "2% popusta" },
    { id: 2, invitesRequired: 25, reward: "3% popusta" },
    { id: 3, invitesRequired: 50, reward: "5% popusta" },
    { id: 4, invitesRequired: 75, reward: "7% popusta" },
    { id: 5, invitesRequired: 100, reward: "10% popusta" },
  ];

  if (!loaded) return null;

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        <Text
          style={[tw`text-3xl text-center mb-4`, { fontFamily: "Mont-Bold" }]}
        >
          Pozovi Prijatelje
        </Text>

        {/* Invite link & button */}
        <View style={tw`mt-5`}>
          <TextInput
            style={[
              tw`p-4 bg-gray-100 rounded-xl text-center`,
              { fontFamily: "Mont-Regular" },
            ]}
            editable={false}
            value="https://trebami.rs/invite/diu41udsa9u"
          />
          <TouchableOpacity
            style={tw`flex flex-row justify-center items-center bg-blue-500 p-4 rounded-xl mt-3`}
          >
            <Icon name="share-outline" size={20} color="white" />
            <Text
              style={[
                tw`text-white text-lg ml-2`,
                { fontFamily: "Mont-Bold" },
              ]}
            >
              Pozovi prijatelja
            </Text>
          </TouchableOpacity>
        </View>

        {/* Total invites */}
        <View
          style={tw`p-6 bg-gray-100 rounded-2xl mt-8 flex items-center shadow-md`}
        >
          <Text style={[tw`text-4xl text-blue-500`, { fontFamily: "Mont-Bold" }]}>
            {totalInvites}
          </Text>
          <Text style={[tw`text-gray-600`, { fontFamily: "Mont-Regular" }]}>
            Ukupno pozivnica
          </Text>
        </View>

        {/* Leaderboard */}
        <View style={tw`mt-8`}>
          <Text
            style={[
              tw`text-xl mb-4`,
              { fontFamily: "Mont-Bold", color: "#333" },
            ]}
          >
            Nagrade:
          </Text>
          {rewards.map((item) => {
            const achieved = totalInvites >= item.invitesRequired;
            return (
              <View
                key={item.id}
                style={tw`flex-row items-center justify-between p-4 rounded-xl mb-3 ${
                  achieved ? "bg-yellow-50" : "bg-gray-100"
                }`}
              >
                <View style={tw`flex-row items-center`}>
                  <Icon
                    name={achieved ? "trophy" : "trophy-outline"}
                    size={24}
                    color={achieved ? "#FFD700" : "#aaa"}
                  />
                  <Text
                    style={[
                      tw`ml-3 text-lg`,
                      {
                        fontFamily: "Mont-Bold",
                        color: achieved ? "#FFD700" : "#333",
                      },
                    ]}
                  >
                    {item.invitesRequired} pozivnica
                  </Text>
                </View>
                <Text
                  style={[
                    tw`text-lg`,
                    {
                      fontFamily: "Mont-Bold",
                      color: achieved ? "#FFD700" : "#333",
                    },
                  ]}
                >
                  {item.reward}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default InviteFriends;
