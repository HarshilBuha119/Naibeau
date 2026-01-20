import React, { useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MotiView } from 'moti';
import { AuthContext } from '../../core/AuthContext';
import colors from '../../theme/colors';

export default function ProfileScreen() {
  const { user, signOut } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to leave?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: signOut }
    ]);
  };

  const MenuOption = ({ icon, title, subtitle, onPress, color = colors.text }) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress} activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: color + '10' }]}>
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
    <SafeAreaView style={styles.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        <MotiView 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={styles.profileHeader}
        >
          <View style={styles.avatarWrapper}>
            <Image 
              source={{ uri: user?.profile_pic || 'https://ui-avatars.com/api/?name=' + user?.name + '&background=random' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editBadge}>
              <Ionicons name="camera" size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'Guest User'}</Text>
          <Text style={styles.userPhone}>+91 {user?.mobile}</Text>
          
          {/* STATS ROW */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{user?.total_bookings || 0}</Text>
              <Text style={styles.statLabel}>Bookings</Text>
            </View>
            <View style={[styles.statBox, styles.statBorder]}>
              <Text style={styles.statNumber}>₹0</Text>
              <Text style={styles.statLabel}>Spent</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>4.9</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
          </View>
        </MotiView>

        {/* ACCOUNT SETTINGS */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Account Settings</Text>
          <View style={styles.menuCard}>
            <MenuOption icon="person-outline" title="Edit Profile" subtitle="Name, Email & Gender" />
            <MenuOption icon="location-outline" title="My Addresses" subtitle="Manage your service locations" />
            <MenuOption icon="card-outline" title="Payments" subtitle="UPI, Cards & Wallets" />
          </View>
        </View>

        {/* REFERRAL SECTION */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Refer & Earn</Text>
          <TouchableOpacity style={styles.referralCard}>
             <View>
                <Text style={styles.referralTitle}>Invite Friends</Text>
                <Text style={styles.referralCodeText}>Code: <Text style={{color: colors.primary}}>{user?.referral_code}</Text></Text>
             </View>
             <Ionicons name="share-social" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* SUPPORT & LOGOUT */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>More</Text>
          <View style={styles.menuCard}>
            <MenuOption icon="help-circle-outline" title="Help Center" />
            <MenuOption icon="shield-checkmark-outline" title="Privacy Policy" />
            <MenuOption 
               icon="log-out-outline" 
               title="Logout" 
               color="#FF3B30" 
               onPress={handleLogout} 
            />
          </View>
        </View>

        <Text style={styles.versionText}>Version 1.0.2 (2026)</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F8F9FB' },
  profileHeader: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#FFF', borderBottomLeftRadius: 40, borderBottomRightRadius: 40, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10 },
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
  menuCard: { backgroundColor: '#FFF', borderRadius: 24, paddingVertical: 10, elevation: 1, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 10 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 12 },
  iconContainer: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  menuTextContent: { flex: 1, marginLeft: 15 },
  menuTitle: { fontSize: 15, fontWeight: '700', color: '#1A1D1E' },
  menuSubtitle: { fontSize: 12, color: '#94A3B8', marginTop: 2 },

  referralCard: { backgroundColor: '#FFF', borderRadius: 24, padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: colors.primary + '50' },
  referralTitle: { fontSize: 16, fontWeight: '800', color: '#1A1D1E' },
  referralCodeText: { fontSize: 14, fontWeight: '600', color: '#64748B', marginTop: 4 },
  
  versionText: { textAlign: 'center', color: '#CBD5E1', fontSize: 12, marginVertical: 30, fontWeight: '600' }
});