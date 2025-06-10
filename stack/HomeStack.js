import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import WorkerScreen from '../screens/client/WokerScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='HomeScreen' component={HomeScreen} />
        <Stack.Screen name='WorkerDetails' component={WorkerScreen} />
    </Stack.Navigator>
  )
}

export default HomeStack

const styles = StyleSheet.create({})