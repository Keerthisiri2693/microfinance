
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

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

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push("/groupdetails")}
    >
      <View style={styles.cardTop}>
        <View style={styles.left}>
          <View style={styles.groupIcon}>
            <Ionicons name="people" size={25} color={GREEN} />
          </View>

          <View style={styles.groupInfo}>
            <Text style={styles.name}>{item.name}</Text>

            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={14}
                color="#87928B"
              />
              <Text style={styles.village}>{item.village}</Text>
            </View>
          </View>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color="#A0AAA3"
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.cardBottom}>
        <View style={styles.memberInfo}>
          <Ionicons
            name="people-outline"
            size={17}
            color={GREEN}
          />
          <Text style={styles.memberLabel}>Group Members</Text>
        </View>

        <View style={styles.memberBadge}>
          <Text style={styles.members}>{item.members} Members</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

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

          <Text style={styles.headerTitle}>Groups</Text>

          <View style={styles.headerRight} />
        </View>

        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              {/* Page Heading */}
              <Text style={styles.heading}>Group Management</Text>
              <Text style={styles.subHeading}>
                Manage self-help groups and their members
              </Text>

              {/* Summary */}
              <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                  <View style={styles.summaryIcon}>
                    <Ionicons
                      name="people-outline"
                      size={23}
                      color={GREEN}
                    />
                  </View>

                  <Text style={styles.summaryValue}>
                    {groups.length}
                  </Text>
                  <Text style={styles.summaryLabel}>Total Groups</Text>
                </View>

                <View style={styles.summaryCard}>
                  <View style={styles.summaryIcon}>
                    <Ionicons
                      name="person-outline"
                      size={23}
                      color={GREEN}
                    />
                  </View>

                  <Text style={styles.summaryValue}>
                    {totalMembers}
                  </Text>
                  <Text style={styles.summaryLabel}>Total Members</Text>
                </View>
              </View>

              {/* List Heading */}
              <View style={styles.listHeading}>
                <Text style={styles.sectionTitle}>All Groups</Text>
                <Text style={styles.countText}>
                  {groups.length} Groups
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={45}
                color="#AAB5AE"
              />
              <Text style={styles.emptyText}>No groups found</Text>
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

  listContent: {
    padding: 16,
    paddingBottom: 30,
  },

  heading: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#26352D",
  },

  subHeading: {
    fontSize: 12,
    color: "#87928B",
    marginTop: 5,
  },

  summaryContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 14,
    elevation: 2,
  },

  summaryIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  summaryValue: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#26352D",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#87928B",
    marginTop: 4,
  },

  listHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#26352D",
  },

  countText: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    marginBottom: 13,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  groupIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  groupInfo: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26352D",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 4,
  },

  village: {
    color: "#87928B",
    fontSize: 12,
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF1EF",
    marginVertical: 14,
  },

  cardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  memberInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  memberLabel: {
    color: "#69756E",
    fontSize: 12,
  },

  memberBadge: {
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
  },

  members: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "700",
  },

  emptyContainer: {
    alignItems: "center",
    padding: 35,
  },

  emptyText: {
    color: "#87928B",
    marginTop: 10,
    fontSize: 14,
  },
});
