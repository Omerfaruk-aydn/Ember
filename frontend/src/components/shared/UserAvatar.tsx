import { cn } from "@/lib/utils";

interface UserAvatarProps {
  name?: string | null;
  email?: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "h-6 w-6 text-xs",
  md: "h-8 w-8 text-sm",
  lg: "h-12 w-12 text-base",
};

const colors = [
  "bg-blue-100 text-blue-700",
  "bg-green-100 text-green-700",
  "bg-purple-100 text-purple-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
];

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

function getInitial(name: string | null | undefined, email?: string): string {
  const source = name || email || "U";
  return source[0]?.toUpperCase() || "U";
}

export function UserAvatar({ name, email, avatarUrl, size = "md", className }: UserAvatarProps) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name || email || "User"}
        className={cn("rounded-full object-cover", sizeClasses[size], className)}
      />
    );
  }

  const initial = getInitial(name, email);
  const colorClass = getColor(name || email || "");

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-medium",
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {initial}
    </div>
  );
}
