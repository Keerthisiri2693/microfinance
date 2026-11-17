
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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

export default function CreateLoan() {
  const [customer, setCustomer] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [interest, setInterest] = useState("22");
  const [tenure, setTenure] = useState("50");

  const amount = Number(loanAmount);
  const roi = Number(interest);
  const weeks = Number(tenure);

  // Live loan calculation
  const loanSummary = useMemo(() => {
    if (
      !loanAmount ||
      !interest ||
      !tenure ||
      !Number.isFinite(amount) ||
      !Number.isFinite(roi) ||
      !Number.isFinite(weeks) ||
      amount <= 0 ||
      roi < 0 ||
      weeks <= 0
    ) {
      return {
        interestAmount: 0,
        totalAmount: 0,
        weeklyEmi: 0,
      };
    }

    // Flat interest calculation, matching the original logic
    const interestAmount = (amount * roi) / 100;
    const totalAmount = amount + interestAmount;
    const weeklyEmi = totalAmount / weeks;

    return {
      interestAmount,
      totalAmount,
      weeklyEmi,
    };
  }, [loanAmount, interest, tenure]);

  const handleCreateLoan = () => {
    if (!customer.trim()) {
      Alert.alert("Required Field", "Please enter customer name.");
      return;
    }

    if (!loanAmount || !Number.isFinite(amount) || amount <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid loan amount.");
      return;
    }

    if (
      !interest ||
      !Number.isFinite(roi) ||
      roi < 0 ||
      roi > 100
    ) {
      Alert.alert(
        "Invalid Interest",
        "Please enter an interest rate between 0 and 100."
      );
      return;
    }

    if (
      !tenure ||
      !Number.isInteger(weeks) ||
      weeks <= 0
    ) {
      Alert.alert(
        "Invalid Tenure",
        "Please enter a valid number of weeks."
      );
      return;
    }

    if (loanSummary.weeklyEmi <= 0) {
      Alert.alert(
        "Calculation Error",
        "Unable to calculate weekly EMI."
      );
      return;
    }

    const loanDetails = {
      customerName: customer.trim(),
      loanAmount: amount,
      interestRate: roi,
      tenureWeeks: weeks,
      interestAmount: loanSummary.interestAmount,
      totalRepayment: loanSummary.totalAmount,
      weeklyEmi: loanSummary.weeklyEmi,
    };

    Alert.alert(
      "Confirm Loan",
      `Customer: ${loanDetails.customerName}\nLoan: ${formatAmount(amount)}\nWeekly EMI: ${formatAmount(
        loanSummary.weeklyEmi
      )}\n\nDo you want to create this loan?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            // Connect your create loan API here.
            console.log("Loan Details:", loanDetails);

            Alert.alert(
              "Loan Validated",
              "Loan details are ready. Connect your backend API to save the loan."
            );
          },
        },
      ]
    );
  };

  const renderInput = (
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    icon: keyof typeof Ionicons.glyphMap,
    options?: {
      keyboardType?: "default" | "numeric" | "decimal-pad";
      suffix?: string;
    }
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={19} color={GREEN} />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0AAA4"
          value={value}
          onChangeText={onChangeText}
          keyboardType={options?.keyboardType || "default"}
          autoCapitalize="words"
        />

        {options?.suffix && (
          <Text style={styles.suffix}>
            {options.suffix}
          </Text>
        )}
      </View>
    </View>
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
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Create Loan</Text>
            <Text style={styles.headerSubtitle}>
              Register a new customer loan
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="wallet-outline"
              size={23}
              color="#FFFFFF"
            />
          </View>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Customer Information */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Customer Information
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Enter customer details
                  </Text>
                </View>
              </View>

              {renderInput(
                "Customer Name *",
                "Enter customer name",
                customer,
                setCustomer,
                "person-outline"
              )}
            </View>

            {/* Loan Information */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="cash-outline"
                    size={20}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Loan Information
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Configure loan amount and repayment
                  </Text>
                </View>
              </View>

              {renderInput(
                "Loan Amount (₹) *",
                "Enter loan amount",
                loanAmount,
                setLoanAmount,
                "wallet-outline",
                { keyboardType: "decimal-pad" }
              )}

              {renderInput(
                "Interest Rate *",
                "Enter interest percentage",
                interest,
                setInterest,
                "trending-up-outline",
                {
                  keyboardType: "decimal-pad",
                  suffix: "%",
                }
              )}

              {renderInput(
                "Tenure (Weeks) *",
                "Enter repayment weeks",
                tenure,
                setTenure,
                "calendar-outline",
                { keyboardType: "numeric", suffix: "Weeks" }
              )}

              {/* Calculation Summary */}
              <View style={styles.calculationCard}>
                <View style={styles.calculationHeader}>
                  <Ionicons
                    name="calculator-outline"
                    size={19}
                    color={DARK_GREEN}
                  />
                  <Text style={styles.calculationTitle}>
                    Loan Calculation
                  </Text>
                  <View style={styles.liveBadge}>
                    <View style={styles.liveDot} />
                    <Text style={styles.liveText}>LIVE</Text>
                  </View>
                </View>

                <View style={styles.calculationRow}>
                  <Text style={styles.calculationLabel}>
                    Principal Amount
                  </Text>
                  <Text style={styles.calculationValue}>
                    {formatAmount(amount > 0 ? amount : 0)}
                  </Text>
                </View>

                <View style={styles.calculationRow}>
                  <Text style={styles.calculationLabel}>
                    Interest Amount
                  </Text>
                  <Text style={styles.calculationValue}>
                    {formatAmount(loanSummary.interestAmount)}
                  </Text>
                </View>

                <View style={styles.calculationDivider} />

                <View style={styles.calculationRow}>
                  <Text style={styles.totalLabel}>
                    Total Repayment
                  </Text>
                  <Text style={styles.totalValue}>
                    {formatAmount(loanSummary.totalAmount)}
                  </Text>
                </View>
              </View>
            </View>

            {/* Weekly EMI */}
            <View style={styles.emiCard}>
              <View style={styles.emiIcon}>
                <Ionicons
                  name="calendar-outline"
                  size={23}
                  color={GREEN}
                />
              </View>

              <View style={styles.emiInfo}>
                <Text style={styles.emiLabel}>
                  Weekly EMI Amount
                </Text>
                <Text style={styles.emiSubtitle}>
                  {Number.isInteger(weeks) && weeks > 0
                    ? `${weeks} weekly installments`
                    : "Enter a valid tenure"}
                </Text>
              </View>

              <Text style={styles.emiAmount}>
                {formatAmount(loanSummary.weeklyEmi)}
              </Text>
            </View>

            {/* Create Loan Button */}
            <TouchableOpacity
              style={styles.createButton}
              onPress={handleCreateLoan}
              activeOpacity={0.85}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={21}
                color="#FFFFFF"
              />
              <Text style={styles.createButtonText}>
                Create Loan
              </Text>
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              Please verify the loan details before creating.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
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
    paddingHorizontal: 17,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 39,
    height: 39,
    borderRadius: 12,
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
    fontSize: 19,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 10,
    marginTop: 3,
  },

  headerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    padding: 15,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  sectionIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
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

  fieldContainer: {
    marginBottom: 16,
  },

  label: {
    color: "#435148",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },

  inputWrapper: {
    height: 49,
    borderWidth: 1,
    borderColor: "#E5ECE7",
    borderRadius: 11,
    backgroundColor: "#FAFCFA",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#26352D",
    fontSize: 13,
    paddingVertical: 0,
  },

  suffix: {
    color: "#78877D",
    fontSize: 11,
    fontWeight: "700",
  },

  calculationCard: {
    backgroundColor: "#F3FAF5",
    padding: 14,
    borderRadius: 12,
    marginTop: 2,
  },

  calculationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    gap: 7,
  },

  calculationTitle: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "800",
    flex: 1,
  },

  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDF2E4",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    gap: 4,
  },

  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: GREEN,
  },

  liveText: {
    color: DARK_GREEN,
    fontSize: 8,
    fontWeight: "800",
  },

  calculationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  calculationLabel: {
    color: "#78877D",
    fontSize: 11,
  },

  calculationValue: {
    color: "#34443A",
    fontSize: 12,
    fontWeight: "700",
  },

  calculationDivider: {
    height: 1,
    backgroundColor: "#DDEBE1",
    marginVertical: 4,
  },

  totalLabel: {
    color: "#26352D",
    fontSize: 12,
    fontWeight: "800",
  },

  totalValue: {
    color: DARK_GREEN,
    fontSize: 16,
    fontWeight: "800",
  },

  emiCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 15,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    borderWidth: 1,
    borderColor: "#DCEFE2",
  },

  emiIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },

  emiInfo: {
    flex: 1,
    marginLeft: 11,
  },

  emiLabel: {
    color: "#26352D",
    fontSize: 12,
    fontWeight: "800",
  },

  emiSubtitle: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
  },

  emiAmount: {
    color: DARK_GREEN,
    fontSize: 17,
    fontWeight: "800",
  },

  createButton: {
    height: 52,
    backgroundColor: GREEN,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    elevation: 2,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  footerNote: {
    color: "#89958D",
    fontSize: 10,
    textAlign: "center",
    marginTop: 12,
  },
});
