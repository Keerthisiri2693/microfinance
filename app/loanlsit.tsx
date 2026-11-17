
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

const loans = [
  {
    id: "1",
    name: "Ramesh",
    amount: "₹50,000",
    emi: "₹500",
    balance: "₹40,000",
    status: "Active",
  },
  {
    id: "2",
    name: "Lakshmi",
    amount: "₹40,000",
    emi: "₹400",
    balance: "₹30,000",
    status: "Active",
  },
  {
    id: "3",
    name: "Selvi",
    amount: "₹30,000",
    emi: "₹300",
    balance: "₹0",
    status: "Closed",
  },
];

const getAmount = (value: string) =>
  Number(value.replace(/[₹,]/g, ""));

export default function LoanList() {
  const totalLoans = loans.length;
  const activeLoans = loans.filter(
    (item) => item.status === "Active"
  ).length;
  const closedLoans = loans.filter(
    (item) => item.status === "Closed"
  ).length;

  const totalAmount = loans.reduce(
    (sum, item) => sum + getAmount(item.amount),
    0
  );

  const totalBalance = loans.reduce(
    (sum, item) => sum + getAmount(item.balance),
    0
  );

  const renderItem = ({ item }: { item: typeof loans[number] }) => {
    const isClosed = item.status === "Closed";

    return (
      <TouchableOpacity
        style={styles.loanCard}
        activeOpacity={0.75}
        onPress={() => router.push("/loandetails")}
      >
        <View style={styles.cardTop}>
          <View style={styles.customerSection}>
            <View style={styles.loanIcon}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color="#128447"
              />
            </View>

            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.loanId}>Loan ID: LN{item.id.padStart(3, "0")}</Text>
            </View>
          </View>

          <View
            style={[
              styles.statusBadge,
              isClosed && styles.closedBadge,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                isClosed && styles.closedDot,
              ]}
            />
            <Text
              style={[
                styles.statusText,
                isClosed && styles.closedText,
              ]}
            >
              {item.status}
            </Text>
          </View>
        </View>

        <View style={styles.cardDivider} />

        <View style={styles.loanDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Loan Amount</Text>
            <Text style={styles.detailValue}>{item.amount}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Weekly EMI</Text>
            <Text style={styles.detailValue}>{item.emi}</Text>
          </View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Balance</Text>
            <Text
              style={[
                styles.detailValue,
                styles.balanceValue,
              ]}
            >
              {item.balance}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.viewDetails}>View Loan Details</Text>
          <Ionicons
            name="chevron-forward"
            size={17}
            color="#1FAF5A"
          />
        </View>
      </TouchableOpacity>
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
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Loan List</Text>
            <Text style={styles.headerSubtitle}>
              Manage customer loans
            </Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="document-text-outline"
                size={21}
                color="#128447"
              />
            </View>
            <Text style={styles.summaryValue}>{totalLoans}</Text>
            <Text style={styles.summaryLabel}>Total Loans</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="checkmark-circle-outline"
                size={21}
                color="#128447"
              />
            </View>
            <Text style={styles.summaryValue}>{activeLoans}</Text>
            <Text style={styles.summaryLabel}>Active Loans</Text>
          </View>

          <View style={styles.summaryCard}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="close-circle-outline"
                size={21}
                color="#777777"
              />
            </View>
            <Text style={styles.summaryValue}>{closedLoans}</Text>
            <Text style={styles.summaryLabel}>Closed Loans</Text>
          </View>
        </View>

        {/* Loan Amount Overview */}
        <View style={styles.overviewCard}>
          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>
              Total Loan Amount
            </Text>
            <Text style={styles.overviewValue}>
              ₹{totalAmount.toLocaleString("en-IN")}
            </Text>
          </View>

          <View style={styles.overviewDivider} />

          <View style={styles.overviewItem}>
            <Text style={styles.overviewLabel}>
              Outstanding Balance
            </Text>
            <Text style={styles.outstandingValue}>
              ₹{totalBalance.toLocaleString("en-IN")}
            </Text>
          </View>
        </View>

        {/* List Header */}
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>All Loans</Text>
          <Text style={styles.countText}>
            {totalLoans} Records
          </Text>
        </View>

        {/* Loan List */}
        <FlatList
          data={loans}
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
              <Text style={styles.emptyTitle}>
                No Loans Found
              </Text>
              <Text style={styles.emptySubtitle}>
                Loan records will appear here.
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
  },
  headerInfo: {
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
    paddingHorizontal: 14,
    paddingTop: 16,
    gap: 9,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    paddingVertical: 12,
    alignItems: "center",
    elevation: 2,
  },
  summaryIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 7,
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
  overviewCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 13,
    padding: 15,
    borderRadius: 13,
    elevation: 1,
  },
  overviewItem: {
    flex: 1,
  },
  overviewLabel: {
    fontSize: 11,
    color: "#888888",
  },
  overviewValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#26352D",
    marginTop: 6,
  },
  outstandingValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#128447",
    marginTop: 6,
  },
  overviewDivider: {
    width: 1,
    backgroundColor: "#E8ECE9",
    marginHorizontal: 12,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 17,
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26352D",
  },
  countText: {
    fontSize: 11,
    color: "#888888",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 25,
  },
  loanCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  customerSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  loanIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  customerInfo: {
    marginLeft: 11,
  },
  customerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26352D",
  },
  loanId: {
    fontSize: 11,
    color: "#888888",
    marginTop: 4,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  closedBadge: {
    backgroundColor: "#F1F1F1",
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#1FAF5A",
  },
  closedDot: {
    backgroundColor: "#888888",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#128447",
  },
  closedText: {
    color: "#777777",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#F0F2F0",
    marginVertical: 13,
  },
  loanDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 10,
    color: "#888888",
    marginBottom: 5,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#26352D",
  },
  balanceValue: {
    color: "#128447",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 13,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#F0F2F0",
    gap: 4,
  },
  viewDetails: {
    fontSize: 12,
    color: "#128447",
    fontWeight: "600",
  },
  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 35,
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
