import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ThreadsProvider } from './src/context/ThreadsContext';

import { HomeScreen } from './src/screens/HomeScreen';
import { ThreadsSearchScreen } from './src/screens/ThreadsSearchScreen';
import { CreateThreadsScreen } from './src/screens/CreateThreadsScreen';
import { ThreadsActivityScreen } from './src/screens/ThreadsActivityScreen';
import { ThreadsProfileScreen } from './src/screens/ThreadsProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ThreadsProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#94a3b8',
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: any;
              if (route.name === 'HomeTab') iconName = focused ? 'home' : 'home-outline';
              else if (route.name === 'SearchTab') iconName = focused ? 'search' : 'search-outline';
              else if (route.name === 'CreateTab') iconName = focused ? 'add-circle' : 'add-circle-outline';
              else if (route.name === 'ActivityTab') iconName = focused ? 'heart' : 'heart-outline';
              else if (route.name === 'ProfileTab') iconName = focused ? 'person' : 'person-outline';
              
              return <Ionicons name={iconName} size={28} color={color} />;
            },
          })}
        >
          <Tab.Screen name="HomeTab" component={HomeScreen} />
          <Tab.Screen name="SearchTab" component={ThreadsSearchScreen} />
          <Tab.Screen name="CreateTab" component={CreateThreadsScreen} />
          <Tab.Screen name="ActivityTab" component={ThreadsActivityScreen} />
          <Tab.Screen name="ProfileTab" component={ThreadsProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </ThreadsProvider>
  );
}