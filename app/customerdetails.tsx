
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

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

const customer = {
  name: "Ramesh",
  mobile: "9876543210",
  address: "Chennai, Tamil Nadu",
  loanAmount: 50000,
  emi: 500,
  paidAmount: 10000,
};

const paymentHistory = [
  { id: "1", date: "10 Feb 2026", amount: 500, status: "Paid" },
  { id: "2", date: "03 Feb 2026", amount: 500, status: "Paid" },
  { id: "3", date: "27 Jan 2026", amount: 500, status: "Paid" },
];

export default function CustomerDetails() {
  const balance = Math.max(
    customer.loanAmount - customer.paidAmount,
    0
  );

  const progress = Math.min(
    (customer.paidAmount / customer.loanAmount) * 100,
    100
  );

  const formatAmount = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

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
              Customer Details
            </Text>
            <Text style={styles.headerSubtitle}>
              View customer loan information
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="person-outline"
              size={22}
              color="#FFFFFF"
            />
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.body}
        >
          {/* Customer Profile */}
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {customer.name.charAt(0)}
              </Text>
            </View>

            <Text style={styles.name}>
              {customer.name}
            </Text>

            <View style={styles.profileInfoRow}>
              <Ionicons
                name="call-outline"
                size={14}
                color="#89958D"
              />
              <Text style={styles.mobile}>
                {customer.mobile}
              </Text>
            </View>

            <View style={styles.profileInfoRow}>
              <Ionicons
                name="location-outline"
                size={14}
                color="#89958D"
              />
              <Text style={styles.address}>
                {customer.address}
              </Text>
            </View>

            <View style={styles.activeBadge}>
              <View style={styles.activeDot} />
              <Text style={styles.activeText}>
                Active Customer
              </Text>
            </View>
          </View>

          {/* Loan Summary */}
          <View style={styles.loanSummaryCard}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIcon}>
                <Ionicons
                  name="wallet-outline"
                  size={19}
                  color={GREEN}
                />
              </View>

              <View>
                <Text style={styles.sectionTitle}>
                  Loan Overview
                </Text>
                <Text style={styles.sectionSubtitle}>
                  Current loan repayment details
                </Text>
              </View>
            </View>

            <View style={styles.loanAmountBox}>
              <Text style={styles.loanAmountLabel}>
                Total Loan Amount
              </Text>

              <Text style={styles.loanAmount}>
                {formatAmount(customer.loanAmount)}
              </Text>

              <View style={styles.progressInfo}>
                <Text style={styles.progressLabel}>
                  Repayment Progress
                </Text>
                <Text style={styles.progressPercentage}>
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
            </View>

            <View style={styles.loanStats}>
              <View style={styles.loanStatItem}>
                <View style={styles.statIcon}>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={19}
                    color={GREEN}
                  />
                </View>

                <Text style={styles.statLabel}>
                  Paid Amount
                </Text>

                <Text style={styles.paidValue}>
                  {formatAmount(customer.paidAmount)}
                </Text>
              </View>

              <View style={styles.statDivider} />

              <View style={styles.loanStatItem}>
                <View style={styles.balanceIcon}>
                  <Ionicons
                    name="time-outline"
                    size={19}
                    color="#D18B32"
                  />
                </View>

                <Text style={styles.statLabel}>
                  Balance
                </Text>

                <Text style={styles.balanceValue}>
                  {formatAmount(balance)}
                </Text>
              </View>
            </View>

            <View style={styles.emiBox}>
              <View style={styles.emiIcon}>
                <Ionicons
                  name="calendar-outline"
                  size={19}
                  color={DARK_GREEN}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.emiLabel}>
                  Weekly EMI
                </Text>
                <Text style={styles.emiDescription}>
                  Regular installment amount
                </Text>
              </View>

              <Text style={styles.emiAmount}>
                {formatAmount(customer.emi)}
              </Text>
            </View>
          </View>

          {/* Payment History */}
          <View style={styles.historyCard}>
            <View style={styles.historyHeader}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="receipt-outline"
                    size={19}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Payment History
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Recent EMI transactions
                  </Text>
                </View>
              </View>

              <Text style={styles.paymentCount}>
                {paymentHistory.length} Payments
              </Text>
            </View>

            {paymentHistory.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.paymentRow,
                  index === paymentHistory.length - 1 &&
                    styles.lastPaymentRow,
                ]}
              >
                <View style={styles.paymentIcon}>
                  <Ionicons
                    name="cash-outline"
                    size={19}
                    color={GREEN}
                  />
                </View>

                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentDate}>
                    {item.date}
                  </Text>

                  <View style={styles.paidBadge}>
                    <Ionicons
                      name="checkmark-circle"
                      size={12}
                      color={DARK_GREEN}
                    />
                    <Text style={styles.paidBadgeText}>
                      {item.status}
                    </Text>
                  </View>
                </View>

                <Text style={styles.paymentAmount}>
                  {formatAmount(item.amount)}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Fixed Collect EMI Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.collectBtn}
            activeOpacity={0.85}
            onPress={() =>
              router.push("/collectemiamount")
            }
          >
            <Ionicons
              name="cash-outline"
              size={21}
              color="#FFFFFF"
            />

            <Text style={styles.collectText}>
              Collect EMI
            </Text>

            <Ionicons
              name="arrow-forward"
              size={18}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: 17,
    paddingVertical: 14,
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
    fontSize: 18,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 10,
    marginTop: 3,
  },

  headerIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  body: {
    padding: 15,
    paddingBottom: 20,
  },

  // Profile
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 14,
    elevation: 2,
  },

  avatar: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: GREEN,
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },

  name: {
    fontSize: 18,
    fontWeight: "800",
    color: "#26352D",
    marginTop: 11,
  },

  profileInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },

  mobile: {
    color: "#68766D",
    fontSize: 12,
  },

  address: {
    color: "#89958D",
    fontSize: 11,
  },

  activeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 12,
    gap: 6,
  },

  activeDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: GREEN,
  },

  activeText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "700",
  },

  // Loan Overview
  loanSummaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  sectionIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  sectionTitle: {
    color: "#26352D",
    fontSize: 14,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 3,
  },

  loanAmountBox: {
    backgroundColor: "#F3FAF5",
    padding: 14,
    borderRadius: 12,
    marginTop: 17,
  },

  loanAmountLabel: {
    color: "#78877D",
    fontSize: 11,
  },

  loanAmount: {
    color: DARK_GREEN,
    fontSize: 25,
    fontWeight: "800",
    marginTop: 5,
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 7,
  },

  progressLabel: {
    color: "#78877D",
    fontSize: 10,
    fontWeight: "600",
  },

  progressPercentage: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "800",
  },

  progressBackground: {
    height: 7,
    backgroundColor: "#DCECE1",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: 7,
    backgroundColor: GREEN,
    borderRadius: 10,
  },

  loanStats: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 17,
    marginBottom: 15,
  },

  loanStatItem: {
    flex: 1,
    alignItems: "center",
  },

  statIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },

  balanceIcon: {
    width: 35,
    height: 35,
    borderRadius: 10,
    backgroundColor: "#FFF4E5",
    alignItems: "center",
    justifyContent: "center",
  },

  statLabel: {
    fontSize: 10,
    color: "#89958D",
    marginTop: 7,
  },

  paidValue: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
    marginTop: 3,
  },

  balanceValue: {
    color: "#C1842E",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 3,
  },

  statDivider: {
    height: 55,
    width: 1,
    backgroundColor: "#E8EDE9",
  },

  emiBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAF8",
    borderWidth: 1,
    borderColor: "#E8EDE9",
    borderRadius: 11,
    padding: 11,
  },

  emiIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  emiLabel: {
    color: "#34443A",
    fontSize: 12,
    fontWeight: "700",
  },

  emiDescription: {
    color: "#89958D",
    fontSize: 9,
    marginTop: 3,
  },

  emiAmount: {
    color: DARK_GREEN,
    fontSize: 16,
    fontWeight: "800",
  },

  // Payment History
  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },

  historyHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  paymentCount: {
    color: DARK_GREEN,
    fontSize: 9,
    fontWeight: "700",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },

  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EDF1EE",
  },

  lastPaymentRow: {
    borderBottomWidth: 0,
  },

  paymentIcon: {
    width: 37,
    height: 37,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },

  paymentInfo: {
    flex: 1,
    marginLeft: 10,
  },

  paymentDate: {
    color: "#34443A",
    fontSize: 12,
    fontWeight: "700",
  },

  paidBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },

  paidBadgeText: {
    color: DARK_GREEN,
    fontSize: 9,
    fontWeight: "600",
  },

  paymentAmount: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
  },

  // Bottom Button
  bottomContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 17,
    paddingTop: 12,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: "#E8EDE9",
  },

  collectBtn: {
    backgroundColor: GREEN,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    gap: 9,
    elevation: 2,
  },

  collectText: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 15,
    flex: 1,
    textAlign: "center",
  },
});
