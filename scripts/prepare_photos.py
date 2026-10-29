"""Copy generated originals and create responsive WebP variants with cwebp."""
import json
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
for item in json.loads((ROOT / 'references/photo-prompts.json').read_text()):
    original = ROOT / 'references/generated' / (item['name'] + '.png')
    original.parent.mkdir(exist_ok=True)
    if not original.exists():
        shutil.copyfile(item['source'], original)
    for width in (640, 1024):
        destination = ROOT / 'public/img/photos' / f"{item['name']}-{width}.webp"
        subprocess.run(['cwebp', '-quiet', '-q', '85', '-resize', str(width), '0', str(original), '-o', str(destination)], check=True)
print('5 originali conservati, 10 fotografie WebP responsive pronte.')
for source, destination, width in [('lge-original.png', 'lge-original.webp', 512), ('lge-horizontal-white.png', 'lge-horizontal-white.webp', 640), ('lge-horizontal-color.png', 'lge-horizontal-color.webp', 640)]:
    subprocess.run(['cwebp', '-quiet', '-lossless', '-resize', str(width), '0', str(ROOT / 'public/img/brand' / source), '-o', str(ROOT / 'public/img/brand' / destination)], check=True)
