
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

type Collection = {
  id: string;
  name: string;
  village: string;
  amount: number;
  mode: "Cash" | "UPI";
  date: string;
};

const collections: Collection[] = [
  {
    id: "1",
    name: "Ramesh",
    village: "Tiruvallur",
    amount: 500,
    mode: "Cash",
    date: "10 Mar 2026",
  },
  {
    id: "2",
    name: "Lakshmi",
    village: "Tiruvallur",
    amount: 500,
    mode: "UPI",
    date: "10 Mar 2026",
  },
  {
    id: "3",
    name: "Selvi",
    village: "Kanchipuram",
    amount: 400,
    mode: "Cash",
    date: "10 Mar 2026",
  },
];

export default function CollectionList() {
  const [search, setSearch] = useState("");

  const totalCollection = collections.reduce(
    (total, item) => total + item.amount,
    0
  );

  const cashTotal = collections
    .filter((item) => item.mode === "Cash")
    .reduce((total, item) => total + item.amount, 0);

  const upiTotal = collections
    .filter((item) => item.mode === "UPI")
    .reduce((total, item) => total + item.amount, 0);

  const filteredCollections = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return collections;

    return collections.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.village.toLowerCase().includes(query) ||
        item.mode.toLowerCase().includes(query)
    );
  }, [search]);

  const formatAmount = (amount: number) =>
    `₹${amount.toLocaleString("en-IN")}`;

  const renderItem = ({ item }: { item: Collection }) => (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <View style={styles.left}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.name.charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.customerInfo}>
            <Text style={styles.name}>{item.name}</Text>

            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={13}
                color="#89958D"
              />
              <Text style={styles.village}>{item.village}</Text>
            </View>
          </View>
        </View>

        <View style={styles.right}>
          <Text style={styles.amount}>
            {formatAmount(item.amount)}
          </Text>
          <Text style={styles.paidLabel}>Collected</Text>
        </View>
      </View>

      <View style={styles.cardDivider} />

      <View style={styles.cardBottom}>
        <View style={styles.dateRow}>
          <Ionicons
            name="calendar-outline"
            size={14}
            color="#89958D"
          />
          <Text style={styles.date}>{item.date}</Text>
        </View>

        <View
          style={[
            styles.modeBadge,
            item.mode === "UPI"
              ? styles.upiBadge
              : styles.cashBadge,
          ]}
        >
          <Ionicons
            name={
              item.mode === "UPI"
                ? "phone-portrait-outline"
                : "cash-outline"
            }
            size={13}
            color={item.mode === "UPI" ? "#2875B9" : DARK_GREEN}
          />

          <Text
            style={[
              styles.modeText,
              item.mode === "UPI"
                ? styles.upiText
                : styles.cashText,
            ]}
          >
            {item.mode}
          </Text>
        </View>
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
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              Collected EMI
            </Text>
            <Text style={styles.headerSubtitle}>
              Track customer EMI collections
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="wallet-outline"
              size={23}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* Collection Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View>
              <Text style={styles.summaryLabel}>
                Total Collection
              </Text>

              <Text style={styles.totalAmount}>
                {formatAmount(totalCollection)}
              </Text>
            </View>

            <View style={styles.summaryIcon}>
              <Ionicons
                name="trending-up-outline"
                size={25}
                color={GREEN}
              />
            </View>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {collections.length}
              </Text>
              <Text style={styles.statLabel}>
                Transactions
              </Text>
            </View>

            <View style={styles.statSeparator} />

            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {formatAmount(cashTotal)}
              </Text>
              <Text style={styles.statLabel}>
                Cash
              </Text>
            </View>

            <View style={styles.statSeparator} />

            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {formatAmount(upiTotal)}
              </Text>
              <Text style={styles.statLabel}>
                UPI
              </Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={20}
            color="#89958D"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search customer or village..."
            placeholderTextColor="#A0AAA4"
            value={search}
            onChangeText={setSearch}
          />

          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons
                name="close-circle"
                size={19}
                color="#89958D"
              />
            </TouchableOpacity>
          )}
        </View>

        {/* List Heading */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>
            Collection History
          </Text>

          <Text style={styles.countText}>
            {filteredCollections.length} Records
          </Text>
        </View>

        {/* Collection List */}
        <FlatList
          data={filteredCollections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="receipt-outline"
                size={42}
                color="#A0AAA4"
              />
              <Text style={styles.emptyTitle}>
                No Collections Found
              </Text>
              <Text style={styles.emptySubtitle}>
                Try searching with another customer or village.
              </Text>
            </View>
          }
        />

        {/* Bottom Total */}
        <View style={styles.bottomSummary}>
          <View>
            <Text style={styles.bottomLabel}>
              Total Amount Collected
            </Text>
            <Text style={styles.bottomAmount}>
              {formatAmount(totalCollection)}
            </Text>
          </View>

          <View style={styles.successIcon}>
            <Ionicons
              name="checkmark-circle"
              size={30}
              color={GREEN}
            />
          </View>
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

  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 18,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 11,
    color: "#E5F8EC",
    marginTop: 3,
  },

  headerIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 16,
    borderRadius: 16,
    elevation: 2,
  },

  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryLabel: {
    fontSize: 12,
    color: "#89958D",
    fontWeight: "500",
  },

  totalAmount: {
    fontSize: 27,
    fontWeight: "800",
    color: DARK_GREEN,
    marginTop: 5,
  },

  summaryIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "#EDF1EE",
    marginVertical: 14,
  },

  summaryStats: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: "#34443A",
    fontSize: 14,
    fontWeight: "800",
  },

  statLabel: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
  },

  statSeparator: {
    width: 1,
    height: 30,
    backgroundColor: "#E8EDE9",
  },

  searchContainer: {
    height: 46,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginHorizontal: 15,
    marginTop: 16,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8EDE9",
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 12,
    color: "#34443A",
  },

  listHeader: {
    marginHorizontal: 17,
    marginTop: 20,
    marginBottom: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#26352D",
  },

  countText: {
    fontSize: 11,
    color: "#89958D",
  },

  listContent: {
    paddingHorizontal: 15,
    paddingTop: 7,
    paddingBottom: 15,
    flexGrow: 1,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    marginBottom: 11,
    borderWidth: 1,
    borderColor: "#EDF1EE",
    elevation: 1,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#E5F5EB",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    color: DARK_GREEN,
    fontWeight: "800",
    fontSize: 17,
  },

  customerInfo: {
    marginLeft: 11,
  },

  name: {
    fontWeight: "800",
    fontSize: 14,
    color: "#26352D",
  },

  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 3,
  },

  village: {
    fontSize: 11,
    color: "#89958D",
  },

  right: {
    alignItems: "flex-end",
  },

  amount: {
    fontWeight: "800",
    color: DARK_GREEN,
    fontSize: 17,
  },

  paidLabel: {
    fontSize: 10,
    color: GREEN,
    marginTop: 3,
    fontWeight: "600",
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#EDF1EE",
    marginVertical: 12,
  },

  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  date: {
    fontSize: 11,
    color: "#89958D",
  },

  modeBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    gap: 5,
  },

  cashBadge: {
    backgroundColor: "#E8F7EF",
  },

  upiBadge: {
    backgroundColor: "#EAF3FC",
  },

  modeText: {
    fontSize: 10,
    fontWeight: "700",
  },

  cashText: {
    color: DARK_GREEN,
  },

  upiText: {
    color: "#2875B9",
  },

  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyTitle: {
    color: "#34443A",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 12,
  },

  emptySubtitle: {
    color: "#89958D",
    fontSize: 11,
    marginTop: 5,
    textAlign: "center",
  },

  bottomSummary: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 14,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#E8EDE9",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  bottomLabel: {
    fontSize: 11,
    color: "#89958D",
  },

  bottomAmount: {
    fontSize: 21,
    fontWeight: "800",
    color: DARK_GREEN,
    marginTop: 3,
  },

  successIcon: {
    backgroundColor: "#E8F7EF",
    width: 43,
    height: 43,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
});
