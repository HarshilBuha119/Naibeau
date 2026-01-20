import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, StatusBar, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInUp, FadeInRight, Layout } from 'react-native-reanimated';

import PartnerCard from '../../components/PartnerCard';
import CategoryItem from '../../components/CategoryItem';
import { useDashboard } from '../../api/dashBoardApi';
import colors from '../../theme/colors';

// 1. Optimized Skeleton (Using simple Animated views)
const LoadingSkeleton = React.memo(() => (
  <View style={styles.skeletonContainer}>
    {[1, 2, 3, 4].map((i) => (
      <Animated.View 
        key={i} 
        entering={FadeInUp.delay(i * 100)}
        style={styles.skeletonItem}
      />
    ))}
  </View>
));

export default function ServicesScreen() {
  const navigation = useNavigation();
  const { data: dashboardData, isLoading } = useDashboard();
  const [search, setSearch] = useState('');

  const subcategories = dashboardData?.data?.subcategories ?? [];
  const partners = dashboardData?.data?.finalData ?? [];

  const filteredPartners = useMemo(() => {
    return partners.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [partners, search]);

  const handlePartnerPress = useCallback((partner) => {
    navigation.navigate('PartnerServices', { 
      partnerId: partner.user_id, 
      partnerName: partner.name 
    });
  }, [navigation]);

  // 2. Extracted Header for better performance
  const renderHeader = () => (
    <>
      <Animated.View entering={FadeInUp.delay(200)} style={styles.searchWrapper}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color={colors.textMuted} />
          <TextInput
            placeholder="Search specialists, salons..."
            placeholderTextColor={colors.textMuted}
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </Animated.View>

      <Text style={styles.sectionTitle}>Explore Categories</Text>
      <ScrollView bounces={false}  horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryContent}>
        {subcategories.map((item, index) => (
          <Animated.View key={item.category_id} entering={FadeInRight.delay(300 + (index * 100))}>
            <CategoryItem
              item={item}
              isSelected={false}
              onPress={() => navigation.navigate('CategoryServices', { 
                categoryId: item.category_id, 
                categoryName: item.name 
              })}
            />
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Top Rated Partners</Text>
      </View>
    </>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FB" />

      {/* Profile Header */}
      <View style={styles.header}>
        <Animated.View entering={FadeInUp}>
          <Text style={styles.welcomeText}>Hello, Gorgeous ✨</Text>
          <Text style={styles.brand}>
            <Text style={{ color: '#000' }}>nai</Text>
            <Text style={{ color: colors.primary }}>beau</Text>
          </Text>
        </Animated.View>
        <TouchableOpacity style={styles.profileBtn} onPress={()=>navigation.navigate("Profile")}>
          <Ionicons name="person" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={isLoading ? [] : filteredPartners}
        keyExtractor={item => item.user_id}
        numColumns={2}
        renderItem={({ item, index }) => (
          <Animated.View 
            entering={FadeInUp.delay(100 * (index % 4))} 
            layout={Layout.springify()} // Smooth moving when filtering
            style={{ flex: 0.5 }}
          >
            <PartnerCard item={item} onPress={handlePartnerPress} />
          </Animated.View>
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={isLoading ? <LoadingSkeleton /> : (
            <View style={styles.empty}><Text>No partners found</Text></View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FB' },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  welcomeText: { fontSize: 13, fontWeight: '600', color: colors.textMuted },
  brand: { fontSize: 28, fontWeight: '900' },
  profileBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', elevation: 2 },
  searchWrapper: { paddingHorizontal: 20, marginBottom: 10 },
  searchBox: { backgroundColor: '#FFF', borderRadius: 18, paddingLeft: 15, height: 56, flexDirection: 'row', alignItems: 'center', elevation: 4 },
  searchInput: { flex: 1, fontSize: 15, marginLeft: 10, color: '#1A1D1E' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { paddingHorizontal: 20, fontSize: 19, fontWeight: '900', color: '#1A1D1E', marginTop: 20, marginBottom: 12 },
  viewAll: { color: colors.primary, fontWeight: '700', fontSize: 13, marginTop: 10, paddingRight: 20 },
  categoryContent: { paddingLeft: 20, paddingBottom: 10 },
  list: { paddingBottom: 100 },
  skeletonContainer: { paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  skeletonItem: { width: '47%', height: 220, backgroundColor: '#E2E8F0', borderRadius: 24, marginBottom: 20 },
  empty: { alignItems: 'center', marginTop: 50 }
});