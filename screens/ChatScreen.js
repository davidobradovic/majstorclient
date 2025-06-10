import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  Send,
  Mic,
  Image,
  Smile,
  MoreVertical,
  ArrowLeft,
  Phone,
  Video,
} from "lucide-react-native";
import twrnc from "twrnc";
import { useFonts } from "expo-font";

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    { id: "1", text: "Hello there!", sender: "other", timestamp: "10:01 AM" },
    {
      id: "2",
      text: "Hi! How are you doing today?",
      sender: "me",
      timestamp: "10:02 AM",
    },
    {
      id: "3",
      text: "I'm doing great, thanks for asking! How about you?",
      sender: "other",
      timestamp: "10:03 AM",
    },
    {
      id: "4",
      text: "Pretty good as well. I was wondering if you wanted to grab lunch later this week?",
      sender: "me",
      timestamp: "10:05 AM",
    },
    {
      id: "5",
      text: "That sounds lovely! How about Thursday at noon?",
      sender: "other",
      timestamp: "10:06 AM",
    },
  ]);

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

  const flatListRef = useRef(null);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "me",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const renderMessage = ({ item }) => (
    <View
      style={twrnc`${
        item.sender === "me"
          ? "ml-12 bg-blue-500 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl"
          : "mr-12 bg-gray-100 rounded-tr-2xl rounded-br-2xl rounded-tl-2xl"
      } px-4 py-3 my-1`}
    >
      <Text
        style={[twrnc`${
          item.sender === "me" ? "text-white" : "text-gray-800"
        } text-base`, { fontFamily: 'Mont-Medium' }]}
      >
        {item.text}
      </Text>
      <Text
        style={[twrnc`${
          item.sender === "me" ? "text-blue-100" : "text-gray-500"
        } text-xs mt-1 text-right`, { fontFamily: 'Mont-Bold' }]}
      >
        {item.timestamp}
      </Text>
    </View>
  );

  return (
    <View style={[ twrnc`flex-1` ]}>
      <SafeAreaView style={twrnc`flex-1 bg-white`}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={twrnc.color("white")}
        />

        {/* Header */}
        <View
          style={twrnc`flex-row items-center justify-between px-4 py-3 border-b border-gray-200`}
        >
          <View style={twrnc`flex-row items-center`}>
            <TouchableOpacity style={twrnc`mr-2`} onPress={() => navigation.goBack()}>
              <ArrowLeft size={24} color={twrnc.color("gray-700")} />
            </TouchableOpacity>
            <View
              style={twrnc`h-10 w-10 rounded-full bg-blue-100 mr-3 items-center justify-center`}
            >
              <Text style={twrnc`text-blue-500 font-bold text-lg`}>JS</Text>
            </View>
            <View>
              <Text style={[twrnc`font-bold text-lg`, { fontFamily: 'Mont-Bold' }]}>John Smith</Text>
            </View>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={twrnc`flex-1 px-4 pt-2`}
          contentContainerStyle={twrnc`pb-2`}
          showsVerticalScrollIndicator={false}
        />

        {/* Message Input */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
          <View
            style={twrnc`flex-row items-center px-4 py-2 bg-gray-50 border-t border-gray-200`}
          >
            <TextInput
              style={[twrnc`flex-1 bg-white rounded-full px-4 pb-3 pt-2 text-base border border-gray-200`, { fontFamily: 'Mont-SeniBold' }]}
              placeholder="Unesite poruku..."
              value={message}
              onChangeText={setMessage}
              multiline
            />

              <TouchableOpacity
                style={twrnc`ml-2 h-10 w-10 rounded-full bg-blue-500 items-center justify-center`}
                onPress={sendMessage}
              >
                <Send size={20} color="white" />
              </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default ChatScreen;
