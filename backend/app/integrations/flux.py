import httpx
import time
from app.config import get_settings

settings = get_settings()


class FluxClient:
    def __init__(self):
        self.base_url = "https://api.replicate.com/v1"
        self.headers = {"Authorization": f"Bearer {settings.ANTHROPIC_API_KEY}"}

    async def generate(self, prompt: str, width: int = 1920, height: int = 1080, num_inference_steps: int = 50, guidance_scale: float = 7.5, seed: int | None = None) -> dict:
        start = time.time()
        payload = {
            "version": "black-forest-labs/flux-1.1-pro",
            "input": {
                "prompt": prompt,
                "width": width,
                "height": height,
                "num_inference_steps": num_inference_steps,
                "guidance_scale": guidance_scale,
            },
        }
        if seed is not None:
            payload["input"]["seed"] = seed

        async with httpx.AsyncClient(timeout=300) as client:
            resp = await client.post(f"{self.base_url}/predictions", json=payload, headers=self.headers)
            resp.raise_for_status()
            prediction = resp.json()

            while prediction["status"] not in ("succeeded", "failed"):
                await __import__("asyncio").sleep(2)
                resp = await client.get(f"{self.base_url}/predictions/{prediction['id']}", headers=self.headers)
                prediction = resp.json()

            if prediction["status"] == "failed":
                raise Exception(f"Flux generation failed: {prediction.get('error')}")

            return {
                "image_url": prediction["output"] if isinstance(prediction["output"], str) else prediction["output"][0],
                "seed": seed,
                "generation_time_ms": int((time.time() - start) * 1000),
            }
