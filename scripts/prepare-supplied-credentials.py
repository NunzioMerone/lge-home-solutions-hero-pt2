"""Encode the replacement credential PNGs supplied by the user for the website.

Run with Python and Pillow after placing the original PNGs in
references/credentials-supplied/. This only encodes WebP derivatives and
resizes thumbnails. It does not crop, retouch, reconstruct, or upscale images.
"""
from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass
from pathlib import Path

from PIL import Image

SITE = Path(__file__).resolve().parents[1]
SOURCES = SITE / 'references/credentials-supplied'
OUTPUT = SITE / 'public/documents/competencies'
MANIFEST = SITE / 'references/credential-supplied-derivatives.json'


@dataclass(frozen=True)
class CredentialSource:
    slug: str
    supplied_filename: str


CREDENTIALS = (
    CredentialSource('posaclima-gionatan', 'codex-clipboard-504629a5-ee82-4300-8cd6-2055e240c553.png'),
    CredentialSource('posaclima-emanuele', 'codex-clipboard-7b134ed3-fc3e-450a-90f6-907583082fc0.png'),
    CredentialSource('installation-gionatan', 'codex-clipboard-aee3d943-f7a6-4c11-be1d-93f50331fd89.png'),
    CredentialSource('installation-emanuele', 'codex-clipboard-289a8a26-b7ac-4281-8aff-e75e387cc57f.png'),
    CredentialSource('cosmet-top-partner', 'codex-clipboard-6691424e-768a-439d-a6a0-c859edfd5e32.png'),
)


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def prepare_credential(source: CredentialSource) -> dict[str, object]:
    source_path = SOURCES / f'{source.slug}.png'
    full_path = OUTPUT / f'{source.slug}.webp'
    thumbnail_path = OUTPUT / f'{source.slug}-thumb.webp'

    with Image.open(source_path) as image:
        if image.mode != 'RGB':
            raise ValueError(f'Expected the supplied RGB PNG: {source_path.name}')
        # Keep full-view dimensions and pixels as supplied; only WebP encoding
        # is applied. Preserve any embedded color profile without converting it.
        profile = image.info.get('icc_profile')
        image.save(full_path, 'WEBP', quality=95, method=6, icc_profile=profile)
        thumbnail = image.copy()
        thumbnail.thumbnail((640, 640), Image.Resampling.LANCZOS)
        thumbnail.save(thumbnail_path, 'WEBP', quality=85, method=6, icc_profile=profile)
        dimensions = list(image.size)
        thumbnail_dimensions = list(thumbnail.size)

    return {
        'id': source.slug,
        'suppliedFilename': source.supplied_filename,
        'sourcePath': str(source_path.relative_to(SITE)),
        'sourceSha256': sha256(source_path),
        'dimensions': dimensions,
        'fullPath': str(full_path.relative_to(SITE)),
        'fullSha256': sha256(full_path),
        'fullBytes': full_path.stat().st_size,
        'thumbnailPath': str(thumbnail_path.relative_to(SITE)),
        'thumbnailSha256': sha256(thumbnail_path),
        'thumbnailDimensions': thumbnail_dimensions,
        'thumbnailBytes': thumbnail_path.stat().st_size,
    }


def main() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    entries = [prepare_credential(source) for source in CREDENTIALS]
    manifest = {
        'suppliedOn': '2026-10-29',
        'source': 'Replacement PNG images supplied directly by the user.',
        'method': 'WebP encoding at quality 95; thumbnails at quality 85, longest edge 640 px. No cropping, retouching, tonal correction, AI reconstruction, or upscaling.',
        'supersedes': 'credential-photo-derivatives.json (historical HEIC corrections)',
        'images': entries,
    }
    MANIFEST.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    for entry in entries:
        print(entry['id'], entry['dimensions'], entry['fullBytes'], entry['thumbnailBytes'])


if __name__ == '__main__':
    main()
