# 基本記号による完全展開例集 v1.5.7

[構成規則と意味の説明](concept-symbols-v1.5.7.md) · [全概念の対応表](concept-inventory-v1.5.7.md)

各例は型を外側に指定して読む。コードブロックとリンク先 `.f` の中は `f`、丸括弧、カンマだけで、省略記号を含まない。長い証拠は完全な個別ファイルへのリンクで示す。記号列の保存・復号と、その内容の真偽・演算法則の検査を区別する。

## 基底と数

### 自然数 0

型を外側で指定した直接表示。

[基本記号の全文：nat-0.f](../verification/concept-symbols-v1.5.7/nat-0.f)（3文字）

```text
f()
```

検査：型付きの復号結果を、指定した正規値と照合。

### 自然数 1

型を外側で指定した直接表示。

[基本記号の全文：nat-1.f](../verification/concept-symbols-v1.5.7/nat-1.f)（6文字）

```text
f(f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### 自然数 2

型を外側で指定した直接表示。

[基本記号の全文：nat-2.f](../verification/concept-symbols-v1.5.7/nat-2.f)（9文字）

```text
f(f(f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 自然数 3

型を外側で指定した直接表示。

[基本記号の全文：nat-3.f](../verification/concept-symbols-v1.5.7/nat-3.f)（12文字）

```text
f(f(f(f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 自然数 4

型を外側で指定した直接表示。

[基本記号の全文：nat-4.f](../verification/concept-symbols-v1.5.7/nat-4.f)（15文字）

```text
f(f(f(f(f()))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 非負の符号

型を外側で指定した直接表示。

[基本記号の全文：sign-0.f](../verification/concept-symbols-v1.5.7/sign-0.f)（3文字）

```text
f()
```

検査：型付きの復号結果を、指定した正規値と照合。

### 負の符号

型を外側で指定した直接表示。

[基本記号の全文：sign-1.f](../verification/concept-symbols-v1.5.7/sign-1.f)（6文字）

```text
f(f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### 整数 -2

型を外側で指定した直接表示。

[基本記号の全文：int-minus-2.f](../verification/concept-symbols-v1.5.7/int-minus-2.f)（18文字）

```text
(f(f()),f(f(f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 整数 -1

型を外側で指定した直接表示。

[基本記号の全文：int-minus-1.f](../verification/concept-symbols-v1.5.7/int-minus-1.f)（15文字）

```text
(f(f()),f(f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 整数 0

型を外側で指定した直接表示。

[基本記号の全文：int-0.f](../verification/concept-symbols-v1.5.7/int-0.f)（9文字）

```text
(f(),f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### 整数 1

型を外側で指定した直接表示。

[基本記号の全文：int-1.f](../verification/concept-symbols-v1.5.7/int-1.f)（12文字）

```text
(f(),f(f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 整数 2

型を外側で指定した直接表示。

[基本記号の全文：int-2.f](../verification/concept-symbols-v1.5.7/int-2.f)（15文字）

```text
(f(),f(f(f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 有理数 0/1

型を外側で指定した直接表示。

[基本記号の全文：rat-0-1.f](../verification/concept-symbols-v1.5.7/rat-0-1.f)（24文字）

```text
((f(),f()),(f(),f(f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 有理数 1/1

型を外側で指定した直接表示。

[基本記号の全文：rat-1-1.f](../verification/concept-symbols-v1.5.7/rat-1-1.f)（27文字）

```text
((f(),f(f())),(f(),f(f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 有理数 -1/1

型を外側で指定した直接表示。

[基本記号の全文：rat-minus-1-1.f](../verification/concept-symbols-v1.5.7/rat-minus-1-1.f)（30文字）

```text
((f(f()),f(f())),(f(),f(f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 有理数 2/1

型を外側で指定した直接表示。

[基本記号の全文：rat-2-1.f](../verification/concept-symbols-v1.5.7/rat-2-1.f)（30文字）

```text
((f(),f(f(f()))),(f(),f(f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 有理数 -2/1

型を外側で指定した直接表示。

[基本記号の全文：rat-minus-2-1.f](../verification/concept-symbols-v1.5.7/rat-minus-2-1.f)（33文字）

```text
((f(f()),f(f(f()))),(f(),f(f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 有理数 1/2

型を外側で指定した直接表示。

[基本記号の全文：rat-1-2.f](../verification/concept-symbols-v1.5.7/rat-1-2.f)（30文字）

```text
((f(),f(f())),(f(),f(f(f()))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 有理数 -1/3

型を外側で指定した直接表示。

[基本記号の全文：rat-minus-1-3.f](../verification/concept-symbols-v1.5.7/rat-minus-1-3.f)（36文字）

```text
((f(f()),f(f())),(f(),f(f(f(f())))))
```

検査：型付きの復号結果を、指定した正規値と照合。

## 列・補助値

### 文字列 a

UTF-8の97を自然数で表し、一要素列にする。

[基本記号の全文：text-a.f](../verification/concept-symbols-v1.5.7/text-a.f)（300文字）

```text
(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
  f()
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 文字列 λ

UTF-8の二つのバイトを自然数の列として保持する。

[基本記号の全文：text-lambda.f](../verification/concept-symbols-v1.5.7/text-lambda.f)（1194文字）

```text
(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    f()
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 自然数1と2の固定対

(N(1),N(2))

[基本記号の全文：pair-nat.f](../verification/concept-symbols-v1.5.7/pair-nat.f)（18文字）

```text
(f(f()),f(f(f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 自然数の0要素列

[]

[基本記号の全文：list-0.f](../verification/concept-symbols-v1.5.7/list-0.f)（3文字）

```text
f()
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 自然数の1要素列

[0]

[基本記号の全文：list-1.f](../verification/concept-symbols-v1.5.7/list-1.f)（9文字）

```text
(f(),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 自然数の3要素列

[0,1,2]

[基本記号の全文：list-3.f](../verification/concept-symbols-v1.5.7/list-3.f)（30文字）

```text
(f(),(f(f()),(f(f(f())),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 真偽データ false

型を外側で指定した直接表示。

[基本記号の全文：bool-false.f](../verification/concept-symbols-v1.5.7/bool-false.f)（3文字）

```text
f()
```

検査：型付きの復号結果を、指定した正規値と照合。

### 真偽データ true

型を外側で指定した直接表示。

[基本記号の全文：bool-true.f](../verification/concept-symbols-v1.5.7/bool-true.f)（6文字）

```text
f(f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### 比較結果 -1

型を外側で指定した直接表示。

[基本記号の全文：ordering-minus-1.f](../verification/concept-symbols-v1.5.7/ordering-minus-1.f)（15文字）

```text
(f(f()),f(f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 比較結果 0

型を外側で指定した直接表示。

[基本記号の全文：ordering-0.f](../verification/concept-symbols-v1.5.7/ordering-0.f)（9文字）

```text
(f(),f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### 比較結果 1

型を外側で指定した直接表示。

[基本記号の全文：ordering-1.f](../verification/concept-symbols-v1.5.7/ordering-1.f)（12文字）

```text
(f(),f(f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 値なし

Node(0;)

[基本記号の全文：option-none.f](../verification/concept-symbols-v1.5.7/option-none.f)（9文字）

```text
(f(),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 自然数2の値あり

Node(1;N(2))

[基本記号の全文：option-some.f](../verification/concept-symbols-v1.5.7/option-some.f)（24文字）

```text
(f(f()),(f(f(f())),f()))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 演算成功

Node(0;Q(1/2))

[基本記号の全文：result-success.f](../verification/concept-symbols-v1.5.7/result-success.f)（42文字）

```text
(f(),(((f(),f(f())),(f(),f(f(f())))),f()))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 演算失敗

Node(1;Text("zero"))。理由を保持し、零の値にしない。

[基本記号の全文：result-failure.f](../verification/concept-symbols-v1.5.7/result-failure.f)（1386文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())
        )
      )
    ),
    f()
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

## MとF

### M多項式：0

定数項からの有理係数列。Mはこの全有限列の型。

[基本記号の全文：m-zero.f](../verification/concept-symbols-v1.5.7/m-zero.f)（3文字）

```text
f()
```

検査：型付きの復号結果を、指定した正規値と照合。

### M多項式：1

定数項からの有理係数列。Mはこの全有限列の型。

[基本記号の全文：m-one.f](../verification/concept-symbols-v1.5.7/m-one.f)（33文字）

```text
(((f(),f(f())),(f(),f(f()))),f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### M多項式：ε

定数項からの有理係数列。Mはこの全有限列の型。

[基本記号の全文：m-epsilon.f](../verification/concept-symbols-v1.5.7/m-epsilon.f)（60文字）

```text
(((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### M多項式：ε²

定数項からの有理係数列。Mはこの全有限列の型。

[基本記号の全文：m-epsilon-squared.f](../verification/concept-symbols-v1.5.7/m-epsilon-squared.f)（87文字）

```text
(((f(),f()),(f(),f(f()))),(((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### M多項式：1+ε

定数項からの有理係数列。Mはこの全有限列の型。

[基本記号の全文：m-one-plus-epsilon.f](../verification/concept-symbols-v1.5.7/m-one-plus-epsilon.f)（63文字）

```text
(((f(),f(f())),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### M多項式：ε/2

定数項からの有理係数列。Mはこの全有限列の型。

[基本記号の全文：m-epsilon-half.f](../verification/concept-symbols-v1.5.7/m-epsilon-half.f)（63文字）

```text
(((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f(f())))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### M多項式：1−2ε+(1/2)ε²

定数項からの有理係数列。Mはこの全有限列の型。

[基本記号の全文：m-general.f](../verification/concept-symbols-v1.5.7/m-general.f)（102文字）

```text
(((f(),f(f())),(f(),f(f()))),(((f(f()),f(f(f()))),(f(),f(f()))),(((f(),f(f())),(f(),f(f(f())))),f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 補助関係子ラベル L：0#

(k,q)=(1,0)。Mとしては係数列[0,1]へ移す。整数kは関係子の個数であり、近似添字nではない。

[基本記号の全文：legacy-l.f](../verification/concept-symbols-v1.5.7/legacy-l.f)（39文字）

```text
((f(),f(f())),((f(),f()),(f(),f(f()))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### F：zero

正規化された多項式比 {"numerator":[],"denominator":["1/1"]}

[基本記号の全文：f-zero.f](../verification/concept-symbols-v1.5.7/f-zero.f)（39文字）

```text
(f(),(((f(),f(f())),(f(),f(f()))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### F：one

正規化された多項式比 {"numerator":["1/1"],"denominator":["1/1"]}

[基本記号の全文：f-one.f](../verification/concept-symbols-v1.5.7/f-one.f)（69文字）

```text
((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### F：minus-one

正規化された多項式比 {"numerator":["-1/1"],"denominator":["1/1"]}

[基本記号の全文：f-minus-one.f](../verification/concept-symbols-v1.5.7/f-minus-one.f)（72文字）

```text
((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### F：epsilon

正規化された多項式比 {"numerator":["0/1","1/1"],"denominator":["1/1"]}

[基本記号の全文：f-epsilon.f](../verification/concept-symbols-v1.5.7/f-epsilon.f)（96文字）

```text
((((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),f())),(((f(),f(f())),(f(),f(f()))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### F：inverse-epsilon

正規化された多項式比 {"numerator":["1/1"],"denominator":["0/1","1/1"]}

[基本記号の全文：f-inverse-epsilon.f](../verification/concept-symbols-v1.5.7/f-inverse-epsilon.f)（96文字）

```text
((((f(),f(f())),(f(),f(f()))),f()),(((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### F：square-ratio

正規化された多項式比 {"numerator":["0/1","0/1","1/1"],"denominator":["1/1","1/1"]}

[基本記号の全文：f-square-ratio.f](../verification/concept-symbols-v1.5.7/f-square-ratio.f)（153文字）

```text
(
  (((f(),f()),(f(),f(f()))),(((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),f()))),
  (((f(),f(f())),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),f()))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### ε²の次数

型を外側で指定した直接表示。

[基本記号の全文：poly-degree.f](../verification/concept-symbols-v1.5.7/poly-degree.f)（9文字）

```text
f(f(f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 1/εの次数差

型を外側で指定した直接表示。

[基本記号の全文：valuation-negative.f](../verification/concept-symbols-v1.5.7/valuation-negative.f)（15文字）

```text
(f(f()),f(f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### st((1+ε)/(2−ε))

標準部の出力値。定義域条件と計算証拠は別に検査する。

[基本記号の全文：standard-part.f](../verification/concept-symbols-v1.5.7/standard-part.f)（30文字）

```text
((f(),f(f())),(f(),f(f(f()))))
```

検査：型付きの復号結果を、指定した正規値と照合。

## 生成複素数と生成四元数

### 生成複素数 zero

原案の行列 ((a,−b),(b,a))。全成分はF。

[基本記号の全文：complex-zero.f](../verification/concept-symbols-v1.5.7/complex-zero.f)（165文字）

```text
(
  ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f()))),
  ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f())))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成複素数 one

原案の行列 ((a,−b),(b,a))。全成分はF。

[基本記号の全文：complex-one.f](../verification/concept-symbols-v1.5.7/complex-one.f)（225文字）

```text
(
  (
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
    (f(),(((f(),f(f())),(f(),f(f()))),f()))
  ),
  (
    (f(),(((f(),f(f())),(f(),f(f()))),f())),
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成複素数 i

原案の行列 ((a,−b),(b,a))。全成分はF。

[基本記号の全文：complex-i.f](../verification/concept-symbols-v1.5.7/complex-i.f)（228文字）

```text
(
  (
    (f(),(((f(),f(f())),(f(),f(f()))),f())),
    ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
  ),
  (
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
    (f(),(((f(),f(f())),(f(),f(f()))),f()))
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成複素数 one-plus-i

原案の行列 ((a,−b),(b,a))。全成分はF。

[基本記号の全文：complex-one-plus-i.f](../verification/concept-symbols-v1.5.7/complex-one-plus-i.f)（288文字）

```text
(
  (
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
    ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
  ),
  (
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成複素数 one-minus-i

原案の行列 ((a,−b),(b,a))。全成分はF。

[基本記号の全文：complex-one-minus-i.f](../verification/concept-symbols-v1.5.7/complex-one-minus-i.f)（288文字）

```text
(
  (
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
  ),
  (
    ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
    ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成四元数 one

((a+bi),(c+di)) を z+w j と読む。各複素数は原案の行列表示。

[基本記号の全文：quaternion-one.f](../verification/concept-symbols-v1.5.7/quaternion-one.f)（393文字）

```text
(
  (
    (
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
      (f(),(((f(),f(f())),(f(),f(f()))),f()))
    ),
    (
      (f(),(((f(),f(f())),(f(),f(f()))),f())),
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
    )
  ),
  (
    ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f()))),
    ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f())))
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成四元数 i

((a+bi),(c+di)) を z+w j と読む。各複素数は原案の行列表示。

[基本記号の全文：quaternion-i.f](../verification/concept-symbols-v1.5.7/quaternion-i.f)（396文字）

```text
(
  (
    (
      (f(),(((f(),f(f())),(f(),f(f()))),f())),
      ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
    ),
    (
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
      (f(),(((f(),f(f())),(f(),f(f()))),f()))
    )
  ),
  (
    ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f()))),
    ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f())))
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成四元数 j

((a+bi),(c+di)) を z+w j と読む。各複素数は原案の行列表示。

[基本記号の全文：quaternion-j.f](../verification/concept-symbols-v1.5.7/quaternion-j.f)（393文字）

```text
(
  (
    ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f()))),
    ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f())))
  ),
  (
    (
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
      (f(),(((f(),f(f())),(f(),f(f()))),f()))
    ),
    (
      (f(),(((f(),f(f())),(f(),f(f()))),f())),
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
    )
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成四元数 k

((a+bi),(c+di)) を z+w j と読む。各複素数は原案の行列表示。

[基本記号の全文：quaternion-k.f](../verification/concept-symbols-v1.5.7/quaternion-k.f)（396文字）

```text
(
  (
    ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f()))),
    ((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f())))
  ),
  (
    (
      (f(),(((f(),f(f())),(f(),f(f()))),f())),
      ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
    ),
    (
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
      (f(),(((f(),f(f())),(f(),f(f()))),f()))
    )
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 生成四元数 all-one

((a+bi),(c+di)) を z+w j と読む。各複素数は原案の行列表示。

[基本記号の全文：quaternion-all-one.f](../verification/concept-symbols-v1.5.7/quaternion-all-one.f)（579文字）

```text
(
  (
    (
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
      ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
    ),
    (
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
    )
  ),
  (
    (
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
      ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
    ),
    (
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
      ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
    )
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

## 型とλ構文

### 型 N

Node(0;)

[基本記号の全文：type-n.f](../verification/concept-symbols-v1.5.7/type-n.f)（9文字）

```text
(f(),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Z

Node(1;)

[基本記号の全文：type-z.f](../verification/concept-symbols-v1.5.7/type-z.f)（12文字）

```text
(f(f()),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Q

Node(2;)

[基本記号の全文：type-q.f](../verification/concept-symbols-v1.5.7/type-q.f)（15文字）

```text
(f(f(f())),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 M

Node(3;)

[基本記号の全文：type-m.f](../verification/concept-symbols-v1.5.7/type-m.f)（18文字）

```text
(f(f(f(f()))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 F

Node(4;)

[基本記号の全文：type-f.f](../verification/concept-symbols-v1.5.7/type-f.f)（21文字）

```text
(f(f(f(f(f())))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 C

Node(5;)

[基本記号の全文：type-c.f](../verification/concept-symbols-v1.5.7/type-c.f)（24文字）

```text
(f(f(f(f(f(f()))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 H

Node(6;)

[基本記号の全文：type-h.f](../verification/concept-symbols-v1.5.7/type-h.f)（27文字）

```text
(f(f(f(f(f(f(f())))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Bool

Node(7;)

[基本記号の全文：type-bool.f](../verification/concept-symbols-v1.5.7/type-bool.f)（30文字）

```text
(f(f(f(f(f(f(f(f()))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Text

Node(8;)

[基本記号の全文：type-text.f](../verification/concept-symbols-v1.5.7/type-text.f)（33文字）

```text
(f(f(f(f(f(f(f(f(f())))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Arrow

Node(9;)

[基本記号の全文：type-arrow.f](../verification/concept-symbols-v1.5.7/type-arrow.f)（36文字）

```text
(f(f(f(f(f(f(f(f(f(f()))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Lambda

Node(10;)

[基本記号の全文：type-lambda.f](../verification/concept-symbols-v1.5.7/type-lambda.f)（39文字）

```text
(f(f(f(f(f(f(f(f(f(f(f())))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Proposition

Node(11;)

[基本記号の全文：type-proposition.f](../verification/concept-symbols-v1.5.7/type-proposition.f)（42文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Proof

Node(12;)

[基本記号の全文：type-proof.f](../verification/concept-symbols-v1.5.7/type-proof.f)（45文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Unit

Node(13;)

[基本記号の全文：type-unit.f](../verification/concept-symbols-v1.5.7/type-unit.f)（48文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 List(Q)

List(Q)

[基本記号の全文：type-list.f](../verification/concept-symbols-v1.5.7/type-list.f)（69文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))),((f(f(f())),f()),f()))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Pair(N,Q)

Pair(N,Q)

[基本記号の全文：type-pair.f](../verification/concept-symbols-v1.5.7/type-pair.f)（84文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))),((f(),f()),((f(f(f())),f()),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Option(N)

Option(N)

[基本記号の全文：type-option.f](../verification/concept-symbols-v1.5.7/type-option.f)（69文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))),((f(),f()),f()))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Function(Q,Q)

Function(Q,Q)

[基本記号の全文：type-function.f](../verification/concept-symbols-v1.5.7/type-function.f)（96文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))),((f(f(f())),f()),((f(f(f())),f()),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Ordering

Ordering

[基本記号の全文：type-ordering.f](../verification/concept-symbols-v1.5.7/type-ordering.f)（63文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Interval

Interval

[基本記号の全文：type-interval.f](../verification/concept-symbols-v1.5.7/type-interval.f)（66文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Generator(N,Interval)

Generator(N,Interval)

[基本記号の全文：type-generator.f](../verification/concept-symbols-v1.5.7/type-generator.f)（150文字）

```text
(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))),
  ((f(),f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))),f()),f()))
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 補助型 QRep

Node(21;)。分母が正かつ非零の整数対。未約分を許し、正規有理数Qと区別。

[基本記号の全文：type-qrep.f](../verification/concept-symbols-v1.5.7/type-qrep.f)（72文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 型 Result(QRep)

Node(22;Type(QRep))。成功値と演算エラーを区別する。

[基本記号の全文：type-result.f](../verification/concept-symbols-v1.5.7/type-result.f)（150文字）

```text
(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))),
  ((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))),f()),f())
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

## 基底と数

### 未約分の分数表示 4/4

整数二つの対。QRepAdd QHalf QHalfの正規λ出力を復号した表示に対応する。Qの正規表示1/1とは別。

[基本記号の全文：qrep-four-four.f](../verification/concept-symbols-v1.5.7/qrep-four-four.f)（45文字）

```text
((f(),f(f(f(f(f()))))),(f(),f(f(f(f(f()))))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

## 固定型と有限対T

### 型 T

Node(23;)。Fの対(a,b)にσ²=2の乗法を定める独立した型。

[基本記号の全文：type-t.f](../verification/concept-symbols-v1.5.7/type-t.f)（78文字）

```text
(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### Tの値 0

F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。

[基本記号の全文：t-zero.f](../verification/concept-symbols-v1.5.7/t-zero.f)（81文字）

```text
((f(),(((f(),f(f())),(f(),f(f()))),f())),(f(),(((f(),f(f())),(f(),f(f()))),f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### Tの値 1

F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。

[基本記号の全文：t-one.f](../verification/concept-symbols-v1.5.7/t-one.f)（111文字）

```text
(
  ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
  (f(),(((f(),f(f())),(f(),f(f()))),f()))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### Tの値 −1

F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。

[基本記号の全文：t-minus-one.f](../verification/concept-symbols-v1.5.7/t-minus-one.f)（114文字）

```text
(
  ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
  (f(),(((f(),f(f())),(f(),f(f()))),f()))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### Tの値 2

F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。

[基本記号の全文：t-two.f](../verification/concept-symbols-v1.5.7/t-two.f)（114文字）

```text
(
  ((((f(),f(f(f()))),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
  (f(),(((f(),f(f())),(f(),f(f()))),f()))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### Tの値 σ

F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。

[基本記号の全文：t-sigma.f](../verification/concept-symbols-v1.5.7/t-sigma.f)（111文字）

```text
(
  (f(),(((f(),f(f())),(f(),f(f()))),f())),
  ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### Tの値 σ/2

F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。

[基本記号の全文：t-sigma-half.f](../verification/concept-symbols-v1.5.7/t-sigma-half.f)（114文字）

```text
(
  (f(),(((f(),f(f())),(f(),f(f()))),f())),
  ((((f(),f(f())),(f(),f(f(f())))),f()),(((f(),f(f())),(f(),f(f()))),f()))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### Tの値 1+σ

F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。

[基本記号の全文：t-one-plus-sigma.f](../verification/concept-symbols-v1.5.7/t-one-plus-sigma.f)（141文字）

```text
(
  ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
  ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### Tの値 1−σ

F二つの固定対(a,b)。型Tを計算前に指定し、数列・区間生成器との統合は要求しない。

[基本記号の全文：t-one-minus-sigma.f](../verification/concept-symbols-v1.5.7/t-one-minus-sigma.f)（144文字）

```text
(
  ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
  ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 型Tで固定した積 (1,1)(1,−1)=(−1,0)

List(型T,演算名Mul,入力二個のList,結果T)。全成分をFとして復号し、(ac+2bd,ad+bc)を再計算する。

[基本記号の全文：fixed-t-product-conjugate.f](../verification/concept-symbols-v1.5.7/fixed-t-product-conjugate.f)（1428文字）

```text
(
  (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))),f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    (
      (
        (
          ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
          ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
        ),
        (
          (((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))),
          f()
        )
      ),
      (
        (
          ((((f(f()),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
          (f(),(((f(),f(f())),(f(),f(f()))),f()))
        ),
        f()
      )
    )
  )
)
```

検査：計算開始前の指定型Tを確認し、全入力・結果のT形成条件と、F算術による積の二成分を検査。

### 型Tで固定した積 σ²=(2,0)

List(型T,演算名Mul,入力二個のList,結果T)。全成分をFとして復号し、(ac+2bd,ad+bc)を再計算する。

[基本記号の全文：fixed-t-product-sigma-square.f](../verification/concept-symbols-v1.5.7/fixed-t-product-sigma-square.f)（1365文字）

```text
(
  (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))),f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    (
      (
        (
          (f(),(((f(),f(f())),(f(),f(f()))),f())),
          ((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))
        ),
        (
          ((f(),(((f(),f(f())),(f(),f(f()))),f())),((((f(),f(f())),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f()))),
          f()
        )
      ),
      (
        (
          ((((f(),f(f(f()))),(f(),f(f()))),f()),(((f(),f(f())),(f(),f(f()))),f())),
          (f(),(((f(),f(f())),(f(),f(f()))),f()))
        ),
        f()
      )
    )
  )
)
```

検査：計算開始前の指定型Tを確認し、全入力・結果のT形成条件と、F算術による積の二成分を検査。

### 指定型Nの形成検査 NatForm の有限プログラム

Node(2;Node(0;真),Node(1;),Node(0;偽))。0=真偽値を返す、1=唯一の子へ同じ処理を再帰、2=子の個数0/1/2で三分岐。

[基本記号の全文：natform-program.f](../verification/concept-symbols-v1.5.7/natform-program.f)（69文字）

```text
(f(f(f())),((f(),(f(f()),f())),((f(f()),f()),((f(),(f(),f())),f()))))
```

検査：復号したプログラム木を小実行器で解釈し、基底・一子・二子・一子内の二子を実際に判定。万能な型判別ではない。

### NatForm(f())=真

List(指定型N,NatFormプログラム,検査入力,真偽結果)。fのみ表記で二子を持つ形は自然数として拒否する。

[基本記号の全文：natform-zero.f](../verification/concept-symbols-v1.5.7/natform-zero.f)（102文字）

```text
((f(),f()),((f(f(f())),((f(),(f(f()),f())),((f(f()),f()),((f(),(f(),f())),f())))),(f(),(f(f()),f()))))
```

検査：指定Nの形成条件を有限木上で再帰実行し、記録した真偽結果と照合。

### NatForm(f(f()))=真

List(指定型N,NatFormプログラム,検査入力,真偽結果)。fのみ表記で二子を持つ形は自然数として拒否する。

[基本記号の全文：natform-successor.f](../verification/concept-symbols-v1.5.7/natform-successor.f)（105文字）

```text
((f(),f()),((f(f(f())),((f(),(f(f()),f())),((f(f()),f()),((f(),(f(),f())),f())))),(f(f()),(f(f()),f()))))
```

検査：指定Nの形成条件を有限木上で再帰実行し、記録した真偽結果と照合。

### NatForm(f(f()f()))=偽

List(指定型N,NatFormプログラム,検査入力,真偽結果)。fのみ表記で二子を持つ形は自然数として拒否する。

[基本記号の全文：natform-pair.f](../verification/concept-symbols-v1.5.7/natform-pair.f)（105文字）

```text
((f(),f()),((f(f(f())),((f(),(f(f()),f())),((f(f()),f()),((f(),(f(),f())),f())))),((f(),f()),(f(),f()))))
```

検査：指定Nの形成条件を有限木上で再帰実行し、記録した真偽結果と照合。

### NatForm(f(f(f()f())))=偽

List(指定型N,NatFormプログラム,検査入力,真偽結果)。fのみ表記で二子を持つ形は自然数として拒否する。

[基本記号の全文：natform-nested-pair.f](../verification/concept-symbols-v1.5.7/natform-nested-pair.f)（108文字）

```text
((f(),f()),((f(f(f())),((f(),(f(f()),f())),((f(f()),f()),((f(),(f(),f())),f())))),(f((f(),f())),(f(),f()))))
```

検査：指定Nの形成条件を有限木上で再帰実行し、記録した真偽結果と照合。

## 型とλ構文

### λ定義 True

λt.λf.t

[基本記号の全文：lambda-true.f](../verification/concept-symbols-v1.5.7/lambda-true.f)（60文字）

```text
(f(f(f(f()))),((f(f(f(f()))),((f(),(f(f()),f())),f())),f()))
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 False

λt.λf.f

[基本記号の全文：lambda-false.f](../verification/concept-symbols-v1.5.7/lambda-false.f)（57文字）

```text
(f(f(f(f()))),((f(f(f(f()))),((f(),(f(),f())),f())),f()))
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 If

λb.λt.λe.b t e

[基本記号の全文：lambda-if.f](../verification/concept-symbols-v1.5.7/lambda-if.f)（159文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f(f()))),
          ((f(f(f())),((f(f(f())),((f(),(f(f(f())),f())),((f(),(f(f()),f())),f()))),((f(),(f(),f())),f()))),f())
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 And

λp.λq.p q p

[基本記号の全文：lambda-and.f](../verification/concept-symbols-v1.5.7/lambda-and.f)（135文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      ((f(f(f())),((f(f(f())),((f(),(f(f()),f())),((f(),(f(),f())),f()))),((f(),(f(f()),f())),f()))),f())
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Or

λp.λq.p p q

[基本記号の全文：lambda-or.f](../verification/concept-symbols-v1.5.7/lambda-or.f)（135文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      ((f(f(f())),((f(f(f())),((f(),(f(f()),f())),((f(),(f(f()),f())),f()))),((f(),(f(),f())),f()))),f())
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Not

λb.b False True

[基本記号の全文：lambda-not.f](../verification/concept-symbols-v1.5.7/lambda-not.f)（2889文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f())),
      (
        (
          f(f(f())),
          ((f(),(f(),f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),f())),f()))
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Pair

λa.λb.λf.f a b

[基本記号の全文：lambda-pair.f](../verification/concept-symbols-v1.5.7/lambda-pair.f)（159文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f(f()))),
          ((f(f(f())),((f(f(f())),((f(),(f(),f())),((f(),(f(f(f())),f())),f()))),((f(),(f(f()),f())),f()))),f())
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Fst

λp.p (λa.λb.a)

[基本記号の全文：lambda-fst.f](../verification/concept-symbols-v1.5.7/lambda-fst.f)（117文字）

```text
(
  f(f(f(f()))),
  ((f(f(f())),((f(),(f(),f())),((f(f(f(f()))),((f(f(f(f()))),((f(),(f(f()),f())),f())),f())),f()))),f())
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Snd

λp.p (λa.λb.b)

[基本記号の全文：lambda-snd.f](../verification/concept-symbols-v1.5.7/lambda-snd.f)（114文字）

```text
(
  f(f(f(f()))),
  ((f(f(f())),((f(),(f(),f())),((f(f(f(f()))),((f(f(f(f()))),((f(),(f(),f())),f())),f())),f()))),f())
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Zero

λf.λx.x

[基本記号の全文：lambda-zero.f](../verification/concept-symbols-v1.5.7/lambda-zero.f)（57文字）

```text
(f(f(f(f()))),((f(f(f(f()))),((f(),(f(),f())),f())),f()))
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Succ

λn.λf.λx.f (n f x)

[基本記号の全文：lambda-succ.f](../verification/concept-symbols-v1.5.7/lambda-succ.f)（198文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f(f()))),
          ((f(f(f())),((f(),(f(f()),f())),((f(f(f())),((f(f(f())),((f(),(f(f(f())),f())),((f(),(f(f()),f())),f()))),((f(),(f(),f())),f()))),f()))),f())
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 One

Succ Zero

[基本記号の全文：lambda-one.f](../verification/concept-symbols-v1.5.7/lambda-one.f)（2547文字）

```text
(
  f(f(f())),
  (
    (
      f(f()),
      (
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))
        ),
        f()
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Two

Succ One

[基本記号の全文：lambda-two.f](../verification/concept-symbols-v1.5.7/lambda-two.f)（2163文字）

```text
(
  f(f(f())),
  (
    (
      f(f()),
      (
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))
        ),
        f()
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Three

Succ Two

[基本記号の全文：lambda-three.f](../verification/concept-symbols-v1.5.7/lambda-three.f)（2235文字）

```text
(
  f(f(f())),
  (
    (
      f(f()),
      (
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))
        ),
        f()
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Four

Succ Three

[基本記号の全文：lambda-four.f](../verification/concept-symbols-v1.5.7/lambda-four.f)（2817文字）

```text
(
  f(f(f())),
  (
    (
      f(f()),
      (
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))
        ),
        f()
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Add

λm.λn.λf.λx.m f (n f x)

[基本記号の全文：lambda-add.f](../verification/concept-symbols-v1.5.7/lambda-add.f)（264文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f(f()))),
          ((f(f(f(f()))),((f(f(f())),((f(f(f())),((f(),(f(f(f(f()))),f())),((f(),(f(f()),f())),f()))),((f(f(f())),((f(f(f())),((f(),(f(f(f())),f())),((f(),(f(f()),f())),f()))),((f(),(f(),f())),f()))),f()))),f())),f())
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Mul

λm.λn.λf.λx.m (n f) x

[基本記号の全文：lambda-mul.f](../verification/concept-symbols-v1.5.7/lambda-mul.f)（225文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f(f()))),
          ((f(f(f(f()))),((f(f(f())),((f(f(f())),((f(),(f(f(f(f()))),f())),((f(f(f())),((f(),(f(f(f())),f())),((f(),(f(f()),f())),f()))),f()))),((f(),(f(),f())),f()))),f())),f())
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Pred

λn.λf.λx.n (λg.λh.h (g f)) (λu.x) (λu.u)

[基本記号の全文：lambda-pred.f](../verification/concept-symbols-v1.5.7/lambda-pred.f)（363文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f(f()))),
          ((f(f(f())),((f(f(f())),((f(f(f())),((f(),(f(f(f())),f())),((f(f(f(f()))),((f(f(f(f()))),((f(f(f())),((f(),(f(),f())),((f(f(f())),((f(),(f(f()),f())),((f(),(f(f(f(f()))),f())),f()))),f()))),f())),f())),f()))),((f(f(f(f()))),((f(),(f(f()),f())),f())),f()))),((f(f(f(f()))),((f(),(f(),f())),f())),f()))),f())
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Sub

λm.λn.n Pred m

[基本記号の全文：lambda-sub.f](../verification/concept-symbols-v1.5.7/lambda-sub.f)（1344文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f())),
          ((f(f(f())),((f(),(f(),f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),f()))),((f(),(f(f()),f())),f()))
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 IsZero

λn.n (λx.False) True

[基本記号の全文：lambda-iszero.f](../verification/concept-symbols-v1.5.7/lambda-iszero.f)（2910文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f())),
      (
        (
          f(f(f())),
          ((f(),(f(),f())),((f(f(f(f()))),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),f())),f())),f()))
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Leq

λm.λn.IsZero (Sub m n)

[基本記号の全文：lambda-leq.f](../verification/concept-symbols-v1.5.7/lambda-leq.f)（2934文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f())),
          ((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))))),f())),((f(f(f())),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),((f(),(f(f()),f())),f()))),((f(),(f(),f())),f()))),f()))
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 EqNat

λm.λn.And (Leq m n) (Leq n m)

[基本記号の全文：lambda-eqnat.f](../verification/concept-symbols-v1.5.7/lambda-eqnat.f)（2907文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f())),
          ((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),((f(f(f())),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),((f(),(f(f()),f())),f()))),((f(),(f(),f())),f()))),f()))),((f(f(f())),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),((f(),(f(),f())),f()))),((f(),(f(f()),f())),f()))),f()))
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 N0

Zero

[基本記号の全文：lambda-n0.f](../verification/concept-symbols-v1.5.7/lambda-n0.f)（1290文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 N1

One

[基本記号の全文：lambda-n1.f](../verification/concept-symbols-v1.5.7/lambda-n1.f)（906文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 N2

Two

[基本記号の全文：lambda-n2.f](../verification/concept-symbols-v1.5.7/lambda-n2.f)（978文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 N3

Three

[基本記号の全文：lambda-n3.f](../verification/concept-symbols-v1.5.7/lambda-n3.f)（1560文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 N4

Four

[基本記号の全文：lambda-n4.f](../verification/concept-symbols-v1.5.7/lambda-n4.f)（1278文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 0

Zero

[基本記号の全文：lambda-0.f](../verification/concept-symbols-v1.5.7/lambda-0.f)（1290文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 1

One

[基本記号の全文：lambda-1.f](../verification/concept-symbols-v1.5.7/lambda-1.f)（906文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 2

Two

[基本記号の全文：lambda-2.f](../verification/concept-symbols-v1.5.7/lambda-2.f)（978文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 3

Three

[基本記号の全文：lambda-3.f](../verification/concept-symbols-v1.5.7/lambda-3.f)（1560文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 4

Four

[基本記号の全文：lambda-4.f](../verification/concept-symbols-v1.5.7/lambda-4.f)（1278文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ResultOk

λv.λok.λerr.ok v

[基本記号の全文：lambda-resultok.f](../verification/concept-symbols-v1.5.7/lambda-resultok.f)（123文字）

```text
(
  f(f(f(f()))),
  ((f(f(f(f()))),((f(f(f(f()))),((f(f(f())),((f(),(f(f()),f())),((f(),(f(f(f())),f())),f()))),f())),f())),f())
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ResultErr

λe.λok.λerr.err e

[基本記号の全文：lambda-resulterr.f](../verification/concept-symbols-v1.5.7/lambda-resulterr.f)（120文字）

```text
(
  f(f(f(f()))),
  ((f(f(f(f()))),((f(f(f(f()))),((f(f(f())),((f(),(f(),f())),((f(),(f(f(f())),f())),f()))),f())),f())),f())
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ResultBind

λr.λk.r k ResultErr

[基本記号の全文：lambda-resultbind.f](../verification/concept-symbols-v1.5.7/lambda-resultbind.f)（2997文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f())),
          ((f(f(f())),((f(),(f(f()),f())),((f(),(f(),f())),f()))),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))))))),f())),f()))
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZMake

λs.λn.Pair (If (IsZero n) Zero s) n

[基本記号の全文：lambda-zmake.f](../verification/concept-symbols-v1.5.7/lambda-zmake.f)（5157文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f())),
          ((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),((f(f(f())),((f(f(f())),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())),f())),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))))),f())),((f(),(f(),f())),f()))),f()))),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),f()))),((f(),(f(f()),f())),f()))),f()))),((f(),(f(),f())),f()))
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZSign

