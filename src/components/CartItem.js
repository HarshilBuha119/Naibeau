import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

const CartItem = ({ item, onRemove }) => {
  // 1. Correct Mapping based on your console log
  // service object contains: name, image
  // final_amount contains the price
  // ProductsRates[0] contains the product details
  const serviceName = item.service?.name || 'Service';
  const serviceImage = item.service?.image || 'https://via.placeholder.com/150';
  const price = item.final_amount || '0';
  const oldPrice = item.original_amount;
  const qty = item.qty || 1;

  // Grab the product name from ProductsRates if available
  const productName = item.ProductsRates?.[0]?.name || "Standard Package";

  return (
    <View style={itemStyles.container}>
      {/* Service Image */}
      <Image source={{ uri: serviceImage }} style={itemStyles.image} resizeMode='center' progressiveRenderingEnabled={true} />

      <View style={itemStyles.content}>
        <View style={itemStyles.headerRow}>
          <Text style={itemStyles.title} numberOfLines={1}>
            {serviceName}
          </Text>

          {/* Delete Button */}
          <TouchableOpacity onPress={() => onRemove(item.cart_id)}>
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        {/* Product Name (e.g. RICA Wax, etc) */}
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
            <Text style={itemStyles.metaText} numberOfLines={2}>
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
  image: { width: 100, height: 100, borderRadius: 15, backgroundColor: '#F1F5F9' },
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