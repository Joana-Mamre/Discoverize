import { ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const values = [
  {
    icon: 'sparkles-outline',
    title: 'Thoughtful design',
    description: 'Considered silhouettes and timeless details, made to feel at home in your wardrobe.',
  },
  {
    icon: 'hand-left-outline',
    title: 'Personal service',
    description: 'A more personal approach to discovering pieces, finding your fit, and building your style.',
  },
  {
    icon: 'leaf-outline',
    title: 'Made to be kept',
    description: 'We believe in choosing well and caring for the pieces you return to season after season.',
  },
];

export default function AboutScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#FAF7F2' }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 22, paddingTop: 24, paddingBottom: 36 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 22 }}>
          <Text style={{ color: '#A67C52', fontSize: 10, fontWeight: '700', letterSpacing: 2 }}>
            ATELIER
          </Text>
          <Text style={{ color: '#1A1A1A', fontSize: 30, marginTop: 8 }}>
            A wardrobe with intention.
          </Text>
          <Text style={{ color: '#777', fontSize: 13, lineHeight: 20, marginTop: 8 }}>
            Thoughtful clothing, personal service, and a little more meaning in what you wear.
          </Text>
        </View>

        <View style={{ backgroundColor: '#4A2C29', borderRadius: 18, padding: 22, marginBottom: 26 }}>
          <Text style={{ color: '#D6B58E', fontSize: 10, fontWeight: '700', letterSpacing: 1.8, marginBottom: 12 }}>
            OUR STORY
          </Text>
          <Text style={{ color: '#FFF', fontSize: 23, lineHeight: 31, marginBottom: 12 }}>
            Style should feel like your own.
          </Text>
          <Text style={{ color: '#D0CBC4', fontSize: 13, lineHeight: 21 }}>
            Atelier is a considered destination for clothing that brings together lasting style and
            everyday ease. We make space for you to explore, find your fit, and choose pieces that
            feel right for your life.
          </Text>
        </View>

        <View style={{ marginBottom: 26 }}>
          <Text style={{ color: '#1A1A1A', fontSize: 21, marginBottom: 8 }}>
            What we believe
          </Text>
          <Text style={{ color: '#777', fontSize: 12, lineHeight: 19, marginBottom: 14 }}>
            A good wardrobe is personal. It is built over time, with care and confidence.
          </Text>

          {values.map((value, index) => (
            <View
              key={value.title}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                backgroundColor: '#FFF',
                borderWidth: 1,
                borderColor: '#EEE8DF',
                borderRadius: 14,
                padding: 16,
                marginBottom: index === values.length - 1 ? 0 : 10,
              }}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 19,
                  backgroundColor: '#F7F3ED',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 13,
                }}
              >
                <Ionicons name={value.icon} size={18} color="#8A6848" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#24211E', fontSize: 13, fontWeight: '600', marginBottom: 5 }}>
                  {value.title}
                </Text>
                <Text style={{ color: '#777', fontSize: 12, lineHeight: 18 }}>
                  {value.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View
          style={{
            backgroundColor: '#F0E9DE',
            borderRadius: 16,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#8A6848" style={{ marginRight: 12, marginTop: 1 }} />
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#1A1A1A', fontSize: 15, fontWeight: '600', marginBottom: 6 }}>
              Here for your next chapter
            </Text>
            <Text style={{ color: '#665D53', fontSize: 12, lineHeight: 19 }}>
              Need help choosing a piece or finding the right fit? Our team is here to help make
              your Atelier experience feel personal.
            </Text>
          </View>
        </View>

        <Text style={{ color: '#999', fontSize: 10, textAlign: 'center', marginTop: 26, letterSpacing: 0.5 }}>
          ATELIER · THOUGHTFULLY CONSIDERED
        </Text>
      </ScrollView>
    </View>
  );
}
