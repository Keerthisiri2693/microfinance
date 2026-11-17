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
import { useRouter } from "expo-router";

const defaulters = [
  {
    id: "1",
    customer: "Lakshmi",
    group: "Lakshmi SHG",
    officer: "Ramesh",
    emi: "₹500",
    days: "5 Days Overdue",
  },
  {
    id: "2",
    customer: "Selvi",
    group: "Lakshmi SHG",
    officer: "Ramesh",
    emi: "₹500",
    days: "3 Days Overdue",
  },
  {
    id: "3",
    customer: "Radha",
    group: "Avadi SHG",
    officer: "Selvi",
    emi: "₹400",
    days: "7 Days Overdue",
  },
];

export default function DefaultersList() {
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <View style={styles.card}>
      <View style={styles.left}>
        <Text style={styles.customer}>{item.customer}</Text>
        <Text style={styles.group}>{item.group}</Text>
        <Text style={styles.officer}>Officer: {item.officer}</Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.emi}>{item.emi}</Text>
        <Text style={styles.days}>{item.days}</Text>

        <TouchableOpacity
          style={styles.callBtn}
          activeOpacity={0.8}
        >
          <Ionicons name="call" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
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

          <Text style={styles.title}>Defaulters</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* List */}
        <FlatList
          data={defaulters}
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

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  listContent: {
    padding: 20,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  left: {
    flex: 1,
  },

  customer: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#263238",
  },

  group: {
    color: "#777",
    marginTop: 3,
    fontSize: 13,
  },

  officer: {
    fontSize: 12,
    color: "#999",
    marginTop: 3,
  },

  right: {
    alignItems: "flex-end",
    marginLeft: 10,
  },

  emi: {
    color: "#E53935",
    fontWeight: "bold",
    fontSize: 16,
  },

  days: {
    fontSize: 11,
    color: "#999",
    marginTop: 3,
  },

  callBtn: {
    marginTop: 8,
    backgroundColor: "#1FAF5A",
    padding: 8,
    borderRadius: 6,
  },
});