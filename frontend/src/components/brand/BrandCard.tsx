import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette } from "lucide-react";

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    website_url: string | null;
    primary_colors: string[];
    mood: string | null;
    industry: string | null;
  };
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function BrandCard({ brand, onEdit, onDelete }: BrandCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{brand.name}</CardTitle>
          <div className="flex gap-1">
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(brand.id)}>Edit</Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={() => onDelete(brand.id)}>Delete</Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {brand.website_url && (
          <p className="text-sm text-surface-500">{brand.website_url}</p>
        )}
        {brand.primary_colors.length > 0 && (
          <div className="mt-2 flex gap-1">
            {brand.primary_colors.map((c, i) => (
              <div key={i} className="h-6 w-6 rounded-full border" style={{ backgroundColor: c }} />
            ))}
          </div>
        )}
        <div className="mt-2 flex gap-2">
          {brand.mood && <span className="text-xs text-surface-500">Mood: {brand.mood}</span>}
          {brand.industry && <span className="text-xs text-surface-500">Industry: {brand.industry}</span>}
        </div>
      </CardContent>
    </Card>
  )
}
