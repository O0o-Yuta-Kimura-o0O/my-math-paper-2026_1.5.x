# f-Generative Lab v1.5.8.0

[実験室を開く / Open the laboratory](https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/lab/)

論文v1.5.8に基づく、日英切替付きの小さな数学実験室です。公開版の固定URLは[こちら](https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/lab/v1.5.8.0/)。内部構成にZF/ZFCや選択公理を追加する変更はありません。計算は有理数と有限の多項式処理で行います。

## 初期言語と手動選択

ブラウザの最優先言語が日本語（jaまたはja-*）なら日本語、それ以外はEnglishで開始します。所在地・IP・GPSによる判定や、追加の外部サービスへの照会は行いません。手動で選んだ言語は、このサイトのlocalStorageに言語コードだけを保存し、次回以降優先します。実験室とビジュアライザーで共有されます。ブラウザのサイトデータを削除すると、この記憶も削除されます。

明示した`?lang=ja`／`?lang=en`は保存済みの選択より優先します。手動変更時にはURLもその言語へ更新します。ビジュアライザーのFrançais／中文の手動選択も保持しますが、その言語に未対応の実験室ではEnglishで表示します。localStorageが利用できない場合も画面の切替は動きますが、次回の記憶はできません。

The initial language follows the browser's first preferred language: Japanese for ja/ja-*, English otherwise. A manually chosen language is stored locally and takes precedence on later visits. Explicit URL language parameters override it. No IP lookup, GPS, or external locale service is used.

## できること

1. **無限小計算。** 有理関数R(x)=P(x)/Q(x)と有理点aを指定し、R(a+ε)、R(a)、差商、標準部、厳密な残差とその最小次数を計算します。例えばR(x)=x²、a=3なら差商は6+ε、標準部は6、残差はεです。入力したQ(a)が零なら受理しません。取り除ける穴も、点での値を勝手に定義し直すことはしません。
2. **有限次の展開。** R(ε)を、選んだ次数までの多項式と厳密な残差へ分けます。例えば1/(1−ε)は1+ε+ε²とε³/(1−ε)へ分かれます。有限の恒等式であり、無限回の和を実行する操作ではありません。この画面では有理式を正規化するため、除去可能なε因子は除けますが、1/εのような真の極は拒否します。
3. **図形の向き。** 有理座標の三点A,B,Cと、Cへの摂動±εⁿ(−dy,dx)を指定します。ここで(dx,dy)=B−Aです。元の行列式と摂動後の行列式を別々に求めます。A=Bは拒否します。元の三点が一直線である事実を、摂動後の非零判定で置き換えません。模式図の移動量は表示用であり、厳密なεの値を画面距離に換算したものではありません。
4. **数の構成。** N,Z,Q,L,M,Fε,Cε,Hεの小さい具体例を、型と成分、fのみの記号列でたどれます。生成複素数の行列配置、生成四元数の対の構造も保持します。自然数のf構成子表示とChurch数のλ表現は区別します。

係数は低い次数からカンマで並べます。`1,0,1`は1+x²です。小数近似ではなく、`3`、`-2`、`1/3`のような整数・分数を入力してください。

## 証拠の保存と検査

計算画面の「証拠」ではJSONを保存・読み込み・編集し、再検査できます。「結果を1だけ改変」は、故意に偽の主張を作り、検査器が拒否することを見るための操作です。編集後は未検査の状態へ戻ります。読み込んだJSONの検査は、そのJSONに記録された入力と主張を対象とし、画面上部に表示した計算を置き換えません。

- `core.mjs`は結果と証拠を生成します。計算エンジンは既存のFε実装の複製です。
- `checker.mjs`は生成器・gcd正規化器を呼び直さず、有理係数の有限多項式と交差積、二項展開、標準部、最小非零次数、符号を独自に照合します。
- 生成側はHorner評価、検査側は有限二項展開を使います。共通の有理数算術、BigInt、JavaScript実行環境、検査器の実装は信頼する部分として残ります。
- 受理は記録された有限の主張に対するものです。Fεなどの一般定理、任意の関数の微分、無制限の証明体系を機械形式化した結果ではありません。

「数の構成」は形成・符号化の例です。符号化・復号できることを、算術の一般証明と呼びません。f表示が大きい場合は、展開前に必要な文字数を計算して表示を制限します。省略したプレビューは完全なf式ではありません。

## 実装上の上限

- 入力多項式は次数6以下。各入力有理数の既約な分子の絶対値・分母は1,000,000以下。
- 保持する展開次数は0-5。幾何の摂動次数は1-5。
- 証拠JSONは200,000文字以下。検査用有理文字列は各512文字以下、数値文字列の合計は30,000文字以下、主張の多項式次数は18以下。
- 生成と証拠検査はWeb Workerで実行し、各要求を5秒で打ち切ります。上限到達は、その主張が偽という意味ではなく、この実装・端末では処理を完了しなかったという意味です。
- f全文の表示は16,000文字まで。数学上の文法を制限するものではありません。

グラフ描画に使う係数・座標の近似値は表示専用です。等値・順序・証拠検査に浮動小数を使いません。計算入力・証拠はサーバーへ送信せず、ブラウザ内で処理します。

## ソースとローカル実行

[版付きソース](v1.5.8.0/)にHTML、CSS、ESモジュールを保存しています。外部パッケージ、CDN、バックエンドは不要です。モジュールとWorkerを使うため、ファイルをダブルクリックする代わりにHTTPで配信してください。リポジトリのルートから次を実行し、`http://localhost:8000/lab/`を開けます。

```sh
python3 -m http.server 8000 --directory docs
```

Node.jsでの有限例・拒否例の検査：

```sh
node --test verification/lab-tests-v1.5.8.0.mjs verification/lab-encoding-tests-v1.5.8.0.mjs
```

## English

The laboratory offers exact rational-function change quotients, finite jets with exact residuals, symbolic normal perturbations for orientation predicates, and eight typed number constructions with f-only encodings. The computation generator and finite-certificate checker are separate modules. The checker independently uses polynomial cross-products and finite binomial substitution; exact rational primitives, BigInt, and the checker remain trusted. Acceptance checks the certificate's own finite inputs and claims, not every general theorem in the paper. Imported evidence does not replace the calculation above it.

All computation stays in the browser. Graphics use schematic numerical display scales, while decisions use exact arithmetic. Generation and checking run in module Workers with a five-second budget. Implementation limits are not mathematical impossibility claims. Serve the `docs` directory over HTTP, or use the published GitHub Pages URL.

## References

- [日本語論文v1.5.8](../../manuscripts/A_New_Foundation_of_Mathematics_ja_v1.5.8.md)、特に§2、§8、§9.9。
- [English manuscript v1.5.8](../../manuscripts/A_New_Foundation_of_Mathematics_en_v1.5.8.md).
- Edelsbrunner and Mücke, [Simulation of Simplicity](https://arxiv.org/abs/math/9410209). Symbolic perturbation has established precedents. This lab provides a small, explicit example rather than a general geometric algorithm.
