import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function AddNotification() {
  const router = useRouter();

  const [sendType, setSendType] = useState("all");
  const [selectedOfficer, setSelectedOfficer] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const officers = [
    { id: 1, name: "Ravi Kumar" },
    { id: 2, name: "Suresh" },
    { id: 3, name: "Lakshmi" },
    { id: 4, name: "Meena" },
  ];

  const sendInstruction = () => {
    const notification = {
      title,
      message,
      sendType,
      officer: selectedOfficer,
      time: "Just now",
    };

    console.log("Notification Sent:", notification);

    // Later send to backend
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <StatusBar
        backgroundColor="#1FAF5A"
        barStyle="light-content"
        translucent={false}
      />

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title}>Send Instruction</Text>

          <View style={{ width: 24 }} />
        </View>

        <View style={styles.body}>
          {/* SEND TYPE */}
          <Text style={styles.label}>Send To</Text>

          <View style={styles.typeContainer}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                sendType === "all" && styles.activeButton,
              ]}
              onPress={() => setSendType("all")}
            >
              <Text
                style={[
                  styles.typeText,
                  sendType === "all" && styles.activeTypeText,
                ]}
              >
                All Officers
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.typeButton,
                sendType === "individual" && styles.activeButton,
              ]}
              onPress={() => setSendType("individual")}
            >
              <Text
                style={[
                  styles.typeText,
                  sendType === "individual" && styles.activeTypeText,
                ]}
              >
                Individual
              </Text>
            </TouchableOpacity>
          </View>

          {/* SELECT OFFICER */}
          {sendType === "individual" && (
            <View>
              <Text style={styles.label}>Select Officer</Text>

              <FlatList
                data={officers}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.officerCard,
                      selectedOfficer === item.name &&
                        styles.selectedOfficer,
                    ]}
                    onPress={() => setSelectedOfficer(item.name)}
                  >
                    <Text>{item.name}</Text>

                    {selectedOfficer === item.name && (
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#1FAF5A"
                      />
                    )}
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* TITLE */}
          <Text style={styles.label}>Instruction Title</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter title"
            value={title}
            onChangeText={setTitle}
          />

          {/* MESSAGE */}
          <Text style={styles.label}>Message</Text>

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Enter instruction message"
            multiline
            textAlignVertical="top"
            value={message}
            onChangeText={setMessage}
          />

          {/* SEND BUTTON */}
          <TouchableOpacity
            style={styles.sendButton}
            onPress={sendInstruction}
          >
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.sendText}>Send Instruction</Text>
          </TouchableOpacity>
        </View>
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
    paddingVertical: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  body: {
    padding: 20,
  },

  label: {
    fontWeight: "600",
    fontSize: 14,
    color: "#263238",
    marginBottom: 8,
  },

  typeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },

  typeButton: {
    backgroundColor: "#E8F7EF",
    paddingVertical: 11,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginRight: 10,
  },

  activeButton: {
    backgroundColor: "#1FAF5A",
  },

  typeText: {
    color: "#263238",
    fontWeight: "500",
  },

  activeTypeText: {
    color: "#fff",
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 14,
  },

  messageInput: {
    height: 100,
  },

  officerCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  selectedOfficer: {
    backgroundColor: "#CFF5DD",
    borderWidth: 1,
    borderColor: "#1FAF5A",
  },

  sendButton: {
    backgroundColor: "#1FAF5A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
});