Fst

[基本記号の全文：lambda-zsign.f](../verification/concept-symbols-v1.5.7/lambda-zsign.f)（939文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZMagnitude

Snd

[基本記号の全文：lambda-zmagnitude.f](../verification/concept-symbols-v1.5.7/lambda-zmagnitude.f)（915文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZZero

ZMake Zero Zero

[基本記号の全文：lambda-zzero.f](../verification/concept-symbols-v1.5.7/lambda-zzero.f)（4086文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f())),
      (
        (
          f(f()),
          ((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),f())
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),
          f()
        )
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZOne

ZMake Zero One

[基本記号の全文：lambda-zone.f](../verification/concept-symbols-v1.5.7/lambda-zone.f)（3702文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f())),
      (
        (
          f(f()),
          ((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),f())
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),
          f()
        )
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZTwo

ZMake Zero Two

[基本記号の全文：lambda-ztwo.f](../verification/concept-symbols-v1.5.7/lambda-ztwo.f)（3774文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f())),
      (
        (
          f(f()),
          ((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),f())
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),
          f()
        )
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZMinusOne

ZMake One One

[基本記号の全文：lambda-zminusone.f](../verification/concept-symbols-v1.5.7/lambda-zminusone.f)（3318文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f())),
      (
        (
          f(f()),
          ((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),f())
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),
          f()
        )
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZNeg

