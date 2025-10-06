import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './context/AuthContext';

// Import screens
import AuthStack from './AuthStack';
import AuthedStack from './AuthedStack';
import BecomeWorker from './screens/client/BecomeWorker';
import ProfileUpdate from './screens/client/ProfileUpdate';
import InviteFriends from './screens/client/InviteFriends';
import Addresses from './screens/client/Addresses';
import ChatScreen from './screens/ChatScreen';
import SearchScreen from './screens/SearchScreen';
import WokerScreen from './screens/client/WokerScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator
          initialRouteName="Auth"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Authed" component={AuthedStack} />
          <Stack.Screen name="BecomeWorker" component={BecomeWorker} />
          <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
          <Stack.Screen name="InviteFriends" component={InviteFriends} />
          <Stack.Screen name="Addresses" component={Addresses} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Worker" component={WokerScreen} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
