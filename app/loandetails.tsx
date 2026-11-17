
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const history = [
  { id: "1", date: "10 Mar 2026", amount: "₹500" },
  { id: "2", date: "03 Mar 2026", amount: "₹500" },
  { id: "3", date: "24 Feb 2026", amount: "₹500" },
];

export default function LoanDetails() {
  const loanAmount = 50000;
  const paidAmount = 10000;
  const balance = 40000;
  const progress = (paidAmount / loanAmount) * 100;

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

          <Text style={styles.headerTitle}>Loan Details</Text>

          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.body}
        >
          {/* Customer Profile */}
          <View style={styles.profileCard}>
            <View style={styles.profileTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>

              <View style={styles.profileInfo}>
                <Text style={styles.name}>Ramesh</Text>
                <Text style={styles.mobile}>9876543210</Text>
                <View style={styles.locationRow}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color="#888888"
                  />
                  <Text style={styles.village}>Tiruvallur</Text>
                </View>
              </View>

              <View style={styles.activeBadge}>
                <View style={styles.activeDot} />
                <Text style={styles.activeText}>Active</Text>
              </View>
            </View>

            <View style={styles.profileFooter}>
              <Text style={styles.loanId}>Loan ID: LN001</Text>
              <Text style={styles.loanType}>Weekly Loan</Text>
            </View>
          </View>

          {/* Loan Overview */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Loan Overview</Text>
          </View>

          <View style={styles.overviewCard}>
            <Text style={styles.overviewLabel}>Outstanding Balance</Text>
            <Text style={styles.balanceAmount}>₹40,000</Text>

            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Repayment Progress</Text>
              <Text style={styles.progressPercent}>
                {progress.toFixed(0)}%
              </Text>
            </View>

            <View style={styles.progressBackground}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${progress}%` },
                ]}
              />
            </View>

            <View style={styles.progressFooter}>
              <Text style={styles.progressFooterText}>
                Paid: ₹10,000
              </Text>
              <Text style={styles.progressFooterText}>
                Total: ₹50,000
              </Text>
            </View>
          </View>

          {/* Loan Information */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Loan Information</Text>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="wallet-outline"
                  size={18}
                  color="#128447"
                />
              </View>
              <Text style={styles.infoLabel}>Loan Amount</Text>
              <Text style={styles.infoValue}>₹50,000</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="pie-chart-outline"
                  size={18}
                  color="#128447"
                />
              </View>
              <Text style={styles.infoLabel}>Interest Rate</Text>
              <Text style={styles.infoValue}>22%</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color="#128447"
                />
              </View>
              <Text style={styles.infoLabel}>Weekly EMI</Text>
              <Text style={styles.infoValue}>₹500</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#128447"
                />
              </View>
              <Text style={styles.infoLabel}>Paid Amount</Text>
              <Text style={styles.paidValue}>₹10,000</Text>
            </View>

            <View style={styles.separator} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <Ionicons
                  name="hourglass-outline"
                  size={18}
                  color="#128447"
                />
              </View>
              <Text style={styles.infoLabel}>Balance Amount</Text>
              <Text style={styles.balanceValue}>₹40,000</Text>
            </View>
          </View>

          {/* EMI History */}
          <View style={styles.historyHeader}>
            <Text style={styles.sectionTitle}>EMI Payment History</Text>
            <Text style={styles.historyCount}>
              {history.length} Payments
            </Text>
          </View>

          <View style={styles.historyCard}>
            {history.map((item, index) => (
              <View key={item.id}>
                <View style={styles.historyRow}>
                  <View style={styles.historyIcon}>
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color="#128447"
                    />
                  </View>

                  <View style={styles.historyInfo}>
                    <Text style={styles.historyDate}>{item.date}</Text>
                    <Text style={styles.historyStatus}>
                      Payment Successful
                    </Text>
                  </View>

                  <View style={styles.historyAmountContainer}>
                    <Text style={styles.paid}>{item.amount}</Text>
                    <Text style={styles.paidLabel}>Paid</Text>
                  </View>
                </View>

                {index !== history.length - 1 && (
                  <View style={styles.historySeparator} />
                )}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Collect EMI Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.collectBtn}
            activeOpacity={0.85}
            onPress={() => router.push("/collectemiamount")}
          >
            <Ionicons name="cash-outline" size={21} color="#FFFFFF" />
            <Text style={styles.collectText}>Collect EMI</Text>
          </TouchableOpacity>
        </View>
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
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 19,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerPlaceholder: {
    width: 35,
  },
  body: {
    padding: 15,
    paddingBottom: 20,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  profileTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#128447",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#26352D",
  },
  mobile: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 3,
  },
  village: {
    fontSize: 11,
    color: "#888888",
  },
  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#1FAF5A",
  },
  activeText: {
    fontSize: 11,
    color: "#128447",
    fontWeight: "700",
  },
  profileFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#F0F2F0",
    marginTop: 15,
    paddingTop: 12,
  },
  loanId: {
    fontSize: 11,
    color: "#777777",
  },
  loanType: {
    fontSize: 11,
    color: "#128447",
    fontWeight: "600",
  },
  sectionHeader: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26352D",
  },
  overviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 17,
    marginBottom: 20,
    elevation: 2,
  },
  overviewLabel: {
    fontSize: 12,
    color: "#777777",
  },
  balanceAmount: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#128447",
    marginTop: 5,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 11,
    color: "#777777",
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#128447",
  },
  progressBackground: {
    height: 8,
    backgroundColor: "#E8F0EB",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#1FAF5A",
    borderRadius: 10,
  },
  progressFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  progressFooterText: {
    fontSize: 11,
    color: "#888888",
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 20,
    elevation: 1,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  infoLabel: {
    flex: 1,
    marginLeft: 11,
    fontSize: 12,
    color: "#777777",
  },
  infoValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#26352D",
  },
  paidValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#128447",
  },
  balanceValue: {
    fontSize: 13,
    fontWeight: "700",
    color: "#128447",
  },
  separator: {
    height: 1,
    backgroundColor: "#F0F2F0",
    marginLeft: 46,
  },
  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  historyCount: {
    fontSize: 11,
    color: "#888888",
  },
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    marginBottom: 10,
    elevation: 1,
  },
  historyRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
  },
  historyIcon: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  historyInfo: {
    flex: 1,
    marginLeft: 11,
  },
  historyDate: {
    fontSize: 13,
    fontWeight: "600",
    color: "#26352D",
  },
  historyStatus: {
    fontSize: 10,
    color: "#888888",
    marginTop: 4,
  },
  historyAmountContainer: {
    alignItems: "flex-end",
  },
  paid: {
    color: "#128447",
    fontWeight: "bold",
    fontSize: 14,
  },
  paidLabel: {
    fontSize: 10,
    color: "#888888",
    marginTop: 3,
  },
  historySeparator: {
    height: 1,
    backgroundColor: "#F0F2F0",
    marginLeft: 47,
  },
  bottomContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 11,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: "#E9EDEA",
    bottom:40,
  },
  collectBtn: {
    backgroundColor: "#1FAF5A",
    padding: 15,
    borderRadius: 11,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
  },
  collectText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
