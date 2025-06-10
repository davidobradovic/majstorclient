// screens/ChatsScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, SafeAreaView } from 'react-native';
import { Search, Plus, MoreVertical, Phone, Video, MessageCircle } from 'lucide-react-native';
import tw from 'twrnc';
import { useFonts } from 'expo-font';

const ChatItem = ({ chat, onPress }) => {

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

  return (
    <TouchableOpacity 
      style={tw`flex-row items-center p-4 border-b border-gray-100`}
      onPress={() => onPress(chat)}
    >
      <View style={tw`relative`}>
        <Image 
          source={{ uri: chat.avatar }} 
          style={tw`w-14 h-14 rounded-full bg-gray-200`} 
        />
      </View>
      <View style={tw`flex-1 ml-3`}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={[tw`font-semibold text-lg text-gray-900`, { fontFamily: 'Mont-SemiBold' }]}>{chat.name}</Text>
          <Text style={[tw`text-xs text-gray-500`, { fontFamily: 'Mont-Bold' }]}>{chat.time}</Text>
        </View>
        <View style={tw`flex-row justify-between items-center mt-1`}>
          <Text 
            style={[tw`text-sm max-w-5/6 ${chat.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`, { fontFamily: 'Mont-SemiBold' }]} 
            numberOfLines={1}
          >
            {chat.lastMessage}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={tw`bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center`}>
              <Text style={[tw`text-xs font-bold text-white`, { fontFamily: 'Mont-SemiBold' }]}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MessagesScreen = ({ navigation }) => {

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

  const [chats, setChats] = useState([
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'Looking forward to our meeting tomorrow!',
      time: '10:32 AM',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
      unreadCount: 2,
      online: true,
    },
    {
      id: '2',
      name: 'Design Team',
      lastMessage: 'Mike: Hello Brothers will we do something today',
      time: '9:14 AM',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61',
      unreadCount: 0,
      online: false,
    },
    {
      id: '3',
      name: 'John Smith',
      lastMessage: 'Can we reschedule our call to 3PM?',
      time: 'Yesterday',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      unreadCount: 0,
      online: true,
    },
    {
      id: '4',
      name: 'Emily Wilson',
      lastMessage: 'The presentation looks great! Just a few small changes.',
      time: 'Yesterday',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
      unreadCount: 5,
      online: false,
    },
    {
      id: '5',
      name: 'Product Updates',
      lastMessage: 'Tom: Version 2.0 is now live in the App Store!',
      time: 'Tuesday',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61',
      unreadCount: 0,
      online: false,
    },
    {
      id: '6',
      name: 'Lisa Green',
      lastMessage: 'Thanks for your help yesterday!',
      time: 'Monday',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
      unreadCount: 0,
      online: true,
    },
    {
      id: '7',
      name: 'Marketing Team',
      lastMessage: 'Alex: Let\'s finalize the campaign details tomorrow',
      time: 'Monday',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
      unreadCount: 0,
      online: false,
    },
  ]);
  
  const navigateToChat = (chat) => {
    navigation.navigate('Chat', { chat });
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-4 pt-2 pb-4`}>
        <View style={tw`flex-row justify-between items-center mb-4`}>
          <Text style={[tw`text-2xl font-bold text-gray-900`, { fontFamily: 'Mont-Bold' }]}>Dopisivanja</Text>
        </View>
        
        <View style={tw`flex-row bg-gray-100 rounded-full px-4 py-2 items-center mb-2`}>
          <Search size={20} color="#9CA3AF" />
          <Text style={[tw`ml-2 text-gray-500`, { fontFamily: 'Mont-Bold' }]}>Pretraži konverzacije</Text>
        </View>
        
        {/* <View style={tw`flex-row justify-between pt-2`}>
          <TouchableOpacity style={tw`items-center`}>
            <View style={tw`w-12 h-12 bg-blue-50 rounded-full items-center justify-center`}>
              <MessageCircle size={24} color="#3B82F6" />
            </View>
            <Text style={tw`text-xs mt-1 text-gray-800`}>Messages</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={tw`items-center`}>
            <View style={tw`w-12 h-12 bg-gray-100 rounded-full items-center justify-center`}>
              <Phone size={24} color="#6B7280" />
            </View>
            <Text style={tw`text-xs mt-1 text-gray-500`}>Calls</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={tw`items-center`}>
            <View style={tw`w-12 h-12 bg-gray-100 rounded-full items-center justify-center`}>
              <Video size={24} color="#6B7280" />
            </View>
            <Text style={tw`text-xs mt-1 text-gray-500`}>Video</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={tw`items-center`}>
            <View style={tw`w-12 h-12 bg-blue-100 rounded-full items-center justify-center overflow-hidden`}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' }} 
                style={tw`w-12 h-12`} 
              />
            </View>
            <Text style={tw`text-xs mt-1 text-gray-500`}>Profile</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatItem chat={item} onPress={navigateToChat} />}
        contentContainerStyle={tw``}
      />
    </SafeAreaView>
  );
};

export default MessagesScreen;