
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

export default function LoanReport() {
  const summary = {
    totalLoans: 186,
    completed: 147,
    pending: 32,
    defaulters: 7,
  };

  const pieData = [
    {
      name: "Completed",
      population: 147,
      color: "#1FAF5A",
      legendFontColor: "#555",
      legendFontSize: 12,
    },
    {
      name: "Pending",
      population: 32,
      color: "#FF9500",
      legendFontColor: "#555",
      legendFontSize: 12,
    },
    {
      name: "Defaulters",
      population: 7,
      color: "#FF3B30",
      legendFontColor: "#555",
      legendFontSize: 12,
    },
  ];

  const loanChart = {
    labels: ["10K", "20K", "30K", "40K", "50K"],
    datasets: [{ data: [35, 62, 48, 22, 19] }],
  };

  const loans = [
    { name: "Lakshmi", village: "Tambaram", amount: 20000, status: "Completed" },
    { name: "Selvi", village: "Chengalpattu", amount: 30000, status: "Pending" },
    { name: "Meena", village: "Sriperumbudur", amount: 15000, status: "Completed" },
    { name: "Kumar", village: "Kanchipuram", amount: 25000, status: "Pending" },
    { name: "Rani", village: "Tambaram", amount: 20000, status: "Defaulter" },
  ];

  const getStatusColor = (status: string) => {
    if (status === "Completed") return "#1FAF5A";
    if (status === "Pending") return "#E69500";
    return "#E53935";
  };

  const getStatusIcon = (status: string) => {
    if (status === "Completed") return "checkmark-circle";
    if (status === "Pending") return "time";
    return "alert-circle";
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(31,175,90,${opacity})`,
    labelColor: () => "#555",
    propsForBackgroundLines: {
      stroke: "#E9EFEB",
      strokeDasharray: "",
    },
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        backgroundColor="#1FAF5A"
        barStyle="light-content"
        translucent={false}
      />

      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Loan Report</Text>
            <Text style={styles.headerSubtitle}>
              Loan performance overview
            </Text>
          </View>
          <Ionicons name="document-text-outline" size={27} color="#FFFFFF" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Summary */}
          <Text style={styles.sectionHeading}>Loan Summary</Text>

          <View style={styles.summaryContainer}>
            <SummaryCard
              icon="wallet-outline"
              label="Total Loans"
              value={summary.totalLoans}
              color="#1FAF5A"
            />
            <SummaryCard
              icon="checkmark-circle-outline"
              label="Completed"
              value={summary.completed}
              color="#1FAF5A"
            />
            <SummaryCard
              icon="time-outline"
              label="Pending"
              value={summary.pending}
              color="#E69500"
            />
            <SummaryCard
              icon="warning-outline"
              label="Defaulters"
              value={summary.defaulters}
              color="#E53935"
            />
          </View>

          {/* Loan Status */}
          <Text style={styles.sectionHeading}>Loan Status</Text>

          <View style={styles.chartCard}>
            <Text style={styles.chartSubtitle}>
              Distribution by repayment status
            </Text>

            <PieChart
              data={pieData}
              width={screenWidth - 50}
              height={210}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              absolute
              hasLegend
            />
          </View>

          {/* Loan Amount Distribution */}
          <Text style={styles.sectionHeading}>
            Loan Amount Distribution
          </Text>

          <View style={styles.chartCard}>
            <Text style={styles.chartSubtitle}>
              Number of loans by amount
            </Text>

            <BarChart
              data={loanChart}
              width={screenWidth - 50}
              height={220}
              chartConfig={chartConfig}
              style={styles.barChart}
              fromZero
              showValuesOnTopOfBars
              yAxisLabel=""
              yAxisSuffix=""
            />
          </View>

          {/* Customer List */}
          <View style={styles.listHeader}>
            <Text style={styles.sectionHeading}>Loan Customers</Text>
            <Text style={styles.customerCount}>{loans.length} Customers</Text>
          </View>

          {loans.map((item, index) => {
            const statusColor = getStatusColor(item.status);

            return (
              <View key={`${item.name}-${index}`} style={styles.loanCard}>
                <View style={styles.customerLeft}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {item.name.charAt(0)}
                    </Text>
                  </View>

                  <View style={styles.customerInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.locationRow}>
                      <Ionicons
                        name="location-outline"
                        size={13}
                        color="#888"
                      />
                      <Text style={styles.village}>{item.village}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.customerRight}>
                  <Text style={styles.amount}>
                    ₹{item.amount.toLocaleString("en-IN")}
                  </Text>

                  <View
                    style={[
                      styles.statusBadge,
                      { backgroundColor: `${statusColor}15` },
                    ]}
                  >
                    <Ionicons
                      name={getStatusIcon(item.status) as any}
                      size={12}
                      color={statusColor}
                    />
                    <Text
                      style={[styles.statusText, { color: statusColor }]}
                    >
                      {item.status}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

type SummaryCardProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  label: string;
  value: number;
  color: string;
};

function SummaryCard({ icon, label, value, color }: SummaryCardProps) {
  return (
    <View style={styles.summaryCard}>
      <View style={[styles.summaryIcon, { backgroundColor: `${color}15` }]}>
        <Ionicons name={icon} size={23} color={color} />
      </View>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryLabel}>{label}</Text>
    </View>
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
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 12,
    marginTop: 3,
  },
  scrollContent: {
    paddingBottom: 25,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26352D",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  summaryCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 12,
    marginBottom: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  summaryValue: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#26352D",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#777",
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: "center",
  },
  chartSubtitle: {
    alignSelf: "flex-start",
    marginLeft: 12,
    color: "#888",
    fontSize: 12,
  },
  barChart: {
    borderRadius: 12,
    marginTop: 8,
  },
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 16,
  },
  customerCount: {
    fontSize: 12,
    color: "#888",
  },
  loanCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 14,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  customerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#E6F6EC",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },
  avatarText: {
    color: "#128447",
    fontSize: 17,
    fontWeight: "bold",
  },
  customerInfo: {
    flex: 1,
  },
  name: {
    fontWeight: "700",
    fontSize: 14,
    color: "#26352D",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  village: {
    fontSize: 12,
    color: "#888",
    marginLeft: 3,
  },
  customerRight: {
    alignItems: "flex-end",
    marginLeft: 8,
  },
  amount: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#26352D",
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
});
