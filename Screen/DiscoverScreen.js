import { useState } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';
import { formatPrice, products } from '../store/products.js';

const filters = ['All', 'New ', 'Cloths', 'Accessories'];

export default function DiscoverScreen({ navigation }) {
  const { cart, favorites, toggleFavorite, user } = useAppData();
  const [activeFilter, setActiveFilter] = useState('All');
  const [query, setQuery] = useState('');
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const visibleProducts = products.filter((product) => {
    const matchesFilter = activeFilter === 'All'
      || (activeFilter === 'New in' ? product.isNew : product.category === activeFilter);
    const searchText = `${product.name} ${product.detail} ${product.category}`.toLowerCase();
    return matchesFilter && searchText.includes(query.trim().toLowerCase());
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ marginBottom: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ color: 'red', fontSize: 30, fontWeight: '700', letterSpacing: 2, fontStyle:'italic' }}>
            JOANA
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {user && user.isGuest && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  onPress={() => navigation.navigate('SignIn')}
                  style={{ minHeight: 34, paddingHorizontal: 10, borderRadius: 8, backgroundColor: '#4A2C29', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>Sign in</Text>
                </TouchableOpacity>
              )}
              <Ionicons name="heart-outline" size={15} color="#8A6848" />
              <Text style={{ color: '#8A6848', fontSize: 11, fontWeight: '600', marginLeft: 5, marginRight: 15 }}>
                {favorites.length}
              </Text>
              <TouchableOpacity
                activeOpacity={0.75}
                accessibilityRole="button"
                accessibilityLabel={`Open shopping bag, ${cartItemCount} items`}
                onPress={() => navigation.navigate('ShoppingBag')}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Ionicons name="bag-handle-outline" size={18} color="#8A6848" />
                <Text style={{ color: '#8A6848', fontSize: 11, fontWeight: '600', marginLeft: 5 }}>
                  {cartItemCount}
                </Text>
              </TouchableOpacity>
            </View>
          </View>


          <View style={{display:'flex',justifyContent:'center',alignItems:'center'}}>

          <Text style={{ color: '#1A1A1A', fontSize: 31, marginTop: 8 }}>
            Find your point of view.
          </Text>
           <Text style={{ color: '#777', fontSize: 13, lineHeight: 20, marginTop: 6 }}>
            Considered pieces, chosen to feel like you.
          </Text>

          </View>

         
        </View>

        <View style={{ backgroundColor: '#4A2C29', borderRadius: 19, padding: 21, marginBottom: 23, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 18 }}>
            
            <Text style={{ color: '#D6B58E', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginLeft: 7 }}>
              THE NEW SEASON EDIT
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, paddingRight: 8 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 25, lineHeight: 31 }}>
                Quiet pieces.{'\n'}Lasting presence.
              </Text>
              <Text style={{ color: '#D0CBC4', fontSize: 11, lineHeight: 17, marginTop: 8, marginBottom: 15 }}>
                Meet the pieces you will reach for, season after season.
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                accessibilityRole="button"
                onPress={() => setActiveFilter('New in')}
                style={{ flexDirection: 'row', alignItems: 'center' }}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>
                  EXPLORE NEW IN
                </Text>
                <Ionicons name="arrow-forward" size={14} color="#D6B58E" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>

            <View style={{ width: 82, height: 112, borderRadius: 41, backgroundColor: '#302B25', alignItems: 'center', justifyContent: 'center', marginLeft: 3 }}>
              <Ionicons name="shirt-outline" size={47} color="#D6B58E" />
              <View style={{ position: 'absolute', width: 7, height: 7, borderRadius: 4, backgroundColor: '#A67C52', top: 20, right: 15 }} />
            </View>
            
          </View>
        </View>

        <View style={{ height: 46, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 10, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, marginBottom: 15 }}>
          <Ionicons name="search-outline" size={17} color="#4A2C29" />
          <TextInput
            accessibilityLabel="Search pieces"
            autoCapitalize="none"
            onChangeText={setQuery}
            placeholder="Search the collection"
            placeholderTextColor="#4A2C29"
            returnKeyType="search"
            style={{ flex: 1, color: '#24211E', fontSize: 12, marginLeft: 9 }}
            value={query}
          />
          {query.length > 0 && (
            <TouchableOpacity activeOpacity={0.7} accessibilityRole="button" accessibilityLabel="Clear search" onPress={() => setQuery('')}>
              <Ionicons name="close-circle" size={18} color="#A39C92" />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginBottom: 17 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 10 }}>
            {filters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <TouchableOpacity
                  key={filter}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isActive }}
                  onPress={() => setActiveFilter(filter)}
                  style={{
                    backgroundColor: isActive ? '#4A2C29' : '#FFFFFF',
                    borderWidth: 1,
                    borderColor: isActive ? '#4A2C29' : '#EEE8DF',
                    borderRadius: 22,
                    paddingHorizontal: 16,
                    minHeight: 37,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 8,
                  }}
                >
                  <Text style={{ color: isActive ? '#FFFFFF' : '#625B52', fontSize: 11, fontWeight: '600' }}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 13 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>
              A CONSIDERED SELECTION
            </Text>
            <Text style={{ color: '#4A2C29', fontSize: 21, marginTop: 5 }}>
              {query.trim() ? 'Search results.' : activeFilter === 'All' ? 'Pieces to keep.' : `${activeFilter}, thoughtfully chosen.`}
            </Text>
          </View>
          <Text style={{ color: '#999', fontSize: 10, paddingBottom: 4 }}>
            {visibleProducts.length} PIECES
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {visibleProducts.map((product) => {
            const isSaved = favorites.includes(product.id);
            return (
              <View key={product.id} style={{ width: '48.5%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 14, overflow: 'hidden', marginBottom: 12 }}>
                <View style={{ height: 145, backgroundColor: product.background, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    accessibilityRole="button"
                    accessibilityLabel={`View ${product.name}`}
                    onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                    style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                    {product.image ? (
                      <Image
                        source={product.image}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={{ width: 82, height: 82, borderRadius: 41, backgroundColor: 'rgba(255,255,255,0.38)', alignItems: 'center', justifyContent: 'center' }}>
                        <Ionicons name={product.icon} size={43} color={product.iconColor} />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={{ position: 'absolute', top: 10, left: 9, backgroundColor: 'rgba(255,255,255,0.78)', borderRadius: 5, paddingHorizontal: 7, paddingVertical: 5 }}>
                    <Text style={{ color: '#695A49', fontSize: 8, fontWeight: '700', letterSpacing: 0.6 }}>
                      {product.label}
                    </Text>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.75}
                    accessibilityRole="button"
                    accessibilityLabel={isSaved ? `Remove ${product.name} from saved pieces` : `Save ${product.name}`}
                    accessibilityState={{ selected: isSaved }}
                    onPress={() => toggleFavorite(product.id)}
                    style={{ position: 'absolute', top: 8, right: 8, width: 31, height: 31, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.9)', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}
                  >
                    <Ionicons name={isSaved ? 'heart' : 'heart-outline'} size={17} color={isSaved ? '#9A5B50' : '#665B50'} />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  onPress={() => navigation.navigate('ProductDetails', { productId: product.id })}
                  style={{ paddingHorizontal: 10, paddingTop: 10, paddingBottom: 12 }}
                >
                  <Text style={{ color: '#9A8064', fontSize: 9, fontWeight: '700', letterSpacing: 0.8, marginBottom: 4 }}>
                    {product.category.toUpperCase()}
                  </Text>
                  <Text numberOfLines={2} style={{ color: '#24211E', fontSize: 12, fontWeight: '600', lineHeight: 17 }}>
                    {product.name}
                  </Text>
                  <Text numberOfLines={1} style={{ color: '#888', fontSize: 10, marginTop: 5 }}>
                    {product.detail}
                  </Text>
                  <Text style={{ color: '#24211E', fontSize: 11, fontWeight: '600', marginTop: 7 }}>
                    {formatPrice(product.price)}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>

        {visibleProducts.length === 0 && (
          <View style={{ alignItems: 'center', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 15, padding: 25 }}>
            <Ionicons name="search-outline" size={24} color="#A67C52" />
            <Text style={{ color: '#24211E', fontSize: 14, fontWeight: '600', marginTop: 10 }}>
              No pieces found
            </Text>
            <Text style={{ color: '#777', fontSize: 11, marginTop: 5, textAlign: 'center' }}>
              Try another search or collection.
            </Text>
          </View>
        )}

        
      </ScrollView>
    </SafeAreaView>
  );
}
