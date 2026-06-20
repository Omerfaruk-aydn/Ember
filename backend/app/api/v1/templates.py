from fastapi import APIRouter, Depends
from app.deps import get_current_active_user
from app.models.user import User

router = APIRouter()

TEMPLATES = [
    {"id": "product-launch", "name": "Product Launch", "description": "Dynamic product reveal with kinetic typography", "style": "modern", "duration": 30, "scene_count": 5, "tags": ["product", "launch", "marketing"]},
    {"id": "social-ad", "name": "Social Media Ad", "description": "Short-form vertical video for social platforms", "style": "playful", "duration": 15, "scene_count": 3, "tags": ["social", "ad", "tiktok", "instagram"]},
    {"id": "explainer", "name": "Explainer Video", "description": "Professional explainer with smooth transitions", "style": "cinematic", "duration": 60, "scene_count": 8, "tags": ["explainer", "educational", "corporate"]},
    {"id": "testimonial", "name": "Customer Testimonial", "description": "Warm testimonial with text overlays", "style": "elegant", "duration": 30, "scene_count": 4, "tags": ["testimonial", "social-proof", "marketing"]},
    {"id": "brand-story", "name": "Brand Story", "description": "Emotional brand narrative with cinematic transitions", "style": "cinematic", "duration": 60, "scene_count": 6, "tags": ["brand", "story", "emotional"]},
    {"id": "tutorial", "name": "Tutorial", "description": "Step-by-step tutorial with clear visuals", "style": "minimal", "duration": 120, "scene_count": 10, "tags": ["tutorial", "educational", "how-to"]},
    {"id": "event-promo", "name": "Event Promo", "description": "High-energy event promotion", "style": "kinetic", "duration": 30, "scene_count": 5, "tags": ["event", "promo", "marketing"]},
    {"id": "announcement", "name": "Announcement", "description": "Professional announcement with bold typography", "style": "modern", "duration": 30, "scene_count": 4, "tags": ["announcement", "corporate", "news"]},
]


@router.get("")
async def list_templates(style: str | None = None, limit: int = 20, current_user: User = Depends(get_current_active_user)):
    templates = TEMPLATES
    if style:
        templates = [t for t in templates if t["style"] == style]
    return {"data": templates[:limit], "total": len(templates)}


@router.get("/{template_id}")
async def get_template(template_id: str, current_user: User = Depends(get_current_active_user)):
    template = next((t for t in TEMPLATES if t["id"] == template_id), None)
    if not template:
        from app.core.exceptions import NotFoundException
        raise NotFoundException("Template not found")
    return template


@router.post("/{template_id}/use")
async def use_template(template_id: str, current_user: User = Depends(get_current_active_user)):
    template = next((t for t in TEMPLATES if t["id"] == template_id), None)
    if not template:
        from app.core.exceptions import NotFoundException
        raise NotFoundException("Template not found")
    return {"template": template, "message": "Template applied. Create a new project with these settings."}
