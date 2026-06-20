export interface Brand {
  id: string;
  user_id: string;
  name: string;
  website_url: string | null;
  primary_colors: string[];
  secondary_colors: string[];
  accent_colors: string[];
  primary_font: string | null;
  secondary_font: string | null;
  style_keywords: string[];
  mood: string | null;
  industry: string | null;
  logo_urls: string[];
  reference_image_urls: string[];
  visual_patterns: Record<string, unknown>;
  status: string;
  last_scraped_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface BrandCreateInput {
  name: string;
  website_url?: string;
  primary_colors?: string[];
  secondary_colors?: string[];
  accent_colors?: string[];
  primary_font?: string;
  secondary_font?: string;
  style_keywords?: string[];
  mood?: string;
  industry?: string;
}

export interface BrandUpdateInput {
  name?: string;
  website_url?: string;
  primary_colors?: string[];
  secondary_colors?: string[];
  accent_colors?: string[];
  primary_font?: string;
  secondary_font?: string;
  style_keywords?: string[];
  mood?: string;
  industry?: string;
}

export interface WebsiteAnalysis {
  colors: string[];
  typography: { primary: string; secondary: string };
  style: { dominant: string; mood: string };
  logos: string[];
}
