
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F5F8F6";

export default function ManagerDashboard() {
  const router = useRouter();

  const stats = [
    {
      title: "Field Officers",
      value: "8",
      icon: "people-outline",
      color: "#1FAF5A",
      bg: "#E5F7EC",
      change: "Active officers",
    },
    {
      title: "Today Collection",
      value: "₹52,000",
      icon: "wallet-outline",
      color: "#2685D9",
      bg: "#E8F2FD",
      change: "Today's total",
    },
    {
      title: "Total Groups",
      value: "45",
      icon: "people-circle-outline",
      color: "#9465D5",
      bg: "#F1EAFE",
      change: "Registered groups",
    },
    {
      title: "Pending EMI",
      value: "12",
      icon: "alert-circle-outline",
      color: "#E69A28",
      bg: "#FFF3DF",
      change: "Requires attention",
    },
  ];

  const actions = [
    {
      title: "Assign Task",
      subtitle: "Assign daily tasks to field officers",
      icon: "clipboard-outline",
      route: "/manager/assigntask",
    },
    {
      title: "Officer Location",
      subtitle: "Track field officers",
      icon: "location-outline",
      route: "/manager/fieldofficerlist",
    },
    {
      title: "Daily Reports",
      subtitle: "View daily performance",
      icon: "clipboard-outline",
      route: "/manager/viewdailyreportlist",
    },
    {
      title: "Collections",
      subtitle: "Manage collections",
      icon: "cash-outline",
      route: "/manager/collectionlist",
    },
    {
      title: "Defaulters",
      subtitle: "Check overdue payments",
      icon: "warning-outline",
      route: "/manager/Defaulterslist",
    },
    {
      title: "Loans",
      subtitle: "Manage loan accounts",
      icon: "document-text-outline",
      route: "/manager/loanlist",
    },
    {
      title: "Groups",
      subtitle: "Manage customer groups",
      icon: "people-circle-outline",
      route: "/manager/grouplist",
    },
    {
      title: "Customers",
      subtitle: "View customer details",
      icon: "person-outline",
      route: "/manager/customerlist",
    },
  ] as const;

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <StatusBar
        backgroundColor={GREEN}
        barStyle="light-content"
        translucent={false}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcome}>WELCOME BACK</Text>

              <Text style={styles.headerTitle}>
                Manager Dashboard
              </Text>

              <View style={styles.branchRow}>
                <Ionicons
                  name="location-outline"
                  size={15}
                  color="#DDF8E8"
                />

                <Text style={styles.branchText}>
                  Tiruvallur Branch
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.profileButton}
              activeOpacity={0.8}
              onPress={() =>
                router.push("/manager/managerprofilesettings")
              }
            >
              <Ionicons
                name="person-circle-outline"
                size={29}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.headerBottom}>
            <View>
              <Text style={styles.headerSmall}>
                Branch Overview
              </Text>

              <Text style={styles.headerDate}>
                Manage your branch activities
              </Text>
            </View>

            <Ionicons
              name="business-outline"
              size={34}
              color="#DDF8E8"
            />
          </View>
        </View>

        {/* Dashboard Content */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Overview */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Overview
              </Text>

              <Text style={styles.sectionSubtitle}>
                Your branch performance at a glance
              </Text>
            </View>

            <Ionicons
              name="stats-chart-outline"
              size={21}
              color={GREEN}
            />
          </View>

          {/* Statistics */}
          <View style={styles.statsGrid}>
            {stats.map((item) => (
              <View
                key={item.title}
                style={styles.statCard}
              >
                <View style={styles.statTop}>
                  <View
                    style={[
                      styles.iconBox,
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

                <Text style={styles.statValue}>
                  {item.value}
                </Text>

                <Text style={styles.statTitle}>
                  {item.title}
                </Text>

                <Text style={styles.statDescription}>
                  {item.change}
                </Text>
              </View>
            ))}
          </View>

          {/* Manager Actions */}
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionTitle}>
                Manager Actions
              </Text>

              <Text style={styles.sectionSubtitle}>
                Access your branch management tools
              </Text>
            </View>
          </View>

          {/* Action Cards */}
          <View style={styles.actionGrid}>
            {actions.map((item) => (
              <TouchableOpacity
                key={item.title}
                activeOpacity={0.85}
                style={styles.actionCard}
                onPress={() => router.push(item.route as any)}
              >
                <View style={styles.actionCardTop}>
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

          <View style={styles.footerSpace} />
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
          >
            <Ionicons
              name="home"
              size={23}
              color={GREEN}
            />

            <Text style={styles.activeNavText}>
              Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() =>
              router.push("/manager/fieldofficerlist")
            }
          >
            <Ionicons
              name="people-outline"
              size={23}
              color="#8B958E"
            />

            <Text style={styles.navText}>
              Officers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() => router.push("/manager/reports")}
          >
            <Ionicons
              name="document-text-outline"
              size={23}
              color="#8B958E"
            />

            <Text style={styles.navText}>
              Reports
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            activeOpacity={0.7}
            onPress={() =>
              router.push("/manager/managerprofilesettings")
            }
          >
            <Ionicons
              name="person-outline"
              size={23}
              color="#8B958E"
            />

            <Text style={styles.navText}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Safe area - green background for top notch
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
    backgroundColor: GREEN,
    paddingTop: 15,
    paddingHorizontal: 22,
    paddingBottom: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  welcome: {
    color: "#DDF8E8",
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.5,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 5,
  },

  branchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
  },

  branchText: {
    color: "#E7F8ED",
    fontSize: 13,
    marginLeft: 5,
  },

  profileButton: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerBottom: {
    marginTop: 23,
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.10)",
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerSmall: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  headerDate: {
    color: "#E1F6E9",
    fontSize: 12,
    marginTop: 4,
  },

  // Main content
  content: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 23,
    paddingBottom: 100,
  },

  // Section headings
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#202B24",
  },

  sectionSubtitle: {
    color: "#89938C",
    fontSize: 12,
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  statTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },

  statValue: {
    color: "#202B24",
    fontSize: 23,
    fontWeight: "800",
    marginTop: 14,
  },

  statTitle: {
    color: "#536057",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 3,
  },

  statDescription: {
    color: "#9AA39D",
    fontSize: 11,
    marginTop: 5,
  },

  // Action cards
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
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  actionCardTop: {
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

  footerSpace: {
    height: 25,
  },

  // Bottom navigation
  bottomNav: {
    position: "absolute",
    bottom: 40,
    left: 18,
    right: 18,
    backgroundColor: "#FFFFFF",
    height: 66,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000000",
    shadowOpacity: 0.10,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderWidth: 1,
    borderColor: "#EDF1EE",
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 55,
  },

  navText: {
    fontSize: 10,
    color: "#8B958E",
    marginTop: 4,
  },

  activeNavText: {
    fontSize: 10,
    color: GREEN,
    fontWeight: "800",
    marginTop: 4,
  },
});
