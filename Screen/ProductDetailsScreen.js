import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';
import { formatPrice, getProduct } from '../store/products.js';

export default function ProductDetailsScreen({ navigation, route }) {
  const productId = route.params && route.params.productId;
  const product = getProduct(productId);
  const { favorites, toggleFavorite, addToCart } = useAppData();
  const [selectedSize, setSelectedSize] = useState(product ? product.sizes[0] : '');

  if (!product) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Text style={{ color: '#24211E', fontSize: 17, fontWeight: '600' }}>This piece is unavailable.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 14 }}>
          <Text style={{ color: '#8A6848', fontWeight: '600' }}>Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isSaved = favorites.includes(product.id);

  const handleAddToBag = () => {
    if (!selectedSize) return;
    addToCart(product.id, selectedSize);
    navigation.navigate('ShoppingBag');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 16, paddingBottom: 30 }} showsVerticalScrollIndicator={false}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={() => navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="arrow-back" size={18} color="#24211E" />
          </TouchableOpacity>
          <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.8 }}>ATELIER · PIECE DETAILS</Text>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel={isSaved ? 'Remove from saved pieces' : 'Save piece'} onPress={() => toggleFavorite(product.id)} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={19} color={isSaved ? '#9A5B50' : '#8A6848'} />
          </TouchableOpacity>
        </View>

        <View style={{ height: 400, backgroundColor: product.background, borderRadius: 20, overflow: 'hidden', marginBottom: 22 }}>
  {product.image ? (
    <Image
      source={product.image}
      style={{ width: '100%', height: '100%' }}
      resizeMode="cover"
    />
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ width: 148, height: 148, borderRadius: 74, backgroundColor: 'rgba(255,255,255,0.42)', alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={product.icon} size={76} color={product.iconColor} />
      </View>
    </View>
  )}
  <View style={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'rgba(255,255,255,0.82)', borderRadius: 6, paddingHorizontal: 9, paddingVertical: 6 }}>
    <Text style={{ color: '#695A49', fontSize: 9, fontWeight: '700', letterSpacing: 0.8 }}>{product.label}</Text>
  </View>
</View>

        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>{product.category.toUpperCase()}</Text>
        <Text style={{ color: '#1A1A1A', fontSize: 29, lineHeight: 36, marginTop: 7 }}>{product.name}</Text>
        <Text style={{ color: '#777', fontSize: 12, marginTop: 7 }}>{product.detail}</Text>
        <Text style={{ color: '#24211E', fontSize: 16, fontWeight: '600', marginTop: 15 }}>{formatPrice(product.price)}</Text>

        <View style={{ height: 1, backgroundColor: '#E8E1D8', marginVertical: 20 }} />
        <Text style={{ color: '#24211E', fontSize: 14, fontWeight: '600', marginBottom: 7 }}>A little about this piece</Text>
        <Text style={{ color: '#71695F', fontSize: 12, lineHeight: 19 }}>{product.description}</Text>

        <View style={{ marginTop: 22, marginBottom: 18 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 11 }}>
            <Text style={{ color: '#24211E', fontSize: 13, fontWeight: '600' }}>Choose your size</Text>
            <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.navigate('MainTabs', { screen: 'Fittings' })}>
              <Text style={{ color: '#8A6848', fontSize: 10, fontWeight: '600' }}>NEED A FITTING?</Text>
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <TouchableOpacity
                  key={size}
                  activeOpacity={0.8}
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  onPress={() => setSelectedSize(size)}
                  style={{ minWidth: 52, height: 42, borderRadius: 8, borderWidth: 1, borderColor: isSelected ? '#4A2C29' : '#DDD6CD', backgroundColor: isSelected ? '#4A2C29' : '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: 8, marginBottom: 8, paddingHorizontal: 10 }}
                >
                  <Text style={{ color: isSelected ? '#FFFFFF' : '#514A42', fontSize: 11, fontWeight: '600' }}>{size}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole="button"
          onPress={handleAddToBag}
          style={{ minHeight: 49, borderRadius: 9, backgroundColor: '#4A2C29', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="bag-handle-outline" size={17} color="#FFFFFF" />
          <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 1, marginLeft: 9 }}>ADD TO DEMO BAG</Text>
        </TouchableOpacity>
        <Text style={{ color: '#999', fontSize: 10, lineHeight: 15, textAlign: 'center', marginTop: 10 }}>
          Sample product and price. The demo bag does not process a purchase.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
