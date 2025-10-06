// import { StatusBar } from "expo-status-bar";
// import {
//   Image,
//   Platform,
//   SafeAreaView,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
//   Animated,
//   Dimensions,
//   Modal,
//   Pressable,
//   FlatList,
//   ImageBackground
// } from "react-native";
// import tw from "twrnc";
// import { useFonts } from "expo-font";
// import { AntDesign, Entypo, Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { useEffect, useState, useRef } from "react";
// import { BlurView } from "expo-blur";
// import { useNavigation } from "@react-navigation/native";
// import CategoryCard from "./CategoryCard";
// import { set } from "date-fns";

// const { width, height } = Dimensions.get("window");

// export default function Categories({ categories }) {

//   const navigation = useNavigation();

//   const [loaded, error] = useFonts({
//     "Mont-Black": require("../assets/fonts/Montserrat-Black.ttf"),
//     "Mont-BlackItalic": require("../assets/fonts/Montserrat-BlackItalic.ttf"),
//     "Mont-Bold": require("../assets/fonts/Montserrat-Bold.ttf"),
//     "Mont-BoldItalic": require("../assets/fonts/Montserrat-BoldItalic.ttf"),
//     "Mont-ExtraBold": require("../assets/fonts/Montserrat-ExtraBold.ttf"),
//     "Mont-ExtraBoldItalic": require("../assets/fonts/Montserrat-ExtraBoldItalic.ttf"),
//     "Mont-ExtraLight": require("../assets/fonts/Montserrat-ExtraLight.ttf"),
//     "Mont-ExtraLightItalic": require("../assets/fonts/Montserrat-ExtraLightItalic.ttf"),
//     "Mont-Italic": require("../assets/fonts/Montserrat-Italic.ttf"),
//     "Mont-Light": require("../assets/fonts/Montserrat-Light.ttf"),
//     "Mont-LightItalic": require("../assets/fonts/Montserrat-LightItalic.ttf"),
//     "Mont-Medium": require("../assets/fonts/Montserrat-Medium.ttf"),
//     "Mont-MediumItalic": require("../assets/fonts/Montserrat-MediumItalic.ttf"),
//     "Mont-Regular": require("../assets/fonts/Montserrat-Regular.ttf"),
//     "Mont-SemiBold": require("../assets/fonts/Montserrat-SemiBold.ttf"),
//     "Mont-SemiBoldItalic": require("../assets/fonts/Montserrat-SemiBoldItalic.ttf"),
//     "Mont-Thin": require("../assets/fonts/Montserrat-Thin.ttf"),
//     "Mont-ThinItalic": require("../assets/fonts/Montserrat-ThinItalic.ttf"),
//   });

//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubcategory, setSelectedSubcategory] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [itemsModalVisible, setItemsModalVisible] = useState(false);
//   const slideAnim = useRef(new Animated.Value(height)).current;
//   const fadeAnim = useRef(new Animated.Value(0)).current;


