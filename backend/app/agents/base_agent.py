import json
import logging
from typing import Any

logger = logging.getLogger(__name__)


class BaseAgent:
    def __init__(self, name: str):
        self.name = name

    async def execute(self, state: dict[str, Any]) -> dict[str, Any]:
        raise NotImplementedError

    def _parse_json(self, text: str) -> dict:
        try:
            text = text.strip()
            if text.startswith("```"):
                text = text.split("\n", 1)[1]
                if text.endswith("```"):
                    text = text[:-3]
            return json.loads(text)
        except json.JSONDecodeError:
            logger.warning(f"Failed to parse JSON from agent {self.name}")
            return {"error": "Failed to parse response", "raw": text}
