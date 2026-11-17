import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const customers = [
  {
    id: "1",
    name: "Ramesh",
    mobile: "9876543210",
    loan: "₹50,000",
    emi: "₹500",
  },
  {
    id: "2",
    name: "Lakshmi",
    mobile: "9123456780",
    loan: "₹40,000",
    emi: "₹400",
  },
  {
    id: "3",
    name: "Suresh",
    mobile: "9988776655",
    loan: "₹60,000",
    emi: "₹600",
  },
];

export default function Customers() {
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => router.push("/customerdetails")}
    >
      <View style={styles.left}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{item.name[0]}</Text>
        </View>

        <View style={styles.customerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.mobile}>{item.mobile}</Text>
          <Text style={styles.loan}>Loan: {item.loan}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.emi}>EMI {item.emi}</Text>

        <TouchableOpacity
          style={styles.collectBtn}
          activeOpacity={0.8}
          onPress={() => router.push("/collectemiamount")}
        >
          <Ionicons name="cash" size={16} color="#fff" />
          <Text style={styles.collectText}>Collect</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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

          <Text style={styles.headerTitle}>Customers</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* Customer List */}
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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

  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },

  listContent: {
    padding: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },

  customerInfo: {
    flex: 1,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22,
    backgroundColor: "#1FAF5A",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  name: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#263238",
  },

  mobile: {
    color: "#666",
    fontSize: 13,
    marginTop: 3,
  },

  loan: {
    fontSize: 13,
    color: "#1FAF5A",
    marginTop: 3,
  },

  right: {
    alignItems: "flex-end",
    marginLeft: 8,
  },

  emi: {
    fontWeight: "bold",
    color: "#263238",
    marginBottom: 8,
  },

  collectBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1FAF5A",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 6,
    gap: 5,
  },

  collectText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
});