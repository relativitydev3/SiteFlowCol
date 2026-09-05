"""Genera la imagen Open Graph desde los assets reales de SiteFlow."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont, ImageOps


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "assets" / "frames" / "siteflow" / "siteflow-001.webp"
OUTPUT = ROOT / "og-image.png"
FONT_DIR = Path("C:/Windows/Fonts")


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(FONT_DIR / name, size)


with Image.open(SOURCE) as source:
    background = ImageOps.fit(source.convert("RGB"), (1200, 630), Image.Resampling.LANCZOS)

background = ImageEnhance.Brightness(background).enhance(0.42)
overlay = Image.new("RGBA", background.size, (0, 0, 0, 0))
draw = ImageDraw.Draw(overlay)
draw.rectangle((0, 0, 760, 630), fill=(0, 0, 0, 125))
draw.text((64, 58), "SITEFLOWCOL /", font=font("arialbd.ttf", 25), fill="#FFFFFF")
draw.text((64, 226), "TU NEGOCIO MERECE", font=font("arialbd.ttf", 58), fill="#FFFFFF")
draw.text((64, 294), "UNA WEB QUE VENDA", font=font("arialbd.ttf", 58), fill="#FFFFFF")
draw.text((64, 362), "POR TI.", font=font("arialbd.ttf", 58), fill="#FFFFFF")
draw.text((67, 500), "DISEÑO · HOSTING · DOMINIO · MANTENIMIENTO", font=font("arial.ttf", 18), fill="#B8B8B8")

Image.alpha_composite(background.convert("RGBA"), overlay).convert("RGB").save(
    OUTPUT,
    "PNG",
    optimize=True,
)
print(OUTPUT)
