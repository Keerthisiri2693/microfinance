
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

export default function ManagerEditProfile() {
  const router = useRouter();

  const [name, setName] = useState("Ramesh Kumar");
  const [mobile, setMobile] = useState("9876543210");
  const [branch, setBranch] = useState("Tiruvallur");
  const [email, setEmail] = useState("manager@rmfl.com");
  const [photo, setPhoto] = useState<string | null>(null);

  const pickImage = async () => {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={23} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.title}>Edit Profile</Text>
            <Text style={styles.headerSubtitle}>
              Update your personal information
            </Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Profile Photo */}
            <View style={styles.profileCard}>
              <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.8}
                style={styles.photoWrapper}
              >
                {photo ? (
                  <Image source={{ uri: photo }} style={styles.photo} />
                ) : (
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>
                      {name.trim().charAt(0).toUpperCase() || "M"}
                    </Text>
                  </View>
                )}

                <View style={styles.cameraIcon}>
                  <Ionicons name="camera" size={16} color="#FFFFFF" />
                </View>
              </TouchableOpacity>

              <Text style={styles.profileName}>{name || "Manager Name"}</Text>
              <Text style={styles.profileRole}>Branch Manager</Text>

              <TouchableOpacity onPress={pickImage}>
                <Text style={styles.change}>Change Profile Photo</Text>
              </TouchableOpacity>
            </View>

            {/* Personal Information */}
            <View style={styles.formCard}>
              <View style={styles.sectionHeader}>
                <Ionicons
                  name="person-circle-outline"
                  size={21}
                  color="#1FAF5A"
                />
                <Text style={styles.sectionTitle}>
                  Personal Information
                </Text>
              </View>

              <InputField
                label="Manager Name"
                icon="person-outline"
                value={name}
                onChangeText={setName}
                placeholder="Enter manager name"
              />

              <InputField
                label="Mobile Number"
                icon="call-outline"
                value={mobile}
                onChangeText={setMobile}
                placeholder="Enter mobile number"
                keyboardType="phone-pad"
                maxLength={10}
              />

              <InputField
                label="Email Address"
                icon="mail-outline"
                value={email}
                onChangeText={setEmail}
                placeholder="Enter email address"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <InputField
                label="Branch"
                icon="location-outline"
                value={branch}
                onChangeText={setBranch}
                placeholder="Enter branch name"
              />
            </View>

            {/* Save Button */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={() => {
                // Connect your update profile API here.
              }}
            >
              <Ionicons
                name="checkmark-circle-outline"
                size={21}
                color="#FFFFFF"
              />
              <Text style={styles.buttonText}>Save Changes</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Make sure your contact details are correct.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

type InputFieldProps = {
  label: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  keyboardType?: "default" | "phone-pad" | "email-address";
  maxLength?: number;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
};

function InputField({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  maxLength,
  autoCapitalize,
}: InputFieldProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>

      <View style={styles.inputWrapper}>
        <Ionicons name={icon} size={19} color="#1FAF5A" />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#A0AAA4"
          keyboardType={keyboardType}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#1FAF5A",
  },
  flex: {
    flex: 1,
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
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  headerTextContainer: {
    flex: 1,
    alignItems: "center",
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
  headerPlaceholder: {
    width: 38,
  },
  body: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 22,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  photoWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#1FAF5A",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  photo: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  cameraIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 29,
    height: 29,
    borderRadius: 15,
    backgroundColor: "#128447",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#26352D",
    marginTop: 3,
  },
  profileRole: {
    fontSize: 12,
    color: "#888888",
    marginTop: 3,
  },
  change: {
    color: "#128447",
    marginTop: 10,
    fontSize: 13,
    fontWeight: "600",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#26352D",
  },
  inputGroup: {
    marginBottom: 17,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#48554D",
    marginBottom: 7,
  },
  inputWrapper: {
    minHeight: 49,
    backgroundColor: "#F8FAF9",
    borderWidth: 1,
    borderColor: "#E4EBE6",
    borderRadius: 11,
    paddingHorizontal: 13,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: {
    flex: 1,
    color: "#26352D",
    fontSize: 14,
    paddingVertical: 11,
  },
  button: {
    backgroundColor: "#1FAF5A",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 9,
    marginTop: 20,
    elevation: 2,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  footerText: {
    color: "#929B95",
    textAlign: "center",
    fontSize: 11,
    marginTop: 13,
  },
});
