import { StatusBar } from "expo-status-bar";
import {
  Image,
  Modal,
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
import { useEffect, useState } from "react";
import Divider from "../components/Divider";
import { useAuth } from "../context/AuthContext";

const bookings = [
  {
    id: 1,
    customerId: 101,
    workerId: {
      avatar: require("../assets/icon.png"),
      fullName: "David Obradovic",
      rating: {
        rating: 4.7,
        ratings: 190,
      },
    },
    location: 301,
    phoneNumber: "+1234567890",
    phoneLocation: "+1987654321",
    orderType: "online",
    description: "Usluga čišćenja za stan 45B",
    notes: "Musterija preferira ekološke proizvode",
    paid: true,
    paidType: "online",
    status: "accepted",
    dueDate: "2025-05-08T10:00:00Z",
    createdAt: "2025-05-06T09:30:00Z",
    totalPrice: 15000,
  },
  {
    id: 2,
    customerId: 102,
    workerId: {
      avatar: require("../assets/icon.png"),
      fullName: "Ognjen Ogi",
      rating: {
        rating: 4.7,
        ratings: 190,
      },
    },
    location: 302,
    phoneNumber: "+1098765432",
    phoneLocation: "+1123456789",
    orderType: "sms",
    description: "Popravka sudopere u kuhinji",
    notes: "Hitno",
    paid: false,
    paidType: "cash",
    status: "requested",
    dueDate: "2025-05-09T14:00:00Z",
    createdAt: "2025-05-06T11:15:00Z",
    totalPrice: 15000,
  },
  {
    id: 3,
    customerId: 103,
    workerId: {
      avatar: require("../assets/icon.png"),
      fullName: "Elon Musk",
      rating: {
        rating: 4.7,
        ratings: 190,
      },
    },
    location: 303,
    phoneNumber: "+14151234567",
    phoneLocation: "+14159876543",
    orderType: "online",
    description: "Krečenje zidova u kancelariji",
    notes: "",
    paid: true,
    paidType: "card",
    status: "inProgress",
    dueDate: "2025-05-10T09:00:00Z",
    createdAt: "2025-05-06T13:45:00Z",
    totalPrice: 15000,
  },
  {
    id: 4,
    customerId: 104,
    workerId: {
      avatar: require("../assets/icon.png"),
      fullName: "Marko Markovic",
      rating: {
        rating: 4.7,
        ratings: 190,
      },
    },
    location: 304,
    phoneNumber: "+447911123456",
    phoneLocation: "+447911654321",
    orderType: "sms",
    description: "Elektro instalacija u novoj kući",
    notes: "Poneti dodatne produžne kablove",
    paid: false,
    paidType: "cash",
    status: "cancelled",
    dueDate: "2025-05-11T12:00:00Z",
    createdAt: "2025-05-06T14:20:00Z",
    totalPrice: 15000,
  },
  {
    id: 5,
    customerId: 105,
    workerId: {
      avatar: require("../assets/icon.png"),
      fullName: "Petar Kocic",
      rating: {
        rating: 4.7,
        ratings: 190,
      },
    },
    location: 305,
    phoneNumber: "+61234567890",
    phoneLocation: "+61987654321",
    orderType: "online",
    description: "Montaža nameštaja za dnevnu sobu",
    notes: "Musterija ima IKEA nameštaj",
    paid: true,
    paidType: "online",
    status: "completed",
    dueDate: "2025-05-07T16:30:00Z",
    createdAt: "2025-05-06T10:00:00Z",
    totalPrice: 15000,
  },
];



export default function BookingScreen() {
  const [selectedType, setSelectedType] = useState("all");
  const { statusFormatter } = useAuth();
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [selectedReservationModal, setSelectedReservationModal] =
    useState(null);
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

  const showBookingItem = (id) => {
    if (selectedReservation === id) {
      setSelectedReservation(null);
    }
    setSelectedReservation(id);
    setSelectedReservationModal(!selectedReservationModal);
  };

  const choosenBooking = selectedReservation
    ? bookings.find((booking) => booking.id === selectedReservation)
    : null;

  return (
    <View style={[tw`flex-1 bg-white`]}>
      <SafeAreaView style={[tw`flex-1`]}>
        {/* Booking selection */}
        <View
          style={[
            tw`flex flex-row items-center gap-1 bg-gray-100 rounded-xl mx-4 p-1`,
          ]}
        >
          <TouchableOpacity
            onPress={() => setSelectedType("all")}
            style={[
              tw`flex-1 rounded-xl flex items-center justify-center p-4 ${
                selectedType === "all" ? "bg-blue-500" : null
              }`,
            ]}
          >
            <Text
              style={[
                tw`${selectedType === "all" ? "text-white" : null}`,
                { fontFamily: "Mont-Bold", fontSize: 11 },
              ]}
            >
              Sve
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType("requested")}
            style={[
              tw`flex-1 rounded-xl flex items-center justify-center p-4 ${
                selectedType === "requested" ? "bg-orange-500" : null
              }`,
            ]}
          >
            <Text
              style={[
                tw`${selectedType === "requested" ? "text-white" : null}`,
                { fontFamily: "Mont-Bold", fontSize: 11 },
              ]}
            >
              Aktivno
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType("completed")}
            style={[
              tw`flex-1 rounded-xl flex items-center justify-center p-4 ${
                selectedType === "completed" ? "bg-green-500" : null
              }`,
            ]}
          >
            <Text
              style={[
                tw`${selectedType === "completed" ? "text-white" : null}`,
                { fontFamily: "Mont-Bold", fontSize: 11 },
              ]}
            >
              Uspešno
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedType("cancelled")}
            style={[
              tw`flex-1 rounded-xl flex items-center justify-center p-4 ${
                selectedType === "cancelled" ? "bg-red-600" : null
              }`,
            ]}
          >
            <Text
              style={[
                tw`${selectedType === "cancelled" ? "text-white" : null}`,
                { fontFamily: "Mont-Bold", fontSize: 11 },
              ]}
            >
              Otkazano
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={[tw`flex-1`]}>
          <View style={[tw`mx-4 flex gap-3 mt-4 pb-4`]}>
            {bookings
              .filter((booking) => {
                if (selectedType !== "all") {
                  return booking.status === selectedType;
                }
                return true;
              })
              .map((booking) => {
                return (
                  <TouchableOpacity
                    onPress={() => showBookingItem(booking.id)}
                    key={booking.id}
                    style={[tw`border border-gray-100 p-3 rounded-2xl`]}
                  >
                    <View
                      style={[tw`flex flex-row items-center justify-between`]}
                    >
                      <Text style={[tw`text-blue-500`]}>#{booking.id}</Text>
                      <View
                        style={[
                          tw`bg-[${
                            statusFormatter(booking.status).color
                          }] px-3 py-2 rounded-xl`,
                        ]}
                      >
                        <Text style={[tw`text-white text-xs capitalize`]}>
                          {statusFormatter(booking.status).text}
                        </Text>
                      </View>
                    </View>
                    <View style={[tw`mt-1 pb-3 border-b border-b-gray-100`]}>
                      <Text style={[tw``, { fontFamily: "Mont-SemiBold" }]}>
                        {booking.description}
                      </Text>
                    </View>
                    <View>
                      <View style={[tw`mt-3`]}>
                        <View style={[tw`flex flex-row items-center gap-3`]}>
                          <Image
                            style={[
                              tw`w-[10] h-[10] border border-gray-200`,
                              { borderRadius: 60 },
                            ]}
                            source={booking.workerId.avatar}
                          />
                          <View>
                            <Text
                              style={[
                                tw`text-base`,
                                { fontFamily: "Mont-Bold" },
                              ]}
                            >
                              {booking.workerId.fullName}
                            </Text>
                            <View
                              style={[tw`flex flex-row items-center gap-2`]}
                            >
                              <View
                                style={[tw`flex flex-row items-center gap-1`]}
                              >
                                <AntDesign
                                  name="star"
                                  color="#f0ad4f"
                                  size={16}
                                />
                                <Text
                                  style={[
                                    tw`text-[#f0ad4f]`,
                                    { fontFamily: "Mont-Bold" },
                                  ]}
                                >
                                  {booking.workerId.rating.rating}
                                </Text>
                              </View>
                              <Text
                                style={[tw``, { fontFamily: "Mont-Medium" }]}
                              >
                                {booking.workerId.rating.ratings} Ocenjivanja
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>
        </ScrollView>
      </SafeAreaView>

      {selectedReservation && (
        <Modal
          transparent={true}
          visible={selectedReservationModal}
          onRequestClose={() => setSelectedReservationModal(false)}
          animationType="slide"
        >
          <SafeAreaView style={tw`flex-1 bg-white`}>
            <ScrollView style={[tw`flex-1`]}>
              <View
                style={[
                  tw`mx-4 mt-2 flex flex-row items-center justify-between`,
                ]}
              >
                <View style={[ tw`flex flex-row items-center gap-3` ]}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedReservation(null);
                      setSelectedReservationModal(null);
                    }}
                    style={[tw`p-3 rounded-full bg-gray-100`]}
                  >
                    <IonIcons name="chevron-back" size={24} />
                  </TouchableOpacity>
                  <Text
                    style={[
                      tw`text-2xl text-blue-500`,
                      { fontFamily: "Mont-Bold" },
                    ]}
                  >
                    #{choosenBooking.id}
                  </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                      setSelectedReservation(null);
                      setSelectedReservationModal(null);
                    }}
                    style={[tw`p-3 rounded-full bg-gray-100`]}
                  >
                    <IonIcons name="mail" style={[tw`text-green-500`]} size={23} />
                  </TouchableOpacity>
              </View>
              <Divider />
              <View style={[tw`mx-4 border border-gray-100 p-3 rounded-2xl`]}>
                <View style={[tw`flex flex-row items-center justify-between`]}>
                  <Text style={[tw`text-blue-500`]}>#{choosenBooking.id}</Text>
                  <View
                    style={[
                      tw`bg-[${
                        statusFormatter(choosenBooking.status).color
                      }] px-3 py-2 rounded-xl`,
                    ]}
                  >
                    <Text style={[tw`text-white text-xs capitalize`]}>
                      {statusFormatter(choosenBooking.status).text}
                    </Text>
                  </View>
                </View>
                <View style={[tw`mt-1 pb-3 border-b border-b-gray-100`]}>
                  <Text style={[tw``, { fontFamily: "Mont-SemiBold" }]}>
                    {choosenBooking.description}
                  </Text>
                </View>
                <View>
                  <View style={[tw`mt-3`]}>
                    <View style={[tw`flex flex-row items-center gap-3`]}>
                      <Image
                        style={[
                          tw`w-[10] h-[10] border border-gray-200`,
                          { borderRadius: 60 },
                        ]}
                        source={choosenBooking.workerId.avatar}
                      />
                      <View>
                        <Text
                          style={[tw`text-base`, { fontFamily: "Mont-Bold" }]}
                        >
                          {choosenBooking.workerId.fullName}
                        </Text>
                        <View style={[tw`flex flex-row items-center gap-2`]}>
                          <View style={[tw`flex flex-row items-center gap-1`]}>
                            <AntDesign name="star" color="#f0ad4f" size={16} />
                            <Text
                              style={[
                                tw`text-[#f0ad4f]`,
                                { fontFamily: "Mont-Bold" },
                              ]}
                            >
                              {choosenBooking.workerId.rating.rating}
                            </Text>
                          </View>
                          <Text style={[tw``, { fontFamily: "Mont-Medium" }]}>
                            {choosenBooking.workerId.rating.ratings} Ocenjivanja
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={[
                  tw`mx-4 mt-4 border border-dashed bg-red-50 border-red-500 p-3 rounded-2xl`,
                ]}
              >
                <Text
                  style={[tw`text-base mb-1`, { fontFamily: "Mont-Medium" }]}
                >
                  Politika otkazivanja
                </Text>
                <Text style={[tw`text-xs`, { fontFamily: "Mont-Regular" }]}>
                  Ako otkažete manje od 24 sata pre termina, može Vam biti
                  naplaćena naknada za otkazivanje u iznosu do pune cene
                  rezervisanih usluga. Ako je odabrano plaćanje gotovinom,
                  korišćenje usluga može biti ograničeno do potvrde uplate.
                </Text>
              </View>
              <Divider />
              <View style={[ tw`mx-4 mb-4 p-4 rounded-xl flex flex-row items-center gap-2 bg-white border border-dashed border-gray-200` ]}>
                <IonIcons name="checkmark-done-circle" size={22} style={[ tw`text-blue-500` ]} />
                <Text>Vodovod kuhinjskih prikljucaka</Text>
              </View>
              <View style={[tw`mx-4 p-4 bg-gray-100 border-2 border-dashed border-blue-500 rounded-2xl`]}>
              <Text style={[tw`text-xl mb-3`, { fontFamily: "Mont-Bold" }]}>
                Rezime narudžbine
              </Text>

              <View>
                <View
                  style={[tw`flex flex-row items-center justify-between mb-2`]}
                >
                  <Text
                    style={[tw`text-[16px]`, { fontFamily: "Mont-Medium" }]}
                  >
                    Međuzbir
                  </Text>
                  <Text
                    style={[tw`text-[16px]`, { fontFamily: "Mont-SemiBold" }]}
                  >
                    {(choosenBooking.totalPrice * 0.83).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 2 }
                    )}{" "}
                    RSD
                  </Text>
                </View>
                <View style={[tw`flex flex-row items-center justify-between`]}>
                  <Text
                    style={[tw`text-[16px]`, { fontFamily: "Mont-Medium" }]}
                  >
                    Porez (PDV)
                  </Text>
                  <Text
                    style={[tw`text-[16px]`, { fontFamily: "Mont-SemiBold" }]}
                  >
                    {(choosenBooking.totalPrice * 0.17).toLocaleString(
                      undefined,
                      { maximumFractionDigits: 2 }
                    )}{" "}
                    RSD
                  </Text>
                </View>
              </View>

              {choosenBooking.paidType === "cash" && (
                <View style={[tw`bg-yellow-100 p-3 rounded-lg mt-4`]}>
                  <Text
                    style={[tw`text-yellow-800`, { fontFamily: "Mont-Medium" }]}
                  >
                    Plaćanje gotovinom: korišćenje usluga može biti ograničeno
                    dok uplata ne bude potvrđena.
                  </Text>
                </View>
              )}

              <View style={[tw`w-full h-[0.5] bg-gray-100 my-4`]}></View>

              <TouchableOpacity
                style={[
                  tw`p-4 border-2 border-red-500 flex items-center justify-center rounded-xl`,
                ]}
              >
                <Text
                  style={[tw`text-red-500`, { fontFamily: "Mont-SemiBold" }]}
                >
                  Otkaži rezervaciju
                </Text>
              </TouchableOpacity>
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
