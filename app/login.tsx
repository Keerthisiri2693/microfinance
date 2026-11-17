import React, { useState } from "react";

import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

type Employee = {
  employeeId: string;
  employeeName: string;
  designation: string;
  branchName: string;
  email: string;
  password: string;
  registeredAt: string;
};

export default function Login() {
  const router = useRouter();

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!employeeId.trim() || !password) {
      Alert.alert("Validation", "Please enter Employee ID and Password");
      return;
    }

    try {
      setLoading(true);

      // Get all registered employees from AsyncStorage
      const storedData = await AsyncStorage.getItem("employees");

      if (!storedData) {
        Alert.alert(
          "Login Failed",
          "No employee registration found. Please register first.",
        );
        return;
      }

      const employees: Employee[] = JSON.parse(storedData);

      if (!Array.isArray(employees)) {
        Alert.alert("Error", "Invalid employee storage data");
        return;
      }

      // Find employee by Employee ID
      const employee = employees.find(
        (item) =>
          item.employeeId?.trim().toLowerCase() ===
          employeeId.trim().toLowerCase(),
      );

      if (!employee) {
        Alert.alert("Login Failed", "Invalid Employee ID");
        return;
      }

      // Verify password from AsyncStorage
      if (employee.password !== password) {
        Alert.alert("Login Failed", "Invalid Password");
        return;
      }

      console.log("========== EMPLOYEE LOGIN ==========");
      console.log("Employee ID:", employee.employeeId);
      console.log("Employee Name:", employee.employeeName);
      console.log("Designation:", employee.designation);
      console.log("Branch:", employee.branchName);
      console.log("Email:", employee.email);
      console.log("Login Status: Success");
      console.log("====================================");

      // Navigate based on designation
      const designation = employee.designation
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      switch (designation) {
        case "field officer":
          router.replace("/dashboard/fieldofficerdashboard");
          break;

        case "branch manager":
          router.replace("/dashboard/branchmanagerdashboard");
          break;

        default:
          Alert.alert(
            "Access Denied",
            `Dashboard not configured for ${employee.designation}`,
          );
      }
    } catch (error) {
      console.log("Login Error:", error);

      Alert.alert("Error", "Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Micro Finance</Text>

      <View style={styles.card}>
        <Text style={styles.heading}>Employee Login</Text>

        <TextInput
          placeholder="Employee ID"
          placeholderTextColor="#777"
          style={styles.input}
          value={employeeId}
          onChangeText={setEmployeeId}
          autoCapitalize="characters"
          autoCorrect={false}
          returnKeyType="next"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#777"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          autoCapitalize="none"
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/forgotpassword")}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>New Employee?</Text>

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.signupBtn}> Signup</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1FAF5A",
    justifyContent: "center",
    padding: 25,
  },

  title: {
    fontSize: 28,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 25,
    borderRadius: 15,
    elevation: 8,
  },

  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#1FAF5A",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    backgroundColor: "#F7F7F7",
    color: "#222222",
  },

  button: {
    backgroundColor: "#1FAF5A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  disabledButton: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },

  forgot: {
    textAlign: "right",
    color: "#1FAF5A",
    marginTop: 10,
  },

  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },

  signupText: {
    color: "#555",
  },

  signupBtn: {
    color: "#1FAF5A",
    fontWeight: "bold",
  },
});
