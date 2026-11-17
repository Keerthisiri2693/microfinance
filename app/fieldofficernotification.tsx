
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

type NotificationType =
  | "collection"
  | "loan"
  | "meeting"
  | "gps"
  | "message";

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
    title: "Collection Reminder",
    message: "Collect ₹500 installment from Lakshmi today.",
    time: "08:30 AM",
    type: "collection",
    status: "unread",
  },
  {
    id: 2,
    title: "New Loan Assigned",
    message: "Manager assigned ₹20,000 loan for Selvi.",
    time: "Yesterday",
    type: "loan",
    status: "read",
  },
  {
    id: 3,
    title: "Meeting Reminder",
    message: "Group meeting at Tambaram village at 4:00 PM.",
    time: "Yesterday",
    type: "meeting",
    status: "unread",
  },
  {
    id: 4,
    title: "GPS Warning",
    message: "Please turn ON your location for tracking.",
    time: "2 days ago",
    type: "gps",
    status: "read",
  },
  {
    id: 5,
    title: "Manager Message",
    message: "Submit today's collection report before 6 PM.",
    time: "2 days ago",
    type: "message",
    status: "read",
  },
];

type FilterType = "All" | "Unread" | "Read";

export default function FieldOfficerNotifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications
  );

  const [activeFilter, setActiveFilter] =
    useState<FilterType>("All");

  const unreadCount = notifications.filter(
    (item) => item.status === "unread"
  ).length;

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "Unread") {
      return item.status === "unread";
    }

    if (activeFilter === "Read") {
      return item.status === "read";
    }

    return true;
  });

  // Notification icon
  const getIcon = (
    type: NotificationType
  ): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case "collection":
        return "cash-outline";
      case "loan":
        return "document-text-outline";
      case "meeting":
        return "people-outline";
      case "gps":
        return "location-outline";
      case "message":
        return "chatbubble-outline";
      default:
        return "notifications-outline";
    }
  };

  // Notification icon color
  const getColor = (type: NotificationType) => {
    switch (type) {
      case "gps":
        return "#C47A27";
      default:
        return GREEN;
    }
  };

  // Mark individual notification as read
  const markAsRead = (id: number) => {
    setNotifications((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, status: "read" }
          : item
      )
    );
  };

  // Mark all notifications as read
  const markAllAsRead = () => {
    setNotifications((previous) =>
      previous.map((item) => ({
        ...item,
        status: "read",
      }))
    );
  };

  const renderItem = ({
    item,
  }: {
    item: NotificationItem;
  }) => {
    const isUnread = item.status === "unread";

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isUnread && styles.unreadCard,
        ]}
        activeOpacity={0.75}
        onPress={() => markAsRead(item.id)}
      >
        {/* Icon */}
        <View
          style={[
            styles.iconBox,
            isUnread && styles.unreadIconBox,
          ]}
        >
          <Ionicons
            name={getIcon(item.type)}
            size={23}
            color={getColor(item.type)}
          />
        </View>

        {/* Content */}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text
              style={[
                styles.notificationTitle,
                isUnread && styles.unreadTitle,
              ]}
            >
              {item.title}
            </Text>

            {isUnread && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>
                  NEW
                </Text>
              </View>
            )}
          </View>

          <Text style={styles.message}>
            {item.message}
          </Text>

          <View style={styles.timeRow}>
            <Ionicons
              name="time-outline"
              size={13}
              color="#929D95"
            />

            <Text style={styles.time}>
              {item.time}
            </Text>
          </View>
        </View>

        {/* Unread Indicator */}
        {isUnread && <View style={styles.dot} />}
      </TouchableOpacity>
    );
  };

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

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              Notifications
            </Text>

            <Text style={styles.headerSubtitle}>
              Stay updated with your activities
            </Text>
          </View>

          <View style={styles.headerCount}>
            <Ionicons
              name="notifications-outline"
              size={19}
              color="#FFFFFF"
            />

            <Text style={styles.headerCountText}>
              {unreadCount}
            </Text>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="mail-unread-outline"
                size={22}
                color={GREEN}
              />
            </View>

            <View>
              <Text style={styles.summaryTitle}>
                Unread Notifications
              </Text>

              <Text style={styles.summarySubtitle}>
                You have {unreadCount} unread notifications
              </Text>
            </View>
          </View>

          {unreadCount > 0 && (
            <TouchableOpacity
              onPress={markAllAsRead}
              activeOpacity={0.7}
            >
              <Text style={styles.markAllText}>
                Mark all read
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Filters */}
        <View style={styles.filterContainer}>
          {(["All", "Unread", "Read"] as FilterType[]).map(
            (filter) => {
              const selected = activeFilter === filter;

              return (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterButton,
                    selected && styles.activeFilter,
                  ]}
                  onPress={() => setActiveFilter(filter)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.filterText,
                      selected && styles.activeFilterText,
                    ]}
                  >
                    {filter}
                  </Text>

                  {filter === "Unread" && (
                    <View
                      style={[
                        styles.filterCount,
                        selected && styles.activeFilterCount,
                      ]}
                    >
                      <Text
                        style={[
                          styles.filterCountText,
                          selected &&
                            styles.activeFilterCountText,
                        ]}
                      >
                        {unreadCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            }
          )}
        </View>

        {/* Notification List */}
        <FlatList
          data={filteredNotifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            filteredNotifications.length > 0 ? (
              <Text style={styles.listHeading}>
                Recent Notifications
              </Text>
            ) : null
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIcon}>
                <Ionicons
                  name="notifications-off-outline"
                  size={35}
                  color="#A0AAA4"
                />
              </View>

              <Text style={styles.emptyTitle}>
                No Notifications Found
              </Text>

              <Text style={styles.emptySubtitle}>
                You don't have any {activeFilter.toLowerCase()}{" "}
                notifications.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
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

  // Header
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 11,
    marginTop: 3,
  },

  headerCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(255,255,255,0.18)",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 11,
  },

  headerCountText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },

  // Summary
  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },

  summaryLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#26352D",
  },

  summarySubtitle: {
    fontSize: 10,
    color: "#89938C",
    marginTop: 4,
  },

  markAllText: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "700",
  },

  // Filters
  filterContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 18,
    marginBottom: 5,
    gap: 9,
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 17,
    paddingVertical: 9,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5ECE7",
    gap: 6,
  },

  activeFilter: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  filterText: {
    color: "#68766D",
    fontSize: 12,
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#FFFFFF",
  },

  filterCount: {
    minWidth: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },

  activeFilterCount: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },

  filterCountText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "700",
  },

  activeFilterCountText: {
    color: "#FFFFFF",
  },

  // Notification list
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 25,
    flexGrow: 1,
  },

  listHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26352D",
    marginTop: 18,
    marginBottom: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginTop: 11,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#EDF1EE",
    elevation: 1,
    shadowColor: "#174D2D",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },

  unreadCard: {
    backgroundColor: "#F0FAF3",
    borderColor: "#D9F0E1",
  },

  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#F0F5F1",
    alignItems: "center",
    justifyContent: "center",
  },

  unreadIconBox: {
    backgroundColor: "#E0F4E7",
  },

  textContainer: {
    flex: 1,
    marginLeft: 12,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
  },

  notificationTitle: {
    fontWeight: "600",
    fontSize: 13,
    color: "#35443A",
    flexShrink: 1,
  },

  unreadTitle: {
    fontWeight: "800",
    color: "#26352D",
  },

  unreadBadge: {
    backgroundColor: "#E0F4E7",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 5,
  },

  unreadBadgeText: {
    color: DARK_GREEN,
    fontSize: 8,
    fontWeight: "800",
  },

  message: {
    fontSize: 11,
    color: "#77847B",
    marginTop: 5,
    lineHeight: 17,
  },

  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 7,
    gap: 4,
  },

  time: {
    fontSize: 10,
    color: "#929D95",
  },

  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: GREEN,
    marginLeft: 7,
  },

  // Empty state
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 65,
  },

  emptyIcon: {
    width: 75,
    height: 75,
    borderRadius: 25,
    backgroundColor: "#EAF0EC",
    justifyContent: "center",
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#35443A",
    marginTop: 15,
  },

  emptySubtitle: {
    fontSize: 12,
    color: "#89938C",
    marginTop: 6,
    textAlign: "center",
  },
});
