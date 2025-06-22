import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/homeScreen';
import SettingsScreen from './screens/settingsScreen';
import TabIcon from './components/TabIcon';
import GuardioesScreen from './screens/guardioes';
import AudioScreen from './screens/audios';

const Tab = createBottomTabNavigator();

const getTabIcon = (routeName, focused) => {
  switch (routeName) {
    case 'Home':
      return { icon: focused ? 'home' : 'home-outline', label: 'Home' };
    case 'Gravações':
      return { icon: focused ? 'mic' : 'mic-outline', label: 'Gravações' };
    case 'Guardiões':
      return { icon: focused ? 'people' : 'people-outline', label: 'Guardiões' };
    case 'Configurações':
      return { icon: focused ? 'settings' : 'settings-outline', label: 'Configurações' };
    default:
      return { icon: 'ellipse-outline', label: routeName };
  }
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            const { icon, label } = getTabIcon(route.name, focused);
            return <TabIcon icon={icon} label={label} focused={focused} />;
          },
          tabBarStyle: {
            backgroundColor: '#7b4397',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            height: 80,
            paddingBottom: 5,
            paddingTop: 5,
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerShown: false,
          tabBarShowLabel: false,
          tabBarButton: (props) => (
            <TouchableWithoutFeedback {...props}>
              <View style={{
                flex: 1,
                minWidth: 100, // ✅ Agora o botão tem espaço suficiente
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}>
                {props.children}
              </View>
            </TouchableWithoutFeedback>
          ),


        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Gravações" component={AudioScreen} />
        <Tab.Screen name="Guardiões" component={GuardioesScreen} />
        <Tab.Screen name="Configurações" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const tabButtonStyle = {
  flex: 1,
  height: '90%',
  justifyContent: 'center',
  alignItems: 'center',
};

