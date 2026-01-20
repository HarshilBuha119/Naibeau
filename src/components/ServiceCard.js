import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';
import { useAddToCart } from '../api/cartApi'; 

export default function ServiceCard({ item }) {
  const { service, partner, final_price, price, off, avg_service_rating } = item;

  const { mutate: addToCart, isPending } = useAddToCart();

  const image =
    item.product?.images?.[0] ||
    service?.image ||
    'https://via.placeholder.com/400x400.png?text=Service';

  const rating = Number(avg_service_rating || 0).toFixed(1);
  const hasDiscount = Number(off) > 0;

  const handleAddToCart = () => {
    const payload = {
      is_replace: true, 
      service_id: service?.service_id || item.service_id,
    };

    addToCart(payload, {
      onSuccess: (data) => {
        console.log('Successfully added to cart:', data);
      },
      onError: (error) => {
        console.error('Error adding to cart:', error);
      },
    });
  };

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        {hasDiscount && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountLabel}>{off}% OFF</Text>
          </View>
        )}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>

      <View style={styles.rightContent}>
        <View>
          <Text style={styles.categoryText}>
            {service?.category?.name?.toUpperCase() || 'SERVICE'}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {service?.name}
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.metaBadge}>
              <Ionicons name="time-outline" size={12} color={colors.textMuted} />
              <Text style={styles.metaText}>{service?.display_time}</Text>
            </View>
            <View style={[styles.metaBadge, { marginLeft: 8 }]}>
              <Ionicons
                name="shield-checkmark-outline"
                size={12}
                color={colors.primary}
              />
              <Text style={styles.metaText} numberOfLines={1}>
                {partner?.name}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <Text style={styles.finalPrice}>₹{final_price}</Text>
            {hasDiscount && <Text style={styles.oldPrice}>₹{price}</Text>}
          </View>

          <TouchableOpacity
            style={[styles.addBtn, isPending && styles.disabledBtn]}
            onPress={handleAddToCart}
            disabled={isPending}
            activeOpacity={0.7}
          >
            {isPending ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <>
                <Ionicons name="add" size={18} color={colors.white} />
                <Text style={styles.addBtnText}>Add</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 24,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: { elevation: 4 },
    }),
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 115,
    height: 140,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  discountLabel: { color: colors.white, fontSize: 10, fontWeight: '900' },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.95)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 3,
  },
  ratingText: { fontSize: 11, fontWeight: 'bold', color: '#000' },
  rightContent: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F8F9FB',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },
  metaText: { fontSize: 11, color: colors.textMuted, fontWeight: '600' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  finalPrice: { fontSize: 20, fontWeight: '900', color: colors.text },
  oldPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
  },
  addBtn: {
    backgroundColor: '#1A1D1E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    gap: 4,
    minWidth: 80,
  },
  disabledBtn: {
    opacity: 0.8,
    backgroundColor: colors.textMuted,
  },
  addBtnText: { color: colors.white, fontWeight: '800', fontSize: 14 },
})