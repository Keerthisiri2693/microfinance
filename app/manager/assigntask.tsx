import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F5F8F6";

type Priority = "Low" | "Medium" | "High";

export default function AssignTaskScreen() {
  const router = useRouter();

  const [officerId, setOfficerId] = useState("");
  const [officerName, setOfficerName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskType, setTaskType] = useState("Customer Visit");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");

  const taskTypes = [
    "Customer Visit",
    "EMI Collection",
    "Loan Verification",
    "Document Collection",
    "Group Meeting",
    "Follow-up",
    "Other",
  ];

  const validateDate = (value: string) => {
    if (!value.trim()) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value.trim())) return false;

    const [year, month, day] = value.trim().split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  };

  const handleAssignTask = () => {
    const cleanOfficerId = officerId.trim();
    const cleanOfficerName = officerName.trim();
    const cleanTitle = taskTitle.trim();

    if (!cleanOfficerId || !cleanOfficerName || !cleanTitle) {
      Alert.alert(
        "Required fields",
        "Please enter the field officer ID, officer name, and task title."
      );
      return;
    }

    if (!validateDate(dueDate)) {
      Alert.alert(
        "Invalid date",
        "Enter a valid due date in YYYY-MM-DD format."
      );
      return;
    }

    // UI-only mode: no Firebase or API request is made here.
    const taskDetails = {
      officerId: cleanOfficerId,
      officerName: cleanOfficerName,
      title: cleanTitle,
      description: description.trim(),
      taskType,
      priority,
      dueDate: dueDate.trim(),
      status: "Assigned",
    };

    console.log("Task details:", taskDetails);

    Alert.alert(
      "Task details ready",
      "The task form is complete. No data has been saved because backend integration is not configured.",
      [
        {
          text: "OK",
          onPress: () => {
            setOfficerId("");
            setOfficerName("");
            setTaskTitle("");
            setDescription("");
            setTaskType("Customer Visit");
            setDueDate("");
            setPriority("Medium");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar backgroundColor={GREEN} barStyle="light-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            activeOpacity={0.8}
          >
            <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerTextWrap}>
            <Text style={styles.headerTitle}>Assign Task</Text>
            <Text style={styles.headerSubtitle}>
              Allocate work to a field officer
            </Text>
          </View>

          <View style={styles.headerIcon}>
            <Ionicons name="clipboard-outline" size={25} color="#FFFFFF" />
          </View>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons
                name="information-circle-outline"
                size={22}
                color={GREEN}
              />
            </View>
            <Text style={styles.infoText}>
              Enter the field officer and task information below.
            </Text>
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Field Officer Details</Text>
            <Text style={styles.requiredText}>* Required</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Field Officer ID *</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="id-card-outline" size={19} color="#829188" />
              <TextInput
                value={officerId}
                onChangeText={setOfficerId}
                placeholder="Enter officer ID"
                placeholderTextColor="#A0AAA3"
                style={styles.input}
                autoCapitalize="none"
              />
            </View>

            <Text style={styles.label}>Field Officer Name *</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="person-outline" size={19} color="#829188" />
              <TextInput
                value={officerName}
                onChangeText={setOfficerName}
                placeholder="Enter officer name"
                placeholderTextColor="#A0AAA3"
                style={styles.input}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.sectionHeading}>
            <Text style={styles.sectionTitle}>Task Information</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.label}>Task Title *</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="create-outline" size={19} color="#829188" />
              <TextInput
                value={taskTitle}
                onChangeText={setTaskTitle}
                placeholder="Example: Visit customer for EMI"
                placeholderTextColor="#A0AAA3"
                style={styles.input}
              />
            </View>

            <Text style={styles.label}>Task Type</Text>
            <View style={styles.typeGrid}>
              {taskTypes.map((type) => {
                const selected = taskType === type;

                return (
                  <TouchableOpacity
                    key={type}
                    onPress={() => setTaskType(type)}
                    activeOpacity={0.8}
                    style={[
                      styles.typeChip,
                      selected && styles.typeChipSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.typeChipText,
                        selected && styles.typeChipTextSelected,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Task Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Add task instructions or customer details..."
              placeholderTextColor="#A0AAA3"
              style={styles.descriptionInput}
              multiline
              textAlignVertical="top"
            />

            <Text style={styles.label}>Due Date</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="calendar-outline" size={19} color="#829188" />
              <TextInput
                value={dueDate}
                onChangeText={setDueDate}
                placeholder="YYYY-MM-DD (Example: 2026-11-20)"
                placeholderTextColor="#A0AAA3"
                style={styles.input}
                keyboardType="numbers-and-punctuation"
                maxLength={10}
              />
            </View>
            <Text style={styles.helperText}>Use YYYY-MM-DD format.</Text>

            <Text style={styles.label}>Priority</Text>
            <View style={styles.priorityRow}>
              {(["Low", "Medium", "High"] as Priority[]).map((item) => {
                const selected = priority === item;

                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setPriority(item)}
                    activeOpacity={0.8}
                    style={[
                      styles.priorityButton,
                      selected && styles.priorityButtonSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.priorityDot,
                        item === "Low"
                          ? styles.lowDot
                          : item === "Medium"
                          ? styles.mediumDot
                          : styles.highDot,
                      ]}
                    />
                    <Text
                      style={[
                        styles.priorityText,
                        selected && styles.priorityTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAssignTask}
            activeOpacity={0.85}
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={21}
              color="#FFFFFF"
            />
            <Text style={styles.submitText}>Assign Task</Text>
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            Review the officer and task details before submitting.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: GREEN },
  header: {
    backgroundColor: GREEN,
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 22,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.17)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTextWrap: { flex: 1, marginLeft: 13 },
  headerTitle: { color: "#FFFFFF", fontSize: 21, fontWeight: "800" },
  headerSubtitle: { color: "#E3F7EA", fontSize: 12, marginTop: 4 },
  headerIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.17)",
    alignItems: "center",
    justifyContent: "center",
  },
  content: { padding: 18, paddingBottom: 35, backgroundColor: BACKGROUND },
  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF7EE",
    borderRadius: 15,
    padding: 13,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: "#D9EFE0",
  },
  infoIcon: { marginRight: 10 },
  infoText: { flex: 1, color: "#486653", fontSize: 12, lineHeight: 18 },
  sectionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 11,
    marginTop: 3,
  },
  sectionTitle: { color: "#24352A", fontSize: 16, fontWeight: "800" },
  requiredText: { color: "#8B958E", fontSize: 11 },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E8F0EA",
    elevation: 2,
    shadowColor: "#174D2D",
    shadowOpacity: 0.04,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  label: {
    color: "#425148",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 13,
    marginBottom: 8,
  },
  inputWrap: {
    minHeight: 49,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E3EAE5",
    backgroundColor: "#FBFDFC",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: "#24352A",
    fontSize: 13,
    paddingVertical: 11,
    paddingHorizontal: 9,
  },
  typeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  typeChip: {
    borderRadius: 20,
    paddingVertical: 9,
    paddingHorizontal: 12,
    backgroundColor: "#F3F7F4",
    borderWidth: 1,
    borderColor: "#E7EEE9",
  },
  typeChipSelected: { backgroundColor: "#E5F7EC", borderColor: GREEN },
  typeChipText: { color: "#66736A", fontSize: 11, fontWeight: "600" },
  typeChipTextSelected: { color: DARK_GREEN, fontWeight: "800" },
  descriptionInput: {
    minHeight: 105,
    borderWidth: 1,
    borderColor: "#E3EAE5",
    borderRadius: 12,
    backgroundColor: "#FBFDFC",
    padding: 12,
    color: "#24352A",
    fontSize: 13,
  },
  helperText: { color: "#929D95", fontSize: 10, marginTop: 6 },
  priorityRow: { flexDirection: "row", gap: 8 },
  priorityButton: {
    flex: 1,
    minHeight: 43,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E3EAE5",
    backgroundColor: "#FBFDFC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  priorityButtonSelected: { borderColor: GREEN, backgroundColor: "#EAF7EE" },
  priorityDot: { width: 8, height: 8, borderRadius: 4 },
  lowDot: { backgroundColor: "#2E9D67" },
  mediumDot: { backgroundColor: "#E4A12B" },
  highDot: { backgroundColor: "#D9534F" },
  priorityText: { color: "#66736A", fontSize: 12, fontWeight: "600" },
  priorityTextSelected: { color: DARK_GREEN, fontWeight: "800" },
  submitButton: {
    minHeight: 53,
    backgroundColor: GREEN,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    elevation: 3,
    shadowColor: GREEN,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  submitText: { color: "#FFFFFF", fontSize: 15, fontWeight: "800" },
  footerNote: {
    textAlign: "center",
    color: "#929D95",
    fontSize: 11,
    marginTop: 13,
  },
});
