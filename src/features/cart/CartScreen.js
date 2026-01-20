import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useRemoveFromCart, useCart } from '../../api/cartApi';
import CartItem from '../../components/CartItem';

export default function CartScreen() {
  const { data: response, isLoading, isError, refetch } = useCart();
  const { mutate: removeItem } = useRemoveFromCart();

  // 1. DATA MAPPING: Extracting from the nested response.data structure
  const cartItems = response?.data?.dataCart || [];
  const masterCart = response?.data?.masterCart || {};

  // 2. VALUES: Using real keys from your JSON log
  const subTotal = masterCart?.service_sub_total || '0.00';
  const finalTotal = masterCart?.final_total || '0.00';
  const convenienceFee = masterCart?.transportation_charge || '0.00';
  const tax = masterCart?.gst_charge || '0.00';

  const handleRemove = cartId => {
    removeItem({ cart_id: cartId });
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1A1D1E" />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text>Failed to load cart</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.retryBtn}>
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderEmptyCart = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="bag-handle-outline" size={80} color="#CBD5E1" />
      <Text style={styles.emptyTitle}>Your bag is empty</Text>
      <Text style={styles.emptySub}>
        Looks like you haven't added any services yet.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Bag</Text>
        <View style={styles.itemCountBadge}>
          <Text style={styles.itemCountText}>{cartItems.length} Items</Text>
        </View>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={item => item.cart_id}
        renderItem={({ item }) => (
          <CartItem item={item} onRemove={handleRemove} />
        )}
        contentContainerStyle={styles.listPadding}
        ListEmptyComponent={renderEmptyCart}
        ListFooterComponent={
          cartItems.length > 0 ? (
            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Price Details</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Service Subtotal</Text>
                <Text style={styles.summaryValue}>₹{finalTotal}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Taxes (GST)</Text>
                <Text style={styles.summaryValue}>₹{tax}</Text>
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Transportation Fee</Text>
                <Text
                  style={[
                    styles.summaryValue,
                    {
                      color:
                        Number(convenienceFee) === 0 ? '#10B981' : '#1A1D1E',
                    },
                  ]}
                >
                  {Number(convenienceFee) === 0 ? 'FREE' : `₹${convenienceFee}`}
                </Text>
              </View>

              <View style={styles.dashedLine} />

              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>₹{finalTotal}</Text>
              </View>
            </View>
          ) : null
        }
      />

      {/* Sticky Bottom Bar */}
      {cartItems.length > 0 && (
        <View style={styles.bottomBar}>
          <View>
            <Text style={styles.bottomPriceLabel}>Total Payable</Text>
            <Text style={styles.bottomPriceValue}>₹{finalTotal}</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutBtn}
            activeOpacity={0.8}
            onPress={() => {
              /* Navigate to Checkout */
            }}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FB' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, gap: 10 },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#1A1D1E' },
  itemCountBadge: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  itemCountText: { color: '#0284C7', fontSize: 12, fontWeight: '800' },
  listPadding: { paddingHorizontal: 20, paddingBottom: 120 },
  retryBtn: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#1A1D1E',
    borderRadius: 8,
  },
  retryText: { color: '#FFF' },
  summaryCard: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 20,
    marginTop: 10,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1A1D1E',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  summaryValue: { fontSize: 14, color: '#1A1D1E', fontWeight: '700' },
  dashedLine: {
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginVertical: 10,
  },
  totalLabel: { fontSize: 16, fontWeight: '800', color: '#1A1D1E' },
  totalValue: { fontSize: 18, fontWeight: '900', color: '#4F46E5' },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 25,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  bottomPriceLabel: { fontSize: 12, color: '#64748B', fontWeight: '600' },
  bottomPriceValue: { fontSize: 20, fontWeight: '900', color: '#1A1D1E' },
  checkoutBtn: {
    backgroundColor: '#1A1D1E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 18,
    gap: 8,
  },
  checkoutText: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1A1D1E',
    marginTop: 20,
  },
  emptySub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
});
