import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

const CartItem = ({ item, onRemove }) => {
  const [imgLoading, setImgLoading] = useState(true);

  const serviceName = item.service?.name || 'Service';
  const serviceImage = item.service?.image || 'https://via.placeholder.com/150';
  const price = item.final_amount || '0';
  const oldPrice = item.original_amount;
  const qty = item.qty || 1;

  const productName = item.ProductsRates?.[0]?.name || "Standard Package";

  return (
    <View style={itemStyles.container}>
      {/* IMAGE SECTION WITH LOADER */}
      <View style={itemStyles.imageWrapper}>
        {imgLoading && (
          <View style={itemStyles.loaderContainer}>
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
        <Image 
          source={{ uri: serviceImage }} 
          style={itemStyles.image} 
          resizeMode='cover' 
          onLoadEnd={() => setImgLoading(false)}
        />
      </View>

      <View style={itemStyles.content}>
        <View style={itemStyles.headerRow}>
          <Text style={itemStyles.title} numberOfLines={1}>
            {serviceName}
          </Text>

          <TouchableOpacity 
            onPress={() => onRemove(item.cart_id)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} // Easier to click
          >
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <Text style={itemStyles.productName} numberOfLines={1}>
          {productName}
        </Text>

        <View style={itemStyles.infoRow}>
          <View style={itemStyles.metaBadge}>
            <Ionicons name="time-outline" size={12} color={colors.textMuted} />
            <Text style={itemStyles.metaText}>{item.duration || '15 min'}</Text>
          </View>
          <View style={[itemStyles.metaBadge, { marginLeft: 8 }]}>
            <Ionicons name="shield-checkmark-outline" size={12} color={colors.primary} />
            <Text style={itemStyles.metaText} numberOfLines={1}>
              {item.partner_name || 'Professional'}
            </Text>
          </View>
        </View>

        <View style={itemStyles.footer}>
          <View style={itemStyles.priceContainer}>
            <Text style={itemStyles.price}>₹{price}</Text>
            {oldPrice && oldPrice !== price && (
              <Text style={itemStyles.oldPrice}>₹{oldPrice}</Text>
            )}
          </View>

          <View style={itemStyles.qtyBadge}>
            <Text style={itemStyles.qtyText}>Qty: {qty}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

const itemStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#F1F5F9',
    overflow: 'hidden',
    position: 'relative',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  image: { 
    width: '100%', 
    height: '100%', 
  },
  content: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 15, fontWeight: '800', color: colors.text, flex: 1 },
  productName: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  infoRow: { flexDirection: 'row', marginTop: 8, alignItems: 'center' },
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
    marginTop: 10
  },
  priceContainer: { flexDirection: 'row', alignItems: 'center' },
  price: { fontSize: 16, fontWeight: '900', color: colors.primary },
  oldPrice: {
    fontSize: 12,
    color: colors.textMuted,
    textDecorationLine: 'line-through',
    marginLeft: 6
  },
  qtyBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  qtyText: { fontSize: 12, fontWeight: '700', color: colors.text },
});