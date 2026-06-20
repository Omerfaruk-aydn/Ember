import anthropic
from app.config import get_settings

settings = get_settings()


class ClaudeClient:
    def __init__(self):
        self.client = anthropic.AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)

    async def create_message(self, prompt: str, system: str = "", model: str = "claude-sonnet-4-20250514", max_tokens: int = 4000) -> str:
        kwargs = {"model": model, "max_tokens": max_tokens, "messages": [{"role": "user", "content": prompt}]}
        if system:
            kwargs["system"] = system
        response = await self.client.messages.create(**kwargs)
        return response.content[0].text

    async def analyze_prompt(self, prompt: str) -> dict:
        result = await self.create_message(
            f"Analyze this video prompt and return JSON with fields: subject, audience, mood, style, visual_elements (list), suggested_duration (int), platform, complexity (simple|moderate|complex), keywords (list).\n\nPrompt: {prompt}",
            system="You are a video production analyst. Return valid JSON only.",
        )
        import json
        return json.loads(result)

    async def generate_storyboard(self, research: dict, params: dict) -> dict:
        result = await self.create_message(
            f"Generate a video storyboard for: {research.get('analysis', {}).get('subject', 'unknown')}\nStyle: {params.get('style', 'cinematic')}\nDuration: {params.get('duration', 30)}s\n\nReturn JSON with scenes array, each having: id, title, description, image_prompt, duration_seconds, motion_type, transition, voiceover_text.",
            system="You are a video storyboard expert. Return valid JSON only.",
        )
        import json
        return json.loads(result)

    async def enhance_image_prompt(self, prompt: str, style: str, mood: str) -> str:
        return await self.create_message(
            f"Enhance this image prompt for a {style} style, {mood} mood video scene. Return ONLY the enhanced prompt.\n\nOriginal: {prompt}",
            system="You are an expert at crafting prompts for AI image generation.",
            max_tokens=500,
        )