λz.ZMake (If (IsZero (Fst z)) One Zero) (Snd z)

[基本記号の全文：lambda-zneg.f](../verification/concept-symbols-v1.5.7/lambda-zneg.f)（8154文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZAdd

λa.λb.If (EqNat (Fst a) (Fst b)) (ZMake (Fst a) (Add (Snd a) (Snd b))) (If (Leq (Snd a) (Snd b)) (ZMake (Fst b) (Sub (Snd b) (Snd a))) (ZMake (Fst a) (Sub (Snd a) (Snd b))))

[基本記号の全文：lambda-zadd.f](../verification/concept-symbols-v1.5.7/lambda-zadd.f)（23574文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZSub

λa.λb.ZAdd a (ZNeg b)

[基本記号の全文：lambda-zsub.f](../verification/concept-symbols-v1.5.7/lambda-zsub.f)（2403文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f())),
          ((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),((f(),(f(f()),f())),f()))),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),((f(),(f(),f())),f()))),f()))
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZMul

λa.λb.ZMake (If (EqNat (Fst a) (Fst b)) Zero One) (Mul (Snd a) (Snd b))

[基本記号の全文：lambda-zmul.f](../verification/concept-symbols-v1.5.7/lambda-zmul.f)（10713文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZEq

λa.λb.And (EqNat (Fst a) (Fst b)) (EqNat (Snd a) (Snd b))

