import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';

export default function ProfileScreen({ navigation }) {
  const { user, favorites, bookings, orders, updateProfile, signOut } = useAppData();
  const isGuest = !user || user.isGuest;
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');

  const saveProfile = () => {
    if (!name.trim()) {
      Alert.alert('Name required', 'Please add a name before saving your profile.');
      return;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert('Check your email', 'Enter a valid email address or leave it blank.');
      return;
    }
    updateProfile({ name: name.trim(), email: email.trim().toLowerCase() });
    setEditing(false);
  };

  const handleSignOut = () => {
    Alert.alert('Leave this demo profile?', 'Your saved pieces, requests, and demo orders will remain on this device.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: signOut },
    ]);
  };

  const menuItems = [
    { title: 'Saved pieces', detail: 'Your personal edit', icon: 'heart-outline', value: favorites.length, action: () => navigation.navigate('Wardrobe') },
    { title: 'Fitting requests', detail: 'Local demo requests', icon: 'calendar-outline', value: bookings.length, action: () => navigation.navigate('Fittings') },
    { title: 'Order history', detail: 'Sample checkouts on this device', icon: 'receipt-outline', value: orders.length, action: () => navigation.navigate('Orders') },
    { title: 'Shopping bag', detail: 'Review your selected sizes', icon: 'bag-handle-outline', action: () => navigation.navigate('ShoppingBag') },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 21 }}>
          <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 2 }}>ATELIER · YOUR ACCOUNT</Text>
          <Text style={{ color: '#1A1A1A', fontSize: 31, marginTop: 8 }}>Your profile.</Text>
          <Text style={{ color: '#777', fontSize: 13, lineHeight: 20, marginTop: 6 }}>
            {isGuest ? 'You are browsing as a guest.' : 'A considered space for your wardrobe and member experience.'}
          </Text>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 17, padding: 18, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 54, height: 54, borderRadius: 27, backgroundColor: '#EAE2D7', alignItems: 'center', justifyContent: 'center', marginRight: 13 }}>
              <Text style={{ color: '#805F3E', fontSize: 20, fontWeight: '600' }}>{(user && user.name ? user.name[0] : 'A').toUpperCase()}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#1A1A1A', fontSize: 17, fontWeight: '600' }}>{user ? user.name : 'Guest member'}</Text>
              <Text style={{ color: '#888', fontSize: 11, marginTop: 4 }}>{user && user.isGuest ? 'Browsing as a guest' : user ? user.email : 'Local demo profile'}</Text>
            </View>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel={editing ? 'Cancel profile edit' : 'Edit profile'} onPress={() => {
              if (!editing) {
                setName(user ? user.name : '');
                setEmail(user ? user.email : '');
              }
              setEditing((current) => !current);
            }} style={{ padding: 7 }}>
              <Ionicons name={editing ? 'close-outline' : 'create-outline'} size={19} color="#8A6848" />
            </TouchableOpacity>
          </View>

          {editing ? (
            <View style={{ marginTop: 16 }}>
              <TextInput autoCapitalize="words" onChangeText={setName} placeholder="Name" placeholderTextColor="#A39C92" style={{ height: 44, backgroundColor: '#F7F5F2', borderRadius: 8, paddingHorizontal: 12, color: '#24211E', marginBottom: 9, fontSize: 12 }} value={name} />
              <TextInput autoCapitalize="none" autoCorrect={false} keyboardType="email-address" onChangeText={setEmail} placeholder="Email address (optional for guests)" placeholderTextColor="#A39C92" style={{ height: 44, backgroundColor: '#F7F5F2', borderRadius: 8, paddingHorizontal: 12, color: '#24211E', marginBottom: 11, fontSize: 12 }} value={email} />
              <TouchableOpacity activeOpacity={0.8} accessibilityRole="button" onPress={saveProfile} style={{ minHeight: 42, borderRadius: 8, backgroundColor: '#4A2C29', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700', letterSpacing: 1 }}>SAVE PROFILE ON THIS DEVICE</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginTop: 16, flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#EEE8DF', paddingTop: 14 }}>
              {[
                { label: 'SAVED', value: favorites.length },
                { label: 'FITTINGS', value: bookings.length },
                { label: 'ORDERS', value: orders.length },
              ].map((stat, index) => (
                <View key={stat.label} style={{ flex: 1, alignItems: 'center', borderRightWidth: index < 2 ? 1 : 0, borderRightColor: '#EEE8DF' }}>
                  <Text style={{ color: '#1A1A1A', fontSize: 17, fontWeight: '600' }}>{stat.value}</Text>
                  <Text style={{ color: '#888', fontSize: 9, letterSpacing: 0.7, marginTop: 4 }}>{stat.label}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={{ backgroundColor: '#4A2C29', borderRadius: 16, padding: 19, marginBottom: 22 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 9 }}>
            <Ionicons name={isGuest ? 'person-outline' : 'sparkles-outline'} size={17} color="#D6B58E" />
            <Text style={{ color: '#D6B58E', fontSize: 10, fontWeight: '700', letterSpacing: 1.4, marginLeft: 8 }}>
              {isGuest ? 'GUEST PROFILE' : 'SIGNED-IN MEMBER'}
            </Text>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: 18, marginBottom: 6 }}>
            {isGuest ? 'Make your wardrobe yours.' : 'Your wardrobe, thoughtfully curated.'}
          </Text>
          <Text style={{ color: '#D0CBC4', fontSize: 11, lineHeight: 17 }}>
            {isGuest
              ? 'Sign in or create a local demo account to personalize your profile. Your activity stays on this device.'
              : `Signed in as ${user.email}. Your profile and activity stay on this device; this is not a server-backed account.`}
          </Text>
          {isGuest && (
            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityRole="button"
              onPress={() => navigation.navigate('SignIn')}
              style={{ minHeight: 42, borderRadius: 8, backgroundColor: '#FFFFFF', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 14 }}
            >
              <Text style={{ color: '#4A2C29', fontSize: 10, fontWeight: '700', letterSpacing: 0.6 }}>
                SIGN IN OR CREATE ACCOUNT
              </Text>
              <Ionicons name="arrow-forward" size={14} color="#4A2C29" style={{ marginLeft: 8 }} />
            </TouchableOpacity>
          )}
        </View>

        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 10 }}>YOUR ATELIER</Text>
        <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 15, paddingHorizontal: 14 }}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.75}
              accessibilityRole="button"
              onPress={item.action}
              style={{ minHeight: 65, flexDirection: 'row', alignItems: 'center', borderBottomWidth: index === menuItems.length - 1 ? 0 : 1, borderBottomColor: '#F0ECE6' }}
            >
              <View style={{ width: 35, height: 35, borderRadius: 18, backgroundColor: '#F7F3ED', alignItems: 'center', justifyContent: 'center', marginRight: 11 }}>
                <Ionicons name={item.icon} size={17} color="#8A6848" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#24211E', fontSize: 12, fontWeight: '600' }}>{item.title}</Text>
                <Text style={{ color: '#888', fontSize: 10, marginTop: 3 }}>{item.detail}</Text>
              </View>
              {item.value !== undefined && <Text style={{ color: '#8A6848', fontSize: 11, fontWeight: '600', marginRight: 8 }}>{item.value}</Text>}
              <Ionicons name="chevron-forward" size={16} color="#AAA" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity activeOpacity={0.75} accessibilityRole="button" onPress={() => navigation.navigate('About')} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 18, paddingVertical: 10 }}>
          <Ionicons name="information-circle-outline" size={15} color="#8A6848" style={{ marginRight: 7 }} />
          <Text style={{ color: '#8A6848', fontSize: 11, fontWeight: '600' }}>About Atelier</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.75} accessibilityRole="button" onPress={handleSignOut} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12 }}>
          <Ionicons name="log-out-outline" size={16} color="#9A5B50" style={{ marginRight: 7 }} />
          <Text style={{ color: '#9A5B50', fontSize: 11, fontWeight: '600' }}>Sign out of demo</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
