# SNS共有用画像とメタデータ

数学実験室とビジュアライザーの入口へ、OGPと`summary_large_image`カード用のメタデータを静的HTMLで設定しています。

- [数学実験室の画像](lab-v1.5.8.0-og-v1.png) / [編集用SVG](lab-v1.5.8.0-og-v1.svg)
- [ビジュアライザーの画像](atlas-v1.5.8.4-og-v1.png) / [編集用SVG](atlas-v1.5.8.4-og-v1.svg)

PNGは各1200×630ピクセルです。画像URLは絶対HTTPSとし、寸法・MIMEタイプ・代替文も指定しています。SVGは編集用で、SNSへ指定する画像にはPNGを使用します。

## 共有するURL

- 数学実験室： https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/lab/
- 実験室の版を固定： https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/lab/v1.5.8.0/
- ビジュアライザー： https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/

実験室の通常URLは版付きURLへ移動するため、その両方のHTMLへメタデータを配置しています。各ページのcanonical／og:urlはそのページ自身のURLです。計算結果をSNSへ送信する機能ではなく、ページを紹介するための静的な画像です。

SNS側の画像取得・キャッシュ・表示設定により、表示まで時間がかかったり、切り抜き方が異なったりします。既存の投稿のプレビューが直ちに更新されるとは限りません。画像を変更する際は画像名の末尾`og-v1`を`og-v2`などへ増やし、HTMLの画像URLと配布対象も更新します。

## 再生成

作業元のルートから`python3 scripts/build-social-cards.py`を実行します。Pillow、macOSのArial・Georgia、および同梱済みポスターのNoto Sans JP／DejaVu Sansを使用します。SVGは文字と図形を保持しており、編集ソフトで扱えます。

仕様：[Open Graph protocol](https://ogp.me/)。
