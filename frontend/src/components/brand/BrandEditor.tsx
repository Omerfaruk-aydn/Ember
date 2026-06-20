import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Brand } from "@/types";

interface BrandEditorProps {
  brand: Brand | null;
  onSave: (data: Record<string, unknown>) => void;
  onCancel: () => void;
}

export function BrandEditor({ brand, onSave, onCancel }: BrandEditorProps) {
  const [name, setName] = useState(brand?.name || "");
  const [websiteUrl, setWebsiteUrl] = useState(brand?.website_url || "");
  const [primaryColors, setPrimaryColors] = useState(brand?.primary_colors?.join(", ") || "");
  const [mood, setMood] = useState(brand?.mood || "");
  const [industry, setIndustry] = useState(brand?.industry || "");

  const handleSave = () => {
    onSave({
      name,
      website_url: websiteUrl || undefined,
      primary_colors: primaryColors ? primaryColors.split(",").map((c) => c.trim()) : [],
      mood: mood || undefined,
      industry: industry || undefined,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{brand ? "Edit Brand" : "Create Brand"}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Brand Name</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="My Brand" />
        </div>
        <div className="space-y-2">
          <Label>Website URL</Label>
          <Input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://example.com" />
        </div>
        <div className="space-y-2">
          <Label>Primary Colors (comma-separated hex)</Label>
          <Input value={primaryColors} onChange={(e) => setPrimaryColors(e.target.value)} placeholder="#ff0000, #00ff00" />
        </div>
        <div className="space-y-2">
          <Label>Mood</Label>
          <Input value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Professional, modern" />
        </div>
        <div className="space-y-2">
          <Label>Industry</Label>
          <Input value={industry} onChange={(e) => setIndustry(e.target.value)} placeholder="Technology, SaaS" />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSave}>Save</Button>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
        </div>
      </CardContent>
    </Card>
  )
}
