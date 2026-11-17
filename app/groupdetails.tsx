
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

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F5F8F6";

type GroupMember = {
  id: string;
  name: string;
  loan: number;
  emi: number;
};

const members: GroupMember[] = [
  { id: "1", name: "Ramesh", loan: 50000, emi: 500 },
  { id: "2", name: "Lakshmi", loan: 40000, emi: 400 },
];

const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function GroupDetails() {
  const router = useRouter();

  // Group summary calculations
  const totalMembers = members.length;

  const totalLoans = members.reduce(
    (sum, item) => sum + item.loan,
    0
  );

  const totalEMI = members.reduce(
    (sum, item) => sum + item.emi,
    0
  );

  // Navigate to individual member EMI collection
  const handleCollectEMI = (item: GroupMember) => {
    router.push({
      pathname: "/collectgroupemi",
      params: {
        memberId: item.id,
        memberName: item.name,
        emi: String(item.emi),
      },
    });
  };

  // Render member card
  const renderItem = ({ item }: { item: GroupMember }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberLeft}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>
            {item.name}
          </Text>

          <Text style={styles.memberLabel}>
            Group Member
          </Text>

          <View style={styles.loanRow}>
            <Ionicons
              name="wallet-outline"
              size={14}
              color="#829188"
            />

            <Text style={styles.loan}>
              Loan Amount: {formatAmount(item.loan)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.memberRight}>
        <Text style={styles.emiLabel}>
          Monthly EMI
        </Text>

        <Text style={styles.emiAmount}>
          {formatAmount(item.emi)}
        </Text>

        <TouchableOpacity
          style={styles.collectBtn}
          activeOpacity={0.8}
          onPress={() => handleCollectEMI(item)}
        >
          <Ionicons
            name="cash-outline"
            size={15}
            color="#FFFFFF"
          />

          <Text style={styles.collectText}>
            Collect
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
    >
      <StatusBar
        backgroundColor={GREEN}
        barStyle="light-content"
        translucent={false}
      />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.8}
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              Lakshmi SHG
            </Text>

            <View style={styles.headerLocation}>
              <Ionicons
                name="location-outline"
                size={14}
                color="#DDF8E8"
              />

              <Text style={styles.subtitle}>
                Village: Tiruvallur
              </Text>
            </View>
          </View>

          <View style={styles.moreButton}>
            <Ionicons
              name="people-outline"
              size={21}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* Group Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryItem}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="people-outline"
                size={21}
                color={GREEN}
              />
            </View>

            <Text style={styles.summaryValue}>
              {totalMembers}
            </Text>

            <Text style={styles.summaryLabel}>
              Members
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="wallet-outline"
                size={21}
                color={GREEN}
              />
            </View>

            <Text
              style={styles.summaryValue}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {formatAmount(totalLoans)}
            </Text>

            <Text style={styles.summaryLabel}>
              Total Loans
            </Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryItem}>
            <View style={styles.summaryIcon}>
              <Ionicons
                name="cash-outline"
                size={21}
                color={GREEN}
              />
            </View>

            <Text
              style={styles.summaryValue}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {formatAmount(totalEMI)}
            </Text>

            <Text style={styles.summaryLabel}>
              Total EMI
            </Text>
          </View>
        </View>

        {/* Member List Heading */}
        <View style={styles.listHeader}>
          <View>
            <Text style={styles.sectionTitle}>
              Group Members
            </Text>

            <Text style={styles.sectionSubtitle}>
              View member loans and collect EMI
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {totalMembers}
            </Text>
          </View>
        </View>

        {/* Member List */}
        <FlatList
          data={members}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={45}
                color="#AAB5AD"
              />

              <Text style={styles.emptyTitle}>
                No Members Found
              </Text>

              <Text style={styles.emptySubtitle}>
                Add members to this group
              </Text>
            </View>
          }
        />

        {/* Bottom Actions */}
        <View style={styles.bottomActions}>
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => router.push("/creategroup")}
          >
            <Ionicons
              name="person-add-outline"
              size={21}
              color={GREEN}
            />

            <Text style={styles.addButtonText}>
              Add Member
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.collectAll}
            activeOpacity={0.85}
            onPress={() => router.push("/collectgroupemi")}
          >
            <Ionicons
              name="cash-outline"
              size={20}
              color="#FFFFFF"
            />

            <Text style={styles.collectAllText}>
              Collect Group EMI
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GREEN,
  },

  container: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  // Header
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerInfo: {
    flex: 1,
    marginLeft: 14,
  },

  headerTitle: {
    fontSize: 21,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerLocation: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  subtitle: {
    color: "#E8F8EF",
    fontSize: 12,
    marginLeft: 4,
  },

  moreButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },

  // Summary
  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 18,
    marginTop: -1,
    paddingVertical: 17,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8F0EA",
    elevation: 3,
    shadowColor: "#174D2D",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  summaryItem: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 3,
  },

  summaryIcon: {
    width: 38,
    height: 38,
    backgroundColor: "#E8F7ED",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 7,
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: "800",
    color: "#26352B",
  },

  summaryLabel: {
    fontSize: 10,
    color: "#849188",
    marginTop: 4,
  },

  summaryDivider: {
    width: 1,
    height: 55,
    backgroundColor: "#E8EEE9",
  },

  // Member list heading
  listHeader: {
    marginHorizontal: 20,
    marginTop: 25,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#24352A",
  },

  sectionSubtitle: {
    fontSize: 12,
    color: "#89938C",
    marginTop: 4,
  },

  countBadge: {
    minWidth: 32,
    height: 32,
    paddingHorizontal: 9,
    borderRadius: 11,
    backgroundColor: "#E5F7EC",
    justifyContent: "center",
    alignItems: "center",
  },

  countText: {
    fontSize: 13,
    fontWeight: "800",
    color: GREEN,
  },

  // Member cards
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 15,
    flexGrow: 1,
  },

  memberCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 17,
    padding: 15,
    marginBottom: 13,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E9F0EA",
    elevation: 2,
    shadowColor: "#174D2D",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },

  memberLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#E8F7ED",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: DARK_GREEN,
    fontSize: 19,
    fontWeight: "800",
  },

  memberInfo: {
    marginLeft: 12,
    flex: 1,
  },

  memberName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#26352B",
  },

  memberLabel: {
    fontSize: 11,
    color: "#929D95",
    marginTop: 3,
  },

  loanRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  loan: {
    fontSize: 11,
    color: "#6F7B72",
    marginLeft: 5,
  },

  memberRight: {
    alignItems: "flex-end",
    marginLeft: 8,
  },

  emiLabel: {
    fontSize: 10,
    color: "#89938C",
  },

  emiAmount: {
    fontSize: 17,
    fontWeight: "800",
    color: "#26352B",
    marginTop: 3,
    marginBottom: 8,
  },

  collectBtn: {
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: 9,
  },

  collectText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    marginLeft: 5,
  },

  // Empty state
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 55,
  },

  emptyTitle: {
    color: "#26352B",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 12,
  },

  emptySubtitle: {
    color: "#89938C",
    fontSize: 12,
    marginTop: 5,
  },

  // Bottom actions
 bottomActions: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 18,
  paddingVertical: 13,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#E8EEE9",
  bottom: 50,
  gap: 10,
},

  addButton: {
    flex: 0.9,
    height: 51,
    borderRadius: 13,
    borderWidth: 1.5,
    borderColor: GREEN,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: GREEN,
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 6,
  },

  collectAll: {
    flex: 1.3,
    height: 51,
    backgroundColor: GREEN,
    borderRadius: 13,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: DARK_GREEN,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  collectAllText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
    marginLeft: 7,
  },
});
