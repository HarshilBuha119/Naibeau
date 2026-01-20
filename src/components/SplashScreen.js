import React, { useEffect, useRef } from 'react';
import { View, Animated, Text, StyleSheet, StatusBar, Easing } from 'react-native';

export default function SplashScreen({ onFinish }) {
  const letters = 'NAIBEAU'.split('');

  const animations = useRef(
    letters.map(() => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(50),
    }))
  ).current;

  useEffect(() => {
    Animated.stagger(
      120,
      animations.map(anim =>
        Animated.parallel([
          Animated.timing(anim.opacity, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(anim.translateY, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      )
    ).start(() => {
      onFinish?.();
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#E11D48" />
      <View style={styles.row}>
        {letters.map((char, index) => (
          <Animated.Text
            key={index}
            style={[
              styles.text,
              {
                opacity: animations[index].opacity,
                transform: [{ translateY: animations[index].translateY }],
              },
            ]}
          >
            {char}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E11D48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 42,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
});
