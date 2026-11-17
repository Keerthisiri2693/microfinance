
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart, BarChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

const chartWidth = screenWidth - 50;

export default function OfficerPerformance() {
  const summary = {
    totalOfficers: 5,
    avgCollectionRate: "87%",
  };

  const performancePie = [
    {
      name: "Collected",
      population: 87,
      color: "#1FAF5A",
      legendFontColor: "#555",
      legendFontSize: 12,
    },
    {
      name: "Pending",
      population: 13,
      color: "#FF9500",
      legendFontColor: "#555",
      legendFontSize: 12,
    },
  ];

  const loanChart = {
    labels: ["Ravi", "Suresh", "Meena", "Lakshmi", "Kumar"],
    datasets: [
      {
        data: [45, 38, 50, 29, 24],
      },
    ],
  };

  const officers = [
    {
      name: "Ravi Kumar",
      village: "Kanchipuram",
      loans: 45,
      collection: 92,
    },
    {
      name: "Suresh",
      village: "Chengalpattu",
      loans: 38,
      collection: 85,
    },
    {
      name: "Meena",
      village: "Sriperumbudur",
      loans: 50,
      collection: 90,
    },
    {
      name: "Lakshmi",
      village: "Tambaram",
      loans: 29,
      collection: 80,
    },
    {
      name: "Kumar",
      village: "Madurantakam",
      loans: 24,
      collection: 78,
    },
  ];

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

  const getPerformanceColor = (rate: number) => {
    if (rate >= 90) return "#1FAF5A";
    if (rate >= 80) return "#E69500";
    return "#E53935";
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
          <View>
            <Text style={styles.title}>Officer Performance</Text>
            <Text style={styles.headerSubtitle}>
              Monitor your team performance
            </Text>
          </View>

          <Ionicons
            name="people-outline"
            size={27}
            color="#FFFFFF"
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Summary */}
          <Text style={styles.sectionHeading}>Performance Summary</Text>

          <View style={styles.summaryContainer}>
            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Ionicons
                  name="people-outline"
                  size={23}
                  color="#1FAF5A"
                />
              </View>

              <Text style={styles.value}>
                {summary.totalOfficers}
              </Text>

              <Text style={styles.label}>Total Officers</Text>
            </View>

            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Ionicons
                  name="trending-up-outline"
                  size={23}
                  color="#1FAF5A"
                />
              </View>

              <Text style={styles.value}>
                {summary.avgCollectionRate}
              </Text>

              <Text style={styles.label}>Avg Collection</Text>
            </View>
          </View>

          {/* Collection Success Rate */}
          <Text style={styles.sectionHeading}>
            Collection Success Rate
          </Text>

          <View style={styles.chartCard}>
            <Text style={styles.chartSubtitle}>
              Overall collection performance
            </Text>

            <PieChart
              data={performancePie}
              width={chartWidth}
              height={210}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="10"
              absolute
              hasLegend
            />
          </View>

          {/* Loans Managed */}
          <Text style={styles.sectionHeading}>
            Loans Managed by Officers
          </Text>

          <View style={styles.chartCard}>
            <Text style={styles.chartSubtitle}>
              Number of loans handled by each officer
            </Text>

            <BarChart
              data={loanChart}
              width={chartWidth}
              height={220}
              chartConfig={chartConfig}
              style={styles.barChart}
              fromZero
              showValuesOnTopOfBars
              yAxisLabel=""
              yAxisSuffix=""
            />
          </View>

          {/* Officer List */}
          <View style={styles.listHeader}>
            <Text style={styles.sectionHeading}>
              Individual Performance
            </Text>

            <Text style={styles.officerCount}>
              {officers.length} Officers
            </Text>
          </View>

          {officers.map((item, index) => {
            const performanceColor = getPerformanceColor(
              item.collection
            );

            return (
              <View
                key={`${item.name}-${index}`}
                style={styles.officerCard}
              >
                {/* Officer Details */}
                <View style={styles.officerTop}>
                  <View style={styles.officerLeft}>
                    <View style={styles.avatar}>
                      <Text style={styles.avatarText}>
                        {item.name.charAt(0)}
                      </Text>
                    </View>

                    <View style={styles.officerInfo}>
                      <Text style={styles.name}>{item.name}</Text>

                      <View style={styles.locationRow}>
                        <Ionicons
                          name="location-outline"
                          size={13}
                          color="#888888"
                        />
                        <Text style={styles.village}>
                          {item.village}
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.loanInfo}>
                    <Text style={styles.loanCount}>
                      {item.loans}
                    </Text>
                    <Text style={styles.loanLabel}>Loans</Text>
                  </View>
                </View>

                {/* Collection Progress */}
                <View style={styles.progressHeader}>
                  <Text style={styles.progressLabel}>
                    Collection Rate
                  </Text>

                  <Text
                    style={[
                      styles.collection,
                      { color: performanceColor },
                    ]}
                  >
                    {item.collection}%
                  </Text>
                </View>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${item.collection}%`,
                        backgroundColor: performanceColor,
                      },
                    ]}
                  />
                </View>
              </View>
            );
          })}
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
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  summaryCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    borderRadius: 14,
    paddingVertical: 17,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  summaryIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  value: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#26352D",
    marginTop: 8,
  },
  label: {
    fontSize: 12,
    color: "#777777",
    marginTop: 4,
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
  listHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 16,
  },
  officerCount: {
    fontSize: 11,
    color: "#888888",
    marginTop: 8,
  },
  officerCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginBottom: 11,
    padding: 15,
    borderRadius: 14,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  officerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  officerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#128447",
    fontSize: 18,
    fontWeight: "bold",
  },
  officerInfo: {
    marginLeft: 11,
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
    fontSize: 11,
    color: "#888888",
    marginLeft: 3,
  },
  loanInfo: {
    backgroundColor: "#F0F8F3",
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 7,
    alignItems: "center",
  },
  loanCount: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#128447",
  },
  loanLabel: {
    fontSize: 10,
    color: "#777777",
    marginTop: 2,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 12,
    color: "#777777",
    fontWeight: "500",
  },
  collection: {
    fontSize: 12,
    fontWeight: "bold",
  },
  progressBackground: {
    height: 7,
    borderRadius: 5,
    backgroundColor: "#EDF1EE",
    overflow: "hidden",
  },
  progressFill: {
    height: 7,
    borderRadius: 5,
  },
});
