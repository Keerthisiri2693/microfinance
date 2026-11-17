
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ViewWorkDailyReport() {
  const router = useRouter();

  const report = {
    date: "10 Mar 2026",
    officer: "Ramesh Kumar",
    village: "Tiruvallur",
    work: "EMI Collection",
    amount: "₹2,500",
    start: "10:30 AM",
    end: "11:15 AM",
    lat: "13.1435",
    lng: "79.9087",
    photo: "https://picsum.photos/400",
  };

  const openLocation = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${report.lat},${report.lng}`;

    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Error", "Unable to open the map.");
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
            <Text style={styles.title}>Work Report</Text>
            <Text style={styles.headerSubtitle}>
              Daily field activity details
            </Text>
          </View>

          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Officer Profile */}
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {report.officer.charAt(0)}
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.officerName}>{report.officer}</Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color="#777777"
                />
                <Text style={styles.profileLocation}>
                  {report.village}
                </Text>
              </View>

              <View style={styles.dateBadge}>
                <Ionicons
                  name="calendar-outline"
                  size={12}
                  color="#128447"
                />
                <Text style={styles.dateText}>{report.date}</Text>
              </View>
            </View>

            <View style={styles.completedBadge}>
              <Ionicons
                name="checkmark-circle"
                size={14}
                color="#1FAF5A"
              />
              <Text style={styles.completedText}>Submitted</Text>
            </View>
          </View>

          {/* Collection Highlight */}
          <View style={styles.collectionCard}>
            <View style={styles.collectionIcon}>
              <Ionicons
                name="wallet-outline"
                size={24}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.collectionInfo}>
              <Text style={styles.collectionLabel}>
                Total Collection
              </Text>
              <Text style={styles.collectionAmount}>
                {report.amount}
              </Text>
            </View>

            <Ionicons
              name="trending-up-outline"
              size={26}
              color="#FFFFFF"
            />
          </View>

          {/* Work Details */}
          <View style={styles.card}>
            <SectionHeader
              icon="briefcase-outline"
              title="Work Details"
            />

            <InfoRow
              label="Village"
              value={report.village}
              icon="location-outline"
            />

            <InfoRow
              label="Work Type"
              value={report.work}
              icon="clipboard-outline"
            />

            <InfoRow
              label="Collection Amount"
              value={report.amount}
              icon="cash-outline"
              highlight
            />
          </View>

          {/* Visit Time */}
          <View style={styles.card}>
            <SectionHeader
              icon="time-outline"
              title="Visit Time"
            />

            <View style={styles.timeContainer}>
              <View style={styles.timeItem}>
                <View style={styles.timeIcon}>
                  <Ionicons
                    name="log-in-outline"
                    size={21}
                    color="#1FAF5A"
                  />
                </View>

                <View>
                  <Text style={styles.timeLabel}>Start Time</Text>
                  <Text style={styles.timeValue}>{report.start}</Text>
                </View>
              </View>

              <View style={styles.timeDivider} />

              <View style={styles.timeItem}>
                <View style={[styles.timeIcon, styles.endTimeIcon]}>
                  <Ionicons
                    name="log-out-outline"
                    size={21}
                    color="#E69500"
                  />
                </View>

                <View>
                  <Text style={styles.timeLabel}>End Time</Text>
                  <Text style={styles.timeValue}>{report.end}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* GPS Location */}
          <View style={styles.card}>
            <SectionHeader
              icon="navigate-outline"
              title="GPS Location"
            />

            <View style={styles.coordinatesBox}>
              <View style={styles.coordinateRow}>
                <Text style={styles.coordinateLabel}>Latitude</Text>
                <Text style={styles.coordinateValue}>{report.lat}</Text>
              </View>

              <View style={styles.coordinateDivider} />

              <View style={styles.coordinateRow}>
                <Text style={styles.coordinateLabel}>Longitude</Text>
                <Text style={styles.coordinateValue}>{report.lng}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.mapButton}
              activeOpacity={0.8}
              onPress={openLocation}
            >
              <Ionicons
                name="map-outline"
                size={19}
                color="#FFFFFF"
              />
              <Text style={styles.mapButtonText}>
                View Location on Map
              </Text>
              <Ionicons
                name="open-outline"
                size={16}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          {/* Meeting Photo */}
          <View style={styles.card}>
            <SectionHeader
              icon="camera-outline"
              title="Meeting Photo"
            />

            <Image
              source={{ uri: report.photo }}
              style={styles.photo}
              resizeMode="cover"
            />

            <View style={styles.photoFooter}>
              <Ionicons
                name="image-outline"
                size={15}
                color="#888888"
              />
              <Text style={styles.photoCaption}>
                Field visit evidence
              </Text>
            </View>
          </View>

          <Text style={styles.footerText}>
            Micro Finance Management • Daily Work Report
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

type SectionHeaderProps = {
  icon: React.ComponentProps<typeof Ionicons>["name"];
  title: string;
};

function SectionHeader({ icon, title }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIcon}>
        <Ionicons name={icon} size={19} color="#1FAF5A" />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

type InfoRowProps = {
  label: string;
  value: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
  highlight?: boolean;
};

function InfoRow({ label, value, icon, highlight }: InfoRowProps) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons name={icon} size={17} color="#8A968E" />
        <Text style={styles.infoLabel}>{label}</Text>
      </View>

      <Text
        style={[
          styles.infoValue,
          highlight && styles.highlightValue,
        ]}
      >
        {value}
      </Text>
    </View>
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
    padding: 15,
    paddingBottom: 30,
  },
  profileCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#128447",
    fontSize: 22,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  officerName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#26352D",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  profileLocation: {
    color: "#777777",
    fontSize: 11,
    marginLeft: 3,
  },
  dateBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#E8F7EF",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 7,
    gap: 4,
  },
  dateText: {
    color: "#128447",
    fontSize: 10,
    fontWeight: "600",
  },
  completedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F7EF",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 15,
    gap: 3,
  },
  completedText: {
    color: "#128447",
    fontSize: 9,
    fontWeight: "700",
  },
  collectionCard: {
    backgroundColor: "#128447",
    borderRadius: 15,
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  collectionIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: "#FFFFFF25",
    alignItems: "center",
    justifyContent: "center",
  },
  collectionInfo: {
    flex: 1,
    marginLeft: 12,
  },
  collectionLabel: {
    color: "#DDF5E6",
    fontSize: 12,
  },
  collectionAmount: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "bold",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 14,
    marginBottom: 13,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.035,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    gap: 9,
  },
  sectionIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#E8F7EF",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#26352D",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F3F1",
  },
  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoLabel: {
    color: "#7C8780",
    fontSize: 12,
  },
  infoValue: {
    color: "#26352D",
    fontSize: 13,
    fontWeight: "600",
  },
  highlightValue: {
    color: "#128447",
    fontWeight: "bold",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },
  timeIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#E8F7EF",
    justifyContent: "center",
    alignItems: "center",
  },
  endTimeIcon: {
    backgroundColor: "#FFF4E5",
  },
  timeDivider: {
    width: 1,
    height: 38,
    backgroundColor: "#E9EFEB",
    marginHorizontal: 10,
  },
  timeLabel: {
    color: "#888888",
    fontSize: 10,
  },
  timeValue: {
    color: "#26352D",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 4,
  },
  coordinatesBox: {
    backgroundColor: "#F7FAF8",
    borderRadius: 11,
    paddingHorizontal: 12,
  },
  coordinateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  coordinateDivider: {
    height: 1,
    backgroundColor: "#E9EFEB",
  },
  coordinateLabel: {
    color: "#888888",
    fontSize: 12,
  },
  coordinateValue: {
    color: "#26352D",
    fontSize: 13,
    fontWeight: "600",
  },
  mapButton: {
    backgroundColor: "#1FAF5A",
    padding: 13,
    borderRadius: 10,
    marginTop: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },
  mapButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 13,
  },
  photo: {
    width: "100%",
    height: 210,
    borderRadius: 11,
    backgroundColor: "#E9EFEB",
  },
  photoFooter: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
    gap: 5,
  },
  photoCaption: {
    color: "#888888",
    fontSize: 11,
  },
  footerText: {
    textAlign: "center",
    color: "#A0AAA4",
    fontSize: 10,
    marginTop: 8,
  },
});
