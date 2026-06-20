from fastapi import APIRouter, Depends
from app.deps import get_current_active_user
from app.models.user import User

router = APIRouter()

STYLES = [
    {"id": "cinematic", "name": "Cinematic", "description": "Film-like quality with dramatic lighting and smooth camera movements", "colors": ["#1a1a2e", "#16213e", "#0f3460"], "transitions": ["fade", "dissolve", "wipe"], "mood": "professional", "typography": "serif"},
    {"id": "modern", "name": "Modern", "description": "Clean, minimalist design with bold typography", "colors": ["#ffffff", "#f8f9fa", "#212529"], "transitions": ["slide", "zoom", "morph"], "mood": "professional", "typography": "sans-serif"},
    {"id": "playful", "name": "Playful", "description": "Fun, energetic style with bright colors and bouncy animations", "colors": ["#ff6b6b", "#4ecdc4", "#ffe66d"], "transitions": ["bounce", "spin", "pop"], "mood": "energetic", "typography": "display"},
    {"id": "minimal", "name": "Minimal", "description": "Simple, elegant design with focus on content", "colors": ["#ffffff", "#f1f3f5", "#495057"], "transitions": ["fade", "cut"], "mood": "calm", "typography": "sans-serif"},
    {"id": "kinetic", "name": "Kinetic", "description": "Dynamic text animations with bold visual impact", "colors": ["#000000", "#1a1a1a", "#ff0000"], "transitions": ["slide", "zoom", "parallax"], "mood": "energetic", "typography": "display"},
    {"id": "elegant", "name": "Elegant", "description": "Refined, sophisticated style with smooth animations", "colors": ["#f8f4ef", "#d4a574", "#2c1810"], "transitions": ["fade", "dissolve"], "mood": "calm", "typography": "serif"},
    {"id": "dramatic", "name": "Dramatic", "description": "High-contrast, impactful visuals with bold transitions", "colors": ["#0a0a0a", "#1a1a1a", "#ff4444"], "transitions": ["zoom", "wipe", "morph"], "mood": "exciting", "typography": "display"},
    {"id": "fun", "name": "Fun", "description": "Lighthearted, colorful style with engaging animations", "colors": ["#ff9a9e", "#fecfef", "#a18cd1"], "transitions": ["bounce", "spin", "pop"], "mood": "energetic", "typography": "display"},
]


@router.get("")
async def list_styles(current_user: User = Depends(get_current_active_user)):
    return {"data": STYLES, "total": len(STYLES)}


@router.get("/{style_id}")
async def get_style(style_id: str, current_user: User = Depends(get_current_active_user)):
    style = next((s for s in STYLES if s["id"] == style_id), None)
    if not style:
        from app.core.exceptions import NotFoundException
        raise NotFoundException("Style not found")
    return style


@router.post("/{style_id}/preview")
async def preview_style(style_id: str, body: dict | None = None, current_user: User = Depends(get_current_active_user)):
    style = next((s for s in STYLES if s["id"] == style_id), None)
    if not style:
        from app.core.exceptions import NotFoundException
        raise NotFoundException("Style not found")
    return {"style": style, "preview_url": None, "message": "Style preview generated"}
