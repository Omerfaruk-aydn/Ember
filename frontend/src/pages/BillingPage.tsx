import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const plans = [
  { id: "free", name: "Free", price: "$0", period: "/month", features: ["1 video/month", "30s max duration", "Basic styles", "Watermark"], videoLimit: 1 },
  { id: "pro", name: "Pro", price: "$29", period: "/month", features: ["10 videos/month", "5min max duration", "All styles", "No watermark", "MCP access"], videoLimit: 10 },
  { id: "enterprise", name: "Enterprise", price: "$199", period: "/month", features: ["Unlimited videos", "Unlimited duration", "All styles", "No watermark", "MCP + API", "Team collaboration"], videoLimit: -1 },
]

export default function BillingPage() {
  const [currentPlan] = useState("free")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-surface-500">Manage your subscription and usage</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-surface-500">Videos this month</p>
              <p className="text-2xl font-bold">0 / {plans.find(p => p.id === currentPlan)?.videoLimit || 1}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.id} className={currentPlan === plan.id ? "ring-2 ring-brand-500" : ""}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                {currentPlan === plan.id && <Badge>Current</Badge>}
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-surface-500">{plan.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <span className="text-brand-500">✓</span> {f}
                  </li>
                ))}
              </ul>
              <Button className="mt-4 w-full" variant={currentPlan === plan.id ? "outline" : "default"} disabled={currentPlan === plan.id}>
                {currentPlan === plan.id ? "Current Plan" : "Upgrade"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
