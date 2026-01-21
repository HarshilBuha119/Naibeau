import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  Share, // Import Share
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInUp, ZoomIn } from 'react-native-reanimated';
import { AuthContext } from '../../core/AuthContext';
import colors from '../../theme/colors';
import LogoutModal from '../../components/LogoutModal'

export default function ProfileScreen() {
  const { user, signOut } = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey! I'm inviting you to join Naibeau. Use my referral code: ${user?.referral_code} to get a discount on your first service!`,
      });
      if (result.action === Share.sharedAction) {
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const MenuOption = ({ icon, title, subtitle, onPress, color = '#1A1D1E' }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: color === '#1A1D1E' ? '#F1F5F9' : color + '15' }]}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <View style={styles.menuTextContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
    </TouchableOpacity>
  );

  return (
    // FIX: added edges to prevent the top gap shadow issue
    <SafeAreaView style={styles.safe} edges={['left', 'right', 'bottom']}>
      <StatusBar backgroundColor={'#FFF'} barStyle="dark-content" />

      {/* ScrollView now starts from the very top of the screen */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER SECTION */}
        <Animated.View entering={FadeInUp.duration(600)} style={styles.profileHeader}>
          {/* Added extra top padding for devices with notches since we removed SafeArea top edge */}
          <View style={{ height: 40 }} />

          <Animated.View entering={ZoomIn.delay(300)} style={styles.avatarWrapper}>
            <Image
              source={{ uri: user?.profile_pic || 'https://via.placeholder.com/110' }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userPhone}>+91 {user?.mobile}</Text>

          {/* STATS ROW */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user?.total_bookings || 0}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
              {user?.is_kyc_verified ? (
                <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              ) : (
                <Ionicons name="alert-circle-outline" size={20} color="red" />
              )}
              <Text style={styles.statLabel}>Verified</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </Animated.View>

        {/* REST OF CONTENT */}
        <Animated.View entering={FadeInUp.delay(400)} style={styles.section}>
          <Text style={styles.sectionLabel}>Account Settings</Text>
          <View style={styles.menuCard}>
            <MenuOption icon="person-outline" title="Edit Profile" subtitle="Name, Email & Gender" />
            <MenuOption icon="location-outline" title="My Addresses" subtitle="Manage locations" />
            <MenuOption icon="card-outline" title="Payments" subtitle="UPI & Cards" />
          </View>
        </Animated.View>

        {/* REFERRAL SECTION */}
        <Animated.View entering={FadeInUp.delay(500)} style={styles.section}>
          <Text style={styles.sectionLabel}>Refer & Earn</Text>
          <TouchableOpacity
            style={styles.referralCard}
            onPress={onShare} // Click the card to share
            activeOpacity={0.8}
          >
            <View>
              <Text style={styles.referralTitle}>Invite Friends</Text>
              <Text style={styles.referralCodeText}>
                Code: <Text style={{ color: colors.primary }}>{user?.referral_code}</Text>
              </Text>
            </View>
            <Ionicons name="share-social" size={24} color={colors.primary} />
          </TouchableOpacity>
        </Animated.View>

        {/* SUPPORT & LOGOUT */}
        <Animated.View entering={FadeInUp.delay(600)} style={styles.section}>
          <Text style={styles.sectionLabel}>More</Text>
          <View style={styles.menuCard}>
            <MenuOption icon="help-circle-outline" title="Help Center" />
            <MenuOption icon="log-out-outline" title="Logout" color="#FF3B30" onPress={handleLogout} />
          </View>
        </Animated.View>

        <Text style={styles.versionText}>Version 1.0.2 (2026)</Text>

        {/* Padding for Bottom Tab Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
      <LogoutModal
      visible={modalVisible}
      onCancel={() => setModalVisible(false)}
      onConfirm={() => {
        setModalVisible(false);
        signOut();
      }}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FB' },
  scrollContent: {
    flexGrow: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingBottom: 30, // Removed top padding here to handle manually
    backgroundColor: '#FFF',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    elevation: 8, // Slightly higher elevation for "Mind Blowing" feel
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    zIndex: 10,
  },
  // ... (keep the rest of your styles exactly as they are)
  avatarWrapper: { position: 'relative', marginBottom: 15 },
  avatar: { width: 110, height: 110, borderRadius: 55, backgroundColor: '#F1F5F9' },
  editBadge: { position: 'absolute', bottom: 5, right: 5, backgroundColor: colors.primary, width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: '#FFF' },
  userName: { fontSize: 24, fontWeight: '900', color: '#1A1D1E' },
  userPhone: { fontSize: 14, color: '#64748B', fontWeight: '600', marginTop: 4 },
  statsRow: { flexDirection: 'row', marginTop: 25, width: '90%', backgroundColor: '#F8F9FB', borderRadius: 20, paddingVertical: 15 },
  statBox: { flex: 1, alignItems: 'center' },
  statBorder: { borderLeftWidth: 1, borderRightWidth: 1, borderColor: '#E2E8F0' },
  statNumber: { fontSize: 18, fontWeight: '800', color: '#1A1D1E' },
  statLabel: { fontSize: 12, color: '#64748B', fontWeight: '600', marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 25 },
  sectionLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', marginBottom: 12, marginLeft: 5 },
  menuCard: { backgroundColor: '#FFF', borderRadius: 24, paddingVertical: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuTextContent: { flex: 1, marginLeft: 15 },
  menuTitle: { fontSize: 15, fontWeight: '700', color: '#1A1D1E' },
  menuSubtitle: { fontSize: 12, color: '#94A3B8', marginTop: 2 },
  referralCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: colors.primary + '50' },
  referralTitle: { fontSize: 16, fontWeight: '800', color: '#1A1D1E' },
  referralCodeText: { fontSize: 14, fontWeight: '600', color: '#64748B', marginTop: 4 },
  versionText: { textAlign: 'center', color: '#CBD5E1', fontSize: 12, marginVertical: 30, fontWeight: '600' },
});