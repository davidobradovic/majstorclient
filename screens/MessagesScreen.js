import React, { useState, useEffect } from 'react';
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
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFonts } from 'expo-font';
import { useAuth } from '../context/AuthContext';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ApiService from '../services/ApiService';

const MessagesScreen = () => {
  const { user, messages, apiLoading, error: apiError, fetchMessages } = useAuth();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState("all");
  const [conversations, setConversations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [loaded, fontError] = useFonts({
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

  // Process messages into conversations
  const processMessagesIntoConversations = (messages) => {
    if (!messages || !Array.isArray(messages) || messages.length === 0) return [];
    
    const conversationMap = new Map();
    
    messages.forEach(message => {
      const otherUserId = message.senderId === user?.id ? message.receiverId : message.senderId;
      const key = otherUserId;
      
      if (!conversationMap.has(key)) {
        conversationMap.set(key, {
          id: key,
          worker: {
            id: otherUserId,
            name: message.sender?.firstName ? `${message.sender.firstName} ${message.sender.lastName}` : 
                  message.receiver?.firstName ? `${message.receiver.firstName} ${message.receiver.lastName}` : 
                  'Nepoznati korisnik',
            avatar: message.sender?.avatar || message.receiver?.avatar || 
                    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            rating: 4.5, // Default rating
            category: message.order?.category?.name || 'Usluga'
          },
          lastMessage: message.content,
          lastMessageTime: formatLastActivity(message.createdAt),
          unreadCount: message.senderId !== user?.id && !message.isRead ? 1 : 0,
          status: message.order?.status || 'active',
          lastActivity: message.createdAt,
          orderId: message.orderId
        });
      } else {
        const conversation = conversationMap.get(key);
        if (new Date(message.createdAt) > new Date(conversation.lastActivity)) {
          conversation.lastMessage = message.content;
          conversation.lastMessageTime = formatLastActivity(message.createdAt);
          conversation.lastActivity = message.createdAt;
          if (message.senderId !== user?.id && !message.isRead) {
            conversation.unreadCount++;
          }
        }
      }
    });
    
    return Array.from(conversationMap.values()).sort((a, b) => 
      new Date(b.lastActivity) - new Date(a.lastActivity)
    );
  };

  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      try {
        setLoading(true);
        await fetchMessages();
        const processedConversations = processMessagesIntoConversations(messages);
        setConversations(processedConversations);
      } catch (error) {
        console.error('Error loading conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.id) {
      loadConversations();
    }
  }, [user?.id, messages]);

  // Refresh conversations
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchMessages();
      const processedConversations = processMessagesIntoConversations(messages);
      setConversations(processedConversations);
    } catch (error) {
      console.error('Error refreshing conversations:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const tabs = [
    { key: 'all', label: 'Sve', count: conversations.length },
    { key: 'active', label: 'Aktivne', count: conversations.filter(c => c.status === 'active').length },
    { key: 'pending', label: 'Na čekanju', count: conversations.filter(c => c.status === 'pending').length },
    { key: 'completed', label: 'Završene', count: conversations.filter(c => c.status === 'completed').length },
  ];

  const filteredConversations = activeTab === 'all' 
    ? conversations 
    : conversations.filter(conversation => conversation.status === activeTab);

  const searchedConversations = filteredConversations.filter(conversation =>
    conversation.worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.worker.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationPress = (conversation) => {
    navigation.navigate('Chat', { 
      workerId: conversation.worker.id, 
      workerName: conversation.worker.name,
      conversationId: conversation.id
    });
  };

  const formatLastActivity = (lastActivity) => {
    const now = new Date();
    const last = new Date(lastActivity);
    const diffInHours = Math.floor((now - last) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return last.toLocaleTimeString('sr-RS', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Včera';
    } else {
      return `${Math.floor(diffInHours / 24)} dana`;
    }
  };

  if (!loaded && !fontError) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={[tw`px-6 pt-4 pb-4 bg-white border-b border-gray-100`]}>
          <Text style={[tw`text-2xl mb-2`, { fontFamily: 'Mont-Bold' }]}>
            Poruke
          </Text>
          <Text style={[tw`text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
            Komunikujte se sa radnicima
          </Text>
        </View>
        <View style={tw`flex-1 items-center justify-center`}>
          <ActivityIndicator size="large" color="#4ade80" />
          <Text style={[tw`text-gray-600 mt-4`, { fontFamily: 'Mont-Regular' }]}>
            Učitavanje poruka...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderConversation = ({ item }) => (
    <TouchableOpacity
      style={tw`bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100`}
      onPress={() => handleConversationPress(item)}
    >
      <View style={tw`flex-row items-center`}>
        {/* Worker Avatar */}
        <View style={tw`mr-4`}>
          <Image
            source={{ uri: item.worker.avatar }}
            style={tw`w-16 h-16 rounded-full`}
          />
          {item.unreadCount > 0 && (
            <View style={tw`absolute -top-1 -right-1 bg-red-500 rounded-full w-6 h-6 items-center justify-center`}>
              <Text style={[tw`text-white text-xs`, { fontFamily: 'Mont-Bold' }]}>
                {item.unreadCount > 9 ? '9+' : item.unreadCount}
              </Text>
            </View>
          )}
        </View>

        {/* Conversation Info */}
        <View style={tw`flex-1`}>
          <View style={tw`flex-row justify-between items-start mb-1`}>
            <Text style={[tw`text-lg`, { fontFamily: 'Mont-SemiBold' }]}>
              {item.worker.name}
            </Text>
            <Text style={[tw`text-sm text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
              {formatLastActivity(item.lastActivity)}
            </Text>
          </View>
          
          <View style={tw`flex-row items-center mb-2`}>
            <View style={tw`flex-row items-center mr-3`}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={[tw`text-sm text-gray-600 ml-1`, { fontFamily: 'Mont-Regular' }]}>
                {item.worker.rating}
              </Text>
            </View>
            <Text style={[tw`text-sm text-gray-500`, { fontFamily: 'Mont-Regular' }]}>
              {item.worker.category}
            </Text>
          </View>

          <Text 
            style={[
              tw`text-gray-700`,
              item.unreadCount > 0 ? tw`font-semibold` : tw`font-normal`,
              { fontFamily: item.unreadCount > 0 ? 'Mont-Medium' : 'Mont-Regular' }
            ]}
            numberOfLines={2}
          >
            {item.lastMessage}
          </Text>
        </View>

        {/* Status Indicator */}
        <View style={tw`ml-3`}>
          <View style={[
            tw`w-3 h-3 rounded-full`,
            item.status === 'active' ? tw`bg-green-500` : 
            item.status === 'pending' ? tw`bg-yellow-500` : 
            tw`bg-gray-400`
          ]} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[tw`px-6 pt-4 pb-4 bg-white border-b border-gray-100`]}>
        <Text style={[tw`text-2xl mb-2`, { fontFamily: 'Mont-Bold' }]}>
          Poruke
        </Text>
        <Text style={[tw`text-gray-600`, { fontFamily: 'Mont-Regular' }]}>
          Komunikujte se sa radnicima
        </Text>
      </View>

      {/* Search Bar */}
      <View style={tw`px-6 py-4 bg-white border-b border-gray-100`}>
        <View style={tw`flex-row items-center bg-gray-100 rounded-full px-4 py-3`}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={[tw`flex-1 ml-3`, { fontFamily: 'Mont-Regular' }]}
            placeholder="Pretražite poruke..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={tw`bg-white border-b border-gray-100 max-h-[70px]`}
        contentContainerStyle={tw`px-6 py-4`}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[
              tw`px-4 py-2 rounded-full mr-3 flex-row items-center`,
                              activeTab === tab.key ? tw`bg-green-500` : tw`bg-gray-100`
            ]}
            onPress={() => setActiveTab(tab.key)}
          >
            <Text style={[
              tw`text-sm`,
              activeTab === tab.key ? tw`text-white` : tw`text-gray-700`,
              { fontFamily: 'Mont-Medium' }
            ]}>
              {tab.label}
            </Text>
            <View style={[
              tw`ml-2 px-2 py-1 rounded-full`,
                              activeTab === tab.key ? tw`bg-green-400` : tw`bg-gray-200`
            ]}>
              <Text style={[
                tw`text-xs`,
                activeTab === tab.key ? tw`text-white` : tw`text-gray-600`,
                { fontFamily: 'Mont-Medium' }
              ]}>
                {tab.count}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Conversations List */}
      {searchedConversations.length === 0 ? (
        <View style={tw`flex-1 items-center justify-center py-20`}>
          <Ionicons name="chatbubbles-outline" size={64} color="#9CA3AF" />
          <Text style={[tw`text-lg text-gray-500 mt-4`, { fontFamily: 'Mont-Medium' }]}>
            {searchQuery ? 'Nema rezultata pretrage' : 'Nema poruka'}
          </Text>
          <Text style={[tw`text-gray-400 text-center mt-2 px-8`, { fontFamily: 'Mont-Regular' }]}>
            {searchQuery 
              ? 'Pokušajte sa drugim pojmom'
              : activeTab === 'all' 
                ? 'Započnite sa rezervacijom usluge da biste mogli da komunicirate sa radnicima'
                : `Nemate poruka sa statusom "${tabs.find(t => t.key === activeTab)?.label}"`
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={searchedConversations}
          renderItem={renderConversation}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={tw`px-6 py-4`}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#4ade80']}
              tintColor="#4ade80"
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
});

export default MessagesScreen;