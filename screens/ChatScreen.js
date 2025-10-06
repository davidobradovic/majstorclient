import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Alert,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '../context/AuthContext';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const ChatScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const route = useRoute();
  const { workerId, workerName, conversationId } = route.params || {};
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef(null);

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

  // Fake data for messages when API data is not available
  const fakeMessages = [
    {
      id: 1,
      text: "Zdravo! Hvala na rezervaciji za servis veš mašine.",
      sender: "worker",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: "read"
    },
    {
      id: 2,
      text: "Zdravo! Molim vas, kada možete da dođete?",
      sender: "user",
      timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
      status: "read"
    },
    {
      id: 3,
      text: "Mogu sutra u 14:00. Da li vam odgovara?",
      sender: "worker",
      timestamp: new Date(Date.now() - 2400000), // 40 minutes ago
      status: "read"
    },
    {
      id: 4,
      text: "Odlično! Vidimo se sutra u 14:00. Hvala!",
      sender: "user",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: "read"
    },
    {
      id: 5,
      text: "Molim vas, možete li mi poslati tačnu adresu?",
      sender: "worker",
      timestamp: new Date(Date.now() - 1200000), // 20 minutes ago
      status: "read"
    },
    {
      id: 6,
      text: "Naravno! Bulevar oslobođenja 123, Novi Sad. Stan 45B.",
      sender: "user",
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      status: "read"
    },
    {
      id: 7,
      text: "Hvala! Vidimo se sutra. Imate li još neka pitanja?",
      sender: "worker",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      status: "delivered"
    }
  ];

  const [conversationMessages, setConversationMessages] = useState(fakeMessages);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (flatListRef.current && conversationMessages.length > 0) {
      setTimeout(() => {
        flatListRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversationMessages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message.trim(),
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setConversationMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate message being sent
    setTimeout(() => {
      setConversationMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 1000);

    // Simulate worker response after 2-5 seconds
    const responseDelay = Math.random() * 3000 + 2000;
    setTimeout(() => {
      const workerResponses = [
        "Hvala na poruci!",
        "Razumem, vidimo se uskoro.",
        "Odlično, to je u redu.",
        "Molim vas, možete li mi dati više detalja?",
        "Hvala na informacijama!"
      ];
      
      const randomResponse = workerResponses[Math.floor(Math.random() * workerResponses.length)];
      
      const workerMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'worker',
        timestamp: new Date(),
        status: 'received'
      };

      setConversationMessages(prev => [...prev, workerMessage]);
    }, responseDelay);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - messageTime) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return 'Sada';
    } else if (diffInMinutes < 60) {
      return `Pre ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `Pre ${diffInHours} h`;
    } else {
      return messageTime.toLocaleDateString('sr-RS', { 
        day: '2-digit', 
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getMessageStatusIcon = (status) => {
    switch (status) {
      case 'sending':
        return <Ionicons name="time-outline" size={16} color="#9CA3AF" />;
      case 'sent':
        return <Ionicons name="checkmark" size={16} color="#9CA3AF" />;
      case 'delivered':
        return <Ionicons name="checkmark-done" size={16} color="#9CA3AF" />;
      case 'read':
        return <Ionicons name="checkmark-done" size={16} color="#4ade80" />;
      default:
        return null;
    }
  };

  if (!loaded && !error) {
    return null;
  }

  const renderMessage = ({ item }) => (
    <View style={[
      tw`mb-4 max-w-[80%]`,
      item.sender === 'user' ? tw`self-end` : tw`self-start`
    ]}>
      <View style={[
        tw`px-4 py-3 rounded-2xl`,
        item.sender === 'user' 
                          ? tw`bg-green-500` 
          : tw`bg-gray-100`
      ]}>
        <Text style={[
          tw`text-base`,
          item.sender === 'user' ? tw`text-white` : tw`text-gray-800`,
          { fontFamily: 'Mont-Regular' }
        ]}>
          {item.text}
        </Text>
      </View>
      
      <View style={[
        tw`flex-row items-center mt-2`,
        item.sender === 'user' ? tw`justify-end` : tw`justify-start`
      ]}>
        <Text style={[
          tw`text-xs text-gray-500 mr-2`,
          { fontFamily: 'Mont-Regular' }
        ]}>
          {formatTimestamp(item.timestamp)}
        </Text>
        
        {item.sender === 'user' && (
          <View style={tw`flex-row items-center`}>
            {getMessageStatusIcon(item.status)}
          </View>
        )}
      </View>
    </View>
  );

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
          <Text style={[tw`text-lg`, { fontFamily: 'Mont-SemiBold' }]}>
            {workerName || 'Radnik'}
          </Text>
          <Text style={[tw`text-sm text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
            Online
          </Text>
        </View>
        
        
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={conversationMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={tw`px-6 py-4`}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          if (flatListRef.current && conversationMessages.length > 0) {
            flatListRef.current.scrollToEnd({ animated: true });
          }
        }}
      />

      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={tw`bg-white border-t border-gray-100 px-6 py-4`}
      >
        <View style={tw`flex-row items-center`}>
          <TouchableOpacity
            onPress={() => Alert.alert('Info', 'Dodavanje slika će biti dostupno uskoro')}
            style={tw`mr-3 p-2`}
          >
            <Ionicons name="add-circle-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
          
          <View style={tw`flex-1 bg-gray-100 rounded-full px-4 py-3 mr-3`}>
            <TextInput
              style={[tw`flex-1`, { fontFamily: 'Mont-Regular' }]}
              placeholder="Napišite poruku..."
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
          </View>
          
          <TouchableOpacity
            onPress={sendMessage}
            disabled={!message.trim()}
            style={[
              tw`p-3 rounded-full`,
                              message.trim() ? tw`bg-green-500` : tw`bg-gray-300`
            ]}
          >
            <Ionicons 
              name="send" 
              size={20} 
              color={message.trim() ? "white" : "#9CA3AF"} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default ChatScreen;
