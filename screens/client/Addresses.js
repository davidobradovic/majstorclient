import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Feather from "react-native-vector-icons/Feather";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

const addressesData = [
  { id: 1, name: "Kalemegdan, Beograd", lat: "44.8233", long: "20.4500" },
  { id: 2, name: "Hram Svetog Save", lat: "44.7980", long: "20.4689" },
  { id: 3, name: "Muzej Nikole Tesle", lat: "44.8021", long: "20.4577" },
  { id: 4, name: "Skadarlija", lat: "44.8177", long: "20.4689" },
  { id: 5, name: "Ada Ciganlija", lat: "44.7866", long: "20.4489" },
];

const Addresses = () => {
  const [addresses, setAddresses] = useState(addressesData);
  const [modalVisible, setModalVisible] = useState(false);
  const [newAddress, setNewAddress] = useState({ name: "", lat: "", long: "" });

  const [loaded] = useFonts({
    "Mont-Bold": require("../../assets/fonts/Montserrat-Bold.ttf"),
    "Mont-SemiBold": require("../../assets/fonts/Montserrat-SemiBold.ttf"),
  });

  const navigation = useNavigation();
  if (!loaded) return null;

  const handleAddAddress = () => {
    if (newAddress.name && newAddress.lat && newAddress.long) {
      const id = addresses.length + 1;
      setAddresses([...addresses, { id, ...newAddress }]);
      setModalVisible(false);
      setNewAddress({ name: "", lat: "", long: "" });
    } else {
      alert("Molimo popunite sva polja");
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`p-5`}>
        {/* Header */}
        <View style={tw`flex flex-row items-center justify-between mb-4`}>
          <Text style={[tw`text-3xl`, { fontFamily: "Mont-Bold" }]}>Moje Lokacije</Text>
          <TouchableOpacity
            style={tw`p-3 rounded-full bg-blue-500`}
            onPress={() => setModalVisible(true)}
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Map */}
        <View style={tw`h-80 rounded-lg overflow-hidden`}>
          <MapView 
            style={tw`flex-1`}
            initialRegion={{
              latitude: 44.7866,
              longitude: 20.4489,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {addresses.map((address) => (
              <Marker
                key={address.id}
                coordinate={{
                  latitude: parseFloat(address.lat),
                  longitude: parseFloat(address.long),
                }}
                title={address.name}
                description="Sačuvana Lokacija"
              >
                <View style={tw`bg-blue-500 p-2 rounded-full flex-row items-center`}>
                  <View style={tw`bg-white p-2 rounded-full`}>
                    <Icon name="location-outline" size={16} color="#3B82F6" />
                  </View>
                  <Text style={tw`text-white text-xs ml-1`}>{address.name}</Text>
                </View>
              </Marker>
            ))}
          </MapView>
        </View>

        {/* Address list */}
        <View style={tw`mt-4 gap-3`}>
          {addresses.map((address) => (
            <TouchableOpacity key={address.id} style={tw`p-4 bg-gray-100 rounded-xl`}>
              <Text style={{ fontFamily: "Mont-SemiBold" }}>{address.name}</Text>
              <View style={tw`flex-row gap-3 mt-3`}>
                <TouchableOpacity style={tw`flex-1 p-2 rounded-full bg-blue-500 flex-row justify-center items-center`}>
                  <MaterialCommunityIcons name="map-marker-circle" size={24} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex-1 p-2 rounded-full bg-gray-200 flex-row justify-center items-center`}>
                  <Feather name="edit-2" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={tw`flex-1 p-2 rounded-full bg-red-600 flex-row justify-center items-center`}>
                  <Icon name="trash-bin-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={tw`flex-1 bg-black bg-opacity-50 justify-center items-center`}>
          <View style={tw`bg-white w-11/12 rounded-xl p-5`}>
            <Text style={[tw`text-xl mb-4`, { fontFamily: "Mont-Bold" }]}>Dodaj Novu Lokaciju</Text>
            <TextInput
              placeholder="Naziv lokacije"
              style={[tw`border border-gray-300 rounded-lg p-3 mb-3 text-black`, { fontFamily: 'Mont-Bold' }]}
              placeholderTextColor="rgba(0,0,0,0.5)"
              value={newAddress.name}
              onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
            />
            <View style={[ tw`flex flex-row gap-2 mb-3` ]}>
                <TextInput
                placeholder="Unesite adresu"
                style={[tw`border border-gray-300 rounded-lg p-3 text-black flex-1`, { fontFamily: 'Mont-Bold' }]}
                placeholderTextColor="rgba(0,0,0,0.5)"
                value={newAddress.name}
                onChangeText={(text) => setNewAddress({ ...newAddress, name: text })}
                />
                <TouchableOpacity style={[ tw`p-3 rounded-lg bg-gray-100` ]}>
                    <MaterialIcons name="gps-fixed" size={20} />
                </TouchableOpacity>
            </View>
            <View style={tw`h-40 rounded-lg overflow-hidden mb-3`}>
                <MapView 
                  style={tw`flex-1`}
                  initialRegion={{
                    latitude: 44.7866,
                    longitude: 20.4489,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                ></MapView>
            </View>
            <View style={tw`flex-row justify-end gap-3`}>
              <TouchableOpacity
                style={tw`px-4 py-2 bg-gray-200 rounded-lg`}
                onPress={() => setModalVisible(false)}
              >
                <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Bold' }]}>Otkaži</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`px-4 py-2 bg-blue-500 rounded-lg`}
                onPress={handleAddAddress}
              >
                <Text style={[tw`text-white`, { fontFamily: 'Mont-Bold' }]}>Sačuvaj</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Addresses;
