import { useState } from 'react';
import { Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppData } from '../store/AppDataContext.js';
import { getFittingService } from '../store/fittings.js';

const availableDates = Array.from({ length: 5 }, (_, index) => {
  const date = new Date();
  date.setDate(date.getDate() + index + 1);
  return {
    value: date.toLocaleDateString(),
    label: date.toLocaleDateString(undefined, { weekday: 'short' }),
    day: date.toLocaleDateString(undefined, { day: 'numeric' }),
    month: date.toLocaleDateString(undefined, { month: 'short' }),
  };
});

const availableTimes = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM'];

export default function FittingBookingScreen({ navigation, route }) {
  const serviceId = route.params && route.params.serviceId;
  const service = getFittingService(serviceId);
  const { addBooking, user } = useAppData();
  const [selectedDate, setSelectedDate] = useState(availableDates[0].value);
  const [selectedTime, setSelectedTime] = useState(availableTimes[0]);
  const [note, setNote] = useState('');

  const handleRequest = () => {
    const request = addBooking({
      serviceId: service.id,
      date: selectedDate,
      time: selectedTime,
      note: note.trim(),
      name: user ? user.name : 'Guest member',
    });

    Alert.alert(
      'Demo request saved',
      `${request.id} was saved on this device. No appointment has been sent or confirmed.`,
      [{ text: 'Done', onPress: () => navigation.goBack() }],
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 16, paddingBottom: 32 }} keyboardShouldPersistTaps="handled">
        <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" onPress={() => navigation.goBack()} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
          <Ionicons name="arrow-back" size={18} color="#24211E" />
        </TouchableOpacity>

        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.8 }}>ATELIER · FITTING REQUEST</Text>
        <Text style={{ color: '#1A1A1A', fontSize: 30, marginTop: 8 }}>{service.title}</Text>
        <Text style={{ color: '#777', fontSize: 12, lineHeight: 19, marginTop: 7 }}>{service.description}</Text>

        <View style={{ backgroundColor: '#F0E9DE', borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'flex-start', marginTop: 18, marginBottom: 23 }}>
          <Ionicons name="information-circle-outline" size={17} color="#8A6848" style={{ marginRight: 9, marginTop: 1 }} />
          <Text style={{ flex: 1, color: '#71695F', fontSize: 10, lineHeight: 16 }}>
            Choose a sample date and time. This creates a local demo request only; it is not an available appointment.
          </Text>
        </View>

        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginBottom: 11 }}>SELECT A SAMPLE DATE</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 6 }}>
          {availableDates.map((date) => {
            const selected = selectedDate === date.value;
            return (
              <TouchableOpacity
                key={date.value}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setSelectedDate(date.value)}
                style={{ width: 65, borderRadius: 12, borderWidth: 1, borderColor: selected ? '#4A2C29' : '#EEE8DF', backgroundColor: selected ? '#4A2C29' : '#FFFFFF', alignItems: 'center', paddingVertical: 11, marginRight: 8 }}
              >
                <Text style={{ color: selected ? '#D6B58E' : '#8A6848', fontSize: 9, fontWeight: '600' }}>{date.label}</Text>
                <Text style={{ color: selected ? '#FFFFFF' : '#24211E', fontSize: 19, marginTop: 4 }}>{date.day}</Text>
                <Text style={{ color: selected ? '#D0CBC4' : '#888', fontSize: 9, marginTop: 2 }}>{date.month}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginTop: 20, marginBottom: 11 }}>SELECT A SAMPLE TIME</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {availableTimes.map((time) => {
            const selected = selectedTime === time;
            return (
              <TouchableOpacity
                key={time}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                onPress={() => setSelectedTime(time)}
                style={{ width: '31%', minHeight: 42, borderRadius: 8, borderWidth: 1, borderColor: selected ? '#A67C52' : '#EEE8DF', backgroundColor: selected ? '#F5EFE6' : '#FFFFFF', alignItems: 'center', justifyContent: 'center', marginRight: '2%', marginBottom: 8 }}
              >
                <Text style={{ color: selected ? '#6A4D32' : '#625B52', fontSize: 10, fontWeight: selected ? '700' : '500' }}>{time}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginTop: 15, marginBottom: 8 }}>ANYTHING WE SHOULD KNOW?</Text>
        <TextInput
          multiline
          onChangeText={setNote}
          placeholder="Occasion, fit preferences, or questions (optional)"
          placeholderTextColor="#A39C92"
          style={{ minHeight: 92, borderRadius: 10, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#EEE8DF', padding: 13, color: '#24211E', textAlignVertical: 'top', fontSize: 12 }}
          value={note}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          accessibilityRole="button"
          onPress={handleRequest}
          style={{ minHeight: 49, borderRadius: 9, backgroundColor: '#4A2C29', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700', letterSpacing: 1 }}>SAVE DEMO REQUEST</Text>
          <Ionicons name="arrow-forward" size={15} color="#FFFFFF" style={{ marginLeft: 9 }} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