[基本記号の全文：lambda-zeq.f](../verification/concept-symbols-v1.5.7/lambda-zeq.f)（7821文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZLeq

λa.λb.If (EqNat (Fst a) (Fst b)) (If (IsZero (Fst a)) (Leq (Snd a) (Snd b)) (Leq (Snd b) (Snd a))) (IsZero (Fst b))

[基本記号の全文：lambda-zleq.f](../verification/concept-symbols-v1.5.7/lambda-zleq.f)（16173文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZFromDiff

λp.λn.If (Leq p n) (ZMake One (Sub n p)) (ZMake Zero (Sub p n))

[基本記号の全文：lambda-zfromdiff.f](../verification/concept-symbols-v1.5.7/lambda-zfromdiff.f)（8859文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 ZToDiff

λz.If (IsZero (Fst z)) (Pair (Snd z) Zero) (Pair Zero (Snd z))

[基本記号の全文：lambda-ztodiff.f](../verification/concept-symbols-v1.5.7/lambda-ztodiff.f)（10527文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRep

Pair

[基本記号の全文：lambda-qrep.f](../verification/concept-symbols-v1.5.7/lambda-qrep.f)（1230文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepNum

Fst

[基本記号の全文：lambda-qrepnum.f](../verification/concept-symbols-v1.5.7/lambda-qrepnum.f)（939文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepDen

Snd

[基本記号の全文：lambda-qrepden.f](../verification/concept-symbols-v1.5.7/lambda-qrepden.f)（915文字）

```text
(
  f(f()),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepValid

λr.And (IsZero (Fst (Snd r))) (Not (IsZero (Snd (Snd r))))

[基本記号の全文：lambda-qrepvalid.f](../verification/concept-symbols-v1.5.7/lambda-qrepvalid.f)（9468文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QMake

λn.λd.If (IsZero (Snd d)) (ResultErr Zero) (ResultOk (Pair (If (IsZero (Fst d)) n (ZNeg n)) (ZMake Zero (Snd d))))

[基本記号の全文：lambda-qmake.f](../verification/concept-symbols-v1.5.7/lambda-qmake.f)（19965文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QZero

QRep ZZero ZOne

[基本記号の全文：lambda-qzero.f](../verification/concept-symbols-v1.5.7/lambda-qzero.f)（3960文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f())),
      (
        (
          f(f()),
          ((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),f())),
          f()
        )
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QOne

QRep ZOne ZOne

[基本記号の全文：lambda-qone.f](../verification/concept-symbols-v1.5.7/lambda-qone.f)（3576文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f())),
      (
        (
          f(f()),
          ((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),
          f()
        )
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QHalf

QRep ZOne ZTwo

[基本記号の全文：lambda-qhalf.f](../verification/concept-symbols-v1.5.7/lambda-qhalf.f)（3648文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f())),
      (
        (
          f(f()),
          ((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())
        ),
        (
          (f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),
          f()
        )
      )
    ),
    (
      (
        f(f()),
        (
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepNeg

λr.QRep (ZNeg (Fst r)) (Snd r)

[基本記号の全文：lambda-qrepneg.f](../verification/concept-symbols-v1.5.7/lambda-qrepneg.f)（4338文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f())),
      (
        (
          f(f(f())),
          ((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))),f())),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),((f(),(f(),f())),f()))),f()))),f()))
        ),
        (
          (f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),((f(),(f(),f())),f()))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepAdd

λa.λb.QRep (ZAdd (ZMul (Fst a) (Snd b)) (ZMul (Fst b) (Snd a))) (ZMul (Snd a) (Snd b))

[基本記号の全文：lambda-qrepadd.f](../verification/concept-symbols-v1.5.7/lambda-qrepadd.f)（11946文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepSub

λa.λb.QRepAdd a (QRepNeg b)

[基本記号の全文：lambda-qrepsub.f](../verification/concept-symbols-v1.5.7/lambda-qrepsub.f)（4155文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f(f()))),
      (
        (
          f(f(f())),
          ((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))))),f())),((f(),(f(f()),f())),f()))),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))))),f())),((f(),(f(),f())),f()))),f()))
        ),
        f()
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepMul

λa.λb.QRep (ZMul (Fst a) (Fst b)) (ZMul (Snd a) (Snd b))

[基本記号の全文：lambda-qrepmul.f](../verification/concept-symbols-v1.5.7/lambda-qrepmul.f)（7632文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepEq

λa.λb.ZEq (ZMul (Fst a) (Snd b)) (ZMul (Fst b) (Snd a))

[基本記号の全文：lambda-qrepeq.f](../verification/concept-symbols-v1.5.7/lambda-qrepeq.f)（7314文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepLeq

λa.λb.ZLeq (ZMul (Fst a) (Snd b)) (ZMul (Fst b) (Snd a))

[基本記号の全文：lambda-qrepleq.f](../verification/concept-symbols-v1.5.7/lambda-qrepleq.f)（7644文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepInv

λr.QMake (Snd r) (Fst r)

[基本記号の全文：lambda-qrepinv.f](../verification/concept-symbols-v1.5.7/lambda-qrepinv.f)（3426文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f())),
      (
        (
          f(f(f())),
          ((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))),f())),((f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),((f(),(f(),f())),f()))),f()))
        ),
        (
          (f(f(f())),((f(f()),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),f())),((f(),(f(),f())),f()))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 QRepDiv

λa.λb.QMake (ZMul (Fst a) (Snd b)) (ZMul (Snd a) (Fst b))

[基本記号の全文：lambda-qrepdiv.f](../verification/concept-symbols-v1.5.7/lambda-qrepdiv.f)（7899文字）

この例の全文は上記ファイルに収録しています。

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Identity

λx.x

[基本記号の全文：lambda-identity.f](../verification/concept-symbols-v1.5.7/lambda-identity.f)（36文字）

```text
(f(f(f(f()))),((f(),(f(),f())),f()))
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 FixY

λg.(λx.g (x x)) (λx.g (x x))

[基本記号の全文：lambda-fixy.f](../verification/concept-symbols-v1.5.7/lambda-fixy.f)（264文字）

```text
(
  f(f(f(f()))),
  (
    (
      f(f(f())),
      (
        (
          f(f(f(f()))),
          ((f(f(f())),((f(),(f(f()),f())),((f(f(f())),((f(),(f(),f())),((f(),(f(),f())),f()))),f()))),f())
        ),
        (
          (f(f(f(f()))),((f(f(f())),((f(),(f(f()),f())),((f(f(f())),((f(),(f(),f())),((f(),(f(),f())),f()))),f()))),f())),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### λ定義 Application

(λx.x) (λy.y)

[基本記号の全文：lambda-application.f](../verification/concept-symbols-v1.5.7/lambda-application.f)（93文字）

```text
(f(f(f())),((f(f(f(f()))),((f(),(f(),f())),f())),((f(f(f(f()))),((f(),(f(),f())),f())),f())))
```

検査：復号したλ項と元の項のα同値を検査。参照名の定義表は別途同梱。

### 全内蔵定義環境

List((Text(名前), λ本体))。全内蔵語彙を省略なく収録。

[基本記号の全文：lambda-environment.f](../verification/concept-symbols-v1.5.7/lambda-environment.f)（337443文字）

この例の全文は上記ファイルに収録しています。

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

## 命題と証明

### 項の束縛変数零

Node(0;N(0))。型と束縛は外側の文脈に依存。

[基本記号の全文：term-variable.f](../verification/concept-symbols-v1.5.7/term-variable.f)（15文字）

```text
(f(),(f(),f()))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 自然数一の定数項

Node(1;Type(N),N(1))

[基本記号の全文：term-literal.f](../verification/concept-symbols-v1.5.7/term-literal.f)（33文字）

```text
(f(f()),((f(),f()),(f(f()),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 加算の呼出式

Node(2;Text(Add),List(1,1))。定義表を伴う。

[基本記号の全文：term-add-call.f](../verification/concept-symbols-v1.5.7/term-add-call.f)（912文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    (((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())),f())
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 等式 1=1

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-equal.f](../verification/concept-symbols-v1.5.7/proposition-equal.f)（93文字）

```text
(f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f()))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 順序 0<1

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-less.f](../verification/concept-symbols-v1.5.7/proposition-less.f)（93文字）

```text
(f(f()),((f(),f()),((f(f()),((f(),f()),(f(),f()))),((f(f()),((f(),f()),(f(f()),f()))),f()))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### かつ

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-and.f](../verification/concept-symbols-v1.5.7/proposition-and.f)（207文字）

```text
(
  f(f(f())),
  (
    (f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())))),
    ((f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())))),f())
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### または

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-or.f](../verification/concept-symbols-v1.5.7/proposition-or.f)（210文字）

```text
(
  f(f(f(f()))),
  (
    (f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())))),
    ((f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())))),f())
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### ならば

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-implies.f](../verification/concept-symbols-v1.5.7/proposition-implies.f)（213文字）

```text
(
  f(f(f(f(f())))),
  (
    (f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())))),
    ((f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())))),f())
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 偽

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-false.f](../verification/concept-symbols-v1.5.7/proposition-false.f)（24文字）

```text
(f(f(f(f(f(f()))))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 任意のnについて n=n

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-forall.f](../verification/concept-symbols-v1.5.7/proposition-forall.f)（99文字）

```text
(f(f(f(f(f(f(f())))))),((f(),f()),((f(),((f(),f()),((f(),(f(),f())),((f(),(f(),f())),f())))),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### あるnについて n=0

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-exists.f](../verification/concept-symbols-v1.5.7/proposition-exists.f)（117文字）

```text
(
  f(f(f(f(f(f(f(f()))))))),
  ((f(),f()),((f(),((f(),f()),((f(),(f(),f())),((f(f()),((f(),f()),(f(),f()))),f())))),f()))
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 名前付き述語 nonzero(1)

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-predicate.f](../verification/concept-symbols-v1.5.7/proposition-predicate.f)（2460文字）

```text
(
  f(f(f(f(f(f(f(f(f())))))))),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))
        )
      )
    ),
    (((f(f()),((f(),f()),(f(f()),f()))),f()),f())
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 否定：1=1 ならば偽

命題構文の例。構文を保存することと真であることは別。

[基本記号の全文：proposition-not.f](../verification/concept-symbols-v1.5.7/proposition-not.f)（144文字）

```text
(
  f(f(f(f(f())))),
  (
    (f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())))),
    ((f(f(f(f(f(f()))))),f()),f())
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 加法結合律の全称命題

∀l:N.∀m:N.∀n:N. Add(Add(l,m),n)=Add(l,Add(m,n))

[基本記号の全文：proposition-associativity.f](../verification/concept-symbols-v1.5.7/proposition-associativity.f)（3645文字）

```text
(
  f(f(f(f(f(f(f())))))),
  (
    (f(),f()),
    (
      (
        f(f(f(f(f(f(f())))))),
        (
          (f(),f()),
          ((f(f(f(f(f(f(f())))))),((f(),f()),((f(),((f(),f()),((f(f(f())),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),(((f(f(f())),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),(((f(),(f(f(f())),f())),((f(),(f(f()),f())),f())),f()))),((f(),(f(),f())),f())),f()))),((f(f(f())),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),(((f(),(f(f(f())),f())),((f(f(f())),((f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))),(((f(),(f(f()),f())),((f(),(f(),f())),f())),f()))),f())),f()))),f())))),f()))),f())
        )
      ),
      f()
    )
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 空の仮定から1=1を述べる判断

(仮定List,命題)

[基本記号の全文：judgment.f](../verification/concept-symbols-v1.5.7/judgment.f)（99文字）

