
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

type NotificationType =
  | "collection"
  | "loan"
  | "warning"
  | "customer"
  | "location"
  | "gps_off"
  | "instruction_all"
  | "instruction_individual";

type NotificationItem = {
  id: number;
  title: string;
  message: string;
  time: string;
  type: NotificationType;
  status: "read" | "unread";
};

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "Collection Received",
    message: "Ravi Kumar collected ₹3,200 from Kanchipuram group.",
    time: "10:15 AM",
    type: "collection",
    status: "unread",
  },
  {
    id: 2,
    title: "Loan Approved",
    message: "Loan of ₹20,000 approved for Selvi.",
    time: "09:40 AM",
    type: "loan",
    status: "read",
  },
  {
    id: 3,
    title: "Defaulter Alert",
    message: "Lakshmi payment overdue for 8 days.",
    time: "Yesterday",
    type: "warning",
    status: "unread",
  },
  {
    id: 4,
    title: "New Customer Added",
    message: "Meena added to Sriperumbudur group.",
    time: "Yesterday",
    type: "customer",
    status: "read",
  },
  {
    id: 5,
    title: "Officer Location Update",
    message: "Suresh reached Chengalpattu village.",
    time: "2 days ago",
    type: "location",
    status: "read",
  },
  {
    id: 6,
    title: "GPS Turned Off",
    message: "Field officer Ravi Kumar turned OFF location services.",
    time: "5 minutes ago",
    type: "gps_off",
    status: "unread",
  },
  {
    id: 7,
    title: "Manager Instruction",
    message: "All officers must submit today's collection report before 6 PM.",
    time: "1 minute ago",
    type: "instruction_all",
    status: "unread",
  },
  {
    id: 8,
    title: "Manager Instruction",
    message: "Ravi Kumar please visit Tambaram village today.",
    time: "3 minutes ago",
    type: "instruction_individual",
    status: "unread",
  },
];

