from typing import Any
from app.agents.base_agent import BaseAgent
from app.integrations.anthropic import ClaudeClient


class AudioAgent(BaseAgent):
    def __init__(self):
        super().__init__(name="audio")
        self.claude = ClaudeClient()

    async def execute(self, state: dict[str, Any]) -> dict[str, Any]:
        return {"voiceover": None, "music": None, "captions": []}

    async def generate_voiceover(self, state: dict[str, Any]) -> dict | None:
        scenes = state.get("scenes", [])
        texts = [s.get("voiceover_text", "") for s in scenes if s.get("voiceover_text")]
        if not texts:
            return None
        from app.services.audio_service import AudioService
        audio = AudioService()
        return await audio.generate_voiceover(" ".join(texts))

    async def generate_captions(self, state: dict[str, Any]) -> list[dict]:
        voiceover = state.get("voiceover")
        if not voiceover or not voiceover.get("url"):
            return []
        from app.services.audio_service import AudioService
        audio = AudioService()
        return await audio.generate_captions(voiceover["url"])
