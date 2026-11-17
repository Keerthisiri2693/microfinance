
import React, { useState } from "react";
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
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

export default function EditProfile() {
  const router = useRouter();

  const [name, setName] = useState("Ramesh Kumar");
  const [mobile, setMobile] = useState("9876543210");
  const [branch, setBranch] = useState("Tiruvallur");
  const [designation, setDesignation] = useState("Field Officer");

  const [saving, setSaving] = useState(false);

  const updateProfile = () => {
    const trimmedName = name.trim();
    const trimmedBranch = branch.trim();
    const trimmedDesignation = designation.trim();
    const trimmedMobile = mobile.trim();

    if (
      !trimmedName ||
      !trimmedMobile ||
      !trimmedBranch ||
      !trimmedDesignation
    ) {
      Alert.alert("Required Fields", "Please fill in all fields.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    setSaving(true);

    // Connect your update profile API here.
    setSaving(false);

    Alert.alert(
      "Success",
      "Profile details validated successfully.",
      [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]
    );
  };

  const renderInput = (
    label: string,
    value: string,
    onChangeText: (text: string) => void,
    icon: keyof typeof Ionicons.glyphMap,
    options?: {
      keyboardType?: "default" | "phone-pad";
      maxLength?: number;
    }
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <Ionicons
          name={icon}
          size={19}
          color={GREEN}
        />

        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor="#A0AAA4"
          keyboardType={options?.keyboardType || "default"}
          maxLength={options?.maxLength}
          autoCapitalize="words"
        />
      </View>
    </View>
  );

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
              Edit Profile
            </Text>
            <Text style={styles.headerSubtitle}>
              Manage your employee information
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

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Profile Card */}
            <View style={styles.profileCard}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {name.trim()
                    ? name.trim().charAt(0).toUpperCase()
                    : "U"}
                </Text>

                <View style={styles.editIcon}>
                  <Ionicons
                    name="create-outline"
                    size={13}
                    color="#FFFFFF"
                  />
                </View>
              </View>

              <Text style={styles.profileName}>
                {name.trim() || "Employee Name"}
              </Text>

              <Text style={styles.profileDesignation}>
                {designation.trim() || "Designation"}
              </Text>

              <View style={styles.employeeBadge}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={13}
                  color={DARK_GREEN}
                />
                <Text style={styles.employeeBadgeText}>
                  Field Officer Profile
                </Text>
              </View>
            </View>

            {/* Form */}
            <View style={styles.formCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="person-outline"
                    size={19}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Personal Information
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Update your basic details
                  </Text>
                </View>
              </View>

              {renderInput(
                "Employee Name",
                name,
                setName,
                "person-outline"
              )}

              {renderInput(
                "Mobile Number",
                mobile,
                setMobile,
                "call-outline",
                {
                  keyboardType: "phone-pad",
                  maxLength: 10,
                }
              )}

              {renderInput(
                "Branch",
                branch,
                setBranch,
                "business-outline"
              )}

              {renderInput(
                "Designation",
                designation,
                setDesignation,
                "briefcase-outline"
              )}

              <View style={styles.infoNote}>
                <Ionicons
                  name="information-circle-outline"
                  size={17}
                  color="#78877D"
                />
                <Text style={styles.infoText}>
                  Ensure your contact details are correct.
                </Text>
              </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={[
                styles.button,
                saving && styles.disabledButton,
              ]}
              onPress={updateProfile}
              disabled={saving}
              activeOpacity={0.85}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={20}
                color="#FFFFFF"
              />

              <Text style={styles.buttonText}>
                {saving ? "Saving..." : "Update Profile"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => router.back()}
            >
              <Text style={styles.cancelText}>
                Cancel
              </Text>
            </TouchableOpacity>
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
    paddingHorizontal: 18,
    paddingVertical: 15,
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
    fontSize: 19,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 11,
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

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },

  // Profile card
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 22,
    alignItems: "center",
    marginBottom: 16,
    elevation: 2,
  },

  avatar: {
    width: 76,
    height: 76,
    borderRadius: 25,
    backgroundColor: GREEN,
    alignItems: "center",
    justifyContent: "center",
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "800",
  },

  editIcon: {
    position: "absolute",
    right: -3,
    bottom: -3,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: DARK_GREEN,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  profileName: {
    color: "#26352D",
    fontSize: 17,
    fontWeight: "800",
    marginTop: 12,
  },

  profileDesignation: {
    color: "#89958D",
    fontSize: 12,
    marginTop: 4,
  },

  employeeBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 11,
    gap: 5,
  },

  employeeBadgeText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "700",
  },

  // Form
  formCard: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 16,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  sectionIcon: {
    width: 38,
    height: 38,
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

  infoNote: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F4F7F5",
    padding: 11,
    borderRadius: 9,
    marginTop: 2,
    gap: 7,
  },

  infoText: {
    color: "#78877D",
    fontSize: 10,
    flex: 1,
  },

  // Buttons
  button: {
    backgroundColor: GREEN,
    height: 51,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 9,
    elevation: 2,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  cancelButton: {
    alignItems: "center",
    paddingVertical: 14,
  },

  cancelText: {
    color: "#78877D",
    fontSize: 13,
    fontWeight: "600",
  },
});