```text
(f(),(f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f())))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 反射規則の証明節点・表示案

List(規則1,判断,規則データ,前提List)。この表示案の汎用検査器は未実装。

[基本記号の全文：proof-node-reflexivity.f](../verification/concept-symbols-v1.5.7/proof-node-reflexivity.f)（168文字）

```text
(
  f(f()),
  (
    (f(),(f(),((f(),f()),((f(f()),((f(),f()),(f(f()),f()))),((f(f()),((f(),f()),(f(f()),f()))),f()))))),
    (((f(),f()),(f(f()),((f(),f()),(f(f()),f())))),(f(),f()))
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 自然数帰納の規則固有データ・仕様例

帰納変数番号、基底証明への参照番号、段階証明への参照番号。参照先と新鮮性検査を伴わない単独例は証明ではない。

[基本記号の全文：proof-induction-data.f](../verification/concept-symbols-v1.5.7/proof-induction-data.f)（30文字）

```text
(f(),(f(f()),(f(f(f())),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

## 生成ラベル・解析・計算証跡

### 区間 0/1 ～ 1/1

(下端Q,上端Q)。順序条件を別に確認。

[基本記号の全文：interval-unit.f](../verification/concept-symbols-v1.5.7/interval-unit.f)（54文字）

```text
(((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f()))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 区間 0/1 ～ 2/1

(下端Q,上端Q)。順序条件を別に確認。

[基本記号の全文：interval-sqrt2-initial.f](../verification/concept-symbols-v1.5.7/interval-sqrt2-initial.f)（57文字）

```text
(((f(),f()),(f(),f(f()))),((f(),f(f(f()))),(f(),f(f()))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 区間 1/1 ～ 3/2

(下端Q,上端Q)。順序条件を別に確認。

[基本記号の全文：interval-sqrt2-refined.f](../verification/concept-symbols-v1.5.7/interval-sqrt2-refined.f)（66文字）

```text
(((f(),f(f())),(f(),f(f()))),((f(),f(f(f(f())))),(f(),f(f(f())))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 精度要求p=2

型を外側で指定した直接表示。

[基本記号の全文：precision-two.f](../verification/concept-symbols-v1.5.7/precision-two.f)（9文字）

```text
f(f(f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### p=2の許容誤差1/4

型を外側で指定した直接表示。

[基本記号の全文：precision-width.f](../verification/concept-symbols-v1.5.7/precision-width.f)（36文字）

```text
((f(),f(f())),(f(),f(f(f(f(f()))))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 近似値・誤差上界の対：上下端による保証

(要求Nの3,(近似値Qの17/12,誤差上界Qの1/204))。型Tの値とは別に要求する有理応答。

[基本記号の全文：approx-value-error-bracket.f](../verification/concept-symbols-v1.5.7/approx-value-error-bracket.f)（762文字）

```text
(
  f(f(f(f()))),
  (
    ((f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))),
    (
      (f(),f(f())),
      (
        f(),
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      )
    )
  )
)
```

検査：有理上下端の平方挟み込み・正確な幅1/204・要求1/8以下を再計算。型Tとの一般対応は本文の手書き証明。

### 近似値・誤差上界の対：残差による保証

(要求Nの3,(近似値Qの17/12,誤差上界Qの1/288))。型Tの値とは別に要求する有理応答。

[基本記号の全文：approx-value-error-residual.f](../verification/concept-symbols-v1.5.7/approx-value-error-residual.f)（1014文字）

```text
(
  f(f(f(f()))),
  (
    ((f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))),
    (
      (f(),f(f())),
      (
        f(),
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      )
    )
  )
)
```

検査：q≥1と正確な残差から上界1/288・要求1/8以下を再計算。型Tとの一般対応は本文の手書き証明。

### 数列生成ラベル qlim(0,1) のパラメータ

(Q(0),Q(1))。本体はG(q,b)(n)=q+b/(n+1)という有限処理。bを保持する実行記録であり、Φで導入する関係子ラベルと区別。

[基本記号の全文：qlim-parameters.f](../verification/concept-symbols-v1.5.7/qlim-parameters.f)（54文字）

```text
(((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f()))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### qlim(0,1)への入力n=1

操作呼出し。応答値は1/2。

[基本記号の全文：qlim-call.f](../verification/concept-symbols-v1.5.7/qlim-call.f)（1515文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())
        )
      )
    ),
    (
      (
        (f(f()),((f(f(f())),f()),(((f(),f()),(f(),f(f()))),f()))),
        ((f(f()),((f(f(f())),f()),(((f(),f(f())),(f(),f(f()))),f()))),((f(f()),((f(),f()),(f(f()),f()))),f()))
      ),
      f()
    )
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### qlim(0,1)(1)の応答

型を外側で指定した直接表示。

[基本記号の全文：qlim-response.f](../verification/concept-symbols-v1.5.7/qlim-response.f)（30文字）

```text
((f(),f(f())),(f(),f(f(f()))))
```

検査：型付きの復号結果を、指定した正規値と照合。

## 生成記録から関係子ラベルへ

### bを保持する生成記録 G(0,1/2)

(基準値Q,係数Q)。G(q,b)(n)=q+b/(n+1)を実行するため、bを保存する。Φの出力とは別の型。

[基本記号の全文：relation-g-half.f](../verification/concept-symbols-v1.5.7/relation-g-half.f)（57文字）

```text
(((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f())))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### bを保持する生成記録 G(0,3/4)

(基準値Q,係数Q)。G(q,b)(n)=q+b/(n+1)を実行するため、bを保存する。Φの出力とは別の型。

[基本記号の全文：relation-g-three-quarters.f](../verification/concept-symbols-v1.5.7/relation-g-three-quarters.f)（69文字）

```text
(((f(),f()),(f(),f(f()))),((f(),f(f(f(f())))),(f(),f(f(f(f(f())))))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 共通部分列 t=1：添字1と2で1/4

List(G(0,1/2),G(0,3/4),r=2,s=3,t,n=2t−1,m=3t−1,共通値Q)。b/c=r/sと両出力を再計算。

[基本記号の全文：relation-common-1.f](../verification/concept-symbols-v1.5.7/relation-common-1.f)（231文字）

```text
(
  (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f()))))),
  (
    (((f(),f()),(f(),f(f()))),((f(),f(f(f(f())))),(f(),f(f(f(f(f()))))))),
    (f(f(f())),(f(f(f(f()))),(f(f()),(f(f()),(f(f(f())),(((f(),f(f())),(f(),f(f(f(f(f())))))),f()))))))
  )
)
```

検査：記録した有限添字で比・添字対応・有理出力を検査。任意tの共通部分列定理は本文命題6.2の手書き証明。

### 共通部分列 t=2：添字3と5で1/8

List(G(0,1/2),G(0,3/4),r=2,s=3,t,n=2t−1,m=3t−1,共通値Q)。b/c=r/sと両出力を再計算。

[基本記号の全文：relation-common-2.f](../verification/concept-symbols-v1.5.7/relation-common-2.f)（261文字）

```text
(
  (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f()))))),
  (
    (((f(),f()),(f(),f(f()))),((f(),f(f(f(f())))),(f(),f(f(f(f(f()))))))),
    (
      f(f(f())),
      (
        f(f(f(f()))),
        (f(f(f())),(f(f(f(f()))),(f(f(f(f(f(f()))))),(((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f())))))))))),f()))))
      )
    )
  )
)
```

検査：記録した有限添字で比・添字対応・有理出力を検査。任意tの共通部分列定理は本文命題6.2の手書き証明。

### 共通部分列 t=3：添字5と8で1/12

List(G(0,1/2),G(0,3/4),r=2,s=3,t,n=2t−1,m=3t−1,共通値Q)。b/c=r/sと両出力を再計算。

[基本記号の全文：relation-common-3.f](../verification/concept-symbols-v1.5.7/relation-common-3.f)（291文字）

```text
(
  (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f()))))),
  (
    (((f(),f()),(f(),f(f()))),((f(),f(f(f(f())))),(f(),f(f(f(f(f()))))))),
    (
      f(f(f())),
      (
        f(f(f(f()))),
        (
          f(f(f(f()))),
          (f(f(f(f(f(f()))))),(f(f(f(f(f(f(f(f(f())))))))),(((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))),f())))
        )
      )
    )
  )
)
```

検査：記録した有限添字で比・添字対応・有理出力を検査。任意tの共通部分列定理は本文命題6.2の手書き証明。

### Φ(G(0,1/2))=0##

List(生成記録G,導入先L)。Φ(G(q,b))=(2sgn(b),q)を指定規則として適用し、出力ではbを捨てて整数kを保持する。

[基本記号の全文：relation-intro-positive-half.f](../verification/concept-symbols-v1.5.7/relation-intro-positive-half.f)（108文字）

```text
((((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f()))))),(((f(),f(f(f()))),((f(),f()),(f(),f(f())))),f()))
```

検査：復号したbの符号からk=2sgn(b)を再計算。これは明示した導入規則の個別検査であり、点ごとの加法の保存を主張しない。

### Φ(G(0,3/4))=0##

List(生成記録G,導入先L)。Φ(G(q,b))=(2sgn(b),q)を指定規則として適用し、出力ではbを捨てて整数kを保持する。

[基本記号の全文：relation-intro-positive-three-quarters.f](../verification/concept-symbols-v1.5.7/relation-intro-positive-three-quarters.f)（120文字）

```text
(
  (((f(),f()),(f(),f(f()))),((f(),f(f(f(f())))),(f(),f(f(f(f(f()))))))),
  (((f(),f(f(f()))),((f(),f()),(f(),f(f())))),f())
)
```

検査：復号したbの符号からk=2sgn(b)を再計算。これは明示した導入規則の個別検査であり、点ごとの加法の保存を主張しない。

### Φ(G(0,−1/2))=0♭♭

List(生成記録G,導入先L)。Φ(G(q,b))=(2sgn(b),q)を指定規則として適用し、出力ではbを捨てて整数kを保持する。

[基本記号の全文：relation-intro-negative.f](../verification/concept-symbols-v1.5.7/relation-intro-negative.f)（114文字）

```text
(
  (((f(),f()),(f(),f(f()))),((f(f()),f(f())),(f(),f(f(f()))))),
  (((f(f()),f(f(f()))),((f(),f()),(f(),f(f())))),f())
)
```

検査：復号したbの符号からk=2sgn(b)を再計算。これは明示した導入規則の個別検査であり、点ごとの加法の保存を主張しない。

### Φ(G(2,0))=2

List(生成記録G,導入先L)。Φ(G(q,b))=(2sgn(b),q)を指定規則として適用し、出力ではbを捨てて整数kを保持する。

[基本記号の全文：relation-intro-zero.f](../verification/concept-symbols-v1.5.7/relation-intro-zero.f)（108文字）

```text
((((f(),f(f(f()))),(f(),f(f()))),((f(),f()),(f(),f(f())))),(((f(),f()),((f(),f(f(f()))),(f(),f(f())))),f()))
```

検査：復号したbの符号からk=2sgn(b)を再計算。これは明示した導入規則の個別検査であり、点ごとの加法の保存を主張しない。

### 関係子ラベル (k,q)=(1,0)

整数kは関係子の個数を保つ。近似を要求する自然数nとは別の欄であり、演算後も符号だけへ圧縮しない。

[基本記号の全文：relation-l-one-step.f](../verification/concept-symbols-v1.5.7/relation-l-one-step.f)（39文字）

```text
((f(),f(f())),((f(),f()),(f(),f(f()))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 関係子ラベル (k,q)=(2,0)

整数kは関係子の個数を保つ。近似を要求する自然数nとは別の欄であり、演算後も符号だけへ圧縮しない。

[基本記号の全文：relation-l-two-steps.f](../verification/concept-symbols-v1.5.7/relation-l-two-steps.f)（42文字）

```text
((f(),f(f(f()))),((f(),f()),(f(),f(f()))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 関係子ラベル (k,q)=(4,0)

整数kは関係子の個数を保つ。近似を要求する自然数nとは別の欄であり、演算後も符号だけへ圧縮しない。

[基本記号の全文：relation-l-four-steps.f](../verification/concept-symbols-v1.5.7/relation-l-four-steps.f)（48文字）

```text
((f(),f(f(f(f(f()))))),((f(),f()),(f(),f(f()))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 関係子の加算 0##+0##=0####

List(L(2,0),L(2,0),L(4,0))。成分加法とFへの埋込みで照合する。加算結果k=4を保持する。

[基本記号の全文：relation-l-addition.f](../verification/concept-symbols-v1.5.7/relation-l-addition.f)（144文字）

```text
(
  ((f(),f(f(f()))),((f(),f()),(f(),f(f())))),
  (((f(),f(f(f()))),((f(),f()),(f(),f(f())))),(((f(),f(f(f(f(f()))))),((f(),f()),(f(),f(f())))),f()))
)
```

検査：整数・有理成分の和と既存F算術を別々に再計算。一般の加法群法則は本文定理7.1の手書き証明。

### 順序 0<0#<0##<0####

List(L(0,0),L(1,0),L(2,0),L(4,0))。基準値が同じとき、整数kの順序がF内でも保たれる。

[基本記号の全文：relation-l-order.f](../verification/concept-symbols-v1.5.7/relation-l-order.f)（180文字）

```text
(
  ((f(),f()),((f(),f()),(f(),f(f())))),
  (
    ((f(),f(f())),((f(),f()),(f(),f(f())))),
    (((f(),f(f(f()))),((f(),f()),(f(),f(f())))),(((f(),f(f(f(f(f()))))),((f(),f()),(f(),f(f())))),f()))
  )
)
```

検査：既存F比較で三つの厳密不等式を検査。順序保存の全称命題とは区別。

### Φ(u+u)とΦ(u)+Φ(u)は異なる

List(u=G(0,1/2),点ごとの和G(0,1),再導入L(2,0),ラベルの和L(4,0))。異なる二つの経路を保持する。

[基本記号の全文：relation-intro-not-additive.f](../verification/concept-symbols-v1.5.7/relation-intro-not-additive.f)（216文字）

```text
(
  (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f()))))),
  (
    (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f())))),
    (((f(),f(f(f()))),((f(),f()),(f(),f(f())))),(((f(),f(f(f(f(f()))))),((f(),f()),(f(),f(f())))),f()))
  )
)
```

検査：一つの反例を成分算術とF比較で再計算。Φを加法準同型、または逐点加算を継承する商写像とする誤った同定を検出する。

### (3/2)##の有理近似：p=3で出力3/2

List(L(2,3/2),近似値Qの3/2,要求Nの3,有理上界Qの1/8)。厳密な差2εを零にせず、有理誤差と比較する。

[基本記号の全文：relation-rational-error.f](../verification/concept-symbols-v1.5.7/relation-rational-error.f)（165文字）

```text
(
  ((f(),f(f(f()))),((f(),f(f(f(f())))),(f(),f(f(f()))))),
  (((f(),f(f(f(f())))),(f(),f(f(f())))),(f(f(f(f()))),(((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f())))))))))),f())))
)
```

検査：p=3の誤差だけを既存F算術で検査。全pの保証は本文命題9.6の手書き証明であり、近似の一致を厳密等値にしない。

### 整数欄が自然数だけの不正Lを拒否

List(指定検査名,検査対象,受理しないという真偽値0)。不正な候補を成功値として扱わず、実際の局所検査で拒否を確認する。

[基本記号の全文：relation-reject-malformed-label.f](../verification/concept-symbols-v1.5.7/relation-reject-malformed-label.f)（2064文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))
        )
      )
    )
  ),
  ((f(f(f())),((f(),f()),(f(),f(f())))),(f(),f()))
)
```

検査：保存した候補を復号し、指定した局所検査が例外で拒否することを実行確認。任意のプログラムに対する万能検査ではない。

### Φの虚偽結果L(4,0)を拒否

List(指定検査名,検査対象,受理しないという真偽値0)。不正な候補を成功値として扱わず、実際の局所検査で拒否を確認する。

[基本記号の全文：relation-reject-false-introduction.f](../verification/concept-symbols-v1.5.7/relation-reject-false-introduction.f)（1017文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        f()
      )
    )
  ),
  (
    (
      (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f()))))),
      (((f(),f(f(f(f(f()))))),((f(),f()),(f(),f(f())))),f())
    ),
    (f(),f())
  )
)
```

