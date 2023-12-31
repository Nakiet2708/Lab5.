import 'react-native-gesture-handler';

import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// import { ActivityIndicator, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import DrawerNavigator from './src/components/cpnLab2/DrawerNavigator';
import useAuth from '../hooks/useAuth'; //hook onAuthStateChanged
import MaterialBottomTab from '../Navigation/MaterialBottomTab';
import LoginScreen from '../screens/LoginScreen';

// import { FIRE_BASE_AUTH } from '../App_expo/src/firebase/firebaseConfig'; //getAuth
const NativeStack = createNativeStackNavigator();
const KamiSpaApp = () => {
  const userLoginEmail = useAuth();
  console.log(' file: App.js:35 ~ App ~ userLoginEmail:', userLoginEmail.user);
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <NativeStack.Navigator>
            {userLoginEmail.user ? (
              <NativeStack.Screen
                name="HomeScreen"
                component={MaterialBottomTab}
                options={{
                  headerShown: false,
                }}
                // console.log("userLoginEmail"),
              />
            ) : (
              <NativeStack.Screen
                name="LoginScreen"
                component={LoginScreen}
                // children={(props) => <LoginScreen {...props} promptAsync={promptAsync} />}

                // options={{ headerShown: false }}
              />
            )}
          </NativeStack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default KamiSpaApp;

//Todo: để mai làm
//? tao làm gì?
//! cẩn thận mày
