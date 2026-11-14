# Lambda Calculus Interpreter v8.0.1

[日本語](README.md)

A browser tool that computes untyped lambda-calculus expressions one step at a time by δ-expansion of definitions and β-reduction, and saves and re-verifies the record of the computation (the trace). It runs as a single HTML file and needs no external scripts, network connection, or installation.

## How to use

1. Save the multilingual file in the table below and open it in a browser. GitHub's file view shows the HTML source, so save the file first and then open it.
2. Enter an expression or choose one under "Example", then press "Evaluate and record".

| File | Interface language | Purpose |
|---|---|---|
| [lambda_interpreter_v8.0.1_multilingual.html](lambda_interpreter_v8.0.1_multilingual.html) | 11 languages (chosen at the top right of the screen) | The file for everyday use |
| [lambda_interpreter_v8.0.1.html](lambda_interpreter_v8.0.1.html) | Japanese | The reference file read by the checks that generate the evidence (`interpreter` in `release.json`) |

The computation core (`script#lambda-core`) of the two files is byte-identical. The computation, the trace format, and the version (`8.0.1`) are the same, so a trace saved by either file can be re-verified by the other. Only the interface differs.

## Interface language

The menu at the top right of the screen offers 日本語, English, 简体中文, 繁體中文, 한국어, Français, Deutsch, Español, Português, Italiano, and Русский. Choosing another language switches the whole screen, including the computation history shown so far.

At start-up, the language is chosen in this order:

1. The `lang` parameter of the URL (for example `lambda_interpreter_v8.0.1_multilingual.html?lang=fr`).
2. The language last chosen from the menu. It is saved in the browser's localStorage as `lambda-interpreter-language`. In browsers that do not allow this, the language is chosen from step 3 every time.
3. The browser's language settings. For example, `ja-JP` gives Japanese, `pt-BR` Portuguese, and `zh-TW` Traditional Chinese. If none of the listed languages is supported, the region of the setting is used (`ca-ES` gives Spanish).
4. Otherwise, English.

No location data, IP-address lookup, or network access is used. The browser's language settings normally match the user's region.

A saved trace (JSON) is the same whatever the interface language. Traces and records of errors before the start contain the core's error messages in the original Japanese; only the screen shows them in the chosen language. English messages in records saved by the English-interface edition of the interpreter are also shown in the chosen language.

## Scope

The interpreter handles the syntax of the untyped lambda calculus, leftmost-outermost processing that combines δ-expansion of definitions with β-reduction, and the re-verification of finite traces. To the 32 existing definitions for natural numbers, truth values, and pairs, it adds 34 definitions for integers and an auxiliary representation of unreduced fractions, for 66 built-in lambda definitions in all. In this version the numerals `0`–`4` are aliases of Church numerals.

An integer is a pair of a sign 0/1 and the magnitude as a natural number; the sign of zero is normalized to the positive side. `ZAdd`, `ZSub`, `ZMul`, and comparisons are implemented, and `ZFromDiff` and `ZToDiff` make explicit the correspondence with the earlier representation as a difference of two natural numbers.

The auxiliary rational representation QRep is a pair of two integers whose denominator is positive and nonzero; unreduced fractions are allowed. `QRepAdd`, `QRepSub`, `QRepMul`, and comparisons are provided. `QMake`, `QRepInv`, and `QRepDiv` return `ResultOk` or `ResultErr`, so do not project their results as bare fractions. The failure value for a zero denominator and the rational number zero are different data.

These are lambda definitions for inputs of the specified types; they do not determine the type of an arbitrary lambda term. The rational numbers Q of the paper are in reduced normal form and are distinguished from QRep. The HTML does not include gcd or reduction to lowest terms in lambda terms, all the operations on M, Fε, and interval-generating labels, or checks of inductive general proofs or convergence proofs. No separate implementation of Fε or intervals is hidden inside the β-rule. [Lambda arithmetic and its connection to the paper](../research/lambda-arithmetic-v1.5.9.md) (in Japanese) gives the specification and the handwritten correspondence proofs.

The built-in examples include `ZAdd ZTwo ZMinusOne`, `QRepAdd QHalf QHalf`, and `QRepInv QZero`. The second returns the unreduced 4/4 and the third an explicit failure value. In general Church arithmetic the number of conversions grows even for small inputs, so termination within the limit is distinguished from a mathematical reason for termination.

The syntax is `x`, `λx.M`, `M N`, and parentheses. `\` is an alternative notation for `λ`. A variable name begins with a letter or `_` followed by letters, digits, or `_`, or consists of digits only. Application is left-associative, and the body of a λ extends as far right as possible. A λ inside an application is enclosed in parentheses. `//` starts a line comment. `#` and `♭` are not implemented and are rejected.

