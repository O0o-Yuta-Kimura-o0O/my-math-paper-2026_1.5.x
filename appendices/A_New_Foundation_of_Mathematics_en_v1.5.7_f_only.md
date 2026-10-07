# Appendix: Following This Manuscript Using f Alone — v1.5.7 (English)

First look at the symbol strings. They all use the same nested f form. The [English manuscript](../manuscripts/A_New_Foundation_of_Mathematics_en_v1.5.7.md) explains their construction, numerical interpretation, computation, and proofs one step at a time.

The parentheses belonging to f remain as scope delimiters. Commas and separate pair parentheses disappear. Zero direct children denote the base, one denotes a unary construction, and two denote a pair. Spaces and line breaks may be removed.

For example, the integer two combines its sign and magnitude in one form:

```text
f(f()f(f(f())))
```

**Part I follows the structure of numbers, syntax, programs, and evidence. Part II recovers the complete English manuscript, including its explanations and written proofs.** Text recovery is not formal verification of those written proofs. Part III recovers the shared implementation sources in their original language. Specify the numerical type before calculation and read numerical inputs and results in that type; no automatic type inference or promotion is performed. See §§2.6–2.8 of the English manuscript for the reading rules.

The mathematical symbol files and program archives are shared byte-for-byte with the [Japanese appendix](../appendices/A_New_Foundation_of_Mathematics_ja_v1.5.7_f_only.md). The English prose archive is separate, so decoding Part II recovers the English edition itself. The detailed [concept guide (Japanese)](../research/concept-symbols-v1.5.7.md) and [coverage ledger (Japanese)](../research/f-only-coverage-v1.5.7.md) remain available.

## I. Following the structures

### Entrance: from natural numbers to generative quaternions and finite pairs in T

Construct the numbers and operations needed using the same nested f form. T is an independent extension using pairs of F values, not an automatic promotion from generative quaternions. First read each value in its specified type, then follow the complete examples in manuscript order.

**Natural number 0**

```text
f()
```

**Natural number 1**

```text
f(f())
```

**Natural number 2**

```text
f(f(f()))
```

**Integer 2**

```text
f(f()f(f(f())))
```

**Rational number 1/2**

```text
f(f(f()f(f()))f(f()f(f(f()))))
```

**M-polynomial: ε²**

```text
f(f(f(f()f())f(f()f(f())))f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f())))
```

**F: square-ratio**

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f())))
  f(f(f(f()f(f()))f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**Generative complex number one-plus-i**

```text
f(
  f(
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  )
  f(
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  )
)
```

**Generative quaternion all-one**

```text
f(
  f(
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
  )
  f(
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
  )
)
```

**T value σ**

```text
f(
  f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**T value 2**

```text
f(
  f(f(f(f(f()f(f(f())))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**T value −1**

```text
f(
  f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
)
```


### 1. Position and Explicit Minimal Assumptions

Combine the same f form finitely many times. Share the reading rules for a base, one child, and two children.

```text
f()
```

```text
f(f())
```

```text
f(f()f())
```


### 2. The Base, Constructors, and Lambda Calculus

Specify the type before calculation and keep numerical inputs and results in that type. NatForm recursively checks only the formation conditions for the specified type N and rejects shapes with two children. It does not infer or promote types. Tags for transmitting mixed types also use the common f notation.

**String a** — [complete symbol string](../verification/f-only-v1.5.7/text-a.f)

Represent the UTF-8 byte 97 as a natural number and place it in a singleton sequence.

```text
f(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
  f()
)
```

**String λ** — [complete symbol string](../verification/f-only-v1.5.7/text-lambda.f)

Retain the two UTF-8 bytes as a sequence of natural numbers.

```text
f(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f()
  )
)
```

**Fixed pair of natural numbers 1 and 2** — [complete symbol string](../verification/f-only-v1.5.7/pair-nat.f)

(N(1),N(2))

```text
f(f(f())f(f(f())))
```

**Natural-number sequence of length 0** — [complete symbol string](../verification/f-only-v1.5.7/list-0.f)

[]

```text
f()
```

**Natural-number sequence of length 1** — [complete symbol string](../verification/f-only-v1.5.7/list-1.f)

[0]

```text
f(f()f())
```

**Natural-number sequence of length 3** — [complete symbol string](../verification/f-only-v1.5.7/list-3.f)

[0,1,2]

```text
f(f()f(f(f())f(f(f(f()))f())))
```

**Boolean data false** — [complete symbol string](../verification/f-only-v1.5.7/bool-false.f)

Direct representation with the type specified externally.

```text
f()
```

**Boolean data true** — [complete symbol string](../verification/f-only-v1.5.7/bool-true.f)

Direct representation with the type specified externally.

```text
f(f())
```

**Comparison result -1** — [complete symbol string](../verification/f-only-v1.5.7/ordering-minus-1.f)

Direct representation with the type specified externally.

```text
f(f(f())f(f()))
```

**Comparison result 0** — [complete symbol string](../verification/f-only-v1.5.7/ordering-0.f)

Direct representation with the type specified externally.

```text
f(f()f())
```

**Comparison result 1** — [complete symbol string](../verification/f-only-v1.5.7/ordering-1.f)

Direct representation with the type specified externally.

```text
f(f()f(f()))
```

**No value** — [complete symbol string](../verification/f-only-v1.5.7/option-none.f)

Node(0;)

```text
f(f()f())
```

**Present value: natural number 2** — [complete symbol string](../verification/f-only-v1.5.7/option-some.f)

Node(1;N(2))

```text
f(f(f())f(f(f(f()))f()))
```

**Operation success** — [complete symbol string](../verification/f-only-v1.5.7/result-success.f)

Node(0;Q(1/2))

```text
f(f()f(f(f(f()f(f()))f(f()f(f(f()))))f()))
```

**Operation failure** — [complete symbol string](../verification/f-only-v1.5.7/result-failure.f)

Node(1;Text("zero")). Retain the reason rather than treating it as the value zero.

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())
        )
      )
    )
    f()
  )
)
```

**Type N** — [complete symbol string](../verification/f-only-v1.5.7/type-n.f)

Node(0;)

```text
f(f()f())
```

**Type Z** — [complete symbol string](../verification/f-only-v1.5.7/type-z.f)

Node(1;)

```text
f(f(f())f())
```

**Type Q** — [complete symbol string](../verification/f-only-v1.5.7/type-q.f)

Node(2;)

```text
f(f(f(f()))f())
```

**Type M** — [complete symbol string](../verification/f-only-v1.5.7/type-m.f)

Node(3;)

```text
f(f(f(f(f())))f())
```

**Type F** — [complete symbol string](../verification/f-only-v1.5.7/type-f.f)

Node(4;)

```text
f(f(f(f(f(f()))))f())
```

**Type C** — [complete symbol string](../verification/f-only-v1.5.7/type-c.f)

Node(5;)

```text
f(f(f(f(f(f(f())))))f())
```

**Type H** — [complete symbol string](../verification/f-only-v1.5.7/type-h.f)

Node(6;)

```text
f(f(f(f(f(f(f(f()))))))f())
```

**Type Bool** — [complete symbol string](../verification/f-only-v1.5.7/type-bool.f)

Node(7;)

```text
f(f(f(f(f(f(f(f(f())))))))f())
```

**Type Text** — [complete symbol string](../verification/f-only-v1.5.7/type-text.f)

Node(8;)

```text
f(f(f(f(f(f(f(f(f(f()))))))))f())
```

**Type Arrow** — [complete symbol string](../verification/f-only-v1.5.7/type-arrow.f)

Node(9;)

```text
f(f(f(f(f(f(f(f(f(f(f())))))))))f())
```

**Type Lambda** — [complete symbol string](../verification/f-only-v1.5.7/type-lambda.f)

Node(10;)

```text
f(f(f(f(f(f(f(f(f(f(f(f()))))))))))f())
```

**Type Proposition** — [complete symbol string](../verification/f-only-v1.5.7/type-proposition.f)

Node(11;)

```text
f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))f())
```

**Type Proof** — [complete symbol string](../verification/f-only-v1.5.7/type-proof.f)

Node(12;)

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))f())
```

**Type Unit** — [complete symbol string](../verification/f-only-v1.5.7/type-unit.f)

Node(13;)

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))f())
```

**Type List(Q)** — [complete symbol string](../verification/f-only-v1.5.7/type-list.f)

List(Q)

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))f(f(f(f(f()))f())f()))
```

**Type Pair(N,Q)** — [complete symbol string](../verification/f-only-v1.5.7/type-pair.f)

Pair(N,Q)

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))f(f(f()f())f(f(f(f(f()))f())f())))
```

**Type Option(N)** — [complete symbol string](../verification/f-only-v1.5.7/type-option.f)

Option(N)

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))f(f(f()f())f()))
```

**Type Function(Q,Q)** — [complete symbol string](../verification/f-only-v1.5.7/type-function.f)

Function(Q,Q)

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))f(f(f(f(f()))f())f(f(f(f(f()))f())f())))
```

**Type Ordering** — [complete symbol string](../verification/f-only-v1.5.7/type-ordering.f)

Ordering

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))f())
```

**Type Interval** — [complete symbol string](../verification/f-only-v1.5.7/type-interval.f)

Interval

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))f())
```

**Type Generator(N,Interval)** — [complete symbol string](../verification/f-only-v1.5.7/type-generator.f)

Generator(N,Interval)

```text
f(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))
  f(f(f()f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))f())f()))
)
```

**Auxiliary type QRep** — [complete symbol string](../verification/f-only-v1.5.7/type-qrep.f)

Node(21;). A pair of integers with a positive, nonzero denominator. Unreduced representations are permitted and distinguished from canonical rational numbers Q.

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))f())
```

**Type Result(QRep)** — [complete symbol string](../verification/f-only-v1.5.7/type-result.f)

Node(22;Type(QRep)). Distinguish successful values from operation errors.

```text
f(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))f())f())
)
```

**Type T** — [complete symbol string](../verification/f-only-v1.5.7/type-t.f)

Node(23;). An independent type of pairs (a,b) of F values, with multiplication corresponding to σ²=2.

```text
f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))f())
```

**Finite NatForm program checking the formation conditions for the specified type N** — [complete symbol string](../verification/f-only-v1.5.7/natform-program.f)

Node(2;Node(0;true),Node(1;),Node(0;false)). Instruction 0 returns a Boolean; instruction 1 repeats the program on the only child; instruction 2 branches on zero, one, or two children. A small evaluator reads the decoded program tree and executes the examples. This is not a universal type classifier.

```text
f(f(f(f()))f(f(f()f(f(f())f()))f(f(f(f())f())f(f(f()f(f()f()))f()))))
```

**NatForm(f())=true** — [complete symbol string](../verification/f-only-v1.5.7/natform-zero.f)

List(specified type N, NatForm program, input to check, Boolean result). Run the recursive formation check on the finite tree and compare its output with the recorded Boolean. A two-child shape in f-only notation is rejected as a natural-number representation.

```text
f(f(f()f())f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f(f())f())f(f(f()f(f()f()))f()))))f(f()f(f(f())f()))))
```

**NatForm(f(f()))=true** — [complete symbol string](../verification/f-only-v1.5.7/natform-successor.f)

List(specified type N, NatForm program, input to check, Boolean result). Run the recursive formation check on the finite tree and compare its output with the recorded Boolean. A two-child shape in f-only notation is rejected as a natural-number representation.

```text
f(f(f()f())f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f(f())f())f(f(f()f(f()f()))f()))))f(f(f())f(f(f())f()))))
```

**NatForm(f(f()f()))=false** — [complete symbol string](../verification/f-only-v1.5.7/natform-pair.f)

List(specified type N, NatForm program, input to check, Boolean result). Run the recursive formation check on the finite tree and compare its output with the recorded Boolean. A two-child shape in f-only notation is rejected as a natural-number representation.

```text
f(f(f()f())f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f(f())f())f(f(f()f(f()f()))f()))))f(f(f()f())f(f()f()))))
```

**NatForm(f(f(f()f())))=false** — [complete symbol string](../verification/f-only-v1.5.7/natform-nested-pair.f)

List(specified type N, NatForm program, input to check, Boolean result). Run the recursive formation check on the finite tree and compare its output with the recorded Boolean. A two-child shape in f-only notation is rejected as a natural-number representation.

```text
f(
  f(f()f())
  f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f(f())f())f(f(f()f(f()f()))f()))))f(f(f(f()f()))f(f()f())))
)
```

**λ-definition True** — [complete symbol string](../verification/f-only-v1.5.7/lambda-true.f)

λt.λf.t

