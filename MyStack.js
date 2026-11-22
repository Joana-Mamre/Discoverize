import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useAppData } from './store/AppDataContext.js';
import HomeScreen from './Screen/HomeScreen.js';
import AboutScreen from './Screen/AboutScreen.js';
import MyTabs from './MyTab.js';
import ProductDetailsScreen from './Screen/ProductDetailsScreen.js';
import ShoppingBagScreen from './Screen/ShoppingBagScreen.js';
import CheckoutScreen from './Screen/CheckoutScreen.js';
import FittingBookingScreen from './Screen/FittingBookingScreen.js';
import OrdersScreen from './Screen/OrdersScreen.js';

const Stack = createNativeStackNavigator();

export default function MyStack() {
  const { ready, user, storageError, storageErrorType, retryStorage, resetLocalDemo } = useAppData();

  if (!ready) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 2 }}>ATELIER</Text>
        <Text style={{ color: '#777', fontSize: 12, marginTop: 10 }}>Opening your local demo…</Text>
      </SafeAreaView>
    );
  }

  if (storageError) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2', justifyContent: 'center', padding: 24 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 16, padding: 20 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 21, fontFamily: 'serif' }}>Local data needs attention.</Text>
          <Text style={{ color: '#71695F', fontSize: 12, lineHeight: 18, marginTop: 9 }}>{storageError}</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={retryStorage} style={{ minHeight: 44, backgroundColor: '#4A2C29', borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginTop: 17 }}>
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', letterSpacing: 0.8 }}>
              {storageErrorType === 'load'
                ? 'RETRY LOADING DATA'
                : storageErrorType === 'reset'
                  ? 'RETRY RESETTING LOCAL DATA'
                  : 'RETRY SAVING CURRENT DATA'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.75} onPress={resetLocalDemo} style={{ minHeight: 42, alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
            <Text style={{ color: '#9A5B50', fontSize: 10, fontWeight: '600' }}>RESET LOCAL DEMO DATA ON THIS DEVICE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={MyTabs} />
          <Stack.Screen name="SignIn" component={HomeScreen} />
          <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
          <Stack.Screen name="ShoppingBag" component={ShoppingBagScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
          <Stack.Screen name="FittingBooking" component={FittingBookingScreen} />
          <Stack.Screen name="Orders" component={OrdersScreen} />
          <Stack.Screen name="About" component={AboutScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={HomeScreen} />
      )}
    </Stack.Navigator>
  );
}
