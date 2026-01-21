import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import colors from '../theme/colors';

export default function CategoryItem({ item, isSelected, onPress }) {
  const [loading, setLoading] = useState(true);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View
        style={[
          styles.imageWrapper,
          isSelected && styles.imageWrapperSelected,
        ]}
      >
        {item.image ? (
          <View>
            {loading && (
              <View style={styles.loaderOverlay}>
                <ActivityIndicator size="small" color={colors.primary} />
              </View>
            )}

            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover" 
              onLoadEnd={() => setLoading(false)} 
            />
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              {item.name?.charAt(0)}
            </Text>
          </View>
        )}
      </View>

      <Text
        style={[styles.text, isSelected && styles.textSelected]}
        numberOfLines={2}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 8,
    width: 90,
    minHeight: 120,
    justifyContent: 'flex-start',
  },
  imageWrapper: {
    borderRadius: 999,
    borderWidth: 2, 
    borderColor: 'transparent', 
    marginBottom: 6,
    overflow: 'hidden',
  },
  imageWrapperSelected: {
    borderColor: colors.primary,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#F3F4F6',
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  placeholder: {
    width: 65,
    height: 65,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
  },
  textSelected: {
    color: colors.text,
    fontWeight: '800',
  },
});