```text
f(f(f(f(f())))f(f(f(f(f(f())))f(f(f()f(f(f())f()))f()))f()))
```

**λ-definition False** — [complete symbol string](../verification/f-only-v1.5.7/lambda-false.f)

λt.λf.f

```text
f(f(f(f(f())))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f()))
```

**λ-definition If** — [complete symbol string](../verification/f-only-v1.5.7/lambda-if.f)

λb.λt.λe.b t e

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f(f())))
          f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f(f(f()))f()))f(f(f()f(f(f())f()))f())))f(f(f()f(f()f()))f())))f())
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition And** — [complete symbol string](../verification/f-only-v1.5.7/lambda-and.f)

λp.λq.p q p

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f()f(f()f()))f())))f(f(f()f(f(f())f()))f())))f())
    )
    f()
  )
)
```

**λ-definition Or** — [complete symbol string](../verification/f-only-v1.5.7/lambda-or.f)

λp.λq.p p q

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f()f(f(f())f()))f())))f(f(f()f(f()f()))f())))f())
    )
    f()
  )
)
```

**λ-definition Not** — [complete symbol string](../verification/f-only-v1.5.7/lambda-not.f)

λb.b False True

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f(f()))
          f(f(f()f(f()f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))f()))f()))
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition Pair** — [complete symbol string](../verification/f-only-v1.5.7/lambda-pair.f)

λa.λb.λf.f a b

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f(f())))
          f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f()f()))f(f(f()f(f(f(f()))f()))f())))f(f(f()f(f(f())f()))f())))f())
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition Fst** — [complete symbol string](../verification/f-only-v1.5.7/lambda-fst.f)

λp.p (λa.λb.a)

```text
f(
  f(f(f(f())))
  f(f(f(f(f()))f(f(f()f(f()f()))f(f(f(f(f(f())))f(f(f(f(f(f())))f(f(f()f(f(f())f()))f()))f()))f())))f())
)
```

**λ-definition Snd** — [complete symbol string](../verification/f-only-v1.5.7/lambda-snd.f)

λp.p (λa.λb.b)

```text
f(
  f(f(f(f())))
  f(f(f(f(f()))f(f(f()f(f()f()))f(f(f(f(f(f())))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f()))f())))f())
)
```

**λ-definition ResultOk** — [complete symbol string](../verification/f-only-v1.5.7/lambda-resultok.f)

λv.λok.λerr.ok v

```text
f(
  f(f(f(f())))
  f(
    f(f(f(f(f())))f(f(f(f(f(f())))f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f()f(f(f(f()))f()))f())))f()))f()))
    f()
  )
)
```

**λ-definition ResultErr** — [complete symbol string](../verification/f-only-v1.5.7/lambda-resulterr.f)

λe.λok.λerr.err e

```text
f(
  f(f(f(f())))
  f(f(f(f(f(f())))f(f(f(f(f(f())))f(f(f(f(f()))f(f(f()f(f()f()))f(f(f()f(f(f(f()))f()))f())))f()))f()))f())
)
```

**λ-definition ResultBind** — [complete symbol string](../verification/f-only-v1.5.7/lambda-resultbind.f)

λr.λk.r k ResultErr

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f()))
          f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f()f(f()f()))f())))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))))))f()))f()))
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition Identity** — [complete symbol string](../verification/f-only-v1.5.7/lambda-identity.f)

λx.x

```text
f(f(f(f(f())))f(f(f()f(f()f()))f()))
```

**λ-definition FixY** — [complete symbol string](../verification/f-only-v1.5.7/lambda-fixy.f)

λg.(λx.g (x x)) (λx.g (x x))

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f(f(f())))
          f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f(f(f()))f(f(f()f(f()f()))f(f(f()f(f()f()))f())))f())))f())
        )
        f(
          f(f(f(f(f())))f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f(f(f()))f(f(f()f(f()f()))f(f(f()f(f()f()))f())))f())))f()))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition Application** — [complete symbol string](../verification/f-only-v1.5.7/lambda-application.f)

(λx.x) (λy.y)

```text
f(f(f(f()))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f())))
```

**Environment of all built-in definitions** — [complete symbol string](../verification/f-only-v1.5.7/lambda-environment.f)

List((Text(name), λ-body)). Include the entire built-in vocabulary without omission.

The linked file contains the complete string (337443 characters), without ellipses or abbreviations.


### 3. Natural Numbers and a Commutative Semiring

Add one outer f at a time. The lambda bodies of operations also return to trees in the same notation.

**Natural number 0** — [complete symbol string](../verification/f-only-v1.5.7/nat-0.f)

Direct representation with the type specified externally.

```text
f()
```

**Natural number 1** — [complete symbol string](../verification/f-only-v1.5.7/nat-1.f)

Direct representation with the type specified externally.

```text
f(f())
```

**Natural number 2** — [complete symbol string](../verification/f-only-v1.5.7/nat-2.f)

Direct representation with the type specified externally.

```text
f(f(f()))
```

**Natural number 3** — [complete symbol string](../verification/f-only-v1.5.7/nat-3.f)

Direct representation with the type specified externally.

```text
f(f(f(f())))
```

**Natural number 4** — [complete symbol string](../verification/f-only-v1.5.7/nat-4.f)

Direct representation with the type specified externally.

```text
f(f(f(f(f()))))
```

**λ-definition Zero** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zero.f)

λf.λx.x

```text
f(f(f(f(f())))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f()))
```

**λ-definition Succ** — [complete symbol string](../verification/f-only-v1.5.7/lambda-succ.f)

λn.λf.λx.f (n f x)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f(f())))
          f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f(f(f()))f()))f(f(f()f(f(f())f()))f())))f(f(f()f(f()f()))f())))f())))f())
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition One** — [complete symbol string](../verification/f-only-v1.5.7/lambda-one.f)

Succ Zero

```text
f(
  f(f(f()))
  f(
    f(
      f(f())
      f(
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
        )
        f()
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition Two** — [complete symbol string](../verification/f-only-v1.5.7/lambda-two.f)

Succ One

```text
f(
  f(f(f()))
  f(
    f(
      f(f())
      f(
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
        )
        f()
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition Three** — [complete symbol string](../verification/f-only-v1.5.7/lambda-three.f)

Succ Two

```text
f(
  f(f(f()))
  f(
    f(
      f(f())
      f(
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
        )
        f()
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition Four** — [complete symbol string](../verification/f-only-v1.5.7/lambda-four.f)

Succ Three

```text
f(
  f(f(f()))
  f(
    f(
      f(f())
      f(
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
        )
        f()
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition Add** — [complete symbol string](../verification/f-only-v1.5.7/lambda-add.f)

λm.λn.λf.λx.m f (n f x)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f(f())))
          f(f(f(f(f(f())))f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f(f(f(f())))f()))f(f(f()f(f(f())f()))f())))f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f(f(f()))f()))f(f(f()f(f(f())f()))f())))f(f(f()f(f()f()))f())))f())))f()))f())
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition Mul** — [complete symbol string](../verification/f-only-v1.5.7/lambda-mul.f)

λm.λn.λf.λx.m (n f) x

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f(f())))
          f(f(f(f(f(f())))f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f(f(f(f())))f()))f(f(f(f(f()))f(f(f()f(f(f(f()))f()))f(f(f()f(f(f())f()))f())))f())))f(f(f()f(f()f()))f())))f()))f())
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition Pred** — [complete symbol string](../verification/f-only-v1.5.7/lambda-pred.f)

λn.λf.λx.n (λg.λh.h (g f)) (λu.x) (λu.u)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f(f())))
          f(f(f(f(f()))f(f(f(f(f()))f(f(f(f(f()))f(f(f()f(f(f(f()))f()))f(f(f(f(f(f())))f(f(f(f(f(f())))f(f(f(f(f()))f(f(f()f(f()f()))f(f(f(f(f()))f(f(f()f(f(f())f()))f(f(f()f(f(f(f(f())))f()))f())))f())))f()))f()))f())))f(f(f(f(f(f())))f(f(f()f(f(f())f()))f()))f())))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f())))f())
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition Sub** — [complete symbol string](../verification/f-only-v1.5.7/lambda-sub.f)

λm.λn.n Pred m

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f()))
          f(f(f(f(f()))f(f(f()f(f()f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f())))f(f(f()f(f(f())f()))f()))
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition IsZero** — [complete symbol string](../verification/f-only-v1.5.7/lambda-iszero.f)

λn.n (λx.False) True

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f(f()))
          f(f(f()f(f()f()))f(f(f(f(f(f())))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))f()))f()))f()))
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition Leq** — [complete symbol string](../verification/f-only-v1.5.7/lambda-leq.f)

λm.λn.IsZero (Sub m n)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f()))
          f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))))f()))f(f(f(f(f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f(f())f()))f())))f(f(f()f(f()f()))f())))f()))
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition EqNat** — [complete symbol string](../verification/f-only-v1.5.7/lambda-eqnat.f)

λm.λn.And (Leq m n) (Leq n m)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f()))
          f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f(f(f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f(f())f()))f())))f(f(f()f(f()f()))f())))f())))f(f(f(f(f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f()f()))f())))f(f(f()f(f(f())f()))f())))f()))
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition N0** — [complete symbol string](../verification/f-only-v1.5.7/lambda-n0.f)

Zero

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())
        )
      )
    )
    f()
  )
)
```

**λ-definition N1** — [complete symbol string](../verification/f-only-v1.5.7/lambda-n1.f)

One

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition N2** — [complete symbol string](../verification/f-only-v1.5.7/lambda-n2.f)

Two

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition N3** — [complete symbol string](../verification/f-only-v1.5.7/lambda-n3.f)

Three

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))
        )
      )
    )
    f()
  )
)
```

**λ-definition N4** — [complete symbol string](../verification/f-only-v1.5.7/lambda-n4.f)

Four

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())
        )
      )
    )
    f()
  )
)
```

**λ-definition 0** — [complete symbol string](../verification/f-only-v1.5.7/lambda-0.f)

Zero

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())
        )
      )
    )
    f()
  )
)
```

**λ-definition 1** — [complete symbol string](../verification/f-only-v1.5.7/lambda-1.f)

One

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition 2** — [complete symbol string](../verification/f-only-v1.5.7/lambda-2.f)

Two

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition 3** — [complete symbol string](../verification/f-only-v1.5.7/lambda-3.f)

Three

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))
        )
      )
    )
    f()
  )
)
```

**λ-definition 4** — [complete symbol string](../verification/f-only-v1.5.7/lambda-4.f)

Four

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())
        )
      )
    )
    f()
  )
)
```


### 4. Signed Integers and a Commutative Ring

The two components are a nonnegative/negative sign and a natural-number magnitude.

**Nonnegative sign** — [complete symbol string](../verification/f-only-v1.5.7/sign-0.f)

Direct representation with the type specified externally.

```text
f()
```

**Negative sign** — [complete symbol string](../verification/f-only-v1.5.7/sign-1.f)

Direct representation with the type specified externally.

```text
f(f())
```

**Integer -2** — [complete symbol string](../verification/f-only-v1.5.7/int-minus-2.f)

Direct representation with the type specified externally.

```text
f(f(f())f(f(f())))
```

**Integer -1** — [complete symbol string](../verification/f-only-v1.5.7/int-minus-1.f)

Direct representation with the type specified externally.

```text
f(f(f())f(f()))
```

**Integer 0** — [complete symbol string](../verification/f-only-v1.5.7/int-0.f)

Direct representation with the type specified externally.

```text
f(f()f())
```

**Integer 1** — [complete symbol string](../verification/f-only-v1.5.7/int-1.f)

Direct representation with the type specified externally.

```text
f(f()f(f()))
```

**Integer 2** — [complete symbol string](../verification/f-only-v1.5.7/int-2.f)

Direct representation with the type specified externally.

```text
f(f()f(f(f())))
```

**λ-definition ZMake** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zmake.f)

λs.λn.Pair (If (IsZero n) Zero s) n

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f()))
          f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f(f(f(f(f()))f(f(f(f(f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))))f()))f(f(f()f(f()f()))f())))f())))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f())))f(f(f()f(f(f())f()))f())))f())))f(f(f()f(f()f()))f()))
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition ZSign** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zsign.f)

Fst

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition ZMagnitude** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zmagnitude.f)

Snd

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition ZZero** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zzero.f)

ZMake Zero Zero

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f())
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))f())
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))
          f()
        )
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition ZOne** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zone.f)

ZMake Zero One

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f())
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))f())
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))
          f()
        )
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition ZTwo** — [complete symbol string](../verification/f-only-v1.5.7/lambda-ztwo.f)

