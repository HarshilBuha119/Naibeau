import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useServices } from '../../api/serviceListApi';
import ServiceCard from '../../components/ServiceCard';
import Loader from '../../components/Loader';
import colors from '../../theme/colors';

export default function CategoryServicesScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { categoryId, categoryName } = params;

  const [search, setSearch] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [minRating, setMinRating] = useState(0);

  const { data: services = [], isLoading } = useServices();

  const filteredData = useMemo(() => {
    let result = services.filter(item => {
      const inCategory = item?.service?.category?.category_id === categoryId;
      const matchesSearch = item?.service?.name?.toLowerCase().includes(search.toLowerCase());
      const matchesRating = Number(item.avg_service_rating || 0) >= minRating;
      return inCategory && matchesSearch && matchesRating;
    });

    if (sortBy === 'low') result.sort((a, b) => a.final_price - b.final_price);
    if (sortBy === 'high') result.sort((a, b) => b.final_price - a.final_price);

    return result;
  }, [services, categoryId, search, sortBy, minRating]);

  return (
    <SafeAreaView style={styles.safe}>
      {/* MODERN HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>{categoryName}</Text>
          <Text style={styles.headerSubtitle}>{filteredData.length} available</Text>
        </View>

        <TouchableOpacity 
          style={[styles.iconBtn, sortBy !== 'popular' && styles.activeFilterBtn]} 
          onPress={() => setModalVisible(true)}
        >
          <Ionicons 
            name="options-outline" 
            size={22} 
            color={sortBy !== 'popular' ? colors.white : colors.text} 
          />
        </TouchableOpacity>
      </View>

      {/* SEARCH SECTION */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <TextInput
            placeholder="Search services..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* LIST CONTENT */}
      <View style={styles.listContainer}>
        <Loader visible={isLoading} />
        
        <FlatList
          data={filteredData}
          keyExtractor={item => item.partner_service_rate_id?.toString()}
          renderItem={({ item }) => (
            <ServiceCard item={item} onAdd={(item) => console.log("Added:", item.service.name)} />
          )}
          contentContainerStyle={styles.listPadding}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={!isLoading && (
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={60} color="#CBD5E1" />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptyText}>Try adjusting your filters or search term.</Text>
            </View>
          )}
        />
      </View>

      {/* FILTER MODAL */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHandle} />
            <Text style={styles.modalTitle}>Sort & Filter</Text>

            <Text style={styles.sectionLabel}>Price Sorting</Text>
            <View style={styles.filterOptions}>
              {[
                { id: 'popular', label: 'Recommended', icon: 'star-outline' },
                { id: 'low', label: 'Price: Low to High', icon: 'arrow-down-outline' },
                { id: 'high', label: 'Price: High to Low', icon: 'arrow-up-outline' },
              ].map(opt => (
                <TouchableOpacity 
                  key={opt.id}
                  style={[styles.optRow, sortBy === opt.id && styles.optActive]}
                  onPress={() => setSortBy(opt.id)}
                >
                  <Ionicons name={opt.icon} size={20} color={sortBy === opt.id ? colors.primary : colors.text} />
                  <Text style={[styles.optText, sortBy === opt.id && styles.optTextActive]}>{opt.label}</Text>
                  {sortBy === opt.id && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.sectionLabel, { marginTop: 24 }]}>Minimum Rating</Text>
            <View style={styles.ratingRow}>
              {[0, 4, 3].map(val => (
                <TouchableOpacity 
                  key={val}
                  style={[styles.ratingPill, minRating === val && styles.pillActive]}
                  onPress={() => setMinRating(val)}
                >
                  <Text style={[styles.pillText, minRating === val && styles.pillTextActive]}>
                    {val === 0 ? 'All' : `${val}★ & up`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.applyBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FB' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeFilterBtn: { backgroundColor: colors.primary },
  headerCenter: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: colors.text },
  headerSubtitle: { fontSize: 12, color: colors.textMuted, fontWeight: '600' },
  searchSection: { padding: 16 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    height: 52,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, fontWeight: '600', color: colors.text },
  listContainer: { flex: 1 },
  listPadding: { paddingHorizontal: 16, paddingBottom: 40 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalSheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
  },
  modalHandle: { width: 40, height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, alignSelf: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: '900', color: colors.text, marginBottom: 24 },
  sectionLabel: { fontSize: 14, fontWeight: '800', color: colors.textMuted, textTransform: 'uppercase', marginBottom: 12 },
  optRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    backgroundColor: '#F8F9FB',
  },
  optActive: { backgroundColor: '#EEF2FF', borderWidth: 1, borderColor: colors.primary },
  optText: { flex: 1, marginLeft: 12, fontSize: 16, fontWeight: '600', color: colors.text },
  optTextActive: { color: colors.primary, fontWeight: '800' },
  ratingRow: { flexDirection: 'row', gap: 12 },
  ratingPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#F8F9FB',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  pillText: { fontWeight: '700', color: colors.text },
  pillTextActive: { color: colors.white },
  applyBtn: {
    backgroundColor: '#1A1D1E',
    height: 56,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  applyBtnText: { color: colors.white, fontSize: 16, fontWeight: '800' },
  emptyContainer: { alignItems: 'center', marginTop: 100 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: colors.text, marginTop: 16 },
  emptyText: { color: colors.textMuted, textAlign: 'center', marginTop: 8, paddingHorizontal: 40 },
})