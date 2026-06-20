import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/authStore"

export default function SettingsPage() {
  const { user, setUser } = useAuthStore()
  const [fullName, setFullName] = useState(user?.full_name || "")
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ full_name: fullName }),
      })
      const updated = await res.json()
      if (user) setUser({ ...user, ...updated })
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } catch {}
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-surface-500">Manage your account preferences</p>
      </div>

      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email || ""} disabled />
          </div>
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <Button onClick={handleSave}>
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Preferences</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Language</Label>
            <select
              className="flex h-9 w-full rounded-md border border-surface-300 bg-transparent px-3 py-1 text-sm"
              value={localStorage.getItem("language") || "en"}
              onChange={(e) => {
                localStorage.setItem("language", e.target.value)
                window.location.reload()
              }}
            >
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
            </select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
