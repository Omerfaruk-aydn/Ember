from app.integrations.elevenlabs import ElevenLabsClient
from app.integrations.whisper import WhisperClient
from app.integrations.s3 import S3Client


class AudioService:
    def __init__(self):
        self.elevenlabs = ElevenLabsClient()
        self.whisper = WhisperClient()
        self.s3 = S3Client()

    async def generate_voiceover(self, text: str, voice_id: str = "MF3mGyEYCl7XYWbV9V6O") -> dict:
        result = await self.elevenlabs.text_to_speech(text=text, voice_id=voice_id)
        audio_url = await self.s3.upload_bytes(result["audio_bytes"], f"voiceovers/{hash(text)}.mp3", "audio/mpeg")
        return {"url": audio_url, "duration_ms": result["duration_ms"], "voice_id": voice_id, "text": text}

    async def generate_captions(self, audio_url: str) -> list[dict]:
        transcription = await self.whisper.transcribe(audio_url=audio_url)
        captions = []
        for segment in transcription.get("segments", []):
            captions.append({
                "text": segment.get("text", "").strip(),
                "start_ms": int(segment.get("start", 0) * 1000),
                "end_ms": int(segment.get("end", 0) * 1000),
            })
        return captions

    async def mix_audio(self, tracks: list[dict]) -> dict:
        return {"url": None, "duration_ms": 0, "message": "Audio mixing requires FFmpeg processing"}
