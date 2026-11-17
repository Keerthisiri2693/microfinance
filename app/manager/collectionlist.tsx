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

const collections = [
  {
    id: "1",
    customer: "Lakshmi",
    group: "Lakshmi SHG",
    officer: "Ramesh",
    amount: "₹500",
    date: "10 Mar 2026",
  },
  {
    id: "2",
    customer: "Selvi",
    group: "Lakshmi SHG",
    officer: "Ramesh",
    amount: "₹500",
    date: "10 Mar 2026",
  },
  {
    id: "3",
    customer: "Radha",
    group: "Avadi SHG",
    officer: "Selvi",
    amount: "₹400",
    date: "9 Mar 2026",
  },
];

export default function CollectionsList() {
  const router = useRouter();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={styles.left}>
        <Text style={styles.customer}>{item.customer}</Text>

        <Text style={styles.group}>{item.group}</Text>

        <Text style={styles.officer}>
          Officer: {item.officer}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>{item.amount}</Text>

        <Text style={styles.date}>{item.date}</Text>
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

          <Text style={styles.title}>Collections</Text>

          <View style={{ width: 24 }} />
        </View>

        {/* List */}
        <FlatList
          data={collections}
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
    justifyContent: "space-between",
    alignItems: "center",
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
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  left: {
    flex: 1,
  },

  customer: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#263238",
    marginBottom: 4,
  },

  group: {
    color: "#777",
    fontSize: 13,
    marginBottom: 4,
  },

  officer: {
    fontSize: 12,
    color: "#999",
  },

  right: {
    alignItems: "flex-end",
    marginLeft: 10,
  },

  amount: {
    color: "#1FAF5A",
    fontWeight: "bold",
    fontSize: 16,
  },

  date: {
    fontSize: 11,
    color: "#777",
    marginTop: 5,
  },
});