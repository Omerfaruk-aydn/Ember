import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Globe, Trash2 } from "lucide-react"

interface Brand {
  id: string
  name: string
  website_url: string | null
  primary_colors: string[]
  status: string
  created_at: string
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [newName, setNewName] = useState("")
  const [newUrl, setNewUrl] = useState("")

  useEffect(() => {
    fetch("/api/v1/brands")
      .then((r) => r.json())
      .then((data) => setBrands(Array.isArray(data) ? data : []))
      .catch(() => {})
  }, [])

  const handleCreate = async () => {
    if (!newName) return
    try {
      const res = await fetch("/api/v1/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName, website_url: newUrl || undefined }),
      })
      const brand = await res.json()
      setBrands([brand, ...brands])
      setNewName("")
      setNewUrl("")
      setShowCreate(false)
    } catch {}
  }

  const handleDelete = async (id: string) => {
    await fetch(`/api/v1/brands/${id}`, { method: "DELETE" })
    setBrands(brands.filter((b) => b.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Brands</h1>
          <p className="text-surface-500">Manage brand contexts for consistent video generation</p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)}>
          <Plus className="h-4 w-4" /> New Brand
        </Button>
      </div>

      {showCreate && (
        <Card>
          <CardHeader><CardTitle>Create Brand</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Brand Name</Label>
              <Input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="My Brand" />
            </div>
            <div className="space-y-2">
              <Label>Website URL (optional)</Label>
              <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://example.com" />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreate}>Create</Button>
              <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {brands.length === 0 ? (
        <Card className="py-12 text-center">
          <CardContent>
            <Globe className="mx-auto h-12 w-12 text-surface-300" />
            <h3 className="mt-4 text-lg font-medium">No brands yet</h3>
            <p className="mt-1 text-sm text-surface-500">Create a brand to maintain visual consistency across videos.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {brands.map((brand) => (
            <Card key={brand.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{brand.name}</CardTitle>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(brand.id)}>
                    <Trash2 className="h-4 w-4 text-surface-400" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {brand.website_url && <p className="text-sm text-surface-500">{brand.website_url}</p>}
                {brand.primary_colors.length > 0 && (
                  <div className="mt-2 flex gap-1">
                    {brand.primary_colors.map((c, i) => (
                      <div key={i} className="h-6 w-6 rounded-full border" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
