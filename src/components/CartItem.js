import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

const CartItem = ({ item, onRemove }) => {
  const { service, partnerServiceRate, qty } = item;
  const image = service?.image || 'https://via.placeholder.com/150';

  return (
    <View style={itemStyles.container}>
      <Image source={{ uri: image }} style={itemStyles.image} />
      
      <View style={itemStyles.content}>
        <View style={itemStyles.headerRow}>
          <Text style={itemStyles.title} numberOfLines={1}>{service?.name}</Text>
          <TouchableOpacity onPress={() => onRemove(item.cart_id)}>
            <Ionicons name="trash-outline" size={18} color="#FF3B30" />
          </TouchableOpacity>
        </View>

        <Text style={itemStyles.productName}>{partnerServiceRate?.product?.name}</Text>

        <View style={itemStyles.footer}>
          <Text style={itemStyles.price}>₹{partnerServiceRate?.final_price}</Text>
          <View style={itemStyles.qtyBadge}>
            <Text style={itemStyles.qtyText}>Qty: {qty}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default CartItem
const itemStyles = StyleSheet.create({
  container: { backgroundColor: '#FFF', borderRadius: 20, padding: 12, flexDirection: 'row', marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
  image: { width: 80, height: 80, borderRadius: 15, backgroundColor: '#F1F5F9' },
  content: { flex: 1, marginLeft: 15, justifyContent: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 15, fontWeight: '800', color: colors.text, flex: 1 },
  productName: { fontSize: 12, color: colors.textMuted, marginTop: 2 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 },
  price: { fontSize: 16, fontWeight: '900', color: colors.primary },
  qtyBadge: { backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  qtyText: { fontSize: 12, fontWeight: '700', color: colors.text },
});