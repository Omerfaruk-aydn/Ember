import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Film } from "lucide-react"

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-50">
      <Card className="w-full max-w-md text-center">
        <CardContent className="py-12">
          <Film className="mx-auto h-16 w-16 text-surface-300" />
          <h1 className="mt-6 text-4xl font-bold">404</h1>
          <p className="mt-2 text-surface-500">Page not found</p>
          <Link to="/dashboard">
            <Button className="mt-6">Go to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
