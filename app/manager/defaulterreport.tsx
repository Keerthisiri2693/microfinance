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
import { PieChart, BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function DefaultersReport() {
  /* Summary */
  const summary = {
    totalDefaulters: 7,
    totalDue: 18500,
  };

  /* Pie Chart Data */
  const riskData = [
    {
      name: "1-7 Days",
      population: 3,
      color: "#FF9500",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "8-15 Days",
      population: 2,
      color: "#FF3B30",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
    {
      name: "15+ Days",
      population: 2,
      color: "#8E44AD",
      legendFontColor: "#333",
      legendFontSize: 12,
    },
  ];

  /* Overdue Amount Chart */
  const overdueChart = {
    labels: ["Week1", "Week2", "Week3", "Week4"],
    datasets: [
      {
        data: [3200, 4200, 5100, 6000],
      },
    ],
  };

  /* Defaulters List */
  const defaulters = [
    {
      name: "Selvi",
      village: "Chengalpattu",
      amount: 2200,
      days: 5,
    },
    {
      name: "Lakshmi",
      village: "Tambaram",
      amount: 1500,
      days: 8,
    },
    {
      name: "Rani",
      village: "Kanchipuram",
      amount: 3000,
      days: 14,
    },
    {
      name: "Meena",
      village: "Sriperumbudur",
      amount: 2800,
      days: 10,
    },
    {
      name: "Kumar",
      village: "Tambaram",
      amount: 3500,
      days: 18,
    },
    {
      name: "Suresh",
      village: "Chengalpattu",
      amount: 2400,
      days: 6,
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        backgroundColor="#FF3B30"
        barStyle="light-content"
        translucent={false}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Defaulters Report</Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <Ionicons name="warning" size={26} color="#FF3B30" />

              <Text style={styles.value}>
                {summary.totalDefaulters}
              </Text>

              <Text style={styles.label}>Total Defaulters</Text>
            </View>

            <View style={styles.summaryCard}>
              <Ionicons name="cash" size={26} color="#FF9500" />

              <Text style={styles.value}>
                ₹{summary.totalDue.toLocaleString("en-IN")}
              </Text>

              <Text style={styles.label}>Total Due Amount</Text>
            </View>
          </View>

          {/* Risk Chart */}
          <Text style={styles.chartTitle}>
            Defaulter Risk Distribution
          </Text>

          <View style={styles.chartCard}>
            <PieChart
              data={riskData}
              width={screenWidth - 30}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              absolute
            />
          </View>

          {/* Overdue Trend */}
          <Text style={styles.chartTitle}>
            Overdue Amount Trend
          </Text>

          <View style={styles.chartCard}>
            <BarChart
              data={overdueChart}
              width={screenWidth - 30}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""
              chartConfig={chartConfig}
              style={styles.chart}
              fromZero
            />
          </View>

          {/* Defaulters List */}
          <Text style={styles.sectionTitle}>Defaulters List</Text>

          {defaulters.map((item, index) => {
            const color =
              item.days <= 7
                ? "#FF9500"
                : item.days <= 15
                ? "#FF3B30"
                : "#8E44AD";

            return (
              <View key={index} style={styles.card}>
                <View style={styles.customerInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.village}>{item.village}</Text>
                </View>

                <View style={styles.rightInfo}>
                  <Text style={styles.amount}>
                    ₹{item.amount.toLocaleString("en-IN")}
                  </Text>

                  <Text style={[styles.overdueText, { color }]}>
                    {item.days} days overdue
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255,59,48,${opacity})`,
  labelColor: () => "#333",
  barPercentage: 0.6,
  propsForBackgroundLines: {
    stroke: "#E8EDEF",
  },
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FF3B30",
  },

  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  header: {
    backgroundColor: "#FF3B30",
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

  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    gap: 10,
  },

  summaryCard: {
    backgroundColor: "#fff",
    flex: 1,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    elevation: 3,
  },

  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#263238",
    marginTop: 5,
  },

  label: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
    textAlign: "center",
  },

  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#263238",
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 10,
  },

  chartCard: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    borderRadius: 12,
    paddingVertical: 10,
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
  },

  card: {
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

  customerInfo: {
    flex: 1,
  },

  name: {
    fontWeight: "600",
    fontSize: 15,
    color: "#263238",
  },

  village: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },

  rightInfo: {
    alignItems: "flex-end",
  },

  amount: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#263238",
  },

  overdueText: {
    fontSize: 12,
    marginTop: 4,
  },
});