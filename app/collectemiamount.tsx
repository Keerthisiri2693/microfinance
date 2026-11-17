
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

const customer = {
  id: "1",
  name: "Ramesh",
  phone: "9876543210",
  village: "Tiruvallur",
  loanAmount: 50000,
  weeklyEmi: 500,
  balance: 40000,
};

type PaymentMode = "Cash" | "UPI";

const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function CollectEMI() {
  const [amount, setAmount] = useState(
    String(customer.weeklyEmi)
  );
  const [mode, setMode] = useState<PaymentMode>("Cash");

  const numericAmount = useMemo(
    () => Number(amount),
    [amount]
  );

  const remainingBalance = useMemo(
    () => Math.max(0, customer.balance - (numericAmount || 0)),
    [numericAmount]
  );

  const handleSave = () => {
    if (!amount.trim()) {
      Alert.alert("Required", "Please enter the EMI amount.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Amount", "Enter a valid amount greater than zero.");
      return;
    }

    if (numericAmount > customer.balance) {
      Alert.alert(
        "Invalid Amount",
        `The collection cannot exceed the outstanding balance of ${formatAmount(customer.balance)}.`
      );
      return;
    }

    const paymentDetails = {
      customerId: customer.id,
      customerName: customer.name,
      amount: numericAmount,
      paymentMode: mode,
      date: new Date().toISOString(),
    };

    Alert.alert(
      "Confirm EMI Collection",
      `Customer: ${customer.name}\nAmount: ${formatAmount(numericAmount)}\nPayment Mode: ${mode}\n\nConfirm this collection?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            // Connect your EMI collection API here.
            console.log("EMI Payment:", paymentDetails);

            Alert.alert(
              "Collection Validated",
              "Payment details are ready. Connect your backend API to save the collection permanently.",
              [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ]
            );
          },
        },
      ]
    );
  };

  const selectMode = (selectedMode: PaymentMode) => {
    setMode(selectedMode);
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
              size={22}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              Collect EMI
            </Text>
            <Text style={styles.headerSubtitle}>
              Customer payment collection
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="wallet-outline"
              size={22}
              color="#FFFFFF"
            />
          </View>
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Customer Details */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>
              Customer Details
            </Text>
          </View>

          <View style={styles.customerCard}>
            <View style={styles.customerTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>

              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>
                  {customer.name}
                </Text>

                <Text style={styles.customerPhone}>
                  <Ionicons
                    name="call-outline"
                    size={12}
                    color="#89958D"
                  />{" "}
                  {customer.phone}
                </Text>

                <Text style={styles.customerVillage}>
                  <Ionicons
                    name="location-outline"
                    size={12}
                    color="#89958D"
                  />{" "}
                  {customer.village}
                </Text>
              </View>

              <View style={styles.activeBadge}>
                <Text style={styles.activeBadgeText}>
                  Active
                </Text>
              </View>
            </View>

            <View style={styles.cardDivider} />

            <View style={styles.loanStats}>
              <View style={styles.loanStat}>
                <Text style={styles.statLabel}>
                  Loan Amount
                </Text>
                <Text style={styles.statValue}>
                  {formatAmount(customer.loanAmount)}
                </Text>
              </View>

              <View style={styles.loanStat}>
                <Text style={styles.statLabel}>
                  Weekly EMI
                </Text>
                <Text style={styles.emiValue}>
                  {formatAmount(customer.weeklyEmi)}
                </Text>
              </View>

              <View style={styles.loanStat}>
                <Text style={styles.statLabel}>
                  Outstanding
                </Text>
                <Text style={styles.balanceValue}>
                  {formatAmount(customer.balance)}
                </Text>
              </View>
            </View>
          </View>

          {/* EMI Amount */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>
              Payment Information
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>
              Enter EMI Amount
            </Text>

            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>

              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor="#A0AAA4"
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={(value) => {
                  if (/^\d*\.?\d{0,2}$/.test(value)) {
                    setAmount(value);
                  }
                }}
              />
            </View>

            <TouchableOpacity
              style={styles.quickAmount}
              onPress={() =>
                setAmount(String(customer.weeklyEmi))
              }
            >
              <Ionicons
                name="flash-outline"
                size={14}
                color={DARK_GREEN}
              />
              <Text style={styles.quickAmountText}>
                Use weekly EMI ({formatAmount(customer.weeklyEmi)})
              </Text>
            </TouchableOpacity>

            {/* Payment Mode */}
            <Text style={[styles.label, { marginTop: 22 }]}>
              Payment Mode
            </Text>

            <View style={styles.modeRow}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === "Cash" && styles.activeModeButton,
                ]}
                onPress={() => selectMode("Cash")}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.modeIcon,
                    mode === "Cash" && styles.activeModeIcon,
                  ]}
                >
                  <Ionicons
                    name="cash-outline"
                    size={22}
                    color={mode === "Cash" ? GREEN : "#89958D"}
                  />
                </View>

                <Text
                  style={[
                    styles.modeText,
                    mode === "Cash" && styles.activeModeText,
                  ]}
                >
                  Cash
                </Text>

                {mode === "Cash" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={GREEN}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === "UPI" && styles.activeModeButton,
                ]}
                onPress={() => selectMode("UPI")}
                activeOpacity={0.8}
              >
                <View
                  style={[
                    styles.modeIcon,
                    mode === "UPI" && styles.activeModeIcon,
                  ]}
                >
                  <Ionicons
                    name="phone-portrait-outline"
                    size={22}
                    color={mode === "UPI" ? GREEN : "#89958D"}
                  />
                </View>

                <Text
                  style={[
                    styles.modeText,
                    mode === "UPI" && styles.activeModeText,
                  ]}
                >
                  UPI
                </Text>

                {mode === "UPI" && (
                  <Ionicons
                    name="checkmark-circle"
                    size={18}
                    color={GREEN}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Payment Summary */}
          <View style={styles.paymentSummary}>
            <View style={styles.summaryHeader}>
              <Ionicons
                name="receipt-outline"
                size={18}
                color={DARK_GREEN}
              />
              <Text style={styles.summaryTitle}>
                Collection Summary
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                EMI Amount
              </Text>
              <Text style={styles.summaryValue}>
                {formatAmount(numericAmount || 0)}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Payment Mode
              </Text>
              <Text style={styles.summaryValue}>
                {mode}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Balance After Collection
              </Text>
              <Text style={styles.remainingValue}>
                {formatAmount(remainingBalance)}
              </Text>
            </View>
          </View>

          <View style={styles.infoNote}>
            <Ionicons
              name="information-circle-outline"
              size={17}
              color="#7A8B80"
            />
            <Text style={styles.infoNoteText}>
              Verify the amount and payment mode before confirming the collection.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Save Button */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomAmount}>
            <Text style={styles.bottomLabel}>
              Collecting Amount
            </Text>
            <Text style={styles.bottomValue}>
              {formatAmount(numericAmount || 0)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.saveButtonText}>
              Save EMI
            </Text>
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

  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 11,
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
    flex: 1,
  },

  bodyContent: {
    padding: 15,
    paddingBottom: 25,
  },

  sectionHeading: {
    marginBottom: 10,
  },

  sectionTitle: {
    color: "#26352D",
    fontSize: 14,
    fontWeight: "800",
  },

  customerCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
    elevation: 2,
  },

  customerTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#E5F5EB",
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: DARK_GREEN,
    fontSize: 21,
    fontWeight: "800",
  },

  customerInfo: {
    flex: 1,
    marginLeft: 11,
  },

  customerName: {
    color: "#26352D",
    fontSize: 15,
    fontWeight: "800",
  },

  customerPhone: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
  },

  customerVillage: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 3,
  },

  activeBadge: {
    backgroundColor: "#E5F5EB",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    alignSelf: "flex-start",
  },

  activeBadgeText: {
    color: DARK_GREEN,
    fontSize: 9,
    fontWeight: "800",
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#EDF1EE",
    marginVertical: 15,
  },

  loanStats: {
    flexDirection: "row",
  },

  loanStat: {
    flex: 1,
  },

  statLabel: {
    color: "#89958D",
    fontSize: 9,
    marginBottom: 5,
  },

  statValue: {
    color: "#26352D",
    fontSize: 12,
    fontWeight: "800",
  },

  emiValue: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "800",
  },

  balanceValue: {
    color: "#C1842E",
    fontSize: 12,
    fontWeight: "800",
  },

  formCard: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    elevation: 2,
  },

  label: {
    color: "#536258",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 9,
  },

  amountInputContainer: {
    height: 58,
    backgroundColor: "#F7FAF8",
    borderWidth: 1,
    borderColor: "#DCE9DF",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },

  currencySymbol: {
    color: DARK_GREEN,
    fontSize: 23,
    fontWeight: "800",
  },

  amountInput: {
    flex: 1,
    color: "#26352D",
    fontSize: 23,
    fontWeight: "800",
    paddingHorizontal: 10,
  },

  quickAmount: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 11,
    backgroundColor: "#EAF7EF",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 7,
    gap: 5,
  },

  quickAmountText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "700",
  },

  modeRow: {
    flexDirection: "row",
    gap: 10,
  },

  modeButton: {
    flex: 1,
    minHeight: 75,
    backgroundColor: "#F8FAF8",
    borderWidth: 1,
    borderColor: "#E8EDE9",
    borderRadius: 11,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  activeModeButton: {
    backgroundColor: "#F0FAF3",
    borderColor: GREEN,
  },

  modeIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EDF1EE",
    alignItems: "center",
    justifyContent: "center",
  },

  activeModeIcon: {
    backgroundColor: "#DDF2E4",
  },

  modeText: {
    flex: 1,
    color: "#536258",
    fontSize: 12,
    fontWeight: "700",
  },

  activeModeText: {
    color: DARK_GREEN,
  },

  paymentSummary: {
    backgroundColor: "#FFFFFF",
    marginTop: 15,
    padding: 15,
    borderRadius: 13,
    elevation: 1,
  },

  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 13,
  },

  summaryTitle: {
    color: "#26352D",
    fontSize: 13,
    fontWeight: "800",
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
  },

  summaryLabel: {
    color: "#89958D",
    fontSize: 11,
  },

  summaryValue: {
    color: "#26352D",
    fontSize: 11,
    fontWeight: "700",
  },

  remainingValue: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "800",
  },

  infoNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 14,
    gap: 7,
    paddingHorizontal: 3,
  },

  infoNoteText: {
    flex: 1,
    color: "#7A8B80",
    fontSize: 10,
    lineHeight: 16,
  },

  bottomBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EDE9",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  bottomAmount: {
    flex: 1,
  },

  bottomLabel: {
    color: "#89958D",
    fontSize: 10,
  },

  bottomValue: {
    color: DARK_GREEN,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 3,
  },

  saveButton: {
    backgroundColor: GREEN,
    paddingHorizontal: 19,
    paddingVertical: 14,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },
});
