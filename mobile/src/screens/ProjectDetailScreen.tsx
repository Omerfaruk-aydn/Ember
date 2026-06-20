import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export function ProjectDetailScreen({ route }: any) {
  const { projectId } = route.params;

  const { data: project, isLoading } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const { data } = await api.get(`/projects/${projectId}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6172f3" />
      </View>
    );
  }

  if (!project) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Project not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{project.name}</Text>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{project.status}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Prompt</Text>
        <Text style={styles.cardValue}>{project.prompt}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Progress</Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${project.progress || 0}%` }]}
          />
        </View>
        <Text style={styles.progressText}>{Math.round(project.progress || 0)}%</Text>
      </View>

      <View style={styles.infoRow}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Duration</Text>
          <Text style={styles.infoValue}>{project.duration_seconds}s</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Aspect Ratio</Text>
          <Text style={styles.infoValue}>{project.aspect_ratio}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Quality</Text>
          <Text style={styles.infoValue}>{project.quality}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0f",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0a0f",
  },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
  },
  statusBadge: {
    backgroundColor: "rgba(97, 114, 243, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    color: "#6172f3",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  card: {
    backgroundColor: "#1a1a2e",
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  cardLabel: {
    color: "#888",
    fontSize: 12,
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardValue: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 24,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#2a2a3e",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#6172f3",
    borderRadius: 4,
  },
  progressText: {
    color: "#888",
    fontSize: 14,
    textAlign: "right",
  },
  infoRow: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  infoItem: {
    flex: 1,
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  infoLabel: {
    color: "#888",
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  errorText: {
    color: "#888",
    fontSize: 16,
  },
});