An additional definition is written `Name = term;`. At the start of each run, all definitions are fixed as a snapshot, and the free variables of a definition are kept apart from the binders at the place of use. Built-in names can be overridden, and the overriding definitions are also recorded in the trace. Named cyclic definitions referred to from the input are rejected by a check before evaluation; references in branches that are never used later are also checked. Recursion can be written explicitly as a finite lambda term such as a fixed-point combinator. Undefined names remain free variables.

## Traces

Each trace keeps the original input, the list of definitions, the initial term, the version and strategy, the rule, position, and terms before and after each step, the final term, the step limit, and the terminal status. The strategy of v8.0.1 is named `leftmost-outermost-interleaved`. It chooses the leftmost-outermost position for δ and β together, so a β-reduction at the root is performed before a definition expansion inside an argument. This reduces the cases in which expanding unused branches in advance makes terms grow.

`expandedStart` is the term at the first point where no name from the definition table remains in the term. If that point is not reached, it is null; under the new strategy, β-reductions also appear before it. Traces of the earlier v8.0.0 with strategy `leftmost-outermost` are re-checked with the earlier strategy, which expands all definitions first. Records with a mismatched version and strategy are rejected.

Manual stop `stopped`, the limit `step-limit`, normal form `normal-form`, and run-time error `error` are different statuses. The limit counts δ and β together. `ResultErr` of QRep is a mathematical failure value computed normally as a lambda term; it is not the same as the run-time `error`.

"Save all history as JSON" and "Load and verify JSON" take traces out and back in. A trace being loaded must pass the check of each step. A history is not a cryptographic signature but a self-contained record for verifying the input, definitions, and conversions. There is no authentication that distinguishes a trace made by the original author from another correct trace rebuilt consistently from the input and definitions.

Internally, terms represent binding with de Bruijn indices. Variable names are renamed for readability when printed, so they may differ from the bound names that were entered. Free-variable names are kept. The evaluator performs β-reduction by shifting and substituting indices, while the re-verifier checks each β step by a separate procedure that removes the binder directly. The parsing, term structure, α-equivalence, and position operations that both share remain part of the trusted base. Independent re-verification does not mean a formal proof that this implementation itself is correct.

For a trace that records a manual stop or an external error, the finite prefix of the history is verified. The trace alone does not prove that the stop or the external error really happened. A failure before the start, such as a syntax error, has no conversion trace, but its input and error are saved in the `failures` field of the JSON. This field is not certified as a proof trace. Distinguish a finite history that can be verified from a general theorem that holds for arbitrary arguments.

## Verification

At the root of the repository, run the following with Node.js 20 or later.

```sh
node verification/interpreter-tests.mjs
node verification/lambda-arithmetic-tests.mjs
node verification/interpreter-multilingual-tests.mjs
```

The first two load `script#lambda-core` of the reference file named in `release.json` without a DOM and check it. The public API is `globalThis.LambdaCore`, which provides `parse`, `print`, `alphaEqual`, `freeVariables`, `createEnvironment`, `parseDefinitions`, `splitExpressions`, `evaluate`, `verifyTrace`, `decodeNat`, `VERSION`, `SCHEMA`, `LIMITS`, and `BUILTINS`.

`evaluate(source, { definitions, maxSteps, onStep, signal })` asynchronously returns `{ status, term, trace }` or error information. `definitions` takes an array of `{name, source}`. If it is omitted, the built-in definitions are used; with `[]`, only pure lambda terms are evaluated. `verifyTrace(trace)` returns `{valid, ...}`.

The third checks the multilingual edition:

- the computation core is byte-identical to the reference file;
- the Japanese screen text, and the display and the saved JSON produced by computing, stopping, errors, saving, loading, re-verifying, and clearing, are the same as those of the reference file;
- the messages of the 11 languages have the same keys, the same placeholders (such as `{count}`), and the same HTML tags;
- every Japanese message of the core is translated into each language, no Japanese text remains on the screen in the other languages, and in every language the saved JSON is the same as that of the reference file;
- the choice of the language at start-up, and the memory of the language chosen from the menu.

For the interface language, the multilingual edition adds `globalThis.LambdaI18n` (the list of languages, the messages, and the choice of the language). The screen of the multilingual edition was checked in a browser (Chromium), served from a local server ([record](../verification/interpreter-multilingual-browser-review.json)); opening the file directly was not checked in a browser.

The input is limited to 100,000 characters, terms to 50,000 nodes and depth 512, and runs to 100,000 conversions. All intermediate terms are saved, so large computations use memory. A stop is processed at a boundary between conversions. The interface may briefly respond slowly while it re-verifies many records.

The latest results and the scope of the proofs are described in the [verification notes](../verification/README.md) (in Japanese).

## License

The programs are under the MIT License ([LICENSE](../LICENSE)). The full license text is also at the top of the multilingual file. This README and the other documents are under CC BY 4.0 ([license notes of the repository](../README.en.md#license)).
