import 'react-native-gesture-handler';
import React, {useState, useMemo} from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons'
import ExploreScreen from './screens/ExploreScreen';
import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from './screens/HomeScreen';
import SplashScreen from './screens/SplashScreen';
import RootStackScreen from './screens/RootStackScreen';
import { AuthContext } from './components/context'

const Tab = createMaterialBottomTabNavigator();

function App() {

  const [loggedIn, setLoggedIn] = useState(true)

  const authContext = useMemo(() => ({
    signIn: () => {
      setLoggedIn(true)
    },
    signUp: () => {
      setLoggedIn(true)
    },
    signOut: () => {
      setLoggedIn(null)
    }
  }));

  return(
    <AuthContext.Provider value={authContext}>
    <NavigationContainer>
      { loggedIn === null ?
        <RootStackScreen /> 
        :
        ( <Tab.Navigator
        initialRouteName='Home'
        activeColor='#fff'
        barStyle={{ backgroundColor: '#e64f4f'}}
        >
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color }) => (
              <Icon name="ramen-dining" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Explore'
          component={ExploreScreen}
          options={{
            tabBarLabel: 'Explore',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="map-search" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => (
              <Icon name="settings" color={color} size={26} />
            ),
          }}
        /> 
      </Tab.Navigator>
        )}
    </NavigationContainer>
    </AuthContext.Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#888'
  }
})
export default App;
