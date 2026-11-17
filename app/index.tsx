import React, { useEffect } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SplashScreen: React.FC = () => {
  const router = useRouter();

  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(30);
  const rotate = useSharedValue(0);

  useEffect(() => {
    startAnimation();
    checkLogin();
  }, []);

  const startAnimation = () => {
    scale.value = withSpring(1, { damping: 6 });
    opacity.value = withTiming(1, { duration: 1200 });
    translateY.value = withTiming(0, { duration: 1000 });

    rotate.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 1200 }),
        withTiming(4, { duration: 1200 })
      ),
      -1,
      true
    );
  };

  const checkLogin = async () => {
    setTimeout(async () => {
      const token = await AsyncStorage.getItem("employeeToken");

      if (token) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }, 2500);
  };

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
    opacity: opacity.value,
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <LinearGradient
      colors={["#243A6B", "#1FAF5A"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />

      {/* Logo */}
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Text style={styles.logoIcon}>₹</Text>
      </Animated.View>

      {/* App Name */}
      <Animated.View style={textStyle}>
        <Text style={styles.title}>Micro Finance</Text>
        <Text style={styles.subtitle}>
          Empowering Communities Through Finance
        </Text>
      </Animated.View>

      {/* Loading dots */}
      <View style={styles.loaderContainer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </LinearGradient>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },

  logoIcon: {
    fontSize: 60,
    color: "#D4A017",
    fontWeight: "bold",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#F4F6F8",
    marginTop: 10,
    textAlign: "center",
  },

  loaderContainer: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    gap: 10,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D4A017",
    opacity: 0.9,
  },
});