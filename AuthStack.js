import AuthProvider from "./context/AuthContext";
import Login from "./screens/auth/Login";
import Register from "./screens/auth/Register";
import BecomeWorker from "./screens/client/BecomeWorker";
import SearchScreen from "./screens/SearchScreen";
import HomeStack from "./stack/HomeStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function AuthStack() {
  const Stack = createNativeStackNavigator();

  return (
      <Stack.Navigator 
        screenOptions={{
            headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>

  );
}