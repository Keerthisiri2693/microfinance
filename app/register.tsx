
import React, { useRef, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from "react-native";

import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Employee = {
  employeeId: string;
  employeeName: string;
  designation: string;
  branchName: string;
  email: string;
  password: string;
  registeredAt: string;
};

const STORAGE_KEY = "employees";

export default function Signup() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [branchName, setBranchName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // Scroll to focused input
  const handleInputFocus = (index: number) => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: index * 75,
        animated: true,
      });
    }, 250);
  };

  // Register employee
  const handleRegister = async () => {
    Keyboard.dismiss();

    if (
      !employeeId.trim() ||
      !employeeName.trim() ||
      !designation.trim() ||
      !branchName.trim() ||
      !email.trim() ||
      !password
    ) {
      Alert.alert("Validation", "Please fill all fields");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      Alert.alert("Validation", "Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Validation",
        "Password must contain at least 6 characters"
      );
      return;
    }

    try {
      setLoading(true);

      // Get existing employee records
      const existingData = await AsyncStorage.getItem(STORAGE_KEY);

      const employees: Employee[] = existingData
        ? JSON.parse(existingData)
        : [];

      if (!Array.isArray(employees)) {
        throw new Error("Invalid employee storage format");
      }

      // Normalize input
      const normalizedId = employeeId.trim();
      const normalizedEmail = email.trim().toLowerCase();

      // Check duplicate Employee ID
      const duplicateId = employees.some(
        (item) =>
          item.employeeId.toLowerCase() ===
          normalizedId.toLowerCase()
      );

      if (duplicateId) {
        Alert.alert("Registration", "Employee ID already exists");
        return;
      }

      // Check duplicate Email
      const duplicateEmail = employees.some(
        (item) =>
          item.email.toLowerCase() === normalizedEmail
      );

      if (duplicateEmail) {
        Alert.alert("Registration", "Email address already exists");
        return;
      }

      // Create employee record
      const employeeData: Employee = {
        employeeId: normalizedId,
        employeeName: employeeName.trim(),
        designation: designation.trim(),
        branchName: branchName.trim(),
        email: normalizedEmail,
        password: password,
        registeredAt: new Date().toISOString(),
      };

      // Add new employee
      const updatedEmployees = [...employees, employeeData];

      // Save all employee details including password
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedEmployees)
      );

      // Verify saved records
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);

      const savedEmployees: Employee[] = savedData
        ? JSON.parse(savedData)
        : [];

      // Console output for demo
      console.log("========== EMPLOYEE REGISTRATION ==========");
      console.log("New Employee:", employeeData);
      console.log(
        "All Employees:",
        JSON.stringify(savedEmployees, null, 2)
      );
      console.log("Total Employees:", savedEmployees.length);
      console.log("===========================================");

      // Clear form
      setEmployeeId("");
      setEmployeeName("");
      setDesignation("");
      setBranchName("");
      setEmail("");
      setPassword("");

      Alert.alert(
        "Registration Successful",
        "Employee details and password saved locally!",
        [
          {
            text: "OK",
            onPress: () => router.replace("/login"),
          },
        ]
      );

    } catch (error) {
      console.log("Registration Error:", error);

      Alert.alert(
        "Error",
        "Unable to save employee details"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode={
          Platform.OS === "ios" ? "interactive" : "on-drag"
        }
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <Text style={styles.title}>Micro Finance</Text>

        <View style={styles.card}>
          <Text style={styles.heading}>
            Employee Registration
          </Text>

          <TextInput
            placeholder="Employee ID"
            placeholderTextColor="#777"
            style={styles.input}
            value={employeeId}
            onChangeText={setEmployeeId}
            onFocus={() => handleInputFocus(0)}
            autoCapitalize="characters"
            returnKeyType="next"
          />

          <TextInput
            placeholder="Employee Name"
            placeholderTextColor="#777"
            style={styles.input}
            value={employeeName}
            onChangeText={setEmployeeName}
            onFocus={() => handleInputFocus(1)}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Designation"
            placeholderTextColor="#777"
            style={styles.input}
            value={designation}
            onChangeText={setDesignation}
            onFocus={() => handleInputFocus(2)}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Branch Name"
            placeholderTextColor="#777"
            style={styles.input}
            value={branchName}
            onChangeText={setBranchName}
            onFocus={() => handleInputFocus(3)}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Email Address"
            placeholderTextColor="#777"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            onFocus={() => handleInputFocus(4)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#777"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            onFocus={() => handleInputFocus(5)}
            secureTextEntry
            autoCapitalize="none"
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />

          <TouchableOpacity
            style={[
              styles.button,
              loading && styles.disabledButton,
            ]}
            onPress={handleRegister}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.buttonText}>
                Register
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              router.replace("/login");
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>
              Back to Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#1FAF5A",
  },

  scrollView: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 50,
  },

  title: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 15,
    elevation: 8,
    width: "100%",
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 25,
    textAlign: "center",
    color: "#1FAF5A",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 15,
    backgroundColor: "#F7F7F7",
    fontSize: 15,
    color: "#222222",
  },

  button: {
    backgroundColor: "#1FAF5A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  loginText: {
    textAlign: "center",
    marginTop: 20,
    color: "#1FAF5A",
    fontWeight: "bold",
    fontSize: 14,
  },
});
