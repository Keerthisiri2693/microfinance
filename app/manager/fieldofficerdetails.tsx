
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

export default function FieldOfficerDetails() {
  const router = useRouter();

  const officer = {
    name: "Ramesh Kumar",
    role: "Field Officer",
    employeeId: "EMP102",
    mobile: "9876543210",
    area: "Tiruvallur",
    collection: "₹12,500",
    groups: "8",
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        backgroundColor={GREEN}
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
            <Ionicons name="arrow-back" size={23} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Officer Details</Text>

          <View style={styles.headerRight} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Card */}
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>

              <View style={styles.onlineIndicator} />
            </View>

            <Text style={styles.name}>{officer.name}</Text>
            <Text style={styles.role}>{officer.role}</Text>

            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Active Officer</Text>
            </View>

            <View style={styles.profileDivider} />

            <View style={styles.profileFooter}>
              <View style={styles.profileFooterItem}>
                <Text style={styles.footerLabel}>Employee ID</Text>
                <Text style={styles.footerValue}>
                  {officer.employeeId}
                </Text>
              </View>

              <View style={styles.footerDivider} />

              <View style={styles.profileFooterItem}>
                <Text style={styles.footerLabel}>Assigned Area</Text>
                <Text style={styles.footerValue}>
                  {officer.area}
                </Text>
              </View>
            </View>
          </View>

          {/* Collection Summary */}
          <Text style={styles.sectionTitle}>Performance Overview</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="cash-outline" size={22} color={GREEN} />
              </View>

              <Text style={styles.statValue}>{officer.collection}</Text>
              <Text style={styles.statLabel}>Today's Collection</Text>
            </View>

            <View style={styles.statCard}>
              <View style={styles.statIcon}>
                <Ionicons name="people-outline" size={22} color={GREEN} />
              </View>

              <Text style={styles.statValue}>{officer.groups}</Text>
              <Text style={styles.statLabel}>Assigned Groups</Text>
            </View>
          </View>

          {/* Officer Information */}
          <Text style={styles.sectionTitle}>Personal Information</Text>

          <View style={styles.infoCard}>
            <InfoRow
              icon="id-card-outline"
              label="Employee ID"
              value={officer.employeeId}
            />

            <InfoRow
              icon="call-outline"
              label="Mobile Number"
              value={officer.mobile}
            />

            <InfoRow
              icon="location-outline"
              label="Assigned Area"
              value={officer.area}
            />

            <InfoRow
              icon="briefcase-outline"
              label="Designation"
              value={officer.role}
              last
            />
          </View>

          {/* Officer Activity */}
          <Text style={styles.sectionTitle}>Officer Activity</Text>

          <View style={styles.actionsContainer}>
            <ActionItem
              icon="clipboard-outline"
              title="Daily Work Reports"
              subtitle="View officer's daily performance"
              onPress={() => router.push("/manager/viewdailyreportlist")}
            />

            <ActionItem
              icon="map-outline"
              title="Track Officer Location"
              subtitle="View officer's location"
              onPress={() => {}}
            />

            <ActionItem
              icon="cash-outline"
              title="View Collections"
              subtitle="Check collection history"
              onPress={() => router.push("/manager/collectionlist")}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* Information Row */
function InfoRow({
  icon,
  label,
  value,
  last = false,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <View style={[styles.infoRow, !last && styles.infoBorder]}>
      <View style={styles.infoIcon}>
        <Ionicons name={icon} size={20} color={GREEN} />
      </View>

      <View style={styles.infoText}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

/* Action Item */
function ActionItem({
  icon,
  title,
  subtitle,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.actionCard}
      activeOpacity={0.75}
      onPress={onPress}
    >
      <View style={styles.actionIcon}>
        <Ionicons name={icon} size={22} color={GREEN} />
      </View>

      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>

      <Ionicons name="chevron-forward" size={20} color="#9AA5A0" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREEN,
  },

  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  header: {
    height: 58,
    backgroundColor: GREEN,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  headerRight: {
    width: 35,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 35,
  },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  avatarContainer: {
    position: "relative",
    marginBottom: 12,
  },

  avatar: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#E5F7EC",
  },

  avatarText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },

  onlineIndicator: {
    position: "absolute",
    right: 3,
    bottom: 5,
    width: 17,
    height: 17,
    borderRadius: 9,
    backgroundColor: "#16B866",
    borderWidth: 3,
    borderColor: "#fff",
  },

  name: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#26352D",
  },

  role: {
    color: "#7A8780",
    fontSize: 14,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: GREEN,
  },

  statusText: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "600",
  },

  profileDivider: {
    height: 1,
    backgroundColor: "#EDF0EE",
    width: "100%",
    marginVertical: 18,
  },

  profileFooter: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  profileFooterItem: {
    flex: 1,
    alignItems: "center",
  },

  footerLabel: {
    color: "#89948E",
    fontSize: 11,
  },

  footerValue: {
    color: "#26352D",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 5,
  },

  footerDivider: {
    width: 1,
    height: 35,
    backgroundColor: "#E8ECE9",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26352D",
    marginTop: 22,
    marginBottom: 12,
  },

  statsContainer: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    elevation: 2,
  },

  statIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  statValue: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#26352D",
  },

  statLabel: {
    fontSize: 12,
    color: "#7A8780",
    marginTop: 5,
  },

  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 15,
    elevation: 2,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },

  infoBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1EF",
  },

  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },

  infoText: {
    flex: 1,
    marginLeft: 12,
  },

  infoLabel: {
    fontSize: 11,
    color: "#87928B",
  },

  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26352D",
    marginTop: 3,
  },

  actionsContainer: {
    gap: 10,
  },

  actionCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },

  actionContent: {
    flex: 1,
    marginLeft: 12,
  },

  actionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#26352D",
  },

  actionSubtitle: {
    fontSize: 11,
    color: "#87928B",
    marginTop: 4,
  },
});
