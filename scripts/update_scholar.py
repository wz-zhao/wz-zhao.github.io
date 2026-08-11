from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path

from scholarly import scholarly

SCHOLAR_ID = "dNzUUAoAAAAJ"
OUTPUT = Path("assets/scholar_stats.json")

def main() -> None:
    author = scholarly.search_author_id(SCHOLAR_ID)
    scholarly.fill(author, sections=["basics", "indices", "counts"])

    citedby = author.get("citedby")
    if citedby is None:
        raise RuntimeError("Google Scholar did not return a citation count.")

    payload = {
        "scholar_id": SCHOLAR_ID,
        "name": author.get("name", "Wenzhuo Zhao"),
        "citedby": int(citedby),
        "hindex": author.get("hindex"),
        "i10index": author.get("i10index"),
        "updated": datetime.now(timezone.utc).isoformat(),
    }

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(json.dumps(payload, ensure_ascii=False))

if __name__ == "__main__":
    main()
