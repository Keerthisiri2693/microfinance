
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

type Member = {
  id: string;
  name: string;
  emi: number;
  paid: boolean;
};

const initialMembers: Member[] = [
  { id: "1", name: "Ramesh", emi: 500, paid: false },
  { id: "2", name: "Lakshmi", emi: 500, paid: false },
  { id: "3", name: "Selvi", emi: 500, paid: false },
  { id: "4", name: "Radha", emi: 500, paid: false },
];

const formatAmount = (amount: number) =>
  `₹${amount.toLocaleString("en-IN")}`;

export default function CollectGroupEMI() {
  const [members, setMembers] = useState(initialMembers);
  const [search, setSearch] = useState("");

  const totalMembers = members.length;

  const paidMembers = members.filter((m) => m.paid).length;
  const pendingMembers = totalMembers - paidMembers;

  const totalExpected = members.reduce(
    (sum, m) => sum + m.emi,
    0
  );

  const totalCollection = members
    .filter((m) => m.paid)
    .reduce((sum, m) => sum + m.emi, 0);

  const pendingAmount = totalExpected - totalCollection;

  const progress =
    totalExpected > 0
      ? (totalCollection / totalExpected) * 100
      : 0;

  const filteredMembers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return members;

    return members.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
  }, [members, search]);

  // Toggle individual collection status
  const togglePaid = (id: string) => {
    setMembers((previous) =>
      previous.map((member) =>
        member.id === id
          ? { ...member, paid: !member.paid }
          : member
      )
    );
  };

  // Save Collection
  const saveCollection = () => {
    if (paidMembers === 0) {
      Alert.alert(
        "No Collection",
        "Please collect EMI from at least one member."
      );
      return;
    }

    const collectionDetails = {
      groupName: "Lakshmi SHG",
      totalMembers,
      paidMembers,
      pendingMembers,
      totalCollection,
      pendingAmount,
      collections: members
        .filter((member) => member.paid)
        .map((member) => ({
          memberId: member.id,
          memberName: member.name,
          amount: member.emi,
        })),
    };

    Alert.alert(
      "Confirm Collection",
      `Collected: ${formatAmount(totalCollection)}\nPaid Members: ${paidMembers}\nPending Members: ${pendingMembers}\n\nSave this collection?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: () => {
            // Connect your group EMI collection API here.
            console.log("Group Collection:", collectionDetails);

            Alert.alert(
              "Collection Validated",
              "Collection details are ready. Connect your backend API to save them permanently."
            );
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Member }) => (
    <View
      style={[
        styles.memberCard,
        item.paid && styles.paidMemberCard,
      ]}
    >
      <View style={styles.memberLeft}>
        <View
          style={[
            styles.avatar,
            item.paid && styles.paidAvatar,
          ]}
        >
          <Text
            style={[
              styles.avatarText,
              item.paid && styles.paidAvatarText,
            ]}
          >
            {item.name.charAt(0).toUpperCase()}
          </Text>
        </View>

        <View style={styles.memberInfo}>
          <Text style={styles.memberName}>
            {item.name}
          </Text>

          <Text style={styles.memberEmi}>
            Weekly EMI: {formatAmount(item.emi)}
          </Text>

          <View
            style={[
              styles.statusBadge,
              item.paid
                ? styles.paidBadge
                : styles.pendingBadge,
            ]}
          >
            <View
              style={[
                styles.statusDot,
                item.paid
                  ? styles.paidDot
                  : styles.pendingDot,
              ]}
            />

            <Text
              style={[
                styles.statusText,
                item.paid
                  ? styles.paidStatusText
                  : styles.pendingStatusText,
              ]}
            >
              {item.paid ? "Paid" : "Pending"}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.memberRight}>
        <Text style={styles.memberAmount}>
          {formatAmount(item.emi)}
        </Text>

        <TouchableOpacity
          style={[
            styles.collectButton,
            item.paid && styles.undoButton,
          ]}
          onPress={() => togglePaid(item.id)}
          activeOpacity={0.8}
        >
          <Ionicons
            name={
              item.paid
                ? "checkmark-circle-outline"
                : "cash-outline"
            }
            size={16}
            color={item.paid ? DARK_GREEN : "#FFFFFF"}
          />

          <Text
            style={[
              styles.collectButtonText,
              item.paid && styles.undoButtonText,
            ]}
          >
            {item.paid ? "Undo" : "Collect"}
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
          >
            <Ionicons
              name="arrow-back"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <View style={styles.headerInfo}>
            <Text style={styles.headerTitle}>
              Group EMI Collection
            </Text>
            <Text style={styles.headerSubtitle}>
              Lakshmi SHG · Weekly Collection
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons
              name="people-outline"
              size={22}
              color="#FFFFFF"
            />
          </View>
        </View>

        {/* Main Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>
            Total Collection
          </Text>

          <Text style={styles.totalAmount}>
            {formatAmount(totalCollection)}
          </Text>

          <View style={styles.progressInfo}>
            <Text style={styles.progressLabel}>
              Collection Progress
            </Text>

            <Text style={styles.progressPercentage}>
              {progress.toFixed(0)}%
            </Text>
          </View>

          <View style={styles.progressBackground}>
            <View
              style={[
                styles.progressFill,
                { width: `${progress}%` },
              ]}
            />
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>
                {totalMembers}
              </Text>
              <Text style={styles.statLabel}>
                Total Members
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.paidValue}>
                {paidMembers}
              </Text>
              <Text style={styles.statLabel}>
                Paid
              </Text>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <Text style={styles.pendingValue}>
                {pendingMembers}
              </Text>
              <Text style={styles.statLabel}>
                Pending
              </Text>
            </View>
          </View>
        </View>

        {/* Expected and Pending */}
        <View style={styles.amountRow}>
          <View style={styles.amountCard}>
            <View style={styles.amountIcon}>
              <Ionicons
                name="wallet-outline"
                size={18}
                color={GREEN}
              />
            </View>

            <Text style={styles.amountLabel}>
              Expected
            </Text>

            <Text style={styles.expectedAmount}>
              {formatAmount(totalExpected)}
            </Text>
          </View>

          <View style={styles.amountCard}>
            <View style={styles.pendingIcon}>
              <Ionicons
                name="time-outline"
                size={18}
                color="#C1842E"
              />
            </View>

            <Text style={styles.amountLabel}>
              Pending Amount
            </Text>

            <Text style={styles.pendingAmount}>
              {formatAmount(pendingAmount)}
            </Text>
          </View>
        </View>

        {/* Member List Header */}
        <View style={styles.listHeader}>
          <View>
            <Text style={styles.listTitle}>
              Group Members
            </Text>

            <Text style={styles.listSubtitle}>
              Collect weekly EMI from each member
            </Text>
          </View>

          <View style={styles.countBadge}>
            <Text style={styles.countText}>
              {totalMembers}
            </Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search-outline"
            size={19}
            color="#89958D"
          />

          <TextInput
            style={styles.searchInput}
            placeholder="Search member name..."
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

        {/* Members */}
        <FlatList
          data={filteredMembers}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons
                name="people-outline"
                size={40}
                color="#A0AAA4"
              />
              <Text style={styles.emptyTitle}>
                No Members Found
              </Text>
              <Text style={styles.emptySubtitle}>
                Try searching with another name.
              </Text>
            </View>
          }
        />

        {/* Bottom Save */}
        <View style={styles.bottomBar}>
          <View style={styles.bottomTotal}>
            <Text style={styles.bottomLabel}>
              Collected Amount
            </Text>
            <Text style={styles.bottomAmount}>
              {formatAmount(totalCollection)}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.saveButton,
              paidMembers === 0 && styles.disabledSaveButton,
            ]}
            onPress={saveCollection}
            activeOpacity={0.85}
          >
            <Ionicons
              name="save-outline"
              size={19}
              color="#FFFFFF"
            />

            <Text style={styles.saveButtonText}>
              Save Collection
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

  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 10,
    marginTop: 3,
  },

  headerIcon: {
    width: 39,
    height: 39,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 15,
    marginTop: 14,
    padding: 16,
    borderRadius: 15,
    elevation: 2,
  },

  summaryLabel: {
    color: "#89958D",
    fontSize: 11,
    fontWeight: "600",
  },

  totalAmount: {
    color: DARK_GREEN,
    fontSize: 27,
    fontWeight: "800",
    marginTop: 5,
  },

  progressInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 7,
  },

  progressLabel: {
    color: "#78877D",
    fontSize: 10,
  },

  progressPercentage: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "800",
  },

  progressBackground: {
    height: 7,
    backgroundColor: "#E2EEE5",
    borderRadius: 10,
    overflow: "hidden",
  },

  progressFill: {
    height: 7,
    backgroundColor: GREEN,
    borderRadius: 10,
  },

  summaryDivider: {
    height: 1,
    backgroundColor: "#EDF1EE",
    marginVertical: 15,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  statItem: {
    flex: 1,
    alignItems: "center",
  },

  statValue: {
    color: "#26352D",
    fontSize: 17,
    fontWeight: "800",
  },

  paidValue: {
    color: DARK_GREEN,
    fontSize: 17,
    fontWeight: "800",
  },

  pendingValue: {
    color: "#C1842E",
    fontSize: 17,
    fontWeight: "800",
  },

  statLabel: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 31,
    backgroundColor: "#E8EDE9",
  },

  amountRow: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginTop: 12,
    gap: 10,
  },

  amountCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 13,
    elevation: 1,
  },

  amountIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },

  pendingIcon: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#FFF4E5",
    alignItems: "center",
    justifyContent: "center",
  },

  amountLabel: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 8,
  },

  expectedAmount: {
    color: DARK_GREEN,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4,
  },

  pendingAmount: {
    color: "#C1842E",
    fontSize: 15,
    fontWeight: "800",
    marginTop: 4,
  },

  listHeader: {
    marginHorizontal: 17,
    marginTop: 17,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  listTitle: {
    color: "#26352D",
    fontSize: 15,
    fontWeight: "800",
  },

  listSubtitle: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 3,
  },

  countBadge: {
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 8,
  },

  countText: {
    color: DARK_GREEN,
    fontSize: 11,
    fontWeight: "800",
  },

  searchContainer: {
    height: 43,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 5,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E8EDE9",
  },

  searchInput: {
    flex: 1,
    marginLeft: 9,
    fontSize: 11,
    color: "#26352D",
  },

  listContent: {
    paddingHorizontal: 15,
    paddingTop: 6,
    paddingBottom: 15,
    flexGrow: 1,
  },

  memberCard: {
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 13,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#EDF1EE",
    elevation: 1,
  },

  paidMemberCard: {
    backgroundColor: "#F3FAF5",
    borderColor: "#DDEFE2",
  },

  memberLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },

  paidAvatar: {
    backgroundColor: "#DDF2E4",
  },

  avatarText: {
    color: DARK_GREEN,
    fontSize: 16,
    fontWeight: "800",
  },

  paidAvatarText: {
    color: DARK_GREEN,
  },

  memberInfo: {
    marginLeft: 10,
    flex: 1,
  },

  memberName: {
    color: "#26352D",
    fontSize: 13,
    fontWeight: "800",
  },

  memberEmi: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
  },

  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 6,
    gap: 4,
  },

  paidBadge: {
    backgroundColor: "#E0F4E7",
  },

  pendingBadge: {
    backgroundColor: "#FFF3E2",
  },

  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },

  paidDot: {
    backgroundColor: GREEN,
  },

  pendingDot: {
    backgroundColor: "#D18B32",
  },

  statusText: {
    fontSize: 9,
    fontWeight: "700",
  },

  paidStatusText: {
    color: DARK_GREEN,
  },

  pendingStatusText: {
    color: "#B77A2C",
  },

  memberRight: {
    alignItems: "flex-end",
    marginLeft: 5,
  },

  memberAmount: {
    color: DARK_GREEN,
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 7,
  },

  collectButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: GREEN,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
    gap: 5,
  },

  undoButton: {
    backgroundColor: "#E0F4E7",
  },

  collectButtonText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },

  undoButtonText: {
    color: DARK_GREEN,
  },

  emptyContainer: {
    alignItems: "center",
    paddingVertical: 45,
  },

  emptyTitle: {
    color: "#34443A",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
  },

  emptySubtitle: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 5,
  },

  bottomBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#E8EDE9",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  bottomTotal: {
    flex: 1,
  },

  bottomLabel: {
    color: "#89958D",
    fontSize: 10,
  },

  bottomAmount: {
    color: DARK_GREEN,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 3,
  },

  saveButton: {
    backgroundColor: GREEN,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 11,
    gap: 7,
  },

  disabledSaveButton: {
    opacity: 0.55,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
});
