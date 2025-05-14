// No arquivo App.tsx

import * as React from 'react';
import { View, Text } from 'react-native';
import NavigationContainer from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Route from './src/navigation/Route';
import RemoteNotification from './src/services/RemoteNotification';

type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (<>
    <Route />
 <RemoteNotification/>
  </>
   );
}

export default App;
