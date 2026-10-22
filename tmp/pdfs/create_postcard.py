from pathlib import Path
import math
import random
import sys

sys.path.insert(0, r'C:\Users\david\AppData\Local\Temp\codex-qr-cumple-tools')
import qrcode
from PIL import Image
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor, Color
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.lib.pagesizes import A4

ROOT = Path(__file__).resolve().parents[2]
OUT = ROOT / 'output' / 'pdf'
OUT.mkdir(parents=True, exist_ok=True)
URL = 'https://uo289792.github.io/cumple-gade/'
W, H = 148 * mm, 105 * mm
CREAM = HexColor('#F3E6C8')
GOLD = HexColor('#D5AC62')
PINE = HexColor('#17372E')
INK = HexColor('#35261E')

for name, file in [('Story', 'georgia.ttf'), ('StoryItalic', 'georgiai.ttf'), ('Sans', 'calibri.ttf'), ('Hand', 'Gabriola.ttf')]:
    pdfmetrics.registerFont(TTFont(name, str(Path(r'C:\Windows\Fonts') / file)))

qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_Q, border=4)
qr.add_data(URL)
qr.make(fit=True)
matrix = qr.get_matrix()
forest = Image.open(ROOT / 'public' / 'images' / 'forest.webp').convert('RGB')
forest_reader = ImageReader(forest)

def tracked(c, text, x, y, size=6.2, spacing=1.5, color=GOLD, centered=False):
    width = pdfmetrics.stringWidth(text, 'Sans', size) + spacing * (len(text) - 1)
    t = c.beginText(x - width / 2 if centered else x, y)
    t.setFont('Sans', size)
    t.setCharSpace(spacing)
    t.setFillColor(color)
    t.textOut(text)
    t.setCharSpace(0)
    c.drawText(t)

def star(c, x, y, radius=3, color=GOLD):
    c.saveState()
    c.setFillColor(color)
    p = c.beginPath()
    for i in range(8):
        angle = math.pi / 2 + i * math.pi / 4
        r = radius if i % 2 == 0 else radius * .25
        px, py = x + math.cos(angle) * r, y + math.sin(angle) * r
        p.moveTo(px, py) if i == 0 else p.lineTo(px, py)
    p.close()
    c.drawPath(p, fill=1, stroke=0)
    c.restoreState()

def compass(c, x, y):
    c.saveState()
    c.setStrokeColor(HexColor('#A5824B'))
    c.setLineWidth(.45)
    c.circle(x, y, 4.5 * mm, stroke=1, fill=0)
    for angle in (0, math.pi / 2, math.pi, 3 * math.pi / 2):
        c.line(x + math.cos(angle) * 3.5 * mm, y + math.sin(angle) * 3.5 * mm,
               x + math.cos(angle) * 5.3 * mm, y + math.sin(angle) * 5.3 * mm)
    star(c, x, y, 3.4 * mm, HexColor('#A5824B'))
    c.restoreState()

def branch(c, x, y, scale=1):
    c.saveState()
    c.translate(x, y)
    c.scale(scale, scale)
    c.setStrokeColor(GOLD)
    c.setFillColor(GOLD)
    c.setLineWidth(.55)
    c.line(0, 0, 20, 29)
    for px, py, direction in [(4, 6, -1), (8, 12, 1), (12, 18, -1), (16, 24, 1)]:
        p = c.beginPath()
        p.moveTo(px, py)
        p.curveTo(px + direction * 12, py + 1, px + direction * 10, py + 10, px, py)
        c.drawPath(p, fill=1, stroke=0)
    c.restoreState()