//   const handleCategorySelect = (category) => {
//     setSelectedCategory(category);
//     setModalVisible(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeModal = () => {
//     Animated.timing(slideAnim, {
//       toValue: height,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => {
//       setModalVisible(false);
//       setSelectedSubcategory(null);
//     });
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const handleSubcategorySelect = (subcategory) => {
//     setSelectedSubcategory(subcategory);
//     setModalVisible(false);
//     setItemsModalVisible(true);
//   };

//   const handleViewAll = () => {
//     setSelectedSubcategory(null);
//     setModalVisible(false);
//     setItemsModalVisible(true);
//   };

//   const closeItemsModal = () => {
//     setItemsModalVisible(false);
//   };

//   if (!loaded && !error) {
//     return null;
//   }

//   const testData = [
//     {
//       "id": 1,
//       "title": "Servis veš mašine",
//       "subcategory": {
//         "title": "Popravka bubnja"
//       },
//       "price": 3500,
//       "rating": 4.7,
//       "reviews": 122,
//       "banner": "https://images.unsplash.com/photo-1631241470625-8c3cb167ef06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "category": {
//         "title": "Aparati",
//         "icon": "aparati.png",
//         "color": "#4ade80"
//       }
//     },
//     {
//       "id": 2,
//       "title": "Servis frižidera",
//       "subcategory": {
//         "title": "Zamena termostata"
//       },
//       "price": 4200,
//       "rating": 4.6,
//       "reviews": 98,
//       "banner": "https://images.unsplash.com/photo-1719642357460-d0f611ebc108?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "category": {
//         "title": "Aparati",
//         "icon": "aparati.png",
//         "color": "#4ade80"
//       }
//     },
//     {
//       "id": 3,
//       "title": "Popravka rerne",
//       "subcategory": {
//         "title": "Električni kvar"
//       },
//       "price": 3900,
//       "rating": 4.8,
//       "reviews": 110,
//       "banner": "https://images.unsplash.com/photo-1584269600519-112d071b35e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "category": {
//         "title": "Aparati",
//         "icon": "aparati.png",
//         "color": "#4ade80"
//       }
//     },
//     {
//       "id": 4,
//       "title": "Servis mikrotalasne",
//       "subcategory": {
//         "title": "Zamena grejača"
//       },
//       "price": 3000,
//       "rating": 4.5,
//       "reviews": 87,
//       "banner": "https://images.unsplash.com/photo-1740672575639-ad901a4db4b5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "category": {
//         "title": "Aparati",
//         "icon": "aparati.png",
//         "color": "#4ade80"
//       }
//     },
//     {
//       "id": 5,
//       "title": "Servis usisivača",
//       "subcategory": {
//         "title": "Zamena motora"
//       },
//       "price": 2500,
//       "rating": 4.4,
//       "reviews": 76,
//       "banner": "https://plus.unsplash.com/premium_photo-1678118776730-69c211336de1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//       "category": {
//         "title": "Aparati",
//         "icon": "aparati.png",
//         "color": "#4ade80"
//       }
//     }
//   ]
  


//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={[ tw`px-5` ]}>
//          <Text style={[tw`text-xl mb-6`, { fontFamily: 'Mont-Bold' }]}>Kategorije</Text>
//          <View style={[tw`flex flex-row flex-wrap rounded-3xl border border-gray-200 overflow-hidden bg-white shadow-lg`]}>
//            {categories && categories.length > 0 ? categories.map((category) => (
//              <TouchableOpacity 
//                key={category.id} 
//                style={[tw`w-1/4 flex items-center justify-center gap-3 border border-gray-100 py-6`]}
//                onPress={() => handleCategorySelect(category)}
//              >
//                <Image 
//                  source={{ uri: category.image }} 
//                  style={tw`w-12 h-12 rounded-full`}
//                  resizeMode="cover"
//                />
//                <Text style={[tw`text-[13px] text-center px-2`, { fontFamily: 'Mont-Medium' }]}>{category.title}</Text>
//              </TouchableOpacity>
//            )) : (
//              <View style={tw`w-full py-8 items-center`}>
//                <Text style={[tw`text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
//                  Nema dostupnih kategorija
//                </Text>
//              </View>
//            )}
//          </View>
//       </View>

//       {/* Subcategories Modal */}
//       <Modal
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={closeModal}
//         animationType="fade"
//       >
//         <View style={[tw`flex-1 justify-end`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
//           <Pressable 
//             style={[tw`absolute inset-0`]} 
//             onPress={closeModal}
//           />
//           <Animated.View 
//             style={[
//               tw`bg-white rounded-t-3xl overflow-hidden`,
//               { 
//                 transform: [{ translateY: slideAnim }],
//                 shadowColor: "#000",
//                 shadowOffset: { width: 0, height: -10 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 10,
//                 elevation: 20
//               }
//             ]}
//           >
//             {selectedCategory && (
//               <View style={[ tw`max-h-[600px]` ]}>
//                 <View style={[tw`px-8 pt-10 pb-6 flex flex-row justify-between items-center border-b border-gray-100`]}>
//                   <View style={tw`flex-row items-center`}>
//                     <View style={[
//                       tw`h-14 w-14 rounded-full mr-5 flex items-center justify-center bg-gray-100`
//                     ]}>
//                       <Ionicons name={selectedCategory.icon} size={28} color="#4ade80" />
//                     </View>
//                     <Text style={[tw`text-2xl`, { fontFamily: 'Mont-SemiBold' }]}>
//                       {selectedCategory.title}
//                     </Text>
//                   </View>
//                   <TouchableOpacity onPress={closeModal}>
//                     <Ionicons name="close" size={26} color="#999" />
//                   </TouchableOpacity>
//                 </View>

//                 <ScrollView style={tw`px-8 pb-12`}>
//                   <TouchableOpacity 
//                     style={[tw`bg-green-500 py-5 px-8 rounded-3xl mb-8 flex items-center flex-row justify-center`]}
//                     onPress={handleViewAll}
//                   >
//                     <Text style={[tw`text-white font-medium mr-3`, { fontFamily: 'Mont-SemiBold' }]}>
//                       Pogledaj sve
//                     </Text>
//                     <Ionicons name="chevron-forward" size={22} color="white" />
//                   </TouchableOpacity>

//                   <Text style={[tw`text-lg mb-6 text-gray-500`, { fontFamily: 'Mont-Medium' }]}>
//                     Odaberite podkategoriju
//                   </Text>

//                   <View style={tw`rounded-3xl overflow-hidden shadow-lg border border-gray-100`}>
//                     {selectedCategory.subcategories && selectedCategory.subcategories.length > 0 ? selectedCategory.subcategories.map((subcategory, index) => (
//                       <TouchableOpacity 
//                         key={subcategory.id}
//                         style={[
//                           tw`py-5 px-6 flex flex-row justify-between items-center bg-white`,
//                           index !== selectedCategory.subcategories.length - 1 && tw`border-b border-gray-100`
//                         ]}
//                         onPress={() => handleSubcategorySelect(subcategory)}
//                       >
//                         <Text style={[tw`text-lg`, { fontFamily: 'Mont-Medium' }]}>{subcategory.title}</Text>
//                         <View style={[tw`h-10 w-10 rounded-full bg-green-50 flex items-center justify-center`]}>
//                           <Ionicons name="chevron-forward" size={18} color="#4ade80" />
//                         </View>
//                       </TouchableOpacity>
//                     )) : (
//                       <View style={tw`py-8 items-center`}>
//                         <Text style={[tw`text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
//                           Nema podkategorija
//                         </Text>
//                       </View>
//                     )}
//                   </View>
//                 </ScrollView>
//               </View>
//             )}
//           </Animated.View>
//         </View>
//       </Modal>

//       {/* Items Modal */}
//       <Modal
//         transparent={true}
//         visible={itemsModalVisible}
//         onRequestClose={closeItemsModal}
//         animationType="slide"
//       >
//         <SafeAreaView style={tw`flex-1 bg-white`}>
//           <View style={tw`px-6 pt-6 pb-4 flex-row items-center justify-between border-b border-gray-100`}>
//             <TouchableOpacity onPress={closeItemsModal} style={tw`p-3`}>
//               <Ionicons name="arrow-back" size={26} color="#4ade80" />
//             </TouchableOpacity>
//             <View style={tw`flex-row items-center`}>
//               <View style={[
//                 tw`h-10 w-10 rounded-full mr-3 flex items-center justify-center bg-gray-100`,
//               ]}>
//                 {selectedCategory && <Ionicons name={selectedCategory.icon} size={18} color="#4ade80" />}
//               </View>
//               <View>
//                 <Text style={[tw`text-base text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
//                   {selectedCategory ? selectedCategory.title : 'Kategorija'}
//                 </Text>
//                 <Text style={[tw`text-lg`, { fontFamily: 'Mont-SemiBold' }]}>
//                   {selectedSubcategory ? selectedSubcategory.title : 'Sve usluge'}
//                 </Text>
//               </View>
//             </View>
//             <View style={tw`w-12`}></View>
//           </View>

//           <ScrollView style={tw`flex-1`}>
//             <View style={tw`p-6`}>
//               {/* Filter options */}
//               {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
//                 <View style={tw`flex-row`}>
//                   <TouchableOpacity style={[tw`bg-green-500 px-4 py-2 rounded-full mr-2 flex-row items-center`]}>
//                     <Feather name="filter" size={14} color="white" />
//                     <Text style={[tw`text-white ml-1`, { fontFamily: 'Mont-Medium' }]}>Filters</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={[tw`bg-white border border-gray-200 px-4 py-2 rounded-full mr-2`]}>
//                     <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Medium' }]}>Top Rated</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={[tw`bg-white border border-gray-200 px-4 py-2 rounded-full mr-2`]}>
//                     <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Medium' }]}>Best Deals</Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity style={[tw`bg-white border border-gray-200 px-4 py-2 rounded-full mr-2`]}>
//                     <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Medium' }]}>Popular</Text>
//                   </TouchableOpacity>
//                 </View>
//               </ScrollView> */}

//               {/* <FlatList
//                 data={testData}
//                 keyExtractor={(item) => item.id.toString()}
//                 renderItem={({ item }) => (
//                   <TestCard
//                     item={item.id}
//                     selectedCategory={item.category}
//                     selectedSubcategory={item.subcategory}
//                     navigation={navigation}
//                     closeItemsModal={closeItemsModal}
//                   />
//                 )}
//               /> */}

//               {testData && testData.length > 0 ? testData.map((item) => (
//                 <CategoryCard
//                     key={item.id}
//                     category={{
//                       id: item.id,
//                       name: item.title,
//                       description: item.subcategory?.title || 'Usluga',
//                       icon: 'construct-outline',
//                       color: '#4ade80',
//                       serviceCount: 1
//                     }}
//                     onPress={() => {
//                       closeItemsModal();
//                       navigation.navigate('Worker', { workerId: item.id });
//                     }}
//                   />
//               )) : (
//                 <View style={tw`py-8 items-center`}>
//                   <Text style={[tw`text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
//                     Nema dostupnih usluga
//                   </Text>
//                 </View>
//               )}
//             </View>
//           </ScrollView>
//         </SafeAreaView>
//       </Modal>

//       <StatusBar style="auto" />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFFFFF",
//     marginBottom: 24
//   },
// });

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
import { useNavigation } from "@react-navigation/native";
import CategoryCard from "./CategoryCard";

const { width, height } = Dimensions.get("window");

export default function Categories({ categories = [] }) {

  const navigation = useNavigation();

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

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemsModalVisible, setItemsModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(height)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;


  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setModalVisible(false);
      setSelectedSubcategory(null);
    });
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setModalVisible(false);
    setItemsModalVisible(true);
  };

  const handleViewAll = () => {
    setSelectedSubcategory(null);
    setModalVisible(false);
    setItemsModalVisible(true);
  };

  const closeItemsModal = () => {
    setItemsModalVisible(false);
  };

  if (!loaded && !error) {
    return null;
  }

  const testData = [
    {
      "id": 1,
      "title": "Servis veš mašine",
      "subcategory": {
        "title": "Popravka bubnja"
      },
      "price": 3500,
      "rating": 4.7,
      "reviews": 122,
      "banner": "https://images.unsplash.com/photo-1631241470625-8c3cb167ef06?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "category": {
        "title": "Aparati",
        "icon": "aparati.png",
        "color": "#3B82F6"
      }
    },
    {
      "id": 2,
      "title": "Servis frižidera",
      "subcategory": {
        "title": "Zamena termostata"
      },
      "price": 4200,
      "rating": 4.6,
      "reviews": 98,
      "banner": "https://images.unsplash.com/photo-1719642357460-d0f611ebc108?q=80&w=2014&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "category": {
        "title": "Aparati",
        "icon": "aparati.png",
        "color": "#3B82F6"
      }
    },
    {
      "id": 3,
      "title": "Popravka rerne",
      "subcategory": {
        "title": "Električni kvar"
      },
      "price": 3900,
      "rating": 4.8,
      "reviews": 110,
      "banner": "https://images.unsplash.com/photo-1584269600519-112d071b35e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "category": {
        "title": "Aparati",
        "icon": "aparati.png",
        "color": "#3B82F6"
      }
    },
    {
      "id": 4,
      "title": "Servis mikrotalasne",
      "subcategory": {
        "title": "Zamena grejača"
      },
      "price": 3000,
      "rating": 4.5,
      "reviews": 87,
      "banner": "https://images.unsplash.com/photo-1740672575639-ad901a4db4b5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "category": {
        "title": "Aparati",
        "icon": "aparati.png",
        "color": "#3B82F6"
      }
    },
    {
      "id": 5,
      "title": "Servis usisivača",
      "subcategory": {
        "title": "Zamena motora"
      },
      "price": 2500,
      "rating": 4.4,
      "reviews": 76,
      "banner": "https://plus.unsplash.com/premium_photo-1678118776730-69c211336de1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "category": {
        "title": "Aparati",
        "icon": "aparati.png",
        "color": "#3B82F6"
      }
    }
  ]



  return (
    <SafeAreaView style={styles.container}>
      <View style={[tw`px-3`]}>
        <Text style={[tw`text-xl mb-4`, { fontFamily: 'Mont-Bold' }]}>Kategorije</Text>
        <View style={[tw`flex flex-row flex-wrap rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm`]}>
          {categories && categories.length > 0 ? categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[tw`w-1/3 flex items-center justify-center gap-2 border border-gray-100 py-4`]}
              onPress={() => handleCategorySelect(category)}
            >
              <Image
                style={[tw`h-12 w-12`]}
                source={{ uri: category.icon ? `https://backend.davidtesla.online/uploads/${category.icon}` : 'https://via.placeholder.com/48x48?text=?' }}
              />
              <Text style={[tw`text-[12px] text-center px-1`, { fontFamily: 'Mont-Medium' }]}>{category.title}</Text>
            </TouchableOpacity>
          )) : (
            <View style={tw`w-full py-8 items-center`}>
              <Text style={[tw`text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
                Nema dostupnih kategorija
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Subcategories Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="fade"
      >
        <View style={[tw`flex-1 justify-end`, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <Pressable
            style={[tw`absolute inset-0`]}
            onPress={closeModal}
          />
          <Animated.View
            style={[
              tw`bg-white rounded-t-3xl overflow-hidden`,
              {
                transform: [{ translateY: slideAnim }],
                shadowColor: "#000",
                shadowOffset: { width: 0, height: -10 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 20
              }
            ]}
          >
            {selectedCategory && (
              <View style={[tw`max-h-[600px]`]}>
                <View style={[tw`px-6 pt-8 pb-4 flex flex-row justify-between items-center border-b border-gray-100`]}>
                  <View style={tw`flex-row items-center`}>
                    <View style={[
                      tw`h-12 w-12 rounded-full mr-4 flex items-center justify-center bg-gray-100`
                    ]}>
                      <Image
                        style={[tw`h-6 w-6`]}
                        source={{ uri: selectedCategory.icon ? `https://backend.davidtesla.online/uploads/${selectedCategory.icon}` : 'https://via.placeholder.com/24x24?text=?' }}
                      />
                    </View>
                    <Text style={[tw`text-xl`, { fontFamily: 'Mont-SemiBold' }]}>
                      {selectedCategory.title}
                    </Text>
                  </View>
                  <TouchableOpacity onPress={closeModal}>
                    <AntDesign name="close" size={24} color="#999" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={tw`p-6 mb-10`}>
                  <TouchableOpacity
                    style={[tw`bg-blue-500 py-4 px-6 rounded-2xl mb-6 flex items-center flex-row justify-center`]}
                    onPress={handleViewAll}
                  >
                    <Text style={[tw`text-white font-medium mr-2`, { fontFamily: 'Mont-SemiBold' }]}>
                      Pogledaj sve
                    </Text>
                    <AntDesign name="arrowright" size={20} color="white" />
                  </TouchableOpacity>

                  <Text style={[tw`text-base mb-4 text-gray-500`, { fontFamily: 'Mont-Medium' }]}>
                    Odaberite podkategoriju
                  </Text>

                  <View style={tw`rounded-2xl overflow-hidden shadow-sm border border-gray-100`}>
                    {selectedCategory.subcategories && selectedCategory.subcategories.length > 0 ? selectedCategory.subcategories.map((subcategory, index) => (
                      <TouchableOpacity
                        key={subcategory.id}
                        style={[
                          tw`py-4 px-5 flex flex-row justify-between items-center bg-white`,
                          index !== selectedCategory.subcategories.length - 1 && tw`border-b border-gray-100`
                        ]}
                        onPress={() => handleSubcategorySelect(subcategory)}
                      >
                        <Text style={[tw`text-base`, { fontFamily: 'Mont-Medium' }]}>{subcategory.title}</Text>
                        <View style={[tw`h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center`]}>
                          <AntDesign name="right" size={16} color="#3B82F6" />
                        </View>
                      </TouchableOpacity>
                    )) : (
                      <View style={tw`py-8 items-center`}>
                        <Text style={[tw`text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
                          Nema podkategorija
                        </Text>
                      </View>
                    )}
                  </View>
                </ScrollView>
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>

      {/* Items Modal */}
      <Modal
        transparent={true}
        visible={itemsModalVisible}
        onRequestClose={closeItemsModal}
        animationType="slide"
      >
        <SafeAreaView style={tw`flex-1 bg-white`}>
          <View style={tw`px-4 pt-4 pb-2 flex-row items-center justify-between border-b border-gray-100`}>
            <TouchableOpacity onPress={closeItemsModal} style={tw`p-2`}>
              <AntDesign name="arrowleft" size={24} color="#3B82F6" />
            </TouchableOpacity>
            <View style={tw`flex-row items-center`}>
              <View style={[
                tw`h-8 w-8 rounded-full mr-2 flex items-center justify-center bg-gray-100`,
              ]}>
                {selectedCategory && <Image
                  style={[tw`h-4 w-4`]}
                  source={{ uri: selectedCategory.icon ? `https://backend.davidtesla.online/uploads/${selectedCategory.icon}` : 'https://via.placeholder.com/16x16?text=?' }}
                />}
              </View>
              <View>
                <Text style={[tw`text-sm text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
                  {selectedCategory && selectedCategory.title}
                </Text>
                <Text style={[tw`text-base`, { fontFamily: 'Mont-SemiBold' }]}>
                  {selectedSubcategory ? selectedSubcategory.title : 'Sve'}
                </Text>
              </View>
            </View>
            <View style={tw`w-10`}></View>
          </View>

          <ScrollView style={tw`flex-1`}>
            <View style={tw`p-4`}>
              {/* Filter options */}
              {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mb-4`}>
                <View style={tw`flex-row`}>
                  <TouchableOpacity style={[tw`bg-blue-500 px-4 py-2 rounded-full mr-2 flex-row items-center`]}>
                    <Feather name="filter" size={14} color="white" />
                    <Text style={[tw`text-white ml-1`, { fontFamily: 'Mont-Medium' }]}>Filters</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[tw`bg-white border border-gray-200 px-4 py-2 rounded-full mr-2`]}>
                    <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Medium' }]}>Top Rated</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[tw`bg-white border border-gray-200 px-4 py-2 rounded-full mr-2`]}>
                    <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Medium' }]}>Best Deals</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[tw`bg-white border border-gray-200 px-4 py-2 rounded-full mr-2`]}>
                    <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Medium' }]}>Popular</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView> */}

              {/* <FlatList
                data={testData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TestCard
                    item={item.id}
                    selectedCategory={item.category}
                    selectedSubcategory={item.subcategory}
                    navigation={navigation}
                    closeItemsModal={closeItemsModal}
                  />
                )}
              /> */}

              {testData.map((item) => (
                <CategoryCard
                  key={item.id}
                  category={{
                    id: item.id,
                    name: item.title,
                    description: item.subcategory?.title || 'Usluga',
                    icon: 'construct-outline',
                    color: '#3B82F6',
                    serviceCount: 1
                  }}
                  onPress={() => {
                    closeItemsModal();
                    navigation.navigate('Worker', { workerId: item.id });
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginBottom: 20
  },
});