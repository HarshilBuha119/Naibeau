import React, { useMemo } from 'react';
import { 
  View, 
  FlatList, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useServices } from '../../api/serviceListApi';
import ServiceCard from '../../components/ServiceCard';
import Loader from '../../components/Loader';
import colors from '../../theme/colors';

export default function PartnerServicesScreen() {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { partnerId, partnerName } = params;

  const { data: services = [], isLoading } = useServices();

  const filteredServices = useMemo(() => {
    return services.filter(item => item.partner.user_id === partnerId);
  }, [services, partnerId]);

  const partnerInfo = filteredServices[0]?.partner;

  const renderHeader = () => (
    <View style={styles.profileSection}>
      <Text style={styles.brandTag}>Professional Artist</Text>
      <Text style={styles.title}>{partnerName}</Text>
      
      {/* STATS ROW */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Ionicons name="star" size={16} color="#FACC15" />
          <Text style={styles.statValue}>
            {filteredServices[0]?.avg_service_rating || '4.8'}
          </Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <Ionicons name="briefcase-outline" size={16} color={colors.primary} />
          <Text style={styles.statValue}>{filteredServices.length}</Text>
          <Text style={styles.statLabel}>Services</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.statBox}>
          <Ionicons name="checkmark" size={16} color="#10B981" />
          <Text style={styles.statValue}>Verified</Text>
          <Text style={styles.statLabel}>Status</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <Ionicons name="location-outline" size={14} color={colors.textMuted} />
        <Text style={styles.locationText}>{partnerInfo?.address || 'Available at Salon & Home'}</Text>
      </View>

      <Text style={styles.menuTitle}>Service Menu</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* CUSTOM NAV BAR */}
      <View style={styles.navBar}>
        <TouchableOpacity 
          style={styles.backBtn} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareBtn}>
          <Ionicons name="share-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <Loader visible={isLoading} />

      <FlatList
        data={filteredServices}
        keyExtractor={item => item.partner_service_rate_id?.toString()}
        contentContainerStyle={styles.list}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <ServiceCard 
            item={item} 
            onAdd={(item) => console.log('Added:', item.service.name)} 
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar-outline" size={60} color="#E2E8F0" />
              <Text style={styles.empty}>No services available right now</Text>
            </View>
          )
        }
      />
      
      {/* FLOATING ACTION BUTTON FOR CONTACT (OPTIONAL) */}
      <TouchableOpacity style={styles.fab}>
        <Ionicons name="chatbubble-ellipses" size={24} color={colors.white} />
        <Text style={styles.fabText}>Inquiry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 4 },
      android: { elevation: 3 }
    })
  },
  shareBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  brandTag: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#F1F5F9',
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 25,
  },
  locationText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 10,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  empty: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
    marginTop: 15,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 30,
    gap: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  fabText: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 15,
  },
});