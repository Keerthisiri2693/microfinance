
import React from "react";
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

const groups = [
  {
    id: "1",
    name: "Lakshmi SHG",
    village: "Tiruvallur",
    members: 5,
  },
  {
    id: "2",
    name: "Selvi SHG",
    village: "Kanchipuram",
    members: 6,
  },
];

export default function Groups() {
  const totalMembers = groups.reduce(
    (total, item) => total + item.members,
    0
  );

  const renderItem = ({ item }: { item: typeof groups[number] }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={() => router.push("/groupdetails")}
    >
      <View style={styles.cardLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.groupInfo}>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={13}
              color="#888888"
            />
            <Text style={styles.village}>{item.village}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardRight}>
        <View style={styles.memberBadge}>
          <Ionicons
            name="people-outline"
            size={14}
            color="#128447"
          />
          <Text style={styles.members}>{item.members}</Text>
        </View>

        <Text style={styles.memberLabel}>Members</Text>

        <Ionicons
          name="chevron-forward"
          size={18}
          color="#A0AAA4"
          style={styles.arrow}
        />
      </View>
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

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Groups</Text>
            <Text style={styles.headerSubtitle}>
              Manage self-help groups
            </Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="people-outline"
                size={23}
                color="#1FAF5A"
              />
            </View>

            <View>
              <Text style={styles.summaryValue}>{groups.length}</Text>
              <Text style={styles.summaryLabel}>Total Groups</Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="person-add-outline"
                size={23}
                color="#1FAF5A"
              />
            </View>

            <View>
              <Text style={styles.summaryValue}>{totalMembers}</Text>
              <Text style={styles.summaryLabel}>Total Members</Text>
            </View>
          </View>
        </View>

        {/* List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Group List</Text>
          <Text style={styles.listCount}>
            {groups.length} Groups
          </Text>
        </View>

        {/* Group List */}
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={42}
                color="#AAB5AE"
              />
              <Text style={styles.emptyTitle}>No Groups Found</Text>
              <Text style={styles.emptySubtitle}>
                Groups will appear here when they are added.
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
    backgroundColor: "#1FAF5A",
  },
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },
  header: {
    backgroundColor: "#1FAF5A",
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 35,
    justifyContent: "center",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerPlaceholder: {
    width: 35,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 11,
    marginTop: 3,
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 17,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  summaryValue: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#26352D",
  },
  summaryLabel: {
    fontSize: 10,
    color: "#888888",
    marginTop: 3,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 17,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26352D",
  },
  listCount: {
    fontSize: 11,
    color: "#888888",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 14,
    marginBottom: 11,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 47,
    height: 47,
    borderRadius: 14,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#128447",
    fontSize: 19,
    fontWeight: "bold",
  },
  groupInfo: {
    marginLeft: 11,
    flex: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: 14,
    color: "#26352D",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  village: {
    color: "#777777",
    fontSize: 11,
    marginLeft: 3,
  },
  cardRight: {
    alignItems: "center",
    marginLeft: 8,
  },
  memberBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9,
    gap: 5,
  },
  members: {
    color: "#128447",
    fontWeight: "bold",
    fontSize: 14,
  },
  memberLabel: {
    color: "#888888",
    fontSize: 10,
    marginTop: 4,
  },
  arrow: {
    marginTop: 5,
  },
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 35,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 15,
    color: "#26352D",
    fontWeight: "700",
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 12,
    color: "#888888",
    marginTop: 5,
    textAlign: "center",
  },
});
