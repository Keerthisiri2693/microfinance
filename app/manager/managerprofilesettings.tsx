
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ManagerProfileSettings() {
  const router = useRouter();

  const handleLogout = () => {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            // 1. Clear authentication token/session here
            // Example:
            // await AsyncStorage.removeItem("authToken");

            // 2. Navigate to login and replace current screen
            router.replace("/login");
          } catch (error) {
            console.error("Logout failed:", error);
            Alert.alert("Error", "Unable to logout. Please try again.");
          }
        },
      },
    ],
    { cancelable: true }
  );
};

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        backgroundColor="#1FAF5A"
        barStyle="light-content"
        translucent={false}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.title}>Profile Settings</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>M</Text>
              </View>

              <View style={styles.verifiedIcon}>
                <Ionicons
                  name="checkmark"
                  size={13}
                  color="#FFFFFF"
                />
              </View>
            </View>

            <Text style={styles.name}>Ramesh Kumar</Text>
            <Text style={styles.role}>Branch Manager</Text>

            <View style={styles.branchBadge}>
              <Ionicons
                name="location-outline"
                size={13}
                color="#128447"
              />
              <Text style={styles.branchText}>Tiruvallur Branch</Text>
            </View>
          </View>

          {/* Account Settings */}
          <Text style={styles.sectionTitle}>Account Settings</Text>

          <View style={styles.optionsContainer}>
            <SettingOption
              icon="person-outline"
              title="Edit Profile"
              subtitle="Update your personal information"
              onPress={() =>
                router.push("/manager/mamnagereditprofile")
              }
            />

            <SettingOption
              icon="lock-closed-outline"
              title="Change Password"
              subtitle="Update your account password"
              onPress={() => {
                // Connect your change password screen.
              }}
            />

            <SettingOption
              icon="notifications-outline"
              title="Notifications"
              subtitle="View your notifications and alerts"
              onPress={() =>
                router.push("/manager/managernotification")
              }
            />

            <SettingOption
              icon="settings-outline"
              title="App Settings"
              subtitle="Manage application preferences"
              onPress={() => {
                // Connect your app settings screen.
              }}
            />
          </View>

          {/* Other Information */}
          <Text style={styles.sectionTitle}>Other</Text>

          <View style={styles.optionsContainer}>
            <SettingOption
              icon="help-circle-outline"
              title="Help & Support"
              subtitle="Get assistance with the application"
              onPress={() => {}}
            />

            <SettingOption
              icon="information-circle-outline"
              title="About Application"
              subtitle="Application version and information"
              onPress={() => {}}
            />
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.85}
            onPress={handleLogout}
          >
            <Ionicons
              name="log-out-outline"
              size={21}
              color="#FFFFFF"
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.versionText}>
            Micro Finance Management App
          </Text>
          <Text style={styles.versionNumber}>Version 1.0.0</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

type SettingOptionProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
  onPress: () => void;
};

function SettingOption({
  icon,
  title,
  subtitle,
  onPress,
}: SettingOptionProps) {
  return (
    <TouchableOpacity
      style={styles.option}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.optionIcon}>
        <Ionicons name={icon} size={21} color="#1FAF5A" />
      </View>

      <View style={styles.optionContent}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={19}
        color="#A0AAA4"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1FAF5A",
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  header: {
    backgroundColor: "#1FAF5A",
    paddingHorizontal: 18,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 35,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  headerPlaceholder: {
    width: 35,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 23,
    alignItems: "center",
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#1FAF5A",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "bold",
  },
  verifiedIcon: {
    position: "absolute",
    right: 0,
    bottom: 2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#128447",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#26352D",
  },
  role: {
    color: "#777777",
    fontSize: 13,
    marginTop: 4,
  },
  branchBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    gap: 5,
  },
  branchText: {
    color: "#128447",
    fontSize: 11,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#35443A",
    marginBottom: 10,
    marginLeft: 3,
  },
  optionsContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 13,
    marginBottom: 22,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F2F0",
    gap: 12,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26352D",
  },
  optionSubtitle: {
    fontSize: 11,
    color: "#929B95",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#E53935",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 2,
    gap: 9,
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  versionText: {
    color: "#7F8A83",
    textAlign: "center",
    fontSize: 11,
    marginTop: 20,
  },
  versionNumber: {
    color: "#A0AAA4",
    textAlign: "center",
    fontSize: 10,
    marginTop: 4,
  },
});
