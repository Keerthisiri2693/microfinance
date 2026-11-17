
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F5F8F6";

export default function Dashboard() {
  const stats = [
    {
      title: "Customers",
      value: "120",
      icon: "people-outline",
      color: "#1FAF5A",
      bg: "#E5F7EC",
      subtitle: "Registered customers",
    },
    {
      title: "Active Loans",
      value: "95",
      icon: "document-text-outline",
      color: "#2685D9",
      bg: "#E8F2FD",
      subtitle: "Ongoing accounts",
    },
    {
      title: "Today's Collection",
      value: "₹25,500",
      icon: "wallet-outline",
      color: "#9465D5",
      bg: "#F1EAFE",
      subtitle: "Collected today",
    },
    {
      title: "Pending EMI",
      value: "12",
      icon: "alert-circle-outline",
      color: "#E69A28",
      bg: "#FFF3DF",
      subtitle: "Needs follow-up",
    },
  ];

  const actions = [
    {
      title: "Add Customer",
      subtitle: "Register new customer",
      icon: "person-add-outline",
      route: "/addcustomer",
    },
    {
      title: "Create Loan",
      subtitle: "Start a new loan",
      icon: "document-text-outline",
      route: "/createloan",
    },
    {
      title: "EMI List",
      subtitle: "View EMI schedules",
      icon: "cash-outline",
      route: "/emilist",
    },
    {
      title: "Create Group",
      subtitle: "Register SHG group",
      icon: "people-outline",
      route: "/creategroup",
    },
  ];

  const activities = [
    {
      id: "1",
      title: "Collected ₹500 from Ramesh",
      subtitle: "EMI payment received",
      time: "Today",
      icon: "checkmark-circle-outline",
      color: GREEN,
      bg: "#E5F7EC",
    },
    {
      id: "2",
      title: "Loan Created for Lakshmi",
      subtitle: "New loan account registered",
      time: "Today",
      icon: "document-text-outline",
      color: "#2685D9",
      bg: "#E8F2FD",
    },
    {
      id: "3",
      title: "EMI Pending for Suresh",
      subtitle: "Payment follow-up required",
      time: "Today",
      icon: "alert-circle-outline",
      color: "#E69A28",
      bg: "#FFF3DF",
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        backgroundColor={GREEN}
        barStyle="light-content"
        translucent={false}
      />

      <View style={styles.container}>
        {/* Header */}
        <LinearGradient
          colors={[GREEN, DARK_GREEN]}
          style={styles.header}
        >
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcome}>WELCOME BACK</Text>
              <Text style={styles.headerTitle}>Micro Finance</Text>
              <Text style={styles.headerSubtitle}>
                Field Officer Dashboard
              </Text>
            </View>

            <TouchableOpacity
              style={styles.profileButton}
              activeOpacity={0.8}
              onPress={() => router.push("/profilesetting")}
            >
              <Ionicons
                name="person-circle-outline"
                size={30}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerInfo}>
            <View>
              <Text style={styles.headerInfoTitle}>
                Field Operations
              </Text>
              <Text style={styles.headerInfoSubtitle}>
                Manage your daily activities
              </Text>
            </View>

            <Ionicons
              name="briefcase-outline"
              size={34}
              color="#DDF8E8"
            />
          </View>
        </LinearGradient>

        {/* Scrollable Body */}
        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Overview */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Overview</Text>
              <Text style={styles.sectionSubtitle}>
                Your daily performance summary
              </Text>
            </View>

            <Ionicons
              name="stats-chart-outline"
              size={22}
              color={GREEN}
            />
          </View>

          {/* Statistics */}
          <View style={styles.statsGrid}>
            {stats.map((item) => (
              <View key={item.title} style={styles.statCard}>
                <View style={styles.statTop}>
                  <View
                    style={[
                      styles.statIcon,
                      { backgroundColor: item.bg },
                    ]}
                  >
                    <Ionicons
                      name={item.icon as any}
                      size={23}
                      color={item.color}
                    />
                  </View>

                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    color="#A0AAA3"
                  />
                </View>

                <Text style={styles.cardValue}>{item.value}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>
                  {item.subtitle}
                </Text>
              </View>
            ))}
          </View>

          {/* Quick Actions */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Quick Actions</Text>
              <Text style={styles.sectionSubtitle}>
                Manage your field operations
              </Text>
            </View>
          </View>

          <View style={styles.actionGrid}>
            {actions.map((item) => (
              <TouchableOpacity
                key={item.title}
                activeOpacity={0.85}
                style={styles.actionCard}
                onPress={() => router.push(item.route as any)}
              >
                <View style={styles.actionTop}>
                  <View style={styles.actionIcon}>
                    <Ionicons
                      name={item.icon as any}
                      size={27}
                      color={GREEN}
                    />
                  </View>

                  <View style={styles.actionArrow}>
                    <Ionicons
                      name="chevron-forward"
                      size={17}
                      color="#829188"
                    />
                  </View>
                </View>

                <View style={styles.actionInfo}>
                  <Text style={styles.actionTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.actionSubtitle}>
                    {item.subtitle}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Activity */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>Recent Activity</Text>
              <Text style={styles.sectionSubtitle}>
                Your latest field transactions
              </Text>
            </View>

            <Ionicons
              name="time-outline"
              size={22}
              color={GREEN}
            />
          </View>

          <View style={styles.activityList}>
            {activities.map((item) => (
              <View key={item.id} style={styles.activityCard}>
                <View
                  style={[
                    styles.activityIcon,
                    { backgroundColor: item.bg },
                  ]}
                >
                  <Ionicons
                    name={item.icon as any}
                    size={22}
                    color={item.color}
                  />
                </View>

                <View style={styles.activityInfo}>
                  <Text style={styles.activityTitle}>
                    {item.title}
                  </Text>
                  <Text style={styles.activitySubtitle}>
                    {item.subtitle}
                  </Text>
                </View>

                <Text style={styles.activityTime}>
                  {item.time}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.footerSpace} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <Ionicons name="home" size={23} color={GREEN} />
            <Text style={styles.navTextActive}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => router.push("/viewcustomerlist")}
          >
            <Ionicons
              name="people-outline"
              size={23}
              color="#8B958E"
            />
            <Text style={styles.navText}>Customers</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => router.push("/loanlsit")}
          >
            <Ionicons
              name="document-text-outline"
              size={23}
              color="#8B958E"
            />
            <Text style={styles.navText}>Loans</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => router.push("/profilesetting")}
          >
            <Ionicons
              name="person-outline"
              size={23}
              color="#8B958E"
            />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Safe area
  safeArea: {
    flex: 1,
    backgroundColor: GREEN,
  },

  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  // Header
  header: {
    paddingTop: 15,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    fontSize: 11,
    fontWeight: "700",
    color: "#DDF8E8",
    letterSpacing: 1.5,
  },

  headerTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#FFFFFF",
    marginTop: 5,
  },

  headerSubtitle: {
    color: "#E8F8EF",
    fontSize: 13,
    marginTop: 4,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 15,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerInfo: {
    marginTop: 22,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.10)",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerInfoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  headerInfoSubtitle: {
    fontSize: 12,
    color: "#E1F6E9",
    marginTop: 4,
  },

  // Body
  body: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 100,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#202B24",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#89938C",
    marginTop: 4,
  },

  // Statistics
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  statCard: {
    width: "48.2%",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 17,
    marginBottom: 13,
    borderWidth: 1,
    borderColor: "#EDF1EE",
    elevation: 2,
    shadowColor: "#174D2D",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  cardValue: {
    fontSize: 23,
    fontWeight: "800",
    color: "#202B24",
    marginTop: 14,
  },

  cardTitle: {
    fontSize: 13,
    color: "#536057",
    fontWeight: "700",
    marginTop: 3,
  },

  cardSubtitle: {
    fontSize: 10,
    color: "#9AA39D",
    marginTop: 5,
  },

  // Quick Actions
  actionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 13,
  },

  actionCard: {
    width: "48.2%",
    minHeight: 145,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8F0EA",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#174D2D",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  actionTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  actionIcon: {
    width: 50,
    height: 50,
    backgroundColor: "#E8F7ED",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  actionArrow: {
    width: 29,
    height: 29,
    borderRadius: 10,
    backgroundColor: "#F3F7F4",
    justifyContent: "center",
    alignItems: "center",
  },

  actionInfo: {
    marginTop: 18,
  },

  actionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#24352A",
  },

  actionSubtitle: {
    fontSize: 11,
    color: "#849188",
    marginTop: 5,
    lineHeight: 16,
  },

  // Activity
  activityList: {
    gap: 11,
  },

  activityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDF1EE",
    elevation: 1,
  },

  activityIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  activityInfo: {
    flex: 1,
    marginLeft: 12,
  },

  activityTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#26352B",
  },

  activitySubtitle: {
    fontSize: 11,
    color: "#89938C",
    marginTop: 4,
  },

  activityTime: {
    fontSize: 10,
    color: "#929D95",
    marginLeft: 5,
  },

  footerSpace: {
    height: 20,
  },

  // Bottom navigation
  bottomNav: {
    position: "absolute",
    bottom: 40,
    left: 18,
    right: 18,
    height: 66,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    borderWidth: 1,
    borderColor: "#EDF1EE",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 60,
  },

  navText: {
    fontSize: 10,
    color: "#8B958E",
    marginTop: 4,
  },

  navTextActive: {
    fontSize: 10,
    color: GREEN,
    fontWeight: "800",
    marginTop: 4,
  },
});