ZMake Zero Two

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f())
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))f())
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))
          f()
        )
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition ZMinusOne** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zminusone.f)

ZMake One One

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f())
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))f())
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))
          f()
        )
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition ZNeg** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zneg.f)

λz.ZMake (If (IsZero (Fst z)) One Zero) (Snd z)

The linked file contains the complete string (8154 characters), without ellipses or abbreviations.

**λ-definition ZAdd** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zadd.f)

λa.λb.If (EqNat (Fst a) (Fst b)) (ZMake (Fst a) (Add (Snd a) (Snd b))) (If (Leq (Snd a) (Snd b)) (ZMake (Fst b) (Sub (Snd b) (Snd a))) (ZMake (Fst a) (Sub (Snd a) (Snd b))))

The linked file contains the complete string (23574 characters), without ellipses or abbreviations.

**λ-definition ZSub** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zsub.f)

λa.λb.ZAdd a (ZNeg b)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f()))
          f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f(f(f()f(f(f())f()))f())))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f(f(f()f(f()f()))f())))f()))
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition ZMul** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zmul.f)

λa.λb.ZMake (If (EqNat (Fst a) (Fst b)) Zero One) (Mul (Snd a) (Snd b))

The linked file contains the complete string (10713 characters), without ellipses or abbreviations.

**λ-definition ZEq** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zeq.f)

λa.λb.And (EqNat (Fst a) (Fst b)) (EqNat (Snd a) (Snd b))

The linked file contains the complete string (7821 characters), without ellipses or abbreviations.

**λ-definition ZLeq** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zleq.f)

λa.λb.If (EqNat (Fst a) (Fst b)) (If (IsZero (Fst a)) (Leq (Snd a) (Snd b)) (Leq (Snd b) (Snd a))) (IsZero (Fst b))

The linked file contains the complete string (16173 characters), without ellipses or abbreviations.

**λ-definition ZFromDiff** — [complete symbol string](../verification/f-only-v1.5.7/lambda-zfromdiff.f)

λp.λn.If (Leq p n) (ZMake One (Sub n p)) (ZMake Zero (Sub p n))

The linked file contains the complete string (8859 characters), without ellipses or abbreviations.

**λ-definition ZToDiff** — [complete symbol string](../verification/f-only-v1.5.7/lambda-ztodiff.f)

λz.If (IsZero (Fst z)) (Pair (Snd z) Zero) (Pair Zero (Snd z))

The linked file contains the complete string (10527 characters), without ellipses or abbreviations.


### 5. Rational Numbers, Normalization, and an Ordered Field

Keep an integer numerator and denominator. Canonical Q has a positive denominator, is reduced, and represents zero as 0/1. The auxiliary QRep permits unreduced fractions.

**Rational number 0/1** — [complete symbol string](../verification/f-only-v1.5.7/rat-0-1.f)

Direct representation with the type specified externally.

```text
f(f(f()f())f(f()f(f())))
```

**Rational number 1/1** — [complete symbol string](../verification/f-only-v1.5.7/rat-1-1.f)

Direct representation with the type specified externally.

```text
f(f(f()f(f()))f(f()f(f())))
```

**Rational number -1/1** — [complete symbol string](../verification/f-only-v1.5.7/rat-minus-1-1.f)

Direct representation with the type specified externally.

```text
f(f(f(f())f(f()))f(f()f(f())))
```

**Rational number 2/1** — [complete symbol string](../verification/f-only-v1.5.7/rat-2-1.f)

Direct representation with the type specified externally.

```text
f(f(f()f(f(f())))f(f()f(f())))
```

**Rational number -2/1** — [complete symbol string](../verification/f-only-v1.5.7/rat-minus-2-1.f)

Direct representation with the type specified externally.

```text
f(f(f(f())f(f(f())))f(f()f(f())))
```

**Rational number 1/2** — [complete symbol string](../verification/f-only-v1.5.7/rat-1-2.f)

Direct representation with the type specified externally.

```text
f(f(f()f(f()))f(f()f(f(f()))))
```

**Rational number -1/3** — [complete symbol string](../verification/f-only-v1.5.7/rat-minus-1-3.f)

Direct representation with the type specified externally.

```text
f(f(f(f())f(f()))f(f()f(f(f(f())))))
```

**Unreduced fraction representation 4/4** — [complete symbol string](../verification/f-only-v1.5.7/qrep-four-four.f)

A pair of integers. It corresponds to the decoded representation of the λ-normal-form output of QRepAdd QHalf QHalf. It is distinct from the canonical Q representation 1/1.

```text
f(f(f()f(f(f(f(f())))))f(f()f(f(f(f(f()))))))
```

**λ-definition QRep** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrep.f)

Pair

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())
        )
      )
    )
    f()
  )
)
```

**λ-definition QRepNum** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepnum.f)

Fst

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition QRepDen** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepden.f)

Snd

```text
f(
  f(f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition QRepValid** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepvalid.f)

λr.And (IsZero (Fst (Snd r))) (Not (IsZero (Snd (Snd r))))

The linked file contains the complete string (9468 characters), without ellipses or abbreviations.

**λ-definition QMake** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qmake.f)

λn.λd.If (IsZero (Snd d)) (ResultErr Zero) (ResultOk (Pair (If (IsZero (Fst d)) n (ZNeg n)) (ZMake Zero (Snd d))))

The linked file contains the complete string (19965 characters), without ellipses or abbreviations.

**λ-definition QZero** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qzero.f)

QRep ZZero ZOne

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f())
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f())
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))f()))
          f()
        )
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition QOne** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qone.f)

QRep ZOne ZOne

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f())
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f())
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))
          f()
        )
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition QHalf** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qhalf.f)

QRep ZOne ZTwo

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f())
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f())
        )
        f(
          f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))
          f()
        )
      )
    )
    f(
      f(
        f(f())
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))
          f()
        )
      )
      f()
    )
  )
)
```

**λ-definition QRepNeg** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepneg.f)

λr.QRep (ZNeg (Fst r)) (Snd r)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f(f()))
          f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f()f()))f())))f())))f()))
        )
        f(
          f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f()f()))f())))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition QRepAdd** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepadd.f)

λa.λb.QRep (ZAdd (ZMul (Fst a) (Snd b)) (ZMul (Fst b) (Snd a))) (ZMul (Snd a) (Snd b))

The linked file contains the complete string (11946 characters), without ellipses or abbreviations.

**λ-definition QRepSub** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepsub.f)

λa.λb.QRepAdd a (QRepNeg b)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f()))
          f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))))f()))f(f(f()f(f(f())f()))f())))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))))f()))f(f(f()f(f()f()))f())))f()))
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition QRepMul** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepmul.f)

λa.λb.QRep (ZMul (Fst a) (Fst b)) (ZMul (Snd a) (Snd b))

The linked file contains the complete string (7632 characters), without ellipses or abbreviations.

**λ-definition QRepEq** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepeq.f)

λa.λb.ZEq (ZMul (Fst a) (Snd b)) (ZMul (Fst b) (Snd a))

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f(f())))
      f(
        f(
          f(f(f()))
          f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f(f(f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f(f())f()))f())))f())))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f()f()))f())))f())))f())))f(f(f(f(f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f()f()))f())))f())))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f(f())f()))f())))f())))f()))
        )
        f()
      )
    )
    f()
  )
)
```

**λ-definition QRepLeq** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepleq.f)

λa.λb.ZLeq (ZMul (Fst a) (Snd b)) (ZMul (Fst b) (Snd a))

The linked file contains the complete string (7644 characters), without ellipses or abbreviations.

**λ-definition QRepInv** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepinv.f)

λr.QMake (Snd r) (Fst r)

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f(f()))
      f(
        f(
          f(f(f()))
          f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))f()))f(f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f()f()))f())))f()))
        )
        f(
          f(f(f(f()))f(f(f(f())f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f()))f(f(f()f(f()f()))f())))
          f()
        )
      )
    )
    f()
  )
)
```

**λ-definition QRepDiv** — [complete symbol string](../verification/f-only-v1.5.7/lambda-qrepdiv.f)

λa.λb.QMake (ZMul (Fst a) (Snd b)) (ZMul (Snd a) (Fst b))

The linked file contains the complete string (7899 characters), without ellipses or abbreviations.


### 6. Introducing Relation Labels from Processes Approaching Rational Numbers

G(q,b) is a generation record retaining the coefficient b for execution. Check finite samples of the common subsequence when b/c=r/s, then use the separate introduction rule Φ(G(q,b))=(2sgn(b),q) to obtain a relation label. Positive b gives q##. Distinguish the recursion count n from the integer relation-operator index k retained in the label. Appendix A adds finite H(q,b,r) recurrence responses and the separate introduction rule Psi.

**Parameters of the sequence-generating label qlim(0,1)** — [complete symbol string](../verification/f-only-v1.5.7/qlim-parameters.f)

(Q(0),Q(1)). The finite procedure is G(q,b)(n)=q+b/(n+1). This generation record retains b for execution and is distinct from the relation label introduced by Φ.

```text
f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f()))))
```

**Input n=1 to qlim(0,1)** — [complete symbol string](../verification/f-only-v1.5.7/qlim-call.f)

An operation call. Its response value is 1/2.

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())
        )
      )
    )
    f(
      f(
        f(f(f())f(f(f(f(f()))f())f(f(f(f()f())f(f()f(f())))f())))
        f(f(f(f())f(f(f(f(f()))f())f(f(f(f()f(f()))f(f()f(f())))f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))
      )
      f()
    )
  )
)
```

**Response of qlim(0,1)(1)** — [complete symbol string](../verification/f-only-v1.5.7/qlim-response.f)

Direct representation with the type specified externally.

```text
f(f(f()f(f()))f(f()f(f(f()))))
```

**Generation record retaining b: G(0,1/2)** — [complete symbol string](../verification/f-only-v1.5.7/relation-g-half.f)

(base Q, coefficient Q). Retain b in order to execute G(q,b)(n)=q+b/(n+1). This record has a different type from the output of Φ.

```text
f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f())))))
```

**Generation record retaining b: G(0,3/4)** — [complete symbol string](../verification/f-only-v1.5.7/relation-g-three-quarters.f)

(base Q, coefficient Q). Retain b in order to execute G(q,b)(n)=q+b/(n+1). This record has a different type from the output of Φ.

```text
f(f(f(f()f())f(f()f(f())))f(f(f()f(f(f(f()))))f(f()f(f(f(f(f())))))))
```

**Common subsequence at t=1: indices 1 and 2 give 1/4** — [complete symbol string](../verification/f-only-v1.5.7/relation-common-1.f)

List(G(0,1/2),G(0,3/4),r=2,s=3,t,n=2t−1,m=3t−1,common rational value). Recompute b/c=r/s, both index transformations, and both outputs at the recorded finite indices. The theorem for every t remains the written proof of Proposition 6.2.

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f())))))
  f(
    f(f(f(f()f())f(f()f(f())))f(f(f()f(f(f(f()))))f(f()f(f(f(f(f())))))))
    f(f(f(f()))f(f(f(f(f())))f(f(f())f(f(f())f(f(f(f()))f(f(f(f()f(f()))f(f()f(f(f(f(f()))))))f()))))))
  )
)
```

**Common subsequence at t=2: indices 3 and 5 give 1/8** — [complete symbol string](../verification/f-only-v1.5.7/relation-common-2.f)

List(G(0,1/2),G(0,3/4),r=2,s=3,t,n=2t−1,m=3t−1,common rational value). Recompute b/c=r/s, both index transformations, and both outputs at the recorded finite indices. The theorem for every t remains the written proof of Proposition 6.2.

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f())))))
  f(
    f(f(f(f()f())f(f()f(f())))f(f(f()f(f(f(f()))))f(f()f(f(f(f(f())))))))
    f(
      f(f(f()))
      f(
        f(f(f(f())))
        f(f(f(f()))f(f(f(f(f())))f(f(f(f(f(f(f())))))f(f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f()))))))))))f()))))
      )
    )
  )
)
```

**Common subsequence at t=3: indices 5 and 8 give 1/12** — [complete symbol string](../verification/f-only-v1.5.7/relation-common-3.f)

