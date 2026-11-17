
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";

const GREEN = "#1FAF5A";
const DARK_GREEN = "#128447";
const BACKGROUND = "#F4F7F5";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function DailyWorkUpdate() {
  const router = useRouter();

  const [village, setVillage] = useState("");
  const [work, setWork] = useState("");
  const [amount, setAmount] = useState("");

  const [location, setLocation] = useState<Coordinates | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);

  const [loadingLocation, setLoadingLocation] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Capture GPS Location
  const getLocation = async () => {
    try {
      setLoadingLocation(true);

      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "Permission Required",
          "Please allow location permission to capture your work location."
        );
        return;
      }

      const servicesEnabled =
        await Location.hasServicesEnabledAsync();

      if (!servicesEnabled) {
        Alert.alert(
          "Location Disabled",
          "Please turn on GPS/location services and try again."
        );
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      Alert.alert("Success", "Location captured successfully.");
    } catch (error) {
      Alert.alert(
        "Location Error",
        "Unable to capture location. Please try again."
      );
    } finally {
      setLoadingLocation(false);
    }
  };

  // Take Meeting Photo
  const takePhoto = async () => {
    try {
      setLoadingCamera(true);

      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Camera Permission",
          "Please allow camera access to take a meeting photo."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        quality: 0.7,
      });

      if (!result.canceled && result.assets.length > 0) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert(
        "Camera Error",
        "Unable to open camera. Please try again."
      );
    } finally {
      setLoadingCamera(false);
    }
  };

  // Start Visit
  const startVisit = () => {
    if (startTime) {
      Alert.alert("Visit Started", `Start time: ${startTime}`);
      return;
    }

    if (endTime) {
      Alert.alert(
        "Invalid Action",
        "This visit has already ended. Start a new report to record another visit."
      );
      return;
    }

    setStartTime(new Date().toLocaleTimeString());
  };

  // End Visit
  const endVisit = () => {
    if (!startTime) {
      Alert.alert(
        "Start Visit First",
        "Please record the start time before ending the visit."
      );
      return;
    }

    if (endTime) {
      Alert.alert("Visit Ended", `End time: ${endTime}`);
      return;
    }

    setEndTime(new Date().toLocaleTimeString());
  };

  // Submit Report
  const submitReport = () => {
    if (!village.trim()) {
      Alert.alert("Required Field", "Please enter village name.");
      return;
    }

    if (!work.trim()) {
      Alert.alert("Required Field", "Please enter work type.");
      return;
    }

    if (
      !amount.trim() ||
      !/^\d+(\.\d{1,2})?$/.test(amount.trim()) ||
      Number(amount) < 0
    ) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid collection amount."
      );
      return;
    }

    if (!startTime) {
      Alert.alert(
        "Start Visit Required",
        "Please record your visit start time."
      );
      return;
    }

    if (!endTime) {
      Alert.alert(
        "End Visit Required",
        "Please record your visit end time."
      );
      return;
    }

    const reportDetails = {
      village: village.trim(),
      work: work.trim(),
      amount: Number(amount),
      latitude: location?.latitude ?? null,
      longitude: location?.longitude ?? null,
      startTime,
      endTime,
      photo,
    };

    Alert.alert(
      "Submit Work Report",
      "Are you sure you want to submit this daily work report?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Submit",
          onPress: () => {
            // Connect your backend API here.
            // Send reportDetails to your server.
            console.log("Daily Work Report:", reportDetails);

            setSubmitting(true);

            setSubmitting(false);

            Alert.alert(
              "Report Ready",
              "Your report has been validated. Connect the backend API to save it permanently."
            );
          },
        },
      ]
    );
  };

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
              Daily Work Update
            </Text>
            <Text style={styles.headerSubtitle}>
              Record your field activities
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.push("/dailyreportlist")}
          >
            <Ionicons
              name="list-outline"
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
            {/* Date */}
            <View style={styles.dateCard}>
              <View style={styles.dateIcon}>
                <Ionicons
                  name="calendar-outline"
                  size={21}
                  color={GREEN}
                />
              </View>

              <View>
                <Text style={styles.dateLabel}>
                  Work Report Date
                </Text>
                <Text style={styles.dateValue}>
                  {new Date().toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </View>

              <View style={styles.todayBadge}>
                <Text style={styles.todayText}>TODAY</Text>
              </View>
            </View>

            {/* Work Details */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="briefcase-outline"
                    size={19}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Work Details
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Enter your daily field activity
                  </Text>
                </View>
              </View>

              <Text style={styles.label}>Village Name *</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color="#89958D"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter village name"
                  placeholderTextColor="#A0AAA4"
                  value={village}
                  onChangeText={setVillage}
                />
              </View>

              <Text style={styles.label}>Work Type *</Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="clipboard-outline"
                  size={18}
                  color="#89958D"
                />
                <TextInput
                  style={styles.input}
                  placeholder="e.g. EMI Collection, Group Meeting"
                  placeholderTextColor="#A0AAA4"
                  value={work}
                  onChangeText={setWork}
                />
              </View>

              <Text style={styles.label}>
                Collection Amount (₹) *
              </Text>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="cash-outline"
                  size={18}
                  color="#89958D"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter collection amount"
                  placeholderTextColor="#A0AAA4"
                  keyboardType="decimal-pad"
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
            </View>

            {/* GPS Location */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="navigate-outline"
                    size={19}
                    color={GREEN}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.sectionTitle}>
                    GPS Location
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Capture your current work location
                  </Text>
                </View>

                {location && (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={GREEN}
                  />
                )}
              </View>

              <TouchableOpacity
                style={styles.outlineButton}
                onPress={getLocation}
                disabled={loadingLocation}
              >
                {loadingLocation ? (
                  <ActivityIndicator color={GREEN} />
                ) : (
                  <Ionicons
                    name="location-outline"
                    size={19}
                    color={GREEN}
                  />
                )}

                <Text style={styles.outlineButtonText}>
                  {loadingLocation
                    ? "Capturing Location..."
                    : location
                    ? "Refresh Location"
                    : "Capture GPS Location"}
                </Text>
              </TouchableOpacity>

              {location ? (
                <View style={styles.locationInfo}>
                  <View style={styles.locationRow}>
                    <Text style={styles.locationLabel}>
                      Latitude
                    </Text>
                    <Text style={styles.locationValue}>
                      {location.latitude.toFixed(6)}
                    </Text>
                  </View>

                  <View style={styles.locationRow}>
                    <Text style={styles.locationLabel}>
                      Longitude
                    </Text>
                    <Text style={styles.locationValue}>
                      {location.longitude.toFixed(6)}
                    </Text>
                  </View>

                  <View style={styles.locationStatus}>
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color={DARK_GREEN}
                    />
                    <Text style={styles.locationStatusText}>
                      Location captured
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.helperText}>
                  Location has not been captured yet.
                </Text>
              )}
            </View>

            {/* Visit Timing */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="time-outline"
                    size={19}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Visit Timing
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Record your visit duration
                  </Text>
                </View>
              </View>

              <View style={styles.timeRow}>
                <TouchableOpacity
                  style={[
                    styles.timeButton,
                    startTime && styles.completedTimeButton,
                  ]}
                  onPress={startVisit}
                  disabled={!!startTime}
                >
                  <Ionicons
                    name="play-circle-outline"
                    size={21}
                    color={startTime ? DARK_GREEN : GREEN}
                  />

                  <Text style={styles.timeButtonTitle}>
                    Start Visit
                  </Text>

                  <Text style={styles.timeButtonValue}>
                    {startTime || "Not started"}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.timeButton,
                    endTime && styles.completedTimeButton,
                  ]}
                  onPress={endVisit}
                  disabled={!startTime || !!endTime}
                >
                  <Ionicons
                    name="stop-circle-outline"
                    size={21}
                    color={endTime ? DARK_GREEN : GREEN}
                  />

                  <Text style={styles.timeButtonTitle}>
                    End Visit
                  </Text>

                  <Text style={styles.timeButtonValue}>
                    {endTime || "Not ended"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Meeting Photo */}
            <View style={styles.sectionCard}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionIcon}>
                  <Ionicons
                    name="camera-outline"
                    size={19}
                    color={GREEN}
                  />
                </View>

                <View>
                  <Text style={styles.sectionTitle}>
                    Photo Evidence
                  </Text>
                  <Text style={styles.sectionSubtitle}>
                    Capture meeting or field activity photo
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.outlineButton}
                onPress={takePhoto}
                disabled={loadingCamera}
              >
                {loadingCamera ? (
                  <ActivityIndicator color={GREEN} />
                ) : (
                  <Ionicons
                    name="camera-outline"
                    size={19}
                    color={GREEN}
                  />
                )}

                <Text style={styles.outlineButtonText}>
                  {loadingCamera
                    ? "Opening Camera..."
                    : photo
                    ? "Take Another Photo"
                    : "Take Meeting Photo"}
                </Text>
              </TouchableOpacity>

              {photo && (
                <View style={styles.photoContainer}>
                  <Image
                    source={{ uri: photo }}
                    style={styles.photo}
                  />

                  <TouchableOpacity
                    style={styles.removePhoto}
                    onPress={() => setPhoto(null)}
                  >
                    <Ionicons
                      name="trash-outline"
                      size={17}
                      color="#FFFFFF"
                    />
                  </TouchableOpacity>

                  <View style={styles.photoCaption}>
                    <Ionicons
                      name="checkmark-circle"
                      size={14}
                      color={GREEN}
                    />
                    <Text style={styles.photoCaptionText}>
                      Photo attached
                    </Text>
                  </View>
                </View>
              )}
            </View>

            {/* Submit */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                submitting && styles.disabledButton,
              ]}
              onPress={submitReport}
              disabled={submitting}
              activeOpacity={0.85}
            >
              <Ionicons
                name="cloud-upload-outline"
                size={21}
                color="#FFFFFF"
              />

              <Text style={styles.submitButtonText}>
                Submit Work Report
              </Text>
            </TouchableOpacity>

            <Text style={styles.footerNote}>
              Please verify all work details before submitting.
            </Text>
          </ScrollView>
        </KeyboardAvoidingView>
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

  headerButton: {
    width: 39,
    height: 39,
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
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
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
    paddingBottom: 30,
  },

  dateCard: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    elevation: 1,
  },

  dateIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },

  dateLabel: {
    color: "#89958D",
    fontSize: 10,
  },

  dateValue: {
    color: "#26352D",
    fontSize: 14,
    fontWeight: "800",
    marginTop: 4,
  },

  todayBadge: {
    marginLeft: "auto",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 7,
  },

  todayText: {
    color: DARK_GREEN,
    fontSize: 9,
    fontWeight: "800",
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    padding: 16,
    marginBottom: 14,
    elevation: 1,
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  sectionIcon: {
    width: 39,
    height: 39,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
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
    marginBottom: 7,
  },

  inputWrapper: {
    height: 47,
    borderWidth: 1,
    borderColor: "#E5ECE7",
    backgroundColor: "#FAFCFA",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 9,
    fontSize: 12,
    color: "#26352D",
    paddingVertical: 0,
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: "#B8E4C7",
    borderRadius: 10,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    backgroundColor: "#F5FBF7",
  },

  outlineButtonText: {
    color: DARK_GREEN,
    fontSize: 12,
    fontWeight: "700",
  },

  helperText: {
    color: "#929D95",
    fontSize: 10,
    marginTop: 10,
  },

  locationInfo: {
    backgroundColor: "#F3F9F5",
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
  },

  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  locationLabel: {
    color: "#89958D",
    fontSize: 11,
  },

  locationValue: {
    color: "#34443A",
    fontSize: 11,
    fontWeight: "700",
  },

  locationStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 4,
  },

  locationStatusText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "700",
  },

  timeRow: {
    flexDirection: "row",
    gap: 10,
  },

  timeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#DDEBE1",
    backgroundColor: "#F7FAF8",
    alignItems: "center",
  },

  completedTimeButton: {
    backgroundColor: "#E8F7EF",
    borderColor: "#B8E4C7",
  },

  timeButtonTitle: {
    color: "#34443A",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 7,
  },

  timeButtonValue: {
    color: "#89958D",
    fontSize: 10,
    marginTop: 4,
    textAlign: "center",
  },

  photoContainer: {
    marginTop: 13,
  },

  photo: {
    width: "100%",
    height: 190,
    borderRadius: 11,
    resizeMode: "cover",
  },

  removePhoto: {
    position: "absolute",
    top: 9,
    right: 9,
    width: 33,
    height: 33,
    borderRadius: 10,
    backgroundColor: "#D94B43",
    justifyContent: "center",
    alignItems: "center",
  },

  photoCaption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 8,
  },

  photoCaptionText: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: "700",
  },

  submitButton: {
    backgroundColor: GREEN,
    height: 52,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 9,
    elevation: 2,
    marginTop: 3,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  disabledButton: {
    opacity: 0.6,
  },

  footerNote: {
    textAlign: "center",
    color: "#89958D",
    fontSize: 10,
    marginTop: 12,
  },
});
