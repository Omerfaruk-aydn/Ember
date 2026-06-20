import asyncio
from typing import Any
from app.agents.base_agent import BaseAgent
from app.integrations.flux import FluxClient
from app.integrations.anthropic import ClaudeClient


class VisualAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="visual")
        self.flux = FluxClient()
        self.claude = ClaudeClient()

    async def execute(self, state: dict[str, Any]) -> dict[str, Any]:
        scenes = state.get("scenes", [])
        style = state.get("style_analysis", {})
        tasks = [self._generate_for_scene(scene, style) for scene in scenes]
        results = await asyncio.gather(*tasks, return_exceptions=True)
        images = []
        for i, result in enumerate(results):
            if isinstance(result, Exception):
                images.append({"scene_index": i, "error": str(result), "status": "failed"})
            else:
                images.append(result)
        return {"images": images}

    async def execute_for_scene(self, scene: dict, state: dict) -> dict:
        return await self._generate_for_scene(scene, state.get("style_analysis", {}))

    async def _generate_for_scene(self, scene: dict, style: dict) -> dict:
        prompt = scene.get("image_prompt", scene.get("description", ""))
        enhanced = await self.claude.enhance_image_prompt(prompt, style.get("style", "cinematic"), style.get("mood", "professional"))
        result = await self.flux.generate(prompt=enhanced)
        return {"scene_id": scene.get("id"), "image_url": result["image_url"], "status": "completed"}
