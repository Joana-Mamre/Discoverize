import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './Screen/ProfileScreen.js';
import DiscoverScreen from './Screen/DiscoverScreen.js';
import WardrobeScreen from './Screen/WardrobeScreen.js';
import FittingsScreen from './Screen/FittingsScreen.js';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

const tabIcons = {
  Discover: 'compass-outline',
  Wardrobe: 'heart-outline',
  Fittings: 'calendar-outline',
  Profile: 'person-outline',
};

export default function MyTabs() {
  // 1. Call the hook INSIDE the component
  const insets = useSafeAreaInsets();

  // 2. Combine all your styles into one object
  const dynamicTabBarStyle = {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#EEE8DF',
    paddingTop: 5,
    // Base height (61) + Android bottom inset
    height: 61 + (Platform.OS === 'android' ? insets.bottom : 0),
    // Add padding to push icons up above the Android nav bar
    paddingBottom: 5 + (Platform.OS === 'android' ? insets.bottom : 0),
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#8A6848',
        tabBarInactiveTintColor: '#9B948B',
        // 3. Use the single combined style object here
        tabBarStyle: dynamicTabBarStyle,
        tabBarLabelStyle: { fontSize: 9, fontWeight: '600' },
        tabBarIcon: ({ color, size }) => <Ionicons name={tabIcons[route.name]} size={size} color={color} />,
      })}
    >
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Wardrobe" component={WardrobeScreen} />
      <Tab.Screen name="Fittings" component={FittingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}