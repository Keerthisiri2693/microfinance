
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

export default function ForgotPassword() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [otpSent, setOtpSent] = useState(false);

  // Step 1: Send OTP
  const sendOtp = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      Alert.alert("Required", "Please enter your email address.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Connect your backend OTP API here.
    setOtpSent(true);
    setStep(2);

    Alert.alert(
      "OTP Request",
      "Connect your backend email service to send the verification OTP."
    );
  };

  // Resend OTP
  const resendOtp = () => {
    setOtp("");

    // Call your backend resend OTP API here.
    Alert.alert(
      "OTP Request",
      "Connect your backend resend OTP API to send a new code."
    );
  };

  // Step 2: Verify OTP
  const verifyOtp = () => {
    if (!otp.trim()) {
      Alert.alert("Required", "Please enter the OTP.");
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      Alert.alert("Invalid OTP", "Please enter a valid 6-digit OTP.");
      return;
    }

    // Verify OTP with your backend before proceeding.
    // Do not trust a client-side OTP check.
    Alert.alert(
      "Backend Required",
      "Connect your OTP verification API before allowing password reset."
    );
  };

  // Step 3: Reset Password
  const resetPassword = () => {
    if (!newPassword.trim()) {
      Alert.alert("Required", "Please enter your new password.");
      return;
    }

    if (newPassword.length < 8) {
      Alert.alert(
        "Weak Password",
        "Password must contain at least 8 characters."
      );
      return;
    }

    if (!confirmPassword.trim()) {
      Alert.alert("Required", "Please confirm your password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "New password and confirm password do not match."
      );
      return;
    }

    // Call your backend reset-password API here.
    Alert.alert(
      "Backend Required",
      "Connect your password reset API to securely update the password."
    );
  };

  const renderStepIndicator = () => (
    <View style={styles.stepsContainer}>
      {[1, 2, 3].map((item, index) => (
        <React.Fragment key={item}>
          <View
            style={[
              styles.stepCircle,
              step >= item && styles.activeStepCircle,
            ]}
          >
            {step > item ? (
              <Ionicons
                name="checkmark"
                size={17}
                color="#FFFFFF"
              />
            ) : (
              <Text
                style={[
                  styles.stepNumber,
                  step >= item && styles.activeStepNumber,
                ]}
              >
                {item}
              </Text>
            )}
          </View>

          {index !== 2 && (
            <View
              style={[
                styles.stepLine,
                step > item && styles.activeStepLine,
              ]}
            />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  const renderPasswordInput = (
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    visible: boolean,
    toggleVisibility: () => void
  ) => (
    <View style={styles.passwordInputContainer}>
      <Ionicons
        name="lock-closed-outline"
        size={19}
        color="#87938B"
      />

      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A0AAA4"
        style={styles.passwordInput}
        secureTextEntry={!visible}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
      />

      <TouchableOpacity onPress={toggleVisibility}>
        <Ionicons
          name={visible ? "eye-off-outline" : "eye-outline"}
          size={20}
          color="#87938B"
        />
      </TouchableOpacity>
    </View>
  );

  const getStepTitle = () => {
    if (step === 1) return "Forgot Password";
    if (step === 2) return "Verify OTP";
    return "Create New Password";
  };

  const getStepDescription = () => {
    if (step === 1) {
      return "Enter your registered email address to request a password reset.";
    }

    if (step === 2) {
      return `Enter the 6-digit verification code sent to ${email}.`;
    }

    return "Create a strong new password for your account.";
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        backgroundColor={GREEN}
        barStyle="light-content"
        translucent={false}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons
                name="wallet-outline"
                size={35}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.appTitle}>Micro Finance</Text>

            <Text style={styles.headerSubtitle}>
              Secure account recovery
            </Text>
          </View>

          {/* Main Card */}
          <View style={styles.card}>
            {/* Recovery Icon */}
            <View style={styles.mainIcon}>
              <Ionicons
                name={
                  step === 1
                    ? "lock-open-outline"
                    : step === 2
                    ? "shield-checkmark-outline"
                    : "lock-closed-outline"
                }
                size={30}
                color={GREEN}
              />
            </View>

            <Text style={styles.heading}>
              {getStepTitle()}
            </Text>

            <Text style={styles.description}>
              {getStepDescription()}
            </Text>

            {/* Step Indicator */}
            {renderStepIndicator()}

            {/* Step 1: Email */}
            {step === 1 && (
              <View style={styles.form}>
                <Text style={styles.inputLabel}>
                  Registered Email Address
                </Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="mail-outline"
                    size={19}
                    color="#87938B"
                  />

                  <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#A0AAA4"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.85}
                  onPress={sendOtp}
                >
                  <Text style={styles.buttonText}>
                    Send OTP
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Step 2: OTP */}
            {step === 2 && (
              <View style={styles.form}>
                <Text style={styles.inputLabel}>
                  Enter Verification Code
                </Text>

                <View style={styles.inputContainer}>
                  <Ionicons
                    name="keypad-outline"
                    size={19}
                    color="#87938B"
                  />

                  <TextInput
                    placeholder="Enter 6-digit OTP"
                    placeholderTextColor="#A0AAA4"
                    style={styles.input}
                    value={otp}
                    onChangeText={(value) =>
                      setOtp(value.replace(/\D/g, "").slice(0, 6))
                    }
                    keyboardType="number-pad"
                    maxLength={6}
                  />
                </View>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.85}
                  onPress={verifyOtp}
                >
                  <Text style={styles.buttonText}>
                    Verify OTP
                  </Text>

                  <Ionicons
                    name="arrow-forward"
                    size={19}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.resendButton}
                  onPress={resendOtp}
                >
                  <Text style={styles.resendText}>
                    Didn't receive OTP?{" "}
                    <Text style={styles.resendHighlight}>
                      Resend OTP
                    </Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.backStepButton}
                  onPress={() => {
                    setStep(1);
                    setOtp("");
                  }}
                >
                  <Ionicons
                    name="arrow-back"
                    size={15}
                    color={DARK_GREEN}
                  />
                  <Text style={styles.backStepText}>
                    Change Email Address
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <View style={styles.form}>
                <Text style={styles.inputLabel}>
                  New Password
                </Text>

                {renderPasswordInput(
                  "Enter new password",
                  newPassword,
                  setNewPassword,
                  showPassword,
                  () => setShowPassword(!showPassword)
                )}

                <Text style={styles.passwordHint}>
                  Minimum 8 characters
                </Text>

                <Text style={styles.inputLabel}>
                  Confirm New Password
                </Text>

                {renderPasswordInput(
                  "Confirm new password",
                  confirmPassword,
                  setConfirmPassword,
                  showConfirmPassword,
                  () =>
                    setShowConfirmPassword(!showConfirmPassword)
                )}

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.85}
                  onPress={resetPassword}
                >
                  <Text style={styles.buttonText}>
                    Reset Password
                  </Text>

                  <Ionicons
                    name="checkmark-circle-outline"
                    size={19}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            )}

            {/* Back to Login */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.replace("/login")}
            >
              <Ionicons
                name="arrow-back"
                size={16}
                color={DARK_GREEN}
              />

              <Text style={styles.loginText}>
                Back to Login
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <Text style={styles.footerText}>
            Your account security is important to us.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
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

  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 25,
  },

  header: {
    backgroundColor: GREEN,
    alignItems: "center",
    paddingTop: 30,
    paddingBottom: 45,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  appTitle: {
    fontSize: 25,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#E5F8EC",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: -22,
    borderRadius: 20,
    padding: 22,
    elevation: 5,
    shadowColor: "#174D2D",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  mainIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#E8F7ED",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
  },

  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#26352D",
    textAlign: "center",
  },

  description: {
    fontSize: 12,
    color: "#7C8981",
    textAlign: "center",
    lineHeight: 19,
    marginTop: 8,
  },

  stepsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 25,
  },

  stepCircle: {
    width: 31,
    height: 31,
    borderRadius: 16,
    backgroundColor: "#E9EEEB",
    justifyContent: "center",
    alignItems: "center",
  },

  activeStepCircle: {
    backgroundColor: GREEN,
  },

  stepNumber: {
    color: "#89938C",
    fontSize: 13,
    fontWeight: "700",
  },

  activeStepNumber: {
    color: "#FFFFFF",
  },

  stepLine: {
    width: 45,
    height: 3,
    backgroundColor: "#E9EEEB",
    marginHorizontal: 7,
  },

  activeStepLine: {
    backgroundColor: GREEN,
  },

  form: {
    marginTop: 3,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#35443A",
    marginBottom: 9,
  },

  inputContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E1E9E3",
    backgroundColor: "#F8FAF8",
    borderRadius: 11,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 17,
    gap: 10,
  },

  input: {
    flex: 1,
    fontSize: 14,
    color: "#26352D",
    paddingVertical: 0,
  },

  passwordInputContainer: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E1E9E3",
    backgroundColor: "#F8FAF8",
    borderRadius: 11,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },

  passwordInput: {
    flex: 1,
    fontSize: 14,
    color: "#26352D",
  },

  passwordHint: {
    fontSize: 11,
    color: "#89938C",
    marginBottom: 17,
  },

  button: {
    height: 52,
    backgroundColor: GREEN,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 5,
    elevation: 2,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },

  resendButton: {
    alignItems: "center",
    marginTop: 18,
  },

  resendText: {
    color: "#7C8981",
    fontSize: 12,
  },

  resendHighlight: {
    color: DARK_GREEN,
    fontWeight: "700",
  },

  backStepButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 17,
    gap: 6,
  },

  backStepText: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "600",
  },

  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 23,
    gap: 7,
  },

  loginText: {
    color: DARK_GREEN,
    fontSize: 13,
    fontWeight: "700",
  },

  footerText: {
    textAlign: "center",
    fontSize: 11,
    color: "#87938B",
    marginTop: 25,
    marginHorizontal: 20,
  },
});
