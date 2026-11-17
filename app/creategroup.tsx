
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

type Member = {
  id: string;
  name: string;
  mobile: string;
};

const meetingDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function CreateGroup() {
  const router = useRouter();

  const [groupName, setGroupName] = useState("");
  const [village, setVillage] = useState("");
  const [meetingDay, setMeetingDay] = useState("");

  const [memberName, setMemberName] = useState("");
  const [memberMobile, setMemberMobile] = useState("");

  const [members, setMembers] = useState<Member[]>([]);

  // Add Member
  const addMember = () => {
    const name = memberName.trim();
    const mobile = memberMobile.trim();

    if (!name || !mobile) {
      Alert.alert(
        "Required Fields",
        "Please enter member name and mobile number."
      );
      return;
    }

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      Alert.alert(
        "Invalid Mobile Number",
        "Please enter a valid 10-digit Indian mobile number."
      );
      return;
    }

    const duplicate = members.some(
      (item) => item.mobile === mobile
    );

    if (duplicate) {
      Alert.alert(
        "Duplicate Member",
        "This mobile number has already been added."
      );
      return;
    }

    const newMember: Member = {
      id: Date.now().toString(),
      name,
      mobile,
    };

    setMembers((previous) => [...previous, newMember]);

    setMemberName("");
    setMemberMobile("");
  };

  // Remove Member
  const removeMember = (id: string) => {
    Alert.alert(
      "Remove Member",
      "Are you sure you want to remove this member?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          style: "destructive",
          onPress: () => {
            setMembers((previous) =>
              previous.filter((item) => item.id !== id)
            );
          },
        },
      ]
    );
  };

  // Create Group
  const handleCreate = () => {
    if (!groupName.trim()) {
      Alert.alert("Required Field", "Please enter group name.");
      return;
    }

    if (!village.trim()) {
      Alert.alert("Required Field", "Please enter village name.");
      return;
    }

    if (!meetingDay) {
      Alert.alert(
        "Required Field",
        "Please select weekly meeting day."
      );
      return;
    }

    if (members.length === 0) {
      Alert.alert(
        "No Members",
        "Please add at least one group member."
      );
      return;
    }

    const groupDetails = {
      groupName: groupName.trim(),
      village: village.trim(),
      meetingDay,
      members,
    };

    Alert.alert(
      "Confirm Group",
      `Group: ${groupDetails.groupName}\nVillage: ${groupDetails.village}\nMeeting: ${meetingDay}\nMembers: ${members.length}\n\nCreate this group?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Create",
          onPress: () => {
            // Connect your create group API here.
            console.log("Group Details:", groupDetails);

            Alert.alert(
              "Group Validated",
              "Group details are ready. Connect your backend API to save the group."
            );
          },
        },
      ]
    );
  };

  // Member Card
  const renderMember = ({ item, index }: { item: Member; index: number }) => (
    <View style={styles.memberCard}>
      <View style={styles.memberAvatar}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>
          {item.name}
        </Text>
        <Text style={styles.memberMobile}>
          {item.mobile}
        </Text>
      </View>

      <View style={styles.memberNumber}>
        <Text style={styles.memberNumberText}>
          {index + 1}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeMember(item.id)}
      >
        <Ionicons
          name="trash-outline"
          size={18}
          color="#D65B52"
        />
      </TouchableOpacity>
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
            style={styles.headerButton}
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
              Create Group
            </Text>
            <Text style={styles.headerSubtitle}>
              Register a new SHG group
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push("/viewgrouplist")}
          >
            <Ionicons
              name="people-outline"
              size={23}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardView}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.scrollContent}
          >
            {/* Group Summary */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryIcon}>
                <Ionicons
                  name="people"
                  size={24}
                  color={GREEN}
                />
              </View>

              <View style={styles.summaryInfo}>
                <Text style={styles.summaryTitle}>
                  New Group Registration
                </Text>
                <Text style={styles.summarySubtitle}>
                  Add group details and members
                </Text>
              </View>

              <View style={styles.memberCountBadge}>
                <Text style={styles.memberCount}>
                  {members.length}
                </Text>
                <Text style={styles.memberCountLabel}>
                  Members
                </Text>
              </View>
            </View>

            {/* Group Details */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="business-outline"
                    size={20}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Group Details
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Enter basic group information
                  </Text>
                </View>
              </View>

              <Text style={styles.label}>Group Name *</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="people-outline"
                  size={18}
                  color={GREEN}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter group name"
                  placeholderTextColor="#A0AAA4"
                  value={groupName}
                  onChangeText={setGroupName}
                />
              </View>

              <Text style={styles.label}>Village *</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={GREEN}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter village name"
                  placeholderTextColor="#A0AAA4"
                  value={village}
                  onChangeText={setVillage}
                />
              </View>

              <Text style={styles.label}>
                Weekly Meeting Day *
              </Text>

              <View style={styles.dayGrid}>
                {meetingDays.map((day) => {
                  const selected = meetingDay === day;

                  return (
                    <TouchableOpacity
                      key={day}
                      style={[
                        styles.dayButton,
                        selected && styles.selectedDayButton,
                      ]}
                      onPress={() => setMeetingDay(day)}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={[
                          styles.dayText,
                          selected && styles.selectedDayText,
                        ]}
                      >
                        {day.slice(0, 3)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Add Member */}
            <View style={styles.card}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="person-add-outline"
                    size={20}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Add Group Member
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Enter member contact information
                  </Text>
                </View>
              </View>

              <Text style={styles.label}>Member Name *</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={GREEN}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter member name"
                  placeholderTextColor="#A0AAA4"
                  value={memberName}
                  onChangeText={setMemberName}
                />
              </View>

              <Text style={styles.label}>Mobile Number *</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={GREEN}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter 10-digit mobile number"
                  placeholderTextColor="#A0AAA4"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={memberMobile}
                  onChangeText={setMemberMobile}
                />
              </View>

              <TouchableOpacity
                style={styles.addButton}
                onPress={addMember}
                activeOpacity={0.85}
              >
                <Ionicons
                  name="add-circle-outline"
                  size={21}
                  color="#FFFFFF"
                />
                <Text style={styles.addButtonText}>
                  Add Member
                </Text>
              </TouchableOpacity>
            </View>

            {/* Members List */}
            <View style={styles.card}>
              <View style={styles.memberListHeader}>
                <View>
                  <Text style={styles.sectionTitle}>
                    Group Members
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    {members.length} member
                    {members.length !== 1 ? "s" : ""} added
                  </Text>
                </View>

                <View style={styles.totalBadge}>
                  <Ionicons
                    name="people-outline"
                    size={15}
                    color={DARK_GREEN}
                  />
                  <Text style={styles.totalBadgeText}>
                    {members.length}
                  </Text>
                </View>
              </View>

              {members.length > 0 ? (
                <FlatList
                  data={members}
                  keyExtractor={(item) => item.id}
                  renderItem={renderMember}
                  scrollEnabled={false}
                />
              ) : (
                <View style={styles.emptyMembers}>
                  <View style={styles.emptyIcon}>
                    <Ionicons
                      name="people-outline"
                      size={28}
                      color="#9AA69E"
                    />
                  </View>
                  <Text style={styles.emptyTitle}>
                    No Members Added
                  </Text>
                  <Text style={styles.emptySubtitle}>
                    Add members using the form above.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Bottom Create Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreate}
            activeOpacity={0.85}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={21}
              color="#FFFFFF"
            />
            <Text style={styles.createButtonText}>
              Create Group
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
    paddingHorizontal: 17,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  headerButton: {
    width: 39,
    height: 39,
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
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "800",
  },

  headerSubtitle: {
    color: "#E5F8EC",
    fontSize: 10,
    marginTop: 3,
  },

  keyboardView: {
    flex: 1,
  },

  scrollContent: {
    padding: 15,
    paddingBottom: 25,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    elevation: 2,
  },

  summaryIcon: {
    width: 43,
    height: 43,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },

  summaryInfo: {
    flex: 1,
    marginLeft: 11,
  },

  summaryTitle: {
    color: "#26352D",
    fontSize: 12,
    fontWeight: "800",
  },

  summarySubtitle: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
  },

  memberCountBadge: {
    alignItems: "center",
    backgroundColor: "#F0F8F2",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 10,
  },

  memberCount: {
    color: DARK_GREEN,
    fontSize: 17,
    fontWeight: "800",
  },

  memberCountLabel: {
    color: "#78877D",
    fontSize: 8,
    marginTop: 2,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 15,
    marginBottom: 14,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  sectionIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  sectionTitle: {
    color: "#26352D",
    fontSize: 14,
    fontWeight: "800",
  },

  sectionSubtitle: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 3,
  },

  label: {
    color: "#435148",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
  },

  inputWrapper: {
    height: 48,
    borderWidth: 1,
    borderColor: "#E5ECE7",
    backgroundColor: "#FAFCFA",
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 13,
    marginBottom: 16,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: "#26352D",
    fontSize: 12,
    paddingVertical: 0,
  },

  dayGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 5,
  },

  dayButton: {
    minWidth: "22%",
    paddingVertical: 10,
    paddingHorizontal: 7,
    borderRadius: 9,
    backgroundColor: "#F4F7F5",
    borderWidth: 1,
    borderColor: "#E5ECE7",
    alignItems: "center",
  },

  selectedDayButton: {
    backgroundColor: GREEN,
    borderColor: GREEN,
  },

  dayText: {
    color: "#68766D",
    fontSize: 11,
    fontWeight: "700",
  },

  selectedDayText: {
    color: "#FFFFFF",
  },

  addButton: {
    backgroundColor: GREEN,
    height: 47,
    borderRadius: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 2,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
  },

  memberListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  totalBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 5,
  },

  totalBadgeText: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "800",
  },

  memberCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F7FAF8",
    padding: 11,
    borderRadius: 11,
    marginBottom: 9,
    borderWidth: 1,
    borderColor: "#EDF1EE",
  },

  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#E3F4E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    color: DARK_GREEN,
    fontSize: 16,
    fontWeight: "800",
  },

  memberInfo: {
    flex: 1,
  },

  memberName: {
    color: "#26352D",
    fontSize: 12,
    fontWeight: "800",
  },

  memberMobile: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
  },

  memberNumber: {
    width: 24,
    height: 24,
    borderRadius: 8,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },

  memberNumberText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "800",
  },

  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#FCEFED",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyMembers: {
    alignItems: "center",
    paddingVertical: 23,
  },

  emptyIcon: {
    width: 57,
    height: 57,
    borderRadius: 18,
    backgroundColor: "#F0F4F1",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyTitle: {
    color: "#435148",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 10,
  },

  emptySubtitle: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
  },

  bottomBar: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderColor: "#E8EDE9",
  },

  createButton: {
    backgroundColor: GREEN,
    height: 51,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    elevation: 2,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
});
