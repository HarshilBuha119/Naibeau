import React, { useContext, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import OtpInputs from 'react-native-otp-inputs';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { AuthContext } from '../../core/AuthContext';
import colors from '../../theme/colors';
import { useLoginOtp, useVerifyOtp } from '../../api/authApi';

export default function LoginScreen({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const otpRef = useRef(null);

  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const sendOtp = useLoginOtp();
  const verifyOtp = useVerifyOtp();

  const loading = sendOtp.isPending || verifyOtp.isPending;

  /* -------- OTP HANDLER -------- */
  const handleOtpChange = code => {
    const cleaned = code.replace(/\D/g, '');
    requestAnimationFrame(() => {
      setOtp(cleaned);
    });
  };

  /* -------- SEND OTP -------- */
  const handleSendOtp = () => {
    if (mobile.length !== 10) {
      Alert.alert('Invalid Mobile', 'Enter a valid 10 digit mobile number');
      return;
    }

    sendOtp.mutate(
      { mobile },
      {
        onSuccess: () => setShowOtp(true),
        onError: err =>
          Alert.alert('Failed', err.message || 'Unable to send OTP'),
      },
    );
  };

  /* -------- VERIFY OTP -------- */
  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter 4 digit OTP');
      return;
    }

    verifyOtp.mutate(
      { mobile, otp, fcm: '' },
      {
        onSuccess: response => {
          const userData = response.data || response;

          // Add validation to prevent crashes
          if (!userData || !userData.user_id) {
            Alert.alert('Error', 'Invalid response from server');
            return;
          }

          signIn({
            token: userData.access_token,
            user: {
              user_id: userData.user_id,
              name: userData.name,
              mobile: userData.mobile,
              email: userData.email,
              profile_pic: userData.profile_pic,
              referral_code: userData.referral_code, // ADDED
              total_bookings: userData.total_bookings, // ADDED
              role: userData.role.name, // FIXED: Accessing .name because role is an object
              is_completed_profile: userData.is_completed_profile,
              is_kyc_verified: userData.is_kyc_verified,
              gender: userData.gender, // ADDED
            },
          });

          navigation.reset('MainTabs');
        },
        onError: err => Alert.alert('Failed', err.message || 'Invalid OTP'),
      },
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.blobTop} />
      <View style={styles.blobBottom} />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.container}>
            <View style={styles.brand}>
              <Text style={styles.logo}>
                <Text style={styles.nai}>nai</Text>
                <Text style={styles.beau}>beau</Text>
              </Text>
              <Text style={styles.tagline}>
                Premium services, delivered with care
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.title}>Welcome back</Text>

              <AppInput
                label="Mobile Number"
                placeholder="9898669528"
                keyboardType="number-pad"
                maxLength={10}
                value={mobile}
                onChangeText={setMobile}
                editable={!showOtp}
              />

              {showOtp && (
                <View style={styles.otpContainer}>
                  <OtpInputs
                    ref={otpRef}
                    handleChange={handleOtpChange}
                    numberOfInputs={4}
                    keyboardType="number-pad"
                    inputStyles={styles.otpBox}
                    clearTextOnFocus
                    autofillFromClipboard={false}
                  />
                </View>
              )}

              {!showOtp ? (
                <AppButton
                  title="Send OTP"
                  loading={loading}
                  onPress={handleSendOtp}
                />
              ) : (
                <AppButton
                  title="Verify OTP"
                  loading={loading}
                  disabled={otp.length !== 4}
                  onPress={handleVerifyOtp}
                />
              )}
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.footerText}>
                New here? <Text style={styles.link}>Create account</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

/* -------- STYLES (UNCHANGED + OTP) -------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },

  blobTop: {
    position: 'absolute',
    top: -80,
    right: -80,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FFE4EA',
  },
  blobBottom: {
    position: 'absolute',
    bottom: -40,
    left: -90,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: '#FFF1F4',
  },

  brand: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    fontSize: 38,
    fontWeight: '900',
  },
  nai: { color: colors.black },
  beau: { color: colors.primary },
  tagline: {
    marginTop: 8,
    fontSize: 14,
    color: colors.textMuted,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 22,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    color: colors.text,
  },
  otpContainer: {
    marginTop: 50,
    marginBottom: 50,
  },
  otpBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: colors.textMuted,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    color: colors.text,
  },

  footerText: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.textMuted,
  },
  link: {
    color: colors.primary,
    fontWeight: '700',
  },
});
