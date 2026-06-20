import asyncio
import logging
from typing import Any
from datetime import datetime, timezone

from app.agents.research_agent import ResearchAgent
from app.agents.storyboard_agent import StoryboardAgent
from app.agents.visual_agent import VisualAgent
from app.agents.audio_agent import AudioAgent

logger = logging.getLogger(__name__)

PHASES = ["init", "research", "storyboard", "visual", "audio", "composition", "rendering", "complete"]


class VideoOrchestrator:
    def __init__(self):
        self.research = ResearchAgent()
        self.storyboard = StoryboardAgent()
        self.visual = VisualAgent()
        self.audio = AudioAgent()

    async def generate(self, project_id: str, user_id: str, prompt: str, settings: dict, callback=None) -> dict:
        state: dict[str, Any] = {"project_id": project_id, "user_id": user_id, "prompt": prompt, "settings": settings}

        try:
            if callback:
                await callback("research", 10)
            state["research_data"] = await self.research.execute(state)

            if callback:
                await callback("storyboard", 30)
            storyboard_result = await self.storyboard.execute(state)
            state["scenes"] = storyboard_result.get("scenes", [])

            if callback:
                await callback("visual", 50)
            visual_result = await self.visual.execute(state)
            state["images"] = visual_result.get("images", [])

            if callback:
                await callback("audio", 70)
            audio_result = await self.audio.execute(state)
            state["audio"] = audio_result

            if callback:
                await callback("composition", 85)

            if callback:
                await callback("rendering", 95)

            if callback:
                await callback("complete", 100)

            return {
                "project_id": project_id,
                "scenes": state["scenes"],
                "images": state["images"],
                "status": "completed",
            }

        except Exception as e:
            logger.error(f"Generation failed for project {project_id}: {e}")
            return {"project_id": project_id, "status": "failed", "error": str(e)}
