"""Generate editable SVG and 1200x630 PNG social cards; run from project root."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import html,math
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'docs/social';OUT.mkdir(exist_ok=True)
COL={'bg':'#F4F2EB','ink':'#203A35','muted':'#687B72','line':'#C7D0C5','accent':'#B54F38','soft':'#E5EADF'}
fonts={'sans':('/System/Library/Fonts/Supplemental/Arial.ttf','Arial'),'bold':('/System/Library/Fonts/Supplemental/Arial Bold.ttf','Arial'),'serif':('/System/Library/Fonts/Supplemental/Georgia.ttf','Georgia'),'math':(str(ROOT/'posters/v1.5.8.0/fonts/DejaVuSans.ttf'),'DejaVu Sans'),'ja':(str(ROOT/'posters/v1.5.8.0/fonts/NotoSansJP-Regular.ttf'),'Noto Sans JP'),'jabold':(str(ROOT/'posters/v1.5.8.0/fonts/NotoSansJP-Bold.ttf'),'Noto Sans JP')}
class Card:
 def __init__(self):self.im=Image.new('RGB',(2400,1260),COL['bg']);self.d=ImageDraw.Draw(self.im);self.svg=[]
 def text(self,x,y,text,size,font='sans',color='ink'):
  f=ImageFont.truetype(fonts[font][0],size*2)
  width=self.d.textlength(text,font=f)/2;assert x+width<=1140,(text,width)
  self.d.text((x*2,y*2),text,font=f,fill=COL[color],anchor='ls')
  weight=700 if font in ('bold','jabold') else 400
  self.svg.append(f'<text x="{x}" y="{y}" font-size="{size}" font-family="{fonts[font][1]}" font-weight="{weight}" fill="{COL[color]}">{html.escape(text)}</text>')
 def line(self,x1,y1,x2,y2,color='line',w=1):
  self.d.line((x1*2,y1*2,x2*2,y2*2),fill=COL[color],width=w*2);self.svg.append(f'<path d="M{x1} {y1} L{x2} {y2}" stroke="{COL[color]}" stroke-width="{w}" fill="none"/>')
 def circle(self,x,y,r,color='ink',fill=False):
  self.d.ellipse(((x-r)*2,(y-r)*2,(x+r)*2,(y+r)*2),fill=COL[color] if fill else COL['bg'],outline=COL[color],width=2)
  self.svg.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{COL[color] if fill else COL["bg"]}" stroke="{COL[color]}"/>')
 def save(self,name,title):
  self.im.resize((1200,630),Image.Resampling.LANCZOS).save(OUT/(name+'.png'),optimize=True)
  (OUT/(name+'.svg')).write_text('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><title>'+html.escape(title)+'</title><rect width="1200" height="630" fill="'+COL['bg']+'"/>'+''.join(self.svg)+'</svg>\n')
for kind,title,version,lines in [('lab','f-Generative Lab','1.5.8.0',['無限小を、','計算する。']),('atlas','f-Generative Atlas','1.5.8.4',['数の構成を、','見渡す。'])]:
 c=Card();c.line(64,63,100,63,'accent',4);c.text(118,70,'THE f-GENERATIVE SYSTEM',16,'sans','muted');c.text(64,143,title,39,'bold')
 c.text(62,261,lines[0],66,'jabold');c.text(62,347,lines[1],66,'jabold')
 c.text(66,405,'有限の構成から、数と演算をたどる。',23,'ja','muted')
 if kind=='lab':
  c.line(762,178,762,415,'line',1);c.text(817,217,'EXACT ARITHMETIC',14,'sans','muted')
  c.text(812,306,'6 + ε',65,'math');c.line(816,338,1110,338,'line',1)
  c.text(818,372,'STANDARD PART',12,'sans','muted');c.text(818,413,'6',32,'math')
  c.text(982,372,'RESIDUAL',12,'sans','muted');c.text(982,413,'ε',32,'math','accent')
  tags='CALCULATE  /  INSPECT  /  RECHECK'
 else:
  coords=[(815,208),(925,172),(1055,227),(798,330),(930,307),(1070,366),(830,419),(965,421)]
  for a,b in [(0,1),(1,2),(0,3),(1,4),(2,5),(3,4),(4,5),(3,6),(4,7),(5,7),(6,7)]:c.line(*coords[a],*coords[b],'line',1)
  for i,((x,y),label) in enumerate(zip(coords,['N','Z','Q','L','M','Fε','Cε','Hε'])):
   c.circle(x,y,30,'accent' if i==7 else 'ink');c.text(x-(18 if i>4 else 11),y+8,label,24,'math','accent' if i==7 else 'ink')
  tags='CONSTRUCT  /  EXPLORE  /  UNDERSTAND'
 c.line(64,478,1136,478,'line',1);c.text(65,517,tags,16,'sans','muted')
 c.text(65,573,'PAPER  v1.5.8',15,'bold','accent');c.text(274,573,('LAB' if kind=='lab' else 'ATLAS')+'  v'+version,15,'sans','muted');c.text(856,573,'YUTA KIMURA',15,'sans','muted')
 c.save(f'{kind}-v{version}-og-v1',title)
print('Generated two 1200x630 PNG cards and editable SVG originals.')
