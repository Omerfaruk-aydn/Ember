import httpx
from app.config import get_settings

settings = get_settings()


class WhisperClient:
    def __init__(self):
        self.base_url = "https://api.openai.com/v1"

    async def transcribe(self, audio_url: str, language: str = "auto", model: str = "whisper-1") -> dict:
        async with httpx.AsyncClient(timeout=120) as client:
            audio_resp = await client.get(audio_url)
            audio_resp.raise_for_status()

            resp = await client.post(
                f"{self.base_url}/audio/transcriptions",
                files={"file": ("audio.mp3", audio_resp.content, "audio/mpeg")},
                data={"model": model, "response_format": "verbose_json", "timestamp_granularities[]": ["segment", "word"]},
                headers={"Authorization": f"Bearer {settings.ANTHROPIC_API_KEY}"},
            )
            resp.raise_for_status()
            return resp.json()
