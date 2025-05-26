import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './screens/homeScreen';
import SettingsScreen from './screens/settingsScreen';

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
          tabBarIcon: ({ focused, color }) => {
            const { icon, label } = getTabIcon(route.name, focused);

            return (
              <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                <Ionicons name={icon} size={22} color={color} />
                <Text
                  style={{
                    fontSize: 12,
                    color,
                    marginTop: 2,
                    textAlign: 'center',
                    width: 80,
                    fontWeight: 'bold', // <- Negrito aplicado aqui
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {label}
                </Text>
              </View>
            );
          },
          tabBarStyle: {
            backgroundColor: '#7b4397',
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 70,
            paddingBottom: 5,
            paddingTop: 5,
            position: 'absolute',
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#ddd',
          tabBarButton: (props) => (
            <TouchableWithoutFeedback {...props}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {props.children}
              </View>
            </TouchableWithoutFeedback>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Gravações" component={HomeScreen} />
        <Tab.Screen name="Guardiões" component={HomeScreen} />
        <Tab.Screen name="Configurações" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
