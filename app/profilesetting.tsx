
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

export default function Profile() {
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

  const renderOption = (
    icon: keyof typeof Ionicons.glyphMap,
    title: string,
    subtitle: string,
    onPress: () => void
  ) => (
    <TouchableOpacity
      style={styles.option}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={styles.optionIcon}>
        <Ionicons name={icon} size={21} color="#128447" />
      </View>

      <View style={styles.optionInfo}>
        <Text style={styles.optionText}>{title}</Text>
        <Text style={styles.optionSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={19}
        color="#A0AAA4"
      />
    </TouchableOpacity>
  );

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
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>My Profile</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>

              <View style={styles.onlineIndicator} />
            </View>

            <Text style={styles.name}>Ramesh Kumar</Text>
            <Text style={styles.role}>Field Officer</Text>

            <View style={styles.employeeBadge}>
              <Ionicons
                name="id-card-outline"
                size={14}
                color="#128447"
              />
              <Text style={styles.employeeBadgeText}>
                EMP102
              </Text>
            </View>
          </View>

          {/* Personal Information */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Personal Information
            </Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="call-outline"
                  size={19}
                  color="#128447"
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Mobile Number</Text>
                <Text style={styles.infoValue}>9876543210</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="business-outline"
                  size={19}
                  color="#128447"
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Branch</Text>
                <Text style={styles.infoValue}>Tiruvallur</Text>
              </View>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="briefcase-outline"
                  size={19}
                  color="#128447"
                />
              </View>

              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Designation</Text>
                <Text style={styles.infoValue}>Field Officer</Text>
              </View>
            </View>
          </View>

          {/* Account Settings */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Account Settings
            </Text>
          </View>

          <View style={styles.optionsCard}>
            {renderOption(
              "person-outline",
              "Edit Profile",
              "Update your personal details",
              () => router.push("/editprofile")
            )}

            <View style={styles.optionSeparator} />

            {renderOption(
              "lock-closed-outline",
              "Change Password",
              "Update your account password",
              () => router.push("/changepassword")
            )}

            <View style={styles.optionSeparator} />

            {renderOption(
              "notifications-outline",
              "Notifications",
              "View your latest notifications",
              () => router.push("/fieldofficernotification")
            )}

            <View style={styles.optionSeparator} />

            {renderOption(
              "clipboard-outline",
              "Daily Work Update",
              "Submit your daily work report",
              () => router.push("/dailyworkupdate")
            )}
          </View>

          {/* Logout */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
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
            Micro Finance App · Version 1.0.0
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
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
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  headerPlaceholder: {
    width: 35,
  },
  body: {
    flex: 1,
  },
  bodyContent: {
    padding: 16,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 22,
    alignItems: "center",
    marginBottom: 22,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },
  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#1FAF5A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#E8F7EF",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "bold",
  },
  onlineIndicator: {
    position: "absolute",
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#2DBE70",
    borderWidth: 3,
    borderColor: "#FFFFFF",
    right: 2,
    bottom: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#26352D",
  },
  role: {
    fontSize: 13,
    color: "#777777",
    marginTop: 4,
  },
  employeeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },
  employeeBadgeText: {
    color: "#128447",
    fontSize: 12,
    fontWeight: "700",
  },
  sectionHeader: {
    marginBottom: 11,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26352D",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 22,
    elevation: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
  infoIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: "#888888",
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26352D",
    marginTop: 3,
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F2F0",
    marginLeft: 50,
  },
  optionsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 13,
    marginBottom: 18,
    elevation: 1,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  optionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26352D",
  },
  optionSubtitle: {
    fontSize: 11,
    color: "#888888",
    marginTop: 4,
  },
  optionSeparator: {
    height: 1,
    backgroundColor: "#F0F2F0",
    marginLeft: 52,
  },
  logoutButton: {
    backgroundColor: "#D94343",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 12,
    gap: 9,
    marginTop: 3,
  },
  logoutText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  versionText: {
    textAlign: "center",
    color: "#999999",
    fontSize: 11,
    marginTop: 20,
  },
});
