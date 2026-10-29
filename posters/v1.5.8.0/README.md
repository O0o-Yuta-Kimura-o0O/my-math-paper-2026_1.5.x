# 数の構成ポスター / Number construction posters

論文 **v1.5.8** に基づく、ポスター **v1.5.8.0**（2026-10-30）。日英それぞれA2縦・1ページです。A3などへの縮小印刷も可能です。

| 言語 | PDF | 編集用SVG | プレビュー |
|---|---|---|---|
| 日本語 | [PDF](f-generative-number-construction_ja_v1.5.8.0.pdf) | [SVG](f-generative-number-construction_ja_v1.5.8.0.svg) | [PNG](preview-ja.png) |
| English | [PDF](f-generative-number-construction_en_v1.5.8.0.pdf) | [SVG](f-generative-number-construction_en_v1.5.8.0.svg) | [PNG](preview-en.png) |

## 編集する

SVGは文字を`text`、線や図形をベクター要素として保持しています。Illustrator、Inkscape等で編集できます。画像として貼り付けるのではなく、SVG自体を開いてください。文字はアウトライン化していません。図形は必要に応じてパスを直接編集できます。

PDFもラスタ画像を含まず、文字と図形をベクターで保存し、使用文字のフォントを埋め込んでいます。PDF対応の編集ソフトで扱えますが、文章の追加・差し替えにはSVGを推奨します。PDFの埋込みフォントは使用文字のサブセットのため、新しい文字の追加にはフォントのインストールが必要になる場合があります。

SVGにはNoto Sans JP、DejaVu Sans、Liberation Monoを埋め込んでいます。編集ソフトによってSVG内の埋込みフォントを使わない場合は、`fonts`内のTTFをインストールしてください。各フォントのライセンスも同梱しています。欧文にはArialとGeorgiaも使用しています。これらのフォントファイルは同梱していません。利用環境にない場合は対応するフォントを用意するか、編集ソフトで代替してください。

PNGは閲覧用のプレビューです。編集・印刷にはPDFまたはSVGを使用してください。

## 内容の範囲

自然数、整数、有理数、関係子ラベルの一次表示L、M多項式、有限有理式数Fε、生成複素数Cε、生成四元数Hεを構成順に示します。この並びは、全段階が同じ種類の体であるという意味ではありません。Lは加法群、Mは多項式環であり、それぞれの型に適した規則で読みます。

式は論文の表示を読みやすく要約したものです。Mの次数にはnを用い、次数零などでは対応する有限列へ読み替えます。Fεの分数の等値は交差積で定めます。生成複素数の行列配置を保持し、生成四元数はその対と共役を含む乗法規則による構成です。紙面ではj²=-1、ij=k、ji=-kを表示し、一般の乗法公式は省略しています。右上の樹形は有限構文の模式図です。

参照：[日本語論文](../../manuscripts/A_New_Foundation_of_Mathematics_ja_v1.5.8.md) / [English manuscript](../../manuscripts/A_New_Foundation_of_Mathematics_en_v1.5.8.md)、第2-8節。

## 再生成

`build.py`はPythonとReportLabを使い、同じ配置からPDFとSVGを生成します。macOSのArial・Georgiaと、同梱の`fonts`を参照します。他のOSでは先頭のフォントパスを変更してください。プレビューPNGと検査記録はPDFのレンダリング・内容検査によって別途作成しています。

## English editing notes

Each edition is a one-page A2 portrait poster. Use SVG for text and vector editing; all 78 text objects remain editable. The PDFs contain embedded subset fonts and vector geometry, with no raster images. Install the supplied open fonts if your editor ignores embedded SVG fonts. Arial and Georgia are also used but are not redistributed. Preview PNGs are for viewing only. The accompanying source script targets macOS font paths and requires ReportLab.