List(G(0,1/2),G(0,3/4),r=2,s=3,t,n=2t−1,m=3t−1,common rational value). Recompute b/c=r/s, both index transformations, and both outputs at the recorded finite indices. The theorem for every t remains the written proof of Proposition 6.2.

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f())))))
  f(
    f(f(f(f()f())f(f()f(f())))f(f(f()f(f(f(f()))))f(f()f(f(f(f(f())))))))
    f(
      f(f(f()))
      f(
        f(f(f(f())))
        f(
          f(f(f(f())))
          f(f(f(f(f(f(f())))))f(f(f(f(f(f(f(f(f(f()))))))))f(f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))f())))
        )
      )
    )
  )
)
```

**Φ(G(0,1/2))=0##** — [complete symbol string](../verification/f-only-v1.5.7/relation-intro-positive-half.f)

List(generation record G, target label L). Apply the specified introduction rule Φ(G(q,b))=(2sgn(b),q), discarding b from the output while retaining the integer k. Recompute k from the decoded sign of b. This individual rule check does not assert preservation of pointwise addition.

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f())))))
  f(f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))f())
)
```

**Φ(G(0,3/4))=0##** — [complete symbol string](../verification/f-only-v1.5.7/relation-intro-positive-three-quarters.f)

List(generation record G, target label L). Apply the specified introduction rule Φ(G(q,b))=(2sgn(b),q), discarding b from the output while retaining the integer k. Recompute k from the decoded sign of b. This individual rule check does not assert preservation of pointwise addition.

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f()f(f(f(f()))))f(f()f(f(f(f(f())))))))
  f(f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))f())
)
```

**Φ(G(0,−1/2))=0♭♭** — [complete symbol string](../verification/f-only-v1.5.7/relation-intro-negative.f)

List(generation record G, target label L). Apply the specified introduction rule Φ(G(q,b))=(2sgn(b),q), discarding b from the output while retaining the integer k. Recompute k from the decoded sign of b. This individual rule check does not assert preservation of pointwise addition.

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f(f())f(f()))f(f()f(f(f())))))
  f(f(f(f(f())f(f(f())))f(f(f()f())f(f()f(f()))))f())
)
```

**Φ(G(2,0))=2** — [complete symbol string](../verification/f-only-v1.5.7/relation-intro-zero.f)

List(generation record G, target label L). Apply the specified introduction rule Φ(G(q,b))=(2sgn(b),q), discarding b from the output while retaining the integer k. Recompute k from the decoded sign of b. This individual rule check does not assert preservation of pointwise addition.

```text
f(
  f(f(f(f()f(f(f())))f(f()f(f())))f(f(f()f())f(f()f(f()))))
  f(f(f(f()f())f(f(f()f(f(f())))f(f()f(f()))))f())
)
```

**Lower procedure approaching 1/3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-h-third-lower.f)

(Q(q),(Q(b),Q(r))). H(q,b,r) records the recurrence x_0=q+b and x_(n+1)=q+r(x_n−q). Decode its rational parameters and check 0<r<1. This execution record is distinct from the relation label introduced by Psi.

```text
f(
  f(f(f()f(f()))f(f()f(f(f(f())))))
  f(f(f(f(f())f(f()))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
)
```

**Lower procedure approaching 1/3: responses at n=0,1,2,3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-trace-third-lower.f)

List(H,list of states List(N(n),Q(value))). Recompute the four saved rational outputs both by q+br^n and by the one-step recurrence. General formulas, termination, and direction are established by the written proofs in Appendix A, not by these four samples.

```text
f(
  f(
    f(f(f()f(f()))f(f()f(f(f(f())))))
    f(f(f(f(f())f(f()))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  )
  f(
    f(
      f(f()f(f(f(f()f())f(f()f(f())))f()))
      f(
        f(f(f())f(f(f(f()f(f(f(f()))))f(f()f(f(f(f(f(f(f(f(f(f(f()))))))))))))f()))
        f(
          f(f(f(f()))f(f(f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))
          f(f(f(f(f(f())))f(f(f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))f())
        )
      )
    )
    f()
  )
)
```

**Introduce an L label from lower procedure approaching 1/3 using Psi** — [complete symbol string](../verification/f-only-v1.5.7/geometric-intro-third-lower.f)

List(H,L). Check the stated rule Psi(H(q,b,r))=(2sgn(b),q) after decoding the parameters. The output retains the integer k and the rational base, rather than converting the iteration count n or contraction ratio r into k. Pointwise addition is not transported by this rule.

```text
f(
  f(
    f(f(f()f(f()))f(f()f(f(f(f())))))
    f(f(f(f(f())f(f()))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  )
  f(f(f(f(f())f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f())
)
```

**Upper procedure approaching 1/3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-h-third-upper.f)

(Q(q),(Q(b),Q(r))). H(q,b,r) records the recurrence x_0=q+b and x_(n+1)=q+r(x_n−q). Decode its rational parameters and check 0<r<1. This execution record is distinct from the relation label introduced by Psi.

```text
f(
  f(f(f()f(f()))f(f()f(f(f(f())))))
  f(f(f(f()f(f(f())))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
)
```

**Upper procedure approaching 1/3: responses at n=0,1,2,3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-trace-third-upper.f)

List(H,list of states List(N(n),Q(value))). Recompute the four saved rational outputs both by q+br^n and by the one-step recurrence. General formulas, termination, and direction are established by the written proofs in Appendix A, not by these four samples.

```text
f(
  f(
    f(f(f()f(f()))f(f()f(f(f(f())))))
    f(f(f(f()f(f(f())))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  )
  f(
    f(
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
      f(
        f(f(f())f(f(f(f()f(f(f())))f(f()f(f(f(f(f(f())))))))f()))
        f(
          f(f(f(f()))f(f(f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))f()))
          f(f(f(f(f(f())))f(f(f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))f())
        )
      )
    )
    f()
  )
)
```

**Introduce an L label from upper procedure approaching 1/3 using Psi** — [complete symbol string](../verification/f-only-v1.5.7/geometric-intro-third-upper.f)

List(H,L). Check the stated rule Psi(H(q,b,r))=(2sgn(b),q) after decoding the parameters. The output retains the integer k and the rational base, rather than converting the iteration count n or contraction ratio r into k. Pointwise addition is not transported by this rule.

```text
f(
  f(
    f(f(f()f(f()))f(f()f(f(f(f())))))
    f(f(f(f()f(f(f())))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  )
  f(f(f(f()f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f())
)
```

**Constant procedure returning the exact rational number 1/3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-h-third-fixed.f)

(Q(q),(Q(b),Q(r))). H(q,b,r) records the recurrence x_0=q+b and x_(n+1)=q+r(x_n−q). Decode its rational parameters and check 0<r<1. This execution record is distinct from the relation label introduced by Psi.

```text
f(
  f(f(f()f(f()))f(f()f(f(f(f())))))
  f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
)
```

**Constant procedure returning the exact rational number 1/3: responses at n=0,1,2,3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-trace-third-fixed.f)

List(H,list of states List(N(n),Q(value))). Recompute the four saved rational outputs both by q+br^n and by the one-step recurrence. General formulas, termination, and direction are established by the written proofs in Appendix A, not by these four samples.

```text
f(
  f(
    f(f(f()f(f()))f(f()f(f(f(f())))))
    f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  )
  f(
    f(
      f(f()f(f(f(f()f(f()))f(f()f(f(f(f())))))f()))
      f(
        f(f(f())f(f(f(f()f(f()))f(f()f(f(f(f())))))f()))
        f(
          f(f(f(f()))f(f(f(f()f(f()))f(f()f(f(f(f())))))f()))
          f(f(f(f(f(f())))f(f(f(f()f(f()))f(f()f(f(f(f())))))f()))f())
        )
      )
    )
    f()
  )
)
```

**Introduce an L label from constant procedure returning the exact rational number 1/3 using Psi** — [complete symbol string](../verification/f-only-v1.5.7/geometric-intro-third-fixed.f)

List(H,L). Check the stated rule Psi(H(q,b,r))=(2sgn(b),q) after decoding the parameters. The output retains the integer k and the rational base, rather than converting the iteration count n or contraction ratio r into k. Pointwise addition is not transported by this rule.

```text
f(
  f(
    f(f(f()f(f()))f(f()f(f(f(f())))))
    f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  )
  f(f(f(f()f())f(f(f()f(f()))f(f()f(f(f(f()))))))f())
)
```

**Lower procedure approaching 2/3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-h-two-thirds-lower.f)

(Q(q),(Q(b),Q(r))). H(q,b,r) records the recurrence x_0=q+b and x_(n+1)=q+r(x_n−q). Decode its rational parameters and check 0<r<1. This execution record is distinct from the relation label introduced by Psi.

```text
f(
  f(f(f()f(f(f())))f(f()f(f(f(f())))))
  f(f(f(f(f())f(f(f())))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
)
```

**Lower procedure approaching 2/3: responses at n=0,1,2,3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-trace-two-thirds-lower.f)

List(H,list of states List(N(n),Q(value))). Recompute the four saved rational outputs both by q+br^n and by the one-step recurrence. General formulas, termination, and direction are established by the written proofs in Appendix A, not by these four samples.

```text
f(
  f(
    f(f(f()f(f(f())))f(f()f(f(f(f())))))
    f(f(f(f(f())f(f(f())))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  )
  f(
    f(
      f(f()f(f(f(f()f())f(f()f(f())))f()))
      f(
        f(f(f())f(f(f(f()f(f(f(f()))))f(f()f(f(f(f(f(f())))))))f()))
        f(
          f(f(f(f()))f(f(f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))f()))
          f(f(f(f(f(f())))f(f(f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))f())
        )
      )
    )
    f()
  )
)
```

**Introduce an L label from lower procedure approaching 2/3 using Psi** — [complete symbol string](../verification/f-only-v1.5.7/geometric-intro-two-thirds-lower.f)

List(H,L). Check the stated rule Psi(H(q,b,r))=(2sgn(b),q) after decoding the parameters. The output retains the integer k and the rational base, rather than converting the iteration count n or contraction ratio r into k. Pointwise addition is not transported by this rule.

```text
f(
  f(
    f(f(f()f(f(f())))f(f()f(f(f(f())))))
    f(f(f(f(f())f(f(f())))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
  )
  f(f(f(f(f())f(f(f())))f(f(f()f(f(f())))f(f()f(f(f(f()))))))f())
)
```

**Finite-stage volume of the Menger sponge** — [complete symbol string](../verification/f-only-v1.5.7/geometric-h-menger-volume.f)

(Q(q),(Q(b),Q(r))). H(q,b,r) records the recurrence x_0=q+b and x_(n+1)=q+r(x_n−q). Decode its rational parameters and check 0<r<1. This execution record is distinct from the relation label introduced by Psi.

```text
f(
  f(f(f()f())f(f()f(f())))
  f(
    f(f(f()f(f()))f(f()f(f())))
    f(
      f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))
      f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))
    )
  )
)
```

**Finite-stage volume of the Menger sponge: responses at n=0,1,2,3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-trace-menger-volume.f)

List(H,list of states List(N(n),Q(value))). Recompute the four saved rational outputs both by q+br^n and by the one-step recurrence. General formulas, termination, and direction are established by the written proofs in Appendix A, not by these four samples.

The linked file contains the complete string (86976 characters), without ellipses or abbreviations.

**Introduce an L label from finite-stage volume of the menger sponge using Psi** — [complete symbol string](../verification/f-only-v1.5.7/geometric-intro-menger-volume.f)

List(H,L). Check the stated rule Psi(H(q,b,r))=(2sgn(b),q) after decoding the parameters. The output retains the integer k and the rational base, rather than converting the iteration count n or contraction ratio r into k. Pointwise addition is not transported by this rule.

```text
f(
  f(
    f(f(f()f())f(f()f(f())))
    f(
      f(f(f()f(f()))f(f()f(f())))
      f(
        f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))
        f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))
      )
    )
  )
  f(f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))f())
)
```

**Reject an H record with contraction ratio r=1** — [complete symbol string](../verification/f-only-v1.5.7/geometric-decimal-reject-invalid-ratio.f)

List(selected check name,candidate data,expected rejection N(0)). Decode the saved candidate and actually invoke the local checker, confirming that it rejects the violated formation condition or false claim. This is not a decision procedure for the meaning or termination of arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
        )
      )
    )
  )
  f(f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f(f(f()f(f()))f(f()f(f())))))f(f()f()))
)
```

**Reject a repeating-decimal record containing digit 10** — [complete symbol string](../verification/f-only-v1.5.7/geometric-decimal-reject-invalid-digit.f)

List(selected check name,candidate data,expected rejection N(0)). Decode the saved candidate and actually invoke the local checker, confirming that it rejects the violated formation condition or false claim. This is not a decision procedure for the meaning or termination of arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))))))
        )
      )
    )
  )
  f(f(f()f(f()f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))f())f())))f(f()f()))
)
```

**Reject an empty repeating block** — [complete symbol string](../verification/f-only-v1.5.7/geometric-decimal-reject-empty-repeat.f)

