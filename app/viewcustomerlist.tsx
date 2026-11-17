
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

const customers = [
  {
    id: "1",
    name: "Ramesh",
    mobile: "9876543210",
    loan: "₹50,000",
    emi: "₹500",
  },
  {
    id: "2",
    name: "Lakshmi",
    mobile: "9123456780",
    loan: "₹40,000",
    emi: "₹400",
  },
  {
    id: "3",
    name: "Suresh",
    mobile: "9988776655",
    loan: "₹60,000",
    emi: "₹600",
  },
];

export default function Customers() {
  const totalLoanAmount = customers.reduce(
    (total, item) =>
      total + Number(item.loan.replace(/[₹,]/g, "")),
    0
  );

  const renderItem = ({ item }: { item: typeof customers[number] }) => (
    <View style={styles.card}>
      {/* Customer Details */}
      <TouchableOpacity
        style={styles.customerDetails}
        activeOpacity={0.75}
        onPress={() => router.push("/customerdetails")}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.name}>{item.name}</Text>

          <View style={styles.mobileRow}>
            <Ionicons
              name="call-outline"
              size={13}
              color="#888888"
            />
            <Text style={styles.mobile}>{item.mobile}</Text>
          </View>

          <Text style={styles.loan}>Loan: {item.loan}</Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={18}
          color="#A0AAA4"
        />
      </TouchableOpacity>

      {/* EMI and Collection */}
      <View style={styles.cardFooter}>
        <View style={styles.emiContainer}>
          <Ionicons
            name="calendar-outline"
            size={15}
            color="#128447"
          />
          <Text style={styles.emiLabel}>Monthly EMI</Text>
          <Text style={styles.emi}>{item.emi}</Text>
        </View>

        <TouchableOpacity
          style={styles.collectBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/collectemiamount")}
        >
          <Ionicons name="cash-outline" size={17} color="#FFFFFF" />
          <Text style={styles.collectText}>Collect EMI</Text>
        </TouchableOpacity>
      </View>
    </View>
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
            <Text style={styles.headerTitle}>Customers</Text>
            <Text style={styles.headerSubtitle}>
              Manage customer accounts
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

            <View style={styles.summaryInfo}>
              <Text style={styles.summaryValue}>
                {customers.length}
              </Text>
              <Text style={styles.summaryLabel}>
                Total Customers
              </Text>
            </View>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="wallet-outline"
                size={22}
                color="#1FAF5A"
              />
            </View>

            <View style={styles.summaryInfo}>
              <Text style={styles.summaryValue}>
                ₹{totalLoanAmount.toLocaleString("en-IN")}
              </Text>
              <Text style={styles.summaryLabel}>
                Total Loan Amount
              </Text>
            </View>
          </View>
        </View>

        {/* List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Customer List</Text>
          <Text style={styles.customerCount}>
            {customers.length} Customers
          </Text>
        </View>

        {/* Customer List */}
        <FlatList
          data={customers}
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
              <Text style={styles.emptyTitle}>
                No Customers Found
              </Text>
              <Text style={styles.emptySubtitle}>
                Customer records will appear here.
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
    fontSize: 19,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerSubtitle: {
    fontSize: 11,
    color: "#E5F8EC",
    marginTop: 3,
  },
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 16,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 13,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  summaryInfo: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 17,
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
    marginTop: 23,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26352D",
  },
  customerCount: {
    fontSize: 11,
    color: "#888888",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  customerDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#128447",
    fontWeight: "bold",
    fontSize: 19,
  },
  customerInfo: {
    flex: 1,
    marginLeft: 11,
  },
  name: {
    fontWeight: "700",
    fontSize: 15,
    color: "#26352D",
  },
  mobileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 4,
  },
  mobile: {
    color: "#777777",
    fontSize: 11,
  },
  loan: {
    fontSize: 12,
    color: "#128447",
    fontWeight: "600",
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F0",
  },
  emiContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  emiLabel: {
    fontSize: 11,
    color: "#777777",
  },
  emi: {
    fontSize: 13,
    color: "#26352D",
    fontWeight: "bold",
  },
  collectBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1FAF5A",
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: 9,
    gap: 6,
  },
  collectText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    padding: 35,
    borderRadius: 14,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26352D",
    marginTop: 10,
  },
  emptySubtitle: {
    fontSize: 12,
    color: "#888888",
    marginTop: 5,
  },
});
