import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export function DashboardScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      return data;
    },
  });

  const projectCount = Array.isArray(projects) ? projects.length : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.full_name || "User"}</Text>
          <Text style={styles.email}>{user?.email}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.stats}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{projectCount}</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.generateButton}
        onPress={() => navigation.navigate("Generate")}
      >
        <Text style={styles.generateButtonText}>🎬 Create New Video</Text>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator color="#6172f3" style={{ marginTop: 20 }} />
      ) : (
        <View style={styles.projectList}>
          <Text style={styles.sectionTitle}>Recent Projects</Text>
          {Array.isArray(projects) && projects.length > 0 ? (
            projects.slice(0, 5).map((project: any) => (
              <TouchableOpacity
                key={project.id}
                style={styles.projectCard}
                onPress={() =>
                  navigation.navigate("ProjectDetail", { projectId: project.id })
                }
              >
                <Text style={styles.projectName}>{project.name}</Text>
                <Text style={styles.projectStatus}>{project.status}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.emptyText}>No projects yet. Create one!</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0f",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  email: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  logoutBtn: {
    padding: 8,
  },
  logoutText: {
    color: "#ff6b6b",
    fontSize: 14,
  },
  stats: {
    flexDirection: "row",
    padding: 20,
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6172f3",
  },
  statLabel: {
    fontSize: 14,
    color: "#888",
    marginTop: 4,
  },
  generateButton: {
    backgroundColor: "#6172f3",
    margin: 20,
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  projectList: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  projectCard: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  projectStatus: {
    color: "#888",
    fontSize: 12,
    textTransform: "capitalize",
  },
  emptyText: {
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
});
