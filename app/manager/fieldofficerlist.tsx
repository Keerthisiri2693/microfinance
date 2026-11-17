
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
import { useRouter } from "expo-router";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

const officers = [
  {
    id: "1",
    name: "Ramesh Kumar",
    empId: "EMP102",
    area: "Tiruvallur",
    collection: "₹12,500",
    status: "In Field",
  },
  {
    id: "2",
    name: "Selvi",
    empId: "EMP103",
    area: "Avadi",
    collection: "₹8,000",
    status: "In Field",
  },
  {
    id: "3",
    name: "Kumar",
    empId: "EMP104",
    area: "Poonamallee",
    collection: "₹0",
    status: "Offline",
  },
];

export default function FieldOfficerList() {
  const router = useRouter();

  const activeCount = officers.filter(
    (item) => item.status === "In Field"
  ).length;

  const renderItem = ({ item }: any) => {
    const isActive = item.status === "In Field";

    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          router.push("/manager/fieldofficerdetails")
        }
      >
        <View style={styles.cardTop}>
          <View style={styles.left}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.officerInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.empId}>{item.empId}</Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              isActive ? styles.activeBadge : styles.offlineBadge,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isActive ? styles.activeDot : styles.offlineDot,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                isActive ? styles.activeText : styles.offlineText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardBottom}>
          <View style={styles.areaContainer}>
            <Ionicons
              name="location-outline"
              size={17}
              color="#849189"
            />
            <Text style={styles.area}>{item.area}</Text>
          </View>

          <View style={styles.collectionContainer}>
            <Text style={styles.collectionLabel}>
              Today's Collection
            </Text>
            <Text style={styles.collection}>
              {item.collection}
            </Text>
          </View>
        </View>

        <View style={styles.viewDetails}>
          <Text style={styles.viewDetailsText}>View Details</Text>
          <Ionicons
            name="chevron-forward"
            size={17}
            color={GREEN}
          />
        </View>
      </TouchableOpacity>
    );
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

          <Text style={styles.headerTitle}>Field Officers</Text>

          <View style={styles.headerRight} />
        </View>

        <FlatList
          data={officers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              {/* Page Heading */}
              <Text style={styles.heading}>
                Officer Management
              </Text>
              <Text style={styles.subHeading}>
                Monitor your field officers and daily collections
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
                    {officers.length}
                  </Text>
                  <Text style={styles.summaryLabel}>
                    Total Officers
                  </Text>
                </View>

                <View style={styles.summaryCard}>
                  <View style={styles.summaryIcon}>
                    <Ionicons
                      name="radio-outline"
                      size={23}
                      color={GREEN}
                    />
                  </View>

                  <Text style={styles.summaryValue}>
                    {activeCount}
                  </Text>
                  <Text style={styles.summaryLabel}>
                    Active Officers
                  </Text>
                </View>
              </View>

              <View style={styles.listHeading}>
                <Text style={styles.sectionTitle}>
                  Officer List
                </Text>
                <Text style={styles.countText}>
                  {officers.length} Officers
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={42}
                color="#AAB5AE"
              />
              <Text style={styles.emptyText}>
                No field officers found
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

  header: {
    height: 58,
    backgroundColor: GREEN,
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    fontSize: 12,
    color: DARK_GREEN,
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
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: DARK_GREEN,
    fontWeight: "bold",
    fontSize: 19,
  },

  officerInfo: {
    flex: 1,
  },

  name: {
    fontWeight: "700",
    fontSize: 15,
    color: "#26352D",
  },

  empId: {
    color: "#89948D",
    fontSize: 12,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
  },

  activeBadge: {
    backgroundColor: "#E8F7EF",
  },

  offlineBadge: {
    backgroundColor: "#F0F1F2",
  },

  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 5,
  },

  activeDot: {
    backgroundColor: GREEN,
  },

  offlineDot: {
    backgroundColor: "#9AA1A5",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  activeText: {
    color: DARK_GREEN,
  },

  offlineText: {
    color: "#737B80",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF1EF",
    marginVertical: 14,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  areaContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  area: {
    fontSize: 12,
    color: "#69756E",
  },

  collectionContainer: {
    alignItems: "flex-end",
  },

  collectionLabel: {
    fontSize: 10,
    color: "#89948D",
  },

  collection: {
    color: GREEN,
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 3,
  },

  viewDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 12,
  },

  viewDetailsText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: "600",
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
