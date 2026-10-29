"""Prepare faithful website derivatives of the supplied credential photographs.

No generative reconstruction, inpainting, text replacement, or signature changes.
Rectification resamples original image pixels; tonal adjustments are global.
HEIC-to-PNG conversion is handled externally by macOS sips. Temporary PNG inputs
must preserve their EXIF orientation, which is applied before corner coordinates.
Run with the bundled Python (Pillow and NumPy) and --input-dir PATH.
"""
from __future__ import annotations

import argparse
import hashlib
import io
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageCms, ImageEnhance, ImageOps

ROOT = Path(__file__).resolve().parents[2]
OUTPUT = ROOT / 'Sito/public/documents/competencies'
MANIFEST = ROOT / 'Sito/references/credential-photo-derivatives.json'

# Corners are visually checked in the oriented image, expressed on a 1824 px
# long-edge reference. Order: top-left, top-right, bottom-right, bottom-left.
PHOTOS = [
    {
        'source': 'IMG_1105', 'output': 'posaclima-gionatan',
        'referenceSize': [1824, 1368],
        'corners': [[39, 88], [1785, 125], [1711, 1203], [177, 1314]],
        'size': [2400, 1697], 'brightness': 1.04, 'contrast': 1.02,
        'note': 'Internal paper edges; the frame and surrounding room are excluded. Small glare spots remain.',
    },
    {
        'source': 'IMG_1106', 'output': 'posaclima-emanuele',
        'referenceSize': [1824, 1368],
        'corners': [[123, 134], [1790, 249], [1627, 1232], [209, 1257]],
        'size': [2400, 1697], 'brightness': 1.05, 'contrast': 1.02,
        'note': 'Internal paper edges; original reflections on blank paper remain.',
    },
    {
        'source': 'IMG_1107', 'output': 'installation-emanuele',
        'referenceSize': [1368, 1824],
        'corners': [[63, 34], [1318, 36], [1235, 1685], [206, 1698]],
        'size': [1697, 2400], 'brightness': 1.09, 'contrast': 1.02,
        'note': 'Internal paper edges. Strong original reflected shadows and lights remain; no letters or signatures have been reconstructed.',
    },
    {
        'source': 'IMG_1108', 'output': 'installation-gionatan',
        'referenceSize': [1368, 1824],
        'corners': [[0, 141], [1262, 128], [1124, 1706], [175, 1697]],
        'size': [1697, 2400], 'brightness': 1.04, 'contrast': 1.02,
        'note': 'Visible internal paper edges; top-left edge is partially outside the original photograph and has not been reconstructed. Reflections remain.',
    },
    {
        'source': 'IMG_1109', 'output': 'cosmet-top-partner',
        'referenceSize': [1368, 1824],
        'corners': [[0, 198], [1318, 231], [1292, 1601], [0, 1645]],
        'size': [2112, 2400], 'brightness': 1.05, 'contrast': 1.04,
        'note': 'Plaque face with its existing border. The original photograph already clips the left border; no missing border or reflected text is reconstructed. Transparent support below the plaque is excluded.',
    },
]


def perspective_coefficients(source: np.ndarray, width: int, height: int) -> list[float]:
    target = [(0, 0), (width - 1, 0), (width - 1, height - 1), (0, height - 1)]
    matrix, values = [], []
    for (x, y), (u, v) in zip(target, source):
        matrix.append([x, y, 1, 0, 0, 0, -u * x, -u * y])
        matrix.append([0, 0, 0, x, y, 1, -v * x, -v * y])
        values.extend([u, v])
    return np.linalg.solve(np.array(matrix, dtype=float), np.array(values, dtype=float)).tolist()


def prepare(input_dir: Path, selected: set[str]) -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    entries = []
    srgb = ImageCms.createProfile('sRGB')
    for item in PHOTOS:
        if selected and item['source'] not in selected:
            continue
        input_path = input_dir / (item['source'] + '.png')
        original_path = ROOT / 'Attestati' / (item['source'] + '.HEIC')
        with Image.open(input_path) as raw:
            image = ImageOps.exif_transpose(raw).convert('RGB')
            icc = raw.info.get('icc_profile')
            if icc:
                image = ImageCms.profileToProfile(
                    image, ImageCms.ImageCmsProfile(io.BytesIO(icc)), srgb,
                    outputMode='RGB',
                )
            reference = np.array(item['referenceSize'], dtype=float)
            corners = np.array(item['corners'], dtype=float) * np.array(image.size) / reference
            size = tuple(item['size'])
            corrected = image.transform(
                size, Image.Transform.PERSPECTIVE,
                perspective_coefficients(corners, *size),
                resample=Image.Resampling.BICUBIC,
            )
            corrected = ImageEnhance.Brightness(corrected).enhance(item['brightness'])
            corrected = ImageEnhance.Contrast(corrected).enhance(item['contrast'])
            target = OUTPUT / (item['output'] + '.webp')
            corrected.save(target, 'WEBP', quality=95, method=6)
            thumbnail = corrected.copy()
            thumbnail.thumbnail((640, 640), Image.Resampling.LANCZOS)
            thumb_path = OUTPUT / (item['output'] + '-thumb.webp')
            thumbnail.save(thumb_path, 'WEBP', quality=85, method=6)
            entry = {
                **item,
                'sourcePath': str(original_path.relative_to(ROOT)),
                'sourceSha256': hashlib.sha256(original_path.read_bytes()).hexdigest(),
                'orientedSourceSize': list(image.size),
                'pixelCorners': corners.tolist(),
                'fullPath': str(target.relative_to(ROOT)),
                'thumbnailPath': str(thumb_path.relative_to(ROOT)),
                'thumbnailSize': list(thumbnail.size),
                'fullBytes': target.stat().st_size,
                'thumbnailBytes': thumb_path.stat().st_size,
            }
            entries.append(entry)
            print(item['output'], size, thumbnail.size, target.stat().st_size)
    previous = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {'method': 'Perspective rectification and global tonal correction using original pixels. No AI reconstruction or local inpainting.', 'images': []}
    updated_ids = {item['source'] for item in entries}
    previous['images'] = [item for item in previous['images'] if item['source'] not in updated_ids] + entries
    previous['reviewedOn'] = '2026-10-29'
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    MANIFEST.write_text(json.dumps(previous, ensure_ascii=False, indent=2) + '\n')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--input-dir', type=Path, required=True)
    parser.add_argument('--only', nargs='*', default=[])
    arguments = parser.parse_args()
    prepare(arguments.input_dir, set(arguments.only))
