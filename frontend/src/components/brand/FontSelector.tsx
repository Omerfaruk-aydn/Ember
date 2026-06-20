import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const FONTS = [
  { value: "inter", label: "Inter" },
  { value: "roboto", label: "Roboto" },
  { value: "open-sans", label: "Open Sans" },
  { value: "lato", label: "Lato" },
  { value: "montserrat", label: "Montserrat" },
  { value: "playfair", label: "Playfair Display" },
  { value: "merriweather", label: "Merriweather" },
  { value: "raleway", label: "Raleway" },
  { value: "oswald", label: "Oswald" },
  { value: "poppins", label: "Poppins" },
]

export function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select font" />
      </SelectTrigger>
      <SelectContent>
        {FONTS.map((font) => (
          <SelectItem key={font.value} value={font.value}>
            <span style={{ fontFamily: font.value }}>{font.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
