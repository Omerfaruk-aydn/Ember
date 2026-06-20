import { useEffect, useRef, useState } from "react";

interface AnnouncerProps {
  message: string;
  assertive?: boolean;
}

export function Announcer({ message, assertive = false }: AnnouncerProps) {
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setAnnouncement("");
    const timer = setTimeout(() => {
      setAnnouncement(message);
    }, 100);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      role="status"
      aria-live={assertive ? "assertive" : "polite"}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}