List(selected check name,candidate data,expected rejection N(0)). Decode the saved candidate and actually invoke the local checker, confirming that it rejects the violated formation condition or false claim. This is not a decision procedure for the meaning or termination of arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))))))))
        )
      )
    )
  )
  f(f(f()f(f()f(f()f())))f(f()f()))
)
```

**Reject a false lower-procedure response equal to 1/3** — [complete symbol string](../verification/f-only-v1.5.7/geometric-decimal-reject-false-recurrence.f)

List(selected check name,candidate data,expected rejection N(0)). Decode the saved candidate and actually invoke the local checker, confirming that it rejects the violated formation condition or false claim. This is not a decision procedure for the meaning or termination of arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))
        )
      )
    )
  )
  f(
    f(
      f(
        f(f(f()f(f()))f(f()f(f(f(f())))))
        f(f(f(f(f())f(f()))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
      )
      f(f(f(f()f(f(f(f()f())f(f()f(f())))f()))f(f(f(f())f(f(f(f()f(f()))f(f()f(f(f(f())))))f()))f()))f())
    )
    f(f()f())
  )
)
```

**Reject introduction of a lower H procedure with positive index k=2** — [complete symbol string](../verification/f-only-v1.5.7/geometric-decimal-reject-false-direction.f)

List(selected check name,candidate data,expected rejection N(0)). Decode the saved candidate and actually invoke the local checker, confirming that it rejects the violated formation condition or false claim. This is not a decision procedure for the meaning or termination of arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f()
      )
    )
  )
  f(
    f(
      f(
        f(f(f()f(f()))f(f()f(f(f(f())))))
        f(f(f(f(f())f(f()))f(f()f(f(f(f())))))f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f(f(f())))))))))))))
      )
      f(f(f(f()f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f())
    )
    f(f()f())
  )
)
```

**Reject identification of exact 1/3 with a label having k=−2** — [complete symbol string](../verification/f-only-v1.5.7/geometric-decimal-reject-false-exact-label.f)

List(selected check name,candidate data,expected rejection N(0)). Decode the saved candidate and actually invoke the local checker, confirming that it rejects the violated formation condition or false claim. This is not a decision procedure for the meaning or termination of arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))))))
        )
      )
    )
  )
  f(
    f(
      f(f()f(f()f(f(f(f(f(f())))f())f())))
      f(f(f(f()f(f()))f(f()f(f(f(f())))))f(f(f(f(f())f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f()))
    )
    f(f()f())
  )
)
```

**Record retaining the qlim rule, arguments, specification, and evidence** — [complete symbol string](../verification/f-only-v1.5.7/label-with-evidence.f)

List(rule reference,arguments,specification,evidence). This record describes checks of qlim responses; it is not a unified label required of every number or of T. Its evidence field refers to the written proof of Proposition 6.1 in the paper; this structural example is not claimed to have passed general proof checking.

The linked file contains the complete string (25215 characters), without ellipses or abbreviations.


### 7. The Linear Representation L of Relation Labels and Its Operations

Keep componentwise addition and order on relation labels L(k,q). The equation 0##+0##=0#### retains k=4 instead of compressing it to its sign. Pointwise addition of generation records differs from label addition: Φ(u+u) and Φ(u)+Φ(u) are unequal. The current M consists of all finite polynomials described in the next section.

**Auxiliary relation label L: 0#** — [complete symbol string](../verification/f-only-v1.5.7/legacy-l.f)

The pair (k,q)=(1,0). Its embedding into M is the coefficient list [0,1]. The integer k counts relation operators; it is not an recursion count n.

```text
f(f(f()f(f()))f(f(f()f())f(f()f(f()))))
```

**Relation label (k,q)=(1,0)** — [complete symbol string](../verification/f-only-v1.5.7/relation-l-one-step.f)

The integer k retains the count of relation operators. It is a different field from the natural-number recursion count n and is not compressed to its sign after an operation.

```text
f(f(f()f(f()))f(f(f()f())f(f()f(f()))))
```

**Relation label (k,q)=(2,0)** — [complete symbol string](../verification/f-only-v1.5.7/relation-l-two-steps.f)

The integer k retains the count of relation operators. It is a different field from the natural-number recursion count n and is not compressed to its sign after an operation.

```text
f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))
```

**Relation label (k,q)=(4,0)** — [complete symbol string](../verification/f-only-v1.5.7/relation-l-four-steps.f)

The integer k retains the count of relation operators. It is a different field from the natural-number recursion count n and is not compressed to its sign after an operation.

```text
f(f(f()f(f(f(f(f())))))f(f(f()f())f(f()f(f()))))
```

**Addition of relation labels: 0##+0##=0####** — [complete symbol string](../verification/f-only-v1.5.7/relation-l-addition.f)

List(L(2,0),L(2,0),L(4,0)). Check componentwise addition and the embedding into F independently, retaining k=4 in the result. The general additive-group laws remain the written proof of Theorem 7.1.

```text
f(
  f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))
  f(f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))f(f(f(f()f(f(f(f(f())))))f(f(f()f())f(f()f(f()))))f()))
)
```

**Order: 0<0#<0##<0####** — [complete symbol string](../verification/f-only-v1.5.7/relation-l-order.f)

List(L(0,0),L(1,0),L(2,0),L(4,0)). At the same base value, the order of the integer k is preserved in F. Check the three strict inequalities using the existing F comparison; this is distinct from machine checking a universal order-preservation theorem.

```text
f(
  f(f(f()f())f(f(f()f())f(f()f(f()))))
  f(
    f(f(f()f(f()))f(f(f()f())f(f()f(f()))))
    f(f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))f(f(f(f()f(f(f(f(f())))))f(f(f()f())f(f()f(f()))))f()))
  )
)
```

**Φ(u+u) differs from Φ(u)+Φ(u)** — [complete symbol string](../verification/f-only-v1.5.7/relation-intro-not-additive.f)

List(u=G(0,1/2),pointwise sum G(0,1),reintroduced label L(2,0),sum of labels L(4,0)). Retain and recompute the two distinct routes by component arithmetic and comparison in F. This counterexample rules out treating Φ as an additive homomorphism or an additive quotient map.

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f())))))
  f(
    f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f()))))
    f(f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))f(f(f(f()f(f(f(f(f())))))f(f(f()f())f(f()f(f()))))f()))
  )
)
```

**Reject malformed L with a natural-number-only integer field** — [complete symbol string](../verification/f-only-v1.5.7/relation-reject-malformed-label.f)

List(specified check name,candidate to check,Boolean 0 for nonacceptance). Decode the stored candidate and execute the designated local check, confirming that it rejects the candidate by raising an exception. This is an explicit rejection example, not a universal checker for arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))
        )
      )
    )
  )
  f(f(f(f(f()))f(f(f()f())f(f()f(f()))))f(f()f()))
)
```

**Reject the false output L(4,0) for Φ** — [complete symbol string](../verification/f-only-v1.5.7/relation-reject-false-introduction.f)

List(specified check name,candidate to check,Boolean 0 for nonacceptance). Decode the stored candidate and execute the designated local check, confirming that it rejects the candidate by raising an exception. This is an explicit rejection example, not a universal checker for arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f()
      )
    )
  )
  f(
    f(
      f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f(f())))))
      f(f(f(f()f(f(f(f(f())))))f(f(f()f())f(f()f(f()))))f())
    )
    f(f()f())
  )
)
```

**Reject a false sum that compresses k back to 2** — [complete symbol string](../verification/f-only-v1.5.7/relation-reject-compressed-sum.f)

List(specified check name,candidate to check,Boolean 0 for nonacceptance). Decode the stored candidate and execute the designated local check, confirming that it rejects the candidate by raising an exception. This is an explicit rejection example, not a universal checker for arbitrary programs.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
  )
  f(
    f(
      f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))
      f(f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))f(f(f(f()f(f(f())))f(f(f()f())f(f()f(f()))))f()))
    )
    f(f()f())
  )
)
```


### 8. M-polynomials, Fε, and adjoining elements as needed

Construct M-polynomials as rational coefficient lists, their ratios F, generative complex numbers as matrices, and generative quaternions as pairs of generative complex numbers. Then define multiplication with σ²=2 on pairs of F values in type T, and show products whose inputs and results all have the specified type T.

**M-polynomial: 0** — [complete symbol string](../verification/f-only-v1.5.7/m-zero.f)

A sequence of rational coefficients beginning with the constant term. M is the type of all such finite sequences.

```text
f()
```

**M-polynomial: 1** — [complete symbol string](../verification/f-only-v1.5.7/m-one.f)

A sequence of rational coefficients beginning with the constant term. M is the type of all such finite sequences.

```text
f(f(f(f()f(f()))f(f()f(f())))f())
```

**M-polynomial: ε** — [complete symbol string](../verification/f-only-v1.5.7/m-epsilon.f)

A sequence of rational coefficients beginning with the constant term. M is the type of all such finite sequences.

```text
f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f()))
```

**M-polynomial: ε²** — [complete symbol string](../verification/f-only-v1.5.7/m-epsilon-squared.f)

A sequence of rational coefficients beginning with the constant term. M is the type of all such finite sequences.

```text
f(f(f(f()f())f(f()f(f())))f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f())))
```

**M-polynomial: 1+ε** — [complete symbol string](../verification/f-only-v1.5.7/m-one-plus-epsilon.f)

A sequence of rational coefficients beginning with the constant term. M is the type of all such finite sequences.

```text
f(f(f(f()f(f()))f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f()))
```

**M-polynomial: ε/2** — [complete symbol string](../verification/f-only-v1.5.7/m-epsilon-half.f)

A sequence of rational coefficients beginning with the constant term. M is the type of all such finite sequences.

```text
f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f(f()))))f()))
```

**M-polynomial: 1−2ε+(1/2)ε²** — [complete symbol string](../verification/f-only-v1.5.7/m-general.f)

A sequence of rational coefficients beginning with the constant term. M is the type of all such finite sequences.

```text
f(f(f(f()f(f()))f(f()f(f())))f(f(f(f(f())f(f(f())))f(f()f(f())))f(f(f(f()f(f()))f(f()f(f(f()))))f())))
```

**F: zero** — [complete symbol string](../verification/f-only-v1.5.7/f-zero.f)

Normalized polynomial ratio {"numerator":[],"denominator":["1/1"]}

```text
f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
```

**F: one** — [complete symbol string](../verification/f-only-v1.5.7/f-one.f)

Normalized polynomial ratio {"numerator":["1/1"],"denominator":["1/1"]}

```text
f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
```

**F: minus-one** — [complete symbol string](../verification/f-only-v1.5.7/f-minus-one.f)

Normalized polynomial ratio {"numerator":["-1/1"],"denominator":["1/1"]}

```text
f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
```

**F: epsilon** — [complete symbol string](../verification/f-only-v1.5.7/f-epsilon.f)

Normalized polynomial ratio {"numerator":["0/1","1/1"],"denominator":["1/1"]}

```text
f(f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f()))f(f(f(f()f(f()))f(f()f(f())))f()))
```

**F: inverse-epsilon** — [complete symbol string](../verification/f-only-v1.5.7/f-inverse-epsilon.f)

Normalized polynomial ratio {"numerator":["1/1"],"denominator":["0/1","1/1"]}

```text
f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f())))
```

**F: square-ratio** — [complete symbol string](../verification/f-only-v1.5.7/f-square-ratio.f)

Normalized polynomial ratio {"numerator":["0/1","0/1","1/1"],"denominator":["1/1","1/1"]}

