import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default function AppButton({ title, loading, ...props }) {
  return (
    <TouchableOpacity style={styles.button} disabled={loading} {...props}>
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  text: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
