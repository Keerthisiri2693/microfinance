
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { PieChart, BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;
const chartWidth = screenWidth - 50;

export default function Reports() {
  const router = useRouter();

  const summary = {
    totalLoans: 186,
    pendingLoans: 32,
    defaulters: 7,
  };

  const loanChart = [
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

  const collectionData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        data: [2200, 3400, 1800, 4200, 3000, 2800],
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#FFFFFF",
    backgroundGradientTo: "#FFFFFF",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(31,175,90,${opacity})`,
    labelColor: () => "#555555",
    propsForBackgroundLines: {
      stroke: "#E9EFEB",
      strokeDasharray: "",
    },
  };

  const reportOptions = [
    {
      title: "Daily Collection",
      subtitle: "View daily payment collections",
      icon: "cash-outline" as const,
      color: "#1FAF5A",
      route: "/manager/dailycollectionreports" as const,
    },
    {
      title: "Loan Report",
      subtitle: "Loan status and distribution",
      icon: "document-text-outline" as const,
      color: "#1FAF5A",
      route: "/manager/loanreport" as const,
    },
    {
      title: "Defaulters",
      subtitle: "Overdue payments and customers",
      icon: "warning-outline" as const,
      color: "#E53935",
      route: "/manager/defaulterreport" as const,
    },
    {
      title: "Officer Performance",
      subtitle: "Compare officer performance",
      icon: "people-outline" as const,
      color: "#1FAF5A",
      route: "/manager/officerperformancereport" as const,
    },
  ];

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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Reports</Text>
            <Text style={styles.headerSubtitle}>
              Financial overview and analytics
            </Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Summary */}
          <Text style={styles.sectionTitle}>Loan Summary</Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Ionicons
                  name="document-text-outline"
                  size={22}
                  color="#1FAF5A"
                />
              </View>
              <Text style={styles.summaryValue}>
                {summary.totalLoans}
              </Text>
              <Text style={styles.summaryLabel}>Total Loans</Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={[styles.summaryIcon, styles.pendingIcon]}>
                <Ionicons
                  name="time-outline"
                  size={22}
                  color="#E69500"
                />
              </View>
              <Text style={styles.summaryValue}>
                {summary.pendingLoans}
              </Text>
              <Text style={styles.summaryLabel}>Pending</Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={[styles.summaryIcon, styles.defaulterIcon]}>
                <Ionicons
                  name="warning-outline"
                  size={22}
                  color="#E53935"
                />
              </View>
              <Text style={styles.summaryValue}>
                {summary.defaulters}
              </Text>
              <Text style={styles.summaryLabel}>Defaulters</Text>
            </View>
          </View>

          {/* Loan Distribution */}
          <Text style={styles.sectionTitle}>Loan Distribution</Text>

          <View style={styles.chartCard}>
            <Text style={styles.chartSubtitle}>
              Overview of loan repayment status
            </Text>

            <PieChart
              data={loanChart}
              width={chartWidth}
              height={215}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              absolute
              hasLegend
            />
          </View>

          {/* Weekly Collection */}
          <Text style={styles.sectionTitle}>Weekly Collection</Text>

          <View style={styles.chartCard}>
            <Text style={styles.chartSubtitle}>
              Daily collection amount for this week
            </Text>

            <BarChart
              data={collectionData}
              width={chartWidth}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""
              chartConfig={chartConfig}
              style={styles.barChart}
              fromZero
              showValuesOnTopOfBars
            />
          </View>

          {/* Report Navigation */}
          <View style={styles.reportHeader}>
            <View>
              <Text style={styles.sectionTitle}>Detailed Reports</Text>
              <Text style={styles.reportSubtitle}>
                Select a report to view more information
              </Text>
            </View>
          </View>

          <View style={styles.reportGrid}>
            {reportOptions.map((item) => (
              <TouchableOpacity
                key={item.title}
                style={styles.reportCard}
                activeOpacity={0.75}
                onPress={() => router.push(item.route)}
              >
                <View
                  style={[
                    styles.reportIcon,
                    { backgroundColor: `${item.color}15` },
                  ]}
                >
                  <Ionicons
                    name={item.icon}
                    size={25}
                    color={item.color}
                  />
                </View>

                <View style={styles.reportTextContainer}>
                  <Text style={styles.reportTitle}>{item.title}</Text>
                  <Text style={styles.reportDescription}>
                    {item.subtitle}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color="#A0AAA4"
                />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.footerText}>
            Micro Finance Management • Reports
          </Text>
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
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 35,
    justifyContent: "center",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerPlaceholder: {
    width: 35,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 11,
    marginTop: 3,
  },
  scrollContent: {
    paddingBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26352D",
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 12,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    gap: 9,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 13,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  pendingIcon: {
    backgroundColor: "#FFF4E5",
  },
  defaulterIcon: {
    backgroundColor: "#FDECEC",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#26352D",
    marginTop: 8,
  },
  summaryLabel: {
    fontSize: 10,
    color: "#777777",
    marginTop: 4,
    textAlign: "center",
  },
  chartCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderRadius: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  chartSubtitle: {
    alignSelf: "flex-start",
    marginLeft: 12,
    color: "#888888",
    fontSize: 12,
  },
  barChart: {
    borderRadius: 12,
    marginTop: 8,
  },
  reportHeader: {
    marginTop: 3,
  },
  reportSubtitle: {
    fontSize: 12,
    color: "#888888",
    marginHorizontal: 16,
    marginTop: -7,
    marginBottom: 12,
  },
  reportGrid: {
    paddingHorizontal: 15,
    gap: 11,
  },
  reportCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  reportIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  reportTextContainer: {
    flex: 1,
    marginLeft: 12,
  },
  reportTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#26352D",
  },
  reportDescription: {
    fontSize: 11,
    color: "#888888",
    marginTop: 4,
  },
  footerText: {
    textAlign: "center",
    color: "#A0AAA4",
    fontSize: 11,
    marginTop: 22,
  },
});
