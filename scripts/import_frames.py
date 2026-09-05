"""Importa, ordena y optimiza la secuencia de SiteFlow para producción."""

from __future__ import annotations

import re
import shutil
import sys
import tempfile
from pathlib import Path

from PIL import Image


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DEFAULT_SOURCE = Path.home() / "Desktop" / "frames"
DESTINATION = PROJECT_ROOT / "assets" / "frames" / "siteflow"
MANIFEST = PROJECT_ROOT / "frame-manifest.js"
SUPPORTED = {".png", ".jpg", ".jpeg", ".webp"}


def frame_number(path: Path) -> int:
    match = re.search(r"\d+", path.stem)
    return int(match.group()) if match else sys.maxsize


def main() -> None:
    source = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else DEFAULT_SOURCE
    if not source.is_dir():
        raise SystemExit(f"No existe la carpeta de frames: {source}")

    frames = sorted(
        (path for path in source.iterdir() if path.is_file() and path.suffix.lower() in SUPPORTED),
        key=lambda path: (frame_number(path), path.name),
    )
    if not frames:
        raise SystemExit("La carpeta no contiene imágenes compatibles.")

    dimensions: set[tuple[int, int]] = set()
    for path in frames:
        with Image.open(path) as image:
            dimensions.add(image.size)
    if len(dimensions) != 1:
        raise SystemExit(f"Los frames no comparten dimensiones: {sorted(dimensions)}")

    numbers = [frame_number(path) for path in frames]
    expected = list(range(numbers[0], numbers[-1] + 1))
    if numbers != expected:
        missing = sorted(set(expected) - set(numbers))
        raise SystemExit(f"La secuencia tiene números faltantes: {missing}")

    source_size = sum(path.stat().st_size for path in frames)
    same_directory = source == DESTINATION.resolve()
    output_directory = (
        Path(tempfile.mkdtemp(prefix="siteflow-frames-", dir=PROJECT_ROOT))
        if same_directory
        else DESTINATION
    )
    output_directory.mkdir(parents=True, exist_ok=True)
    for existing in output_directory.iterdir():
        if existing.is_file():
            existing.unlink()
        elif existing.is_dir():
            shutil.rmtree(existing)

    output_names: list[str] = []
    for index, source_path in enumerate(frames, start=1):
        output_name = f"siteflow-{index:03d}.webp"
        output_path = output_directory / output_name
        with Image.open(source_path) as image:
            image.convert("RGB").save(
                output_path,
                "WEBP",
                quality=88,
                method=6,
                exact=True,
            )
        output_names.append(output_name)

    if same_directory:
        for existing in DESTINATION.iterdir():
            if existing.is_file():
                existing.unlink()
            elif existing.is_dir():
                shutil.rmtree(existing)
        for optimized in output_directory.iterdir():
            shutil.move(str(optimized), DESTINATION / optimized.name)
        output_directory.rmdir()

    entries = ",\n".join(f"    '{name}'" for name in output_names)
    MANIFEST.write_text(
        "/* Archivo generado por scripts/import_frames.py. */\n"
        "window.SITEFLOW_FRAME_SEQUENCE = Object.freeze({\n"
        "  basePath: 'assets/frames/siteflow/',\n"
        "  files: [\n"
        f"{entries}\n"
        "  ]\n"
        "});\n",
        encoding="utf-8",
    )

    output_size = sum((DESTINATION / name).stat().st_size for name in output_names)
    width, height = dimensions.pop()
    print(f"Frames: {len(frames)}")
    print(f"Dimensiones: {width}x{height}")
    print(f"Origen: {source_size / 1024 / 1024:.2f} MB")
    print(f"Optimizado: {output_size / 1024 / 1024:.2f} MB")
    print(f"Destino: {DESTINATION}")


if __name__ == "__main__":
    main()
