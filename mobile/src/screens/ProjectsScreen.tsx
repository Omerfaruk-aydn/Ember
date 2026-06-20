import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export function ProjectsScreen({ navigation }: any) {
  const { data: projects, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      return data;
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Projects</Text>
        <TouchableOpacity
          style={styles.createBtn}
          onPress={() => navigation.navigate("Generate")}
        >
          <Text style={styles.createBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={Array.isArray(projects) ? projects : []}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={styles.projectCard}
            onPress={() =>
              navigation.navigate("ProjectDetail", { projectId: item.id })
            }
          >
            <View style={styles.projectInfo}>
              <Text style={styles.projectName}>{item.name}</Text>
              <Text style={styles.projectDate}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
            </View>
            <View
              style={[
                styles.statusBadge,
                item.status === "ready"
                  ? styles.statusReady
                  : item.status === "generating"
                  ? styles.statusGenerating
                  : styles.statusDefault,
              ]}
            >
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🎬</Text>
            <Text style={styles.emptyTitle}>No projects yet</Text>
            <Text style={styles.emptySubtitle}>
              Create your first video project
            </Text>
          </View>
        }
      />
    </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  createBtn: {
    backgroundColor: "#6172f3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  projectCard: {
    backgroundColor: "#1a1a2e",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectInfo: {
    flex: 1,
  },
  projectName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  projectDate: {
    color: "#888",
    fontSize: 12,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusReady: {
    backgroundColor: "rgba(78, 205, 196, 0.2)",
  },
  statusGenerating: {
    backgroundColor: "rgba(97, 114, 243, 0.2)",
  },
  statusDefault: {
    backgroundColor: "rgba(136, 136, 136, 0.2)",
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    textTransform: "capitalize",
  },
  empty: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtitle: {
    color: "#888",
    fontSize: 14,
  },
});
