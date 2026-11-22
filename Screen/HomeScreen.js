import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';

export default function HomeScreen({ navigation, route }) {
  const { account, createDemoAccount, signInDemo, continueAsGuest } = useAppData();
  const [isSignIn, setIsSignIn] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = () => {
    const cleanEmail = email.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || password.length < 6) {
      Alert.alert('Check your details', 'Enter a valid email address and a password of at least 6 characters.');
      return;
    }

    if (isSignIn) {
      if (!account || account.email !== cleanEmail) {
        Alert.alert('No local demo account', 'Create a demo account on this device first, or continue as a guest.');
        return;
      }
      signInDemo();
      if (route.name === 'SignIn') navigation.goBack();
      return;
    }

    if (!name.trim()) {
      Alert.alert('Add your name', 'Please enter your name to create your local demo profile.');
      return;
    }

    createDemoAccount({ name, email: cleanEmail });
    if (route.name === 'SignIn') navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 38, paddingBottom: 36 }}
          keyboardShouldPersistTaps="handled"
        >
          {route.name === 'SignIn' && (
            <TouchableOpacity
              activeOpacity={0.75}
              accessibilityRole="button"
              accessibilityLabel="Back to Discover"
              onPress={() => navigation.goBack()}
              style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}
            >
              <Ionicons name="arrow-back" size={18} color="#24211E" />
            </TouchableOpacity>
          )}
          <View style={{ alignItems: 'center', marginBottom: 28 }}>
            <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 3 }}>ATELIER</Text>
            <Text style={{ color: '#1A1A1A', fontSize: 34, marginTop: 14, textAlign: 'center' }}>
              A wardrobe,{'\n'}thoughtfully yours.
            </Text>
            <Text style={{ color: '#777', fontSize: 13, lineHeight: 20, textAlign: 'center', marginTop: 10 }}>
              Discover considered pieces, save the ones you love, and plan your personal fitting.
            </Text>
          </View>

          <View style={{ flexDirection: 'row', backgroundColor: '#EEE9E1', borderRadius: 28, padding: 4, marginBottom: 20 }}>
            {['Sign in', 'Create account'].map((mode, index) => {
              const active = isSignIn === (index === 0);
              return (
                <TouchableOpacity
                  key={mode}
                  activeOpacity={0.8}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                  onPress={() => setIsSignIn(index === 0)}
                  style={{
                    flex: 1,
                    minHeight: 42,
                    borderRadius: 24,
                    backgroundColor: active ? '#FFFFFF' : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: active ? '#1A1A1A' : '#81786D', fontSize: 12, fontWeight: '600' }}>
                    {mode}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 18, padding: 18 }}>
            {!isSignIn && (
              <View style={{ marginBottom: 14 }}>
                <Text style={{ color: '#665F56', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 7 }}>
                  YOUR NAME
                </Text>
                <TextInput
                  autoCapitalize="words"
                  onChangeText={setName}
                  placeholder="Name"
                  placeholderTextColor="#A39C92"
                  style={{ height: 48, borderRadius: 9, backgroundColor: '#F7F5F2', paddingHorizontal: 13, color: '#24211E' }}
                  value={name}
                />
              </View>
            )}

            <View style={{ marginBottom: 14 }}>
              <Text style={{ color: '#665F56', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 7 }}>
                EMAIL ADDRESS
              </Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="you@example.com"
                placeholderTextColor="#A39C92"
                style={{ height: 48, borderRadius: 9, backgroundColor: '#F7F5F2', paddingHorizontal: 13, color: '#24211E' }}
                value={email}
              />
            </View>

            <View style={{ marginBottom: 17 }}>
              <Text style={{ color: '#665F56', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 7 }}>
                DEMO PASSWORD
              </Text>
              <View style={{ height: 48, borderRadius: 9, backgroundColor: '#F7F5F2', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13 }}>
                <TextInput
                  autoCapitalize="none"
                  onChangeText={setPassword}
                  placeholder="At least 6 characters"
                  placeholderTextColor="#A39C92"
                  secureTextEntry={!passwordVisible}
                  style={{ flex: 1, color: '#24211E' }}
                  value={password}
                />
                <TouchableOpacity
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={passwordVisible ? 'Hide password' : 'Show password'}
                  onPress={() => setPasswordVisible((visible) => !visible)}
                >
                  <Ionicons name={passwordVisible ? 'eye-outline' : 'eye-off-outline'} size={19} color="#81786D" />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              accessibilityRole="button"
              onPress={handleSubmit}
              style={{ minHeight: 48, borderRadius: 9, backgroundColor: '#4A2C29', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>
                {isSignIn ? 'SIGN IN TO YOUR DEMO' : 'CREATE DEMO PROFILE'}
              </Text>
              <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 9 }} />
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: '#F0E9DE', borderRadius: 13, padding: 14, flexDirection: 'row', alignItems: 'flex-start', marginTop: 14 }}>
            <Ionicons name="information-circle-outline" size={17} color="#8A6848" style={{ marginRight: 9, marginTop: 1 }} />
            <Text style={{ flex: 1, color: '#71695F', fontSize: 10, lineHeight: 16 }}>
              Demo only: the password is not saved or verified by a server. Your profile and activity stay on this device.
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.75}
            accessibilityRole="button"
            onPress={continueAsGuest}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 19 }}
          >
            <Text style={{ color: '#8A6848', fontSize: 11, fontWeight: '700', letterSpacing: 0.6 }}>
              CONTINUE AS A GUEST
            </Text>
            <Ionicons name="arrow-forward" size={14} color="#8A6848" style={{ marginLeft: 7 }} />
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
