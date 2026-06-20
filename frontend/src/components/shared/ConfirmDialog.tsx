import { Button } from "@/components/ui/button";
import { FocusTrap } from "./FocusTrap";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <FocusTrap onEscape={onCancel}>
        <div className="w-full max-w-md rounded-xl border border-surface-200 bg-white p-6 shadow-lg">
          <div className="flex items-start gap-3">
            {variant === "destructive" && (
              <AlertTriangle className="mt-0.5 h-5 w-5 text-red-500" />
            )}
            <div>
              <h3 className="text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-surface-500">{description}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              {cancelLabel}
            </Button>
            <Button variant={variant === "destructive" ? "destructive" : "default"} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </div>
        </div>
      </FocusTrap>
    </div>
  );
}
