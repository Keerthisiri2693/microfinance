import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

export default function AddCustomer() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [emi, setEmi] = useState("");

  const handleSave = () => {
    if (!name.trim() || !mobile.trim() || !loanAmount.trim()) {
      Alert.alert(
        "Required Fields",
        "Please enter customer name, mobile number and loan amount.",
      );
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit mobile number.",
      );
      return;
    }

    if (aadhaar.trim() && !/^\d{12}$/.test(aadhaar)) {
      Alert.alert(
        "Invalid Aadhaar Number",
        "Please enter a valid 12-digit Aadhaar number.",
      );
      return;
    }

    const loan = Number(loanAmount);
    const weeklyEmi = Number(emi);

    if (!Number.isFinite(loan) || loan <= 0) {
      Alert.alert("Invalid Loan Amount", "Enter a valid loan amount.");
      return;
    }

    if (emi.trim() && (!Number.isFinite(weeklyEmi) || weeklyEmi <= 0)) {
      Alert.alert("Invalid EMI", "Enter a valid weekly EMI amount.");
      return;
    }

    const customerDetails = {
      name: name.trim(),
      mobile,
      address: address.trim(),
      aadhaar: aadhaar.trim(),
      loanAmount: loan,
      weeklyEmi: emi.trim() ? weeklyEmi : null,
    };

    Alert.alert(
      "Confirm Customer",
      `Name: ${customerDetails.name}\nMobile: ${mobile}\nLoan Amount: ₹${loan.toLocaleString("en-IN")}\nWeekly EMI: ${emi ? `₹${weeklyEmi.toLocaleString("en-IN")}` : "Not entered"}\n\nSave customer details?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            // Connect your Add Customer API here.
            // Do not store Aadhaar in plain text.
            console.log("Customer Details:", customerDetails);

            Alert.alert(
              "Details Validated",
              "Customer details are ready. Connect your backend API to save the customer permanently.",
              [
                {
                  text: "OK",
                  onPress: () => router.back(),
                },
              ],
            );
          },
        },
      ],
    );
  };

  const renderInput = (
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (value: string) => void,
    icon: keyof typeof Ionicons.glyphMap,
    options: {
      keyboardType?: "default" | "numeric" | "phone-pad";
      maxLength?: number;
      optional?: boolean;
    } = {},
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>
        {label}
        {options.optional && (
          <Text style={styles.optionalText}> (Optional)</Text>
        )}
      </Text>

      <View style={styles.inputContainer}>
        <Ionicons name={icon} size={19} color="#89958D" />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#A0AAA4"
          value={value}
          onChangeText={onChangeText}
          keyboardType={options.keyboardType || "default"}
          maxLength={options.maxLength}
          autoCapitalize="none"
        />
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
            <Ionicons name="arrow-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>Add Customer</Text>
            <Text style={styles.headerSubtitle}>
              Register a new loan customer
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="person-add-outline" size={22} color="#FFFFFF" />
          </View>
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.bodyContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Customer Information */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="person-outline" size={18} color={DARK_GREEN} />
            </View>

            <View>
              <Text style={styles.sectionTitle}>Customer Information</Text>
              <Text style={styles.sectionSubtitle}>
                Enter personal and contact details
              </Text>
            </View>
          </View>

          <View style={styles.formCard}>
            {renderInput(
              "Customer Name",
              "Enter customer full name",
              name,
              setName,
              "person-outline",
            )}

            {renderInput(
              "Mobile Number",
              "Enter 10-digit mobile number",
              mobile,
              (value) => setMobile(value.replace(/\D/g, "")),
              "call-outline",
              { keyboardType: "phone-pad", maxLength: 10 },
            )}

            {renderInput(
              "Address",
              "Enter customer address",
              address,
              setAddress,
              "location-outline",
              { optional: true },
            )}

            {renderInput(
              "Aadhaar Number",
              "Enter 12-digit Aadhaar number",
              aadhaar,
              (value) => setAadhaar(value.replace(/\D/g, "")),
              "card-outline",
              { keyboardType: "numeric", maxLength: 12, optional: true },
            )}

            <View style={styles.privacyNote}>
              <Ionicons
                name="shield-checkmark-outline"
                size={16}
                color={DARK_GREEN}
              />
              <Text style={styles.privacyText}>
                Aadhaar is optional. Collect and process it only when legally
                permitted, with appropriate consent and security.
              </Text>
            </View>
          </View>

          {/* Loan Information */}
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="wallet-outline" size={18} color={DARK_GREEN} />
            </View>

            <View>
              <Text style={styles.sectionTitle}>Loan Information</Text>
              <Text style={styles.sectionSubtitle}>
                Enter loan and weekly repayment details
              </Text>
            </View>
          </View>

          <View style={styles.formCard}>
            {renderInput(
              "Loan Amount",
              "Enter loan amount",
              loanAmount,
              (value) => {
                if (/^\d*\.?\d{0,2}$/.test(value)) {
                  setLoanAmount(value);
                }
              },
              "cash-outline",
              { keyboardType: "numeric" },
            )}

            {renderInput(
              "Weekly EMI",
              "Enter weekly EMI amount",
              emi,
              (value) => {
                if (/^\d*\.?\d{0,2}$/.test(value)) {
                  setEmi(value);
                }
              },
              "calendar-outline",
              { keyboardType: "numeric", optional: true },
            )}

            <View style={styles.loanNote}>
              <Ionicons
                name="information-circle-outline"
                size={16}
                color="#7A8B80"
              />
              <Text style={styles.loanNoteText}>
                Weekly EMI can be entered later if it has not yet been
                finalized.
              </Text>
            </View>
          </View>

          {/* Required Fields Note */}
          <Text style={styles.requiredNote}>
            * Customer name, mobile number and loan amount are required.
          </Text>
        </ScrollView>

        {/* Bottom Save Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Ionicons name="person-add-outline" size={19} color="#FFFFFF" />
            <Text style={styles.saveButtonText}>Save Customer</Text>
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

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 11,
    marginTop: 5,
    gap: 10,
  },

  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E2F3E8",
    alignItems: "center",
    justifyContent: "center",
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

  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
  },

  inputGroup: {
    marginBottom: 15,
  },

  label: {
    color: "#536258",
    fontSize: 11,
    fontWeight: "700",
    marginBottom: 8,
  },

  optionalText: {
    color: "#9AA69E",
    fontWeight: "400",
  },

  inputContainer: {
    minHeight: 49,
    backgroundColor: "#F8FAF8",
    borderWidth: 1,
    borderColor: "#E3EBE5",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    color: "#26352D",
    fontSize: 12,
    paddingVertical: 11,
    paddingHorizontal: 10,
  },

  privacyNote: {
    backgroundColor: "#EFF8F1",
    borderRadius: 9,
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
  },

  privacyText: {
    flex: 1,
    color: "#63766A",
    fontSize: 10,
    lineHeight: 15,
  },

  loanNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 7,
    marginTop: 0,
  },

  loanNoteText: {
    flex: 1,
    color: "#7A8B80",
    fontSize: 10,
    lineHeight: 15,
  },

  requiredNote: {
    color: "#89958D",
    fontSize: 10,
    marginBottom: 10,
  },

  bottomBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EDE9",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  saveButton: {
    backgroundColor: GREEN,
    paddingVertical: 15,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },
});