```text
f(
  f(f(f(f()f())f(f()f(f())))f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f())))
  f(f(f(f()f(f()))f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**Degree of ε²** — [complete symbol string](../verification/f-only-v1.5.7/poly-degree.f)

Direct representation with the type specified externally.

```text
f(f(f()))
```

**Degree difference for 1/ε** — [complete symbol string](../verification/f-only-v1.5.7/valuation-negative.f)

Direct representation with the type specified externally.

```text
f(f(f())f(f()))
```

**st((1+ε)/(2−ε))** — [complete symbol string](../verification/f-only-v1.5.7/standard-part.f)

The output value of the standard part. Its domain condition and computation evidence are checked separately.

```text
f(f(f()f(f()))f(f()f(f(f()))))
```

**Generative complex number zero** — [complete symbol string](../verification/f-only-v1.5.7/complex-zero.f)

The matrix ((a,−b),(b,a)) from the original proposal. All entries belong to F.

```text
f(
  f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
  f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
)
```

**Generative complex number one** — [complete symbol string](../verification/f-only-v1.5.7/complex-one.f)

The matrix ((a,−b),(b,a)) from the original proposal. All entries belong to F.

```text
f(
  f(
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
  )
  f(
    f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  )
)
```

**Generative complex number i** — [complete symbol string](../verification/f-only-v1.5.7/complex-i.f)

The matrix ((a,−b),(b,a)) from the original proposal. All entries belong to F.

```text
f(
  f(
    f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  )
  f(
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
  )
)
```

**Generative complex number one-plus-i** — [complete symbol string](../verification/f-only-v1.5.7/complex-one-plus-i.f)

The matrix ((a,−b),(b,a)) from the original proposal. All entries belong to F.

```text
f(
  f(
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  )
  f(
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  )
)
```

**Generative complex number one-minus-i** — [complete symbol string](../verification/f-only-v1.5.7/complex-one-minus-i.f)

The matrix ((a,−b),(b,a)) from the original proposal. All entries belong to F.

```text
f(
  f(
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  )
  f(
    f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  )
)
```

**Generative quaternion one** — [complete symbol string](../verification/f-only-v1.5.7/quaternion-one.f)

Read ((a+bi),(c+di)) as z+w j. Each complex number uses the matrix representation of the original proposal.

```text
f(
  f(
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
    )
    f(
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
  )
  f(
    f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
    f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
  )
)
```

**Generative quaternion i** — [complete symbol string](../verification/f-only-v1.5.7/quaternion-i.f)

Read ((a+bi),(c+di)) as z+w j. Each complex number uses the matrix representation of the original proposal.

```text
f(
  f(
    f(
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
    )
  )
  f(
    f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
    f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
  )
)
```

**Generative quaternion j** — [complete symbol string](../verification/f-only-v1.5.7/quaternion-j.f)

Read ((a+bi),(c+di)) as z+w j. Each complex number uses the matrix representation of the original proposal.

```text
f(
  f(
    f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
    f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
  )
  f(
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
    )
    f(
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
  )
)
```

**Generative quaternion k** — [complete symbol string](../verification/f-only-v1.5.7/quaternion-k.f)

Read ((a+bi),(c+di)) as z+w j. Each complex number uses the matrix representation of the original proposal.

```text
f(
  f(
    f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
    f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
  )
  f(
    f(
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
    )
  )
)
```

**Generative quaternion all-one** — [complete symbol string](../verification/f-only-v1.5.7/quaternion-all-one.f)

Read ((a+bi),(c+di)) as z+w j. Each complex number uses the matrix representation of the original proposal.

```text
f(
  f(
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
  )
  f(
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
    f(
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
      f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
    )
  )
)
```

**T value 0** — [complete symbol string](../verification/f-only-v1.5.7/t-zero.f)

A pair (a,b) of two F values. Specify type T before calculation; integration with a sequence or interval generator is not required.

```text
f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f()f(f(f(f()f(f()))f(f()f(f())))f())))
```

**T value 1** — [complete symbol string](../verification/f-only-v1.5.7/t-one.f)

A pair (a,b) of two F values. Specify type T before calculation; integration with a sequence or interval generator is not required.

```text
f(
  f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**T value −1** — [complete symbol string](../verification/f-only-v1.5.7/t-minus-one.f)

A pair (a,b) of two F values. Specify type T before calculation; integration with a sequence or interval generator is not required.

```text
f(
  f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**T value 2** — [complete symbol string](../verification/f-only-v1.5.7/t-two.f)

A pair (a,b) of two F values. Specify type T before calculation; integration with a sequence or interval generator is not required.

```text
f(
  f(f(f(f(f()f(f(f())))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**T value σ** — [complete symbol string](../verification/f-only-v1.5.7/t-sigma.f)

A pair (a,b) of two F values. Specify type T before calculation; integration with a sequence or interval generator is not required.

```text
f(
  f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**T value σ/2** — [complete symbol string](../verification/f-only-v1.5.7/t-sigma-half.f)

A pair (a,b) of two F values. Specify type T before calculation; integration with a sequence or interval generator is not required.

```text
f(
  f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f(f(f(f()f(f()))f(f()f(f(f()))))f())f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**T value 1+σ** — [complete symbol string](../verification/f-only-v1.5.7/t-one-plus-sigma.f)

A pair (a,b) of two F values. Specify type T before calculation; integration with a sequence or interval generator is not required.

```text
f(
  f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**T value 1−σ** — [complete symbol string](../verification/f-only-v1.5.7/t-one-minus-sigma.f)

A pair (a,b) of two F values. Specify type T before calculation; integration with a sequence or interval generator is not required.

```text
f(
  f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
  f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
)
```

**Product with type fixed to T: (1,1)(1,−1)=(−1,0)** — [complete symbol string](../verification/f-only-v1.5.7/fixed-t-product-conjugate.f)

List(type T, operation name Mul, list of two inputs, result in T). Decode all components as F values and recompute (ac+2bd,ad+bc). Check the previously declared type and the formation conditions for all inputs and the result.

```text
f(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f(
      f(
        f(
          f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
          f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
        )
        f(
          f(f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f())))
          f()
        )
      )
      f(
        f(
          f(f(f(f(f(f())f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
          f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
        )
        f()
      )
    )
  )
)
```

**Product with type fixed to T: σ²=(2,0)** — [complete symbol string](../verification/f-only-v1.5.7/fixed-t-product-sigma-square.f)

List(type T, operation name Mul, list of two inputs, result in T). Decode all components as F values and recompute (ac+2bd,ad+bc). Check the previously declared type and the formation conditions for all inputs and the result.

```text
f(
  f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))f())
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f(
      f(
        f(
          f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
          f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
        )
        f(
          f(f(f()f(f(f(f()f(f()))f(f()f(f())))f()))f(f(f(f(f()f(f()))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f())))
          f()
        )
      )
      f(
        f(
          f(f(f(f(f()f(f(f())))f(f()f(f())))f())f(f(f(f()f(f()))f(f()f(f())))f()))
          f(f()f(f(f(f()f(f()))f(f()f(f())))f()))
        )
        f()
      )
    )
  )
)
```


### 9. Connecting the Constructions — Finite Traces and Responses to Precision Requests

Intervals, precision requests, generator states, and finite traces are represented by numbers and their combinations. Approximation is a separate operation requested when needed. A concrete example checks that the exact difference 2ε for q## lies below a rational error bound; agreement in approximation is not exact equality, and numbers need not carry a unified label combining them with a generator. Appendix A separates a repeating-decimal record from exact, lower, and upper interpretations; shared finite prefix bounds do not identify their distinct exact values.

**Interval from 0/1 to 1/1** — [complete symbol string](../verification/f-only-v1.5.7/interval-unit.f)

(lower endpoint Q,upper endpoint Q). Check the order condition separately.

```text
f(f(f(f()f())f(f()f(f())))f(f(f()f(f()))f(f()f(f()))))
```

**Interval from 0/1 to 2/1** — [complete symbol string](../verification/f-only-v1.5.7/interval-sqrt2-initial.f)

(lower endpoint Q,upper endpoint Q). Check the order condition separately.

```text
f(f(f(f()f())f(f()f(f())))f(f(f()f(f(f())))f(f()f(f()))))
```

**Interval from 1/1 to 3/2** — [complete symbol string](../verification/f-only-v1.5.7/interval-sqrt2-refined.f)

(lower endpoint Q,upper endpoint Q). Check the order condition separately.

```text
f(f(f(f()f(f()))f(f()f(f())))f(f(f()f(f(f(f()))))f(f()f(f(f())))))
```

**Precision request p=2** — [complete symbol string](../verification/f-only-v1.5.7/precision-two.f)

Direct representation with the type specified externally.

```text
f(f(f()))
```

**Error tolerance 1/4 for p=2** — [complete symbol string](../verification/f-only-v1.5.7/precision-width.f)

Direct representation with the type specified externally.

```text
f(f(f()f(f()))f(f()f(f(f(f(f()))))))
```

**Approximate value and error bound: bounds from interval endpoints** — [complete symbol string](../verification/f-only-v1.5.7/approx-value-error-bracket.f)

(precision request 3 in N, (approximate value 17/12 in Q, error bound 1/204 in Q)). This is a rational response requested separately from a value of type T. The endpoints 24/17 and 17/12 bracket σ; their width is 1/204 and is at most 2⁻³.

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))
      f(f()f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))
    )
    f(
      f(f()f(f()))
      f(
        f()
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      )
    )
  )
)
```

**Approximate value and error bound: bound from the residual** — [complete symbol string](../verification/f-only-v1.5.7/approx-value-error-residual.f)

(precision request 3 in N, (approximate value 17/12 in Q, error bound 1/288 in Q)). This is a rational response requested separately from a value of type T. For q=17/12≥1, the rational residual bound |q²−2|/2 is 1/288 and is at most 2⁻³.

```text
f(
  f(f(f(f())))
  f(
    f(
      f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))
      f(f()f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))
    )
    f(
      f(f()f(f()))
      f(
        f()
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      )
    )
  )
)
```

**Rational approximation to (3/2)##: return 3/2 at p=3** — [complete symbol string](../verification/f-only-v1.5.7/relation-rational-error.f)

List(L(2,3/2),rational approximation 3/2,natural-number request 3,rational bound 1/8). Check that the exact difference is 2ε, is positive, and lies below 1/8. Only this request is checked here; the guarantee for every p remains the written proof of Proposition 9.6. Agreement in approximation is not exact equality.

```text
f(
  f(f(f()f(f(f())))f(f(f()f(f(f(f()))))f(f()f(f(f())))))
  f(
    f(f(f()f(f(f(f()))))f(f()f(f(f()))))
    f(f(f(f(f())))f(f(f(f()f(f()))f(f()f(f(f(f(f(f(f(f(f()))))))))))f()))
  )
)
```

**Repeating-decimal record 0._3** — [complete symbol string](../verification/f-only-v1.5.7/decimal-record-third.f)

List(nonnegative integer part N,list of finite nonrepeating digits,nonempty list of repeating digits). The underscore marks the start of the repeating block in the display convention. Exact, lower, and upper interpretations are specified separately; direction is not encoded by the repeating digit itself.

```text
f(f()f(f()f(f(f(f(f(f())))f())f())))
```

**Exact rational interpretation of 0._3** — [complete symbol string](../verification/f-only-v1.5.7/decimal-exact-third.f)

List(decimal record,exact rational value Q,L(0,exact value)). Compute the value by a finite rational formula for the repeating block and retain relation index zero. The decimal record itself is not identified with a lower or upper relation label.

```text
f(
  f(f()f(f()f(f(f(f(f(f())))f())f())))
  f(f(f(f()f(f()))f(f()f(f(f(f())))))f(f(f(f()f())f(f(f()f(f()))f(f()f(f(f(f()))))))f()))
)
```

**Repeating-decimal record 0._6** — [complete symbol string](../verification/f-only-v1.5.7/decimal-record-two-thirds.f)

List(nonnegative integer part N,list of finite nonrepeating digits,nonempty list of repeating digits). The underscore marks the start of the repeating block in the display convention. Exact, lower, and upper interpretations are specified separately; direction is not encoded by the repeating digit itself.

```text
f(f()f(f()f(f(f(f(f(f(f(f(f()))))))f())f())))
```

**Exact rational interpretation of 0._6** — [complete symbol string](../verification/f-only-v1.5.7/decimal-exact-two-thirds.f)

List(decimal record,exact rational value Q,L(0,exact value)). Compute the value by a finite rational formula for the repeating block and retain relation index zero. The decimal record itself is not identified with a lower or upper relation label.

```text
f(
  f(f()f(f()f(f(f(f(f(f(f(f(f()))))))f())f())))
  f(f(f(f()f(f(f())))f(f()f(f(f(f())))))f(f(f(f()f())f(f(f()f(f(f())))f(f()f(f(f(f()))))))f()))
)
```

**The same first 1 decimal digits with distinct labels for 1/3** — [complete symbol string](../verification/f-only-v1.5.7/decimal-prefix-1.f)

List(record for 0._3,n,lower endpoint d_n,upper endpoint u_n,integer representing the prefix,List(L(−2,1/3),L(0,1/3),L(2,1/3)),exact value 1/3). Recompute the truncated prefix and both H responses by rational arithmetic, then check six strict bounds for the three labels using existing F arithmetic. Shared finite prefix bounds do not make the labels equal. The all-digit statement remains a written proof.

```text
f(
  f(f()f(f()f(f(f(f(f(f())))f())f())))
  f(
    f(f())
    f(
      f(f(f()f(f(f(f()))))f(f()f(f(f(f(f(f(f(f(f(f(f()))))))))))))
      f(
        f(f(f()f(f(f())))f(f()f(f(f(f(f(f())))))))
        f(
          f(f(f(f())))
          f(f(f(f(f(f())f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f(f(f(f()f())f(f(f()f(f()))f(f()f(f(f(f()))))))f(f(f(f()f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f())))f(f(f(f()f(f()))f(f()f(f(f(f())))))f()))
        )
      )
    )
  )
)
```

**The same first 2 decimal digits with distinct labels for 1/3** — [complete symbol string](../verification/f-only-v1.5.7/decimal-prefix-2.f)

List(record for 0._3,n,lower endpoint d_n,upper endpoint u_n,integer representing the prefix,List(L(−2,1/3),L(0,1/3),L(2,1/3)),exact value 1/3). Recompute the truncated prefix and both H responses by rational arithmetic, then check six strict bounds for the three labels using existing F arithmetic. Shared finite prefix bounds do not make the labels equal. The all-digit statement remains a written proof.

```text
f(
  f(f()f(f()f(f(f(f(f(f())))f())f())))
  f(
    f(f(f()))
    f(
      f(
        f(
          f()
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))
        )
        f(
          f()
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        )
      )
      f(
        f(
          f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))
          f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))
        )
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))
          f(f(f(f(f(f())f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f(f(f(f()f())f(f(f()f(f()))f(f()f(f(f(f()))))))f(f(f(f()f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f())))f(f(f(f()f(f()))f(f()f(f(f(f())))))f()))
        )
      )
    )
  )
)
```

**The same first 3 decimal digits with distinct labels for 1/3** — [complete symbol string](../verification/f-only-v1.5.7/decimal-prefix-3.f)

List(record for 0._3,n,lower endpoint d_n,upper endpoint u_n,integer representing the prefix,List(L(−2,1/3),L(0,1/3),L(2,1/3)),exact value 1/3). Recompute the truncated prefix and both H responses by rational arithmetic, then check six strict bounds for the three labels using existing F arithmetic. Shared finite prefix bounds do not make the labels equal. The all-digit statement remains a written proof.

```text
f(
  f(f()f(f()f(f(f(f(f(f())))f())f())))
  f(
    f(f(f(f())))
    f(
      f(
        f(
          f()
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        )
        f(
          f()
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        )
      )
      f(
        f(
          f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f()f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        )
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f())f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f(f(f(f()f())f(f(f()f(f()))f(f()f(f(f(f()))))))f(f(f(f()f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))f())))f(f(f(f()f(f()))f(f()f(f(f(f())))))f()))
        )
      )
    )
  )
)
```

**Lower 1/3 plus lower 2/3: L(−4,1)** — [complete symbol string](../verification/f-only-v1.5.7/decimal-lower-sum.f)

List(left L,right L,result L). Add the integer and rational components in the specified type and check the embedding in F. Retain k=−4; the result is not the exact rational number 1.

```text
f(
  f(f(f(f())f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))
  f(
    f(f(f(f())f(f(f())))f(f(f()f(f(f())))f(f()f(f(f(f()))))))
    f(f(f(f(f())f(f(f(f(f())))))f(f(f()f(f()))f(f()f(f()))))f())
  )
)
```

**Upper 1/3 plus lower 2/3: the exact number 1** — [complete symbol string](../verification/f-only-v1.5.7/decimal-mixed-sum.f)

List(left L,right L,result L). Componentwise addition and its embedding in F give k=0 and rational base 1. This result follows from the declared interpretations and operations, not from the appearance of decimal digits.

```text
f(
  f(f(f()f(f(f())))f(f(f()f(f()))f(f()f(f(f(f()))))))
  f(f(f(f(f())f(f(f())))f(f(f()f(f(f())))f(f()f(f(f(f()))))))f(f(f(f()f())f(f(f()f(f()))f(f()f(f()))))f()))
)
```

**State of the generator specified by the interval-generating label for √2** — [complete symbol string](../verification/f-only-v1.5.7/sqrt2-state.f)

List(stage index 2,lower endpoint 1,upper endpoint 3/2)

```text
f(f(f(f()))f(f(f(f()f(f()))f(f()f(f())))f(f(f(f()f(f(f(f()))))f(f()f(f(f()))))f())))
```

**Initial state of the generator specified by the Leibniz interval-generating label** — [complete symbol string](../verification/f-only-v1.5.7/leibniz-state.f)

List(stage index 0,lower endpoint 8/3,upper endpoint 4)

```text
f(f()f(f(f(f()f(f(f(f(f(f(f(f(f())))))))))f(f()f(f(f(f())))))f(f(f(f()f(f(f(f(f())))))f(f()f(f())))f())))
```

**Syntax of division awaiting evidence of separation** — [complete symbol string](../verification/f-only-v1.5.7/label-pending-division.f)

The call expression DivLabel(P,Q). Since the condition of separation from zero has not been satisfied, this is not evidence permitting execution as a label that satisfies the contract.

The linked file contains the complete string (10419 characters), without ellipses or abbreviations.

**State after one Newton update** — [complete symbol string](../verification/f-only-v1.5.7/newton-state.f)

List(stage index 1,lower endpoint 4/3,upper endpoint 3/2). The product of the endpoints is 2.

```text
f(f(f())f(f(f(f()f(f(f(f(f())))))f(f()f(f(f(f())))))f(f(f(f()f(f(f(f()))))f(f()f(f(f()))))f())))
```

**Evidence data for a response separated from zero** — [complete symbol string](../verification/f-only-v1.5.7/separation-witness.f)

(request 0,interval [1,2]). Only separation from zero at the endpoints is checked; the universal contract for the corresponding generative label is required separately.

```text
f(f()f(f(f(f()f(f()))f(f()f(f())))f(f(f()f(f(f())))f(f()f(f())))))
```

**Zero classification: zero** — [complete symbol string](../verification/f-only-v1.5.7/zero-classification-zero.f)

Node(0;). Distinguish zero, nonzero, and unknown. Computation evidence for specific classifications is included in proof-generators.

```text
f(f()f())
```

**Zero classification: nonzero** — [complete symbol string](../verification/f-only-v1.5.7/zero-classification-nonzero.f)

Node(1;). Distinguish zero, nonzero, and unknown. Computation evidence for specific classifications is included in proof-generators.

```text
f(f(f())f())
```

**Zero classification: unknown** — [complete symbol string](../verification/f-only-v1.5.7/zero-classification-unknown.f)

Node(2;). Distinguish zero, nonzero, and unknown. Computation evidence for specific classifications is included in proof-generators.

```text
f(f(f(f()))f())
```

**Finite rule data for an alternating sum** — [complete symbol string](../verification/f-only-v1.5.7/alternating-rule.f)

A finite record selecting a known family. A proof of the general contract and checks at each precision are attached separately.

The linked file contains the complete string (10527 characters), without ellipses or abbreviations.

**Syntax of the error modulus μ(k)=k+2** — [complete symbol string](../verification/f-only-v1.5.7/cauchy-modulus.f)

A call expression for natural-number addition. Its validity as an error modulus is proved in relation to the sequence concerned.

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f(f(f(f()f(f()f()))f(f(f(f())f(f(f()f())f(f(f(f()))f())))f()))f())
  )
)
```

**Center and radius for finite interval construction** — [complete symbol string](../verification/f-only-v1.5.7/cauchy-center-radius.f)

(center 1/4,radius 1/4). Data for J_0=[0,1/2], obtained from the geometric sequence s_n=2^(-n) and μ(0)=2.

```text
f(f(f(f()f(f()))f(f()f(f(f(f(f()))))))f(f(f()f(f()))f(f()f(f(f(f(f())))))))
```

**Label retaining an integer translation** — [complete symbol string](../verification/f-only-v1.5.7/translated-label.f)

(base-label reference P,integer −2). Translate the output value.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f()
  )
  f(f(f())f(f(f())))
)
```

**Translation arrow τ(P,2;−1)** — [complete symbol string](../verification/f-only-v1.5.7/translation-arrow.f)

List(base-label reference P,source integer 2,translation amount −1). The target integer is 1.

```text
f(
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f()
  )
  f(f(f()f(f(f())))f(f(f(f())f(f()))f()))
)
```

**Full F precision request ε** — [complete symbol string](../verification/f-only-v1.5.7/precision-field-epsilon.f)

Retain a positive element of F as an error request, distinguished from a request using the rational number 2^(-p).

```text
f(f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f())))f()))f(f(f(f()f(f()))f(f()f(f())))f()))
```

**Formal derivative 2x of 1+x²** — [complete symbol string](../verification/f-only-v1.5.7/polynomial-derivative.f)

Direct representation with the type specified externally.

```text
f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f(f())))f(f()f(f())))f()))
```

**Antiderivative x+x³/3 of 1+x² with zero constant term** — [complete symbol string](../verification/f-only-v1.5.7/polynomial-primitive.f)

Direct representation with the type specified externally.

```text
f(
  f(f(f()f())f(f()f(f())))
  f(f(f(f()f(f()))f(f()f(f())))f(f(f(f()f())f(f()f(f())))f(f(f(f()f(f()))f(f()f(f(f(f())))))f())))
)
```

**Formal integral 4/3 of 1+x² between endpoints 0 and 1** — [complete symbol string](../verification/f-only-v1.5.7/polynomial-integral.f)

Direct representation with the type specified externally.

```text
f(f(f()f(f(f(f(f())))))f(f()f(f(f(f())))))
```

**Identity arrow** — [complete symbol string](../verification/f-only-v1.5.7/identity-arrow.f)

(state λx.x,empty trace)

```text
f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f())
```

**Arrow for one β-reduction step** — [complete symbol string](../verification/f-only-v1.5.7/one-step-arrow.f)

(initial state,List(reduction step)). Distinguished externally from a general state type.

```text
f(
  f(f(f(f()))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f())))
  f(
    f(
      f()
      f(
        f()
        f(
          f(f(f(f()))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f())))
          f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f(f()f()))
        )
      )
    )
    f()
  )
)
```


### 10. The Scope of Treating Proof as Processing

Distinguish proposition syntax from proof data. All stored proof bundles are included without omissions and rechecked using their corresponding kernels.

**Bound-variable index zero in a term** — [complete symbol string](../verification/f-only-v1.5.7/term-variable.f)

Node(0;N(0)). Type and binding depend on the surrounding context.

```text
f(f()f(f()f()))
```

**Constant term for natural number one** — [complete symbol string](../verification/f-only-v1.5.7/term-literal.f)

Node(1;Type(N),N(1))

```text
f(f(f())f(f(f()f())f(f(f())f())))
```

**Addition call expression** — [complete symbol string](../verification/f-only-v1.5.7/term-add-call.f)

Node(2;Text(Add),List(1,1)). Accompanied by a definition table.

```text
f(
  f(f(f()))
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f(f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))f())
  )
)
```

**Equality 1=1** — [complete symbol string](../verification/f-only-v1.5.7/proposition-equal.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))
```

**Order 0<1** — [complete symbol string](../verification/f-only-v1.5.7/proposition-less.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(f(f())f(f(f()f())f(f(f(f())f(f(f()f())f(f()f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))
```

**Conjunction** — [complete symbol string](../verification/f-only-v1.5.7/proposition-and.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(
  f(f(f()))
  f(
    f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))
    f(f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))f())
  )
)
```

**Disjunction** — [complete symbol string](../verification/f-only-v1.5.7/proposition-or.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(
  f(f(f(f())))
  f(
    f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))
    f(f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))f())
  )
)
```

