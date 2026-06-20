export interface User {
  id: string;
  email: string;
  email_verified: boolean;
  full_name: string | null;
  avatar_url: string | null;
  locale: string;
  timezone: string;
  role?: "viewer" | "editor" | "admin" | "owner";
  last_login_at?: string;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: "en" | "tr";
  email_notifications: boolean;
  marketing_emails: boolean;
}

export interface UserApiKey {
  id: string;
  name: string;
  key_prefix: string;
  created_at: string;
  last_used_at?: string;
  expires_at?: string;
}
