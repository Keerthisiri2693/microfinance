
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

type PaymentMode = "Cash" | "UPI";

const customer = {
  id: "1",
  name: "Ramesh",
  phone: "9876543210",
  village: "Tiruvallur",
  loanAmount: 50000,
  weeklyEmi: 500,
  balance: 40000,
};

const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function CollectEMI() {
  const [amount, setAmount] = useState(
    String(customer.weeklyEmi)
  );
  const [mode, setMode] = useState<PaymentMode>("Cash");
  const [remarks, setRemarks] = useState("");

  const numericAmount = useMemo(
    () => Number(amount),
    [amount]
  );

  const remainingBalance = Math.max(
    0,
    customer.balance - (numericAmount || 0)
  );

  const handleSubmit = () => {
    if (!amount.trim()) {
      Alert.alert("Required", "Please enter the payment amount.");
      return;
    }

    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      Alert.alert("Invalid Amount", "Enter a valid amount greater than zero.");
      return;
    }

    if (numericAmount > customer.balance) {
      Alert.alert(
        "Invalid Amount",
        `Payment cannot exceed the outstanding balance of ${formatAmount(customer.balance)}.`
      );
      return;
    }

    const collectionDetails = {
      customerId: customer.id,
      customerName: customer.name,
      amount: numericAmount,
      paymentMode: mode,
      remarks: remarks.trim(),
      collectedAt: new Date().toISOString(),
    };

    Alert.alert(
      "Confirm Collection",
      `Customer: ${customer.name}\nAmount: ${formatAmount(numericAmount)}\nPayment Mode: ${mode}\nRemarks: ${remarks.trim() || "None"}\n\nConfirm this collection?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            // Connect your EMI collection API here.
            console.log("Collection Details:", collectionDetails);

            Alert.alert(
              "Collection Validated",
              "Payment details are ready. Connect your backend API to save this collection permanently.",
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
          {/* Customer Information */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>
              Customer Information
            </Text>
          </View>

          <View style={styles.customerCard}>
            <View style={styles.customerTop}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>R</Text>
              </View>

              <View style={styles.customerDetails}>
                <Text style={styles.customerName}>
                  {customer.name}
                </Text>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="call-outline"
                    size={12}
                    color="#89958D"
                  />
                  <Text style={styles.detailText}>
                    {customer.phone}
                  </Text>
                </View>

                <View style={styles.detailRow}>
                  <Ionicons
                    name="location-outline"
                    size={12}
                    color="#89958D"
                  />
                  <Text style={styles.detailText}>
                    {customer.village}
                  </Text>
                </View>
              </View>

              <View style={styles.activeBadge}>
                <Text style={styles.activeText}>Active</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.loanStats}>
              <View style={styles.loanStat}>
                <Text style={styles.statLabel}>Loan Amount</Text>
                <Text style={styles.statValue}>
                  {formatAmount(customer.loanAmount)}
                </Text>
              </View>

              <View style={styles.loanStat}>
                <Text style={styles.statLabel}>Weekly EMI</Text>
                <Text style={styles.emiValue}>
                  {formatAmount(customer.weeklyEmi)}
                </Text>
              </View>

              <View style={styles.loanStat}>
                <Text style={styles.statLabel}>Balance</Text>
                <Text style={styles.balanceValue}>
                  {formatAmount(customer.balance)}
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Details */}
          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>
              Payment Details
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>Amount Paid</Text>

            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>

              <TextInput
                style={styles.amountInput}
                placeholder="Enter payment amount"
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
            <Text style={[styles.label, styles.modeLabel]}>
              Payment Mode
            </Text>

            <View style={styles.modeRow}>
              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === "Cash" && styles.activeModeButton,
                ]}
                onPress={() => setMode("Cash")}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="cash-outline"
                  size={23}
                  color={mode === "Cash" ? GREEN : "#89958D"}
                />

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
                    size={17}
                    color={GREEN}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.modeButton,
                  mode === "UPI" && styles.activeModeButton,
                ]}
                onPress={() => setMode("UPI")}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="phone-portrait-outline"
                  size={23}
                  color={mode === "UPI" ? GREEN : "#89958D"}
                />

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
                    size={17}
                    color={GREEN}
                  />
                )}
              </TouchableOpacity>
            </View>

            {/* Remarks */}
            <Text style={[styles.label, styles.remarksLabel]}>
              Remarks
              <Text style={styles.optionalText}> (Optional)</Text>
            </Text>

            <TextInput
              style={styles.remarksInput}
              placeholder="Enter collection remarks..."
              placeholderTextColor="#A0AAA4"
              value={remarks}
              onChangeText={setRemarks}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={250}
            />

            <Text style={styles.characterCount}>
              {remarks.length}/250
            </Text>
          </View>

          {/* Collection Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryHeader}>
              <Ionicons
                name="receipt-outline"
                size={19}
                color={DARK_GREEN}
              />
              <Text style={styles.summaryTitle}>
                Collection Summary
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>
                Amount Paid
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
                Balance After Payment
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
            <Text style={styles.infoText}>
              Please verify the amount and payment mode before saving the collection.
            </Text>
          </View>
        </ScrollView>

        {/* Fixed Bottom Button */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomAmount}>
            <Text style={styles.bottomLabel}>
              Total Collection
            </Text>
            <Text style={styles.bottomValue}>
              {formatAmount(numericAmount || 0)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
            activeOpacity={0.85}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color="#FFFFFF"
            />
            <Text style={styles.saveButtonText}>
              Save Collection
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
    alignItems: "center",
    justifyContent: "center",
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
    marginBottom: 19,
    elevation: 2,
  },

  customerTop: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 47,
    height: 47,
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

  customerDetails: {
    flex: 1,
    marginLeft: 11,
  },

  customerName: {
    color: "#26352D",
    fontSize: 15,
    fontWeight: "800",
    marginBottom: 4,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 3,
  },

  detailText: {
    color: "#89958D",
    fontSize: 10,
  },

  activeBadge: {
    backgroundColor: "#E5F5EB",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
    alignSelf: "flex-start",
  },

  activeText: {
    color: DARK_GREEN,
    fontSize: 9,
    fontWeight: "800",
  },

  divider: {
    height: 1,
    backgroundColor: "#EDF1EE",
    marginVertical: 14,
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
    height: 57,
    backgroundColor: "#F7FAF8",
    borderWidth: 1,
    borderColor: "#DCE9DF",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  currencySymbol: {
    color: DARK_GREEN,
    fontSize: 23,
    fontWeight: "800",
  },

  amountInput: {
    flex: 1,
    color: "#26352D",
    fontSize: 21,
    fontWeight: "800",
    paddingHorizontal: 10,
  },

  quickAmount: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 10,
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

  modeLabel: {
    marginTop: 22,
  },

  modeRow: {
    flexDirection: "row",
    gap: 10,
  },

  modeButton: {
    flex: 1,
    minHeight: 54,
    backgroundColor: "#F8FAF8",
    borderWidth: 1,
    borderColor: "#E8EDE9",
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 7,
  },

  activeModeButton: {
    backgroundColor: "#F0FAF3",
    borderColor: GREEN,
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

  remarksLabel: {
    marginTop: 22,
  },

  optionalText: {
    color: "#9AA69E",
    fontWeight: "400",
  },

  remarksInput: {
    minHeight: 90,
    backgroundColor: "#F8FAF8",
    borderWidth: 1,
    borderColor: "#E3EBE5",
    borderRadius: 10,
    padding: 12,
    color: "#26352D",
    fontSize: 12,
  },

  characterCount: {
    color: "#9AA69E",
    fontSize: 9,
    textAlign: "right",
    marginTop: 5,
  },

  summaryCard: {
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
    marginBottom: 14,
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

  infoText: {
    flex: 1,
    color: "#7A8B80",
    fontSize: 10,
    lineHeight: 16,
  },

  bottomBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EDE9",
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    fontSize: 18,
    fontWeight: "800",
    marginTop: 3,
  },

  saveButton: {
    backgroundColor: GREEN,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
});
