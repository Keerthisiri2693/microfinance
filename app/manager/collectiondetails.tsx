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

export default function CollectionDetails() {
  const router = useRouter();

  const collection = {
    customer: "Lakshmi",
    group: "Lakshmi SHG",
    officer: "Ramesh Kumar",
    loanAmount: "₹50,000",
    emiPaid: "₹500",
    date: "10 Mar 2026",
    time: "10:45 AM",
    method: "Cash",
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

          <Text style={styles.title}>Collection Details</Text>

          <View style={{ width: 24 }} />
        </View>

        <ScrollView
          style={styles.body}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Customer Info */}
          <View style={styles.card}>
            <Text style={styles.section}>Customer</Text>

            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{collection.customer}</Text>

            <Text style={styles.label}>Group</Text>
            <Text style={styles.value}>{collection.group}</Text>
          </View>

          {/* Officer */}
          <View style={styles.card}>
            <Text style={styles.section}>Field Officer</Text>

            <Text style={styles.label}>Officer</Text>
            <Text style={styles.value}>{collection.officer}</Text>
          </View>

          {/* Loan Details */}
          <View style={styles.card}>
            <Text style={styles.section}>Loan Details</Text>

            <Text style={styles.label}>Loan Amount</Text>
            <Text style={styles.value}>{collection.loanAmount}</Text>

            <Text style={styles.label}>EMI Paid</Text>
            <Text style={styles.amount}>{collection.emiPaid}</Text>
          </View>

          {/* Payment Info */}
          <View style={styles.card}>
            <Text style={styles.section}>Payment</Text>

            <View style={styles.row}>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{collection.date}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{collection.time}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Method</Text>
              <Text style={styles.value}>{collection.method}</Text>
            </View>
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
    justifyContent: "space-between",
    alignItems: "center",
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
  },

  value: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#263238",
    marginBottom: 10,
  },

  amount: {
    color: "#1FAF5A",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
});