export default function Notifications() {
  const router = useRouter();

  const [notifications, setNotifications] =
    useState<NotificationItem[]>(initialNotifications);

  const [activeFilter, setActiveFilter] = useState<
    "All" | "Unread" | "Read"
  >("All");

  const unreadCount = notifications.filter(
    (item) => item.status === "unread"
  ).length;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "Unread") return item.status === "unread";
    if (activeFilter === "Read") return item.status === "read";
    return true;
  });

  const getIcon = (
    type: NotificationType
  ): React.ComponentProps<typeof Ionicons>["name"] => {
    switch (type) {
      case "collection":
        return "cash-outline";
      case "loan":
        return "document-text-outline";
      case "warning":
        return "warning-outline";
      case "customer":
        return "person-add-outline";
      case "location":
        return "location-outline";
      case "gps_off":
        return "alert-circle-outline";
      case "instruction_all":
        return "megaphone-outline";
      case "instruction_individual":
        return "chatbubble-ellipses-outline";
      default:
        return "notifications-outline";
    }
  };

  const getIconColor = (type: NotificationType) => {
    switch (type) {
      case "warning":
      case "gps_off":
        return "#E53935";
      case "instruction_all":
        return "#8E44AD";
      case "instruction_individual":
      case "location":
        return "#2878D0";
      default:
        return "#1FAF5A";
    }
  };

  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, status: "read" } : item
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({ ...item, status: "read" }))
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

          <View style={styles.headerTitleContainer}>
            <Text style={styles.title}>Notifications</Text>
            <Text style={styles.headerSubtitle}>
              Stay updated with your branch
            </Text>
          </View>

          <View style={styles.headerRight}>
            <View style={styles.bellContainer}>
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#FFFFFF"
              />

              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => router.push("/manager/addnotification")}
            >
              <Ionicons name="add" size={25} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="notifications"
                size={23}
                color="#1FAF5A"
              />
            </View>

            <View style={styles.summaryText}>
              <Text style={styles.summaryTitle}>
                Notification Center
              </Text>
              <Text style={styles.summarySubtitle}>
                You have {unreadCount} unread notifications
              </Text>
            </View>

            {unreadCount > 0 && (
              <TouchableOpacity onPress={markAllAsRead}>
                <Text style={styles.markAllText}>Mark all read</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Filters */}
          <View style={styles.filterContainer}>
            {(["All", "Unread", "Read"] as const).map((filter) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterButton,
                  activeFilter === filter && styles.activeFilterButton,
                ]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text
                  style={[
                    styles.filterText,
                    activeFilter === filter && styles.activeFilterText,
                  ]}
                >
                  {filter}
                  {filter === "Unread" ? ` (${unreadCount})` : ""}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Notification List */}
          <Text style={styles.sectionTitle}>
            Recent Notifications
          </Text>

          {filteredNotifications.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="notifications-off-outline"
                size={42}
                color="#AAB5AE"
              />
              <Text style={styles.emptyTitle}>
                No notifications found
              </Text>
              <Text style={styles.emptySubtitle}>
                There are no {activeFilter.toLowerCase()} notifications.
              </Text>
            </View>
          ) : (
            filteredNotifications.map((item) => {
              const iconColor = getIconColor(item.type);
              const isUnread = item.status === "unread";

              return (
                <TouchableOpacity
                  key={item.id}
                  activeOpacity={0.8}
                  onPress={() => markAsRead(item.id)}
                  style={[
                    styles.notificationCard,
                    isUnread && styles.unreadCard,
                  ]}
                >
                  <View
                    style={[
                      styles.iconBox,
                      { backgroundColor: `${iconColor}15` },
                    ]}
                  >
                    <Ionicons
                      name={getIcon(item.type)}
                      size={23}
                      color={iconColor}
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <View style={styles.titleRow}>
                      <Text style={styles.notificationTitle}>
                        {item.title}
                      </Text>

                      {isUnread && <View style={styles.unreadDot} />}
                    </View>

                    <Text style={styles.message}>
                      {item.message}
                    </Text>

                    <View style={styles.timeRow}>
                      <Ionicons
                        name="time-outline"
                        size={12}
                        color="#999999"
                      />
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })
          )}

          <Text style={styles.footerText}>
            Showing {filteredNotifications.length} notifications
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
    paddingHorizontal: 15,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 35,
    justifyContent: "center",
  },
  headerTitleContainer: {
    flex: 1,
    marginLeft: 5,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 11,
    marginTop: 3,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 19,
  },
  bellContainer: {
    position: "relative",
    padding: 4,
  },
  addButton: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#128447",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    right: -4,
    top: -4,
    backgroundColor: "#E53935",
    borderRadius: 10,
    minWidth: 17,
    height: 17,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: "#1FAF5A",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 9,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 25,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 16,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryText: {
    flex: 1,
    marginLeft: 11,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#26352D",
  },
  summarySubtitle: {
    fontSize: 11,
    color: "#888888",
    marginTop: 4,
  },
  markAllText: {
    color: "#128447",
    fontSize: 11,
    fontWeight: "700",
  },
  filterContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 18,
    gap: 9,
  },
  filterButton: {
    paddingHorizontal: 19,
    paddingVertical: 9,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E4EBE6",
  },
  activeFilterButton: {
    backgroundColor: "#1FAF5A",
    borderColor: "#1FAF5A",
  },
  filterText: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "600",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26352D",
    marginHorizontal: 16,
    marginTop: 22,
    marginBottom: 4,
  },
  notificationCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 10,
    padding: 14,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "flex-start",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  unreadCard: {
    backgroundColor: "#F5FCF7",
    borderLeftWidth: 3,
    borderLeftColor: "#1FAF5A",
  },
  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 11,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationTitle: {
    fontWeight: "700",
    fontSize: 13,
    color: "#26352D",
    flex: 1,
  },
  message: {
    fontSize: 12,
    color: "#707A73",
    marginTop: 5,
    lineHeight: 18,
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  time: {
    fontSize: 10,
    color: "#999999",
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#1FAF5A",
    marginLeft: 8,
  },
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    margin: 15,
    padding: 35,
    borderRadius: 14,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#26352D",
    fontWeight: "700",
    fontSize: 15,
    marginTop: 12,
  },
  emptySubtitle: {
    color: "#888888",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
    color: "#999999",
    fontSize: 11,
    marginTop: 18,
  },
});
