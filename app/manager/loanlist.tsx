
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

const loans = [
  {
    id: "1",
    customer: "Lakshmi",
    group: "Lakshmi SHG",
    amount: "₹50,000",
    emi: "₹500",
    status: "Active",
  },
  {
    id: "2",
    customer: "Selvi",
    group: "Lakshmi SHG",
    amount: "₹40,000",
    emi: "₹400",
    status: "Active",
  },
  {
    id: "3",
    customer: "Radha",
    group: "Avadi SHG",
    amount: "₹30,000",
    emi: "₹300",
    status: "Closed",
  },
];

export default function LoanList() {
  const router = useRouter();

  const activeLoans = loans.filter(
    (item) => item.status === "Active"
  ).length;

  const closedLoans = loans.filter(
    (item) => item.status === "Closed"
  ).length;

  const renderItem = ({ item }: any) => {
    const isActive = item.status === "Active";

   return (
  <TouchableOpacity
    style={styles.card}
    activeOpacity={0.8}
    onPress={() =>
      router.push({
        pathname: "/loandetails",
        params: {
          customer: item.customer,
          group: item.group,
          amount: item.amount,
          emi: item.emi,
          status: item.status,
        },
      })
    }
  >
    {/* Loan Header */}
    <View style={styles.cardTop}>
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.customer.charAt(0)}
          </Text>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.customer}>{item.customer}</Text>
          <Text style={styles.group}>{item.group}</Text>
        </View>
      </View>

      <View
        style={[
          styles.statusBadge,
          isActive ? styles.activeBadge : styles.closedBadge,
        ]}
      >
        <View
          style={[
            styles.statusDot,
            isActive ? styles.activeDot : styles.closedDot,
          ]}
        />
        <Text
          style={[
            styles.statusText,
            isActive ? styles.activeText : styles.closedText,
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>

    <View style={styles.divider} />

    {/* Loan Information */}
    <View style={styles.detailsRow}>
      <View>
        <Text style={styles.detailLabel}>Loan Amount</Text>
        <Text style={styles.amount}>{item.amount}</Text>
      </View>

      <View style={styles.emiContainer}>
        <Text style={styles.detailLabel}>Monthly EMI</Text>
        <Text style={styles.emi}>{item.emi}</Text>
      </View>
    </View>

    <View style={styles.viewDetails}>
      <Text style={styles.viewDetailsText}>Loan Information</Text>
      <Ionicons name="chevron-forward" size={17} color={GREEN} />
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

          <Text style={styles.headerTitle}>Loans</Text>

          <View style={styles.headerRight} />
        </View>

        <FlatList
          data={loans}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={
            <View>
              {/* Page Heading */}
              <Text style={styles.heading}>Loan Management</Text>
              <Text style={styles.subHeading}>
                Monitor customer loans and repayment details
              </Text>

              {/* Summary Cards */}
              <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                  <View style={styles.summaryIcon}>
                    <Ionicons
                      name="wallet-outline"
                      size={22}
                      color={GREEN}
                    />
                  </View>

                  <Text style={styles.summaryValue}>
                    {loans.length}
                  </Text>
                  <Text style={styles.summaryLabel}>Total Loans</Text>
                </View>

                <View style={styles.summaryCard}>
                  <View style={styles.summaryIcon}>
                    <Ionicons
                      name="checkmark-circle-outline"
                      size={22}
                      color={GREEN}
                    />
                  </View>

                  <Text style={styles.summaryValue}>
                    {activeLoans}
                  </Text>
                  <Text style={styles.summaryLabel}>Active Loans</Text>
                </View>

                <View style={styles.summaryCard}>
                  <View style={styles.summaryIcon}>
                    <Ionicons
                      name="close-circle-outline"
                      size={22}
                      color="#87928B"
                    />
                  </View>

                  <Text style={styles.summaryValue}>
                    {closedLoans}
                  </Text>
                  <Text style={styles.summaryLabel}>Closed Loans</Text>
                </View>
              </View>

              {/* List Heading */}
              <View style={styles.listHeading}>
                <Text style={styles.sectionTitle}>All Loans</Text>
                <Text style={styles.countText}>
                  {loans.length} Records
                </Text>
              </View>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="wallet-outline"
                size={45}
                color="#AAB5AE"
              />
              <Text style={styles.emptyText}>No loans found</Text>
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
    gap: 9,
    marginTop: 20,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 13,
    elevation: 2,
  },

  summaryIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 9,
  },

  summaryValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#26352D",
  },

  summaryLabel: {
    fontSize: 10,
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
    fontWeight: "600",
    color: DARK_GREEN,
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
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  avatarText: {
    color: DARK_GREEN,
    fontWeight: "bold",
    fontSize: 18,
  },

  customerInfo: {
    flex: 1,
  },

  customer: {
    fontWeight: "700",
    fontSize: 15,
    color: "#26352D",
  },

  group: {
    color: "#87928B",
    fontSize: 12,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },

  activeBadge: {
    backgroundColor: "#E8F7EF",
  },

  closedBadge: {
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

  closedDot: {
    backgroundColor: "#89949D",
  },

  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },

  activeText: {
    color: DARK_GREEN,
  },

  closedText: {
    color: "#737B80",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF1EF",
    marginVertical: 14,
  },

  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  detailLabel: {
    color: "#87928B",
    fontSize: 11,
    marginBottom: 5,
  },

  amount: {
    fontWeight: "bold",
    fontSize: 17,
    color: "#26352D",
  },

  emiContainer: {
    alignItems: "flex-end",
  },

  emi: {
    fontSize: 15,
    fontWeight: "600",
    color: GREEN,
  },

  viewDetails: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 13,
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
