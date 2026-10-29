"""Archive user-supplied hero photos and encode responsive copies without cropping."""
import json
from pathlib import Path
import shutil
import subprocess

ROOT = Path(__file__).resolve().parents[1]
output = ROOT / 'public/img/hero'
output.mkdir(parents=True, exist_ok=True)

for item in json.loads((ROOT / 'references/hero-photo-sources.json').read_text()):
    original = ROOT / item['original']
    original.parent.mkdir(parents=True, exist_ok=True)
    if not original.exists():
        shutil.copyfile(item['source'], original)
    for width in (480, 960):
        subprocess.run([
            'cwebp', '-quiet', '-q', '85', '-resize', str(width), '0',
            str(original), '-o', str(output / f"{item['id']}-{width}.webp"),
        ], check=True)

print('5 originali conservati; 10 WebP responsive per la sola hero.')
