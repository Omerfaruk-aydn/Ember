import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api/client";

const STYLES = ["cinematic", "modern", "playful", "minimal", "kinetic", "elegant"];
const DURATIONS = [15, 30, 60, 120];

export function GenerateScreen({ navigation }: any) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cinematic");
  const [duration, setDuration] = useState(30);
  const [aspectRatio, setAspectRatio] = useState("9:16");

  const generateMutation = useMutation({
    mutationFn: async (data: any) => {
      const { data: project } = await api.post("/projects", {
        name: `Video - ${data.prompt.substring(0, 30)}`,
        prompt: data.prompt,
      });
      await api.post(`/videos/generate`, {
        name: `Video - ${data.prompt.substring(0, 30)}`,
        prompt: data.prompt,
        settings: { style: data.style, duration: data.duration, aspect_ratio: data.aspect_ratio },
      });
      return project;
    },
    onSuccess: (project) => {
      navigation.replace("ProjectDetail", { projectId: project.id });
    },
    onError: () => {
      Alert.alert("Error", "Failed to start video generation");
    },
  });

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    generateMutation.mutate({ prompt, style, duration, aspect_ratio: aspectRatio });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create Video</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Describe your video</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Create a 30 second product demo video..."
          placeholderTextColor="#666"
          value={prompt}
          onChangeText={setPrompt}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Style</Text>
        <View style={styles.chipGrid}>
          {STYLES.map((s) => (
            <TouchableOpacity
              key={s}
              style={[styles.chip, style === s && styles.chipActive]}
              onPress={() => setStyle(s)}
            >
              <Text style={[styles.chipText, style === s && styles.chipTextActive]}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Duration: {duration}s</Text>
        <View style={styles.durationRow}>
          {DURATIONS.map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.durationChip, duration === d && styles.durationChipActive]}
              onPress={() => setDuration(d)}
            >
              <Text style={[styles.durationText, duration === d && styles.durationTextActive]}>
                {d}s
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Aspect Ratio</Text>
        <View style={styles.durationRow}>
          {["16:9", "9:16", "1:1"].map((r) => (
            <TouchableOpacity
              key={r}
              style={[styles.durationChip, aspectRatio === r && styles.durationChipActive]}
              onPress={() => setAspectRatio(r)}
            >
              <Text style={[styles.durationText, aspectRatio === r && styles.durationTextActive]}>
                {r}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[styles.generateBtn, !prompt.trim() && styles.generateBtnDisabled]}
          onPress={handleGenerate}
          disabled={!prompt.trim() || generateMutation.isPending}
        >
          {generateMutation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.generateBtnText}>Generate Video</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0f",
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  backBtn: {
    color: "#6172f3",
    fontSize: 16,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
    marginTop: 8,
  },
  textArea: {
    backgroundColor: "#1a1a2e",
    borderRadius: 12,
    padding: 16,
    color: "#fff",
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
    marginBottom: 16,
  },
  chipGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#1a1a2e",
  },
  chipActive: {
    backgroundColor: "#6172f3",
  },
  chipText: {
    color: "#888",
    fontSize: 14,
  },
  chipTextActive: {
    color: "#fff",
  },
  durationRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  durationChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "#1a1a2e",
    alignItems: "center",
  },
  durationChipActive: {
    backgroundColor: "#6172f3",
  },
  durationText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  durationTextActive: {
    color: "#fff",
  },
  generateBtn: {
    backgroundColor: "#6172f3",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    marginTop: 16,
  },
  generateBtnDisabled: {
    opacity: 0.5,
  },
  generateBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
