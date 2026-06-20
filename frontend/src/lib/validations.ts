export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MAX_LENGTH = 255;
export const PROMPT_MAX_LENGTH = 2000;
export const PROJECT_NAME_MAX_LENGTH = 255;
export const DESCRIPTION_MAX_LENGTH = 5000;

export function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

export function validatePassword(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters`);
  }
  if (!/[A-Z]/.test(password)) {
    errors.push("Password must contain at least one uppercase letter");
  }
  if (!/[a-z]/.test(password)) {
    errors.push("Password must contain at least one lowercase letter");
  }
  if (!/[0-9]/.test(password)) {
    errors.push("Password must contain at least one number");
  }
  return { valid: errors.length === 0, errors };
}

export function validateName(name: string): boolean {
  return name.trim().length > 0 && name.length <= NAME_MAX_LENGTH;
}

export function validatePrompt(prompt: string): { valid: boolean; error?: string } {
  if (!prompt.trim()) return { valid: false, error: "Prompt is required" };
  if (prompt.length > PROMPT_MAX_LENGTH) return { valid: false, error: `Prompt must be under ${PROMPT_MAX_LENGTH} characters` };

  const injectionPatterns = [
    "ignore previous", "ignore all previous", "disregard",
    "forget everything", "system prompt", "you are now",
  ];
  const lower = prompt.toLowerCase();
  for (const pattern of injectionPatterns) {
    if (lower.includes(pattern)) {
      return { valid: false, error: "Prompt contains invalid content" };
    }
  }
  return { valid: true };
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function validateHexColor(color: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
}

export function validateAspectRatio(ratio: string): boolean {
  return ["16:9", "9:16", "1:1", "4:3"].includes(ratio);
}

export function validateDuration(duration: number): boolean {
  return duration >= 5 && duration <= 600;
}

export function validateProjectName(name: string): { valid: boolean; error?: string } {
  if (!name.trim()) return { valid: false, error: "Project name is required" };
  if (name.length > PROJECT_NAME_MAX_LENGTH) return { valid: false, error: `Name must be under ${PROJECT_NAME_MAX_LENGTH} characters` };
  return { valid: true };
}