検査：保存した候補を復号し、指定した局所検査が例外で拒否することを実行確認。任意のプログラムに対する万能検査ではない。

### 加算後にkを2へ圧縮した虚偽結果を拒否

List(指定検査名,検査対象,受理しないという真偽値0)。不正な候補を成功値として扱わず、実際の局所検査で拒否を確認する。

[基本記号の全文：relation-reject-compressed-sum.f](../verification/concept-symbols-v1.5.7/relation-reject-compressed-sum.f)（1203文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    )
  ),
  (
    (
      ((f(),f(f(f()))),((f(),f()),(f(),f(f())))),
      (((f(),f(f(f()))),((f(),f()),(f(),f(f())))),(((f(),f(f(f()))),((f(),f()),(f(),f(f())))),f()))
    ),
    (f(),f())
  )
)
```

検査：保存した候補を復号し、指定した局所検査が例外で拒否することを実行確認。任意のプログラムに対する万能検査ではない。

## 等比生成記録と循環小数の読み分け

### 1/3への下側手続き

(Q(q),(Q(b),Q(r)))。H(q,b,r)はx_0=q+b、x_{n+1}=q+r(x_n−q)を実行する記録。0<r<1を検査する。

[基本記号の全文：geometric-h-third-lower.f](../verification/concept-symbols-v1.5.7/geometric-h-third-lower.f)（129文字）

```text
(
  ((f(),f(f())),(f(),f(f(f(f()))))),
  (((f(f()),f(f())),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 1/3への下側手続き：n=0,1,2,3の応答

List(H,各段のList(N(n),Q(value)))。保存した四段階を、q+br^nと一段の再帰式の両方で再計算する。

[基本記号の全文：geometric-trace-third-lower.f](../verification/concept-symbols-v1.5.7/geometric-trace-third-lower.f)（4743文字）

```text
(
  (
    ((f(),f(f())),(f(),f(f(f(f()))))),
    (((f(f()),f(f())),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  ),
  (
    (
      (f(),(((f(),f()),(f(),f(f()))),f())),
      (
        (f(f()),(((f(),f(f(f(f())))),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))),f())),
        (
          (f(f(f())),(((f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())),
          ((f(f(f(f()))),(((f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())),f())
        )
      )
    ),
    f()
  )
)
```

検査：四つの有理出力を二つの式で検査。任意nの式・停止・方向の一般保証は本文付録Aの手書き証明。

### 1/3への下側手続きからΨでLへ導入

List(H,L)。Ψ(H(q,b,r))=(2sgn(b),q)という指定した導入規則を適用する。実行回数nや縮小率rをkへ移さない。

[基本記号の全文：geometric-intro-third-lower.f](../verification/concept-symbols-v1.5.7/geometric-intro-third-lower.f)（192文字）

```text
(
  (
    ((f(),f(f())),(f(),f(f(f(f()))))),
    (((f(f()),f(f())),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  ),
  (((f(f()),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),f())
)
```

検査：復号したHの形成条件とbの符号を調べ、導入先の整数kと有理成分qを照合。逐点加法を継承する写像ではない。

### 1/3への上側手続き

(Q(q),(Q(b),Q(r)))。H(q,b,r)はx_0=q+b、x_{n+1}=q+r(x_n−q)を実行する記録。0<r<1を検査する。

[基本記号の全文：geometric-h-third-upper.f](../verification/concept-symbols-v1.5.7/geometric-h-third-upper.f)（129文字）

```text
(
  ((f(),f(f())),(f(),f(f(f(f()))))),
  (((f(),f(f(f()))),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 1/3への上側手続き：n=0,1,2,3の応答

List(H,各段のList(N(n),Q(value)))。保存した四段階を、q+br^nと一段の再帰式の両方で再計算する。

[基本記号の全文：geometric-trace-third-upper.f](../verification/concept-symbols-v1.5.7/geometric-trace-third-upper.f)（2532文字）

```text
(
  (
    ((f(),f(f())),(f(),f(f(f(f()))))),
    (((f(),f(f(f()))),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  ),
  (
    (
      (f(),(((f(),f(f())),(f(),f(f()))),f())),
      (
        (f(f()),(((f(),f(f(f()))),(f(),f(f(f(f(f(f()))))))),f())),
        (
          (f(f(f())),(((f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))),f())),
          ((f(f(f(f()))),(((f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())),f())
        )
      )
    ),
    f()
  )
)
```

検査：四つの有理出力を二つの式で検査。任意nの式・停止・方向の一般保証は本文付録Aの手書き証明。

### 1/3への上側手続きからΨでLへ導入

List(H,L)。Ψ(H(q,b,r))=(2sgn(b),q)という指定した導入規則を適用する。実行回数nや縮小率rをkへ移さない。

[基本記号の全文：geometric-intro-third-upper.f](../verification/concept-symbols-v1.5.7/geometric-intro-third-upper.f)（189文字）

```text
(
  (
    ((f(),f(f())),(f(),f(f(f(f()))))),
    (((f(),f(f(f()))),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  ),
  (((f(),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),f())
)
```

検査：復号したHの形成条件とbの符号を調べ、導入先の整数kと有理成分qを照合。逐点加法を継承する写像ではない。

### 厳密な有理数1/3を返す定数手続き

(Q(q),(Q(b),Q(r)))。H(q,b,r)はx_0=q+b、x_{n+1}=q+r(x_n−q)を実行する記録。0<r<1を検査する。

[基本記号の全文：geometric-h-third-fixed.f](../verification/concept-symbols-v1.5.7/geometric-h-third-fixed.f)（117文字）

```text
(
  ((f(),f(f())),(f(),f(f(f(f()))))),
  (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 厳密な有理数1/3を返す定数手続き：n=0,1,2,3の応答

List(H,各段のList(N(n),Q(value)))。保存した四段階を、q+br^nと一段の再帰式の両方で再計算する。

[基本記号の全文：geometric-trace-third-fixed.f](../verification/concept-symbols-v1.5.7/geometric-trace-third-fixed.f)（339文字）

```text
(
  (
    ((f(),f(f())),(f(),f(f(f(f()))))),
    (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  ),
  (
    (
      (f(),(((f(),f(f())),(f(),f(f(f(f()))))),f())),
      (
        (f(f()),(((f(),f(f())),(f(),f(f(f(f()))))),f())),
        (
          (f(f(f())),(((f(),f(f())),(f(),f(f(f(f()))))),f())),
          ((f(f(f(f()))),(((f(),f(f())),(f(),f(f(f(f()))))),f())),f())
        )
      )
    ),
    f()
  )
)
```

検査：四つの有理出力を二つの式で検査。任意nの式・停止・方向の一般保証は本文付録Aの手書き証明。

### 厳密な有理数1/3を返す定数手続きからΨでLへ導入

List(H,L)。Ψ(H(q,b,r))=(2sgn(b),q)という指定した導入規則を適用する。実行回数nや縮小率rをkへ移さない。

[基本記号の全文：geometric-intro-third-fixed.f](../verification/concept-symbols-v1.5.7/geometric-intro-third-fixed.f)（171文字）

```text
(
  (
    ((f(),f(f())),(f(),f(f(f(f()))))),
    (((f(),f()),(f(),f(f()))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  ),
  (((f(),f()),((f(),f(f())),(f(),f(f(f(f())))))),f())
)
```

検査：復号したHの形成条件とbの符号を調べ、導入先の整数kと有理成分qを照合。逐点加法を継承する写像ではない。

### 2/3への下側手続き

(Q(q),(Q(b),Q(r)))。H(q,b,r)はx_0=q+b、x_{n+1}=q+r(x_n−q)を実行する記録。0<r<1を検査する。

[基本記号の全文：geometric-h-two-thirds-lower.f](../verification/concept-symbols-v1.5.7/geometric-h-two-thirds-lower.f)（135文字）

```text
(
  ((f(),f(f(f()))),(f(),f(f(f(f()))))),
  (((f(f()),f(f(f()))),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 2/3への下側手続き：n=0,1,2,3の応答

List(H,各段のList(N(n),Q(value)))。保存した四段階を、q+br^nと一段の再帰式の両方で再計算する。

[基本記号の全文：geometric-trace-two-thirds-lower.f](../verification/concept-symbols-v1.5.7/geometric-trace-two-thirds-lower.f)（3084文字）

```text
(
  (
    ((f(),f(f(f()))),(f(),f(f(f(f()))))),
    (((f(f()),f(f(f()))),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  ),
  (
    (
      (f(),(((f(),f()),(f(),f(f()))),f())),
      (
        (f(f()),(((f(),f(f(f(f())))),(f(),f(f(f(f(f(f()))))))),f())),
        (
          (f(f(f())),(((f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))),f())),
          ((f(f(f(f()))),(((f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())),f())
        )
      )
    ),
    f()
  )
)
```

検査：四つの有理出力を二つの式で検査。任意nの式・停止・方向の一般保証は本文付録Aの手書き証明。

### 2/3への下側手続きからΨでLへ導入

List(H,L)。Ψ(H(q,b,r))=(2sgn(b),q)という指定した導入規則を適用する。実行回数nや縮小率rをkへ移さない。

[基本記号の全文：geometric-intro-two-thirds-lower.f](../verification/concept-symbols-v1.5.7/geometric-intro-two-thirds-lower.f)（201文字）

```text
(
  (
    ((f(),f(f(f()))),(f(),f(f(f(f()))))),
    (((f(f()),f(f(f()))),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  ),
  (((f(f()),f(f(f()))),((f(),f(f(f()))),(f(),f(f(f(f())))))),f())
)
```

検査：復号したHの形成条件とbの符号を調べ、導入先の整数kと有理成分qを照合。逐点加法を継承する写像ではない。

### メンガースポンジの有限段階体積

(Q(q),(Q(b),Q(r)))。H(q,b,r)はx_0=q+b、x_{n+1}=q+r(x_n−q)を実行する記録。0<r<1を検査する。

[基本記号の全文：geometric-h-menger-volume.f](../verification/concept-symbols-v1.5.7/geometric-h-menger-volume.f)（219文字）

```text
(
  ((f(),f()),(f(),f(f()))),
  (
    ((f(),f(f())),(f(),f(f()))),
    (
      (f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))),
      (f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))
    )
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### メンガースポンジの有限段階体積：n=0,1,2,3の応答

List(H,各段のList(N(n),Q(value)))。保存した四段階を、q+br^nと一段の再帰式の両方で再計算する。

[基本記号の全文：geometric-trace-menger-volume.f](../verification/concept-symbols-v1.5.7/geometric-trace-menger-volume.f)（86976文字）

この例の全文は上記ファイルに収録しています。

検査：四つの有理出力を二つの式で検査。任意nの式・停止・方向の一般保証は本文付録Aの手書き証明。

### メンガースポンジの有限段階体積からΨでLへ導入

List(H,L)。Ψ(H(q,b,r))=(2sgn(b),q)という指定した導入規則を適用する。実行回数nや縮小率rをkへ移さない。

[基本記号の全文：geometric-intro-menger-volume.f](../verification/concept-symbols-v1.5.7/geometric-intro-menger-volume.f)（270文字）

```text
(
  (
    ((f(),f()),(f(),f(f()))),
    (
      ((f(),f(f())),(f(),f(f()))),
      (
        (f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))),
        (f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))
      )
    )
  ),
  (((f(),f(f(f()))),((f(),f()),(f(),f(f())))),f())
)
```

検査：復号したHの形成条件とbの符号を調べ、導入先の整数kと有理成分qを照合。逐点加法を継承する写像ではない。

### 循環小数の記録 0._3

List(非負整数部N,有限非循環桁のList,非空循環桁のList)。_以降の桁を循環部とする表記規約だけを保持し、下側・上側・厳密値の読みは別に指定する。

[基本記号の全文：decimal-record-third.f](../verification/concept-symbols-v1.5.7/decimal-record-third.f)（36文字）

```text
(f(),(f(),((f(f(f(f()))),f()),f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 0._3の厳密な有理数としての読み

List(循環小数記録,厳密有理値Q,L(0,厳密有理値))。循環部に対する有限の有理式で評価し、関係子の個数は零とする。

[基本記号の全文：decimal-exact-third.f](../verification/concept-symbols-v1.5.7/decimal-exact-third.f)（126文字）

```text
(
  (f(),(f(),((f(f(f(f()))),f()),f()))),
  (((f(),f(f())),(f(),f(f(f(f()))))),(((f(),f()),((f(),f(f())),(f(),f(f(f(f())))))),f()))
)
```

検査：有限の桁から有理式を再計算。循環小数記録それ自体を下側ラベルや上側ラベルとは同一視しない。

### 循環小数の記録 0._6

List(非負整数部N,有限非循環桁のList,非空循環桁のList)。_以降の桁を循環部とする表記規約だけを保持し、下側・上側・厳密値の読みは別に指定する。

[基本記号の全文：decimal-record-two-thirds.f](../verification/concept-symbols-v1.5.7/decimal-record-two-thirds.f)（45文字）

```text
(f(),(f(),((f(f(f(f(f(f(f())))))),f()),f())))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 0._6の厳密な有理数としての読み

List(循環小数記録,厳密有理値Q,L(0,厳密有理値))。循環部に対する有限の有理式で評価し、関係子の個数は零とする。

[基本記号の全文：decimal-exact-two-thirds.f](../verification/concept-symbols-v1.5.7/decimal-exact-two-thirds.f)（141文字）

```text
(
  (f(),(f(),((f(f(f(f(f(f(f())))))),f()),f()))),
  (((f(),f(f(f()))),(f(),f(f(f(f()))))),(((f(),f()),((f(),f(f(f()))),(f(),f(f(f(f())))))),f()))
)
```

検査：有限の桁から有理式を再計算。循環小数記録それ自体を下側ラベルや上側ラベルとは同一視しない。

### 同じ小数1桁と異なるラベル：1/3

List(0._3の記録,n,下端d_n,上端u_n,接頭桁の整数,List(L(−2,1/3),L(0,1/3),L(2,1/3)),厳密値1/3)。三元が同じ有理小数区間の内側にあっても等しくはない。

[基本記号の全文：decimal-prefix-1.f](../verification/concept-symbols-v1.5.7/decimal-prefix-1.f)（375文字）

```text
(
  (f(),(f(),((f(f(f(f()))),f()),f()))),
  (
    f(f()),
    (
      ((f(),f(f(f(f())))),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))),
      (
        ((f(),f(f(f()))),(f(),f(f(f(f(f(f()))))))),
        (
          f(f(f(f()))),
          ((((f(f()),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),(((f(),f()),((f(),f(f())),(f(),f(f(f(f())))))),(((f(),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),f()))),(((f(),f(f())),(f(),f(f(f(f()))))),f()))
        )
      )
    )
  )
)
```

検査：切捨て桁・上下H応答を有理算術で再計算し、三つの異なるL表示に対する六つの厳密比較を既存F算術で検査。全桁の保証は付録Aの手書き証明。

### 同じ小数2桁と異なるラベル：1/3

List(0._3の記録,n,下端d_n,上端u_n,接頭桁の整数,List(L(−2,1/3),L(0,1/3),L(2,1/3)),厳密値1/3)。三元が同じ有理小数区間の内側にあっても等しくはない。

[基本記号の全文：decimal-prefix-2.f](../verification/concept-symbols-v1.5.7/decimal-prefix-2.f)（1008文字）

```text
(
  (f(),(f(),((f(f(f(f()))),f()),f()))),
  (
    f(f(f())),
    (
      (
        (f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))),
        (
          f(),
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        )
      ),
      (
        (
          (f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))),
          (f(),f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))
        ),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))),
          ((((f(f()),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),(((f(),f()),((f(),f(f())),(f(),f(f(f(f())))))),(((f(),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),f()))),(((f(),f(f())),(f(),f(f(f(f()))))),f()))
        )
      )
    )
  )
)
```

検査：切捨て桁・上下H応答を有理算術で再計算し、三つの異なるL表示に対する六つの厳密比較を既存F算術で検査。全桁の保証は付録Aの手書き証明。

### 同じ小数3桁と異なるラベル：1/3

List(0._3の記録,n,下端d_n,上端u_n,接頭桁の整数,List(L(−2,1/3),L(0,1/3),L(2,1/3)),厳密値1/3)。三元が同じ有理小数区間の内側にあっても等しくはない。

[基本記号の全文：decimal-prefix-3.f](../verification/concept-symbols-v1.5.7/decimal-prefix-3.f)（7311文字）

この例の全文は上記ファイルに収録しています。

検査：切捨て桁・上下H応答を有理算術で再計算し、三つの異なるL表示に対する六つの厳密比較を既存F算術で検査。全桁の保証は付録Aの手書き証明。

### 1/3下側＋2/3下側：L(−4,1)

List(L左,L右,L結果)。小数の桁の見かけを使わず、指定型Lの整数・有理成分を加える。

[基本記号の全文：decimal-lower-sum.f](../verification/concept-symbols-v1.5.7/decimal-lower-sum.f)（177文字）

```text
(
  ((f(f()),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),
  (
    ((f(f()),f(f(f()))),((f(),f(f(f()))),(f(),f(f(f(f())))))),
    (((f(f()),f(f(f(f(f()))))),((f(),f(f())),(f(),f(f())))),f())
  )
)
```

検査：成分加法とFへの埋込みを照合。下側同士ではk=−4を保持し、上側と下側ではk=0となる。

### 1/3上側＋2/3下側：厳密な1

List(L左,L右,L結果)。小数の桁の見かけを使わず、指定型Lの整数・有理成分を加える。

[基本記号の全文：decimal-mixed-sum.f](../verification/concept-symbols-v1.5.7/decimal-mixed-sum.f)（159文字）

```text
(
  ((f(),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),
  (((f(f()),f(f(f()))),((f(),f(f(f()))),(f(),f(f(f(f())))))),(((f(),f()),((f(),f(f())),(f(),f(f())))),f()))
)
```

検査：成分加法とFへの埋込みを照合。下側同士ではk=−4を保持し、上側と下側ではk=0となる。

### 縮小率r=1のHを拒否

List(指定検査名,検査対象,拒否予定N(0))。保存した候補を局所検査へ渡し、実際の拒否を確認する。

[基本記号の全文：geometric-decimal-reject-invalid-ratio.f](../verification/concept-symbols-v1.5.7/geometric-decimal-reject-invalid-ratio.f)（2100文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))
        )
      )
    )
  ),
  ((((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),((f(),f(f())),(f(),f(f()))))),(f(),f()))
)
```

検査：形成条件または主張に反する具体的候補を拒否。未知の再帰処理の意味や停止を判定する検査ではない。

### 桁10を含む循環記録を拒否

List(指定検査名,検査対象,拒否予定N(0))。保存した候補を局所検査へ渡し、実際の拒否を確認する。

[基本記号の全文：geometric-decimal-reject-invalid-digit.f](../verification/concept-symbols-v1.5.7/geometric-decimal-reject-invalid-digit.f)（3954文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))))))))
        )
      )
    )
  ),
  ((f(),(f(),((f(f(f(f(f(f(f(f(f(f(f())))))))))),f()),f()))),(f(),f()))
)
```

検査：形成条件または主張に反する具体的候補を拒否。未知の再帰処理の意味や停止を判定する検査ではない。

### 空の循環部を拒否

List(指定検査名,検査対象,拒否予定N(0))。保存した候補を局所検査へ渡し、実際の拒否を確認する。

[基本記号の全文：geometric-decimal-reject-empty-repeat.f](../verification/concept-symbols-v1.5.7/geometric-decimal-reject-empty-repeat.f)（3918文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f())))))))))
        )
      )
    )
  ),
  ((f(),(f(),(f(),f()))),(f(),f()))
)
```

検査：形成条件または主張に反する具体的候補を拒否。未知の再帰処理の意味や停止を判定する検査ではない。

### 下側手続きの虚偽出力1/3を拒否

List(指定検査名,検査対象,拒否予定N(0))。保存した候補を局所検査へ渡し、実際の拒否を確認する。

[基本記号の全文：geometric-decimal-reject-false-recurrence.f](../verification/concept-symbols-v1.5.7/geometric-decimal-reject-false-recurrence.f)（1986文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))
        )
      )
    )
  ),
  (
    (
      (
        ((f(),f(f())),(f(),f(f(f(f()))))),
        (((f(f()),f(f())),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
      ),
      (((f(),(((f(),f()),(f(),f(f()))),f())),((f(f()),(((f(),f(f())),(f(),f(f(f(f()))))),f())),f())),f())
    ),
    (f(),f())
  )
)
```

