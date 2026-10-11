# The f-Generative System — A New Foundation of Mathematics

[日本語](README.md)

[Open the visualizer (after Pages is enabled)](https://o0o-yuta-kimura-o0o.github.io/my-math-paper-2026_1.5.x/) · [Download the standalone HTML](docs/f-generative-atlas-v1.5.8.4.html) · [GitHub Pages setup](PAGES.md)

The f-Generative Atlas v1.5.8.4 is bundled as a standalone static page. Publish the `docs` directory from `main` using GitHub Pages. The manuscript remains available in this repository.

This research develops Yuta Kimura's original concept: constructing numbers and operations through recursive finite syntax, and retaining computation traces and finite proof data that can be checked. The system states its formation and inference rules explicitly and does not adopt ZF or ZFC as internal axioms.

The current manuscript is **v1.5.8**, available in [English](manuscripts/A_New_Foundation_of_Mathematics_en_v1.5.8.md) and [Japanese](manuscripts/A_New_Foundation_of_Mathematics_ja_v1.5.8.md). The English edition translates the complete manuscript, preserving its numbering, definitions, proofs, qualifications, and references. It does not introduce a new mathematical revision.

Start with the [English appendix, “Following This Manuscript Using f Alone”](appendices/A_New_Foundation_of_Mathematics_en_v1.5.8_f_only.md). It follows the construction from natural numbers to generative quaternions and the finite-pair extension T, then to programs, propositions, and proof data. Its 303 structural examples use the same mathematical symbol files as the Japanese edition. A separate archive recovers the complete English manuscript from f-only strings; the seven implementation-source archives are shared. Archiving written proofs as text is distinguished from machine-checking those proofs.

The organizing principle is to add the numbers and operations needed using the same method of finite construction. M consists of finite polynomials with rational coefficients; Fε consists of their ratios with nonzero denominators and corresponds externally to Q(ε) with a positive infinitesimal. The finite-pair type T extends Fε by a positive element σ satisfying σ²=2, with exact arithmetic and an order preserving the embedded Fε. Interval-generating labels remain a separate type for responses to precision requests. The proposed new name for Fε containing the word “real” remains undecided. Completeness and representation of every ordinary real number are not requirements of the project.

Version 1.5.8 adds Appendix B comparing the construction with surreal numbers and constructing an exact representation of pi. It explains the practical benefits of finite descriptions, specified calculations, and checkable evidence, without claiming universal equality decision or greater expressive scope. Pi is constructed in a separate rational-cut type; equality and arithmetic of existing infinitesimal numbers are unchanged. Identification with ordinary pi is proved separately as a comparison using external real analysis.

Version 1.5.7 adds Appendix A on recurring-digit notation and Menger volume generation. The record `0._3` specifies recurring digits without selecting a label: exact rational evaluation, lower generation, and upper generation are distinguished. The rational number 1/3 remains exact. A specified geometric family H receives finite response contracts and an introduction rule; `0##` labels the Menger volume-generation procedure without asserting ordinary volume conservation laws. The revision clarifies intuitionistic reasoning, Church encoding, and related work. Banach–Tarski remains deferred at the author's request; the motivation and decisions are recorded in the [design notes (Japanese)](research/author-design-decisions-v1.5.8.md).

Version 1.5.6 introduces a common relation label `q##` from every standard generation record returning `q+b/(n+1)` with positive rational b, forgetting the magnitude of b at introduction. The record retains b for execution, while the target label retains its rational component and the number of # symbols. The recursion count n, relation-operator count k, and precision request p have different roles. Introduction does not preserve pointwise addition: label arithmetic gives `0## + 0## = 0####`, retaining nonzeroness and additive cancellation.

Approximation and bracketing procedures retain their finite computations and explicit guarantees. An error relative to q is not automatically an error relative to q##; rational-precision guarantees for `q## = q+2ε` are proved using the target order. Adding relation operators to interval endpoints alone does not construct an exact element common to every response. Extra error margins connect existing approximations of σ to σ+kε without identifying those exact elements.

Version 1.5.5 specifies the numerical type and operation rules before a calculation begins, keeping numerical inputs, intermediate values, and results in that type. NatForm provides a small example of checking whether a finite syntax tree has the form of a natural-number representation. It does not infer a unique type or decide whether arbitrary lambda terms terminate. Bisection, Newton’s method, and value-and-error responses illustrate optional approximation procedures with proved guarantees. A unified label combining a generator, exact operations, and a correspondence proof is not required of every number.

The manuscript also includes conditional minimality of Fε, evidence-bearing generative labels, separation from zero for reciprocals, alternating sums, Newton/bisection compatibility, conversion of sequences with error moduli into interval responses, basic calculus error estimates, categories described using arrows alone, and finite algebraic and register-machine traces. Section 12 states which results have written general proofs, which proof data are machine-checked, and which checks concern particular finite inputs. The general results for NatForm, T, and its connection to approximations have written proofs; checks of selected examples do not formalize those general proofs.

The [lambda interpreter v8.0.1](interpreter/lambda_interpreter_v8.0.1.html) runs offline in a browser. Its interface and supporting research notes remain in Japanese. Its 66 built-in lambda definitions include sign-and-magnitude integers and the unreduced rational representation QRep. QRep is distinct from canonical reduced Q; lambda gcd and reduction to lowest terms are not implemented. Both language editions share the executable interpreter and established proof-checking kernels.

Supporting material:

- [Translation checks and source hashes](verification/translation-en-v1.5.8.json)
- [English f-only recovery and proof replay](verification/f-only-en-v1.5.8/report.json)
- [Mathematical evidence report](verification/evidence-report.json)
- [Implementation test report](verification/verification-report.json)
- [Source audit (Japanese)](research/source-audit-v1.5.8.md)
- [Detailed applications (Japanese)](research/applications-v1.5.8.md)
- [Relation-label introduction and approximation (Japanese)](research/label-design-v1.5.8.md)
- [Detailed finite-pair extension T (Japanese)](research/extension-example-v1.5.8.md)
- [Verification instructions (Japanese)](verification/README.md)

Use Node.js 20 or later; no external packages are needed. From the repository root:

```sh
node scripts/check-english-translation.mjs --check
node scripts/generate-english-appendix.mjs --check
node scripts/verify.mjs
```

The first two commands check the English translation artifacts and appendix without writing them. To regenerate those artifacts after an authorized edit, omit `--check`, generate the appendix first, and then generate the translation report. The mathematical implementation's recorded 157 regression and rejection tests are separate from translation QA and from general mathematical proofs. Actual browser interaction remains unverified because the browser security policy blocked opening the local file; the interpreter core, trace replay, and UI-script syntax were checked as code.

The `output/` directory in the working project contains the latest release copies. Copy only the files listed in `MANIFEST.json`, plus the manifest itself, into a separate public checkout, retaining the existing directory layout. `MANIFEST.json` records the file hashes. Both v1.5.8 language editions are included; original source documents and earlier manuscripts remain in the working project. Keep previously published versions and their linked files at their original paths. Do not delete destination files merely because they are absent from `output/`, and do not copy private drafts or notes. No GitHub upload or publication is performed by creating these files.
