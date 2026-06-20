import httpx
from app.config import get_settings

settings = get_settings()


class ElevenLabsClient:
    def __init__(self):
        self.base_url = "https://api.elevenlabs.io/v1"
        self.api_key = settings.ANTHROPIC_API_KEY

    async def text_to_speech(self, text: str, voice_id: str, model_id: str = "eleven_multilingual_v2", voice_settings: dict | None = None) -> dict:
        voice_settings = voice_settings or {"stability": 0.5, "similarity_boost": 0.75, "style": 0.5, "use_speaker_boost": True}

        async with httpx.AsyncClient(timeout=120) as client:
            resp = await client.post(
                f"{self.base_url}/text-to-speech/{voice_id}",
                json={"text": text, "model_id": model_id, "voice_settings": voice_settings},
                headers={"xi-api-key": self.api_key},
            )
            resp.raise_for_status()

            audio_bytes = resp.content
            duration_ms = int(len(audio_bytes) / 16) * 1000 // 16000

            return {
                "audio_bytes": audio_bytes,
                "duration_ms": duration_ms,
                "voice_id": voice_id,
            }

    async def list_voices(self) -> list:
        async with httpx.AsyncClient() as client:
            resp = await client.get(f"{self.base_url}/voices", headers={"xi-api-key": self.api_key})
            resp.raise_for_status()
            return resp.json().get("voices", [])