検査：形成条件または主張に反する具体的候補を拒否。未知の再帰処理の意味や停止を判定する検査ではない。

### 下側Hを正方向k=2へ導入した虚偽結果を拒否

List(指定検査名,検査対象,拒否予定N(0))。保存した候補を局所検査へ渡し、実際の拒否を確認する。

[基本記号の全文：geometric-decimal-reject-false-direction.f](../verification/concept-symbols-v1.5.7/geometric-decimal-reject-false-direction.f)（1125文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        f()
      )
    )
  ),
  (
    (
      (
        ((f(),f(f())),(f(),f(f(f(f()))))),
        (((f(f()),f(f())),(f(),f(f(f(f()))))),((f(),f(f())),(f(),f(f(f(f(f(f(f(f(f(f(f())))))))))))))
      ),
      (((f(),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),f())
    ),
    (f(),f())
  )
)
```

検査：形成条件または主張に反する具体的候補を拒否。未知の再帰処理の意味や停止を判定する検査ではない。

### 厳密な1/3へk=−2を付した虚偽同定を拒否

List(指定検査名,検査対象,拒否予定N(0))。保存した候補を局所検査へ渡し、実際の拒否を確認する。

[基本記号の全文：geometric-decimal-reject-false-exact-label.f](../verification/concept-symbols-v1.5.7/geometric-decimal-reject-false-exact-label.f)（3789文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          (f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),f()))))))))
        )
      )
    )
  ),
  (
    (
      (f(),(f(),((f(f(f(f()))),f()),f()))),
      (((f(),f(f())),(f(),f(f(f(f()))))),(((f(f()),f(f(f()))),((f(),f(f())),(f(),f(f(f(f())))))),f()))
    ),
    (f(),f())
  )
)
```

検査：形成条件または主張に反する具体的候補を拒否。未知の再帰処理の意味や停止を判定する検査ではない。

## 生成ラベル・解析・計算証跡

### √2の区間生成ラベルが指定する生成器の状態

List(段数2,下端1,上端3/2)

[基本記号の全文：sqrt2-state.f](../verification/concept-symbols-v1.5.7/sqrt2-state.f)（84文字）

