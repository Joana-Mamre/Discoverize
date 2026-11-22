import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';
import { formatPrice, getProduct } from '../store/products.js';

export default function WardrobeScreen({ navigation }) {
  const { favorites, toggleFavorite } = useAppData();
  const savedProducts = favorites.map(getProduct).filter(Boolean);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 22 }}>
          <Text style={{ color: 'red', fontSize: 30, fontWeight: '700', letterSpacing: 2 }}>Joana</Text>
          <Text style={{ color: '#1A1A1A', fontSize: 31, fontFamily: 'poppins', marginTop: 8,textAlign:'center' }}>Your wardrobe.</Text>
          <Text style={{ color: '#777', fontSize: 13, lineHeight: 20, marginTop: 6 ,textAlign:'center' }}>
            Pieces you have saved 
          </Text>
        </View>

        <View style={{ backgroundColor: '#4A2C29', borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center', marginBottom: 21 }}>
          <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: '#302B25', alignItems: 'center', justifyContent: 'center', marginRight: 13 }}>
            <Ionicons name="heart" size={19} color="#D6B58E" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#D6B58E', fontSize: 10, fontWeight: '700', letterSpacing: 1.3 }}>YOUR SAVED EDIT</Text>
            <Text style={{ color: '#FFFFFF', fontSize: 13, fontWeight: '600', marginTop: 5 }}>
              {savedProducts.length} {savedProducts.length === 1 ? 'piece' : 'pieces'} saved
            </Text>
          </View>
          <TouchableOpacity accessibilityRole="button" accessibilityLabel="Browse Discover" onPress={() => navigation.navigate('MainTabs', { screen: 'Discover' })} style={{ padding: 8 }}>
            <Ionicons name="arrow-forward" size={18} color="#D6B58E" />
          </TouchableOpacity>
        </View>

        {savedProducts.length === 0 ? (
          <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 17, padding: 26, alignItems: 'center' }}>
            <View style={{ width: 58, height: 58, borderRadius: 29, backgroundColor: '#F7F3ED', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="heart-outline" size={25} color="#8A6848" />
            </View>
            <Text style={{ color: '#24211E', fontSize: 17, fontFamily: 'serif', marginTop: 14 }}>Your edit starts here.</Text>
            <Text style={{ color: '#777', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 7 }}>
              Save pieces from Discover with the heart to keep them together.
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityRole="button"
              onPress={() => navigation.navigate('MainTabs', { screen: 'Discover' })}
              style={{ backgroundColor: '#4A2C29', minHeight: 44, paddingHorizontal: 20, borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 17 }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>EXPLORE THE COLLECTION</Text>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {savedProducts.map((product) => (
              <View key={product.id} style={{ width: '48.5%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
                <View style={{ height: 145, backgroundColor: product.background, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity activeOpacity={0.8} accessibilityRole="button" accessibilityLabel={`View ${product.name}`} onPress={() => navigation.navigate('ProductDetails', { productId: product.id })} style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    {product.image ? (
                      <Image
                        source={product.image}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{ width: 82, height: 82, borderRadius: 41, backgroundColor: 'rgba(255,255,255,0.42)', alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name={product.icon} size={43} color={product.iconColor} />
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    accessibilityRole="button"
                    accessibilityLabel={`Remove ${product.name} from saved pieces`}
                    onPress={() => toggleFavorite(product.id)}
                    style={{ position: 'absolute', top: 8, right: 8, width: 31, height: 31, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
                  >
                    <Ionicons name="heart" size={17} color="#9A5B50" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.75} onPress={() => navigation.navigate('ProductDetails', { productId: product.id })} style={{ padding: 10 }}>
                  <Text numberOfLines={2} style={{ color: '#24211E', fontSize: 12, fontWeight: '600', lineHeight: 17 }}>{product.name}</Text>
                  <Text style={{ color: '#777', fontSize: 10, marginTop: 5 }}>{formatPrice(product.price)}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        
      </ScrollView>
    </SafeAreaView>
  );
}
