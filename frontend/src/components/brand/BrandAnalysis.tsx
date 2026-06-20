import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Palette, Type } from "lucide-react";

interface BrandAnalysisProps {
  analysis: {
    colors: string[];
    typography: { primary: string; secondary: string };
    style: { dominant: string; mood: string };
  } | null;
}

export function BrandAnalysis({ analysis }: BrandAnalysisProps) {
  if (!analysis) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-sm text-surface-500">
          No analysis available. Click "Analyze Website" to start.
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Palette className="h-4 w-4" /> Colors
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {analysis.colors.map((color, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <div className="h-10 w-10 rounded-lg border" style={{ backgroundColor: color }} />
                <span className="text-xs text-surface-500">{color}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <Type className="h-4 w-4" /> Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>Primary: <strong>{analysis.typography.primary}</strong></p>
          <p>Secondary: <strong>{analysis.typography.secondary}</strong></p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Style</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 text-sm">
          <p>Dominant: <strong>{analysis.style.dominant}</strong></p>
          <p>Mood: <strong>{analysis.style.mood}</strong></p>
        </CardContent>
      </Card>
    </div>
  )
}
