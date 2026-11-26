import { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';
import { fittingServices, getFittingService } from '../store/fittings.js';

export default function FittingsScreen({ navigation }) {
  const { bookings } = useAppData();
  const [selectedService, setSelectedService] = useState('private');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 22, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
        <View style={{ marginBottom: 22 }}>
          <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 2 }}>
            Joana · PERSONAL SERVICE
          </Text>
          <Text style={{ color: '#1A1A1A', fontSize: 31, marginTop: 8 }}>
            Fittings, made personal.
          </Text>
          <Text style={{ color: '#777', fontSize: 13, lineHeight: 20, marginTop: 7,textAlign:'center' }}>
            A little time, expert attention,
          </Text>
           <Text style={{ color: '#777', fontSize: 13, lineHeight: 20,textAlign:'center' }}> and a fit that feels entirely your own.</Text>
        </View>

        <View style={{ backgroundColor: '#4A2C29', borderRadius: 20, padding: 22, marginBottom: 25 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
            
            <View >
              <Text style={{ color: '#D6B58E', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>
                THE ATELIER EXPERIENCE
              </Text>
              <Text style={{ color: '#BEB8AF', fontSize: 11, marginTop: 4 }}>Considered from the first pin</Text>
            </View>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: 25, lineHeight: 32, marginBottom: 9 }}>
            Your perfect fit{'\n'}is a conversation.
          </Text>
          <Text style={{ color: '#D0CBC4', fontSize: 12, lineHeight: 19, marginBottom: 17 }}>
            Select an experience and send a local demo request. No real appointment is booked.
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            accessibilityRole="button"
            onPress={() => navigation.navigate('FittingBooking', { serviceId: selectedService })}
            style={{ backgroundColor: '#FFFFFF', borderRadius: 9, minHeight: 47, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: '#1A1A1A', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>PLAN YOUR FITTING</Text>
            <Ionicons name="arrow-forward" size={15} color="#1A1A1A" style={{ marginLeft: 9 }} />
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 25 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.5 }}>YOUR FITTING REQUESTS</Text>
            <Text style={{ color: '#999', fontSize: 10 }}>{bookings.length} SAVED</Text>
          </View>

          {bookings.length === 0 ? (
            <View style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 16, padding: 19, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: '#F7F3ED', alignItems: 'center', justifyContent: 'center', marginRight: 13 }}>
                <Ionicons name="calendar-clear-outline" size={20} color="#8A6848" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#24211E', fontSize: 14, fontWeight: '600' }}>Nothing on the calendar yet</Text>
                <Text style={{ color: '#888', fontSize: 11, lineHeight: 17, marginTop: 4 }}>Choose an experience below to start planning.</Text>
              </View>
            </View>
          ) : bookings.map((booking) => (
            <View key={booking.id} style={{ backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', borderRadius: 15, padding: 15, marginBottom: 9, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: '#F7F3ED', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                <Ionicons name="calendar-outline" size={19} color="#8A6848" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#24211E', fontSize: 13, fontWeight: '600' }}>
                  {getFittingService(booking.serviceId).title}
                </Text>
                <Text style={{ color: '#777', fontSize: 11, marginTop: 4 }}>{booking.date} · {booking.time}</Text>
                <Text style={{ color: '#A67C52', fontSize: 9, fontWeight: '700', letterSpacing: 0.6, marginTop: 5 }}>
                  {booking.status.toUpperCase()} · LOCAL ONLY
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={{ marginBottom: 23 }}>
          <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 7 }}>
            CHOOSE YOUR EXPERIENCE
          </Text>
          <Text style={{ color: '#1A1A1A', fontSize: 22, marginBottom: 13 }}>Made for your moment.</Text>
          {fittingServices.map((service) => {
            const isSelected = selectedService === service.id;
            return (
              <TouchableOpacity
                key={service.id}
                activeOpacity={0.8}
                accessibilityRole="radio"
                accessibilityState={{ checked: isSelected }}
                onPress={() => setSelectedService(service.id)}
                style={{ backgroundColor: isSelected ? '#F5EFE6' : '#FFFFFF', borderWidth: 1, borderColor: isSelected ? '#A67C52' : '#EEE8DF', borderRadius: 15, padding: 15, marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}
              >
                <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: isSelected ? '#EAE0D2' : '#F7F3ED', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Ionicons name={service.id === 'private' ? 'person-outline' : service.id === 'wardrobe' ? 'shirt-outline' : 'cut-outline'} size={19} color="#8A6848" />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                    <Text style={{ color: '#24211E', fontSize: 13, fontWeight: '600', marginRight: 8 }}>{service.title}</Text>
                    <Text style={{ color: '#A67C52', fontSize: 9, fontWeight: '700', letterSpacing: 0.7 }}>{service.duration}</Text>
                  </View>
                  <Text style={{ color: '#777', fontSize: 11, lineHeight: 16, marginTop: 5 }}>{service.description}</Text>
                </View>
                <Ionicons name={isSelected ? 'checkmark-circle' : 'ellipse-outline'} size={19} color={isSelected ? '#8A6848' : '#C9C1B7'} style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            );
          })}
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}
