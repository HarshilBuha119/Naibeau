import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

export default function PartnerCard({ item, onPress }) {
  const image = item.profile_pic?.length > 0 ? item.profile_pic : 'https://play-lh.googleusercontent.com/NgXxhCeJtedFTCiK24tfRXbJQhdMBWFymWiUCFSoq2j3Xom0AAaqmdTVHaRUcHlgGd7TBvdXgLn_jhpJK-ktkA=w480-h960-rw';
  const rating = Number(item.avg_rating || 0).toFixed(1);

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={() => onPress?.(item)}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.glassRating}>
          <Ionicons name="star" size={10} color="#FFC107" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        {item.discount_percentage > 0 && (
          <View style={styles.promoBadge}>
            <Text style={styles.promoText}>-{item.discount_percentage}%</Text>
          </View>
        )}
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={12} color={colors.primary} />
          <Text style={styles.locationText} numberOfLines={1}>{item.address || 'Local'}</Text>
        </View>
        <View style={styles.tagWrapper}>
            <Text style={styles.skillTag}>{item.skill}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flex: 0.5, backgroundColor: '#FFF', borderRadius: 24, margin: 8, padding: 8, elevation: 5, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  imageContainer: { height: 180, borderRadius: 18, overflow: 'hidden', position: 'relative' },
  image: { width: '100%', height: '100%' },
  glassRating: { position: 'absolute', bottom: 6, right: 6, backgroundColor: 'rgba(255,255,255,0.9)', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { fontSize: 10, fontWeight: '900', color: '#000' },
  promoBadge: { position: 'absolute', top: 6, left: 6, backgroundColor: '#FF3B30', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 8 },
  promoText: { color: '#FFF', fontSize: 10, fontWeight: '900' },
  cardInfo: { paddingVertical: 8, paddingHorizontal: 4 },
  name: { fontSize: 15, fontWeight: '800', color: '#1A1D1E' },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 4 },
  locationText: { fontSize: 11, color: colors.textMuted, fontWeight: '500' },
  tagWrapper: { marginTop: 8, backgroundColor: '#F1F5F9', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  skillTag: { fontSize: 10, color: colors.primary, fontWeight: '700', textTransform: 'uppercase' }
});
