from typing import Any
from app.agents.base_agent import BaseAgent
from app.integrations.anthropic import ClaudeClient


class ResearchAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="research")
        self.claude = ClaudeClient()

    async def execute(self, state: dict[str, Any]) -> dict[str, Any]:
        prompt = state.get("prompt", "")
        analysis = await self.claude.analyze_prompt(prompt)
        return {"analysis": analysis, "parameters": self._determine_parameters(analysis)}

    def _determine_parameters(self, analysis: dict) -> dict:
        params = {
            "duration": analysis.get("suggested_duration", 30),
            "aspect_ratio": "16:9",
            "fps": 30,
            "style": analysis.get("style", "cinematic"),
            "mood": analysis.get("mood", "professional"),
        }
        platform = analysis.get("platform", "").lower()
        if "tiktok" in platform or "reels" in platform:
            params["aspect_ratio"] = "9:16"
            params["duration"] = min(params["duration"], 60)
        elif "instagram" in platform:
            params["aspect_ratio"] = "1:1"
        return params