def draw_postcard(c):
    c.saveState()
    clip = c.beginPath()
    clip.rect(0, 0, W, H)
    c.clipPath(clip, stroke=0, fill=0)
    ratio = max(W / forest.width, H / forest.height)
    fw, fh = forest.width * ratio, forest.height * ratio
    c.drawImage(forest_reader, (W - fw) / 2, (H - fh) / 2, width=fw, height=fh)

    # A dark backing keeps the original art visible and print typography readable.
    c.setFillColor(HexColor('#102A29'))
    c.setFillAlpha(.52)
    c.rect(0, 0, 105 * mm, H, fill=1, stroke=0)
    c.setFillAlpha(1)

    # Torn parchment edge; all decorative marks stay outside the QR quiet zone.
    edge = 104 * mm
    rng = random.Random(42)
    p = c.beginPath()
    p.moveTo(W, 0)
    p.lineTo(edge, 0)
    for i in range(1, 80):
        p.lineTo(edge + rng.uniform(-.5, .4) * mm, H * i / 79)
    p.lineTo(W, H)
    p.close()
    c.setFillColor(CREAM)
    c.drawPath(p, stroke=0, fill=1)
    c.setFillColor(Color(.58, .44, .25, alpha=.075))
    for _ in range(370):
        c.circle(rng.uniform(105, 147) * mm, rng.uniform(1, 104) * mm,
                 rng.uniform(.05, .12) * mm, fill=1, stroke=0)

    c.setStrokeColor(GOLD)
    c.setLineWidth(.5)
    c.setStrokeAlpha(.7)
    c.rect(5 * mm, 5 * mm, 94 * mm, 95 * mm, stroke=1, fill=0)
    c.setStrokeAlpha(1)
    tracked(c, 'UN DIARIO EXTRAORDINARIO', 14 * mm, 87 * mm, size=6.1, spacing=1.3)
    c.setFillColor(CREAM)
    c.setFont('Story', 24)
    c.drawString(14 * mm, 73 * mm, 'El misterio de')
    c.drawString(14 * mm, 61 * mm, 'nuestro')
    c.setFillColor(GOLD)
    c.setFont('StoryItalic', 34)
    c.drawString(14 * mm, 46 * mm, 'universo')

    c.setStrokeColor(GOLD)
    c.setLineWidth(.5)
    c.line(14 * mm, 40 * mm, 39 * mm, 40 * mm)
    star(c, 42 * mm, 40 * mm, 2.6)
    c.setFillColor(CREAM)
    c.setFont('Story', 8.5)
    c.drawString(14 * mm, 33 * mm, 'Hay historias que merecen')
    c.drawString(14 * mm, 28.5 * mm, 'su propio universo.')
    c.setFont('StoryItalic', 11)
    c.drawString(14 * mm, 18 * mm, 'Feliz cumpleaños, Gade.')
    c.setFont('Hand', 17)
    c.setFillColor(GOLD)
    c.drawString(14 * mm, 10.5 * mm, 'Con cariño, Javi')
    branch(c, 84 * mm, 10 * mm, .85)
    for x, y, r in [(86, 86, 3), (93, 76, 2), (81, 92, 2), (91, 33, 2.6)]:
        star(c, x * mm, y * mm, r)

    middle = 126 * mm
    compass(c, middle, 93 * mm)
    tracked(c, 'PARA', middle, 82 * mm, size=6.4, spacing=2.3, color=HexColor('#8D7049'), centered=True)
    c.setFont('StoryItalic', 25)
    c.setFillColor(INK)
    c.drawCentredString(middle, 70 * mm, 'Gade')
    c.setStrokeColor(HexColor('#B99B64'))
    c.setLineWidth(.5)
    c.line(117 * mm, 65 * mm, 135 * mm, 65 * mm)
    c.setFont('Story', 9)
    c.drawCentredString(middle, 59 * mm, 'Abre el diario.')

    qx, qy, side = 110 * mm, 23 * mm, 32 * mm
    c.setFillColor(HexColor('#FFFFFF'))
    c.setStrokeColor(HexColor('#B99B64'))
    c.setLineWidth(.45)
    c.roundRect(qx - 1 * mm, qy - 1 * mm, side + 2 * mm, side + 2 * mm,
                1.1 * mm, fill=1, stroke=1)
    pitch = side / len(matrix)
    c.setFillColor(PINE)
    for row, modules in enumerate(matrix):
        for col, dark in enumerate(modules):
            if dark:
                c.rect(qx + col * pitch, qy + (len(matrix) - row - 1) * pitch,
                       pitch + .01, pitch + .01, stroke=0, fill=1)
    c.linkURL(URL, (qx, qy, qx + side, qy + side), relative=0, thickness=0)
    tracked(c, 'ESCANEA Y ENTRA', middle, 17 * mm, size=6.1, spacing=.9,
            color=HexColor('#82653F'), centered=True)
    c.setFont('StoryItalic', 7)
    c.setFillColor(HexColor('#82653F'))
    c.drawCentredString(middle, 10 * mm, 'Un universo creado para ti.')
    c.restoreState()

def metadata(c):
    c.setTitle('Postal para Gade - El misterio de nuestro universo')
    c.setAuthor('Javi')
    c.setSubject('Postal de cumpleaños con QR a la aventura de Gade')

a6 = canvas.Canvas(str(OUT / 'postal-gade-A6.pdf'), pagesize=(W, H), pageCompression=1)
metadata(a6)
draw_postcard(a6)
a6.showPage()
a6.save()

a4 = canvas.Canvas(str(OUT / 'postal-gade-A4-imprimir.pdf'), pagesize=A4, pageCompression=1)
metadata(a4)
x, y = (A4[0] - W) / 2, (A4[1] - H) / 2
a4.saveState()
a4.translate(x, y)
draw_postcard(a4)
a4.restoreState()
a4.setStrokeColor(HexColor('#7A786E'))
a4.setLineWidth(.35)
gap, length = 2 * mm, 4 * mm
for cx, cy, dx, dy in [(x, y, -1, -1), (x + W, y, 1, -1), (x, y + H, -1, 1), (x + W, y + H, 1, 1)]:
    a4.line(cx + dx * gap, cy, cx + dx * (gap + length), cy)
    a4.line(cx, cy + dy * gap, cx, cy + dy * (gap + length))
a4.setFont('Sans', 9)
a4.setFillColor(HexColor('#787970'))
a4.drawCentredString(A4[0] / 2, y - 15 * mm, 'Imprime al 100 % o «Tamaño real». Recorta por las marcas.')
a4.setFont('Sans', 8)
a4.drawCentredString(A4[0] / 2, y - 20 * mm, 'Postal A6: 148 × 105 mm. Papel mate de 200-250 g/m².')
a4.showPage()
a4.save()
print(OUT / 'postal-gade-A6.pdf')
print(OUT / 'postal-gade-A4-imprimir.pdf')
