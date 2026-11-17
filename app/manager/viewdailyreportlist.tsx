
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
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const officers = [
  {
    id: "1",
    name: "Ramesh Kumar",
    branch: "Tiruvallur",
    reports: 3,
  },
  {
    id: "2",
    name: "Selvi",
    branch: "Avadi",
    reports: 2,
  },
  {
    id: "3",
    name: "Kumar",
    branch: "Chennai",
    reports: 5,
  },
];

export default function ViewDailyReportList() {
  const router = useRouter();

  const totalReports = officers.reduce(
    (total, officer) => total + officer.reports,
    0
  );

  const renderItem = ({ item, index }: { item: typeof officers[number]; index: number }) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.75}
      onPress={() =>
        router.push("/manager/viewworkdailyreportdetails")
      }
    >
      <View style={styles.cardLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.officerInfo}>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.branchRow}>
            <Ionicons
              name="location-outline"
              size={13}
              color="#888888"
            />
            <Text style={styles.branch}>{item.branch}</Text>
          </View>

          <Text style={styles.officerNumber}>
            Field Officer #{index + 1}
          </Text>
        </View>
      </View>

      <View style={styles.cardRight}>
        <View style={styles.reportBadge}>
          <Ionicons
            name="document-text-outline"
            size={15}
            color="#128447"
          />
          <Text style={styles.reportCount}>
            {item.reports}
          </Text>
        </View>

        <Text style={styles.reportLabel}>Reports</Text>

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
            <Text style={styles.title}>Field Officer Reports</Text>
            <Text style={styles.headerSubtitle}>
              View daily work reports
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
                size={22}
                color="#1FAF5A"
              />
            </View>

            <View>
              <Text style={styles.summaryValue}>
                {officers.length}
              </Text>
              <Text style={styles.summaryLabel}>
                Total Officers
              </Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color="#1FAF5A"
              />
            </View>

            <View>
              <Text style={styles.summaryValue}>
                {totalReports}
              </Text>
              <Text style={styles.summaryLabel}>
                Total Reports
              </Text>
            </View>
          </View>
        </View>

        {/* List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>
            Officer List
          </Text>
          <Text style={styles.listCount}>
            {officers.length} Officers
          </Text>
        </View>

        {/* Officer List */}
        <FlatList
          data={officers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="document-text-outline"
                size={42}
                color="#AAB5AE"
              />
              <Text style={styles.emptyText}>
                No officer reports found
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
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 11,
    marginTop: 3,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 17,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
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
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 17,
    marginTop: 23,
    marginBottom: 10,
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
  officerInfo: {
    marginLeft: 11,
    flex: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: 14,
    color: "#26352D",
  },
  branchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  branch: {
    fontSize: 11,
    color: "#777777",
    marginLeft: 3,
  },
  officerNumber: {
    fontSize: 10,
    color: "#A0AAA4",
    marginTop: 5,
  },
  cardRight: {
    alignItems: "center",
    marginLeft: 8,
  },
  reportBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    borderRadius: 9,
    paddingHorizontal: 10,
    paddingVertical: 6,
    gap: 5,
  },
  reportCount: {
    color: "#128447",
    fontSize: 14,
    fontWeight: "bold",
  },
  reportLabel: {
    fontSize: 10,
    color: "#888888",
    marginTop: 4,
  },
  arrow: {
    marginTop: 5,
  },
  emptyContainer: {
    alignItems: "center",
    padding: 35,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
  },
  emptyText: {
    color: "#777777",
    marginTop: 10,
    fontSize: 13,
  },
});
