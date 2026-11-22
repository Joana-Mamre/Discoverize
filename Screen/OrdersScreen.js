import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';
import { formatPrice } from '../store/products.js';

export default function OrdersScreen({ navigation }) {
  const { orders } = useAppData();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 16, paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={() => navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Ionicons name="arrow-back" size={18} color="#24211E" />
        </TouchableOpacity>
        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.8 }}>ATELIER · LOCAL HISTORY</Text>
        <Text style={{ color: '#1A1A1A', fontSize: 30, marginTop: 7 }}>Your orders.</Text>
        <Text style={{ color: '#777', fontSize: 12, lineHeight: 18, marginTop: 6, marginBottom: 19 }}>
          Demo orders made on this device. Nothing has been charged or shipped.
        </Text>

        {orders.length === 0 ? (
          <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 17, padding: 26, alignItems: 'center' }}>
            <View style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: '#F7F3ED', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="receipt-outline" size={24} color="#8A6848" />
            </View>
            <Text style={{ color: '#24211E', fontSize: 17, marginTop: 14 }}>No demo orders yet.</Text>
            <Text style={{ color: '#777', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 7 }}>
              A sample order will appear here after you try the demo checkout.
            </Text>
            <TouchableOpacity activeOpacity={0.8} accessibilityRole="button" onPress={() => navigation.navigate('MainTabs', { screen: 'Discover' })} style={{ backgroundColor: '#4A2C29', minHeight: 44, paddingHorizontal: 20, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 17 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>EXPLORE THE COLLECTION</Text>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        ) : orders.map((order) => (
          <View key={order.id} style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 15, padding: 16, marginBottom: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <View>
                <Text style={{ color: '#24211E', fontSize: 13, fontWeight: '700' }}>{order.id}</Text>
                <Text style={{ color: '#888', fontSize: 10, marginTop: 4 }}>{new Date(order.createdAt).toLocaleDateString()}</Text>
              </View>
              <View style={{ backgroundColor: '#F5EFE6', borderRadius: 12, paddingHorizontal: 9, paddingVertical: 6 }}>
                <Text style={{ color: '#8A6848', fontSize: 8, fontWeight: '700', letterSpacing: 0.5 }}>DEMO ONLY</Text>
              </View>
            </View>
            <View style={{ height: 1, backgroundColor: '#EEE8DF', marginVertical: 12 }} />
            {order.items.map((item, index) => (
              <View key={`${item.id}-${item.size}-${index}`} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: index === order.items.length - 1 ? 0 : 9 }}>
                <View style={{ width: 34, height: 34, borderRadius: 8, backgroundColor: item.background, alignItems: 'center', justifyContent: 'center', marginRight: 9 }}>
                  <Ionicons name={item.icon} size={17} color={item.iconColor} />
                </View>
                <Text numberOfLines={1} style={{ color: '#514A42', fontSize: 10, flex: 1 }}>
                  {item.name} · {item.size} · Qty {item.quantity}
                </Text>
                <Text style={{ color: '#24211E', fontSize: 10, fontWeight: '600', marginLeft: 6 }}>
                  {formatPrice(item.price * item.quantity)}
                </Text>
              </View>
            ))}
            <View style={{ height: 1, backgroundColor: '#EEE8DF', marginVertical: 12 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ color: '#777', fontSize: 10 }}>{order.shipping.delivery} · sample address</Text>
              <Text style={{ color: '#24211E', fontSize: 12, fontWeight: '700' }}>{formatPrice(order.subtotal)}</Text>
            </View>
            <Text style={{ color: '#9A5B50', fontSize: 9, fontWeight: '600', marginTop: 8 }}>{order.status.toUpperCase()}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
