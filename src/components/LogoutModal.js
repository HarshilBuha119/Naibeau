import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown,BounceIn, BounceInDown, ReduceMotion } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function LogoutModal({ visible, onCancel, onConfirm }) {
  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.overlay}>
        {/* Backdrop Fade */}
        <Animated.View 
          entering={FadeIn} 
          exiting={FadeOut} 
          style={styles.backdrop} 
        />

        {/* Modal Card */}
        <Animated.View 
          entering={BounceInDown.duration(2000)
  .delay(500)
  .randomDelay()
  .reduceMotion(ReduceMotion.Never)
  .withInitialValues({ transform: [{ translateY: -500 }] })}
          style={styles.modalCard}
        >
          <View style={styles.indicator} />
          
          <View style={styles.iconCircle}>
            <Ionicons name="log-out" size={32} color="#FF3B30" />
          </View>

          <Text style={styles.title}>Logging Out?</Text>
          <Text style={styles.subtitle}>
            Are you sure you want to log out? You'll need to sign in again to book your next service.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.cancelBtn} 
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.logoutBtn} 
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(26, 29, 30, 0.7)', // Deep charcoal translucent
  },
  modalCard: {
    width: width,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingHorizontal: 25,
    paddingTop: 15,
    paddingBottom: 40,
    alignItems: 'center',
    elevation: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  indicator: {
    width: 40,
    height: 5,
    backgroundColor: '#E2E8F0',
    borderRadius: 10,
    marginBottom: 25,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FF3B3015',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    color: '#1A1D1E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  cancelBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#64748B',
  },
  logoutBtn: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFF',
  },
});