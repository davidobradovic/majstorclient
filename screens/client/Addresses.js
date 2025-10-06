import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '../../context/AuthContext';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const Addresses = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    isDefault: false
  });

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

  const cities = [
    'Novi Sad', 'Beograd', 'Niš', 'Kragujevac', 'Subotica', 'Zrenjanin', 
    'Pančevo', 'Čačak', 'Novi Pazar', 'Kraljevo', 'Leskovac', 'Užice'
  ];

  // Fake data for addresses
  const fakeAddresses = [
    {
      id: 1,
      name: 'Kuća',
      address: 'Bulevar oslobođenja 123',
      city: 'Novi Sad',
      postalCode: '21000',
      phone: '+381 60 123 4567',
      isDefault: true
    },
    {
      id: 2,
      name: 'Posao',
      address: 'Zmaj Jovina 45',
      city: 'Novi Sad',
      postalCode: '21000',
      phone: '+381 60 987 6543',
      isDefault: false
    },
    {
      id: 3,
      name: 'Vikendica',
      address: 'Futoška 78',
      city: 'Novi Sad',
      postalCode: '21000',
      phone: '+381 60 555 1234',
      isDefault: false
    }
  ];

  useEffect(() => {
    setAddresses(fakeAddresses);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      isDefault: false
    });
    setEditingAddress(null);
  };

  const handleAddAddress = () => {
    setShowAddModal(true);
    resetForm();
  };

  const handleEditAddress = (address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      address: address.address,
      city: address.city,
      postalCode: address.postalCode,
      phone: address.phone,
      isDefault: address.isDefault
    });
    setShowAddModal(true);
  };

  const handleDeleteAddress = (addressId) => {
    Alert.alert(
      'Brisanje adrese',
      'Da li ste sigurni da želite da obrišete ovu adresu?',
      [
        { text: 'Otkaži', style: 'cancel' },
        { 
          text: 'Obriši', 
          style: 'destructive',
          onPress: () => {
            setAddresses(prev => prev.filter(addr => addr.id !== addressId));
            Alert.alert('Uspešno', 'Adresa je obrisana');
          }
        }
      ]
    );
  };

  const handleSetDefault = (addressId) => {
    setAddresses(prev => 
      prev.map(addr => ({
        ...addr,
        isDefault: addr.id === addressId
      }))
    );
    Alert.alert('Uspešno', 'Podrazumevana adresa je postavljena');
  };

  const handleSubmit = () => {
    // Form validation
    if (!formData.name.trim()) {
      Alert.alert("Greška", "Molimo unesite naziv adrese");
      return;
    }

    if (!formData.address.trim()) {
      Alert.alert("Greška", "Molimo unesite adresu");
      return;
    }

    if (!formData.city) {
      Alert.alert("Greška", "Molimo odaberite grad");
      return;
    }

    if (!formData.phone.trim()) {
      Alert.alert("Greška", "Molimo unesite broj telefona");
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(prev => 
        prev.map(addr => 
          addr.id === editingAddress.id 
            ? { ...formData, id: addr.id }
            : { ...addr, isDefault: formData.isDefault ? false : addr.isDefault }
        )
      );
      Alert.alert('Uspešno', 'Adresa je ažurirana');
    } else {
      // Add new address
      const newAddress = {
        ...formData,
        id: Date.now()
      };
      
      if (formData.isDefault) {
        setAddresses(prev => 
          prev.map(addr => ({ ...addr, isDefault: false })).concat(newAddress)
        );
      } else {
        setAddresses(prev => [...prev, newAddress]);
      }
      
      Alert.alert('Uspešno', 'Nova adresa je dodana');
    }

    setShowAddModal(false);
    resetForm();
  };

  const closeModal = () => {
    setShowAddModal(false);
    resetForm();
  };

  if (!loaded && !error) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={tw`px-6 pt-4 pb-4 bg-white border-b border-gray-100 flex-row items-center`}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tw`mr-4 p-2`}
        >
          <Ionicons name="arrow-back" size={24} color="#4ade80" />
        </TouchableOpacity>
        
        <View style={tw`flex-1`}>
          <Text style={[tw`text-xl`, { fontFamily: 'Mont-Bold' }]}>
            Moje adrese
          </Text>
          <Text style={[tw`text-sm text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
            Upravljajte sačuvanim adresama
          </Text>
        </View>
      </View>

      <ScrollView style={tw`flex-1`} showsVerticalScrollIndicator={false}>
        <View style={tw`px-6 py-6`}>
          {/* Add Address Button */}
          <TouchableOpacity
                            style={tw`w-full bg-green-500 p-4 rounded-lg items-center mb-6`}
            onPress={handleAddAddress}
          >
            <View style={tw`flex-row items-center`}>
              <Ionicons name="add" size={24} color="white" style={tw`mr-2`} />
              <Text style={[tw`text-white text-lg`, { fontFamily: 'Mont-SemiBold' }]}>
                Dodaj novu adresu
              </Text>
            </View>
          </TouchableOpacity>

          {/* Addresses List */}
          {addresses.length === 0 ? (
            <View style={tw`items-center justify-center py-20`}>
              <Ionicons name="location-outline" size={64} color="#9CA3AF" />
              <Text style={[tw`text-lg text-gray-500 mt-4`, { fontFamily: 'Mont-Medium' }]}>
                Nemate sačuvanih adresa
              </Text>
              <Text style={[tw`text-gray-400 text-center mt-2 px-8`, { fontFamily: 'Mont-Regular' }]}>
                Dodajte svoju prvu adresu da biste mogli brzo da rezervišete usluge
              </Text>
            </View>
          ) : (
            <View style={tw`space-y-4`}>
              {addresses.map((address) => (
                <View key={address.id} style={tw`bg-white rounded-xl p-4 shadow-sm border border-gray-100`}>
                  {/* Header */}
                  <View style={tw`flex-row justify-between items-start mb-3`}>
                    <View style={tw`flex-1`}>
                      <View style={tw`flex-row items-center`}>
                        <Text style={[tw`text-lg`, { fontFamily: 'Mont-SemiBold' }]}>
                          {address.name}
                        </Text>
                        {address.isDefault && (
                                          <View style={tw`ml-2 bg-green-100 px-2 py-1 rounded-full`}>
                  <Text style={[tw`text-xs text-green-600`, { fontFamily: 'Mont-Medium' }]}>
                              Podrazumevano
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                    
                    <View style={tw`flex-row`}>
                      <TouchableOpacity
                        style={tw`p-2 mr-2`}
                        onPress={() => handleEditAddress(address)}
                      >
                        <Ionicons name="pencil" size={20} color="#4ade80" />
                      </TouchableOpacity>
                      
                      <TouchableOpacity
                        style={tw`p-2`}
                        onPress={() => handleDeleteAddress(address.id)}
                      >
                        <Ionicons name="trash" size={20} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Address Details */}
                  <View style={tw`space-y-2 mb-4`}>
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="location-outline" size={16} color="#6B7280" style={tw`mr-2`} />
                      <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Regular' }]}>
                        {address.address}, {address.city} {address.postalCode}
                      </Text>
                    </View>
                    
                    <View style={tw`flex-row items-center`}>
                      <Ionicons name="call-outline" size={16} color="#6B7280" style={tw`mr-2`} />
                      <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Regular' }]}>
                        {address.phone}
                      </Text>
                    </View>
                  </View>

                  {/* Actions */}
                  <View style={tw`flex-row gap-2`}>
                    {!address.isDefault && (
                      <TouchableOpacity
                        style={tw`flex-1 bg-green-500 py-2 rounded-lg items-center`}
                        onPress={() => handleSetDefault(address.id)}
                      >
                        <Text style={[tw`text-white text-xs font-bold`, { fontFamily: 'Mont-Medium' }]}>
                          Postavi kao podrazumevano
                        </Text>
                      </TouchableOpacity>
                    )}
                    
                    <TouchableOpacity
                      style={tw`px-4 bg-gray-100 py-2 rounded-lg items-center`}
                      onPress={() => Alert.alert('Info', 'Navigacija će biti dostupna uskoro')}
                    >
                      <Text style={[tw`text-gray-700`, { fontFamily: 'Mont-Medium' }]}>
                        Navigacija
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add/Edit Address Modal */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={tw`flex-1 bg-white`}>
          {/* Modal Header */}
          <View style={tw`px-6 pt-4 pb-4 border-b border-gray-100 flex-row items-center`}>
            <TouchableOpacity onPress={closeModal} style={tw`mr-4 p-2`}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
            
            <Text style={[tw`text-xl`, { fontFamily: 'Mont-Bold' }]}>
              {editingAddress ? 'Izmeni adresu' : 'Dodaj novu adresu'}
            </Text>
          </View>

          <ScrollView style={tw`flex-1 px-6 py-6`} showsVerticalScrollIndicator={false}>
            <View style={tw`space-y-6`}>
              {/* Address Name */}
              <View>
                <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                  Naziv adrese *
                </Text>
                <TextInput
                  style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                  placeholder="Kuća, Posao, Vikendica..."
                  value={formData.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                />
              </View>

              {/* Street Address */}
              <View>
                <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                  Ulica i broj *
                </Text>
                <TextInput
                  style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                  placeholder="Bulevar oslobođenja 123"
                  value={formData.address}
                  onChangeText={(value) => handleInputChange('address', value)}
                />
              </View>

              {/* City */}
              <View>
                <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                  Grad *
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {cities.map((city) => (
                    <TouchableOpacity
                      key={city}
                      style={[
                        tw`px-4 py-3 rounded-full mr-3`,
                        formData.city === city ? tw`bg-green-500` : tw`bg-gray-100`
                      ]}
                      onPress={() => handleInputChange('city', city)}
                    >
                      <Text style={[
                        tw`text-sm`,
                        formData.city === city ? tw`text-white` : tw`text-gray-700`,
                        { fontFamily: 'Mont-Medium' }
                      ]}>
                        {city}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Postal Code */}
              <View>
                <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                  Poštanski broj
                </Text>
                <TextInput
                  style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                  placeholder="21000"
                  keyboardType="numeric"
                  value={formData.postalCode}
                  onChangeText={(value) => handleInputChange('postalCode', value)}
                />
              </View>

              {/* Phone */}
              <View>
                <Text style={[tw`text-sm text-gray-700 mb-2`, { fontFamily: 'Mont-Medium' }]}>
                  Broj telefona *
                </Text>
                <TextInput
                  style={[tw`w-full p-4 bg-gray-100 rounded-lg border border-gray-300`, { fontFamily: 'Mont-Regular' }]}
                  placeholder="+381 60 123 4567"
                  keyboardType="phone-pad"
                  value={formData.phone}
                  onChangeText={(value) => handleInputChange('phone', value)}
                />
              </View>

              {/* Default Address Toggle */}
              <View style={tw`flex-row items-center justify-between`}>
                <View style={tw`flex-1`}>
                  <Text style={[tw`text-base`, { fontFamily: 'Mont-Medium' }]}>
                    Postavi kao podrazumevanu adresu
                  </Text>
                  <Text style={[tw`text-sm text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
                    Ova adresa će biti automatski odabrana prilikom rezervacije
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={[
                    tw`w-12 h-6 rounded-full p-1`,
                    formData.isDefault ? tw`bg-green-500` : tw`bg-gray-300`
                  ]}
                  onPress={() => handleInputChange('isDefault', !formData.isDefault)}
                >
                  <View style={[
                    tw`w-4 h-4 rounded-full bg-white`,
                    formData.isDefault ? tw`ml-5` : tw`ml-0`
                  ]} />
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={tw`w-full bg-green-500 py-4 rounded-lg items-center mt-6`}
                onPress={handleSubmit}
              >
                <Text style={[tw`text-white text-lg`, { fontFamily: 'Mont-SemiBold' }]}>
                  {editingAddress ? 'Ažuriraj adresu' : 'Dodaj adresu'}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});

export default Addresses;