**Implication** — [complete symbol string](../verification/f-only-v1.5.7/proposition-implies.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(
  f(f(f(f(f()))))
  f(
    f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))
    f(f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))f())
  )
)
```

**Falsity** — [complete symbol string](../verification/f-only-v1.5.7/proposition-false.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(f(f(f(f(f(f())))))f())
```

**For every n, n=n** — [complete symbol string](../verification/f-only-v1.5.7/proposition-forall.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(f(f(f(f(f(f(f()))))))f(f(f()f())f(f(f()f(f(f()f())f(f(f()f(f()f()))f(f(f()f(f()f()))f()))))f())))
```

**For some n, n=0** — [complete symbol string](../verification/f-only-v1.5.7/proposition-exists.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(
  f(f(f(f(f(f(f(f())))))))
  f(f(f()f())f(f(f()f(f(f()f())f(f(f()f(f()f()))f(f(f(f())f(f(f()f())f(f()f())))f()))))f()))
)
```

**Named predicate nonzero(1)** — [complete symbol string](../verification/f-only-v1.5.7/proposition-predicate.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(
  f(f(f(f(f(f(f(f(f()))))))))
  f(
    f(
      f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f()))))
        )
      )
    )
    f(f(f(f(f())f(f(f()f())f(f(f())f())))f())f())
  )
)
```

**Negation: 1=1 implies falsity** — [complete symbol string](../verification/f-only-v1.5.7/proposition-not.f)

An example of proposition syntax. Preserving its syntax is distinct from its being true.

```text
f(
  f(f(f(f(f()))))
  f(
    f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f()))))
    f(f(f(f(f(f(f(f())))))f())f())
  )
)
```

**Universally quantified proposition for associativity of addition** — [complete symbol string](../verification/f-only-v1.5.7/proposition-associativity.f)

∀l:N.∀m:N.∀n:N. Add(Add(l,m),n)=Add(l,Add(m,n))

```text
f(
  f(f(f(f(f(f(f()))))))
  f(
    f(f()f())
    f(
      f(
        f(f(f(f(f(f(f()))))))
        f(
          f(f()f())
          f(f(f(f(f(f(f(f(f()))))))f(f(f()f())f(f(f()f(f(f()f())f(f(f(f(f()))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f(f(f(f(f(f()))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f(f(f(f()f(f(f(f()))f()))f(f(f()f(f(f())f()))f()))f())))f(f(f()f(f()f()))f()))f())))f(f(f(f(f()))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f(f(f(f()f(f(f(f()))f()))f(f(f(f(f()))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))f())))f(f(f(f()f(f(f())f()))f(f(f()f(f()f()))f()))f())))f()))f())))f()))))f())))f())
        )
      )
      f()
    )
  )
)
```

**Judgment asserting 1=1 from no assumptions** — [complete symbol string](../verification/f-only-v1.5.7/judgment.f)

(assumption List,proposition)

```text
f(f()f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f())))))
```

**Proof node for the reflexivity rule: proposed representation** — [complete symbol string](../verification/f-only-v1.5.7/proof-node-reflexivity.f)

List(rule 1,judgment,rule data,premise List). A general-purpose checker for this proposed representation has not been implemented.

```text
f(
  f(f())
  f(
    f(f()f(f()f(f(f()f())f(f(f(f())f(f(f()f())f(f(f())f())))f(f(f(f())f(f(f()f())f(f(f())f())))f())))))
    f(f(f(f()f())f(f(f())f(f(f()f())f(f(f())f()))))f(f()f()))
  )
)
```

**Rule-specific data for natural-number induction: specification example** — [complete symbol string](../verification/f-only-v1.5.7/proof-induction-data.f)

The induction-variable index, a reference index for the base-case proof, and a reference index for the induction-step proof. This isolated example is not a proof without the referenced records and freshness checks.

```text
f(f()f(f(f())f(f(f(f()))f())))
```

**Initial state of the three-register machine** — [complete symbol string](../verification/f-only-v1.5.7/register-state.f)

(instruction position 0,List(2,3,0)). Initial state for the input 2+3.

```text
f(f()f(f(f(f()))f(f(f(f(f())))f(f()f()))))
```

**Complete instruction sequence for three-register addition** — [complete symbol string](../verification/f-only-v1.5.7/register-program.f)

A six-instruction addition program using four instruction types from the instruction convention zero,succ,copy,jeq,halt. Its execution traces and checks are included in proof-models.

The linked file contains the complete string (31206 characters), without ellipses or abbreviations.

**Record of one β-reduction step** — [complete symbol string](../verification/f-only-v1.5.7/beta-step.f)

List(β-rule 0,root position,λ-term before reduction,λ-term after reduction,empty sequence of auxiliary evidence)

```text
f(
  f()
  f(
    f()
    f(
      f(f(f(f()))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f())))
      f(f(f(f(f(f())))f(f(f()f(f()f()))f()))f(f()f()))
    )
  )
)
```

**Positions for the λ-body, function side, and argument side** — [complete symbol string](../verification/f-only-v1.5.7/lambda-position.f)

List(N(0),N(1),N(2)). Whether a position is valid in a particular term is checked separately.

```text
f(f()f(f(f())f(f(f(f()))f())))
```

**Termination status normal-form** — [complete symbol string](../verification/f-only-v1.5.7/status-normal-form.f)

The discriminant part Node(0;). Actual traces also retain additional data.

```text
f(f()f())
```

**Termination status step-limit** — [complete symbol string](../verification/f-only-v1.5.7/status-step-limit.f)

The discriminant part Node(1;). Actual traces also retain additional data.

```text
f(f(f())f())
```

**Termination status stopped** — [complete symbol string](../verification/f-only-v1.5.7/status-stopped.f)

The discriminant part Node(2;). Actual traces also retain additional data.

```text
f(f(f(f()))f())
```

**Termination status error** — [complete symbol string](../verification/f-only-v1.5.7/status-error.f)

The discriminant part Node(3;). Actual traces also retain additional data.

```text
f(f(f(f(f())))f())
```

**JSON null** — [complete symbol string](../verification/f-only-v1.5.7/json-null.f)

A format for conversion in both directions using tags and payloads. It is distinct from a direct number representation.

```text
f(f()f())
```

**JSON false** — [complete symbol string](../verification/f-only-v1.5.7/json-false.f)

A format for conversion in both directions using tags and payloads. It is distinct from a direct number representation.

```text
f(f(f())f())
```

**JSON true** — [complete symbol string](../verification/f-only-v1.5.7/json-true.f)

A format for conversion in both directions using tags and payloads. It is distinct from a direct number representation.

```text
f(f(f(f()))f())
```

**JSON 2** — [complete symbol string](../verification/f-only-v1.5.7/json-2.f)

A format for conversion in both directions using tags and payloads. It is distinct from a direct number representation.

```text
f(
  f(f(f(f())))
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))
    f()
  )
)
```

**JSON "a"** — [complete symbol string](../verification/f-only-v1.5.7/json-a.f)

A format for conversion in both directions using tags and payloads. It is distinct from a direct number representation.

```text
f(
  f(f(f(f(f()))))
  f(
    f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
    f()
  )
)
```

**JSON [1,2]** — [complete symbol string](../verification/f-only-v1.5.7/json-array.f)

A format for conversion in both directions using tags and payloads. It is distinct from a direct number representation.

```text
f(
  f(f(f(f(f(f())))))
  f(
    f(
      f(f(f(f())))
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))
        f()
      )
    )
    f(
      f(
        f(f(f(f())))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f()))))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
      f()
    )
  )
)
```

**JSON {"a":1}** — [complete symbol string](../verification/f-only-v1.5.7/json-record.f)

A format for conversion in both directions using tags and payloads. It is distinct from a direct number representation.

```text
f(
  f(f(f(f(f(f(f()))))))
  f(
    f(
      f(
        f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))
        f()
      )
      f(
        f(f(f(f())))
        f(
          f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f(f())))))))))))))))))))))))))))))))))))))))))))))))))
          f()
        )
      )
    )
    f()
  )
)
```

**General proofs of all 16 propositions** — [complete symbol string](../verification/f-only-v1.5.7/proof-nat-paths.f)

Every key and value of the source file verification/certificates/nat-and-paths.json. Nothing is omitted from the basic-symbol file.

The linked file contains the complete string (1200828 characters), without ellipses or abbreviations.

**All saved λ-calculus computation traces** — [complete symbol string](../verification/f-only-v1.5.7/proof-lambda.f)

Every key and value of the source file verification/certificates/lambda-examples-v8.0.1.json. Nothing is omitted from the basic-symbol file.

The linked file contains the complete string (5707770 characters), without ellipses or abbreviations.

**All saved application evidence** — [complete symbol string](../verification/f-only-v1.5.7/proof-applications.f)

Every key and value of the source file verification/certificates/application-examples-v1.5.7.json. Nothing is omitted from the basic-symbol file.

The linked file contains the complete string (2930577 characters), without ellipses or abbreviations.

**All saved F-arithmetic evidence** — [complete symbol string](../verification/f-only-v1.5.7/proof-field.f)

Every key and value of the source file verification/certificates/formal-field-examples-v1.5.7.json. Nothing is omitted from the basic-symbol file.

The linked file contains the complete string (745404 characters), without ellipses or abbreviations.

**All finite traces for the generative-label extensions** — [complete symbol string](../verification/f-only-v1.5.7/proof-generators.f)

Every key and value of the source file verification/certificates/generator-extensions-v1.5.7.json. Nothing is omitted from the basic-symbol file.

The linked file contains the complete string (6110439 characters), without ellipses or abbreviations.

**All register-computation and conditional-equational traces** — [complete symbol string](../verification/f-only-v1.5.7/proof-models.f)

Every key and value of the source file verification/certificates/model-extensions-v1.5.7.json. Nothing is omitted from the basic-symbol file.

The linked file contains the complete string (812238 characters), without ellipses or abbreviations.


### 11. Claims Refuted by Counterexamples and Unresolved Questions

The complete text in Part II retains the distinction between refuted claims and unresolved questions.


### 12. Principal Results and Proof Status

Distinguish syntax recovery, proof replay by the applicable checker, and the status of written general proofs.


### 13. Tasks for the Next Version

The complete text in Part II retains the remaining research tasks. A uniform notation does not resolve those tasks by itself.


## II. Complete English manuscript archive

Each file encodes the UTF-8 bytes of the corresponding text as a list of unary natural numbers, then uses the common f notation. Decode and concatenate the pieces in order to recover the entire English file, from its title and translation note through Appendix A, related work, and references after Chapter 13. This is reversible text storage, distinct from structural mathematical data and proof checking.

| Manuscript part | Complete f-only file |
|---|---|
| Title, reader introduction, and abstract | [paper-00.f](../verification/f-only-en-v1.5.7/paper-00.f) |
| Position and Explicit Minimal Assumptions | [paper-01.f](../verification/f-only-en-v1.5.7/paper-01.f) |
| The Base, Constructors, and Lambda Calculus | [paper-02.f](../verification/f-only-en-v1.5.7/paper-02.f) |
| Natural Numbers and a Commutative Semiring | [paper-03.f](../verification/f-only-en-v1.5.7/paper-03.f) |
| Signed Integers and a Commutative Ring | [paper-04.f](../verification/f-only-en-v1.5.7/paper-04.f) |
| Rational Numbers, Normalization, and an Ordered Field | [paper-05.f](../verification/f-only-en-v1.5.7/paper-05.f) |
| Introducing Relation Labels from Processes Approaching Rational Numbers | [paper-06.f](../verification/f-only-en-v1.5.7/paper-06.f) |
| The Linear Representation L of Relation Labels and Its Operations | [paper-07.f](../verification/f-only-en-v1.5.7/paper-07.f) |
| M-polynomials, Fε, and adjoining elements as needed | [paper-08.f](../verification/f-only-en-v1.5.7/paper-08.f) |
| Connecting the Constructions — Finite Traces and Responses to Precision Requests | [paper-09.f](../verification/f-only-en-v1.5.7/paper-09.f) |
| The Scope of Treating Proof as Processing | [paper-10.f](../verification/f-only-en-v1.5.7/paper-10.f) |
| Claims Refuted by Counterexamples and Unresolved Questions | [paper-11.f](../verification/f-only-en-v1.5.7/paper-11.f) |
| Principal Results and Proof Status | [paper-12.f](../verification/f-only-en-v1.5.7/paper-12.f) |
| Tasks for the Next Version, Appendix A, related work, and references | [paper-13.f](../verification/f-only-en-v1.5.7/paper-13.f) |

## III. Complete implementation-source archives

These shared files recover the original implementation sources. Existing comments and metadata are preserved. Source recovery does not turn JavaScript arithmetic into pure lambda reduction.

| Implementation | Complete f-only file |
|---|---|
| Rational arithmetic, generators, computation traces, and calculus | [program-applications.f](../verification/f-only-v1.5.7/program-applications.f) |
| Polynomial and F arithmetic | [program-formal-field.f](../verification/f-only-v1.5.7/program-formal-field.f) |
| Equational and induction proof checker | [program-equational-checker.f](../verification/f-only-v1.5.7/program-equational-checker.f) |
| Lambda kernel and computation-trace replay | [program-lambda-core.f](../verification/f-only-v1.5.7/program-lambda-core.f) |
| Interval-label extensions and finite-response checking | [program-generator-extensions.f](../verification/f-only-v1.5.7/program-generator-extensions.f) |
| Register machine and conditional equational proofs | [program-model-extensions.f](../verification/f-only-v1.5.7/program-model-extensions.f) |
| Structural examples, NatForm, fixed-type T products, G/H introductions, and finite decimal-interpretation checks | [program-concept-examples.f](../verification/f-only-v1.5.7/program-concept-examples.f) |

Validation: [file manifest](../verification/f-only-en-v1.5.7/manifest.json), [recovery and proof-replay report](../verification/f-only-en-v1.5.7/report.json).
