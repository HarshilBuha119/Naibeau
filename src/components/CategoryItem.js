import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import colors from '../theme/colors';

export default function CategoryItem({ item, isSelected, onPress }) {
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
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="stretch"
          />
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
    borderWidth: 1,
    marginBottom: 6,
    flexShrink: 0,    
  },

  imageWrapperSelected: {
    borderColor: colors.primary,
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 999,
  },

  placeholder: {
    width: 65,
    height: 65,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
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
