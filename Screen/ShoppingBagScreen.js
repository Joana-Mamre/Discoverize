import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';
import { formatPrice, getProduct } from '../store/products.js';

export default function ShoppingBagScreen({ navigation }) {
  const { cart, updateCartQuantity, removeFromCart } = useAppData();
  const items = cart.map((item) => ({ ...item, product: getProduct(item.productId) })).filter((item) => item.product);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 16, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={() => navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Ionicons name="arrow-back" size={18} color="#24211E" />
        </TouchableOpacity>
        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.8 }}>ATELIER · DEMO BAG</Text>
        <Text style={{ color: '#1A1A1A', fontSize: 31, marginTop: 7 }}>Your bag.</Text>
        <Text style={{ color: '#777', fontSize: 12, marginTop: 5, marginBottom: 19 }}>
          {items.length} {items.length === 1 ? 'style' : 'styles'} · {cart.reduce((total, item) => total + item.quantity, 0)} pieces
        </Text>

        {items.length === 0 ? (
          <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 17, padding: 26, alignItems: 'center' }}>
            <View style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: '#F7F3ED', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="bag-handle-outline" size={25} color="#8A6848" />
            </View>
            <Text style={{ color: '#24211E', fontSize: 17, marginTop: 14 }}>Your bag is taking a moment.</Text>
            <Text style={{ color: '#777', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 7 }}>
              Explore the collection and add a size to see it here.
            </Text>
            <TouchableOpacity activeOpacity={0.8} accessibilityRole="button" onPress={() => navigation.navigate('MainTabs', { screen: 'Discover' })} style={{ backgroundColor: '#4A2C29', minHeight: 44, paddingHorizontal: 20, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 17 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>DISCOVER PIECES</Text>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {items.map((item) => (
              <View key={`${item.productId}-${item.size}`} style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 15, padding: 12, marginBottom: 10, flexDirection: 'row' }}>
                <TouchableOpacity activeOpacity={0.8} accessibilityRole="button" onPress={() => navigation.navigate('ProductDetails', { productId: item.product.id })} style={{ width: 84, height: 104, borderRadius: 10, backgroundColor: item.product.background, alignItems: 'center', justifyContent: 'center', marginRight: 12, overflow: 'hidden' }}>
                  {item.product.image ? (
                    <Image
                      source={item.product.image}
                      style={{ width: '100%', height: '100%' }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Ionicons name={item.product.icon} size={38} color={item.product.iconColor} />
                  )}
                </TouchableOpacity>
                <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 2 }}>
                  <View>
                    <Text numberOfLines={2} style={{ color: '#24211E', fontSize: 12, fontWeight: '600', lineHeight: 17 }}>{item.product.name}</Text>
                    <Text style={{ color: '#777', fontSize: 10, marginTop: 4 }}>Size {item.size}</Text>
                    <Text style={{ color: '#24211E', fontSize: 11, fontWeight: '600', marginTop: 6 }}>{formatPrice(item.product.price)}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 7 }}>
                      <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Decrease ${item.product.name} quantity`} onPress={() => updateCartQuantity(item.productId, item.size, item.quantity - 1)} style={{ width: 31, height: 29, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="remove" size={15} color="#665F56" />
                      </TouchableOpacity>
                      <Text style={{ minWidth: 23, color: '#24211E', fontSize: 11, textAlign: 'center' }}>{item.quantity}</Text>
                      <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Increase ${item.product.name} quantity`} onPress={() => updateCartQuantity(item.productId, item.size, item.quantity + 1)} style={{ width: 31, height: 29, alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name="add" size={15} color="#665F56" />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity accessibilityRole="button" accessibilityLabel={`Remove ${item.product.name}`} onPress={() => removeFromCart(item.productId, item.size)} style={{ padding: 7 }}>
                      <Ionicons name="trash-outline" size={17} color="#9A5B50" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 15, padding: 16, marginTop: 7 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#71695F', fontSize: 12 }}>Sample subtotal</Text>
                <Text style={{ color: '#24211E', fontSize: 13, fontWeight: '700' }}>{formatPrice(subtotal)}</Text>
              </View>
              <Text style={{ color: '#999', fontSize: 10, lineHeight: 15, marginTop: 8 }}>
                Demo prices only. No shipping or payment will be charged.
              </Text>
            </View>

            <TouchableOpacity activeOpacity={0.8} accessibilityRole="button" onPress={() => navigation.navigate('Checkout')} style={{ minHeight: 49, borderRadius: 9, backgroundColor: '#4A2C29', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>CONTINUE TO DEMO CHECKOUT</Text>
              <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 9 }} />
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
