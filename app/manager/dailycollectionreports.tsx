import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function DailyCollection() {
  const todayCollection = "₹12,540";

  const officers = [
    {
      name: "Ravi Kumar",
      village: "Kanchipuram",
      customers: 12,
      amount: 3200,
    },
    {
      name: "Suresh",
      village: "Chengalpattu",
      customers: 9,
      amount: 2800,
    },
    {
      name: "Meena",
      village: "Sriperumbudur",
      customers: 10,
      amount: 3400,
    },
    {
      name: "Lakshmi",
      village: "Tambaram",
      customers: 8,
      amount: 3140,
    },
  ];

  const chartData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [2200, 3400, 1800, 4200, 3000, 2800],
      },
    ],
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
          <Text style={styles.title}>Daily Collection</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Today Summary */}
          <View style={styles.summaryCard}>
            <View style={styles.iconContainer}>
              <Ionicons name="cash" size={30} color="#1FAF5A" />
            </View>

            <Text style={styles.summaryAmount}>{todayCollection}</Text>

            <Text style={styles.summaryLabel}>
              Today's Total Collection
            </Text>
          </View>

          {/* Weekly Collection Chart */}
          <Text style={styles.chartTitle}>Weekly Collection</Text>

          <View style={styles.chartCard}>
            <BarChart
              data={chartData}
              width={screenWidth - 30}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero
              showValuesOnTopOfBars
            />
          </View>

          {/* Officer List */}
          <Text style={styles.sectionTitle}>Officer Collection</Text>

          {officers.map((item, index) => (
            <View key={index} style={styles.officerCard}>
              <View style={styles.row}>
                <Ionicons
                  name="person-circle"
                  size={40}
                  color="#1FAF5A"
                />

                <View style={styles.officerInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.village}>{item.village}</Text>
                </View>
              </View>

              <View style={styles.rightInfo}>
                <Text style={styles.amount}>
                  ₹{item.amount.toLocaleString("en-IN")}
                </Text>

                <Text style={styles.customer}>
                  {item.customers} Customers
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(31,175,90,${opacity})`,
  labelColor: () => "#333",
  barPercentage: 0.6,
  propsForBackgroundLines: {
    stroke: "#E8EDEF",
  },
};

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
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  scrollContent: {
    paddingBottom: 25,
  },

  summaryCard: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },

  iconContainer: {
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryAmount: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#263238",
    marginTop: 8,
  },

  summaryLabel: {
    color: "#777",
    marginTop: 5,
    fontSize: 13,
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#263238",
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },

  chartCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 12,
    paddingVertical: 12,
    elevation: 2,
    overflow: "hidden",
  },

  chart: {
    borderRadius: 12,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#263238",
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 5,
  },

  officerCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginTop: 12,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 2,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  officerInfo: {
    marginLeft: 10,
  },

  name: {
    fontWeight: "600",
    fontSize: 15,
    color: "#263238",
  },

  village: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  rightInfo: {
    alignItems: "flex-end",
  },

  amount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1FAF5A",
  },

  customer: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
});