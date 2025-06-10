import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthedStack from "./AuthedStack";
import AuthStack from "./AuthStack";
import AuthProvider from "./context/AuthContext";
import BecomeWorker from "./screens/client/BecomeWorker";
import ProfileUpdate from "./screens/client/ProfileUpdate";
import InviteFriends from "./screens/client/InviteFirends";
import Addresses from "./screens/client/Addresses";
import ChatScreen from "./screens/ChatScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Authed" component={AuthedStack} />
          <Stack.Screen name="BecomeWorker" component={BecomeWorker} />
          <Stack.Screen name="EditProfile" component={ProfileUpdate} />
          <Stack.Screen name="InviteFriends" component={InviteFriends} />
          <Stack.Screen name="Addresses" component={Addresses} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
