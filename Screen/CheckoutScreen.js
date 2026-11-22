import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';
import { formatPrice, getProduct } from '../store/products.js';

export default function CheckoutScreen({ navigation }) {
  const { cart, user, placeDemoOrder } = useAppData();
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [delivery, setDelivery] = useState('Standard');
  const subtotal = cart.reduce((total, item) => {
    const product = getProduct(item.productId);
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  const handlePlaceOrder = () => {
    if (!cart.length) {
      Alert.alert('Your bag is empty', 'Add a piece before starting checkout.');
      return;
    }
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || !address.trim() || !city.trim() || !postalCode.trim()) {
      Alert.alert('Complete your demo details', 'Enter your name, a valid email, and a sample delivery address.');
      return;
    }

    const order = placeDemoOrder({ name: name.trim(), email: email.trim(), address: address.trim(), city: city.trim(), postalCode: postalCode.trim(), delivery });
    if (!order) {
      Alert.alert('Order not created', 'Your bag changed. Please review it and try again.');
      return;
    }
    Alert.alert('Demo order created', `${order.id} is saved on this device. No payment was collected and nothing will be shipped.`, [
      { text: 'View demo order', onPress: () => navigation.replace('Orders') },
    ]);
  };

  const fieldStyle = { height: 46, borderRadius: 9, borderWidth: 1, borderColor: '#EEE8DF', backgroundColor: '#FFFFFF', paddingHorizontal: 12, color: '#24211E', marginBottom: 10, fontSize: 12 };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 16, paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={() => navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Ionicons name="arrow-back" size={18} color="#24211E" />
        </TouchableOpacity>
        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.8 }}>ATELIER · DEMO CHECKOUT</Text>
        <Text style={{ color: '#1A1A1A', fontSize: 30, marginTop: 7 }}>A final few details.</Text>

        <View style={{ backgroundColor: '#F0E9DE', borderRadius: 13, padding: 14, flexDirection: 'row', alignItems: 'flex-start', marginTop: 15, marginBottom: 21 }}>
          <Ionicons name="shield-checkmark-outline" size={17} color="#8A6848" style={{ marginRight: 9, marginTop: 1 }} />
          <Text style={{ flex: 1, color: '#71695F', fontSize: 10, lineHeight: 16 }}>
            This is a local checkout demo. Use sample contact and address details only. Do not enter payment details; no payment is taken and nothing is shipped.
          </Text>
        </View>

        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.4, marginBottom: 10 }}>SAMPLE DELIVERY DETAILS</Text>
        <TextInput autoCapitalize="words" onChangeText={setName} placeholder="Full name" placeholderTextColor="#A39C92" style={fieldStyle} value={name} />
        <TextInput autoCapitalize="none" autoCorrect={false} keyboardType="email-address" onChangeText={setEmail} placeholder="Email address" placeholderTextColor="#A39C92" style={fieldStyle} value={email} />
        <TextInput onChangeText={setAddress} placeholder="Street address" placeholderTextColor="#A39C92" style={fieldStyle} value={address} />
        <View style={{ flexDirection: 'row' }}>
          <TextInput onChangeText={setCity} placeholder="City" placeholderTextColor="#A39C92" style={[fieldStyle, { flex: 1, marginRight: 8 }]} value={city} />
          <TextInput onChangeText={setPostalCode} placeholder="Postal code" placeholderTextColor="#A39C92" style={[fieldStyle, { flex: 1 }]} value={postalCode} />
        </View>

        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.4, marginTop: 10, marginBottom: 10 }}>SAMPLE DELIVERY METHOD</Text>
        {['Standard', 'Atelier pickup'].map((option) => {
          const selected = delivery === option;
          return (
            <TouchableOpacity key={option} activeOpacity={0.8} accessibilityRole="radio" accessibilityState={{ checked: selected }} onPress={() => setDelivery(option)} style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: selected ? '#A67C52' : '#EEE8DF', borderRadius: 10, padding: 13, marginBottom: 8, flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name={selected ? 'radio-button-on' : 'radio-button-off'} size={18} color={selected ? '#8A6848' : '#A39C92'} />
              <Text style={{ color: '#24211E', fontSize: 12, fontWeight: '600', marginLeft: 9 }}>{option}</Text>
              <Text style={{ color: '#888', fontSize: 10, marginLeft: 'auto' }}>DEMO ONLY</Text>
            </TouchableOpacity>
          );
        })}

        <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 13, padding: 15, marginTop: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
            <Text style={{ color: '#71695F', fontSize: 11 }}>Sample items ({cart.reduce((total, item) => total + item.quantity, 0)})</Text>
            <Text style={{ color: '#24211E', fontSize: 11 }}>{formatPrice(subtotal)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#EEE8DF', paddingTop: 10 }}>
            <Text style={{ color: '#24211E', fontSize: 13, fontWeight: '700' }}>Demo total</Text>
            <Text style={{ color: '#24211E', fontSize: 13, fontWeight: '700' }}>{formatPrice(subtotal)}</Text>
          </View>
        </View>

        <TouchableOpacity activeOpacity={0.8} accessibilityRole="button" onPress={handlePlaceOrder} style={{ minHeight: 49, borderRadius: 9, backgroundColor: '#4A2C29', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 17 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>PLACE DEMO ORDER · NO PAYMENT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
