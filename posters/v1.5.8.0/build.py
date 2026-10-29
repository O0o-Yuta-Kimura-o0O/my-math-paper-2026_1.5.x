"""Rebuild two editable A2 vector posters. Run from the project root."""
from pathlib import Path
import base64, html, json
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.colors import HexColor
ROOT=Path(__file__).resolve().parents[2]
OUT=Path(__file__).resolve().parent
FONTS={
 'sans':('/System/Library/Fonts/Supplemental/Arial.ttf','Arial'),
 'bold':('/System/Library/Fonts/Supplemental/Arial Bold.ttf','Arial'),
 'serif':('/System/Library/Fonts/Supplemental/Georgia.ttf','Georgia'),
 'math':(str(OUT/'fonts/DejaVuSans.ttf'),'DejaVu Sans'),
 'mono':(str(OUT/'fonts/LiberationMono-Regular.ttf'),'Liberation Mono'),
 'ja':(str(OUT/'fonts/NotoSansJP-Regular.ttf'),'Noto Sans JP'),
 'jabold':(str(OUT/'fonts/NotoSansJP-Bold.ttf'),'Noto Sans JP'),
}
for key,(path,_) in FONTS.items():pdfmetrics.registerFont(TTFont(key,path))
W,H=840,1188
SCALE=420/840*72/25.4
COL={'bg':'#F5F3EC','ink':'#1C3633','muted':'#6C7C75','line':'#C9D0C6','accent':'#BC5137','faint':'#E4E8DE'}
records=[]
class Page:
 def __init__(self,lang):
  self.lang=lang;self.name=f'f-generative-number-construction_{lang}_v1.5.8.0'
  self.c=canvas.Canvas(str(OUT/(self.name+'.pdf')),pagesize=(W*SCALE,H*SCALE),pageCompression=1)
  self.c.setTitle(('数を、組み立てる。' if lang=='ja' else 'Numbers, constructed.')+' | Paper v1.5.8')
  self.c.setAuthor('Yuta Kimura');self.c.setSubject('Natural numbers to generative quaternions; f-generative system v1.5.8')
  self.c.scale(SCALE,SCALE);self.svg=[];self.texts=[]
  self.rect(0,0,W,H,'bg')
 def rect(self,x,y,w,h,color):
  self.c.setFillColor(HexColor(COL[color]));self.c.rect(x,H-y-h,w,h,stroke=0,fill=1)
  self.svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{COL[color]}"/>')
 def line(self,x1,y1,x2,y2,color='line',width=.7):
  self.c.setStrokeColor(HexColor(COL[color]));self.c.setLineWidth(width);self.c.line(x1,H-y1,x2,H-y2)
  self.svg.append(f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{COL[color]}" stroke-width="{width}" fill="none"/>')
 def circle(self,x,y,r,color='accent',fill=True):
  self.c.setStrokeColor(HexColor(COL[color]));self.c.setFillColor(HexColor(COL[color]));self.c.setLineWidth(.8);self.c.circle(x,H-y,r,stroke=not fill,fill=fill)
  self.svg.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{COL[color] if fill else "none"}" stroke="{COL[color]}" stroke-width=".8"/>')
 def text(self,x,y,s,size=12,font='sans',color='ink',maxwidth=None):
  width=pdfmetrics.stringWidth(s,font,size)
  if maxwidth:assert width<=maxwidth,(s,width,maxwidth)
  assert x+width<=W-40,(s,x+width)
  cmap=pdfmetrics.getFont(font).face.charToGlyph
  assert all(ord(c) in cmap or c==' ' for c in s),(font,s,[c for c in s if ord(c) not in cmap])
  self.c.setFillColor(HexColor(COL[color]));self.c.setFont(font,size);self.c.drawString(x,H-y,s)
  family=FONTS[font][1];weight='700' if font in ('bold','jabold') else '400'
  self.svg.append(f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" font-weight="{weight}" fill="{COL[color]}" xml:space="preserve">{html.escape(s)}</text>')
  self.texts.append({'text':s,'font':font,'x':x,'baseline':y,'size':size,'width':width})
 def save(self):
  self.c.showPage();self.c.save()
  # Embed only the freely licensed project fonts used by this edition. Text stays live.
  styles=[]
  for key in sorted({t['font'] for t in self.texts}):
   path,family=FONTS[key]
   if key in ('sans','bold','serif'):continue
   raw=base64.b64encode(Path(path).read_bytes()).decode()
   weight=700 if key=='jabold' else 400
   styles.append(f'@font-face{{font-family:"{family}";font-weight:{weight};src:url(data:font/ttf;base64,{raw}) format("truetype");}}')
  svg='<svg xmlns="http://www.w3.org/2000/svg" width="420mm" height="594mm" viewBox="0 0 840 1188">\n<title>'+html.escape(self.name)+'</title>\n<desc>Editable text and vector geometry. Paper v1.5.8; poster v1.5.8.0.</desc>\n<defs><style>'+''.join(styles)+'</style></defs>\n'+'\n'.join(self.svg)+'\n</svg>\n'
  (OUT/(self.name+'.svg')).write_text(svg)
  records.append({'language':self.lang,'pdf':self.name+'.pdf','svg':self.name+'.svg','textObjects':len(self.texts),'allTextBoundsChecked':True,'allGlyphsAvailable':True})

def draw(lang):
 p=Page(lang);ja=lang=='ja';body='ja' if ja else 'sans';bold='jabold' if ja else 'bold'
 p.rect(56,43,27,4,'accent')
 p.text(95,49,'THE f-GENERATIVE SYSTEM',10,'sans','muted')
 p.text(648,49,'PAPER  v1.5.8',11,'bold','accent')
 p.text(54,126,'数を、' if ja else 'Numbers,',58 if ja else 68,bold)
 p.text(54,200,'組み立てる。' if ja else 'constructed.',58 if ja else 68,bold)
 # Abstract construction tree: deliberately a syntax tree, not a geometric model of the fields.
 for a,b in [((683,112),(632,162)),((683,112),(734,162)),((632,162),(609,202)),((632,162),(655,202)),((734,162),(713,202)),((734,162),(755,202))]:p.line(*a,*b,'line',1)
 for x,y,r,c in [(683,112,8,'accent'),(632,162,6,'ink'),(734,162,6,'ink'),(609,202,3,'muted'),(655,202,3,'muted'),(713,202,3,'muted'),(755,202,3,'muted')]:p.circle(x,y,r,c)
 p.text(667,93,'f',29,'serif','ink')
 p.text(56,240,'自然数から生成四元数へ' if ja else 'FROM NATURAL NUMBERS TO GENERATIVE QUATERNIONS',13 if ja else 10,body if ja else 'sans','muted')
 p.line(56,263,784,263)
 p.text(56,291,'同じ有限構文から、必要な数と演算を増やしていく。' if ja else 'One finite syntax. More numbers, with explicit rules at every step.',13,body,'ink')
 labels_ja=['自然数','整数','有理数','関係子ラベルの一次表示','M多項式','有限有理式数','生成複素数','生成四元数']
 labels_en=['Natural numbers','Signed integers','Rational numbers','Linear relation labels','M-polynomials','Finite rational-expression numbers','Generative complex numbers','Generative quaternions']
 symbols=['N','Z','Q','L','M','F','C','H']
 forms=['0 = f()     S(n) = f(n)','(s, n),   n ∈ N','p / q,   p, q ∈ Z,   q > 0','(k, a) ↦ a + kε','P(ε) = a₀ + a₁ε + ··· + aₙεⁿ','P(ε) / Q(ε),   Q ≠ 0',None,'(z, w) ↦ z + wj']
 sub_ja=['f()  →  f(f())  →  f(f(f()))','s は正側または負側。零の符号は正側に統一。','既約化し、零は 0/1 に正規化。','k ∈ Z, a ∈ Q;    q## = (2, q) ↦ q + 2ε','係数は有理数。有限列で保持し、末尾の零を除く。','P, Q ∈ M;    P/Q = R/S  ⇔  PS = RQ','a, b ∈ Fε;    i = J(0, 1),    i² = −1','z = J(a, b), w = J(c, d);    a, b, c, d ∈ Fε']
 sub_en=['f()  →  f(f())  →  f(f(f()))','s is positive or negative; zero has positive sign.','Reduce fractions; normalize zero to 0/1.','k ∈ Z, a ∈ Q;    q## = (2, q) ↦ q + 2ε','Finite rational coefficient list; trim trailing zeros.','P, Q ∈ M;    P/Q = R/S  ⇔  PS = RQ','a, b ∈ Fε;    i = J(0, 1),    i² = −1','z = J(a, b), w = J(c, d);    a, b, c, d ∈ Fε']
 notes_ja=[['基底と後続。','λ実行にはChurch表示。'],['符号と大きさを','対にする。'],['整数の比から','順序体を構成する。'],['k は関係子の個数。','再帰回数とは異なる。'],['係数の位置が','ε の次数を表す。'],['0 < ε < r','任意の正有理数 r に対して。'],['二つの係数を','行列として組む。'],['j² = −1','ij = k,  ji = −k']]
 notes_en=[['Base and successor.','Church encoding for λ.'],['Pair a sign','with a magnitude.'],['Integer ratios form','an ordered field.'],['k counts relation operators,','not recursion steps.'],['Coefficient positions','encode powers of ε.'],['0 < ε < r','for every positive rational r.'],['Two coefficients,','one structured matrix.'],['j² = −1','ij = k,  ji = −k']]
 for i,sym in enumerate(symbols):
  y=321+i*84
  p.text(56,y+29,f'{i+1:02}',10,'sans','accent')
  p.text(103,y+46,sym,42,'serif')
  if i>=5:p.text(140,y+51,'ε',17,'math','accent')
  p.text(218,y+18,(labels_ja if ja else labels_en)[i],15 if ja else 14,bold)
  if i!=6:p.text(218,y+45,forms[i],17 if i!=4 else 16,'math',maxwidth=382)
  else:
   p.text(218,y+46,'J(a, b) =',17,'math')
   for x,sgn in [(324,1),(421,-1)]:
    p.line(x+sgn*5,y+23,x,y+23,'ink',1);p.line(x,y+23,x,y+57,'ink',1);p.line(x,y+57,x+sgn*5,y+57,'ink',1)
   for x,yy,t in [(343,y+36,'a'),(384,y+36,'−b'),(343,y+53,'b'),(384,y+53,'a')]:p.text(x,yy,t,15,'math')
  sub=(sub_ja if ja else sub_en)[i]
  p.text(218,y+68,sub,10.2,'math' if i in (0,3,5,6,7) else body,'muted',maxwidth=390)
  for j,t in enumerate((notes_ja if ja else notes_en)[i]):
   p.text(625,y+31+j*17,t,10.2,'math' if (i==5 and j==0) or i==7 or (not ja and 'λ' in t) or (not ja and 'ε' in t) else body,'muted',maxwidth=160)
  if i<7:p.line(56,y+81,784,y+81)
 # Shared syntax and the exact semantic qualification are part of the poster, not small-print claims.
 p.line(56,1010,784,1010,'ink',1)
 p.text(56,1038,'共通の構文' if ja else 'COMMON SYNTAX',10,body if ja else 'bold','accent')
 p.text(218,1040,'U := f() | f(U) | f(UU)',19,'mono')
 p.text(218,1062,'(u, v) ↦ f(E(u)E(v))',13,'math')
 p.text(56,1097,'型を指定して読む。演算と等値の規則は、型ごとに明示する。' if ja else 'Read at a specified type. Operations and equality have explicit, type-specific rules.',11,body,'muted',maxwidth=728)
 p.line(56,1125,784,1125)
 p.text(56,1150,'木村祐太 / f生成体系' if ja else 'YUTA KIMURA / THE f-GENERATIVE SYSTEM',9,body,'muted')
 p.text(56,1167,'論文 v1.5.8・第2-8節 / E は共通構文への符号化。' if ja else 'Paper v1.5.8, Sections 2-8 / E encodes into the common syntax.',8.5,body,'muted')
 p.text(621,1150,'POSTER  v1.5.8.0',9,'sans','muted')
 p.text(621,1167,'A2 / 420 × 594 mm',9,'math','muted')
 p.save()
for lang in ('en','ja'):draw(lang)
(OUT/'build-report.json').write_text(json.dumps({'paperVersion':'1.5.8','posterVersion':'1.5.8.0','pageSizeMM':[420,594],'editions':records},ensure_ascii=False,indent=2)+'\n')
print(json.dumps(records,ensure_ascii=False))
