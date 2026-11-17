import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function DefaulterDetails() {
  const router = useRouter();

  const customer = {
    name: "Lakshmi",
    group: "Lakshmi SHG",
    village: "Tiruvallur",
    officer: "Ramesh Kumar",
    loanAmount: "₹50,000",
    emiAmount: "₹500",
    pending: "₹1,500",
    overdue: "5 Days",
  };

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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Defaulter Details</Text>

          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Customer */}
          <View style={styles.card}>
            <Text style={styles.section}>Customer</Text>

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{customer.name}</Text>

            <Text style={styles.label}>Group</Text>
            <Text style={styles.value}>{customer.group}</Text>

            <Text style={styles.label}>Village</Text>
            <Text style={styles.value}>{customer.village}</Text>
          </View>

          {/* Loan */}
          <View style={styles.card}>
            <Text style={styles.section}>Loan Details</Text>

            <Text style={styles.label}>Loan Amount</Text>
            <Text style={styles.value}>{customer.loanAmount}</Text>

            <Text style={styles.label}>EMI Amount</Text>
            <Text style={styles.value}>{customer.emiAmount}</Text>

            <Text style={styles.label}>Pending Amount</Text>
            <Text style={styles.pending}>{customer.pending}</Text>

            <Text style={styles.label}>Overdue</Text>
            <Text style={styles.overdue}>{customer.overdue}</Text>
          </View>

          {/* Officer */}
          <View style={styles.card}>
            <Text style={styles.section}>Field Officer</Text>

            <Text style={styles.label}>Officer</Text>
            <Text style={styles.value}>{customer.officer}</Text>
          </View>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity style={styles.callBtn}>
              <Ionicons name="call-outline" size={20} color="#fff" />
              <Text style={styles.actionText}>Call Customer</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.collectBtn}>
              <Ionicons name="cash-outline" size={20} color="#fff" />
              <Text style={styles.actionText}>Collect EMI</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  body: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },

  section: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#263238",
    marginBottom: 12,
  },

  label: {
    color: "#777",
    fontSize: 12,
    marginBottom: 3,
  },

  value: {
    fontWeight: "bold",
    color: "#263238",
    marginBottom: 10,
    fontSize: 14,
  },

  pending: {
    color: "#E53935",
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 15,
  },

  overdue: {
    color: "#FF9800",
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 15,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },

  callBtn: {
    backgroundColor: "#1FAF5A",
    padding: 14,
    borderRadius: 10,
    flex: 1,
    marginRight: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  collectBtn: {
    backgroundColor: "#E53935",
    padding: 14,
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 13,
  },
});