```text
(f(f(f())),(((f(),f(f())),(f(),f(f()))),(((f(),f(f(f(f())))),(f(),f(f(f())))),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### Leibniz区間生成ラベルが指定する生成器の初期状態

List(段数0,下端8/3,上端4)

[基本記号の全文：leibniz-state.f](../verification/concept-symbols-v1.5.7/leibniz-state.f)（105文字）

```text
(f(),(((f(),f(f(f(f(f(f(f(f(f()))))))))),(f(),f(f(f(f()))))),(((f(),f(f(f(f(f()))))),(f(),f(f()))),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### qlimの規則・引数・仕様・証拠を保持する記録

List(規則参照,引数,仕様,証拠)。qlimの応答を検査するための記録例であり、全ての数やTに要求する統合ラベルではない。証拠欄は本文命題6.1への手書き証明参照。

[基本記号の全文：label-with-evidence.f](../verification/concept-symbols-v1.5.7/label-with-evidence.f)（25215文字）

この例の全文は上記ファイルに収録しています。

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 分離証拠を待つ除算の構文

DivLabel(P,Q)という呼出式。非零分離の条件が未充足なので、契約を満たすラベルとして実行する証拠ではない。

[基本記号の全文：label-pending-division.f](../verification/concept-symbols-v1.5.7/label-pending-division.f)（10419文字）

この例の全文は上記ファイルに収録しています。

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### Newton法の一更新後の状態

List(段数1,下端4/3,上端3/2)。上下端の積は2。

[基本記号の全文：newton-state.f](../verification/concept-symbols-v1.5.7/newton-state.f)（96文字）

```text
(f(f()),(((f(),f(f(f(f(f()))))),(f(),f(f(f(f()))))),(((f(),f(f(f(f())))),(f(),f(f(f())))),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 零から離れた回答の証拠データ

(要求0,区間[1,2])。端点の非零分離だけを検査し、対応する生成ラベルの全称契約は別に必要。

[基本記号の全文：separation-witness.f](../verification/concept-symbols-v1.5.7/separation-witness.f)（66文字）

```text
(f(),(((f(),f(f())),(f(),f(f()))),((f(),f(f(f()))),(f(),f(f())))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 零の分類 zero

Node(0;)。零・非零・未確定を区別する。具体的な分類の計算証拠はproof-generatorsに収録。

[基本記号の全文：zero-classification-zero.f](../verification/concept-symbols-v1.5.7/zero-classification-zero.f)（9文字）

```text
(f(),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 零の分類 nonzero

Node(1;)。零・非零・未確定を区別する。具体的な分類の計算証拠はproof-generatorsに収録。

[基本記号の全文：zero-classification-nonzero.f](../verification/concept-symbols-v1.5.7/zero-classification-nonzero.f)（12文字）

```text
(f(f()),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 零の分類 unknown

Node(2;)。零・非零・未確定を区別する。具体的な分類の計算証拠はproof-generatorsに収録。

[基本記号の全文：zero-classification-unknown.f](../verification/concept-symbols-v1.5.7/zero-classification-unknown.f)（15文字）

```text
(f(f(f())),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 交代和の有限規則データ

既知familyを選ぶ有限レコード。一般契約の証明と各精度の検査は別途添付。

[基本記号の全文：alternating-rule.f](../verification/concept-symbols-v1.5.7/alternating-rule.f)（10527文字）

この例の全文は上記ファイルに収録しています。

検査：型付きの復号結果を、指定した正規値と照合。

### 誤差率 μ(k)=k+2 の構文

自然数の加算呼出式。誤差率として有効かは対象の列との関係で証明する。

[基本記号の全文：cauchy-modulus.f](../verification/concept-symbols-v1.5.7/cauchy-modulus.f)（897文字）

```text
(
  f(f(f())),
  (
    (
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    (((f(),(f(),f())),((f(f()),((f(),f()),(f(f(f())),f()))),f())),f())
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 有限区間化の中心と半径

(中心1/4,半径1/4)。幾何列s_n=2^(-n)、μ(0)=2によるJ_0=[0,1/2]の材料。

[基本記号の全文：cauchy-center-radius.f](../verification/concept-symbols-v1.5.7/cauchy-center-radius.f)（75文字）

```text
(((f(),f(f())),(f(),f(f(f(f(f())))))),((f(),f(f())),(f(),f(f(f(f(f())))))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 整数平行移動を保持するラベル

(基本ラベル参照P,整数−2)。出力の値を平行移動する。

[基本記号の全文：translated-label.f](../verification/concept-symbols-v1.5.7/translated-label.f)（270文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    f()
  ),
  (f(f()),f(f(f())))
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 平行移動の射 τ(P,2;−1)

List(基本ラベル参照P,始点の整数2,移動量−1)。終点の整数は1。

[基本記号の全文：translation-arrow.f](../verification/concept-symbols-v1.5.7/translation-arrow.f)（291文字）

```text
(
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    f()
  ),
  ((f(),f(f(f()))),((f(f()),f(f())),f()))
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 三レジスタ機械の初期状態

(命令位置0,List(2,3,0))。入力2+3の初期状態。

[基本記号の全文：register-state.f](../verification/concept-symbols-v1.5.7/register-state.f)（42文字）

```text
(f(),(f(f(f())),(f(f(f(f()))),(f(),f()))))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 三レジスタ加算の全命令列

zero,succ,copy,jeq,haltからなる命令規約のうち四命令種を使う六命令の加算プログラム。実行履歴と検査はproof-modelsに収録。

[基本記号の全文：register-program.f](../verification/concept-symbols-v1.5.7/register-program.f)（31206文字）

この例の全文は上記ファイルに収録しています。

検査：型付きの復号結果を、指定した正規値と照合。

### F全精度の要求値 ε

正のF元を誤差要求として保持する。有理数2^(-p)による要求と区別。

[基本記号の全文：precision-field-epsilon.f](../verification/concept-symbols-v1.5.7/precision-field-epsilon.f)（96文字）

```text
((((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f()))),f())),(((f(),f(f())),(f(),f(f()))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 1+x²の形式微分結果2x

型を外側で指定した直接表示。

[基本記号の全文：polynomial-derivative.f](../verification/concept-symbols-v1.5.7/polynomial-derivative.f)（63文字）

```text
(((f(),f()),(f(),f(f()))),(((f(),f(f(f()))),(f(),f(f()))),f()))
```

検査：型付きの復号結果を、指定した正規値と照合。

### 1+x²の零定数原始関数x+x³/3

型を外側で指定した直接表示。

[基本記号の全文：polynomial-primitive.f](../verification/concept-symbols-v1.5.7/polynomial-primitive.f)（123文字）

```text
(
  ((f(),f()),(f(),f(f()))),
  (((f(),f(f())),(f(),f(f()))),(((f(),f()),(f(),f(f()))),(((f(),f(f())),(f(),f(f(f(f()))))),f())))
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### 1+x²の端点0,1での形式積分4/3

型を外側で指定した直接表示。

[基本記号の全文：polynomial-integral.f](../verification/concept-symbols-v1.5.7/polynomial-integral.f)（42文字）

```text
((f(),f(f(f(f(f()))))),(f(),f(f(f(f())))))
```

検査：型付きの復号結果を、指定した正規値と照合。

### β一段の変換レコード

List(β規則0,根の位置,変換前λ項,変換後λ項,補助証拠空列)

[基本記号の全文：beta-step.f](../verification/concept-symbols-v1.5.7/beta-step.f)（156文字）

```text
(
  f(),
  (
    f(),
    (
      (f(f(f())),((f(f(f(f()))),((f(),(f(),f())),f())),((f(f(f(f()))),((f(),(f(),f())),f())),f()))),
      ((f(f(f(f()))),((f(),(f(),f())),f())),(f(),f()))
    )
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 恒等射

(状態λx.x,空履歴)

[基本記号の全文：identity-arrow.f](../verification/concept-symbols-v1.5.7/identity-arrow.f)（42文字）

```text
((f(f(f(f()))),((f(),(f(),f())),f())),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### β一段の射

(初期状態,List(変換段))。一般の状態型とは外側で区別。

[基本記号の全文：one-step-arrow.f](../verification/concept-symbols-v1.5.7/one-step-arrow.f)（258文字）

```text
(
  (f(f(f())),((f(f(f(f()))),((f(),(f(),f())),f())),((f(f(f(f()))),((f(),(f(),f())),f())),f()))),
  (
    (
      f(),
      (
        f(),
        (
          (f(f(f())),((f(f(f(f()))),((f(),(f(),f())),f())),((f(f(f(f()))),((f(),(f(),f())),f())),f()))),
          ((f(f(f(f()))),((f(),(f(),f())),f())),(f(),f()))
        )
      )
    ),
    f()
  )
)
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### λ本体・関数側・引数側という位置

List(N(0),N(1),N(2))。特定項での有効位置かは別に検査。

[基本記号の全文：lambda-position.f](../verification/concept-symbols-v1.5.7/lambda-position.f)（30文字）

```text
(f(),(f(f()),(f(f(f())),f())))
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 終了状態 normal-form

Node(0;) の識別部分。実履歴では付加データも保持。

[基本記号の全文：status-normal-form.f](../verification/concept-symbols-v1.5.7/status-normal-form.f)（9文字）

```text
(f(),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 終了状態 step-limit

Node(1;) の識別部分。実履歴では付加データも保持。

[基本記号の全文：status-step-limit.f](../verification/concept-symbols-v1.5.7/status-step-limit.f)（12文字）

```text
(f(f()),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 終了状態 stopped

Node(2;) の識別部分。実履歴では付加データも保持。

[基本記号の全文：status-stopped.f](../verification/concept-symbols-v1.5.7/status-stopped.f)（15文字）

```text
(f(f(f())),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

### 終了状態 error

Node(3;) の識別部分。実履歴では付加データも保持。

[基本記号の全文：status-error.f](../verification/concept-symbols-v1.5.7/status-error.f)（18文字）

```text
(f(f(f(f()))),f())
```

検査：表示構文の復号・照合。意味や一般法則の証明とは別。

## 汎用レコード

### JSON null

タグとpayloadを用いた相互変換形式。直接の数表示とは別。

[基本記号の全文：json-null.f](../verification/concept-symbols-v1.5.7/json-null.f)（9文字）

```text
(f(),f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### JSON false

タグとpayloadを用いた相互変換形式。直接の数表示とは別。

[基本記号の全文：json-false.f](../verification/concept-symbols-v1.5.7/json-false.f)（12文字）

```text
(f(f()),f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### JSON true

タグとpayloadを用いた相互変換形式。直接の数表示とは別。

[基本記号の全文：json-true.f](../verification/concept-symbols-v1.5.7/json-true.f)（15文字）

```text
(f(f(f())),f())
```

検査：型付きの復号結果を、指定した正規値と照合。

### JSON 2

タグとpayloadを用いた相互変換形式。直接の数表示とは別。

[基本記号の全文：json-2.f](../verification/concept-symbols-v1.5.7/json-2.f)（174文字）

```text
(
  f(f(f(f()))),
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))),
    f()
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### JSON "a"

タグとpayloadを用いた相互変換形式。直接の数表示とは別。

[基本記号の全文：json-a.f](../verification/concept-symbols-v1.5.7/json-a.f)（318文字）

```text
(
  f(f(f(f(f())))),
  (
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
    f()
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### JSON [1,2]

タグとpayloadを用いた相互変換形式。直接の数表示とは別。

[基本記号の全文：json-array.f](../verification/concept-symbols-v1.5.7/json-array.f)（375文字）

```text
(
  f(f(f(f(f(f()))))),
  (
    (
      f(f(f(f()))),
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))),
        f()
      )
    ),
    (
      (
        f(f(f(f()))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      ),
      f()
    )
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

### JSON {"a":1}

タグとpayloadを用いた相互変換形式。直接の数表示とは別。

[基本記号の全文：json-record.f](../verification/concept-symbols-v1.5.7/json-record.f)（504文字）

```text
(
  f(f(f(f(f(f(f())))))),
  (
    (
      (
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))),
        f()
      ),
      (
        f(f(f(f()))),
        (
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))),
          f()
        )
      )
    ),
    f()
  )
)
```

検査：型付きの復号結果を、指定した正規値と照合。

## 既存証拠の全文

### 全16命題の一般証明

元ファイル verification/certificates/nat-and-paths.json の全キーと全値。基本記号ファイルに省略なし。

[基本記号の全文：proof-nat-paths.f](../verification/concept-symbols-v1.5.7/proof-nat-paths.f)（1200828文字）

この例の全文は上記ファイルに収録しています。

検査：JSON値の損失のない復号後、元の意味検査器で証拠を再検査。

### 保存済みλ計算証跡全件

元ファイル verification/certificates/lambda-examples-v8.0.1.json の全キーと全値。基本記号ファイルに省略なし。

[基本記号の全文：proof-lambda.f](../verification/concept-symbols-v1.5.7/proof-lambda.f)（5707770文字）

この例の全文は上記ファイルに収録しています。

検査：JSON値の損失のない復号後、元の意味検査器で証拠を再検査。

### 保存済み応用証拠全件

元ファイル verification/certificates/application-examples-v1.5.7.json の全キーと全値。基本記号ファイルに省略なし。

[基本記号の全文：proof-applications.f](../verification/concept-symbols-v1.5.7/proof-applications.f)（2930577文字）

この例の全文は上記ファイルに収録しています。

検査：JSON値の損失のない復号後、元の意味検査器で証拠を再検査。

### 保存済みF算術証拠全件

元ファイル verification/certificates/formal-field-examples-v1.5.7.json の全キーと全値。基本記号ファイルに省略なし。

[基本記号の全文：proof-field.f](../verification/concept-symbols-v1.5.7/proof-field.f)（745404文字）

この例の全文は上記ファイルに収録しています。

検査：JSON値の損失のない復号後、元の意味検査器で証拠を再検査。

### 生成ラベル拡張の全有限証跡

元ファイル verification/certificates/generator-extensions-v1.5.7.json の全キーと全値。基本記号ファイルに省略なし。

[基本記号の全文：proof-generators.f](../verification/concept-symbols-v1.5.7/proof-generators.f)（6110439文字）

この例の全文は上記ファイルに収録しています。

検査：JSON値の損失のない復号後、元の意味検査器で証拠を再検査。

### レジスタ計算・条件付き等式証跡の全件

元ファイル verification/certificates/model-extensions-v1.5.7.json の全キーと全値。基本記号ファイルに省略なし。

[基本記号の全文：proof-models.f](../verification/concept-symbols-v1.5.7/proof-models.f)（812238文字）

この例の全文は上記ファイルに収録しています。

検査：JSON値の損失のない復号後、元の意味検査器で証拠を再検査。
