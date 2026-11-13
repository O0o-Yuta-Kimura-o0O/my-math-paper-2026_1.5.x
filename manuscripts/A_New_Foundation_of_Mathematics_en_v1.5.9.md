# The f-Generative System — Numbers and Operations through Recursive Construction and Finite Computation Traces
## A New Foundation of Mathematics — Integrated Research Manuscript v1.5.9

**Author and original concept**: Yuta Kimura  
**Organization, rigor review, and implementation assistance**: Codex  
**Revision and editing**: Claude  
**Japanese version date**: November 13, 2026  
**English translation date**: November 13, 2026  
**Proof status**: Definitions and hand-written proofs are given in the main text. The scope of machine checks and execution checks is shown in Section 12.

*English translation of the [Japanese v1.5.9 manuscript](A_New_Foundation_of_Mathematics_ja_v1.5.9.md). Section and theorem numbering, mathematical content, and proof status are retained. The English appendix archives this English text; the mathematical data and computation traces are shared with the Japanese edition. Linked supporting research notes remain in Japanese unless otherwise indicated.*

### To the reader

The constructions of this manuscript can be followed in the [appendix “Following This Manuscript Using f Alone”](../appendices/A_New_Foundation_of_Mathematics_en_v1.5.9_f_only.md) as nestings of the same `f(...)`. Natural numbers, integers, rational numbers, M-polynomials, Fε, generative complex numbers, generative quaternions, the type T, and beyond them operations, programs, propositions, and finite evidence are all repetitions of small constructions. For example, the integer two is written in the main text as “a pair of a sign and a natural number,” and in the appendix it becomes `f(f()f(f(f())))`.

The main text explains these constructions, operations, and evidence one step at a time. The names of numbers, the pairs, and the formulas used in the main text are abbreviations for readability; in the appendix they return to nestings of f. The rules for reading are collected in §2.6.

### Abstract

This manuscript presents a method that successively adds numbers and operations through finite recursive construction and uses finite symbolic processing and its checkable records as evidence. It does not take ZF or ZFC as internal axioms; instead, it states explicitly the formation rules for finite syntax and the rules of equational reasoning and structural induction. Reasoning follows intuitionistic conventions.

We construct the commutative semiring of natural numbers, the commutative ring of integers with normalized zero, and the ordered field of rational numbers, and prove their basic laws and the correspondences between the constructions. From the generation record of a procedure $q+b/(n+1)$ ($b>0$) approaching a rational number $q$ from above, we introduce, by the introduction map $\Phi$, a common relation label `q##` that does not depend on the coefficient $b$. The introduction map does not preserve addition of outputs at the same recursion count. This makes three things compatible: discarding the differences between coefficients, the nonzeroness of `0##`, and additive cancellation. When the linear representation L of relation labels is embedded into finite polynomials with rational coefficients (M-polynomials), `q##` becomes $q+2\varepsilon$, and fractions of M-polynomials give the finite rational-expression numbers Fε. Fε is an ordered field with a positive infinitesimal ε, and it is not complete. If there are maps into an ordered field that preserve the rational operations and the addition and order of L, then the part that can be built from the image of L by the four arithmetic operations is isomorphic to Fε (Theorem 8.8).

Elements that are needed are added by specifying a type. Since Fε has no positive element σ whose square is two, σ is constructed in the ordered field T formed from finite pairs of elements of Fε. The type is fixed before a calculation, and it is neither inferred nor promoted during the calculation. Generative complex numbers and generative quaternions with coefficients in Fε, the category of computation traces, interval-generating labels that respond to precision requests with rational intervals, alternating sums, and differentiation and formal integration of polynomials are treated by the same method. Exact operations and approximation when needed are connected by error guarantees.

Proofs are treated as finite data. Numerical data, programs, propositions, and proof trees are reversibly encoded into a common syntax consisting only of f and parentheses. We checked 16 propositions about natural numbers and finite lists with the equational proof checker, and checked 25 theorems ported to Lean 4, Rocq, and Agda without additional axioms. We also show the correspondence between the integer and fraction operations of lambda calculus and the operations of Sections 4 and 5 (Propositions 10.1 and 10.2), and the conditions for carrying computation traces between computation models (Proposition 10.3). The value of an operation defined by recursive rules in which the size decreases at every call is the same in every computation model that computes it according to the rules (Theorem 10.4, Corollary 10.5).

The differences from conventional mathematics (including a counterexample to completeness), the gains and losses of not using the axiom of choice, and what is not claimed are collected in Section 11, and open problems in Section 13. Appendix A treats records of recurring decimals and their evaluation, the geometric family H and the introduction map Ψ, and the volume generation and the rational cut for the dimension of the Menger sponge. The value of a decimal is determined by its construction; under the convention that a decimal written with an ellipsis abbreviates the construction that adds digits, $0.999\ldots=1-2\varepsilon\ne1$ (Theorem A.3). If one instead decides that it is another way of writing a fraction, the value is $1/1$. Appendix B treats a comparison with surreal numbers and an exact construction of pi as a rational cut.

## 1. Position and Explicit Minimal Assumptions

### 1.1 The original proposal, motivation, and policies

The core of the author's original proposal lies in giving rules of generation and making the required operations executable, rather than supplying numbers in advance as completed infinite objects. This manuscript inherits from the original proposal the progression through natural numbers, integers, and rational numbers, and the idea of representing recursive procedures themselves by symbols. We do not, however, assume that the formulas in the original sources are consistent as written. The filenames and versions of the original sources are identified in the [SHA-256 source manifest](../research/source-manifest-v1.5.9.json). Their provenance, established counterexamples, and unresolved design questions are recorded in the [source audit](../research/source-audit-v1.5.9.md), and the author's design policies and deferred questions in the [design-decision record](../research/author-design-decisions-v1.5.9.md).

Three concerns motivate this research: unease about existence claims that depend on the axiom of choice, the difficulty of seeing the procedure of an operation that continues without end, and the appearance of counterintuitive conclusions when infinity is involved. This manuscript therefore emphasizes that, when an object is used, its representation, the procedure to be executed, and the grounds for accepting the result can be followed concretely. This is a motivation for choosing a way of constructing; it does not show that existing theories are inconsistent or that their theorems are wrong. The differences from conventional mathematics, the gains and losses of not using the axiom of choice, and what this manuscript does not claim are collected in Section 11.

The policies of this manuscript are the following three.

1. **Finite construction.** Every object is built by assembling finitely many symbols according to finite rules. An operation that continues without end is not treated as completed; it is held as a finite rule that specifies it.
2. **Calculation with specified types.** Before a calculation, the permitted representations, how to read them, equality, and the rules of operation are specified as a type. Types are neither inferred nor changed automatically during a calculation (§2.7).
3. **Checkable evidence.** Each individual calculation keeps a record of every step in a form that can be rechecked, and general theorems are given finite proofs (§1.3, Section 10).

### 1.2 Finite syntax and induction rules

The following are explicit assumptions of this manuscript.

1. Finitely many symbols can be arranged, and syntax can be identified as a finite tree.
2. Substitution, comparison, and concatenation can be performed on finite syntax.
3. For data formed with specified constructors, case analysis by the shape of the construction and structural induction are used.
4. Inferences are recorded as applications of finitely many rules.

“For every natural number” is read as meaning that the same proof rules can be applied to any finitely constructed natural number. It does not mean that infinitely many instances have been evaluated to completion. Induction is a rule of this inference system, not a property obtained without assumptions merely because there is a single function symbol.

The notations $\mathsf N,\mathsf Z,\mathsf Q$, and so on name permitted finite representations and their operations. Pair notation denotes a constructor holding two pieces of data. The following are not placed among the internal assumptions:

- The axioms of ZF or ZFC set theory (the axiom of choice is included in ZFC and not in ZF)
- Fixing an existing arithmetic theory, such as Peano arithmetic, as a background theory required for accepting proofs
- Completed infinite objects, such as the totality of real numbers or the totality of natural numbers

Instead, we use the formation, operation, equality, and induction rules that this manuscript itself lists. Terms such as “field,” “category,” and “finite intersection” are shorthand for the corresponding operations and laws. For example, a finite intersection of intervals is a rational computation that finds a finite maximum of lower endpoints and a finite minimum of upper endpoints. A translation into the language of sets is used for external comparison, but it is not a prerequisite for the internal definitions.

The text distinguishes the language used to explain a construction from the symbol strings of the numbers being constructed. Type names, variable names, equality signs, logical symbols, and the symbols of formation rules are explanatory notation for following definitions and proofs; they are not primitive symbols added to numerical data. For example, $\Gamma\vdash P$ expresses the judgment that $P$ is derived from the specified assumptions $\Gamma$ by the specified rules. When propositions and proofs are stored, these too can be encoded as the finite syntax trees of §2.6.

Logical explanations use **intuitionistic natural deduction, explicitly stated equational reasoning, and structural induction**. Read the introduction and use of logical connectives and quantifiers according to the following conventions. A type $A$ is taken to have the representations and formation conditions already specified at that point.

| Notation | Convention for introduction and use |
|---|---|
| $P\land Q$ | Introduce it from proofs of both; the proof of each component can be extracted from it |
| $P\lor Q$ | Introduce it from a proof of a specified side. To use it, show that the two derivations assuming the respective sides give the same conclusion |
| $P\to Q$ | Derive $Q$ under the assumption $P$ and discharge that assumption to introduce it. A proof of $P$ then yields $Q$ |
| $\forall x:A.\,P(x)$ | Introduce it by a proof for an arbitrary $x$ that does not occur free in undischarged assumptions; it can be applied to a specified term of $A$ |
| $\exists x:A.\,P(x)$ | Introduce it by giving a concrete term of $A$ and a proof about that term. When it is used, the provisional witness must not remain free in the resulting conclusion or in external assumptions |
| $\bot$ | Expresses contradiction. Any proposition can be derived under assumptions from which a contradiction has been derived |

Read negation as $\neg P:=P\to\bot$. Excluded middle $P\lor\neg P$ and double-negation elimination $\neg\neg P\to P$ for arbitrary propositions are not added as general axioms. For an existence claim, we show a construction of a witness that depends on the assumptions. For a universal claim, we give a derivation applicable to any permitted input. The standard connection between natural deduction and lambda calculus is described in [Selinger's lecture notes, Section 6](https://arxiv.org/html/0804.3434v2).

For a property given with a terminating decision procedure and its correctness, case analysis on the result of the decision is used. In rational comparison, for example, a finite calculation determines which of smaller, equal, or larger holds. The same goes for identity of finite syntax. Where later order proofs exclude an unsuitable case by contradiction, they rely on such decidable comparisons. Assuming $P$, deriving a contradiction, and thereby showing $\neg P$ is permitted by the definition of negation. This case analysis is not extended to a rule deciding the termination of arbitrary generators or the response compatibility of interval-generating labels (§9.2).

These conventions specify the logic used in the proofs of the text. The equational proof checker of §10.2 checks the equality and induction parts of it, not the whole of natural deduction. Nor are arbitrary terms of the untyped lambda calculus or computation histories accepted unconditionally as proofs of propositions. Even if recursion through Y can be written in the execution language, that alone does not guarantee termination or the validity of a proof (§2.5).

### 1.3 Distinguishing the kinds of results

This manuscript distinguishes the status of results as follows.

| Category | Meaning |
|---|---|
| Definition | The representation and rules have been given |
| Hand-written proof | A proof whose reasoning is written in the text |
| Machine check | For a general proposition, finite proof data accepted by this manuscript's checkers (§10.2, §10.5), or a proof accepted by the proof assistants Lean 4, Rocq, and Agda (§10.7) |
| Execution check | Confirmed by running a program on selected inputs |
| External comparison | A proof using the definitions and known results of the theory compared with (ordinary analysis, surreal numbers, and so on). It is not made a prerequisite of the internal constructions |

A successful execution check is evidence concerning its input. A general theorem requires a proof that handles variables, assumptions, and induction steps. Turning that proof into finite data and giving it to a checker also falls within the original proposal's policy of “taking the history of a process as a proof.” The status of each result is given in Section 12.

### 1.4 Adopted terminology and the relationship to ordinary real numbers

We call the overall system of this manuscript the **f-generative system**. The name expresses the policy of describing constructions through a common nesting of f and stating explicitly the rules for reading those descriptions, the operations, and the rules for checking proofs. The main names are as follows.

| Subject | Name | Defined in |
|---|---|---|
| The overall system | f-generative system | Sections 1–2 |
| Natural numbers, integers, rational numbers | Conventional names (types $\mathsf N,\mathsf Z,\mathsf Q$) | Sections 3–5 |
| Pairs of a rational component and a relation-operator count | Linear representation $\mathsf L$ of relation labels | Sections 6–7 |
| Finite polynomials with rational coefficients | M-polynomials $\mathsf M$ | §8.1 |
| Fractions of M-polynomials with nonzero denominators | Finite rational-expression numbers $\mathsf F_\varepsilon$ | §8.2–8.6 |
| A representation by pairs of elements of $\mathsf F_\varepsilon$ that adds an element whose square is two | Type T | §8.10 |
| Complex numbers with coefficients in $\mathsf F_\varepsilon$ | Generative complex numbers $\mathsf C_\varepsilon$ | §8.7 |
| Pairs of generative complex numbers | Generative quaternions $\mathsf H_\varepsilon$ | §8.8 |
| A finite description collecting a generation rule and the necessary information | Generative label | Section 6, §9.2 |
| A generative label returning a term of a sequence at a specified stage | Sequence-generating label | Section 6 |
| A generative label returning a guaranteed rational interval at a specified precision | Interval-generating label | §9.2–9.4 |
| A finite history recording the rules, positions, and states needed for checking | Computation trace | §9.1, Section 10 |
| Finite descriptions of predicates specifying the rationals below and above, with stated formation conditions | Rational-cut description $\mathsf{Cut}_{\mathsf Q}$ | Appendix B |

Fε is not the same as the ordinary real numbers $\mathbb R$. In standard external notation it corresponds to the rational function field $\mathbb Q(\varepsilon)$; in the order of this manuscript it has a positive infinitesimal $\varepsilon$, that is, a positive element smaller than every positive rational number. Fε cannot be regarded as a part of $\mathbb R$ while this order is preserved. Fε has no element whose square is two (Proposition 8.5), but §8.10 constructs such an element as the element σ of the type T formed from finite pairs of elements of Fε. The relationship between exact operations on expressions containing σ and approximation responses is shown in §9.10. The symbol √2 is used as an abbreviation for the positive element σ and is not added as a primitive operation.

The statement that the representations of this manuscript are countable is a metalevel description obtained by enumerating and comparing finite symbol strings from the outside. We do not assume that finite programs can represent all ordinary real numbers, and attaining completeness is not a goal either (that completeness fails in Fε is Proposition 11.1). The required representations, operations, and guarantees are added individually.

A generative label is not merely a name but a finite description through which the generation rule and parameters can be traced (§6.4). A relation label is a different thing. We call # and ♭ relation operators, and we call a relation label the pair $(k,q)$ of an integer $k$ and a rational number $q$, written as $q$ with $k$ copies of # attached (or $-k$ copies of ♭ if $k<0$) (Section 6, §7.1). Applying an introduction map to a generation record (a finite record holding a program and its arguments) of a procedure approaching a rational number $q$ from above yields the relation label `q##`, that is, $(2,q)$. As introduction maps, we use $\Phi$ of §6.3 for the standard family $G$, and $\Psi$ for the geometric family $H$ of Appendix A. A relation label has neither the coefficient of approach $b$ nor the execution history as a component. Differences between positive values of $b$ are discarded at introduction, but the relation-operator counts and polynomial coefficients produced by label operations are retained.

### 1.5 Adding the constructions we need and choosing a type before calculating

Numbers and operations are constructed successively through finite representations and processing rules. When a new number or operation is added, we give its representation, equality, operations, correspondences with existing constructions, and evidence guaranteeing them. Both the progression from natural numbers to integers and rational numbers and the adjoining of an element whose square is two follow the same procedure.

| Relation or procedure to be handled | Representation to prepare |
|---|---|
| Iteration, addition, and multiplication of natural numbers | A base and a one-step construction |
| A value satisfying $x+1=0$, with its addition and subtraction | Integers represented by sign and magnitude |
| A value satisfying $2x=1$, with division by nonzero denominators | Rational numbers represented by pairs of integers |
| Labeling procedures approaching $q$ from above, and adding and subtracting relation operators | `q##`, introduced by discarding differences in $b$, and $\mathsf L$, retaining the relation-operator count |
| The four arithmetic operations on expressions containing $\varepsilon$ | M-polynomials $\mathsf M$ and their fractions $\mathsf F_\varepsilon$ with nonzero denominators |
| The four arithmetic operations with a positive element satisfying $x^2=2$ | Type T formed from pairs of elements of $\mathsf F_\varepsilon$ |
| An element satisfying $x^2=-1$ | Generative complex numbers $\mathsf C_\varepsilon$ formed from pairs of elements of $\mathsf F_\varepsilon$ |
| An exact specification of pi | Rational-cut descriptions $\mathsf{Cut}_{\mathsf Q}$, which determine the rationals below and above |

The dependencies among the constructions are as follows. An arrow means that what is on the left is used to make what is on the right.

```text
N → Z → Q → M → Fε → T
Fε → Cε → Hε
Q → generation records G, H → introduction Φ, Ψ → L
Q → interval-generating labels → rational-cut description (pi)
```

L is a separate type made from Q, and it is carried into M by the embedding $(k,a)\mapsto a+k\varepsilon$. Under this embedding, `q##` becomes $q+2\varepsilon$.

We do not assume that the way of extending is uniquely determined. We specify the required operations and the properties to be preserved, and choose a construction that meets those conditions. For example, we do not require generative complex numbers to have the properties of an ordered field, nor generative quaternions to have commutative multiplication. Exponential, logarithmic, and trigonometric functions and the like are constructed by the same procedure when a use for them arises. The goal is not to supply a catalogue of functions as standard equipment but to give the necessary operations and evidence for the constructions actually presented. We distinguish introducing a new symbol, creating a finite representation, and proving that the operations hold.

When an approximate value is needed, we use a procedure with a specified precision request and output type. Bisection, Newton's method, and alternating sums are examples (Section 9). The specification of types and a small check of formation conditions are described in §2.7–2.8.

## 2. The Base, Constructors, and Lambda Calculus

### 2.1 Representing natural numbers and reading f()

Let $z$ be a base symbol and $S$ a constructor that advances one step. Natural-number representations are formed using only

$$
z:\mathsf N,\qquad
\frac{n:\mathsf N}{S(n):\mathsf N}
$$

No other forms are included among the natural-number representations. $z$ is zero and $S(z)$ is one, abbreviated as $0:=z$ and $1:=S(z)$. The identity $S(m)\equiv S(n)$ implies $m\equiv n$, and $z$ and $S(n)$ are distinct syntax. The correspondence with the notation of the original proposal is

$$
f()\ \leftrightarrow\ z,\qquad f(t)\ \leftrightarrow\ S(t)
$$

$f()$ is not the result of executing an undefined function; it is a single form, the base. If we speak of “the number of function applications,” then in the case of zero the f inside `f()` is also counted, and the count is off by one. We therefore take the number of unary constructors outside the base `f()` as the number of applications, and in formal expressions we separate $z$ from $S$.

This `f()` and its outer iterations form a chain of construction by base and successor. For a representation executable in lambda calculus, we use the **Church numerals** of the next section. A Church numeral is a lambda term that repeats a specified operation a specified number of times. The syntax of the two is distinguished, and the next section shows the encoding and its correspondence with the operations.

### 2.2 The lambda language and Church representations

The core of the execution language consists of variables, application, and abstraction.

$$
t ::= x\mid (t\,t)\mid \lambda x.t.
$$

Application is left-associative, and the body of a λ extends as far to the right as possible. We admit $\alpha$-equivalence, which renames bound variables, and perform substitution without capturing free variables. The sole computation rule is

$$
(\lambda x.t)\,u\longrightarrow_\beta t[x:=u]
$$

which may also be applied to subexpressions of a term. The notation $\to_\beta^*$ denotes zero or more β-reductions, and a term with no subexpression that can be β-reduced is called a normal form. Terms that can be carried into each other by a finite conversion using β-reduction, its reverse, and $\alpha$-equivalence are said to be β-equivalent, written $=_\beta$. A standard account of this syntax, capture-avoiding substitution, and the distinction between β-reduction and β-equivalence is given in Section 2 of Selinger's lecture notes. This manuscript refers to its syntactic part and does not import the set-theoretic semantics treated there as internal axioms. [Selinger, *Lecture Notes on the Lambda Calculus*](https://arxiv.org/html/0804.3434v2)

Define an encoding $C$ of natural numbers by

$$
C(z)=\lambda s.\lambda x.x,\qquad
C(Sn)=\lambda s.\lambda x.s(C(n)\,s\,x).
$$

This is an encoding into Church numerals, and its normal form is $\lambda s.\lambda x.s^n x$. The expression $s^n x$ is an explanatory abbreviation for $n$ applications of $s$. For example, the constructor representation $S(Sz)$ of two corresponds to $\lambda s.\lambda x.s(sx)$. These numerals are the existing Church numerals. [Selinger, §3.2](https://arxiv.org/html/0804.3434v2)

The term $C(n)\,S\,z$ reduces in finitely many steps to the syntax that applies $S$ as many times as were used to construct $n$. This can be shown by structural induction on $n$. The base gives $z$; in the successor case, one $S$ is added to the result given by the induction hypothesis.

Examples of executable basic definitions follow (`\` denotes λ). That these numerical representations correspond to the constructor representations of Section 3 is a different matter from an arbitrary lambda term representing a number.

~~~lambda
Zero = \s.\x.x;
Succ = \n.\s.\x.s (n s x);
Add = \m.\n.\s.\x.m s (n s x);
Mul = \m.\n.\s.\x.m (n s) x;
True = \t.\f.t;
False = \t.\f.f;
Pair = \a.\b.\k.k a b;
Fst = \p.p (\a.\b.a);
Snd = \p.p (\a.\b.b);
~~~

**Proposition 2.1 (Correspondence of operations on encoded numbers)** For constructor representations $m,n$, the Church operations above satisfy
$\mathrm{Add}\,C(m)\,C(n)=_\beta C(m+n)$ and
$\mathrm{Mul}\,C(m)\,C(n)=_\beta C(mn)$.

**Proof.** Set $s^0x:=x,\ s^{S(n)}x:=s(s^nx)$. Structural induction gives $C(n)\,s\,x\to_\beta^*s^nx$. Further, $s^m(s^nx)=s^{m+n}x$ follows by structural induction on $m$ and the laws of addition in Section 3. Hence the body of Add reduces to $s^{m+n}x$. The body of Mul repeats $m$ times an operation that iterates $n$ times, so by induction on $m$ and the distributive law it reduces to $s^{mn}x$. After the bound names are aligned, both are the normal forms of $C(m+n),C(mn)$. The laws of constructor arithmetic referred to here come from the proofs of Section 3, which do not depend on the lambda encoding, so there is no circularity. □

This proposition connects the constructor arithmetic machine-checked in Section 10 with the Church operations. Its proof is hand-written. Moreover, this proposition is a claim about numbers obtained by encoding constructor representations; between lambda terms containing variables $m,n$, commutativity of addition does not appear directly through β-reduction alone.

### 2.3 Type-formation conditions

The types of this manuscript are not automatically assigned to every term of the untyped lambda language. We first specify the following data-formation conditions and then encode the data into lambda terms.

| Data type | Permitted finite representations |
|---|---|
| $\mathsf N$ | $z$, or $S(n)$ for an already formed $n$ |
| $\mathsf Z$ | A pair of a sign and a natural number. If the magnitude is zero, the sign is normalized to the positive side |
| $\mathsf Q$ | A pair of two integers. The denominator has positive sign and nonzero magnitude. Fractions are reduced, and zero is $0/1$ |
| $\mathsf{QRep}$ (auxiliary type) | A pair of two integers. The denominator is positive and nonzero. Unreduced representations are also allowed. Normalization carries it to $\mathsf Q$ (§10.4) |
| $\mathsf L$ | The linear representation $(k,a)$ of relation labels, $k:\mathsf Z,\ a:\mathsf Q$. Here $k$ is not a recursion count but a signed relation-operator count |
| $\mathsf M$ (M-polynomials) | Finite polynomials with rational coefficients, given as coefficient lists in ascending degree order with the zero coefficients on the highest-degree side removed. Zero is the empty list |
| $\mathsf F_\varepsilon$ (finite rational-expression numbers) | $(p,q)$, $p,q:\mathsf M,\ q\ne0$. Normalized in Section 8 |
| $\mathsf T$ | $(a,b)$, $a,b:\mathsf F_\varepsilon$. Read as $a+b\sigma$, with operations corresponding to $\sigma^2=2$ (§8.10) |
| $\mathsf C_\varepsilon$ (generative complex numbers) | $((a,-b),(b,a))$, $a,b:\mathsf F_\varepsilon$. The matrix-layout condition is imposed |
| $\mathsf H_\varepsilon$ (generative quaternions) | $(z,w)$, $z,w:\mathsf C_\varepsilon$. The multiplication involving conjugation of §8.8 is used |
| Generative labels | A sequence-generating label takes a natural-number stage as input, and an interval-generating label takes a precision request. Each holds a program returning a finite output of the specified type and comes with evidence of termination for each request and of the type-specific guarantees |

Testing an integer or a rational number for zero is different from testing whether a lambda term is in normal form. A term of the wrong type, a zero denominator, or an expression containing free variables without a specification must not be adopted as the result of a numerical operation.

### 2.4 Kinds of equality and their evidence

| Notation | Meaning | Evidence |
|---|---|---|
| $\equiv$ | Identity of finite syntax | Comparison of syntax trees |
| $\equiv_\alpha$ | Difference only in bound names | Comparison by a correspondence preserving binding positions |
| $\longrightarrow_\beta$ | One capture-avoiding β-reduction | Reduction position, original term, and result |
| $=_\beta$ | Finite convertibility by β-reduction, its reverse, and $\alpha$-equivalence | A finite conversion sequence |
| $=_A$ | Equality in a specified data type $A$ | A normalization theorem and comparison of normal representations, or a specified equational proof |
| $\Gamma\vdash P$ | Derivation of the proposition $P$ from the assumptions $\Gamma$ | A finite proof tree using the specified inference rules |

For example, the two zero representations of integers are not the same syntax as they stand, but they agree after normalization. The fractions $1/2$ and $2/4$ also differ as unnormalized pairs.

Likewise, two generation records that introduce the same relation label in Section 6 need not have the same program, the same outputs at the same recursion count, or the same execution history. Equality in L, the target of introduction, is not to be confused with equality of generation records. When the congruence rule is used, fix which type's equality and which type's operations are being used.

The inference rules include reflexivity, symmetry, transitivity, congruence, substitution into already proved equations, and the use of assumptions. The induction rule for natural numbers is

$$
\frac{\Gamma\vdash P(z)\qquad
      \Gamma,n:\mathsf N,P(n)\vdash P(Sn)}
     {\Gamma\vdash \forall n:\mathsf N.\ P(n)}
$$

The induction variable $n$ must not occur free in the fixed external assumptions, and the induction hypothesis is used only within the corresponding step. For finite lists, an analogous rule for the empty list and adjoining a head is used.

That a checker has accepted a proof is evidence that the finite proof follows the adopted rules. It does not guarantee the validity of the rules themselves, the checker's implementation, or the execution environment. The equational proof checker of §10.2 does not search for proofs; it confirms each rewriting and induction step recorded in the proof data. The checkers for exact arithmetic and for generative labels partly share implementations of rational arithmetic and of rules with the generating side, so their acceptance is not verification by an independent implementation (§10.3).

### 2.5 Recursion and termination

We use the following term to express general recursion:

$$
Y=\lambda f.(\lambda x.f(xx))(\lambda x.f(xx))
$$

Choose $x$ as a name not among the free variables of $F$, and set $A:=\lambda x.F(xx)$. Then

$$
YF\longrightarrow_\beta AA\longrightarrow_\beta F(AA),
\qquad F(YF)\longrightarrow_\beta F(AA).
$$

This common reduct establishes $YF=_\beta F(YF)$. A conversion going from $AA$ to $YF$ must not be called a single β-reduction. Moreover, $YF$ need not have a normal form.

In lambda calculus, terms that do not terminate can also be written. For example, $(\lambda x.x\,x)(\lambda x.x\,x)$ returns to itself after one β-reduction. This manuscript therefore shows, every time, the grounds on which a recursion stops. The grounds are a natural-number size that decreases at every call. In recursion on natural numbers, the number of constructors of the argument decreases by one; in the computation of quotients and remainders (§5.1) the dividend becomes smaller, in gcd the nonnegative remainder becomes smaller, and in polynomial division the degree becomes smaller. A stop button, a time limit, or a step limit is an operational interruption, neither a proof of divergence nor normal termination. A generative label that returns responses is separately subject to the contract “terminates for each finite request.”

### 2.6 Common concept symbol strings and their decoding

Besides numerical values, programs and finite proofs are held using the same basic symbols. We first define, as an intermediate notation for reading the main text, a finite syntax consisting of a base, a unary construction, and a pair.

```text
P ::= f() | f(P) | (P,P)
```

P, `::=`, and `|` are metasymbols explaining formation rules, not characters in a completed concept symbol string. Apart from spaces and line breaks, only `f`, `(`, `)`, and `,` appear in this intermediate notation. `f()` is the base, `f(t)` a unary construction, and `(s,t)` a pair.

Natural-number chains are part of this syntax. Integers and rational numbers use pairs, and finite lists use the following recursive representation.

```text
empty list  := f()
cons(x,xs)  := (x,xs)
```

Values are read with a specified type. `f()` as natural-number zero and `f()` as an empty coefficient list are values of different types, even though they are the same string. When the candidates are restricted, shape may distinguish them, but f syntax does not uniquely determine every type. A calculation with a fixed type needs no type tag on each value. When several types are mixed on the same transmission channel, a natural-number tag identifying the type is added in an outer pair. That a tag can be read and that its contents satisfy the formation conditions of the specified type are checked separately.

General finite syntax trees are represented by the same method. Assign mutually distinct natural-number tags to the constructors, and make each node a pair of “a tag and a finite list encoding its arguments in order.”

- **Lambda terms**: Assign different tags to bound variables, free variables, application, and λ-abstraction. A bound variable is held as the natural number giving its distance to its binder (a de Bruijn index), and a free variable as the string of its name (a finite list in which each UTF-8 byte is made a natural number).
- **Programs**: Definition tables, environments, computation rules, inputs, states, and termination classifications also become finite data by the same method. Replacing a rule name with a natural number is in itself neither an implementation nor a proof of that rule.
- **Propositions**: An equation holds its type and its left and right terms, a logical connective holds its component propositions, and a quantifier holds the type of the variable it binds and its body proposition. As with lambda terms, a bound variable is represented by the natural number giving its distance to its binder.
- **Proofs**: An application of an inference rule is represented by its rule tag, its judgment (the list of assumptions and the conclusion), auxiliary information specific to the rule, and a finite list of the proof trees of its premises. If shared parts are stored by reference numbers, only previously introduced numbers forming no cycles are permitted, which guarantees expansion into a finite proof tree.

**Proposition 2.2 (Encoding and decoding finite syntax)** Specify finitely many constructors and their argument formats, and fix mutually distinct natural-number tags for the constructors. Also give finite encoding and decoding procedures for atomic data (data not decomposed any further, such as character codes), and suppose that $D(E(a))=a$ holds for each atom $a$. Then any finite syntax tree formed from these constructors can be encoded in the intermediate notation P, and decoding a correctly encoded input recovers the original syntax tree.

**Proof.** The base, unary f, and pair are uniquely distinguished by their initial form, the matching of parentheses, and the presence or absence of an outermost comma. A natural number can be decoded from the number of unary constructors, and a finite list can be decoded by distinguishing the empty list given by the base from adjoining a head given by a pair. At a syntax-tree node, read the tag and the argument list from the outer pair, and obtain the constructor and argument format from the tag table. For atomic data use the assumed decoding, and apply the same procedure recursively to child syntax trees. By induction on the number of nodes of the original tree, each child is recovered, and since the tag uniquely determines the constructor, the parent is recovered as well. The recursion goes only to strictly smaller finite subtrees, so it terminates. Hence, writing $D$ for decoding and $E$ for encoding, $D(E(t))=t$, and $E$ is injective. □

This proposition is a claim about the reversible representation of finite syntax; the termination of all programs, the truth or falsity of all propositions, and the representability of every function by a finite program do not follow from it. What is held when a generator is encoded is a finite program and its parameters, not data in which infinitely many outputs have been written out. That a proof tree can be encoded is also different from that tree conforming to the rules and proving a proposition. Proof trees of the above form are a representation for storage, and no checker that reads them is included. The equational proof checker of §10.2 reads proof data in a different format. That proof data can also be encoded as symbol strings of f, and the decoded data are rechecked by the same checker.

The construction of each concept in the intermediate pair notation and the tables of tags are given in the [systematic account of concept symbol strings](../research/concept-symbols-v1.5.9.md), finite examples fully expanded into the basic symbols without abbreviation in the [complete examples](../research/concept-examples-v1.5.9.md), and the correspondence with the main text in the [concept inventory](../research/concept-inventory-v1.5.9.md). Instead of enumerating infinitely many values, these materials present recursive rules applicable to any finite input separately from individual finite examples.

**Enclosing pairs in f as well.** The notation of the f-only appendix uses only f and the parentheses indicating its scope. The formation rules of this common syntax U are

```text
U ::= f() | f(U) | f(UU)
```

The final `UU` means that two completed subexpressions are placed in sequence; neither the letter U nor separating spaces are inserted into the completed symbol string. Zero direct children of the outer f denote the base, one denotes a one-step construction, and two denote a pair. Forms with three or more direct children are not included in the syntax. When three or more components are needed, pairs are nested.

Define the conversion E from the intermediate notation P to the common syntax U by the following three rules.

```text
E(f())   = f()
E(f(t))  = f(E(t))
E((s,t)) = f(E(s)E(t))
```

Here E, the variables, and the equals signs are symbols for explaining the conversion rules; in the completed symbol string, in which the children are also converted recursively, neither they nor commas remain. We do not merely erase commas: **we also add one f around the outside of the pair**. For example,

```text
integer two (intermediate notation): (f(),f(f(f())))
integer two (common syntax):         f(f()f(f(f())))
```

The natural number two, `f(f(f()))`, is unchanged, since it consists only of constructions with one child. The same three rules are applied recursively, just as they are, to integers, rational numbers, M-polynomials, Fε, generative complex numbers, generative quaternions, finite lists, lambda terms, propositions, and proof trees. The normalization and operation rules of each numerical type do not change.

**Proposition 2.3 (Reversible representation using one kind of construction symbol)** Every expression P of the intermediate notation can be converted by E into U. Every U can be read uniquely and restored to P, and conversion and restoration are mutually inverse.

**Proof.** Every U begins with f followed by an opening parenthesis and ends with the matching closing parenthesis. Reading the interior from the left, the f with which each child begins and the matching of the parentheses that follow it uniquely determine where one child ends. Repeating this reading on the rest of the interior uniquely divides it into zero, one, or two direct children. Hence no commas or spaces are needed between children.

Let restoration D be the procedure that returns `f()` for zero children, `f(D(u))` for one child u, and `(D(u),D(v))` for two children u,v. By structural induction on the original P, the base is unchanged, and in the one-child and two-child cases the induction hypothesis recovers the children; hence D(E(t))=t. In the reverse direction, structural induction on U likewise gives E(D(u))=u. In both directions the recursion goes only to strictly smaller finite subtrees, so the procedures terminate. □

What this manuscript calls “f alone” means that **the symbol responsible for construction is unified as a single kind, f, while parentheses remain as delimiters indicating its scope**. Mathematically, this specifies one recursive mode of construction that encloses zero, one, or two children in the same f. It differs from notation that merely iterates an ordinary unary function. The glyph f alone does not determine the rules of evaluation or inference; meaning is fixed by adopting the formation and reading rules of §1.2 and of this section, together with the operation and inference rules of the respective sections.

The [appendix “Following This Manuscript Using f Alone”](../appendices/A_New_Foundation_of_Mathematics_en_v1.5.9_f_only.md) is material for following this reversible representation. Its main part gives examples that follow the structure of numbers, syntax, programs, and evidence directly. Its later part stores the complete text of the manuscript and the complete executable definitions referred to by operation names in the same f form, by carrying character codes to lists of natural numbers, and confirms that the prose and the sources are recovered without omission. Storing the prose does not amount to formalizing the hand-written proofs, and storing the sources does not amount to porting the programs to pure lambda terms.

### 2.7 Specifying the type before calculating

Here a type is a name for specifying the permitted representations, how to read them, and the rules for equality and operations. Before calculating, we fix the type A to be used and the inputs and outputs of each operation. For example, addition is specified as $A\times A\to A$, and comparison as $A\times A\to\mathsf{Bool}$. Not all auxiliary data need to be of type A: it suffices to decide in advance that iteration counts are natural numbers, precision requests are natural numbers, and approximation responses are rational numbers together with error bounds.

Inputs are constructed according to the formation rules of their type. When values of an existing type B are used, their representations are brought into line by a map $j:B\to A$ fixed in advance, and it is proved beforehand that this map preserves the required equality and operations. Once it is shown for each operation that inputs of A satisfying its preconditions yield a value of the specified output type, no process of inferring types afresh for each calculation is needed. Specifying a type does not by itself remove preconditions such as those concerning division by zero, so nonzero conditions and the like are satisfied separately.

For example, in the type T of §8.10, an element a of Fε is prepared as $(a,0)$, and $\sigma=(0,1)$. The product is $(a,b)(c,d)=(ac+2bd,ad+bc)$. From the outset we calculate in type T:

$$
(1+\sigma)(1-\sigma)
=(1,1)(1,-1)=(-1,0)
$$

The inputs, intermediate values, and result are all of the same type. Even when the result is displayed as “−1,” this is an abbreviation for the T value $(-1,0)$; it has not been converted automatically to the integer type. Returning a result to the smallest type, or promoting types during a calculation, is not among the requirements of this manuscript. We distinguish the stage of choosing a type and preparing the required operations from the stage of calculating with the rules prepared.

This specification is a mathematical input condition, not the adoption of a complete type-inference engine as a new foundation. Calculating with already well-formed values and validating strings received from outside are also separate tasks. The next section gives a small example of the latter.

### 2.8 A small recursive check for natural-number representations

We define a procedure that takes as input a finite tree of the common syntax U of §2.6 and returns whether it has a form permitted as a natural-number representation.

$$
\begin{aligned}
\operatorname{NatForm}(f())&=\mathsf{true},\\
\operatorname{NatForm}(f(t))&=\operatorname{NatForm}(t),\\
\operatorname{NatForm}(f(tu))&=\mathsf{false}.
\end{aligned}
$$

The truth values are explanatory abbreviations; they too can be encoded as specified finite data. In the third line, tu denotes two direct children. For an input already read as a finite tree, cases are distinguished by the number of children. Strings with unmatched parentheses and strings with three or more direct children are rejected at the stage of reading U.

| Input | NatForm result |
|---|---|
| `f()` | True |
| `f(f())` | True |
| `f(f()f())` | False |
| `f(f(f()f()))` | False |

**Proposition 2.4 (Checking natural-number formation conditions)** NatForm terminates on every finite U tree, and it returns true if and only if that tree is a natural-number representation of §2.1.

**Proof.** With zero children, the tree is natural-number zero, and true is returned immediately. With one child, the procedure recurses only on that child, so the number of nodes decreases by one. By the induction hypothesis, it returns true exactly when the child is a natural-number representation, and in that case the original tree is the natural-number representation of the successor. With two children, the form is not among the natural-number formation rules, so false is returned immediately. Termination and correctness of the decision follow by induction on the number of nodes of the finite tree. □

This is a syntactic check for the specified natural-number type. Since `f()` can be read both as natural-number zero and as the empty list, this check does not let us conclude that the input “belongs only to the natural-number type among all types.” Nor is it a procedure that decides whether an arbitrary lambda term terminates and returns a natural number. A calculation with a fixed type need not incorporate this check every time; it is an example showing that formation conditions can be confirmed by a finite recursive procedure. The f-only appendix contains a finite program tree expressing the case analysis on zero, one, and two children and the recursion, together with execution examples. The execution examples were checked by a small procedure that reads the program tree; NatForm has not been built into the lambda-calculus interpreter.

## 3. Natural Numbers and a Commutative Semiring

### 3.1 Operations by Recursion

Define the operations by recursion on the second argument:

$$
\begin{aligned}
a+0&:=a, & a+S(b)&:=S(a+b),\\
a\cdot0&:=0, & a\cdot S(b)&:=a\cdot b+a
\end{aligned}
$$

In both definitions, the structure of the second argument becomes smaller one step at a time, so the operations terminate on finite inputs and return natural-number representations. By induction, addition represents the total of the two construction counts, and multiplication represents repeated addition the corresponding number of times.

### 3.2 Laws of Addition

**Lemma 3.1 (Left zero and left successor)** $0+a=a$ and $S(a)+b=S(a+b)$.

**Proof.** Prove the first equation by induction on $a$. The case $a=0$ holds by definition, and $0+S(a)=S(0+a)=S(a)$. Prove the second equation by induction on $b$. When $b=0$, both sides are $S(a)$. In the successor case,

$$
S(a)+S(b)=S(S(a)+b)=S(S(a+b))=S(a+S(b)).
$$

In each case, every step through the final equality can be written as a finite application of rules. □

**Theorem 3.2 (Associativity and commutativity of addition)**

$$
(a+b)+c=a+(b+c),\qquad a+b=b+a.
$$

**Proof.** Associativity follows by induction on $c$. The case $c=0$ holds by definition. The induction step is

$$
(a+b)+S(c)=S((a+b)+c)=S(a+(b+c))=a+(b+S(c)).
$$

Commutativity follows by induction on $b$. The case $b=0$ is Lemma 3.1. The induction step is

$$
a+S(b)=S(a+b)=S(b+a)=S(b)+a.
$$

The last step uses Lemma 3.1. □

### 3.3 Laws of Multiplication

**Lemma 3.3** $0\cdot b=0$ and $S(a)\cdot b=a\cdot b+b$.

**Proof.** The first equation follows by induction on $b$, with the induction step $0\cdot S(b)=0\cdot b+0$. Prove the second equation by induction on $b$ as well. The base case is zero. The induction step is

$$
\begin{aligned}
S(a)\cdot S(b)
 &=S(a)\cdot b+S(a)\\
 &=(a\cdot b+b)+S(a)\\
 &=(a\cdot b+a)+S(b)\\
 &=a\cdot S(b)+S(b).
\end{aligned}
$$

The rearrangement in the middle uses Lemma 3.1 and the associativity and commutativity of addition. □

**Theorem 3.4 (Semiring laws)** Addition and multiplication of natural numbers are each commutative and associative, with zero and one as their respective identities. Multiplication distributes over addition and has zero as an absorbing element.

**Proof.** The claims about addition have already been proved. The absorption of zero is the defining equation $a\cdot0=0$ together with the first equation of Lemma 3.3. Prove commutativity of multiplication by induction on $b$. The base case is Lemma 3.3. The induction step is

$$
a\cdot S(b)=a\cdot b+a=b\cdot a+a=S(b)\cdot a.
$$

For the identity, $a\cdot1=a\cdot0+a=a$, and the other side uses commutativity. Prove the distributive law $a\cdot(b+c)=a\cdot b+a\cdot c$ by induction on $c$. The base case is zero. The induction step is

$$
\begin{aligned}
a\cdot(b+S(c))
 &=a\cdot S(b+c)\\
 &=a\cdot(b+c)+a\\
 &=(a\cdot b+a\cdot c)+a\\
 &=a\cdot b+a\cdot S(c).
\end{aligned}
$$

The other distributive law follows from commutativity of multiplication. Finally, prove associativity of multiplication by induction on $c$. The base case is zero. The induction step is

$$
a\cdot(b\cdot S(c))
=a\cdot(b\cdot c+b)
=a\cdot(b\cdot c)+a\cdot b
=(a\cdot b)\cdot S(c).
$$

Thus all the laws are obtained by finite inductive proofs. □

Among these laws and the four-term interchange $(a+b)+(c+d)=(a+c)+(b+d)$, 13 propositions have been machine-checked as finite proof data (§10.2): left zero, left successor, commutativity, associativity, and four-term interchange for addition, and left zero, right identity, left successor, commutativity, left identity, left and right distributivity, and associativity for multiplication. Proofs rewritten in each system were also checked in Lean 4, Rocq, and Agda (§10.7).

### 3.4 Comparison, Difference, and Cancellation

Comparison is performed by removing one constructor from each of the two inputs simultaneously, one step at a time. If one side reaches zero first, the order is determined; if both reach zero simultaneously, they are equal. Define truncated subtraction by

$$
a\mathbin{\dot-}0=a,\quad
0\mathbin{\dot-}S(b)=0,\quad
S(a)\mathbin{\dot-}S(b)=a\mathbin{\dot-}b
$$

Comparison and subtraction terminate because they shorten finite structures.

The relation $a\le b$ coincides with the existence of a natural number $d$ such that $a+d=b$. The constructors remaining after the comparison procedure give this $d$. If $a+d=b+d$, then $a=b$ (additive cancellation). This can be shown by induction, removing one stage of $d$ at a time. That both are zero if $a+b=0$ also follows from the shape of the constructors.

The product of nonzero $a,b$ is nonzero (there are no zero divisors). Indeed, writing $b=S(c)$ gives $a\cdot b=a\cdot c+a$, and the addition retains a nonzero successor constructor. Comparison gives a total order, and transitivity of the order follows by adding the witnesses for the differences. Multiplication by a positive number maps a difference to a positive product, so it preserves strict order.

## 4. Signed Integers and a Commutative Ring

### 4.1 Normalization of Zero

Let a raw integer representation be $(s,n)$, where $s$ takes one of two values, positive side or negative side, and $n:\mathsf N$ is the magnitude. In concept symbol strings, the positive sign is `f()` and the negative sign is `f(f())`. This is a reading as a sign type, not an identification with the natural numbers zero and one.

Raw representations have two zeros, $+0$ and $-0$. We therefore pass them through the following normalization $\zeta$.

$$
\zeta(s,n)=
\begin{cases}
+(0),&n=0,\\
s(n),&n\ne0.
\end{cases}
$$

Here $s(n)$ denotes the integer with sign $s$ and magnitude $n$, which is different from the successor $S(n)$. From now on, only representations passed through $\zeta$ count as integers. In particular, $-0$ is never returned. This rule is applied to every output of sign reversal, addition, and multiplication.

For addition, if the signs agree, add the magnitudes and keep the same sign; if they differ, compare the magnitudes and return the sign of the larger side together with the difference of the magnitudes. Multiplication is computed from whether the signs agree and from the product of natural numbers. For a zero result, the rule above takes precedence. These definitions give $1+(-1)=+0$ and $-(+0)=+0$.

### 4.2 Proving the Laws Using Difference Representations

To avoid case analysis on signs and keep the proofs short, write $D(a,b)$ for the integer constructed from a pair of natural numbers $(a,b)$ by comparison and truncated subtraction. It is $+(a\mathbin{\dot-}b)$ if $a\ge b$, and $-(b\mathbin{\dot-}a)$ otherwise. This is an auxiliary operation returning a sign-and-magnitude representation, not a new number type. Every integer can be written as $+n=D(n,0)$ or $-n=D(0,n)$.

**Lemma 4.1**

$$
D(a,b)=_{\mathsf Z}D(c,d)
\quad\Longleftrightarrow\quad a+d=c+b.
$$

**Proof.** In the case $a=b+r,\ c=d+s$, the left side is $r=s$, and additive cancellation reduces the right side to the same equation. The case where both are on the negative side is similar. If the signs differ, write, for example, $a=b+r,\ d=c+s$; then the right side is equivalent to $r+s=0$. This holds only when $r=s=0$. By normalization of zero, the left side also holds exactly in that case. Totality of comparison exhausts all the cases. □

For arbitrary difference representations, the operations on sign-and-magnitude representations satisfy

$$
\begin{aligned}
D(a,b)+D(c,d)&=D(a+c,b+d),\\
-D(a,b)&=D(b,a),\\
D(a,b)D(c,d)&=D(ac+bd,ad+bc)
\end{aligned}
$$

For example, when $a=b+r$, $d=c+s$, and $s>0$, the left side of the first equation is $(+r)+(-s)$. From $a+c=(b+c)+r$ and $b+d=(b+c)+s$, the right side is $+(r\mathbin{\dot-}s)$ if $r\ge s$ and $-(s\mathbin{\dot-}r)$ otherwise, which agrees with the left side. The other sign combinations and the product are similar.

That changing the representation does not change the result (representation invariance) can also be checked with Lemma 4.1. For example, if $a+b'=a'+b$, then $D(a,b)D(c,d)=D(a',b')D(c,d)$ is equivalent to $(ac+bd)+(a'd+b'c)=(a'c+b'd)+(ad+bc)$, whose left side is

$$
\begin{aligned}
ac+bd+a'd+b'c
&=c(a+b')+d(b+a')\\
&=c(a'+b)+d(b'+a)
=a'c+b'd+ad+bc
\end{aligned}
$$

The same calculation applies to the second factor.

**Theorem 4.2** $\mathsf Z$ is a commutative ring.

**Proof.** Every integer can be written as a difference representation, so it suffices to prove the claims for difference representations. Associativity and commutativity of addition are obtained by applying the natural-number laws to the components. The identity is $D(0,0)$ and the inverse is $D(b,a)$, with sum $D(a+b,a+b)=0$.

Commutativity of multiplication follows by exchanging the factors in the formula above. For three factors $D(a,b),D(c,d),D(e,f)$, either parenthesization gives the positive component $ace+adf+bcf+bde$ and the negative component $acf+ade+bce+bdf$. Expanding with the semiring laws for natural numbers gives associativity of multiplication. The multiplicative identity is $D(1,0)$. For the distributive law as well, expanding the two components with the distributive laws for natural numbers gives the same components. □

In sign-and-magnitude representation, the magnitude of a product of nonzero integers is a product of nonzero natural numbers. Hence there are no zero divisors. If $ux=uy,\ u\ne0$, then $u(x-y)=0$ gives $x=y$.

### 4.3 Order on Integers

Define

$$
D(a,b)<D(c,d)\quad:\Longleftrightarrow\quad a+d<c+b
$$

By Lemma 4.1 and additive cancellation for natural numbers, changing the difference representation does not change the result of the comparison. Trichotomy follows from the fact that comparison of natural numbers is a total order, together with Lemma 4.1. An implementation can first compare the signs; if both are positive, it compares the magnitudes, and if both are negative, it compares the magnitudes in reverse order.

Transitivity is obtained by adding the corresponding inequalities and cancelling the common terms, and adding the same integer preserves order. The product of positive integers is positive. In particular, $0<0$ is false, and the sign of zero never changes the order.

## 5. Rational Numbers, Normalization, and an Ordered Field

### 5.1 The Denominator Condition, Normal Form, and Euclid's Procedure

Let a raw rational-number representation be a pair of integers $(p,q)$ with $q\ne0$. Normalization is the following procedure.

1. If the denominator is negative, reverse the signs of both the numerator and the denominator.
2. If $p=0$, return $0/1$.
3. Otherwise, divide both by the positive natural number $g=\gcd(|p|,|q|)$.

This yields a representation satisfying

$$
q>0,\qquad \gcd(|p|,q)=1
$$

In concept symbol strings, the integer in the denominator is also written out explicitly as `(f(), positive natural number)`. For example, $1/2$ is `((f(),f(f())),(f(),f(f(f()))))` in the intermediate notation, and carrying it into the common syntax U by the conversion E of §2.6 gives `f(f(f()f(f()))f(f()f(f(f()))))`. An arithmetic implementation that stores the denominator as a positive natural number alone uses an internal representation omitting the fixed positive sign. The maps that add and remove this sign are mutually inverse and change neither the nonzero condition nor reducedness.

A zero denominator cannot form a rational number. Division by zero is not represented by leaving evaluation to diverge.

For $d>0$, the natural-number quotient and remainder are computed as follows. If $n<d$, the quotient is zero and the remainder is $n$. Otherwise, recurse on $n-d$ and increase the quotient by one. The natural number decreases at each stage, so the procedure terminates. By induction, the returned pair $(k,r)$ satisfies $n=kd+r,\ 0\le r<d$.

Euclid's procedure

$$
\gcd(a,0)=a,\qquad \gcd(a,b)=\gcd(b,a\bmod b)\quad(b>0)
$$

terminates because its second argument strictly decreases. If $a=kb+r$, an integer divides both $a,b$ if and only if it divides both $b,r$. This invariant and the final pair $(g,0)$ show that the returned $g$ is a common divisor and that every common divisor divides $g$.

Tracing the same recursion backwards also yields integers $u,v$ satisfying $g=ua+vb$. Indeed, if the recursive call gives $g=u'b+v'r$, then $g=v'a+(u'-kv')b$. At the base $\gcd(a,0)=a$, take $u=1,v=0$.

### 5.2 Equality and Uniqueness of Normal Form

Define

$$
\frac pq=_{\mathsf Q}\frac rs
\quad:\Longleftrightarrow\quad ps=rq
\qquad(q,s>0)
$$

and call $ps$ and $rq$ the cross products of $p/q$ and $r/s$. Reflexivity and symmetry are immediate. If $ps=rq$ and $ru=ts$, then $psu=rqu=tqs$, and cancelling $s\ne0$ gives $pu=tq$, so transitivity follows.

**Theorem 5.1 (Normalization)** The normalization above preserves equality and returns a normal form. The normal form is unique among equal representations, and normalization is idempotent.

**Proof.** Simultaneous reversal of the signs, division by a common divisor, and replacing $0/q$ by $0/1$ preserve cross-product equality. If a common divisor $h>1$ remained after division by the gcd, then $gh$ would be a common divisor of the original numbers. But every original common divisor divides $g$, so $gh\mid g$, which contradicts the order of positive integers. Hence the result is reduced.

We show uniqueness. Take reduced $p/q=r/s$. If $p=0$, then $rq=0$ gives $r=0$, and by reducedness both are $0/1$. Otherwise, reducedness and the coefficient calculation of §5.1 give integers $u,v$ with $up+vq=1$. Using $ps=rq$,

$$
s=ups+vqs=q(ur+vs)
$$

so $q$ divides $s$. Similarly, $s$ divides $q$. Both are positive, so the properties of products and order of natural numbers give $q=s$. Cancellation in the cross products then gives $p=r$. If a representation is already in normal form, the same representative is returned again, so normalization is idempotent. □

### 5.3 Arithmetic Operations and the Field Laws

Define the following, normalizing after every operation:

$$
\begin{aligned}
\frac pq+\frac rs&:=\frac{ps+rq}{qs},&
-\frac pq&:=\frac{-p}{q},\\
\frac pq\frac rs&:=\frac{pr}{qs},&
\left(\frac pq\right)^{-1}&:=\frac qp\quad(p\ne0)
\end{aligned}
$$

The denominators are nonzero because the integers have no zero divisors. Representation invariance can be checked by multiplying and adding cross-product equalities. For example, if $pq'=p'q$ and $rs'=r's$, then

$$
(ps+rq)q's'=(p's'+r'q')qs
$$

so the definition of the sum does not depend on the representatives.

**Theorem 5.2** $\mathsf Q$ is a commutative field.

**Proof.** For three fractions $p/q,r/s,t/u$, either parenthesization of the sum gives denominator $qsu$ and numerator $psu+rqu+tqs$. The product has numerator $prt$ and denominator $qsu$. Commutativity and distributivity follow by applying the corresponding integer laws to the cross products. Zero is $0/1$ and one is $1/1$, and the two are distinct. The numerator of the sum with the additive inverse is zero. When $p\ne0$, the numerator and denominator of $(p/q)(q/p)$ are equal, so it is equal to $1/1$. Finally, by uniqueness of normal form, these also give the same representative as returned values of the computation. □

### 5.4 Comparison

For representations with positive denominators, define

$$
\frac pq<\frac rs\quad:\Longleftrightarrow\quad ps<rq
$$

Because the product of the denominators is positive, the order is compatible with changes of representation and with the operations. Trichotomy follows from trichotomy for integers. Transitivity is shown by multiplying $ps<rq$ and $ru<ts$ by the positive numbers $u$ and $q$, respectively, to obtain $psu<rqu<tqs$, and then cancelling the positive $s$ to obtain $pu<tq$. Taking differences shows that translation preserves order, and the product of positive fractions is positive. Hence the ordered-field laws hold.

With this comparison, $1<1$ reduces to the integer comparison $1<1$ and returns false. An implementation that decides strict order from the sign of the numerator alone meets the same specification only when it satisfies the conditions of zero normalization and of the denominator sign.

### 5.5 1/3 as a Fraction

The number $1/3$ constructed as a fraction is an exact element of $\mathsf Q$ and is the solution of $3x=1$ in $\mathsf Q$. When the description `0._3`, which specifies recurring digits, is used, its evaluation as a rational number is distinguished from the introduction of a relation label from a selected generation record. Decimal notation changes neither equality nor arithmetic of fractions. Rational evaluation and the lower and upper procedures are given in Appendix A.1 and A.2, and the convention for writing decimals in Appendix A.5.

## 6. Introducing Relation Labels from Processes Approaching Rational Numbers

In this section, we define processes approaching a rational number $q$ as finite generation records and give an introduction map $\Phi$ that proceeds from them to relation labels. A relation label is a pair $(k,q)$ of an integer $k$ and a rational number $q$. If $k>0$, it is written by attaching $k$ copies of # to $q$; if $k<0$, by attaching $-k$ copies of ♭ (for example, $(2,q)=q^{\#\#}$). Their operations and order are defined in Section 7.

### 6.1 The Finite Contract of qlim

For $q,b:\mathsf Q$, the sequence-generating label that retains the program returning

$$
Q_{q,b}(n):=q+\frac{b}{n+1}\qquad(n:\mathsf N)
$$

together with the arguments $q,b$ is written $\mathrm{qlim}(q,b)$. Its finite generation record is written $G(q,b)$, and the family of these generation records is called the standard family $G$. If $b>0$, every output is greater than $q$; if $b<0$, every output is smaller. If $b=0$, it always returns $q$.

Here $n$ is the input that specifies the recursion count of the process obtaining a rational response; it is a quantity distinct from the number of relation operators used later. This definition does not return a single “last rational number.” A generation record retains the program, the arguments, and, if needed, finite computation traces of executions performed. A response to a specified count, a generation record, and the relation label introduced from it are each handled in their specified types.

**Proposition 6.1 (Finite error contract).** For any positive rational number $\delta$, a natural number $N$ can be found by finite computation such that, for every $n\ge N$,

$$
|Q_{q,b}(n)-q|<\delta
$$

is guaranteed.

**Proof.** Take $N=\lceil |b|/\delta\rceil$. The integer obtained by rounding up the rational quotient can be computed finitely. If $n\ge N$, then $n+1>|b|/\delta$, so $|b|/(n+1)<\delta$. The inequality also holds when $b=0$. □

Only inequalities between rational numbers and a finitely computed bound on the responses are used. This guarantee can be translated into the language of classical limits, but that translation is not used in the definition of generation records.

### 6.2 Common Outputs of Processes with the Same Direction

In the usual order on rational numbers, if $q<r$, then $(q+r)/2$ lies between them. Thus “the closest rational number greater than $q$” cannot be defined as a value in $\mathsf Q$. On the other hand, by matching the counts, the same rational number can be extracted from processes with different coefficients.

**Proposition 6.2 (A common subsequence by a finite index transformation).** If $b,c$ are nonzero rational numbers of the same sign, positive integers $r,s$ can be found by finite computation such that, for every positive integer $t$,

$$
Q_{q,b}(rt-1)=Q_{q,c}(st-1)
$$

is guaranteed. This common output can be extracted with both recursion counts advanced beyond arbitrarily specified counts.

**Proof.** From a fraction representation of the positive rational number $b/c$, obtain $b/c=r/s$. Then $bs=cr$, so

$$
Q_{q,b}(rt-1)
=q+\frac{b}{rt}
=q+\frac{c}{st}
=Q_{q,c}(st-1).
$$

Suppose natural-number bounds $N_1,N_2$ are specified. Taking $t=\max(N_1,N_2)+2$, we obtain $rt-1>N_1$ and $st-1>N_2$ from $r,s\ge1$. Both the index computation and the check of the equality of outputs can be carried out in finite rational arithmetic. □

For example, if $b=1,c=2$, then we have, for every positive integer $t$,

$$
Q_{q,1}(t-1)=q+\frac1t=Q_{q,2}(2t-1)
$$

Outputs at the same recursion count generally differ, but common outputs at matched counts can be obtained arbitrarily far along.

### 6.3 An Introduction Map Discarding Coefficient Magnitude

We adopt, as the following finite rule, the policy of proceeding to the same relation label regardless of which positive coefficient is chosen. For the integer–rational pairs defined in Section 7, define the introduction map by

$$
\Phi(G(q,b)):=
\begin{cases}
(2,q)=q^{\#\#},&b>0,\\
(-2,q)=q^{\flat\flat},&b<0,\\
(0,q)=q,&b=0
\end{cases}
$$

Representing a process on the positive side by two # symbols and a process on the negative side by two ♭ symbols is a construction rule chosen in this manuscript. Proposition 6.2 gives a concrete reason for grouping processes with the same direction, but it does not uniquely determine this choice of coefficient or the rules for operations on numbers.

**Proposition 6.3 (Finite introduction and independence from coefficient magnitude).** The output of $\Phi$ can be computed finitely from a generation record of the specified type. Two outputs are equal if and only if the rational components of the two records are equal and the coefficients belong to the same case among positive, negative, and zero. In particular, for a fixed rational number, all positive rational coefficients introduce the same relation label.

**Proof.** Equality and sign of rational numbers can be decided by the finite arithmetic of Section 5. It suffices to select the integer component according to the sign and form its pair with the rational component. Equality of outputs is equality of both components, and the three integer components $2,-2,0$ are mutually distinct. The stated conditions are therefore necessary and sufficient. □

$\Phi$ discards the magnitude of the coefficient only for the relation label it introduces. The original generation record $G(q,b)$ retains $b$ and can reproduce the response to a specified recursion count. Moreover, this is not automatic identification of an unknown type: it is a process that takes as input a generation record specified in advance and branches on the sign of a known rational number.

Nor is $\Phi$ a process returning a rational approximation. It is an introduction rule proceeding from a generation record to a finite pair with separately defined equality and operations. Increasing a recursion count and adding relation labels are different operations; their difference is shown in §7.3.

The domain of $\Phi$ is the standard family $G$. Appendix A extends the same policy to the geometric family $H(q,b,r)$ and defines a separate introduction map $\Psi$. Neither is extended unconditionally to arbitrary generation programs.

### 6.4 Generation Records Retaining Rules and Evidence

For explanation, we write the general form of a generative label as

$$
\operatorname{Label}(\mathrm{rule},\mathrm{parameters},\mathrm{specification},\mathrm{evidence})
$$

The rule is the code and the versions of the definitions it references; the parameters are initial values and the like; the specification is the input and output types and the content of the guarantees; and the evidence is a finite proof description supporting the specification. The four components can be held as nested pairs and all converted back to f syntax by the method of §2.6. Even with the same code, records with different parameters or specifications are not necessarily the same generation record.

That the response to each request terminates after finitely many steps, and that the rule meets its guarantee for every permitted request, are shown separately. For individual executions of the former, computation traces are used; for the latter, a general proof based on a termination argument, induction, or the like. For example, the specification of $\mathrm{qlim}(q,b)$ consists of the response formula at each count and the error contract of Proposition 6.1; its general proof and the computation trace of a response actually obtained for a particular request are recorded in separate fields. The field for a universal proof must not be replaced by a few successful examples. Completing the execution of infinitely many operations is not part of the meaning of labeling. Nor is the ability to respond with the same rational approximations made the definition of equality of exact numbers.

“Carrying a proof” means that the rules used and the proof status are made explicit. We distinguish the stage at which a hand-written proof in the main text is referenced, the stage at which a formal proof tree has been stored, and the stage at which a checker has accepted that tree. No mechanism for automatically certifying the termination or specification of arbitrary code is introduced. Finite syntax retaining an unknown rule is not treated in the same way as a generative label with a proved contract.

When generative labels are combined by an operation, a new contract is constructed from the contracts of the input labels and the preservation theorem of the operation. An expression whose necessary conditions have not yet been proved can also be retained as syntax, but it is an expression with unmet conditions, not a label with guaranteed responses. In particular, division remains in this state until the evidence of separation from zero of §9.2 has been obtained. This composition of generation procedures and the arithmetic of relation labels in Section 7 follow their respective rules.

We do not make every number carry a generation procedure, exact operations, and a proof of their correspondence as a single mandatory label. We supply generation records and the finite pairs they introduce, and use only the correspondence specified here.

## 7. The Linear Representation L of Relation Labels and Its Operations

### 7.1 The Rational Component and the Integer Component of Relation Operators

The linear representation that receives the outputs of the introduction map of Section 6 and handles addition, subtraction, and order of relation labels is defined as

$$
\mathsf L:\ (k,a),\qquad k:\mathsf Z,\ a:\mathsf Q
$$

A rational number $a$ is embedded as $(0,a)$. We call # and ♭ **relation operators** and, following the notation introduced at the beginning of Section 6, read $a^\#$ as $(1,a)$, $a^{\flat}$ as $(-1,a)$, and $a^{\#\#}$ as $(2,a)$. Applying a relation operator is the process of increasing or decreasing the integer component by one; it is distinct from the recursion count for obtaining a rational response.

Define the operations and order by

$$
\begin{aligned}
(k,a)+(l,b)&:=(k+l,a+b),\\
-(k,a)&:=(-k,-a),\\
(k,a)<(l,b)&:\Longleftrightarrow
 a<b\ \text{or}\ (a=b\ \text{and}\ k<l)
\end{aligned}
$$

Equality is equality of both components. The rule grouping generation records through the introduction map does not change this equality. In particular, pairs with different integer components are different relation labels even when their rational components are the same.

This order is the **lexicographic order**, which compares the rational components first and compares the integer components only when those are equal. For rational numbers $s<q<r$, we have

$$
s<\cdots<q^{\flat\flat}<q^\flat<q<q^\#<q^{\#\#}<\cdots<r
$$

### 7.2 Proof of the Additive-Group and Order Properties

**Theorem 7.1.** $\mathsf L$ is a totally ordered commutative additive group, and translations preserve the order.

**Proof.** Under either parenthesization, the sum of three elements is $(k+l+m,a+b+c)$. Commutativity likewise follows from commutativity in each component. Zero is $(0,0)$, and the inverse is $(-k,-a)$.

A comparison of two elements is decided finitely by comparing the rational components first and, when they are equal, the integer components, and it yields exactly one of less than, equal, and greater than. If $u<v<w$, the three rational components are weakly increasing. If there is at least one strict difference among them, transitivity for rational numbers gives $u<w$. If the three rational components are equal, transitivity for the integer components gives $u<w$. Adding the same $(m,c)$ preserves the strict order of the rational components and, when the rational components are equal, preserves the order of the integer components. □

In this model,

$$
1^\flat+1^\#=2,\qquad
0^{\#\#}-0^{\#\#\#}=0^\flat
$$

hold by componentwise calculation. There is no element of $\mathsf L$ between the elements with the same rational component and integer components $k$ and $k+1$. We call this **adjacency** within $\mathsf L$. It is a property distinct from continuity in analysis.

Scalar multiplication by a rational number $q$ can be performed within this representation when $qk$ is an integer. In that case, set $q(k,a)=(qk,qa)$. Thus $(2,2)/2=(1,1)$, that is, $(2^{\#\#})/2=1^\#$, is possible, but $(1,1)/2$ cannot be represented within this type.

### 7.3 Adding Generation Procedures and Adding Relation Labels

Even when generation records approaching zero from the positive side are grouped together, they need not be identified with the zero of relation labels. By definition,

$$
0^{\#\#}=(2,0)>(0,0)=0,
\qquad
0^{\#\#}+0^{\#\#}=(4,0)=0^{\#\#\#\#}\ne0^{\#\#}
$$

Adding two relation labels gives a new label obtained by adding their integer components. Ordinary additive-group cancellation continues to hold.

On the other hand, at the same recursion count, the response formulas of generation records satisfy

$$
Q_{q,b}(n)+Q_{r,c}(n)=Q_{q+r,b+c}(n),\qquad
Q_{0,1}(n)+Q_{0,1}(n)=Q_{0,2}(n)
$$

However, changing the order in which the introduction map is applied gives different results:

$$
\Phi(G(0,2))=(2,0),\qquad
\Phi(G(0,1))+\Phi(G(0,1))=(4,0).
$$

That is, $\Phi$ is not a map that preserves the operation of adding responses at the same recursion count as addition of relation labels. Adding generation procedures first and then introducing, and introducing first and then adding labels, are different computations. This allows discarding the magnitude of positive coefficients, having relation labels greater than zero, and retaining additive cancellation at the same time.

Conversely, no introduction discards differences in $b$, preserves addition of outputs at the same recursion count, and also retains additive cancellation and nonzeroness. Indeed, suppose that a map $\Phi'$ from generation records to $\mathsf L$ (or to another type in which additive cancellation holds) satisfies the following three conditions. (i) It discards differences between positive coefficients: if $b,c>0$, then $\Phi'(G(q,b))=\Phi'(G(q,c))$. (ii) It preserves addition of outputs at the same recursion count: $\Phi'(G(q+r,b+c))=\Phi'(G(q,b))+\Phi'(G(r,c))$. (iii) Nonzeroness: $\Phi'(G(0,1))\ne0$. Putting $x:=\Phi'(G(0,1))$, (i) gives $x=\Phi'(G(0,2))$, and (ii) gives $\Phi'(G(0,2))=x+x$. Hence $x=x+x$, and additive cancellation gives $x=0$, contradicting (iii). This manuscript does not require (ii), and $\Phi$ satisfies (i) and (iii).

This rule does not discard the number of relation operators produced by an operation. For example, a label with four # symbols is not reduced to two # symbols on the grounds that both represent a vicinity of the same rational number.

Correspondences that are preserved can be established individually. For addition of a rational number $r$ and for sign reversal, checking the three cases of the definition gives

$$
\Phi(G(q+r,b))=\Phi(G(q,b))+(0,r),\qquad
\Phi(G(-q,-b))=-\Phi(G(q,b))
$$

Both finite pairs and generation records can be described using the already prepared f representations of rational numbers, integers, and pairs.

### 7.4 Ratios of Linear Expressions from L Alone Are Not Closed

Introducing a formal symbol $\varepsilon$ and reading $(k,a)$ as $a+k\varepsilon$, a fraction formed from a pair of elements of $\mathsf L$ becomes a ratio of linear expressions,

$$
\frac{a+k\varepsilon}{b+l\varepsilon}
$$

At this stage, $\varepsilon$ is not a symbol for which a particular rational number is substituted.

**Proposition 7.2.** Representations consisting only of these ratios of linear expressions are not closed under multiplication by the usual fraction operations.

**Proof.** Since $\varepsilon$ can be represented, closure would require $\varepsilon^2$ to be representable as well. Suppose that

$$
\varepsilon^2=\frac{a+k\varepsilon}{b+l\varepsilon}
$$

Then $b\varepsilon^2+l\varepsilon^3=a+k\varepsilon$ as an equality of finite polynomials. Comparing coefficients requires $a=k=b=l=0$. But the denominator must not be zero. This is a contradiction. □

This counterexample concerns fractions of $\mathsf L$ under the interpretation as ratios of linear expressions; it does not rule out other interpretations of the relation operators. M in Section 8 allows arbitrary finite degrees, so this failure of closure does not apply to fractions of M. The map from L to M sends the rational component to the constant coefficient and the integer component to the linear coefficient.

## 8. M-polynomials, Fε, and adjoining elements as needed

In this section, we construct the rational-coefficient polynomials M, into which L is embedded, and their fractions Fε, and we examine the order on Fε, the standard part, and the scope of representation (§8.1–8.6). We then construct generative complex numbers and generative quaternions with coefficients in Fε (§8.7–8.8), prove the conditional minimality that justifies choosing Fε (§8.9), and construct a type T having a positive element whose square is two (§8.10).

### 8.1 Representing M-polynomials by finite coefficient sequences

A value of $\mathsf M$ is represented by a finite sequence of rational numbers $(a_0,\ldots,a_d)$ and read as $a_0+a_1\varepsilon+\cdots+a_d\varepsilon^d$. We call this an **M-polynomial**.

As a symbol string, it is the nested pair `(a₀,(a₁,(…,(a_d,f())…)))`. The subscripts, the ellipsis, and the coefficient names are explanatory symbols used only here; in each individual finite example, they are all expanded. Since the position of a coefficient encodes its degree, neither the character ε nor exponents need to be written inside a fully expanded value. Zero coefficients on the highest-degree side are removed. Since removing them from the zero polynomial leaves nothing, the zero polynomial is represented by the empty sequence `f()`, and no degree is assigned to it. Equality of representations is agreement of the normalized coefficient sequences.

Addition is coefficientwise addition. The $n$th coefficient of a product is defined by the finite sum

$$
(ab)_n=\sum_{i+j=n}a_i b_j
$$

The indices range only within the finite sequences. The laws of addition are obtained by applying the laws of rational numbers to each component. Commutativity of multiplication is obtained by interchanging the summation indices $i,j$, and associativity follows because, under either parenthesization, the $n$th coefficient is $\sum_{i+j+k=n}a_i b_j c_k$. Distributivity also follows by expanding finite sums. Zero is the empty sequence, one is the singleton sequence with coefficient one, and the additive inverse negates each coefficient. Hence M is a commutative ring.

The product of the leading coefficients of nonzero polynomials $p,q$ is nonzero, so $\deg(pq)=\deg p+\deg q$. Hence M has no zero divisors.

### 8.2 Fraction representations and the four arithmetic operations

A pair $p,q:\mathsf M,\ q\ne0$ is a fraction representation, and representations are identified by

$$
\frac pq=_{\mathsf F_\varepsilon}\frac rs
\quad:\Longleftrightarrow\quad ps=rq
$$

We call $\mathsf F_\varepsilon$ the **finite rational-expression numbers**. It has operations of the same form as those of the external notation $\mathbb Q(\varepsilon)$, but the definition here uses the coefficients already constructed and procedures on finite sequences.

The four arithmetic operations are defined by the same fraction formulas as in §5.3. Nonzero denominators, transitivity of equality, and independence of the operations from the representation can be proved by the same cross-product calculations as in Section 5, using the absence of zero divisors among polynomials.

**Theorem 8.1.** $\mathsf F_\varepsilon$ is a commutative field. The map $\mathsf Q\to\mathsf M$ to constant polynomials and the map $\mathsf M\to\mathsf F_\varepsilon$ given by $p\mapsto p/1$ are injective and preserve zero, one, sums, and products. Also, the map $\mathsf L\to\mathsf M$ given by $(k,a)\mapsto a+k\varepsilon$ is injective and preserves zero and addition.

**Proof.** For associativity and commutativity of addition and multiplication, and for distributivity, pass to common denominators and apply the polynomial laws. Zero $0/1$ and one $1/1$ are distinct, and the inverse of a nonzero $p/q$ is $q/p$. Injectivity of the maps from Q and L to M follows by comparing the coefficients of constant or linear polynomials. Injectivity of the map from M to Fε follows because $p/1=r/1$ is equivalent to $p=r$. The preservation laws follow from coefficientwise calculations and the fraction formulas. Hence fractions of M-polynomials with nonzero denominators are closed under the four arithmetic operations, excluding division by zero. □

### 8.3 gcd and a unique normal form

For $q\ne0$, polynomial division stops if the dividend is zero or its degree is less than $\deg q$; otherwise, it subtracts $q$ multiplied by a power of $\varepsilon$ and by the ratio of the leading coefficients. The leading term vanishes and the degree strictly decreases, so the procedure terminates. The outputs $h,r$ satisfy $p=hq+r$ and either $r=0$ or $\deg r<\deg q$.

Using this remainder, run Euclid's procedure and make the leading coefficient of the gcd one. The common-divisor invariant and the identity $g=up+vq$ obtained by tracing the coefficients backward can be proved by the same steps as in §5.1. The following normalization can therefore be defined as a finite procedure.

1. If $p=0$, return $(0,1)$.
2. Compute $g=\gcd(p,q)$ and divide the numerator and denominator by $g$.
3. Divide the numerator and denominator by the leading coefficient $c\ne0$ of the resulting denominator.

The numerator and denominator thereby become coprime, and the leading coefficient of the denominator becomes one. Since rational coefficients are held in reduced form, there is no need for a separate procedure that removes integer common divisors.

**Theorem 8.2 (Uniqueness of normalization).** The procedure above preserves the value and returns a unique normal form.

**Proof.** Each step divides both the numerator and the denominator by the same nonzero polynomial or the same nonzero coefficient, so it preserves cross-product equality. The only normal form of zero is the $(0,1)$ of step 1. For coprime $p,q$, one obtains $up+vq=1$. If normalized nonzero representations satisfy $p/q=r/s$, then $ps=rq$ gives $s=ups+vqs=q(ur+vs)$, so $q$ divides $s$. The converse also holds, so the degrees are equal and the quotient of each by the other is a nonzero constant. Both denominators have leading coefficient one, so $q=s$, and since there are no zero divisors, $p=r$. □

### 8.4 An order that reads ε as a positive infinitesimal direction

For a nonzero polynomial $p$, among the terms whose coefficients are nonzero, let $\nu(p)$ be the degree of the term of lowest degree (the least nonzero degree), and let $c_0(p)$ be its coefficient. For a nonzero fraction, define

$$
\operatorname{sgn}\left(\frac pq\right)
:=\operatorname{sgn}(c_0(p))\operatorname{sgn}(c_0(q))
$$

and define $x<y$ to mean that $y-x$ has positive sign. Merely making the leading coefficient of the denominator one does not fix the sign of its least-degree coefficient, so the sign of the numerator alone must not be examined. For example, in $(\varepsilon-\varepsilon^2)/(-1+\varepsilon)$, the $c_0$ of the numerator is $1$, but the $c_0$ of the denominator, whose leading coefficient is one, is $-1$, so this fraction is negative (reducing it gives $-\varepsilon$).

**Theorem 8.3.** With this order, $\mathsf F_\varepsilon$ is an ordered field.

**Proof.** If $ps=rq$, the coefficients at the least nonzero degrees of the two sides agree, so $\operatorname{sgn}(c_0(p))\operatorname{sgn}(c_0(s))=\operatorname{sgn}(c_0(r))\operatorname{sgn}(c_0(q))$, and the sign defined above is independent of the representation. The sign of a product is the product of the signs.

Take two positive fractions. If necessary, multiplying both the numerator and the denominator by $-1$ (which does not change the value) makes the least-degree coefficient of each denominator positive. Since the fraction is positive, the least-degree coefficient of the numerator is then also positive. In the numerator $ps+rq$ of the sum, if the two terms have different least degrees, the positive coefficient of the lower one remains; if they are equal, the sum of the two positive coefficients remains. Hence the sum of two positive elements is positive. Every nonzero element is exactly one of positive and negative. These facts and the definition by differences give totality, transitivity, preservation under translation, and preservation under multiplication by positive elements. □

In this order, $0<\varepsilon<r$ for every positive rational number $r$. Indeed, the least-degree coefficient of $r-\varepsilon$ is $r>0$. Moreover, $\varepsilon^{-1}$ is greater than every positive rational number. There is no smallest positive element. This is because $0<x/2<x$ for positive $x$. Restricting the order to M gives an ordered ring. The embedding of L into M compares the rational components first and, when they are equal, the integer components of the relation operators, so it preserves the order of Section 7.

When the relation operators are used in M, define $P^\#:=P+\varepsilon$ and $P^\flat:=P-\varepsilon$. Repeated application is the addition or subtraction of $\varepsilon$ corresponding to the integer component of the relation operators and agrees with the procedure on L. However, M also contains $P+\varepsilon/2$, and $P<P+\varepsilon/2<P^\#$. The adjacency of §7.2 is a property only within L and does not hold throughout M or Fε.

Composing the introduction map with this embedding gives $\Phi(G(q,b))\mapsto q+2\varepsilon$ from positive $b$ and $q-2\varepsilon$ from negative $b$. Thus `0##` is $2\varepsilon>0$ and `0####` is $4\varepsilon$, and the two are distinct. Like the operations of L (§7.3), the operations of M and Fε do not discard these coefficients on the grounds that $b$ was discarded at introduction. The connection with approximation is described in §9.11.

### 8.5 The standard part is restricted to the finite part

For a nonzero fraction, put $v(p/q)=\nu(p)-\nu(q)$. The cross-product equality shows that this integer is independent of the representation. Zero and the elements satisfying $v(x)\ge0$ are called the **finite part** $\mathsf O_\varepsilon$.

By removing a common power of $\varepsilon$ from the numerator and denominator, every element of the finite part has a representation with $q(0)\ne0$. Using such a representation, define

$$
\operatorname{st}:\mathsf O_\varepsilon\longrightarrow\mathsf Q,
\qquad \operatorname{st}(p/q):=p(0)/q(0)
$$

and call $\operatorname{st}$ the **standard part**. Here “substituting zero” is the procedure of extracting the constant term of a finite coefficient sequence.

**Theorem 8.4.** $\mathsf O_\varepsilon$ is closed under addition and multiplication, and $\operatorname{st}$ is a unital ring homomorphism.

**Proof.** Zero and one belong to the finite part, and since negation does not change the constant term of the denominator, additive inverses also belong to the finite part. Choose two representations whose denominators have nonzero constant terms. The denominators of their sum and product also have nonzero constant terms, so the results stay in the finite part. Substituting zero into the cross products shows that the standard part is independent of the representation. Applying constant-term extraction to the fraction formulas for sums and products directly gives preservation of addition and multiplication, and the image of one is one. □

This is not a map on all of Fε. If it were extended to the whole field while requiring both $\operatorname{st}(\varepsilon)=0$ and preservation of multiplication, then

$$
1=\operatorname{st}(\varepsilon\varepsilon^{-1})
=0\cdot\operatorname{st}(\varepsilon^{-1})=0
$$

which is a contradiction. The condition excluding $\varepsilon^{-1}$ from the domain is essential.

### 8.6 Scope of representation

We check the range of relations that Fε can handle and, when another relation is needed, specify a construction that adds it.

**Proposition 8.5.** No element of $\mathsf F_\varepsilon$ satisfies $x^2=2$.

**Proof.** If a nonzero $p/q$ satisfied it, then $p^2=2q^2$. Comparing degrees gives $\deg p=\deg q$, and the ratio of the leading coefficients would be a rational number $r$ satisfying $r^2=2$. However, if a reduced $m/n$ satisfied that condition, then $m^2=2n^2$. By a case distinction on the parity of natural numbers, if a square is even, so is its base, so one can write $|m|=2k$. Substituting gives $n^2=2k^2$, so $n$ is also even. This contradicts the fraction being reduced. □

Consequently, a calculation requiring an element whose square is two cannot be carried out while staying within Fε. In §8.10, we prepare a type T of finite pairs that preserves Fε and construct that element.

As another boundary, Fε has no element satisfying $x^2=\varepsilon$ either. For nonzero elements, $v(xy)=v(x)+v(y)$, so such an $x$ would require the integer equality $2v(x)=1$, contradicting parity. If this relation is needed, suitable operations on finite pairs or a suitable representation of exponents are defined separately.

An interval-generating label for the square root is a separate representation that specifies a program returning rational intervals. We do not identify it with an element of Fε; §9.10 proves its relationship to an element of T. For pi as well, no representation as a finite rational expression in Fε is given. §9.4 handles finite responses of an alternating sum, and Appendix B constructs an exact rational-cut description of pi in a separately specified type.

### 8.7 Generative complex numbers

For $a,b:\mathsf F_\varepsilon$, form

$$
J(a,b):=\begin{pmatrix}a&-b\\ b&a\end{pmatrix}
$$

We call this type the **generative complex numbers** and denote it by $\mathsf C_\varepsilon$. Calculating the matrix entries gives the sum and product of $J(a,b)$ and $J(c,d)$ as

$$
\begin{aligned}
J(a,b)+J(c,d)&=J(a+c,b+d),\\
J(a,b)J(c,d)&=J(ac-bd,ad+bc)
\end{aligned}
$$

so this type is closed under them. Equality is equality of the two components. Setting $i:=J(0,1)$ gives $i^2=J(-1,0)$, and the multiplicative identity is $J(1,0)$.

**Theorem 8.6.** $\mathsf C_\varepsilon$ is a commutative field.

**Proof.** Commutativity, associativity, and inverses for addition follow componentwise. Multiplication is commutative, as expanding the two-component formula above shows. For a product of three factors, the first component is $ace-adf-bcf-bde$ and the second is $acf+ade+bce-bdf$ under either parenthesization, so associativity follows. Distributivity also follows from the same two-component expansion.

If $J(a,b)\ne J(0,0)$, then $a^2+b^2>0$ in the ordered field $\mathsf F_\varepsilon$. Hence

$$
J(a,b)^{-1}
=J\left(\frac a{a^2+b^2},\frac{-b}{a^2+b^2}\right)
$$

can be formed, and the product has first component one and second component zero. □

This construction fixes the coefficients in Fε and is distinct from the whole of the classical complex numbers. Theorem 8.6 has a hand-written proof. Encoding and decoding of values and checking of the matrix-layout conditions are implemented, but arithmetic programs dedicated to generative complex numbers and machine proofs of the general laws are not included.

### 8.8 Generative quaternions as pairs of generative complex numbers

Without changing the representation of generative complex numbers, define conjugation by $\overline{J(a,b)}:=J(a,-b)$. Calculations on the two components show that conjugation preserves sums and products and that applying it twice returns the original element. Also, for $z=J(a,b)$, one has $z\overline z=J(a^2+b^2,0)$. Below, $J(r,0)$, which has only a real component, is written with the same symbol as the coefficient $r:\mathsf F_\varepsilon$.

Define the type of generative quaternions by

$$
\mathsf H_\varepsilon:\ (z,w),\qquad z,w:\mathsf C_\varepsilon
$$

Fix its reading as $z+wj$, and define addition and multiplication by

$$
\begin{aligned}
(z,w)+(u,v)&:=(z+u,w+v),\\
-(z,w)&:=(-z,-w),\\
(z,w)(u,v)&:=(zu-w\overline v,\;zv+w\overline u)
\end{aligned}
$$

Equality is equality of the two generative complex components. Thus the type of the symbol string is `(generative complex number,generative complex number)`, and the four-entry matrix layout of each generative complex number is retained as it is. Making the type a pair does not by itself determine multiplication, so the rule above, which involves conjugation, is given separately.

For $a,b,c,d:\mathsf F_\varepsilon$, the correspondence is

$$
a+bi+cj+dk\quad\longleftrightarrow\quad
\bigl(J(a,b),J(c,d)\bigr)
=\bigl(((a,-b),(b,a)),((c,-d),(d,c))\bigr)
$$

Further expanding the coefficients on the right-hand side and their negatives through Fε, M, rational numbers, integers, and natural numbers, in this order, yields a finite symbol string consisting only of f, parentheses, and commas (the intermediate notation of §2.6), which the conversion $E$ of §2.6 moves into f-only notation. Minus signs can be eliminated by the procedure that constructs the sign component of an integer.

**Theorem 8.7.** $\mathsf H_\varepsilon$ is an associative noncommutative division ring and contains $\mathsf F_\varepsilon$ as a subfield of its center.

**Proof.** The additive-group laws and distributivity follow from the component laws and the preservation of addition by conjugation. To check associativity, use the two-by-two matrix with generative complex entries

$$
\Theta(z,w)=
\begin{pmatrix}z&-w\\\overline w&\overline z\end{pmatrix}
$$

Multiplying the entries gives $\Theta((z,w)(u,v))=\Theta(z,w)\Theta(u,v)$. Associativity of matrix multiplication is obtained by expanding each entry as a finite sum and applying associativity and distributivity of generative complex numbers. Since $z,w$ can be recovered from the first row, $\Theta$ is injective, and hence multiplication of generative quaternions is also associative. The multiplicative identity is $(1,0)$.

For $h=(z,w)$, $z=J(a,b)$, and $w=J(c,d)$, put $\overline h:=(\overline z,-w)$ and

$$
N(h):=z\overline z+w\overline w=a^2+b^2+c^2+d^2
$$

The definition of multiplication gives $h\overline h=\overline h h=(N(h),0)$. If $h\ne0$, at least one component is nonzero, and positivity in the ordered field Fε gives $N(h)>0$. Hence

$$
h^{-1}=\left(\frac{\overline z}{N(h)},\frac{-w}{N(h)}\right)
$$

is a two-sided inverse. Here division of a component is defined as multiplication by a nonzero Fε coefficient.

Setting $i=(J(0,1),0)$, $j=(0,1)$, and $k=(0,J(0,1))$, direct calculation of the products gives

$$
i^2=j^2=k^2=-1,\qquad ij=k,\qquad ji=-k.
$$

If $k=-k$, then $J(0,1)=J(0,-1)$, that is, $1=-1$ in Fε; this does not occur, because Fε contains Q. Hence $k\ne-k$, and multiplication is noncommutative. Elements of Fε are embedded by $r\mapsto(J(r,0),0)$; they are unchanged by conjugation and commute with all components, so they belong to the center. □

In division of generative quaternions, the order of the factors is not omitted. Right division $h/g:=hg^{-1}$ and left division $g^{-1}h$ are written distinctly. These generative quaternions built from Fε are likewise distinct from the whole of the quaternions with classical real coefficients. Theorem 8.7 has a hand-written proof, and machine proofs of the general laws are not included.

### 8.9 Minimality when preserving L and generating by the four arithmetic operations

Adopting ratios of polynomials is not unconditionally forced by the premises. However, if the structure to be preserved is specified as follows, that choice is uniquely determined by the conditions.

**Theorem 8.8 (Conditional minimality).** Suppose that a representation system $E$ has the operations and laws of an ordered field, together with a map $j:\mathsf Q\to E$ preserving the operations of rational numbers, zero, and one, and a map $i:\mathsf L\to E$ preserving the addition and strict order of $\mathsf L$. Suppose also that $i(0,a)=j(a)$. Let $A$ be the collection of all elements of $E$ that can be built from elements of $i(\mathsf L)$ by finitely many applications of the four arithmetic operations, excluding division by zero. Then there exists exactly one ordered-field isomorphism (a bijection preserving the four arithmetic operations and the order) $\mathsf F_\varepsilon\to A$ that sends $a+k\varepsilon$ to $i(k,a)$.

**Proof.** Put $e:=i(1,0)$. Preservation of addition gives $i(k,a)=j(a)+ke$. Since the order of L is preserved, $0<e<j(r)$ for every positive rational number $r$. In what follows, $j$ is omitted.

Write a nonzero polynomial as $P(X)=X^m(c_0+c_1X+\cdots+c_dX^d)$ with $c_0\ne0$, and compute the finite rational number $H=\sum_{l=1}^d|c_l|$. Since $e<1$ and $e<|c_0|/[2(H+1)]$,

$$
\left|\sum_{l=1}^dc_le^l\right|\le eH<|c_0|/2.
$$

Hence $P(e)$ is nonzero, and its sign agrees with that of $c_0$. This estimate is obtained using only inequalities for finite sums. In particular, substituting into a nonzero polynomial that serves as a denominator does not give zero, so $P(\varepsilon)/Q(\varepsilon)\mapsto P(e)/Q(e)$ can be defined. Cross products show that this map is independent of the representation and injective, and the fraction formulas and the sign estimate above show that it preserves the four arithmetic operations and the order.

This image contains Q and $e$ and is closed under the four arithmetic operations. Hence the image contains $i(\mathsf L)$ and, by structural induction on finite expressions, contains $A$. Conversely, each element of the image can be formed from rational coefficients and $e$ by finitely many additions, multiplications, and reciprocals, and therefore belongs to $A$. Hence the image coincides with $A$. The map is unique, because the images of the rational numbers and $\varepsilon$ determine the images of all polynomial ratios. □

Since $A$ is defined as the range of formation of the permitted finite expressions, there is no need to define a smallest field by intersecting arbitrary subsets.

This theorem says nothing about interpretations that drop order preservation, about the choice of an introduction map from generation records into L, or about constructions that incorporate generative labels as coefficients. Nor does this theorem change the non-additivity of the introduction map. It is a theorem that strengthens the decision to use M and Fε under the explicitly stated preservation conditions.

### 8.10 Adjoining a needed element and calculating in a fixed type

For a calculation that cannot be expressed in Fε alone, a type that can handle that calculation is prepared first. Here we adjoin one positive element whose square is two. This does not provide √ as a primitive symbol or as a built-in general operation.

Abbreviate $F=\mathsf F_\varepsilon$, and take finite pairs $(a,b)$ of elements of F as the values of a new type T. Read $(a,b)$ as $a+b\sigma$. Here $\sigma$ abbreviates the pair $(0,1)$, and the multiplication rule below gives $\sigma^2=(2,0)$. Equality is componentwise equality, zero and one are $(0,0),(1,0)$, and we define

$$
(a,b)+(c,d)=(a+c,b+d),\qquad -(a,b)=(-a,-b),
$$

$$
(a,b)(c,d)=(ac+2bd,ad+bc)
$$

Put $N(a,b)=a^2-2b^2$. Then $N(a,b)\ne0$ for nonzero pairs. Indeed, if $b=0$, then $a\ne0$, so $N=a^2\ne0$. If $b\ne0$ and $N=0$, then $(a/b)^2=2$, contradicting Proposition 8.5. For the conjugate $\overline{(a,b)}:=(a,-b)$, one has $(a,b)\,\overline{(a,b)}=(N(a,b),0)$. Hence

$$
(a,b)^{-1}=\left(\frac a{a^2-2b^2},\frac{-b}{a^2-2b^2}\right)
\quad((a,b)\ne(0,0))
$$

can be defined. Normalizing the components in F also makes the normal form in T unique, and equality and the four arithmetic operations become finite procedures. Division by zero remains undefined.

The sign of a nonzero pair is the sign of $a$ if $N>0$, and the sign of $b$ if $N<0$. In this case distinction, the component used for the decision is always nonzero. Define $x<y$ to mean that $y-x$ has positive sign.

**Theorem 8.9 (Ordered-field extension by finite pairs).** The rules above give an ordered field $\mathsf T$. The map $\iota(a)=(a,0)$ is injective and preserves zero, one, addition, subtraction, multiplication, division wherever defined, and the order of F. The element $\sigma=(0,1)$ is positive, satisfies $\sigma^2=\iota(2)$, and does not belong to $\iota(F)$.

**Proof.** The ring laws are obtained by expanding the components using the laws of F. For example, the first component of a product of three pairs is $ace+2bde+2adf+2bcf$ under either parenthesization, and the second is $acf+2bdf+ade+bce$. The inverse of a nonzero pair is given by the formula above, and the product is $(1,0)$. Zero and one are distinct by componentwise equality, so T is a commutative field.

For the order, direct expansion gives $N(xy)=N(x)N(y)$. Consider the product of two positive elements $x=(a,b),y=(c,d)$. If both values of $N$ are positive, then $a,c>0$ and $ac>2|bd|$ make the first component positive. If both values of $N$ are negative, then $b,d>0$ and $2bd>|ac|$ make the first component positive. In these cases $N(xy)>0$, so the product is positive by its first component, which is the one used for the decision. If the signs of $N$ differ, we may take $x$ to be the element with positive $N$; then $a,d>0$ and $ad>|bc|$ make the second component positive. In this case $N(xy)<0$, so the product is positive by its second component, which is the one used for the decision. These inequalities involving absolute values are obtained by comparing the squares of both sides within F. For example, if both values of $N$ are positive, then $a^2c^2>(2b^2)(2d^2)=(2bd)^2$.

An inverse is nonzero, and its sign is decided by the finite sign test above. If the inverse of a positive $x$ were negative, then $x(-x^{-1})=-1$ would be positive, a contradiction; hence the inverse of a positive element is also positive.

Also, if $x=(a,b)>0$, then $1+x>0$. If $N(x)>0$, then $a>0$, and the claim follows from $N(1+x)=N(x)+2a+1>0$ and the first component $a+1>0$. If $N(x)<0$, then $b>0$. In the case $a+1\ge0$, consider $1+x=(a+1,b)$: if $N(1+x)<0$, the component used for the decision, $b$, is positive; if $N(1+x)>0$, then $(a+1)^2>2b^2>0$ gives $a+1>0$, and the component used for the decision is positive. In the case $a+1<0$, we have $N(1+x)=N(x)+2a+1<N(x)<0$, and the component used for the decision, $b$, is positive. Hence $x+y=x(1+yx^{-1})>0$ for positive $x,y$. Trichotomy for nonzero pairs and sign reversal follow from the definition, and by the properties of positive sums and products, the order defined by differences is a total order preserved under translation and under multiplication by positive elements.

Injectivity of the embedding and preservation of the operations follow from the component formulas. If $a\ne0$, then $N(a,0)=a^2>0$, so $(a,0)$ and $a$ have the same sign, and the order is preserved as well. The element $\sigma$ is positive by $N(0,1)=-2<0$ and its second component $1$, and computing the product gives $\sigma^2=(2,0)$. Since the second component of $\sigma$ is $1$, it is not equal to any $\iota(a)$, whose second component is $0$. The details of each step are given in the [research note on extension by finite pairs](../research/extension-example-v1.5.9.md). □

Henceforth, where unambiguous, an embedded value of F is abbreviated as $a$. If a positive $\tau$ in T also satisfies $\tau^2=2$, then $(\tau-\sigma)(\tau+\sigma)=0$ and $\tau+\sigma>0$ give $\tau=\sigma$. In this sense, $\sqrt2$ can be used as an abbreviation for $\sigma$.

**Corollary 8.10 (Calculation in a fixed type).** If the number type is T from the outset and we use $\sigma=(0,1),\ 1=(1,0)$, then

$$
(\sigma+1)(\sigma-1)=(1,1)(-1,1)=(1,0),
$$

$$
\frac1{\sigma-1}=(-1,1)^{-1}=(1,1)=\sigma+1
$$

The inputs, intermediate results, and outputs all stay within the same type, and no type inference or automatic promotion is needed during execution.

**Proof.** The components of the first product are $-1+2=1$ and $1-1=0$. For the second, verify $N(-1,1)=-1\ne0$ and apply the inverse formula. □

The $\varepsilon$ of F is preserved as $(\varepsilon,0)$, and $0<(\varepsilon,0)<(r,0)$ holds for every positive rational number $r$. Since T is also a type of finite pairs, the conversion $E$ of §2.6 sends $(a,b)$ to `f(E(a)E(b))`, and individual values can be expanded into f-only notation.

If an approximation is needed, choose bisection from §9.3 or Newton's method from §9.7. If nonnegative rational endpoints satisfy $l^2\le2\le u^2$, then $\iota(l)\le\sigma\le\iota(u)$ also holds in the order of T (Proposition 9.5). For example, when a width of at most $1/8$ is requested, bisection returns $[11/8,3/2]$ and Newton's method with width-based termination returns $[24/17,17/12]$, each after finitely many steps. The squares of the endpoints are $(11/8)^2=121/64<2<9/4=(3/2)^2$ and $(24/17)^2=576/289<2<289/144=(17/12)^2$, and the width of the latter is $1/204$. Both responses enclose the same $\sigma$, but the definitions of equality and operations in T do not change with the choice of generator. The interval-generating label is kept with its contract unchanged, and its responses are used when needed (§9.10). A guarantee at rational precision $2^{-p}$ is distinct from a guarantee at precision specified by every positive element, including those smaller than $\varepsilon$ (§9.9).

Generalizing this example gives the following procedure. For the required conditions, check the finite representation, operations, equality, and required preservation properties, and prepare the type; then fix the type and calculate. Arbitrary conditions cannot be adjoined unconditionally; each condition requires checking. Theorem 8.9 and Corollary 8.10 have hand-written proofs. The encoding of finite pairs and the recomputation of the two products $(1,1)(1,-1)=(-1,0)$ (§2.7) and $\sigma^2=(2,0)$ are covered by execution checks, but no general arithmetic program dedicated to T is included.

## 9. Connecting the Constructions — Finite Traces and Responses to Precision Requests

This section treats operations that join computation histories, procedures that respond to precision requests, and differentiation and integration of polynomials, and establishes their guarantees. Separately from exact arithmetic on numbers, we provide a mechanism for obtaining approximations when they are needed. The construction of numbers and their applications are not separated into different foundations; they are connected through the same conventions for formation, operations, and evidence.

In connecting with Sections 6–7, we distinguish **execution of a generation procedure, introduction of a relation label, and response to a precision request**. Executing the generation record $G(q,b)$ retains the coefficient $b$ and returns $Q_{q,b}(n)=q+b/(n+1)$. The introduction $\Phi(G(q,b))=(2\operatorname{sgn}b,q)$ forgets the magnitude of $b$, does not transport pointwise addition or comparison of generation procedures, and does not compute approximations either (§6.3, §7.3). The interval procedures below guarantee each response through rational arithmetic and explicitly stated invariants.

Here $n$ denotes the recursion count of a generation procedure, $k$ the signed count in a relation representation, and $p$ the requested precision. Advancing $n$ does not increase $k$, and raising $p$ is not the same operation either. Indices of finite sums, names of histories, and the like are read as local variables defined where they appear.

Finite checking examples and the scope of the implementation are collected in the [application research notes](../research/applications-v1.5.9.md). The connection to the type T containing σ is given in §9.10 and in the [research notes on the extension example](../research/extension-example-v1.5.9.md), and rational approximation of elements with an infinitesimal direction is given in §9.11.

### 9.1 A Category of Computation Traces Described Using Arrows Alone

From constructions between which one-step transitions are permitted, we form finite sequences of transitions as computation traces. A history of length zero also records the construction at its position. Equality of arrows is syntactic identity of histories, and identity arrows are empty histories. For a history $h$, let $d(h),c(h)$ be the empty histories at its start and end, and define the composition $k\circ h$, which concatenates $k$ after $h$, exactly when $c(h)\equiv d(k)$. If $w$ is the transition sequence of $h$ and $v$ that of $k$, then the transition sequence of $k\circ h$ is the concatenation `w++v`. Concatenation is defined by `[]++v=v` and `(e::t)++v=e::(t++v)`.

The composite $k\circ h$ is a valid history from the start of $h$ to the end of $k$, and hence satisfies $d(k\circ h)=d(h)$ and $c(k\circ h)=c(k)$. We prove this by structural induction on $w$. If $w$ is empty, the start and end of $h$ are the same construction, so the result is $k$ itself. If $w=e::t$, then $t$ is a valid history from the end construction of $e$ to the end of $h$. By the induction hypothesis, `t++v` is a valid history from that construction to the end of $k$, and placing the valid transition $e$ at its front gives a valid history from the start of $h$ to the end of $k$.

Of the unit laws, $h\circ d(h)=h$ is `[]++w=w`, which is the definition of concatenation itself. The law $c(h)\circ h=h$ is `w++[]=w` and follows by structural induction on $w$. We have `[]++[]=[]`, and if `t++[]=t`, then `(e::t)++[]=e::(t++[])=e::t`. Associativity of composition is associativity of concatenation of finite sequences and can be proved by structural induction on the first sequence. For three connectable histories, the boundary equalities above ensure that the composite under either parenthesization is defined. We thus obtain a category with an arrow-only description, in which identity arrows specify boundaries in place of objects. The validity of composition and the boundary equalities have hand-written proofs, and the three laws of concatenation have also been machine-checked as finite proof data (§10.2).

Here, different histories leading to the same result are not taken to be the same arrow. If such an identification is added, it must be proved separately that composition is independent of representatives. The description of objects by identity arrows itself already appears in the original paper of Eilenberg–Mac Lane. This manuscript makes that description concrete using the finite computation traces it has constructed. [Eilenberg–Mac Lane, 1945, p.238](https://people.math.osu.edu/cogdell.1/6112-Eilenberg%26MacLane-www.pdf)

Examples with inverse arrows can also be built from generative labels. Let $(P,z)$, which retains a base label $P$ and an integer $z$, be the label returning $P(n)+z$ in the sequence type and $[L_p+z,U_p+z]$ in the interval type. Setting $\mathrm{Shift}_s(P,z):=(P,z+s)$, the laws of integer addition give

$$
\mathrm{Shift}_0=\mathrm{id},\qquad
\mathrm{Shift}_t\circ\mathrm{Shift}_s=\mathrm{Shift}_{s+t},\qquad
\mathrm{Shift}_{-s}\circ\mathrm{Shift}_s=\mathrm{id}
$$

Interval widths do not change, and termination and nesting are preserved. This is a translation of values; it is distinct from changing the input to $n+z$ and from movement in the ε direction by the relation operator #.

Give the arrow $\tau(P,z;s)$ the identity arrow of $(P,z)$ as its source boundary and the identity arrow of $(P,z+s)$ as its target boundary, and define the composition of arrows with matching boundaries by

$$
\tau(P,z+s;t)\circ\tau(P,z;s)=\tau(P,z;s+t)
$$

This yields a category in which every arrow has an inverse. Associativity is associativity of integer addition, the identity arrows are the arrows with translation amount zero, and the inverse of $\tau(P,z;s)$ is $\tau(P,z+s;-s)$. No decision of semantic equality between different base labels is needed; it suffices to retain the syntax of the base label and the normalized integer. The formation rules are collected in the [computation-trace extensions](../research/trace-extensions-v1.5.9.md).

### 9.2 Interval-Generating Labels That Respond to Precision Requests

Consider a generator that, for a precision $p:\mathsf N$, returns a closed rational interval $I_p=[L_p,U_p]$ together with evidence of $L_p\le U_p$ and $U_p-L_p\le2^{-p}$. This manuscript uses the nested type, which satisfies $I_{p+1}\subseteq I_p$. Inclusion abbreviates rational comparisons of the lower and upper endpoints and does not presuppose operations on arbitrary sets. The key point is to guarantee not only the widths but also the consistency between responses.

A finite description retaining this program and the necessary information is called an **interval-generating label**. Its contract consists of three items: responding finitely to each request, guaranteeing the precision, and being nested. Not every program satisfies the contract.

Interval-generating labels form a specified type distinct from the relation labels of L. Attaching # or ♭ to the upper and lower endpoints, or applying Φ to generation records approaching the respective endpoints, does not by itself construct an exact element common to all responses of the interval sequence. To read the responses as approximations to an exact element already constructed, one shows that the element lies in the returned intervals. For σ, Proposition 9.5 provides this connection.

Two interval-generating labels $I,J$ are **response-compatible** if, for any finite precisions $p,q$,

$$
\max(L^I_p,L^J_q)\le\min(U^I_p,U^J_q)
$$

holds. This condition requires responses at different precisions to intersect as well; agreement of a few examples at the same precision is not enough.

Response compatibility is reflexive, symmetric, and transitive. Reflexivity follows from nesting and $L_p\le U_p$, and symmetry from the form of the definition. Whether two fixed responses intersect or are separated by a positive rational gap can be decided by a finite comparison of endpoints. To prove transitivity, suppose that $I$ and $J$, and $J$ and $K$, are response-compatible. If $I_p$ and $K_q$ do not intersect, then $d:=\max(L^I_p,L^K_q)-\min(U^I_p,U^K_q)>0$. Since $J_r$ intersects both for every $r$, it straddles this gap, and its width is at least $d$. On the other hand, rational arithmetic finds, in finitely many steps, an $r$ such that $2^{-r}<d$, a contradiction. This argument concerns rational endpoints; it does not assert that rational precision separates every positive element of Fε.

This manuscript does not form a coefficient field by identifying all response-compatible labels. Syntactic identity, agreement of individual responses, and response compatibility over all requests are kept distinct, and compatibility is proved for the pairs where it is needed. Nor do we assume a procedure that automatically decides response compatibility of two arbitrary programs.

**Proposition 9.1 (Composition of labels by interval arithmetic).** From interval-generating labels satisfying the contract, labels for sums, differences, and products can be constructed by finite processing. For a reciprocal, additionally supply **evidence of separation from zero**: the response to some request $r_0$ lies on the $[d,\infty)$ side or the $(-\infty,-d]$ side, where $d>0$ is rational.

**Proof.** Interval sums and differences add or subtract endpoints, and interval products take the minimum and maximum of the four endpoint products. Let $x\in[a_1,a_2]$ and $y\in[b_1,b_2]$. Fixing $y$ makes $xy$ a linear expression in $x$, so its value lies between $a_1y$ and $a_2y$. Since $a_1y$ and $a_2y$ are also linear expressions in $y$, they lie between the minimum and maximum of the four endpoint products. Hence the product of subintervals is contained in the product of the original intervals. For sums and differences, and for reciprocals on the same side of zero, the same inclusion follows from monotonicity in the endpoints.

From the initial intervals, find rational numbers $A,B$ such that every response of $I$ has absolute value at most $A$ and every response of $J$ has absolute value at most $B$. The width of a sum or difference is at most the sum of the input widths, and the width of a product is at most $A\operatorname{width}(J)+B\operatorname{width}(I)$. This estimate is obtained by splitting the difference of two endpoint products as $xy-x'y'=x(y-y')+y'(x-x')$. Hence input precisions giving at most the target width can be found by rational comparisons and iteration over precisions.

The reciprocal of an interval $[L,U]$ that does not straddle zero is $[1/U,1/L]$. If $|L|,|U|\ge d$, its width is $(U-L)/|LU|\le(U-L)/d^2$. It suffices to make the input precision at least $r_0$ and the width at most $d^2 2^{-p}$. Division is constructed from this reciprocal and multiplication. Replacing the chosen input precision $r(p)$ by $\max(r(0),\ldots,r(p))$ makes it nondecreasing, and by the inclusion above both inputs and outputs are nested. Each stage uses only finitely many rational operations, and the search that reduces a negative power of two below a positive rational threshold terminates. □

**Allocation of precision.** Input precisions can be chosen concretely as follows. For a sum, request precision $p+1$ from both inputs. For a product, let $A,B$ be the maximum absolute values of the endpoints of the responses at precision 0, take the least $s$ satisfying $2^s\ge A+B+1$, and request precision $p+s$ from both inputs. The width is then at most $(A+B)2^{-(p+s)}\le2^{-p}$. Merely requesting the same precision from the inputs while ignoring their overall size cannot guarantee the error of a product. For a reciprocal, when the response $[l,u]$ at precision $r_0$ does not contain zero, let $c=\min(|l|,|u|)>0$, take the least $t$ satisfying $2^t\ge1/c^2$, and request precision $\max(r_0,p+t)$ from the input.

**Preservation of response compatibility.** Suppose that $I,I'$ are response-compatible and that $J,J'$ are also response-compatible. The input responses used to form two output responses intersect on the $I$ side and on the $J$ side. Choosing rational numbers $x,y$ from the respective intersections, the first step of the proof shows that $x+y$ (or $xy$) lies in both output intervals. Hence $I+J$ and $I'+J'$, and $IJ$ and $I'J'$, are also response-compatible. For reciprocals, the same argument applies insofar as both labels have evidence of separation from zero.

The expectation that “the denominator label ought to differ from zero” is no substitute for separation evidence. The reciprocal contract is applied only after a separated interval and its output trace have been obtained; until then, the division expression is retained as conditional syntax (§6.4).

**Classification of zero.** The interval returned for a single request tells one of the following three things about zero.

| Returned interval | Class | What this request shows |
|---|---|---|
| $[0,0]$ | Zero | The response is the single point zero. No reciprocal is defined |
| Does not contain zero | Nonzero | It is separated from zero by a positive rational number, and a reciprocal can be formed |
| Contains zero but is not $[0,0]$ | Unknown | This interval does not separate the value from zero |

“Unknown” is not a proof of zero. For example, the label obtained by subtracting the constant $3/2$ from the bisection label of §9.3, when it requests precision $p+1$ from its input, returns $[-1/2,0]$, $[-1/4,0]$, and $[-1/8,0]$ at precisions $0,1,2$, which are “unknown,” and $[-1/8,-1/16]$ at precision 3, which is “nonzero.” No procedure that searches without limit for a decision about zero is provided.

### 9.3 Bisection for √2

Start with the rational interval $[0,2]$ and compare the square of its midpoint $m$ with two. If $m^2<2$, replace the lower endpoint by $m$; if $m^2>2$, replace the upper endpoint by $m$. If $m^2=2$, make the interval $[m,m]$.

At each stage,

$$
0\le L,\qquad L^2\le2\le U^2
$$

is preserved. Initially, $L^2=0\le2\le4=U^2$. At each stage, $L\le m\le U$; the replaced endpoint satisfies the corresponding square inequality by the result of the comparison, and the endpoint not replaced keeps the inequality of the previous stage. If $m^2=2$, both endpoints satisfy the conditions. The new interval is a subinterval of the old one, and its width becomes at most half. After $p+1$ iterations, the width is at most $2/2^{p+1}=2^{-p}$. A response to the requested precision therefore always terminates after finitely many iterations. This program together with its guarantee can be adopted as an interval-generating label for $\sqrt2$.

This is an example in which each response can be checked using only comparisons of integer and rational squares. There is no need to read a “final value” into a nonterminating expression. For example, if one writes $f=1+1/(2+f)$ on the basis of the appearance of the continued fraction $1+1/(2+1/(2+\cdots))$ of $\sqrt2$, its interpretation as a fixed point is $f^2+f-3=0$. The equation that fits the continued fraction is $f=1+1/(1+f)$, which gives $f^2=2$. Rather than determining a value from the appearance of an expression, we specify a procedure and a guarantee.

### 9.4 Interval Processing for an Alternating Series

Let

$$
S_n:=\sum_{j=0}^{n}\frac{(-1)^j}{2j+1},\qquad
A_m:=4S_{2m},\qquad B_m:=4S_{2m+1}
$$

Direct calculation of the finite sums gives $A_m-B_m=4/(4m+3)>0$. Moreover, $A_m$ is decreasing and $B_m$ is increasing. Grouping the differences two terms at a time shows their respective signs by rational comparison. Hence $[B_m,A_m]$ is a nested sequence of rational intervals. Choosing $m=2^p$ makes the width less than $2^{-p}$.

The description retaining this finite processing is called an interval-generating label for $\Pi$. What is guaranteed directly here is the interval, nesting, width, and finite termination. Appendix B constructs an exact rational-cut description from this processing and proves its identification with conventional pi as a separate theorem using the comparison theory of analysis. The midpoint $(A_m+B_m)/2$ can be returned as a rational approximation, but the midpoint at any finite stage is not taken to be exact pi.

Moreover, a rule setting $B_m^\#=A_m^\flat$ at each stage does not follow from the lexicographic model of Section 7. The difference $A_m-B_m$ is a positive rational number and exceeds any displacement by finitely many # or ♭ symbols. Likewise, the positive-direction introduction $\Phi(G(B_m,b))=(2,B_m)$ and the negative-direction introduction $\Phi(G(A_m,-c))=(-2,A_m)$ (with $b,c>0$) are not equal.

### 9.5 Polynomial Differentiation and Formal Integration

For an independent formal variable $X$, define the formal derivative of $P(X)=\sum_{k=0}^d a_kX^k$, represented by a finite coefficient sequence, as

$$
DP(X)=\sum_{k=1}^d k a_kX^{k-1}
$$

The formulas for the derivative of a sum and of a product can be proved by comparing the coefficients of finite sums. For example, the coefficient arising in degree $i+j-1$ of a product is $(i+j)a_i b_j$, which equals $i a_i b_j+j a_i b_j$.

For a rational number $R>0$ and $|x|,|y|\le R$,

$$
|P(x)-P(y)|\le M_R|x-y|,\qquad
M_R:=\sum_{k=1}^d k|a_k|R^{k-1}
$$

is obtained from the finite factorization $x^k-y^k=(x-y)\sum_{r=0}^{k-1}x^{k-1-r}y^r$. For a requested error $2^{-p}$, putting $\delta=2^{-p}/(M_R+1)$ ensures that $|x-y|\le\delta$ implies $|P(x)-P(y)|\le2^{-p}$. This gives the continuity of polynomials as a concrete conversion of precisions. Because of the $+1$ in the denominator, the same formula can be used even for constant polynomials.

Furthermore, if $|x|,|x+h|\le R$ and $h\ne0$, then

$$
\left|\frac{P(x+h)-P(x)}h-DP(x)\right|
\le C_R|h|,\qquad
C_R:=\sum_{k=2}^d\frac{k(k-1)}2|a_k|R^{k-2}
$$

Indeed,

$$
\frac{(x+h)^k-x^k}{h}-kx^{k-1}
=\sum_{r=0}^{k-1}x^r\bigl((x+h)^{k-1-r}-x^{k-1-r}\bigr)
$$

and, by the factorization above, each term has absolute value at most $(k-1-r)R^{k-2}|h|$, while $\sum_{r=0}^{k-1}(k-1-r)=k(k-1)/2$. To obtain the value of the derivative from a difference quotient within error $2^{-p}$, it suffices to choose a nonzero $h$ satisfying the conditions in the range $|h|\le2^{-p}/(C_R+1)$. Thus the input width for a desired error can be computed by rational arithmetic. For polynomials, this is an example of giving basic response guarantees of analysis as finite processing.

Because the coefficients are rational, $IP(X)=\sum_{k=0}^d a_kX^{k+1}/(k+1)$ can be formed, and coefficient calculation gives $D(IP)=P$. For rational endpoints $a,b$, we call $\mathcal I(P;a,b):=IP(b)-IP(a)$ the formal definite integral. Linearity, the reversal of endpoints $\mathcal I(P;a,b)=-\mathcal I(P;b,a)$, and additivity over intervals $\mathcal I(P;a,b)+\mathcal I(P;b,c)=\mathcal I(P;a,c)$ follow from addition, subtraction, and cancellation. This is a finite-coefficient calculation; neither an integration theory for general functions nor a full identification with classical integration follows from it.

### 9.6 Constructing Interval-Generating Labels from General Alternating Sums

**Theorem 9.2 (Finite alternating sums and a modulus of error).** To a procedure returning a rational term $a_j$ for each finite $j$, supply a proof of $a_j\ge a_{j+1}\ge0$ and a modulus of error that returns a natural number $\mu(p)$ for each $p$ and guarantees $a_{2\mu(p)}\le2^{-p}$. Let $S_n:=\sum_{j=0}^n(-1)^ja_j$ and $M(p):=\max(p,\mu(0),\ldots,\mu(p))$. Then

$$
I_p=[S_{2M(p)+1},S_{2M(p)}]
$$

satisfies the contract of an interval-generating label.

**Proof.** We have $S_{2m}-S_{2m+1}=a_{2m+1}\ge0$. Also,

$$
S_{2m+2}-S_{2m}=-a_{2m+1}+a_{2m+2}\le0,\qquad
S_{2m+3}-S_{2m+1}=a_{2m+2}-a_{2m+3}\ge0.
$$

Hence the intervals are nested as $m$ increases. The function $M$ is nondecreasing, and the width is $a_{2M(p)+1}\le a_{2\mu(p)}\le2^{-p}$. The terms up to $2M(p)+1$ and the finite sums can be computed in finitely many steps. □

This label is also response-compatible with a label obtained from the same sequence of terms using another valid modulus of error. This is because both labels select intervals from the same nested sequence $[S_{2m+1},S_{2m}]$.

This theorem is not a rule for executing arbitrary infinite sums. It is a rule for converting to another finite-response format when a finite-term generation rule, monotonicity, and a modulus of error are provided. §9.4 is a concrete example using $a_j=4/(2j+1)$.

### 9.7 Comparing Responses from Newton's Method and Bisection

Using the upper rational number $u_0=2$, put $l_n=2/u_n$ and $u_{n+1}=(u_n+l_n)/2$. The response at each stage is $[l_n,u_n]$.

**Theorem 9.3.** This processing gives an interval-generating label for the square root and is response-compatible over all requests with the bisection procedure of §9.3.

**Proof.** Initially, $1=l_0\le u_0=2$ and $l_0u_0=2$. Assume $1\le l\le u\le2$ and $lu=2$, and put $u'=(u+l)/2$ and $l'=2/u'$. Since $(u')^2-2=(u-l)^2/4\ge0$, we have $l'\le u'$. Also, $u-u'=(u-l)/2\ge0$. Since $lu=2$ gives $l'=2lu/(u+l)$, we have $l'-l=l(u-l)/(u+l)\ge0$. Hence the intervals are nested and retain the same boundary conditions. It also follows that $l^2\le lu=2\le u^2$.

The width $w=u-l$ satisfies $0\le w\le1$, and

$$
w'=\frac{w^2}{2(u+l)}\le\frac w4
$$

Here the denominator is at least four, and we used $w^2\le w$. Hence $p$ updates make the width at most $4^{-p}\le2^{-p}$, and the processing terminates for each request.

Take any response $[L,U]$ from bisection and any response $[l,u]$ from Newton's method. Both have nonnegative endpoints and satisfy the square invariant. If $U<l$, then $2\le U^2<l^2\le2$, a contradiction; the case $u<L$ is similar. Hence the two intervals intersect. □

This comparison uses finite rational arithmetic, invariants, and induction. It is a theorem showing a relation between the responses guaranteed by two finite programs, and it uses no operation that adds new elements to Fε or T. In §9.10, both procedures are connected to the positive element σ of T, which is constructed separately.

### 9.8 Converting a Sequence with a Modulus of Error into Finite Intervals

**Theorem 9.4 (Conversion from a modulus of error to an interval-generating label).** Suppose that we are given a procedure returning a rational sequence $s_n$ and a nondecreasing natural-number procedure $\mu(h)$ for each $h$, and that

$$
i,j\ge\mu(h)\quad\Longrightarrow\quad |s_i-s_j|\le2^{-(h+2)}
$$

has been proved. Put $r_h:=2^{-(h+2)}$ and $J_h=[s_{\mu(h)}-r_h,s_{\mu(h)}+r_h]$, and return

$$
I_p=\left[\max_{h\le p}(s_{\mu(h)}-r_h),\ 
          \min_{h\le p}(s_{\mu(h)}+r_h)\right]
$$

This procedure satisfies the contract of an interval-generating label. It is also response-compatible with a label obtained using another valid modulus of error for the same sequence.

**Proof.** For any $h\le p$, we have $\mu(p)\ge\mu(h)$, so the error contract places $s_{\mu(p)}$ between the endpoints of $J_h$. Hence the lower endpoint given by the finite maximum is at most the upper endpoint given by the finite minimum, and $I_p$ is nonempty. As $p$ increases, the lower endpoint does not decrease and the upper endpoint does not increase, and the width of $I_p$ is at most the width $2^{-(p+1)}\le2^{-p}$ of $J_p$. All processing is finite.

For responses at precisions $p,q$ obtained from two moduli of error, choose an $n$ at least as large as all the finitely many thresholds used in them. The same $s_n$ lies in every constituent interval on both sides, so the responses formed by the finite maxima and minima also intersect. □

A modulus of error that is not nondecreasing can be replaced by the finite maximum up to each $h$. The modulus of error is data supplied as part of the input; this conversion cannot be performed automatically on an arbitrary sequence without a modulus of error. Nor have we first supplied an element belonging to the intersection of infinitely many intervals or embedded such an element into Fε. The output is an interval-generating label retaining the rule and its guarantee.

There is also a conversion in the opposite direction. From the response $P(j)$ at precision $j$ of an interval-generating label $P$, choose the lower endpoint, the upper endpoint, or the midpoint, and let $s_j$ be the resulting sequence. If $i,j\ge h+2$, both terms lie in $P(h+2)$, so $|s_i-s_j|\le2^{-(h+2)}$, and $\mu(h)=h+2$ is a modulus of error. The converted label is response-compatible with $P$. This is because, for any precisions $p,r$, taking $j\ge\max\{p,r+2\}$ puts the same $s_j$ in both the response of $P$ at precision $p$ and the converted response at precision $r$.

### 9.9 Distinguishing Rational Precision from Full Fε Precision and Extending Guarantees in Analysis

The $2^{-p}$ of interval-generating labels is **rational precision**. In contrast, if errors measured by the order of Fε are treated, one can consider **full Fε precision**, which allows any positive $\delta:\mathsf F_\varepsilon$ as the requested value. These two must not be substituted for one another. We define a sequence $x_n$ to approach (converge to) $x$ at full Fε precision by

$$
\forall\delta>0\ \exists N\ \forall n\ge N:\ |x_n-x|<\delta
$$

Here $\delta$ ranges over the positive elements of Fε. When $\delta$ is restricted to positive rational numbers, we say that the sequence approaches at rational precision.

For example, at rational precision the constant zero sequence approaches both zero and ε. This is because $|0-\varepsilon|$ is smaller than every positive rational number. Likewise, the rational interval $[-2^{-(p+1)},2^{-(p+1)}]$ contains both zero and ε for every $p$. Thus the shrinking of rational intervals alone cannot establish equality in Fε. The sequence $1/(n+1)$ approaches zero at rational precision, but since it is a positive rational number at every finite $n$, it is greater than ε and does not approach zero at full Fε precision. Moreover, it approaches no element at full Fε precision. If it approached $x$, then for $\delta=\varepsilon$ the difference $1/((n+1)(n+2))$ of two adjacent terms would be less than $2\varepsilon$; but this difference is a positive rational number, a contradiction.

A limit at full Fε precision is unique. If there were two distinct candidates $x,y$, choose $\delta=|x-y|/3$ and take a single sufficiently large $n$ at which both the condition for $x$ and the condition for $y$ hold. Applying $|x-y|\le|x-x_n|+|x_n-y|$ gives $|x-y|<2|x-y|/3$, a contradiction. If all positive $\delta$ in this proof were restricted to rational numbers, the counterexample in which the constant zero sequence also approaches ε could not be excluded.

The equality $|Q_{q,b}(n)-q|=|b|/(n+1)$ of Section 6 is the error of the generated rational number relative to $q$. It must not simply be reread as the error relative to $q^{\#\#}$ after Φ has forgotten the magnitude of $b$. The output of Φ contains neither the original $b$ nor the output values at individual stages. Representing L in Fε gives $q^{\#\#}=q+2\varepsilon$, so the latter is estimated separately. If $b>0$, then $b/(n+1)$ is a positive rational number, so $3\varepsilon<b/(n+1)$, and

$$
|Q_{q,b}(n)-(q+2\varepsilon)|=\frac b{n+1}-2\varepsilon<\frac b{n+1}
$$

The same positive rational upper bound $b/(n+1)$ can be used, but its justification is this calculation in the order of the target representation. Moreover, this error is greater than ε at every finite $n$, so it does not give a guarantee at full Fε precision requiring tolerance ε. §9.11 constructs rational-precision guarantees using the exact difference in this representation.

Approximability at rational precision must also be distinguished from containment in a particular interval. For example, the one-point interval $[q,q]$ contains $q$ but does not contain $q^{\#\#}=q+2\varepsilon$. The mere fact that $q$ can be used as an approximation at every rational precision does not justify reusing, without modification, an interval that permits equality at its boundary.

**Difference quotient of the reciprocal.** When $x\ne0$, $h\ne0$, and $|h|\le|x|/2$, finite ordered-field operations alone give

$$
\left|\frac{1/(x+h)-1/x}{h}+\frac1{x^2}\right|
=\left|\frac{h}{x^2(x+h)}\right|
\le\frac{2|h|}{|x|^3}
$$

The denominator conditions are also secured by $|x+h|\ge|x|/2>0$. For any positive $\delta:\mathsf F_\varepsilon$, taking $0<|h|<\min(|x|/2,\delta|x|^3/2)$ makes the error of the difference quotient less than $\delta$. This input width can also be formed using the four arithmetic operations and comparisons in Fε. Hence this is an example guaranteeing the derivative $-1/x^2$ of $x\mapsto1/x$ at full Fε precision. There is no need to introduce general real functions.

**Finite rectangle sums.** For rational endpoints $a<b$ and a polynomial $P$ with rational coefficients, let $n\ge1$, $\Delta=(b-a)/n$, and $x_j=a+j\Delta$, and define the left-endpoint sum as $W_n=\Delta\sum_{j=0}^{n-1}P(x_j)$. Write the formal definite integral of §9.5 as $A_P=\mathcal I(P;a,b)$. Taking a rational number $R$ such that $|x|\le R$ between the endpoints and computing $C:=M_R=\sum_{k=1}^d k|a_k|R^{k-1}$, one obtains

$$
|A_P-W_n|\le\frac{C(b-a)^2}{2n}
$$

from finite-coefficient identities. Specifically, for a monomial of degree $k\ge1$, factor as

$$
\frac{y^{k+1}-x^{k+1}}{k+1}-(y-x)x^k
=\frac{y-x}{k+1}\sum_{r=0}^{k}(y^{k-r}x^r-x^k)
$$

Each difference is $x^r(y^{k-r}-x^{k-r})$, and if $|x|,|y|\le R$, its absolute value is at most $(k-r)R^{k-1}|y-x|$. Using $\sum_{r=0}^k(k-r)=k(k+1)/2$, we find that the entire right-hand side is at most $kR^{k-1}|y-x|^2/2$ in absolute value. Since the error of the constant term is zero, multiplying by the coefficients and taking the finite sum shows that the error on each subinterval is at most $C\Delta^2/2$. Adding over the $n$ subintervals using a telescoping sum gives $nC\Delta^2/2=C(b-a)^2/(2n)$. No existence theorem for the classical integral is used.

By this estimate, for a positive rational error $\eta$: if $C=0$, the sum is exact for every $n$; if $C>0$, one can choose $n>C(b-a)^2/(2\eta)$ finitely. The formal antiderivative and the area-approximation procedure can be connected by error evidence. What the choice of $n$ guaranteed here is rational precision. The same rectangle sums need not converge at full Fε precision. For example, for $P=X$ and $[a,b]=[0,1]$, we have $W_n=(n-1)/(2n)$, and the error $1/(2n)$ equals the right-hand side of the estimate and is greater than ε for every $n$.

### 9.10 Requesting Approximations When Needed and Choosing a Calculation Method

The positive element σ constructed in §8.10 is the finite pair $(0,1)$ of T. Its square is exactly two using only multiplication in T. When an approximation is needed, a precision is requested from a separately provided rational-number procedure. This subsection connects exact operations on the element with approximation on request.

**Proposition 9.5 (Connecting an exact element with finite approximation responses).** If rational numbers $L,U$ satisfy

$$
0\le L\le U,\qquad L^2\le2\le U^2
$$

then $L\le\sigma\le U$ through the embedding of constants into T. If, in addition, $U-L\le2^{-p}$, then

$$
q=(L+U)/2,\qquad e=(U-L)/2
$$

is a pair of rational numbers satisfying $|q-\sigma|\le e\le2^{-(p+1)}$.

**Proof.** T is an ordered field, with $\sigma>0$ and $\sigma^2=2$. If $L>\sigma$, then $L^2-\sigma^2=(L-\sigma)(L+\sigma)>0$, contradicting $L^2\le2$. If $U<\sigma$, then likewise $\sigma^2-U^2>0$, contradicting $2\le U^2$. Hence σ lies between the endpoints. For the midpoint $q$ and half-width $e$, we have $q-e=L$ and $q+e=U$, so preservation of order under addition gives the error estimate. □

By this proposition, bisection from §9.3 and Newton's method from §9.7 both guarantee rational approximations to σ. The processing histories and intermediate numerical values of the two methods need not agree. Interchangeability here means returning an appropriate guarantee for the same precision request.

Nor does the output of an approximation need to be fixed to an interval. For example, one can set the specification to

$$
p:\mathsf N\quad\longmapsto\quad(q,e):\mathsf Q\times\mathsf Q,
\qquad 0\le e\le2^{-p},\quad |q-\sigma|\le e
$$

and attach evidence of the finite response. The types of the element σ of T, the rational outputs $q,e$, and the precision $p$ are specified before calculation. This error guarantee is read in the order of T, but the requested error is at rational precision.

In Newton's method, $u_0=2$ and $u_{n+1}=(u_n+2/u_n)/2$ are calculated in the rational-number type. By the invariants of Theorem 9.3 and Proposition 9.5, setting $l_n=2/u_n$ gives $l_n\le\sigma\le u_n$ and $u_n-l_n\le4^{-n}$. For a request $p$, performing $p$ updates and returning $q=u_p$ and $e=u_p-2/u_p$ gives $|q-\sigma|\le e\le4^{-p}\le2^{-p}$. The output is a pair of an approximation and an error; σ itself has not been replaced by a rational number.

As another checking method, since Proposition 9.5 (with $L=1,U=2$) gives $1\le\sigma\le2$, every rational number $q\ge1$ satisfies

$$
|q-\sigma|=\frac{|q^2-2|}{q+\sigma}\le\frac{|q^2-2|}{2}
$$

Hence, checking $e=|q^2-2|/2\le2^{-p}$ by rational arithmetic guarantees the error of that $q$. One can choose both the method of calculating $q$ and the method of checking the guarantee of the resulting $q$. To adopt such a method as a generator responding to precision, however, one must also show that it terminates finitely on each request and returns a $q$ satisfying this condition.

A rational-error guarantee alone does not allow σ and $\sigma+\varepsilon$ to be regarded as equal (§9.9). Equality in T is componentwise equality, and σ as the positive square root is specified by $\sigma^2=2$ and the order. The approximation procedures are examples of connecting responses supplied when needed to that exact specification.

### 9.11 Rational Approximation of Relation Representations and Elements with an Infinitesimal Direction

Representing L of Section 7 in Fε of Section 8 sends $q^{\#\#}$ to $q+2\varepsilon$. When T is used, the embedding from Fε into T also preserves order. In what follows, the required type and embedding are specified in advance, and ε is read in that type.

**Proposition 9.6 (Infinitesimal error and rational precision).** For a rational number $q$, an integer $k$, and a natural number $p$, the following hold.

1. If $q$ is returned as a rational approximation to $q^{\#\#}$, then $|q-(q+2\varepsilon)|=2\varepsilon<2^{-p}$.
2. If a rational number $r$ satisfies $|r-\sigma|\le2^{-(p+1)}$, then $|r-(\sigma+k\varepsilon)|<2^{-p}$.

**Proof.** Since ε is smaller than every positive rational number, $\varepsilon<2^{-p}/2$, which gives the first assertion. For the second, if $k=0$, then $|k\varepsilon|=0<2^{-(p+1)}$. If $k\ne0$, the order of ε relative to the positive rational number $2^{-(p+1)}/|k|$ again gives $|k\varepsilon|<2^{-(p+1)}$. The triangle inequality in T gives

$$
|r-(\sigma+k\varepsilon)|
\le |r-\sigma|+|k\varepsilon|
<2^{-(p+1)}+2^{-(p+1)}=2^{-p}.
$$

These are calculations with a finite integer $k$ and rational thresholds, not an argument that executes $k$ operations infinitely many times. □

Thus, to approximate $\sigma+k\varepsilon$, one can request precision $p+1$ for an approximation to σ and use the remaining half as the margin for the infinitesimal-direction error. This is not a method of reading an approximation out of Φ; it uses an element already defined in the type, together with finite operations and order. The element $0^{\#\#}=2\varepsilon$ remains nonzero, consistently with a rational approximation outputting zero.

## 10. The Scope of Treating Proof as Processing

Individual computations and general proofs are recorded as finite data and rechecked according to rules. This section describes the form of the records, what the checkers trust, the conditions under which values and traces are preserved when the computation model is changed, and checking by proof assistants.

### 10.1 Computation Traces for Individual Calculations

When β-reduction of a closed input is used as evidence, the original term, the definitions used, the rule name and application position at each step, and the term at each step are retained as a **computation trace**. At a β-step, the checker confirms that the two adjacent terms agree with capture-avoiding substitution at the specified position. Expansion of a named definition is recorded as a **δ-rule**, separately from the core β-rule. It is not necessary to expand all definitions first: δ and β may be interleaved according to the adopted strategy. A claim that the final term is a normal form also requires checking that no subterm remains to be processed by either rule.

When polynomial gcds or rational numbers are computed with the fast arithmetic of a host language (such as JavaScript), the output alone is not called a β-reduction trace. We state whether a result comes from execution in pure λ-calculus, exact arithmetic in the host language, a hand-written general proof, or the checking of an equational proof.

### 10.2 Finite Data for General Proofs

Associativity of addition cannot be proved by trying finitely many natural numbers. The induction proof in Section 3 contains equation transformations for the zero case and for an arbitrary induction variable. These two parts, together with the application of the induction rule, are made into finite data.

The [equational-proof checker](../verification/equational-checker.mjs) is a small checker that confirms terms with data types, recursive definitions, previously checked lemmas, assumptions, and applications of induction steps. It operates under a rule system distinct from that of the β-reducer for the untyped λ-calculus, and the two stand side by side under the common policy of “making finite symbolic processing into evidence that can be rechecked.”

The checker trusts only the following six definitional rules. Nat is the type of natural numbers and Seq the type of finite sequences; the head element of `Cons` is a symbol of type `Event`.

| Name | Rule |
|---|---|
| `add.zero` | `Add(x,Z)` = `x` |
| `add.succ` | `Add(x,S(y))` = `S(Add(x,y))` |
| `mul.zero` | `Mul(x,Z)` = `Z` |
| `mul.succ` | `Mul(x,S(y))` = `Add(Mul(x,y),x)` |
| `append.nil` | `Append(Nil,u)` = `u` |
| `append.cons` | `Append(Cons(h,t),u)` = `Cons(h,Append(t,u))` |

There is no facility for adding unverified axioms from an evidence file. The induction hypothesis is fixed to the variable of its induction step and is not generalized to arbitrary terms.

Proof data are written in JSON (a format distinct from the encoding of proof trees in §2.6). For example, the data for $0+n=n$ (`nat.add.leftzero`) specify induction on `n`, use `add.zero` in the base case, and use `add.succ` and the induction hypothesis `IH` once each in the induction step. Each rewrite is accompanied by its position in the tree of the term. A position is a path: the root is `[]`, and one descends by counting arguments from the left as `[0]`, `[1]`, …. The checker confirms these data as three rewrites: `Add(Z,Z)` → `Z` in the base case, and `Add(Z,S(k))` → `S(Add(Z,k))` → `S(k)` in the induction step (with `IH` at position `[0]`). What makes this a universal proof is not how many numerical values were tried, but the fact that the induction step was processed with $k$ kept as a variable.

The proof data are generated from a short description ([build-certificates.mjs](../verification/build-certificates.mjs)). The description itself guarantees nothing; the guarantee comes from the checker confirming every step of the generated data.

The [finite proof data](../verification/certificates/nat-and-paths.json) contain the proofs of 16 propositions about the free constructor types Nat and Seq (13 propositions about natural numbers and 3 about finite sequences). The total number of rewrites is 79, recorded in the [general-equation checking report](../verification/equational-report.json).

| Proof ID | Content | Rewrites |
|---|---|---|
| `nat.add.leftzero` | Left zero of addition | 3 |
| `nat.add.leftsucc` | Left successor of addition | 5 |
| `nat.add.commutative` | Commutativity of addition | 5 |
| `nat.add.associative` | Associativity of addition | 6 |
| `nat.add.interchange` | Four-term interchange for addition | 5 |
| `nat.mul.leftzero` | Left zero of multiplication | 4 |
| `nat.mul.rightone` | Right identity of multiplication | 3 |
| `nat.mul.leftsucc` | Left successor of multiplication | 11 |
| `nat.mul.commutative` | Commutativity of multiplication | 5 |
| `nat.mul.leftone` | Left identity of multiplication | 2 |
| `nat.mul.distributive.first` | Right distributivity $(x+y)z=xz+yz$ | 9 |
| `nat.mul.distributive.second` | Left distributivity $x(y+z)=xy+xz$ | 4 |
| `nat.mul.associative` | Associativity of multiplication | 7 |
| `path.append.leftunit` | Left identity of sequence concatenation | 1 |
| `path.append.rightunit` | Right identity of sequence concatenation | 3 |
| `path.append.associative` | Associativity of sequence concatenation | 6 |

Trusted recursive definitions themselves, such as right zero for natural numbers, are distinguished from the propositions proved from them. The general laws from the integers onward, the correspondence with Church representations (Proposition 2.1), the compatibility of history endpoints (§9.1), and the universally quantified error theorems for analytic generators are not among the 16 propositions; they are hand-written proofs. The 16 propositions were also checked in three proof assistants (§10.7).

### 10.3 Trust Boundaries

Saving a finite log alone does not guarantee that the log is correct. At least the following must be distinguished.

- The formation rules, recursion equations, and inference rules permitted in the proof.
- The checker that judges applications of those rules.
- The language implementation and computer that execute the checker.
- The data to be proved and the checking results actually saved.

We publish the rules and the checker code, and check the rejection of invalid proofs in addition to the acceptance of valid ones. We do not regard the correctness of a checker as shown by that same checker alone.

**Objects of checking.** Besides the 16 propositions (§10.2) and the ports to proof assistants (§10.7), the following are checked, separately for each rule system.

- In the [saved individual evidence](../verification/evidence-report.json), traces of the λ-calculus, applications including qlim, arithmetic in Fε, generative labels, and computation models (§10.5) are checked.
- There are 303 structural examples (the finite examples of §2.6 expanded into the basic symbols); they check the encoding and decoding of values, execution examples, and the rejection of erroneous inputs. Of these, 79 center on decoding and matching representation syntax, and 66 confirm only the syntax round trip. None of them is a check of meaning or of general laws.
- The relation-label examples check finite indices of common subsequences, the positive/negative/zero branches of introduction, addition retaining relation-operator counts, the nonadditivity of the introduction map, and the rejection of erroneous inputs or results. The universally quantified proofs of Propositions 6.2, 6.3, and 9.6 are hand-written.
- The recurring-decimal and volume-generation examples check finite descriptions of recurring digits and the specification of their reading, finite responses of $H$, introduction from above and below, addition retaining relation-operator counts, and finite volume responses of the Menger sponge. The universally quantified error proofs of Appendix A and the semantic correspondence with related work are not objects of this checking.
- The 15 pi examples check the matching of the rule, two finite recursion steps, lower and upper membership evidence, four precision requests, both branches of locatedness, and the rejection of five invalid candidates. Endpoints with large denominators are stored as strings of normalized rationals and read back exactly. The general laws of cuts, the correspondence with surreal numbers, the identification with conventional pi, and the decision of exact equality for arbitrary descriptions have not been machine-checked.

The relationship between the checkers and the programs that produce the evidence is as follows.

- The λ-calculus re-verifier does not call the evaluator's β-reduction or its search for the next position to process. It recomputes each step by a stack-based search and a separate substitution procedure that removes bindings directly (§10.4). What the two share is the syntactic layer: parsing, construction and printing of terms, position lookup and replacement, checks of term validity and of cycles, and handling of the definition table. This layer has not been formally proved independently.
- The checkers for exact arithmetic and generative labels redo the computation from the inputs recorded in the evidence and do not trust the saved outputs. They do, however, share part of the implementation of rational arithmetic and of the rules with the generating side. In exact arithmetic, the generation and the checking of evidence call the same computation functions (`evaluateRule` in `applications.mjs` and `certifiedCalculation` in `formal-field.mjs`). The extensions of interval-generating labels are checked by rebuilding the evidence and comparing it. Success means that the local computation for the specified request has been rechecked; it is not independent verification by another language or another implementation.
- The register-machine checker does not call the executor (§10.5).
- In the checks by Lean 4, Rocq, and Agda (§10.7), the checker and implementation of each system are objects of trust separate from the checkers of this manuscript.

### 10.4 The λ-Calculus Interpreter v8 and Exact Arithmetic

The [λ-calculus interpreter v8.0.1](../interpreter/lambda_interpreter_v8.0.1.html) ([specification](../interpreter/README.md)) handles λ syntax, a fixed snapshot of named definitions, δ-expansion, β-reduction, and JSON saving, loading, and re-verification of finite computation traces. Internally, the distance to a binding site is represented by an index, while free-variable names are retained. The starting point for this approach is de Bruijn's original paper. [de Bruijn, 1972](https://automath.win.tue.nl/archive/pdf/aut029.pdf)

δ and β are processed together, starting from the leftmost-outermost position of the term tree (strategy name `leftmost-outermost-interleaved`). Processing also takes place inside λ-abstractions, and a β-reduction at the root is processed before definition expansions inside its argument. This is because expanding all definitions first would inflate the term even in parts that are not used. Traces in the format that expands all definitions first (strategy name `leftmost-outermost`) are re-verified under that strategy. Termination of arbitrary λ-terms is not inferred from this refinement of the evaluation order.

The re-verifier `verifyTrace` checks the initial term; the rule, the position, and the terms before and after at each step; and the final term. Terms are compared by α-equivalence based on binding positions. For a trace whose termination status is `normal-form`, it confirms that no position to be processed remains; for a `step-limit` trace, it confirms that the step limit has been reached and that a position to be processed remains. For traces of a manual stop `stopped` and of an error `error`, it verifies the finite history up to that point, and does not prove that the stop operation or the error itself occurred. A trace is not a cryptographic signature: there is no facility for distinguishing the trace first produced from another correct trace rebuilt from the same input and definitions. Examples of saved traces are in the [λ traces](../verification/certificates/lambda-examples-v8.0.1.json).

**Built-in definitions.** There are 66 built-in λ-definitions. Besides Church numerals, Booleans, and pairs, they include `Pred`, which returns the preceding number; truncated subtraction `Sub`, which iterates `Pred`; the zero test `IsZero`; the comparison `Leq`; and the equality test `EqNat`. `ResultOk v` is a success value, and `ResultErr e` a failure value. `ResultBind r k` proceeds to the next process `k` only on success and passes a failure along unchanged. The error code for a zero denominator is the Church numeral 0, which is different syntax and of a different type from the zero of a successful rational.

An integer is represented by `Pair s n`. Here `s` is the sign, with the Church numeral 0 for the positive side and 1 for the negative side, and `n` is the magnitude. `ZMake` normalizes the sign of zero to the positive side. `ZFromDiff p n` converts the difference $p-n$ to the representation by sign and magnitude, and `ZToDiff z` converts to the difference representation. These are explicit conversions; they do not replace the representation of integers by difference pairs.

**Proposition 10.1 (Correspondence of the λ integer operations).** On inputs satisfying the type conditions, `ZNeg`, `ZAdd`, `ZSub`, and `ZMul` represent the integer operations of §4, and `ZEq` and `ZLeq` return the truth values of equality and order of integers. `ZFromDiff p n` returns the sign and magnitude of $p-n$. `ZFromDiff (Fst (ZToDiff z)) (Snd (ZToDiff z))` is β-equivalent to $z$.

**Proof.** We first confirm the auxiliary definitions on natural numbers. `IsZero` reduces to true at $C(0)$ and to false at $C(k+1)$. Write `Pred` as $\lambda n.\lambda s.\lambda x.\,n\,W\,(\lambda u.x)\,(\lambda u.u)$ with $W=\lambda g.\lambda h.h\,(g\,s)$. Induction on $k$ confirms that, for $k\ge1$, $W^k(\lambda u.x)$ reduces to $\lambda h.h\,(s^{k-1}x)$. Applying this to $\lambda u.u$ gives $s^{k-1}x$. Hence `Pred` takes $C(k+1)$ to $C(k)$ and $C(0)$ to $C(0)$ (up to β-equivalence). `Sub m n` iterates `Pred` $n$ times, so it represents truncated subtraction. Hence `Leq` returns the truth value of $m\le n$, and `EqNat` returns the truth value of equality.

`ZMake` sets the sign to the positive side when the magnitude is zero. `ZNeg` reverses the sign and passes the result to `ZMake`, so the sign of zero stays on the positive side. `ZAdd` adds the magnitudes when the signs agree. When the signs differ, it compares the magnitudes, subtracts the smaller magnitude from the larger, and attaches the sign of the larger side. When they are equal, `ZMake` puts the resulting zero on the positive side. `ZSub` is the composite of `ZAdd` and `ZNeg`. `ZMul` treats agreeing signs as nonnegative and differing signs as negative, multiplies the magnitudes, and likewise puts zero on the positive side. Proposition 2.1 is used for the addition and multiplication of magnitudes. Every branch agrees with the definitions of §4.1. Since zero has only one representation, the one on the positive side, the agreement of sign and magnitude examined by `ZEq` is the same as equality of integers. For `ZLeq`, it suffices to compare the case analysis on signs and magnitudes with the definition of the order in §4.3. `ZFromDiff` is examined in the cases $p\le n$ and $n<p$, and the round-trip formula by cases on the sign of $z$. □

**The fraction representation QRep.** $\mathsf{QRep}$ is a pair of two integers whose denominator is positive and nonzero. It is an auxiliary type that allows unreduced representations. For example, $1/2$ and $2/4$ are different syntax but are equal under the cross-product comparison of `QRepEq`. Since $\mathsf Q$ of §5 is the reduced normal representation, the two types differ in their formation conditions. The normalization map $\operatorname{norm}:\mathsf{QRep}\to\mathsf Q$ is the normalization of §5.1.

`QRepAdd`, `QRepSub`, `QRepMul`, `QRepNeg`, and the comparisons are λ-definitions for inputs satisfying the type conditions. `QMake`, `QRepInv`, and `QRepDiv` return a result representation that distinguishes a success value from a zero-denominator error. This branch preserves the formation conditions of the type; it does not assign a numerical value to division by zero. The result of `QMake` and the like is not projected as a bare QRep; its content is received by a procedure that selects the success side.

**Proposition 10.2 (Correspondence of the fraction representation).** The map $\operatorname{norm}$ carries `QRepAdd`, `QRepSub`, `QRepMul`, and `QRepNeg` to the operations of $\mathsf Q$, and carries the success value of `QRepDiv` for a nonzero divisor to division in $\mathsf Q$. The truth value of `QRepEq` agrees with equality in $\mathsf Q$ under $\operatorname{norm}$, and the truth value of `QRepLeq` agrees with the order of $\mathsf Q$.

**Proof.** For $(a,b)$ and $(c,d)$, the representation of the sum is $(ad+bc,bd)$, and that of the product is $(ac,bd)$. If $b,d$ are positive and nonzero, then $bd$ is also positive and nonzero. The representation of the quotient is $(ad,bc)$, and `QMake` succeeds only when the numerator $c$ of the divisor is nonzero, making the denominator positive. The fraction formulas of §5.3 do not depend on the choice of representatives, and the normal form is unique (Theorem 5.1). Hence the normalized values of these representations agree with the corresponding operations of $\mathsf Q$. Proposition 10.1 is used for the integer operations. Sign reversal and subtraction are the same calculation. `QRepEq` decides the integer equality of cross products, so by §5.2 it agrees with equality in $\mathsf Q$. For the order, the positivity of the denominators preserves the direction of the inequality (§5.4). □

The proofs of Propositions 10.1 and 10.2 are hand-written. For selected closed inputs, δ- and β-traces were produced and checked with the re-verifier. This interpreter does not include gcd or reduction to lowest terms by λ, and the notations `#` and `♭` do not exist in this language. M-polynomials, all operations of Fε, and the checking of general induction proofs are handled, in separate evidence formats, by the JavaScript programs below and the checker of §10.2. Definitions, traces, and input conditions are given in [connecting λ integer and fraction arithmetic](../research/lambda-arithmetic-v1.5.9.md).

**Exact arithmetic.** Concrete calculations for rational arithmetic, generators, intervals, and polynomials are performed by [exact arithmetic for applications](../verification/applications.mjs), and the four arithmetic operations on Fε, polynomial gcd, comparison, and the standard part of finite elements by [exact arithmetic for the formal field](../verification/formal-field.mjs). Both perform finite arithmetic without rounding, handling integers with JavaScript's BigInt, and use evidence formats distinct from β-reduction. That representing numbers by sequences of digits does not change values is shown in §10.6 for the case of binary addition. In `formal-field.mjs`, `embedL(k,a)` embeds an element $(k,a)$ of L into $(a+k\varepsilon)/1$. `embedM` is another name for the same function; the operation that constructs an M-polynomial itself is `poly` on coefficient sequences.

The extensions of interval-generating labels ([generator-extensions.mjs](../verification/generator-extensions.mjs)) are an implementation handling known rules and local traces of finite examples, not a checker certifying universal specifications of arbitrary programs. The accepted families of terms for alternating sums are limited to nonnegative geometric sequences and reciprocal-affine sequences, and the accepted sequences with a modulus of error to those of the form $a+br^j$.

Each implementation has resource bounds on input length, number of steps, depth, precision, and so on. Reaching a bound establishes none of the conclusions that the object is zero, that the operation is mathematically impossible, or that the procedure does not terminate. That a mathematical procedure terminates on any finite request is distinct from the range the distributed code accepts within its resource bounds.

### 10.5 Short Traces under Assumptions and Conditions for Changing Computation Models

For algebraic and categorical laws as well, finite equation transformations can be recorded without substituting numerical values.

**Additive cancellation.** Using the laws of an additive group, we have, for arbitrary $c,u$,

$$
(c+u)+(-u)=c+(u+(-u))=c+0=c
$$

The three transformations are associativity (position `[]`), the right inverse (position `[1]`), and the right identity (position `[]`), and the trace records them together with their application positions and the substitutions for the variables. This is a general proposition under the additive-group laws, not a few numerical examples. Adding $-u$ to both sides of $c+u=d+u$ and using this equation yields the cancellation $c=d$. It applies to addition on the integers, the rational numbers, Fε, and so on. The conclusion of the saved trace is $(c+u)+(-u)=c$; the step on to cancellation is hand-written.

**Agreement of left and right inverse arrows.** If arrows $f:A\to B$ and $g,h:B\to A$ satisfy $g\circ f=1_A$ and $f\circ h=1_B$, then

$$
g=g\circ1_B=g\circ(f\circ h)=(g\circ f)\circ h
=1_A\circ h=h
$$

The justifications for the five transformations are the right identity law (reversed), the assumption $f\circ h=1_B$ (reversed), associativity (reversed), the assumption $g\circ f=1_A$, and the left identity law. Here $A,B$ are readable names for boundaries; in arrow-only notation, the identity arrows $1_A,1_B$ are used to confirm that each composition is compatible. In the free category of histories of §9.1, a nonempty history need not have an inverse arrow. This proof is a conditional proof about any category satisfying the inverse-arrow assumptions.

The checker accepts only two theories: the associativity, right-inverse, and right-identity laws of addition; and the associativity of composition with the left and right identity laws corresponding to boundaries. The table of transformation rules is fixed on the checker side, and laws cannot be added from a trace. What this check confirms is derivation from the declared structural laws and assumptions, not the validity of the structural laws themselves.

**Register machines.** Outside the λ-calculus as well, a trace of each transition can be retained whenever states and one-step rules have finite descriptions. A state of a **register machine** consists of the instruction position `pc` and a sequence of natural-number registers. The instructions used are of the following four kinds (the checker also accepts the copying instruction `copy`). `zero(r)` sets $R_r$ to zero and proceeds to the next instruction, and `succ(r)` increases $R_r$ by one and proceeds to the next instruction. `jeq(r,s,k)` proceeds to instruction $k$ if $R_r=R_s$, and to the next instruction otherwise. `halt` terminates normally and has no further transitions. The addition program with inputs $R_0=m$ and $R_1=n$ consists of the following six instructions.

```text
0: zero(2)
1: jeq(2,1,5)
2: succ(0)
3: succ(2)
4: jeq(2,2,1)
5: halt
```

Instruction 4 compares a register with itself, so it is an unconditional jump. The program increases the counting register $R_2$ from zero to $n$ and increases $R_0$ the same number of times. We record the 14 transitions from the initial state $(2,3,0)$ to the final state $(5,3,3)$ at the halt instruction, and read 5 from $R_0$.

For general $m,n$, the following is an invariant at the entry of each iteration:

$$
R_0=m+c,\qquad R_1=n,\qquad R_2=c,\qquad c\le n
$$

One iteration increases $c$ and $R_0$ by one each, and the remaining count $n-c$ decreases by one. Since the machine halts at the branch where $c=n$, structural induction shows that the final output is $m+n$. The number of transitions is $4n+2$: one for the initial `zero`, four for each iteration, and one for the final branch. This guarantee for all inputs is hand-written; for the saved concrete inputs, the local transitions are checked. The state reached at the halt instruction is saved, but no fictitious additional transition after it is counted.

For the saved adjacent states, the checker confirms the instruction position and the update of every register. It also matches the instruction sequence, the initial input, the output register, and the arrival at the halt instruction. It rejects a trace with a substituted input, a trace cut off midway, and a trace in which only the last state has been rewritten as halted.

The specifications, traces, and rejection conditions for the short traces under assumptions and for the register machine are collected in the [computation-trace extensions](../research/trace-extensions-v1.5.9.md). They are checked as an evidence format distinct from the 16 propositions of §10.2; categorical assumptions and register-instruction specifications are not left as hidden premises.

**Translation between models.** A mechanism that advances a computation by states and one-step rules is called a **computation model**. The λ-calculus and register machines are examples. For a **translation**, which carries computations of a source model $S$ to computations of a target model $T$, we fix a condition $R(s,t)$ for the correspondence between states and make the following explicit.

1. **Input.** The two initial states built from the same permitted input satisfy $R$. The input types, parameters, and fixed environments of definitions also correspond.
2. **One step.** If $R(s,t)$ holds and $s\to s'$ is one step of $S$, then $T$ makes finitely many, and at least one, valid transitions from $t$ to reach some $t'$ such that $R(s',t')$ holds. That finite partial trace can be produced.
3. **Final state and decoding.** A state of $T$ corresponding to a normal final state of $S$ becomes a normal final state after finite termination processing, and decoding the two outputs to the specified type gives the same result. Interruptions and ill-formed inputs are not replaced by normal values.
4. **Checking the trace.** Each translated part and the termination processing conform to the rules of the checker of $T$. The boundary states of adjacent parts agree, and for the concatenated trace the checks of the initial input, all transitions, the final state, and the required output are accepted.

If a relationship between resource amounts is needed, it too is shown separately.

**Proposition 10.3 (Conditional preservation of finite traces).** A translation satisfying the above conditions carries a normally terminating finite trace of $S$ to a finite trace that has the same decoded value and is accepted by $T$.

**Proof.** By induction on the length of the trace of $S$. For length zero, condition 1 gives the corresponding initial states. When the trace is extended by one step, concatenate the finite partial trace of condition 2. The end of one partial trace and the start of the next are the same corresponding state, and condition 4 preserves the check of each transition. After the original final state is reached, attach the finite termination processing of condition 3. Concatenating finite sequences finitely many times yields a finite sequence, and the agreement of decoding and the termination check follow from conditions 3 and 4. □

This is a hand-written conditional proposition. Neither a translator from general λ-terms to this register machine nor a machine proof of its correctness is included. One-way preservation of finite traces alone does not allow conclusions about divergence or about properties of mutual translation. Indeed, the proof of Proposition 10.3 does not use the “at least one” part of condition 2: even if zero transitions are allowed, normally terminating traces are carried over as they are. Since “at least one” advances $T$ at least once for each step of $S$, it is a sufficient condition for carrying a nonterminating computation of $S$ to a nonterminating computation of $T$. If optimizations that handle a step of $S$ with zero transitions of $T$ are allowed, the requirement that such steps do not continue indefinitely is imposed as a separate progress condition. Without it, a computation that does not stop in $S$ may stop in $T$.

Obtaining the same answer once does not prove mutual translation of all programs or equal efficiency. The λ execution of `Add Two Three` and the register execution above both give 5 when decoded to natural numbers, but agreement on these two examples does not yield a general translation. If a translation is needed, the conditions above are proved individually. For agreement of values, there is another route that builds no translation (§10.6).

### 10.6 Independence from the Computation Model

The computations of this manuscript have been presented in the λ-calculus. This section gives conditions under which the mathematics of this manuscript does not depend on the λ-calculus as a particular computation model.

We say that a procedure of a computation model **computes an operation $g$ according to the rules** if, once an encoding carrying finite syntax trees of inputs to data of the model and a decoding carrying outputs back to trees have been fixed, the following two conditions hold.

1. For every input of the right type, there is a computation that reaches a normal final state in finitely many steps, and its output can be decoded to the specified type. In a model where the next step can be chosen in more than one way, the decoded value is the same whichever normal final state is reached.
2. Writing $g_M$ for the function from inputs to these decoded values, $g_M$ satisfies, as equations, all the rules that define $g$. Operations already defined that appear on the right-hand sides of the rules are read as the operations defined in this manuscript.

**Theorem 10.4 (Uniqueness of values fixed by rules).** Let an operation $g$ be defined by recursive rules, and assign a natural-number size to its inputs. For the size, use the quantities given in §2.5 as grounds for the termination of recursion (the number of constructors, a remainder, a degree, and so on). Suppose that every input of the right type matches some rule, and that each input at which the right-hand side of a rule calls $g$ is built from the components of the original input and the other arguments without using $g$, and has a smaller size than the original input. Then any two functions satisfying all the rules of $g$ take the same value at every input of the right type.

**Proof.** Let the two functions be $g_1,g_2$. By induction on a natural number $n$, we show that the values of $g_1$ and $g_2$ agree at every input of size less than $n$. For $n=0$, this holds because there is no input of size less than $0$. Suppose that it holds for $n$, and take an input of size $n$. Apply the rule matching that input to both functions. The inputs at which the right-hand side calls $g$ are built without using $g$, so they are the same for both functions. Their sizes are less than $n$, so by the induction hypothesis the values there are equal for $g_1$ and $g_2$. The rest of the right-hand side consists only of components of the input, the other arguments, constructors, and operations already defined, so the two values agree. Hence they agree at every input of size less than $n+1$. Every input falls under “less than $n$” for any $n$ greater than its size, so they agree at every input. □

This is the standard fact that a function defined by recursion is uniquely determined, stated in the terms of this manuscript. The cases of addition, multiplication, and concatenation were also checked in the three proof assistants (§10.7).

**Corollary 10.5 (Conditional independence from the computation model).** For an operation $g$ defined by rules satisfying the conditions of Theorem 10.4, every computation model that computes it according to the rules returns the same value at every input of the right type. That value is the value of $g$.

**Proof.** For each model, $g_M$ is defined at every input of the right type by condition 1, and satisfies the rules of $g$ by condition 2. Since $g$ itself also satisfies the rules, Theorem 10.4 gives $g_M=g$. □

**Comparing addition in five models.** We confirmed that addition is computed according to the rules in the λ-calculus and in four other computation models. The four are the register machine (§10.5) and the proof assistants Lean 4, Rocq (formerly Coq), and Agda, in which a computer checks definitions and proofs (§10.7).

| Computation model | How addition is represented | Grounds for computing according to the rules | How $2+3=5$ is confirmed |
|---|---|---|---|
| λ-calculus | The λ-term `Add` (§2.2) | Proposition 2.1 and the uniqueness of normal forms | The re-verifier accepts a 34-step trace (§10.4) |
| Register machine | A six-instruction program (§10.5) | A proof for all inputs by an invariant (§10.5) | The checker accepts a 14-transition trace |
| Lean 4 | A definition by the two lines of the rules | The definition is the rules themselves | `rfl` is accepted |
| Rocq | A definition by the two lines of the rules | The definition is the rules themselves | `reflexivity` is accepted |
| Agda | A definition by the two lines of the rules | The definition is the rules themselves | `refl` is accepted |

In the λ-calculus, by the proof of Proposition 2.1, the term applying `Add` to two Church numerals reaches the normal form of $C(m+n)$ by finitely many β-reductions. A normal form, if it exists, is unique up to α-equivalence ([Selinger, Corollary 4.3](https://arxiv.org/html/0804.3434v2)), so whatever order of reduction reaches the normal form, the decoded value is $m+n$. By the invariant of §10.5, the register machine halts after $4n+2$ transitions on every input and outputs $m+n$, and in each state the next transition is uniquely determined. In these two models the decoded value is always $m+n$, so $g_M$ is addition itself and satisfies the rules.

In Lean 4, Rocq, and Agda, the two lines of the definition of addition are exactly the two equations of the rules. Each system accepts the definition only after confirming that it is structural recursion, so the computation stops on every input. The form of the input determines which line is used, so the result is also uniquely determined. That the two equations hold directly by computation was confirmed in the proof of `add_is_determined` (§10.7). The `rfl`, `reflexivity`, and `refl` in the table are the ways of writing a proof that each system accepts when the two sides of an equation become the same by computation. Thus all five models compute addition according to the rules.

By Corollary 10.5, the additions of the five models return the same value not only at $2+3$ but at every input. Therefore commutativity and associativity of addition hold for the addition of every model, as equations between the values at each input. Showing equations that contain variables inside each model is a different matter (§2.2); §10.7 shows them in the three proof assistants. What supports this general conclusion is not agreement on two examples (§10.5), but the confirmation, for all inputs, that each model computes according to the rules. To carry the record of a computation itself rather than its value, construct a translation satisfying the conditions of §10.5 and use Proposition 10.3.

**Binary numerals.** Corollary 10.5 can also be used to reduce the number of steps of a computation without changing values. Since a chain of f represents a natural number $n$ by $n+1$ symbols f (§2.1), the addition $x+y$ finishes after $y+1$ applications of the rules. Here we consider a computation model that holds numbers as binary numerals.

Binary numerals are built from the empty numeral $\mathtt{bz}$ by forming $\mathtt{b0}\,w$, which appends the digit 0 to the end of a numeral $w$, and $\mathtt{b1}\,w$, which appends 1. For example, $\mathtt{b0}\,(\mathtt{b1}\,(\mathtt{b1}\,\mathtt{bz}))$ is 110 and represents 6. The outermost symbol is the last digit. The decoding $\mathtt{decB}$ and the function $\mathtt{succB}$, which adds 1, are defined by the following rules. Here $+$ is the addition of §3.1.

$$
\begin{aligned}
\mathtt{decB}(\mathtt{bz})&=0, &\mathtt{succB}(\mathtt{bz})&=\mathtt{b1}\,\mathtt{bz},\\
\mathtt{decB}(\mathtt{b0}\,w)&=\mathtt{decB}(w)+\mathtt{decB}(w), &\mathtt{succB}(\mathtt{b0}\,w)&=\mathtt{b1}\,w,\\
\mathtt{decB}(\mathtt{b1}\,w)&=S\bigl(\mathtt{decB}(w)+\mathtt{decB}(w)\bigr), &\mathtt{succB}(\mathtt{b1}\,w)&=\mathtt{b0}\,\mathtt{succB}(w).
\end{aligned}
$$

Binary addition $\mathtt{addB}$ adds from the last digit. If both last digits are 1, it writes 0 and adds the carried 1 to the sum of the remaining digits by $\mathtt{succB}$.

$$
\begin{aligned}
\mathtt{addB}(\mathtt{bz},w)&=w, &\mathtt{addB}(\mathtt{b0}\,v,\mathtt{b0}\,w)&=\mathtt{b0}\,\mathtt{addB}(v,w),\\
\mathtt{addB}(\mathtt{b0}\,v,\mathtt{bz})&=\mathtt{b0}\,v, &\mathtt{addB}(\mathtt{b0}\,v,\mathtt{b1}\,w)&=\mathtt{b1}\,\mathtt{addB}(v,w),\\
\mathtt{addB}(\mathtt{b1}\,v,\mathtt{bz})&=\mathtt{b1}\,v, &\mathtt{addB}(\mathtt{b1}\,v,\mathtt{b0}\,w)&=\mathtt{b1}\,\mathtt{addB}(v,w),\\
& &\mathtt{addB}(\mathtt{b1}\,v,\mathtt{b1}\,w)&=\mathtt{b0}\,\mathtt{succB}(\mathtt{addB}(v,w)).
\end{aligned}
$$

In every rule, whenever the right-hand side calls the same function, it does so on numerals shorter than the original ones. The other computations called on the right-hand sides ($\mathtt{succB}$ and addition) also stop, so the computation always stops.

**Proposition 10.6 (Correctness of binary addition).** For all binary numerals $v,w$, the following holds.

$$
\mathtt{decB}(\mathtt{addB}(v,w))=\mathtt{decB}(v)+\mathtt{decB}(w).
$$

**Proof.** We use the left zero and left successor of addition (Lemma 3.1) and the four-term interchange $(a+b)+(c+d)=(a+c)+(b+d)$ (which follows from Theorem 3.2; `nat.add.interchange` of §10.2). First, by structural induction on $w$, we show $\mathtt{decB}(\mathtt{succB}(w))=S(\mathtt{decB}(w))$. In the cases $\mathtt{bz}$ and $\mathtt{b0}\,w$, computing the definitions makes the two sides agree. In the case $\mathtt{b1}\,w$, put $a=\mathtt{decB}(w)$; by the induction hypothesis, the left-hand side is $S(a)+S(a)$. By the definition of addition $x+S(y)=S(x+y)$ and the left successor, this equals $S(S(a+a))$, which agrees with the right-hand side.

Next, by structural induction on the first numeral, we show that the proposition holds whatever the second numeral is. If the first is $\mathtt{bz}$, it holds by the left zero; if the first is nonempty and the second is $\mathtt{bz}$, it holds by the definition of addition $x+0=x$. The remaining cases are the four in which the first is $\mathtt{b0}\,v$ or $\mathtt{b1}\,v$ and the second is $\mathtt{b0}\,w$ or $\mathtt{b1}\,w$. Put $a=\mathtt{decB}(v)$ and $b=\mathtt{decB}(w)$. Since $v$ is shorter than the first numeral, the induction hypothesis gives $\mathtt{decB}(\mathtt{addB}(v,w))=a+b$. Using this and the property of $\mathtt{succB}$ shown above, compute both sides, and move $S$ outward by the definition of addition $x+S(y)=S(x+y)$ and the left successor. The two sides then become $(a+b)+(a+b)$ and $(a+a)+(b+b)$ with the same number of $S$ applied. The number of $S$ is zero if both last digits are 0, one if exactly one of them is 1, and two if both are 1. The sums $(a+b)+(a+b)$ and $(a+a)+(b+b)$ are equal as a special case of the four-term interchange. □

The encoding $\mathtt{bin}$, which carries natural numbers to binary numerals, is defined as follows.

$$
\mathtt{bin}(0)=\mathtt{bz},\qquad
\mathtt{bin}(S(n))=\mathtt{succB}(\mathtt{bin}(n)).
$$

The property of $\mathtt{succB}$ and induction on $n$ give $\mathtt{decB}(\mathtt{bin}(n))=n$. Let the value function of the binary model be

$$
g_B(x,y)=\mathtt{decB}(\mathtt{addB}(\mathtt{bin}(x),\mathtt{bin}(y)))
$$

Then Proposition 10.6, the property of $\mathtt{succB}$, and $\mathtt{decB}(\mathtt{bin}(n))=n$ give $g_B(x,0)=x$ and $g_B(x,S(y))=S(g_B(x,y))$. That is, the binary model computes addition according to the rules, and by Corollary 10.5 it returns the same values as the five models in the table. In this case, $g_B(x,y)=x+y$ also follows directly from Proposition 10.6 and the round-trip equation of the encoding. The advantage of using Corollary 10.5 is that, for any model, it suffices to confirm the equations of the rules.

**Number of steps.** When the inputs are held as binary numerals from the start, the number of applications of the rules of $\mathtt{addB}$ and $\mathtt{succB}$ does not exceed the sum of the numbers of digits of the two numerals plus 1. Write $|u|$ for the number of digits of a numeral $u$, $t(u)$ for the number of consecutive 1s at its end, and $A(v,w)$ for the number of rule applications in the computation of $\mathtt{addB}(v,w)$. We show by structural induction on the first numeral that

$$
A(v,w)+t(\mathtt{addB}(v,w))\le|v|+|w|+1
$$

Computing $\mathtt{succB}(u)$ uses the rules $t(u)+1$ times. If one numeral is $\mathtt{bz}$, there is 1 application, and the $t$ of the result is at most the number of digits of the other, so the inequality holds. When both are nonempty, let $v',w'$ be the numerals with their last digits removed, and put $r=\mathtt{addB}(v',w')$. If the last digits are 0 and 0, there are $A(v',w')+1$ applications, and the $t$ of the result is 0. If exactly one of them is 1, there are $A(v',w')+1$ applications, and the $t$ of the result is $t(r)+1$. If both are 1, the carry by $\mathtt{succB}$ takes $t(r)+1$ applications, so there are $A(v',w')+t(r)+2$ applications. The last digit of the result is 0, so the $t$ of the result is 0. In every case the left-hand side is at most $A(v',w')+t(r)+2$, which by the induction hypothesis is at most $|v'|+|w'|+3=|v|+|w|+1$. Since $t\ge0$, $A(v,w)$ is also at most $|v|+|w|+1$.

For example, $2+3$ is obtained with 4 applications, as 101, the sum of 10 and 11. For $1000000+1000000$, both numbers have 20 binary digits, and there are 28 applications. These two examples, and the step bound for all pairs of numbers from 0 to 599, are checked by the [binary-addition tests](../verification/binary-addition-tests.mjs). With the rules for chains of f, `add.succ` is applied 1000000 times and `add.zero` once. However, the conversions between chains of f and binary numerals ($\mathtt{bin}$ and $\mathtt{decB}$) take a number of steps proportional to the size of the number. The number of steps is reduced when numbers are held as binary numerals from the start and kept that way throughout the computation.

The checking programs compute with integers using JavaScript's BigInt (§10.4). This, too, is not a computation that traverses a chain of f one link at a time, but one that represents numbers by sequences of digits. Proposition 10.6 shows, for the simplest case of binary addition, that changing the representation does not change values. The correctness of the BigInt implementation itself is not shown; it falls within the trust placed in the language implementation (§10.3). Proposition 10.6, and the fact that the binary model computes addition according to the rules, were also checked in the three proof assistants (§10.7).

**Summary.** Values fixed by rules satisfying the conditions of Theorem 10.4 are the same in every model that computes according to the rules (Corollary 10.5), and the traces of computations that terminated normally can be carried between models if there is a translation satisfying the conditions of §10.5 (Proposition 10.3). Finite construction and the specification of types are determined on the side of f-trees and rules. Therefore, if each model computes according to the rules and, where traces are carried, a translation exists, the three policies of §1.1 (finite construction, calculation with specified types, and checkable evidence) do not depend on the computation model. What changes with the model is the number of steps and the efficiency of the computation, the concrete form of the records, and how far the implementation and checker of each model are trusted (§10.3). Nothing is claimed about models for which the conditions have not been confirmed, or about anything whose value is not determined by rules of the form in Theorem 10.4.

That the functions definable in the λ-calculus coincide with the functions computable by Turing machines is a classical result shown by [Turing (1937)](https://doi.org/10.2307/2268280). Corollary 10.5 is a claim of a different kind. It concerns not the range of computable functions, but the fact that the value of each individual operation defined by the rules of this manuscript is the same in every model that computes it according to the rules. The Church–Turing thesis, which states that the functions computable in the intuitive sense coincide with the functions computable in these models, is not a mathematical theorem, and this manuscript does not presuppose it.

### 10.7 Porting to Proof Assistants

Lean 4 ([de Moura–Ullrich, 2021](https://doi.org/10.1007/978-3-030-79876-5_37)), Rocq ([The Rocq Prover](https://rocq-prover.org/)), and Agda ([Norell, 2007](https://www.cse.chalmers.se/~ulfn/papers/thesis.pdf)) are all proof assistants based on type theory, and each has its own checking mechanism (in Lean and Rocq, a small kernel does the checking). They are languages and implementations different from the equational-proof checker of this manuscript.

What we ported to the three systems is the foundational part of this manuscript.

- The type $F$ of trees built from f alone, and the encoding that represents natural numbers as chains of f by the correspondence $f()\leftrightarrow z$, $f(t)\leftrightarrow S(t)$ of §2.1. The fact that encoding and then decoding returns the original (`dec_enc`).
- The types of natural numbers and finite sequences, and addition, multiplication, and concatenation by the six rules of §10.2.
- The 16 propositions of §10.2.
- The cases of Theorem 10.4 for addition, multiplication, and concatenation (`add_unique`, `mul_unique`, `append_unique`), and the fact that a function satisfying the rules of addition coincides with the defined addition (`add_is_determined`).
- The binary numerals, decoding, and addition of §10.6: $\mathtt{decB}(\mathtt{succB}(w))=S(\mathtt{decB}(w))$ (`decB_succB`), Proposition 10.6 (`decB_addB`), the round trip of the encoding $\mathtt{decB}(\mathtt{bin}(n))=n$ (`decB_bin`), and the fact that the binary model computes addition according to the rules and coincides with the defined addition (`addB_is_add`).

There are 25 theorems in all (the 16 propositions, four corresponding to Theorem 10.4, the round trip of the encoding, and four about binary numerals). The only constructor of $F$ is `f`, which takes a finite list of immediate children. The f-only notation U of §2.6 corresponds one to one to the trees of $F$ in which each f has at most two immediate children (`F.f [s, t]` corresponds to `f(st)`). The element type of finite sequences is made a parameter, as an arbitrary type `E` (corresponding to `Event` in §10.2). Only the basic definitions built into each system are used; no external library is used. The proofs were rewritten in each system; the systems were not simply given the data of the 79 rewrites of §10.2 to read. The constructions from the integers onward, relation labels, generative labels, interval-generating labels, the category of computation traces, and Corollary 10.5 itself have not been ported.

The files are [FGen.lean](../verification/proof-assistants/FGen.lean), [FGen.v](../verification/proof-assistants/FGen.v), and [FGen.agda](../verification/proof-assistants/FGen.agda). The checking commands are `lean FGen.lean`, `rocq compile FGen.v`, and `agda --ignore-interfaces FGen.agda`, respectively. The results are as follows.

| Proof assistant | Version | Result |
|---|---|---|
| Lean 4 | 4.35.0 | All accepted. `#print axioms` reports that none of the 25 theorems depends on any axiom |
| Rocq | 9.3.0 | All accepted. `Print Assumptions` reports, for all 25 theorems, that no axioms are used |
| Agda | 2.8.0.2 | All accepted. The `--safe` setting forbids adding axioms (`postulate`) |

Since no system uses additional axioms, the axiom of choice is not used either. The Agda file also specifies `--without-K`, so the principle K (the principle that all proofs of the same equation are equal) is not used either.

In a copy with one $S$ removed from the right-hand side of the rule `add.succ`, all three systems rejected the proof of the left zero of addition. In a copy of binary addition with the carry removed (in which the rule for both last digits being 1 does not use $\mathtt{succB}$), all three systems rejected the proof of Proposition 10.6. This confirms, reproducibly with the [broken-copy check](../verification/proof-assistants/check-mutations.sh), that the checks depend on the content of the rules.

## 11. Differences from Conventional Mathematics, Counterexamples, and What Is Not Claimed

### 11.1 What Is Compared, and Why Differences Are Not Conflicts

In this section, “conventional mathematics” means mathematics built on ZFC set theory and classical logic. Classical logic is the natural deduction of §1.2 with excluded middle or double-negation elimination added. Real numbers are constructed as Dedekind cuts of rational numbers or as equivalence classes of Cauchy sequences, and they form a single complete ordered field $\mathbb R$, unique up to isomorphism. An infinite decimal denotes the limit of the sequence of numbers obtained by truncating it after finitely many digits.

When a result of this manuscript differs from a conventional result, this does not mean that either one is wrong. A different object is assigned to a symbol that looks the same. For example, the value of a decimal is determined by its construction, not by how it looks: for the digit-adding construction $0.9+0.09+0.009+\cdots$, conventional mathematics takes the limit as its value, whereas this manuscript takes a relation label that keeps the direction of approach (A.5).

Fε can also be constructed within conventional mathematics, as the rational function field $\mathbb Q(\varepsilon)$ equipped with an order (see Related work). The individual definitions and finite computations of this manuscript can be reread in the language of set theory and compared. However, no theorem translating the whole of the inference rules into ZFC has been proved. The differences lie in what is assigned to the expressions “$0.999\ldots$,” “approach,” and “number,” and in what is taken as a premise.

### 11.2 A List of Differences in Results

| Item | Conventional mathematics | This manuscript | In the text |
|---|---|---|---|
| $0.999\ldots$ | $=1$ | As the digit-adding construction, $1-2\varepsilon\ne1$. As another way of writing the fraction $1/1$, it is $1/1$ | Theorem A.3 |
| $0.333\ldots$ | $=1/3$ | As the digit-adding construction, $1/3-2\varepsilon\ne1/3$. As another way of writing the fraction $1/3$, it is $1/3$ | A.5 |
| $3\times0.333\ldots$ | $=1$ | For the digit-adding construction, multiplying by 3 after introduction gives $1-6\varepsilon$; multiplying by 3 and then introducing gives $1-2\varepsilon$ | A.5 |
| $0.333\ldots+0.666\ldots$ | $=1$ | For the digit-adding construction, adding after introduction gives $1-4\varepsilon$; adding the generative processes and then introducing gives $1-2\varepsilon$ | A.4 |
| Where $1/(n+1)$ goes | The limit is $0$ | The introduced label is $0^{\#\#}=2\varepsilon>0$ | §6.3, §8.4 |
| Approach from above and from below | $1/(n+1)$ and $-1/(n+1)$ have the same limit | $0^{\#\#}$ and $0^{\flat\flat}$ are different numbers | §6.3, §7.1 |
| Limits and sums | If both limits exist, $\lim(a_n+b_n)=\lim a_n+\lim b_n$ | Introduction does not preserve sums. $\Phi(G(0,2))=0^{\#\#}$, but $\Phi(G(0,1))+\Phi(G(0,1))=0^{\#\#\#\#}$ | §7.3 |
| Infinitesimals and infinitely large numbers | None in $\mathbb R$ (Archimedean property) | $0<\varepsilon<r$ for every positive rational number $r$. $\varepsilon^{-1}$ is greater than every rational number | §8.4 |
| Nested interval theorem | Nested closed intervals whose widths tend to $0$ have exactly one common point | Nested intervals whose widths tend to $0$ at rational precision contain every $1/3+k\varepsilon$, so the common point is not unique (if the widths tend to $0$ at full precision, there is at most one). The intervals for $\sqrt2$ have no common point in Fε | A.4, §9.9, Proposition 11.1 |
| Existence of suprema (completeness) | Every nonempty set bounded above has a supremum | Does not hold in Fε | Proposition 11.1 |
| Intermediate value theorem | Holds for continuous functions | $x^2-2$ changes sign in Fε but has no zero | Proposition 8.5 |
| Convergence of $1/(n+1)$ | Converges to $0$ | At full Fε precision, it converges to no element | §9.9, Proposition 11.1 |
| Uniqueness of limits | Unique | Not unique at rational precision (the constant sequence $0$ is close to both $0$ and $\varepsilon$). Unique at full precision | §9.9 |
| The totality of numbers | One complete ordered field $\mathbb R$ | Types side by side. $\pi_{\mathrm{cut}}+\varepsilon$ is not computed until a type is defined | §11.4, B.6 |
| Number of real numbers | Uncountable | Representations are finite symbol strings, so seen from outside they can be enumerated | §1.4, §11.4 |
| Density of the order | $\mathbb R$ is dense | L has adjacency (Fε is dense) | §7.2, §8.4 |
| Excluded middle | Holds for all propositions | Limited to decidable properties | §1.2 |
| Proof of existence | Proof by contradiction suffices | A witness is required | §1.2 |
| Theorems essentially dependent on the axiom of choice | Theorems of ZFC | Neither stated nor claimed in the system of this manuscript | §11.5 |
| Menger sponge | Volume is $0$ | The volume-generating label is $0^{\#\#}>0$ (not a measure) | A.6 |

### 11.3 Counterexamples to Completeness

**Proposition 11.1 (Counterexamples to the completeness of Fε).** The following hold for Fε.

1. For the property “is a positive rational number,” $0$ and $\varepsilon$ are lower bounds (elements less than or equal to every element satisfying the property), but there is no greatest lower bound (infimum). Reversing signs, the property “is a negative rational number” has upper bounds but no supremum.
2. $1/(n+1)$ is monotonically decreasing and has $\varepsilon$ as a lower bound, but at full Fε precision (§9.9) it converges to no element.
3. No element of Fε lies in all of the rational intervals $[L_p,U_p]$ returned for each precision $p$ by the bisection procedure for $\sqrt2$ of §9.3.

**Proof.** (1) By §8.4, $0<\varepsilon<r$ for every positive rational number $r$. Let $s$ be a lower bound. For any positive rational number $r$, we have $s\le r/2$ and $\varepsilon<r/2$, so $s+\varepsilon<r$. Hence $s+\varepsilon$ is also a lower bound, and since $s<s+\varepsilon$, $s$ is not the greatest lower bound. For upper bounds, the argument is the same with $t$ changed to $t-\varepsilon$.

(2) Monotonicity follows from comparison of rational numbers. That $\varepsilon$ is a lower bound follows from §8.4. That the sequence converges to no element was shown in §9.9.

(3) Suppose there is such an $x$. Each interval is a subinterval of $[0,2]$, so $0\le L_p\le x\le U_p\le2$. We first show that $x$ belongs to the finite part $\mathsf O_\varepsilon$ (§8.5). If $x\ne0$, then $0<x\le2$. Write $x=f/g$ and suppose that $v(x)<0$, that is, $\nu(f)<\nu(g)$. Then the coefficient of the lowest nonzero degree of the numerator of $2-x=(2g-f)/g$ is $-c_0(f)$, so by the definition in §8.4 the sign of $2-x$ is the opposite of the sign of $x$, that is, negative, which contradicts $x\le2$. Therefore $v(x)\ge0$. Put $r=\operatorname{st}(x)$; then $r$ is a rational number. For an element $y\ge0$ of $\mathsf O_\varepsilon$, we have $\operatorname{st}(y)\ge0$. Indeed, when $y\ne0$ is written in a representation whose denominator has a nonzero constant term, if $v(y)>0$ then $\operatorname{st}(y)=0$, and if $v(y)=0$ then, by the definition in §8.4, the sign of $\operatorname{st}(y)$ agrees with the sign of $y$. Since $\operatorname{st}$ is a ring homomorphism that leaves rational numbers unchanged (Theorem 8.4), applying this to $y=x-L_p$ and $y=U_p-x$ gives $L_p\le r\le U_p$. Since $L_p\ge0$, we have $L_p^2\le r^2\le U_p^2$, and the invariant $L_p^2\le2\le U_p^2$ of §9.3 and the width bound $U_p-L_p\le2^{-p}$ give

$$
\lvert r^2-2\rvert\le U_p^2-L_p^2=(U_p-L_p)(U_p+L_p)\le4\cdot2^{-p}
$$

This holds for every $p$, so $r^2=2$. Since no rational number has square two (proof of Proposition 8.5), this is a contradiction. □

### 11.4 Decimals and Limits, the Totality of Numbers, and Logic

**Decimals and limits.** A conventional limit keeps only where a sequence goes and discards the information along the way. The limits of $1/(n+1)$, $2/(n+1)$, and $-1/(n+1)$ are all $0$. Introduction in this manuscript discards the magnitude of the coefficient but keeps the direction, from above or from below. $\Phi$ carries both $G(0,1)$ and $G(0,2)$ to $0^{\#\#}$, and $G(0,-1)$ to $0^{\flat\flat}$ (§6.3). In exchange, the introduction map does not in general preserve sums or positive constant multiples of responses. It does preserve translation by rational numbers and sign reversal (§7.3, A.5).

**The totality of numbers.** This manuscript has no type that gives all numbers at once. Fε, T, $\mathsf C_\varepsilon$, and $\mathsf{Cut}_{\mathsf Q}$ are separate types, and the needed embeddings are defined individually. For example, $\sigma$ is an element of T and $\pi_{\mathrm{cut}}$ is an element of $\mathsf{Cut}_{\mathsf Q}$, so computing an expression containing both requires defining a type for that purpose. Nor is there anything corresponding to the uncountability of the real numbers. Representations are finite symbol strings and so, seen from outside, can be enumerated, but this is a metalevel description (§1.4).

Cantor's diagonal argument can be read as a procedure that produces a number not on a given list. However, a list that merely arranges finite symbol strings from outside is not a procedure that returns a number for each index. This is because symbol strings that do not terminate are mixed in, and there is no procedure for deciding in general whether a string is a valid description. A list consisting only of descriptions whose rules and evidence are fixed does become a procedure, and its diagonal gives a new description outside the list. Using it amounts to adding rules, which is compatible with this manuscript's policy of adding the constructions that are needed.

**Logic.** Excluded middle and proofs of existence are treated as in §1.2. Most of the theorems of this manuscript concern properties that can be decided by a finite procedure, such as comparison of rational numbers, and case analysis can be used there. It is for properties with no decision procedure that the difference in logic appears in the results. For example, equality in Fε can be decided by finite computation, but no procedure that decides response compatibility of interval-generating labels in general is assumed (§9.2).

**What does not change.** Computation and laws for natural numbers, integers, and rational numbers, the order on the rational numbers, the four arithmetic operations on polynomials, and the coefficient computations for formal differentiation and formal integration are the same as in conventional mathematics. Results of approximation at rational precision do not change either. The rational intervals for $\sqrt2$ and for pi bracket the conventional values (for pi, Proposition B.5). Fε is also an ordered field, and the laws of the four arithmetic operations and of order hold in the same form as for the rational numbers.

### 11.5 Not Using the Axiom of Choice

The axiom of choice asserts, without showing how to choose, that for a family of nonempty sets there exists a function choosing one element from each set. Over ZF, the axiom of choice is equivalent to the well-ordering theorem and to Zorn's lemma (Jech 1973). Its consequences include that every vector space has a basis and that there exists a set of real numbers that is not Lebesgue measurable. Investigation of the Banach–Tarski theorem is deferred.

**Why it is not needed.** The internal definitions and theorems of this manuscript do not use the axiom of choice. Since set theory is not placed inside the system, there is no place to state the axiom of choice of set theory. There are three reasons why this causes no difficulty. First, all objects are finite, and choice within a finite range is handled by a rule such as “take the first candidate.” Second, for every existence claim proved in this manuscript, a procedure for computing the witness is given in the text. However, no general theorem extracting a witness program from an arbitrary proof has been proved. (In type theories that read $\exists$ as a pair of a witness and a proof, a proposition of a form similar to the axiom of choice becomes a theorem, but this is different from the axiom of choice of set theory.) Third, arguments that state only existence, or that handle an infinite totality at once, are replaced by rules and data. Many of the arguments in the following table can be proved in ZF without the axiom of choice, but they do not show a procedure for computing the result. The last row is an example in which a principle corresponding to the axiom of choice is actually used.

| Conventional argument | Replacement in this manuscript |
|---|---|
| For each $\delta$ there exists $N$ | Compute $N=\lceil\lvert b\rvert/\delta\rceil$ (Proposition 6.1) |
| A Cauchy sequence converges | Give the modulus of error $\mu$ as input data (Theorem 9.4) |
| If $x\ne0$, a reciprocal exists | Hold evidence of separation from zero as data (Proposition 9.1) |
| Choose a representative of an equivalence class | Compute the normal form (Theorem 5.1, Theorem 8.2) |
| Define the smallest field as the intersection of subfields | Define it by the range of formation of finite expressions (Theorem 8.8) |
| Take a point in the intersection of an infinite family of intervals | Return the next interval using finite maxima and minima (Theorem 9.4) |
| Obtain a square root from completeness or an algebraic closure | Concretely build a type having the needed element (Theorem 8.9) |
| A countable union of countable sets is countable (choosing an enumeration of each set) | Give the enumeration procedures as input data |

**Advantages.** Many of the following advantages do not come solely from not using the axiom of choice; they result from combining a logic that requires witnesses with the policy of finite data. Even in ZF, which does not have the axiom of choice, advantages 1, 2, and 5 are not obtained if classical logic is used.

1. **Existence claims turn directly into computation.** Since the proof contains the construction of the witness, one can say not “$N$ exists” but “$N$ is this.”
2. **Results can be checked.** All the stages of a computation, and proofs, can be saved as finite data and confirmed by a separate program. A nonconstructive existence proof can also be checked once it is formalized, but one cannot compute and confirm a witness from such a proof. In this manuscript, the witness itself can also be computed and confirmed. The range actually checked is given in §12.
3. **The premises are small and the dependencies are visible.** The foundation consists of finite syntax, recursion, structural induction, equational reasoning, and intuitionistic natural deduction, and one can trace what each conclusion depends on (external comparisons depend on the theories compared).
4. **Nonconstructive objects do not enter the discussion.** The arguments do not pass through objects, such as nonmeasurable sets or well-orderings of the real numbers, for which no concrete definition can be given from the axioms of ZFC alone. Every object that appears can be written down.
5. **Computations are reproducible.** Procedures are deterministic and return the same output for the same input. Since there is no step of “choosing arbitrarily,” the record is the same no matter who runs it.
6. **It can be read from any standpoint.** Results about finite constructions are acceptable both from a standpoint that accepts the axiom of choice and from one that does not.
7. **Infinitesimals can be handled without relying on the axiom of choice.** The existence of the nonprincipal ultrafilter used by the standard construction of nonstandard analysis follows from the axiom of choice but cannot be proved from ZF alone (see Related work). The $\varepsilon$ of this manuscript is represented by a finite sequence of coefficients, and equality and order are decided by finite computation (§8.4).

Not making the axiom of choice an internal axiom serves to keep conclusions that use it from being brought into the system of this manuscript as conclusions of that system; it does not serve to deny those conclusions. Since the axiom of choice does not define an execution procedure for an infinite operation, the argument that “it is false because it cannot be executed” does not hold either. This manuscript does not discuss whether the axiom of choice is true or false. Nor do all counterintuitive results disappear. In this manuscript too, $0^{\#\#}+0^{\#\#}\ne0^{\#\#}$, while $\Phi(G(0,2))=0^{\#\#}$. The difference is that the rules are explicit and the reason can be explained by finite computation.

**What is given up.**

- **General existence theorems.** The existence of a basis for every vector space, the general Hahn–Banach theorem, Tychonoff's theorem, and the like are not given as theorems. If something is needed in an individual situation, it is constructed on the spot.
- **Theorems about “all real numbers.”** They cannot be stated unless a corresponding type is built.
- **Wholesale inheritance of the properties of the real numbers.** For the hyperreal numbers of nonstandard analysis, statements about the real numbers expressed in a first-order language hold unchanged (the transfer principle). Fε does not have this property. For example, every positive real number has a square root, but the square root of $\varepsilon$ is not in Fε (§8.6). Needed properties are set up and proved for each type.
- **Saving the work of construction.** Each time a new element is used, a representation, equality, operations, and proofs of correspondence are given.
- **Speed of computation.** Terminating finitely and being computable quickly are different things. The number of steps in computations with Church numerals grows rapidly, and the alternating sum for pi converges slowly.

In exchange for these costs, this manuscript gains finiteness and checkability.

### 11.6 Claims Refuted by Counterexamples

Under the definitions of this manuscript, the following claims do not hold.

| Claim that does not hold | Basis |
|---|---|
| Ratios of linear expressions in L alone are closed under the four arithmetic operations | Proposition 7.2 |
| Fε contains a solution of $x^2=2$ | Proposition 8.5 (compatible with the extension to the type T) |
| Fε contains a solution of $x^2=\varepsilon$ | §8.6 (parity of $v$) |
| The standard part can be extended to a total map while preserving multiplication | Counterexample in §8.5 |
| One can discard differences in $b$, preserve addition of outputs at the same recursion count, and also keep additive cancellation and nonzeroness | Calculation in §7.3 |
| One can set $B_m^\#=A_m^\flat$ at each stage | §9.4 |
| Volume-generating labels can be required to satisfy finite additivity and the cubic scaling law and still be made nonzero | Proposition A.4 |

### 11.7 What Is Not Claimed, and Distinctions Not to Be Confused

The following are not claimed.

- **On foundations.** The consistency of the system of this manuscript. Independence from existing theories. The ability to replace all of mathematics. That existing theories contain contradictions, or that their theorems are wrong. The negation of the axiom of choice, or the negation of any particular theorem.
- **On number systems.** Completeness. Recovery of all classical real numbers. Automatic decision of every equation. That the process of generation alone forces a unique number system. That Fε is the same thing as the ordinary real numbers $\mathbb R$. That Fε can replace the hyperreal numbers of nonstandard analysis (it has no transfer principle; §11.5).
- **On computation.** Automatic certification of the termination or the specification of arbitrary programs. Execution of arbitrary infinite sums or infinite operations. That the collection of all interval-generating labels forms a field. A catalogue of functions provided as a standard feature. Agreement of values or evidence in computation models for which computing according to the rules (§10.6) or the translation conditions (§10.5) have not been confirmed. That the runtime's BigInt implementation is correct (Proposition 10.6 is a proposition about the rules of binary addition).
- **On proofs.** That every hand-written proof has been machine-checked. That the port to proof assistants (§10.7) covers the whole of this manuscript. That success on finite examples amounts to a proof of a general theorem. That being encodable as a symbol string amounts to a proof of the proposition.

The following distinctions are not to be confused.

| Distinction | Content | In the text |
|---|---|---|
| Recursion count $n$, relation-operator count $k$, precision $p$ | These are three different quantities | §6.1, §7.1, §9.2 |
| Generative labels and relation labels | The former retain rules; the latter are finite pairs | §1.4, §6 |
| Addition of generative processes and addition of labels | The result depends on the order | §7.3 |
| The fraction $1/3$, the recurring-digit record `0._3`, and the lower generative process | These are different objects | §5.5, A.1–A.5 |
| Rational precision and full precision | Their criteria of closeness differ | §9.9 |
| Syntactic equality, β-equivalence, equality at each type | Their evidence takes different forms | §2.4 |
| Being encodable and being provable | These need separate confirmation | §2.6 |
| Introducing a symbol, constructing a representation, proving that the operations hold | These three stages are kept separate | §1.5 |
| Hand-written proofs and machine checking | Their scopes are kept separate | §1.3, §12 |
| Mathematical termination and the resource limits of an implementation | These are separate matters | §2.5, §10.4 |
| A value of a type and its abbreviated representation | Writing $(-1,0)$ of T as $-1$ does not change the type | §2.7 |

## 12. Principal Results and Kinds of Proof

The following table summarizes the principal results and the kind of proof each one has. The terms for the kinds of proof (definition, hand-written proof, machine check, execution check) are as in §1.3. An external comparison is a proof that uses the definitions and known results of the theory compared; that theory is not made an internal premise.

| Result | In the text | Kind of proof |
|---|---|---|
| Logical conventions (intuitionistic reasoning) | §1.2, §2.4 | Definition (adopted conventions) |
| Correspondence between constructor representations and Church operations | Proposition 2.1 | Hand-written proof. Not machine-checked |
| Reversible encoding of finite syntax | Proposition 2.2 | Hand-written proof. Execution check of individual encodings and decodings |
| Correspondence between intermediate notation and f-only notation | Proposition 2.3 | Hand-written proof. Execution check of string conversion and restoration |
| Specifying the type before calculation, and the natural-number formation check NatForm | §2.7, Proposition 2.4 | Hand-written proof. Execution check of the finite program tree on concrete inputs |
| Semiring laws for addition and multiplication of natural numbers | Lemma 3.1–Theorem 3.4 | Hand-written proof. Machine check (§10.2, §10.7) |
| Normalization of zero and ring laws for integers | Lemma 4.1, Theorem 4.2 | Hand-written proof |
| Uniqueness of normalization of rational numbers, and the ordered field | Theorems 5.1, 5.2, §5.4 | Hand-written proof |
| The finite error contract of qlim | Proposition 6.1 | Hand-written proof |
| Common subsequences and introduction of relation labels | Propositions 6.2, 6.3, §7.3 | Hand-written proof. Execution check of the nonadditivity of introduction and of concrete examples |
| The ordered additive group of L | Theorem 7.1 | Hand-written proof. Even when $b$ is forgotten, the relation-operator count after operations is retained |
| Failure of closure for ratios of linear expressions in L | Proposition 7.2 | Hand-written proof (counterexample). Does not apply to fractions over M |
| The commutative ring M, with no zero divisors | §8.1 | Hand-written proof |
| The field, normalization, and order of Fε | Theorems 8.1–8.3 | Hand-written proof. Execution check of operations and evidence on concrete inputs |
| The standard part on the finite part | Theorem 8.4 | Hand-written proof. Execution check of concrete calculations |
| No element of Fε has square two | Proposition 8.5 | Hand-written proof |
| Field laws for generative complex numbers | Theorem 8.6 | Hand-written proof. Execution check of the encoding and decoding of values. No dedicated arithmetic program is included |
| Division-ring laws for generative quaternions | Theorem 8.7 | Hand-written proof. No machine check of the general laws |
| Conditional minimality | Theorem 8.8 | Hand-written proof |
| The type T and calculation in a fixed type | Theorem 8.9, Corollary 8.10 | Hand-written proof. Execution check of the encoding of finite pairs and of two products. No dedicated general arithmetic program for T is included |
| The category of computation traces | §9.1 | Hand-written proof of the validity of composition and of the boundary equations. Machine check of the three concatenation laws (§10.2, §10.7) |
| Translation of generative labels and a category with inverse arrows | §9.1 | Hand-written proof |
| Interval arithmetic and reciprocals with separation evidence | Proposition 9.1 | Hand-written proof. Execution check of local traces of finite responses for known rules |
| Preservation of response compatibility, allocation of precision, and classification of zero | §9.2 | Hand-written proof. Execution check of concrete requests with exact arithmetic |
| Interval-generating labels for √2 and Π | §9.3, §9.4 | Hand-written proof (invariants and widths). Execution check of finite examples with exact arithmetic |
| Differentiation of polynomials, error guarantees, and formal integration | §9.5 | Hand-written proof |
| General alternating sums, Newton comparison, and sequences with a modulus of error | Theorems 9.2–9.4 | Hand-written proof. Execution check of concrete requests with exact arithmetic |
| Full precision, its difference from rational precision, difference quotients of the reciprocal, and errors of rectangle sums | §9.9 | Hand-written proof |
| Connecting exact elements with approximation responses | Proposition 9.5 | Hand-written proof. Not machine-checked |
| Errors in an infinitesimal direction and rational precision | Proposition 9.6 | Hand-written proof. No claim that approximation decides exact equality |
| λ arithmetic for signed integers and unreduced fractions | Propositions 10.1, 10.2 | Hand-written proof. Execution check of δ- and β-traces on selected closed inputs |
| The additive-group identity $(c+u)+(-u)=c$ and agreement of left and right inverse arrows | §10.5 | Machine check of the 3-step and 5-step equational traces under declared laws and assumptions. The step on to cancellation is a hand-written proof |
| Addition by a register machine | §10.5 | The guarantee for all inputs is a hand-written proof. Execution check of all transitions on concrete inputs |
| Conditional preservation of finite traces | Proposition 10.3 | Hand-written proof. No general translator is included |
| Uniqueness of values fixed by rules | Theorem 10.4 | Hand-written proof. Machine check of the cases of addition, multiplication, and concatenation (§10.7) |
| Conditional independence from the computation model | Corollary 10.5 | Hand-written proof. For addition, five computation models and the binary model were shown to compute according to the rules (§10.6) |
| Correctness of binary addition | Proposition 10.6 | Hand-written proof. Machine-checked together with the fact that the binary model computes addition according to the rules (§10.7) |
| Port of the f-trees, the 16 propositions, the round trip of the encoding of natural numbers as chains of f, and binary addition | §10.7 | Machine check (proofs rewritten in each system; no additional axioms) |
| Counterexamples to the completeness of Fε | Proposition 11.1 | Hand-written proof |
| Recurring-digit records and their rational, upper, and lower readings | A.1, A.2 | Definition (a finite construction for explicitly given inputs and interpretations). Equality of rational numbers is retained |
| Finite error contract and introduction for the geometric family | Propositions A.1, A.2 | Hand-written proof. Execution check of structure, arithmetic, and rejection on selected inputs |
| $0.999\ldots\ne1$ under the convention for the ellipsis | Theorem A.3 | Hand-written proof (from the definition of Ψ and the order of L). The comparisons of tripling and multiplying by ten in A.5 are also hand-written calculations |
| Relation labels from volume-generating processes | A.6 | Definition (application of the introduction rule to H). Not the ordinary volume measure |
| Compatibility conditions for a self-similar partition and nonzero volume | Proposition A.4 | Hand-written proof |
| Rational cut for the dimension of the Menger sponge | Proposition A.5 | Hand-written proof. Execution check of interval endpoints by integer comparisons. Agreement with the ordinary dimension is an external comparison |
| Embedding of Fε into the surreal numbers | Proposition B.1 | External comparison (using the known ordered-field structure of the surreal numbers) |
| Finite recursion, cut, and uniqueness for pi | Propositions B.2–B.4 | Hand-written proof. Execution check of 15 related finite examples |
| Identification with conventional pi | Proposition B.5 | External comparison (by the standard integral representation and the Archimedean property). Neither an axiom of the internal construction nor a result of machine checking |
| Positive affine transformations | Proposition B.6 | Hand-written proof. No field structure on the whole type is claimed |

The general propositions that have been machine-checked are the 16 propositions of §10.2, the two equations with assumptions in §10.5, and the 25 theorems ported to three proof assistants in §10.7 (including the 16 propositions). The general laws of the constructions from the integers onward have hand-written proofs.

Execution checks are regression checks on selected inputs and checks that erroneous inputs or results are rejected. What they cover is itemized in §10.3. The number of checks does not mean that the same number of general theorems have been proved.

The checking records and related executable materials are the [general-equation checking report](../verification/equational-report.json), the [checking report for saved individual evidence](../verification/evidence-report.json), the [implementation checking report](../verification/verification-report.json), the [equational-proof checker](../verification/equational-checker.mjs), the [finite proof data](../verification/certificates/nat-and-paths.json), the ports to proof assistants ([Lean 4](../verification/proof-assistants/FGen.lean), [Rocq](../verification/proof-assistants/FGen.v), [Agda](../verification/proof-assistants/FGen.agda)), the [λ-calculus interpreter v8.0.1](../interpreter/lambda_interpreter_v8.0.1.html), the [application research notes](../research/applications-v1.5.9.md), the [computation-trace extensions](../research/trace-extensions-v1.5.9.md), and [connecting λ integer and fraction arithmetic](../research/lambda-arithmetic-v1.5.9.md).

## 13. Open Problems

The following problems are not conditions for using the constructions of this manuscript. Providing all functions and procedures as standard features, or introducing universal type determination, is not a requirement either.

1. **Extending the introduction rules.** Introduction of relation labels has been defined for the standard family G and the geometric family H. To extend it to other generation families, such as continued fractions or general series, the conditions and finite evidence are given for each family, and it is stated explicitly which operations are preserved and which are not. In doing so, the rules that compute finite-stage outputs, the numerical operations that retain the number of # symbols, and the guarantees for approximation responses are not to be confused.
2. **Correspondences for general generation records.** For general generation records, which information must a correspondence retain, and which operations does that correspondence preserve? Introduction that discards $b$ in the standard family is already defined, but it does not decide equality of all programs.
3. **Enlarging the set of functions.** Under which error contracts should the interval-generating labels for square roots and alternating sums be extended to exponential, logarithmic, trigonometric, and other functions? The key question is under which conditions finite termination and error evidence can be extended to series other than monotone alternating sums, to continued fractions, and to analytic functions. For each procedure that becomes necessary, its input type, output format, error, and conditions for finite termination are stated explicitly.
4. **Decidable classes of generators.** Identify restricted classes of generators for which equality and order can be decided.
5. **Upper and lower generation processes and adjacency.** How should the upper and lower generation processes of an alternating series be connected to information about relation-operator adjacency restricted to L? They cannot be the same element of L while their rational components at finite values differ. Adjacency is not required over all of M.
6. **Mixed types.** If an operation such as $\pi_{\mathrm{cut}}+\varepsilon$ becomes necessary, a new type equipped with preservation conditions is built. The question is then how to reconcile the difference between equality of rational cuts and equality in Fε.
7. **Fields of infinitesimals with roots.** In Fε, neither $2$ nor $\varepsilon$ has a square root (Proposition 8.5, §8.6). Extending to series that allow fractional exponents such as $\varepsilon^{1/2}$ and real algebraic coefficients (Puiseux series) gives a real closed field, that is, a field in which every positive element has a square root and every polynomial of odd degree has a root (Basu–Pollack–Roy 2006, §2.6). The leading power and coefficient of a root series can be read off from the Newton polygon by finite computation. If the root is not a multiple root and its leading term separates it from the other roots, the remaining terms are found one after another by an iteration of the same form as Newton's method in §9.7. Since a root is in general an infinite series, it would be held as a pair of a polynomial that determines the root and a finite procedure that returns as many terms as needed. Real algebraic geometry has algorithms for deciding equality and order (same book). The problem is to carry them over to the form of finite records and checks used in this manuscript.
8. **Extending machine checking.** Transfer the general laws for integers, rational numbers, polynomials, and the type T into finite proof data, one small lemma at a time. Also in scope are common subsequences, introduction, nonadditivity, error margins, interval arithmetic, reciprocals with separation evidence, alternating sums, Newton comparison, conversion from a modulus of error, and the finite recursion and membership evidence for pi. Extending the port to proof assistants (§10.7) to the constructions from the integers onward, relation labels, generative labels, interval-generating labels, the category of computation traces, and Corollary 10.5 lies in the same direction. A small checker for the whole of the natural deduction of §1.2 can also be built on the same principle.
9. **Strengthening the interpreter and the checkers.** Develop substitution, environment expansion, and output records into a format that can be rechecked independently. Rechecking with another implementation, porting the checkers to λ, and formal verification of the implementation are problems in the same direction. If gcd and reduction to lowest terms are written in λ, even normalization of rational numbers can be carried out by pure λ-reduction. When porting to pure λ, the correspondence is confirmed together with the formation conditions and the grounds for termination.
10. **Prime certificates.** [Pratt (1975)](https://doi.org/10.1137/0204018) gave a finite certificate in the form of a tree to attach to “$p$ is prime.” The certificate records the prime factorization of $p-1$ and one integer $a$. The checker confirms that the factors multiply to $p-1$, that the remainder of $a^{p-1}$ divided by $p$ is $1$, and that for each prime factor $r$ of $p-1$ the remainder of $a^{(p-1)/r}$ is not $1$. Each prime factor appearing in the factorization gets a certificate of the same form, stopping at $2$. The size of the certificate and the work of checking it are bounded by a polynomial in the number of digits of $p$. Checking needs only multiplication and remainders, so it fits well with a small checker. However, the proof that $p$ is prime when the conditions hold, that is, the proof that this check is correct, requires an argument about orders in groups, which this manuscript does not give.
11. **Transformations between computation traces.** In §9.1, different histories reaching the same result are not taken to be the same arrow. One direction is to keep that difference and treat the relations between histories as finite records. Let $I=\lambda z.z$. Then the history that reduces $(I\,a)\,(I\,b)$ from the left and the history that reduces it from the right have the same start and the same end. The two reductions take place at different places in the term, and performing one does not change the place or the form of the other. Two such steps are called independent. Swapping the order of two adjacent independent steps carries one history to the other. The record of this swap is an arrow from a history to a history (an arrow one level up). The record need only state the position swapped, and the checker need only confirm that the places of the two reductions do not overlap and that the intermediate term after the swap agrees with the rule of each step. Swaps performed one after another form a single transformation; there is also a transformation that does nothing, and composition of transformations is associative. A transformation carrying a history $h$ to $h'$ also carries $k\circ h\circ j$ to $k\circ h'\circ j$ whenever histories $j$ and $k$ can be concatenated before and after it. On the other hand, the one-step history that reduces the outer redex of $I\,(I\,x)$ and the one-step history that reduces the inner one have the same start and the same end ($I\,x$), but the places reduced differ, and since each has only one step, swaps do not relate them. Under Lévy's permutation equivalence, too, these two are not equivalent. With three independent steps, transformations between transformations also appear. With nested reductions, an outer reduction can copy or erase an inner one, so transformations are not mere swaps. The first problem is to decide which transformations are the basic steps and which checker confirms their records. If records of transformations can be represented as f-trees and confirmed by a small checker, the question “Are two computations essentially the same?” can be treated not in terms of values or numbers of steps, but as the question of whether a checkable transformation exists.

Even when the system is extended by adding new representations, observational equivalences (equalities that identify things that cannot be distinguished by responses), or operation contracts, renaming alone does not resolve these problems. Both finite processing for each example and general guarantees must be described.

## Appendix A. Comparing decimals, approach directions, and volume generation

Specifying a sequence of digits, evaluating that sequence as a rational number, returning rational responses in succession, and introducing a relation label from them are separate operations. This appendix gives several readings of the same finite description and computes their differences. In A.5 we adopt a convention that determines the value of a decimal by its construction, and under it we show $0.999\ldots\ne1$ (Theorem A.3). A.6–A.8 treat the volume-generation procedure for the Menger sponge, the boundary with ordinary volume laws, and the rational cut for its dimension. Statements about ordinary real numbers provide an external comparison; they do not add a set of real numbers or the set axioms of ZF/ZFC to the internal construction.

### A.1 Recording and evaluating recurring decimals

We introduce a notation that specifies recurring digits finitely. The digits after an underscore form the repeating block; for example, `0._3` specifies repetitions of 3, and `0._123` specifies repetitions of 123. The underscore itself specifies neither whether to approach from above or from below nor whether to introduce a relation label. Which operation is performed on the digit record is chosen at the start of the computation.

We introduce this notation not because an ellipsis cannot be defined mathematically, nor because ordinary decimals cannot exactly represent recurring decimals or irrational numbers. Ordinary infinite decimals also have rigorous interpretations. The problem arises when the rule producing the digits, or what the description is to be read as, is not made explicit.

A decimal record consists of three parts: a nonnegative integer part, a finite initial list of nonrepeating digits, and a nonempty list of repeating digits. Since the digits are kept as lists, leading zeros are not lost, and whether every digit lies between 0 and 9 can be checked finitely. Let $I$ be the integer part, let $U$ and $k$ be the integer read from the initial digit list and its length, and let $D$ and $m$ be the integer read from the repeating digit list and its positive length. Define the rational evaluation of the record by

$$
\operatorname{val}(I,U,k,D,m)
:=I+\frac{U}{10^k}+\frac{D}{10^k(10^m-1)}.
$$

Here $\operatorname{val}$ is a local name for evaluating this finite recurring-digit record as a rational number; it is not a general operation evaluating arbitrary generation programs as exact numbers. Its value is obtained using only the rational arithmetic of §5. The finite decimal obtained by concatenating the repeating block after the decimal point exactly $n$ times is the following finite geometric sum (for $n=0$, the sum contributed by the repeating part is zero).

$$
I+\frac{U}{10^k}+
\sum_{j=1}^{n}\frac{D}{10^{k+mj}}
=
I+\frac{U}{10^k}+
\frac{D(1-10^{-mn})}{10^k(10^m-1)}.
$$

The identity is verified by induction on $n$. For rational evaluation, it suffices to compute the fraction in $\operatorname{val}$ directly; no infinitely repeated addition is executed.

$$
\operatorname{val}(0,0,0,3,1)=\frac13,\qquad
\operatorname{val}(0,0,0,9,1)=1,\qquad
\operatorname{val}(0,5000,4,753,3)
=\frac{5000}{10^4}+\frac{753}{10^4(10^3-1)}.
$$

The value $\operatorname{val}(0,0,0,3,1)$ is the exact rational number $1/3$ (§5.5), and no relation operator is attached. This rational evaluation is not changed by the readings defined below.

### A.2 Lower and upper procedures using the same digits

Compare the procedure that adds the digits of `0._3` in turn and returns the value of a finite truncation with the procedure that returns the boundary one unit in the last retained decimal place above that truncation. Taking the recursion count $n$ to be a natural number, define the following two responses.

$$
\begin{aligned}
d_n&:=\sum_{j=1}^{n}3\cdot10^{-j}
=\frac{1-10^{-n}}3,\\
u_n&:=d_n+10^{-n}
=\frac13+\frac23\,10^{-n}.
\end{aligned}
$$

For $n$ equal to 1, 2, and 3, the lower responses are 0.3, 0.33, and 0.333, and the upper responses are 0.4, 0.34, and 0.334. The upper values are not the finite sums obtained by adding up the digits 3; they are boundary values obtained by adding, to the finite truncation from the same digits, the rational width corresponding to the number of digits.

$$
d_n<\frac13<u_n,\qquad
u_n-d_n=10^{-n},\qquad
d_{n+1}>d_n,\qquad u_{n+1}<u_n.
$$

Thus the two describe the same nested digit intervals. As ordinary real numbers, both sequences have limit $1/3$. This manuscript treats as distinct their respective rational responses, the exact rational number $1/3$, and the upper and lower relation labels introduced in A.4.

### A.3 Adding a geometric generation family by finite rules

In addition to the standard family $G$ of §6, specify the geometric family $H$ needed for the procedures treated here. Its inputs $q,b,r$ have rational type, and its formation condition and responses are defined as follows.

$$
0<r<1,\qquad
H(q,b,r):\quad
x_0=q+b,\quad x_{n+1}=q+r(x_n-q).
$$

Here $H$ names a geometric generation record and is distinct from the generative quaternion type $\mathsf H_\varepsilon$ of §8.8. The parameter part can be stored as the finite pair $(q,(b,r))$; when a rule name, the version of the referenced definition, or a computation trace of the calculations performed is attached, the finite representation of §6.4 is used as well. Induction on $n$ gives the response formula

$$
x_n=q+br^n.
$$

The response to each finite $n$ is obtained by finitely repeated rational arithmetic. If $b$ is positive, every response lies above $q$; if negative, every response lies below it; if zero, every response is $q$. The following guarantee is also given using rational numbers alone.

**Proposition A.1 (Finite error contract for the geometric family).** From permitted $q,b,r$ and a positive rational $\delta$, one can finitely compute a natural number $N$ that guarantees the error for all $n\ge N$. Specifically, the following choice suffices.

$$
a:=\frac{1-r}{r}>0,\qquad
N:=\left\lceil\frac{|b|}{a\delta}\right\rceil,\qquad
n\ge N\ \Longrightarrow\ |x_n-q|<\delta.
$$

**Proof.** Induction on $n$ gives the following inequalities.

$$
(1+a)^n\ge1+na,\qquad
r^n=\frac1{(1+a)^n}\le\frac1{1+na}.
$$

If $b$ is zero, the error is zero. Otherwise, the chosen $N$ and the condition on $n$ give the following.

$$
na\ge\frac{|b|}{\delta},\qquad
|x_n-q|\le\frac{|b|}{1+na}
\le\frac{|b|}{1+|b|/\delta}<\delta.
$$

The ceiling, the rational operations, and the calculation of the response after $n$ recursions can be carried out finitely. The universal guarantee rests on the inductive proof of the inequalities. □

Using L, define introduction from this family by

$$
\Psi(H(q,b,r)):=(2\operatorname{sgn}(b),q)
=
\begin{cases}
q^{\#\#},&b>0,\\
q^{\flat\flat},&b<0,\\
q,&b=0.
\end{cases}
$$

**Proposition A.2 (Finite introduction from the geometric family).** The formation condition of $H$ can be checked, and the output of $\Psi$ computed, finitely. Equality of outputs is determined by equality of the rational components and of the signs of $b$.

$$
\Psi(H(q,b,r))=\Psi(H(q',b',r'))
\quad\Longleftrightarrow\quad
q=q'\ \land\ \operatorname{sgn}(b)=\operatorname{sgn}(b').
$$

**Proof.** Whether $r$ lies between zero and one, and the sign of $b$, are decided by the rational comparison of §5. The output is a pair of the specified integer and $q$, and equality in L is componentwise. □

The map $\Psi$ does not carry the magnitude of $b$ or $r$ into the output label. The original generation record retains them, so finite responses can be reproduced. This is not a procedure for deciding equality of arbitrary programs, nor does it extend the common-subsequence proof of Proposition 6.2 to all of $H$. Assigning two # operators to the positive side and two ♭ operators to the negative side is an additional construction rule that follows the same policy as $\Phi$.

The error target in Proposition A.1 is the rational number $q$; error relative to the output of $\Psi$ is evaluated separately. For nonzero $b$, the following holds in the representation embedding L into Fε.

$$
\varepsilon
<
\left|x_n-\left(q+2\operatorname{sgn}(b)\varepsilon\right)\right|
=|b|r^n-2\varepsilon
<|b|r^n.
$$

This is because the rational component $|b|r^n$ of the absolute value is positive at each finite stage and exceeds every fixed integer multiple of $\varepsilon$. Thus the $N$ of Proposition A.1 can also be used to guarantee a rational error $\delta$ relative to this label, but no finite stage reaches the error tolerance $\varepsilon$. This differs from convergence that allows every positive element of Fε as an error tolerance. This is the distinction between rational precision and full precision in §9.9.

### A.4 Rational evaluation and direction-specific label arithmetic

Write the two procedures of A.2 as instances of $H$ and apply $\Psi$. The right-hand representations use the embedding of L into Fε from §8.4.

$$
\begin{aligned}
(d_n)&:\ H(1/3,-1/3,1/10)
\ \xmapsto{\Psi}\ (-2,1/3)=\frac13-2\varepsilon,\\
(u_n)&:\ H(1/3,2/3,1/10)
\ \xmapsto{\Psi}\ (2,1/3)=\frac13+2\varepsilon.
\end{aligned}
$$

Both differ from the rational evaluation $1/3$. Choosing the upper procedure gives the positive-side label; choosing the lower gives the negative-side label. Neither is selected automatically from the record of recurring 3s alone.

Similarly, prepare lower and upper procedures for $2/3$. The lower responses are 0.6, 0.66, and 0.666, and the upper responses are 0.7, 0.67, and 0.667. The corresponding labels are as follows.

$$
\ell_{1/3}=(-2,1/3),\quad
h_{1/3}=(2,1/3),\quad
\ell_{2/3}=(-2,2/3),\quad
h_{2/3}=(2,2/3).
$$

The label addition of §7.1 gives

$$
\begin{aligned}
\ell_{1/3}+\ell_{2/3}&=(-4,1)=1^{\flat\flat\flat\flat},\\
h_{1/3}+\ell_{2/3}&=(0,1)=1,\\
h_{1/3}+h_{2/3}&=(4,1)=1^{\#\#\#\#}.
\end{aligned}
$$

By contrast, the sum as rational numbers is always $1/3+2/3=1$. In the middle example, the corresponding upper and lower rational responses also sum to 1 at each $n$. However, adding the two lower finite responses first gives a different calculation:

$$
\frac{1-10^{-n}}3+\frac{2(1-10^{-n})}3
=1-10^{-n},\qquad
\Psi(H(1,-1,1/10))=(-2,1)=1^{\flat\flat}.
$$

This differs from the first result, obtained by adding after introduction. Like $\Phi$, $\Psi$ is not a map that preserves addition of responses at the same $n$ as addition of labels. Adding the two upper responses first and then introducing gives two # operators rather than four. When the order of operations is stated explicitly, the difference in results is explained by calculation with finite pairs.

Nor do rational-precision intervals determine an exact label uniquely. For a fixed integer $k$, the following holds at every finite stage of A.2.

$$
d_n<\frac13+k\varepsilon<u_n.
$$

This is because the rational gaps on the left and right are positive and exceed any finite integer multiple of $\varepsilon$. That the intervals have a single common point as ordinary real numbers, and that distinct elements of Fε can respond to the same rational precision, are claims in different types.

### A.5 What does repeating nine denote?

The value of a decimal is determined by its construction, not by its appearance. Notations such as $0.999\ldots$ and $0.333\ldots$ do not say how the decimal is made, so a value is fixed only once a construction is specified. If the decimal is made by adding one digit at a time, as in $0.9+0.09+0.009+\cdots$, its value is $1-2\varepsilon$ (Theorem A.3); for $0.3+0.03+0.003+\cdots$, it is $1/3-2\varepsilon$. If we decide that the decimal is another way of writing a fraction, then $0.999\ldots=1/1$ and $0.333\ldots=1/3$, and the value remains the fraction. When the decimal is made by addition, the ordinary real numbers take the limits $1$ and $1/3$ as the values, whereas this manuscript takes as the value a relation label that retains the direction of approach.

To avoid confusion, this manuscript writes rational numbers as fractions and uses a decimal with an ellipsis only as an abbreviation for the digit-adding construction. A finite decimal ends after finitely many additions, so it is used as it stands to write a rational number. For recurring decimals, we stipulate the following.

**Convention (Recurring decimals written with an ellipsis).** The recurring decimal of a record $(I,U,k,D,m)$ written with the ellipsis … is an abbreviation for the lower generation procedure that adds the repeating block one copy at a time,

$$
H\Bigl(\operatorname{val}(I,U,k,D,m),\ -\frac{D}{10^k(10^m-1)},\ 10^{-m}\Bigr)
$$

and its value is the relation label obtained by applying $\Psi$ to this generation procedure.

By the finite geometric-sum formula of A.1, the $n$th response of this generation procedure is the finite decimal obtained by concatenating the repeating block $n$ times. If $D=0$, the coefficient is zero, so the value is the rational number $\operatorname{val}$. We write the generation procedure as $H(\cdots)$, the recurring-digit record as `0._9`, and the evaluation as a rational number as $\operatorname{val}$, keeping them distinct, and we do not apply this convention to nonrecurring infinite decimals. For example, the generation procedures of $0.999\ldots$, $0.333\ldots$, and $9.999\ldots$ are $H(1,-1,1/10)$, $H(1/3,-1/3,1/10)$, and $H(10,-1,1/10)$, respectively. The record `0._9` does not specify a construction, so we do not apply an inequality to it alone.

The finite decimal $s_n:=\sum_{j=1}^{n}9\cdot10^{-j}=1-10^{-n}$, obtained by adding exactly $n$ digits nine, never equals 1 at a finite stage. This sequence is the response of $H(1,-1,1/10)$, and it is connected with the family of §6.1 by the finite index transformation $s_n=Q_{1,-1}(10^n-1)$.

**Theorem A.3 ($0.999\ldots\ne1$).** Under the above convention,

$$
0.999\ldots=\Psi(H(1,-1,1/10))=1^{\flat\flat}=1-2\varepsilon\ne1
$$

and $1-0.999\ldots=2\varepsilon>0$.

**Proof.** For the record $(0,0,0,9,1)$, $\operatorname{val}=1$ and the coefficient is $-9/(10^0(10^1-1))=-1$, so by the convention $0.999\ldots$ is an abbreviation for $H(1,-1,1/10)$, whose response is $s_n=1+(-1)\cdot(1/10)^n$. Since $b=-1<0$, the definition of $\Psi$ gives $(-2,1)$. Under the embedding of §8.4, this is $1-2\varepsilon$. Since $(-2,1)<(0,1)$ in the order of §7.1, it differs from 1 and is less than 1. The difference is $(2,0)=2\varepsilon$. □

Similarly, $0.333\ldots=(1/3)^{\flat\flat}=1/3-2\varepsilon\ne1/3$. For the digit records `0._9` and `0._3`, the values under each construction are as follows.

| Construction | Procedure | Case of `0._9` | Case of `0._3` |
|---|---|---|---|
| Another way of writing a fraction | Evaluate by $\operatorname{val}$ | $1$ | $1/3$ |
| Lower generation procedure that adds digits (written with an ellipsis) | Apply $\Psi$ to the $H$ that adds digits | $1-2\varepsilon$ | $1/3-2\varepsilon$ |
| Upper generation procedure | Apply $\Psi$ to the $H$ that returns the boundary one unit in the last decimal place above | $1$ (the response is the constant 1) | $1/3+2\varepsilon$ |

Theorem A.3 is not a refutation of the equality $0.999\ldots=1$, which is correct in the ordinary real numbers. It assigns a different object to the same-looking symbol string. Equality of fractions and of rational numbers is also unchanged: $\operatorname{val}(0,0,0,9,1)=1$. Failure to equal 1 at a finite stage is a property of this response formula. The definition of a limit contains no condition that “the target is not reached”; in the ordinary real numbers, the constant sequence 1 also converges to 1. When the direction is to be retained, this manuscript uses a separately specified introduction rule.

**Explanations by multiplication.** We read two well-known explanations of $0.999\ldots=1$ under this convention. The key points are whether the construction has been switched midway, and the distinction between operating on the generation procedure before introducing and introducing before operating.

The multiply-by-3 explanation (multiplying both sides of $0.333\ldots=1/3$ by 3 to obtain $0.999\ldots=1$) switches the construction midway. The starting point $0.333\ldots=1/3$ is an equation that reads the decimal as another way of writing a fraction, whereas the $0.999\ldots$ obtained by changing each digit 3 to 9 is the digit-adding construction. If we keep to the reading as another way of writing a fraction, all that is stated is the equation of fractions $3\cdot(1/3)=1/1$, and nothing is said about the value of the construction that adds nines. If we keep to the digit-adding construction, the starting point is $0.333\ldots=1/3-2\varepsilon$; multiplying the generation procedure by 3 and then introducing gives $\Psi(H(1,-1,1/10))=1-2\varepsilon$ from $3d_n=1-10^{-n}$, whereas introducing and then multiplying by 3 gives $3(1/3-2\varepsilon)=1-6\varepsilon$. Neither is 1, and the two do not agree.

The multiply-by-10 explanation (if $x=0.999\ldots$, then $10x=9.999\ldots$, so $9x=9$) fails at the step $10x=9.999\ldots$, because $9.999\ldots=\Psi(H(10,-1,1/10))=10-2\varepsilon$ but $10x=10-20\varepsilon$. We get $10x-x=9-18\varepsilon=9x$, and $9x=9$ does not follow. Multiplying the generation procedure by 10 and then introducing does give $10-2\varepsilon$, but $10s_n$ is the response of $H(10,-10,1/10)$, a record different from $H(10,-1,1/10)$, with the index shifted by one. The two give the same label because $\Psi$ discards the magnitude of $b$. Also, subtracting the response of $H(1,-1,1/10)$ from that of $H(10,-1,1/10)$ at the same $n$ gives the constant 9, but this is a different procedure from $10s_n-s_n=9s_n=9-9\cdot10^{-n}$.

These explanations are correct in the ordinary real numbers because the limit of the digit-adding construction agrees with the value of the fraction, so that switching constructions does not change the value; because taking limits preserves constant multiples and sums; and because shifting the index does not change the value. Since $\Psi$ discards the magnitude of $b$, it does not in general preserve addition of responses or multiplication by positive rational numbers (it does preserve rational translation and sign reversal).

### A.6 Volume generation for the Menger sponge

Repeat the operation of dividing a unit cube into thirds along each axis to make 27 smaller cubes and retaining 20 of them. After $n$ iterations there are $20^n$ cubes of side length $3^{-n}$. For the construction and the Hausdorff dimension, see Marcolli's teaching material [Menger Universal Spaces](https://www.its.caltech.edu/~matilde/FractalsUToronto7.pdf), pp.3–4. The finite-stage volume and its recursion are as follows.

$$
V_n=20^n(3^{-n})^3=\left(\frac{20}{27}\right)^n,\qquad
V_0=1,\quad V_{n+1}=\frac{20}{27}V_n.
$$

This finite procedure is an instance of $H$:

$$
H(0,1,20/27)\ \xmapsto{\Psi}\ (2,0)=0^{\#\#}=2\varepsilon>0.
$$

We call this output the relation label introduced from the sponge's volume-generation procedure. The original generation record reproduces the positive rational volume at each finite stage, and the introduced value retains in L the direction of approach to zero from the positive side. Proposition A.1 guarantees finite responses at each rational precision relative to the rational number zero. The difference from error relative to the label was evaluated in A.3.

In comparison with external ordinary mathematics, the completed sponge has zero three-dimensional volume. The set is contained in the union of the cubes at every finite stage, and their total volume can be made smaller than any positive rational number, so its volume, being nonnegative, is zero. This is not a claim that the volume becomes zero at a finite stage.

We also distinguish the three-dimensionality of the ambient space from the fact that the sponge's own Hausdorff dimension is less than three. The latter has the following value; it is not an alternative explanation of zero volume obtained by changing the ambient dimension.

$$
\dim_{\mathrm H}=\frac{\log20}{\log3}<3.
$$

This formula is used for comparison with the ordinary theory; logarithmic functions and Hausdorff measure have not been constructed internally in this manuscript. The value itself, however, can be built as a rational cut from the numbers 20 and 3 of the generating rule (A.8). Ordinary zero volume and this manuscript's nonzero label are quantities obtained by different rules; they are not a contradiction about the same measured quantity.

### A.7 The boundary with ordinary volume laws

The relation label for volume generation cannot inherit every ordinary volume law unchanged. The following short calculation shows the boundary.

**Proposition A.4 (Compatibility conditions for a self-similar partition and nonzero volume).** Take the value $v$ of the sponge in Fε, and require finite additivity for its partition into 20 self-similar pieces. Require further that the similarity ratio for each piece is one third and that the volume becomes one twenty-seventh. If pieces overlap, the value of the overlap is treated as zero. Under these conditions, $v$ is zero.

**Proof.** The assumptions give

$$
v=20\,\frac{v}{27},\qquad
\frac7{27}v=0,\qquad v=0.
$$

The last step uses the inverse of a nonzero rational number in Fε. □

Therefore, treating the nonzero $0^{\#\#}$ under the same name as ordinary volume would require stating explicitly which law is changed. This manuscript states its scope explicitly as a relation label for volume generation and does not assert finite additivity or the cubic scaling law as an ordinary volume measure. This restriction does not change addition or multiplication in Fε; it arises because $\Psi$, which introduces labels from generation records, does not in general preserve addition of responses or multiplication by positive rational numbers. For example, a record whose initial volume-generation value is doubled introduces the same positive-side label, whereas doubling the label after introduction gives four # operators.

### A.8 Building the dimension as a rational cut

The finite volume responses approach zero, and the ordinary limit retains no information about the generation. The generating rule (retain 20 cubes and reduce the side to one third), on the other hand, carries the information that determines the dimension. If each side of a segment, a square, or a cube is divided into thirds and all the pieces are retained, the numbers of pieces at stage $n$ are $(3^n)^1$, $(3^n)^2$, and $(3^n)^3$, and the exponents are the dimensions. The number of pieces for the sponge is $20^n$, so its dimension is the exponent $d$ with $20^n=(3^n)^d$, that is, with $3^d=20$, and $3^2=9<20<27=3^3$ gives $2<d<3$.

No logarithms are needed. Consider the real number $d$ satisfying $3^d=20$ in ordinary mathematics. For an integer $p$ and a positive integer $q$, $p/q<d$ and $3^p<20^q$ are equivalent (raise 3 to the power of each side and then take the $q$th power). The latter can be decided by comparing powers alone, so we use it as the definition and express it in the type $\mathsf{Cut}_{\mathsf Q}$ of rational-cut descriptions from Appendix B.5. A value of this type is a finite description of two predicates specifying whether a rational number lies below or above the number described, for which the five conditions of B.5 have been proved. Write a rational number $x$ as a fraction $p/q$ with positive denominator (if $p<0$, then $3^p$ is the rational number $1/3^{-p}$), and define the two predicates by

$$
L_d(x)\;:\!\Longleftrightarrow\;3^p<20^q,\qquad
U_d(x)\;:\!\Longleftrightarrow\;20^q<3^p.
$$

The result does not change for another representation $p'/q'$ ($q'>0$) of the same rational number. Since $pq'=p'q$, raising $3^p<20^q$ to the $q'$th power and raising $3^{p'}<20^{q'}$ to the $q$th power both give $3^{pq'}<20^{qq'}$, and positive integer powers of positive rational numbers preserve order (likewise for $U_d$).

**Proposition A.5 (The cut for the dimension of the Menger sponge).** The predicates $L_d$ and $U_d$ satisfy the five conditions of Appendix B.5. Moreover, for every rational number $x$, exactly one of $L_d(x)$ and $U_d(x)$ holds, and which one holds is decided by a single comparison of powers. Define this finite description to be $d_{\mathrm{cut}}:\mathsf{Cut}_{\mathsf Q}$.

**Proof.** First, if $q>0$, then $3^p\ne20^q$. This is because if $p\ge0$, then $3^p$ is odd and $20^q$ is even, and if $p<0$, then $3^p<1<20^q$. Hence, for every rational number, exactly one of the two predicates holds, and a single comparison decides which.

We check the five conditions. Write the two rational numbers to be compared as $a/m$ and $b/m$ with a common positive denominator $m$.

1. Witnesses on both sides: $3^2=9<20$ gives $L_d(2)$, and $20<27=3^3$ gives $U_d(3)$.
2. Closure away from the boundary: if $a<b$, then $3^a<3^b$, so $3^b<20^m$ implies $3^a<20^m$, and $20^m<3^a$ implies $20^m<3^b$.
3. Roundedness: suppose $L_d(a/m)$ and put $t=20^m/3^a>1$. By the same inequality $t^k\ge1+k(t-1)$ as in the proof of Proposition A.1, every positive integer $k$ with $k(t-1)>2$ (for example, $k=\lfloor2/(t-1)\rfloor+1$) gives $t^k>3$, so that $3^{ka+1}=3(3^a)^k<(20^m)^k=20^{km}$. Hence $(ka+1)/(km)$, which is larger than $a/m$, is also on the lower side. On the upper side, putting $t=3^a/20^m$, we find similarly that $(ka-1)/(km)$ is on the upper side.
4. Separation: if $L_d(a/m)$ and $U_d(b/m)$, then $3^a<20^m<3^b$, so $a<b$.
5. Locatedness: given $x<y$, compare at $x$. If $L_d(x)$, return it; if $U_d(x)$, return $U_d(y)$ by closure away from the boundary. □

For the cut for pi (Appendix B.5), no rule was given that always decides whether a single rational number lies above or below. For $d_{\mathrm{cut}}$, equality never occurs, so for every rational number a finite computation decides whether it lies above or below. From this it also follows that $d$ is not a rational number. In the cut of a rational number $c$ (the description with $x<c$ as the lower side and $c<x$ as the upper side), $c$ itself belongs to neither side, whereas in $d_{\mathrm{cut}}$, $c$ belongs to one of the sides. Hence $d_{\mathrm{cut}}$ is not equal to the cut of any rational number in the sense of the equality of Appendix B.6. The argument uses only the distinction between even and odd numbers and the fact that negative powers of 3 are less than 1.

**Computing intervals.** Below, $x<d$ abbreviates $L_d(x)$, and $d<x$ abbreviates $U_d(x)$. For example, $3^{272}<20^{100}<3^{273}$ (integers with 130, 131, and 131 digits) gives $2.72<d<2.73$. The denominator need not be fixed at 100. When $p/q<d<p'/q'$ ($q,q'>0$), the fraction $(p+p')/(q+q')$ lies between the endpoints, and narrowing the interval by comparison with this fraction achieves a small width with fewer digits. Starting from $2/1<d<3/1$, 33 comparisons give $10711/3928<d<14095/5169$, with width $1/20303832$ (about $4.9\times10^{-8}$); the integers compared have at most 6726 digits. These comparisons and digit counts were checked by execution in the [dimension-interval tests](../verification/menger-dimension-tests.mjs), which compute $3^p$ and $20^q$ as integers.

**Comparison with ordinary mathematics.** For the ordinary real number $d_{\mathbb R}=\log20/\log3$, when $q>0$, $p/q<d_{\mathbb R}$ is equivalent to $3^p<20^q$ (because the exponential and logarithmic functions are strictly increasing). Hence $d_{\mathrm{cut}}$ gives the same above-or-below decisions for rational numbers as the Hausdorff dimension of A.6. As with Proposition B.5, this is a comparison using external analysis, not an axiom of the internal construction. In ordinary mathematics, $V_n=(20/27)^n=(3^{-n})^{3-d_{\mathbb R}}$, and since $d_{\mathbb R}<3$, the volume approaches zero.

The same method applies to a figure that retains $N$ pieces and scales the side by $1/s$; then $p/q<d$ becomes $s^p<N^q$. The Cantor set ($N=2$), the Sierpiński carpet ($N=8$), and the Koch curve ($N=4$) all have $s=3$, so, for the same reason as for the sponge, equality never occurs, and above or below is decided for every rational number. When $N$ and $s$ are powers of the same number (for example, $N=4$, $s=2$), equality can occur, and $d$ is then a rational number.

What this section constructs is not a general theory of dimension but the rational cut of a single value, the dimension of this figure. The propositions of Appendix A and Theorem A.3 have hand-written proofs, and the multiply-by-3 and multiply-by-10 calculations of A.5 are likewise hand-written calculations from the defined rules. The scope of the execution checks is the individual responses for selected inputs, the results of introduction, the operations on finite pairs, and the interval comparisons above.

## Appendix B. Comparison with surreal numbers and an exact construction of pi

### B.1 Connections with surreal numbers

Conway's surreal numbers are a number system with infinitesimals, and they share with this manuscript the approach of building numbers in turn from a few rules. Knuth's *Surreal Numbers* (1974) introduced Conway's construction of surreal numbers in the form of a story. Conway's own account is in *On Numbers and Games* (1976). [Knuth's bibliography and introduction](https://cs.stanford.edu/~knuth/sn.html); [Conway, reprint of Chapters 0–2 of *On Numbers and Games*, pp. 101–122](https://ir.cwi.nl/pub/12933/12933D.pdf)

In the standard construction, sets of previously constructed numbers are placed on the left and right. If every left member is less than every right member, one constructs the number between them that is simplest in the construction. Simplicity concerns precedence in the construction, rather than the length of a printed expression. For example, the construction starts as follows.

$$
0=\{\mid\},\qquad 1=\{0\mid\},\qquad
-1=\{\mid0\},\qquad \frac12=\{0\mid1\}.
$$

Addition and multiplication are also defined recursively in terms of the preceding numbers on the left and right. The numbers appearing at finite stages are the dyadic rationals (rational numbers whose denominators are powers of 2). At the first infinite stage, which allows infinite left and right sets, real numbers that are not dyadic rationals also appear. This stage does not mean that a computer has finished executing infinitely many instructions.

Writing $D$ for the family of dyadic rationals, the positive square root, for example, can be represented by the following cut.

$$
\sqrt2=
\left\{d\in D:0\le d,\ d^2<2
\ \middle|\ d\in D:0\le d,\ d^2>2\right\}.
$$

This formula specifies the positive square root in the real part of the surreals. This notation, which places sets on the left and right, is not added to the internal notation of this manuscript. In this manuscript, the finite-pair type T of §8.10 already supplies a positive element whose square is two. The two approaches construct elements satisfying the same relation by different formation rules.

### B.2 Differences and advantages for the purpose of this manuscript

The full surreal numbers form a proper class containing the ordinary reals and the ordinals, and are treated as a real-closed ordered field. Their standard development uses transfinite constructions and also requires the treatment of sets and classes. In this respect it differs from this manuscript's policy of not bringing ZF or ZFC into the formation rules for numbers. This does not, however, say that the axiom of choice is indispensable to the construction of the surreals, or that they have no computationally accessible parts. [Costin–Ehrlich–Friedman, abstract, §3, and §9](https://arxiv.org/html/1505.02478v3)

| Point of comparison | The specified types and procedures of this manuscript | The full standard surreal numbers |
|---|---|---|
| Objects used to describe numbers | Finite syntax trees and explicit formation rules | Left and right sets, or ordinal-length sign sequences |
| Conditions for identifying numbers | Equality rules specified for each type | Numerical equality defined from a recursive order |
| Inputs involving infinity | Finite descriptions and responses to individual finite requests | Constructions including infinite sets and transfinite stages |
| Checking arithmetic and order | In Fε, reduction to finite polynomial processing with rational coefficients | The recursive definitions for the whole system do not alone give a finite-time execution specification |
| Required scope | Extension by preparing the types needed | A broad number system containing all reals and all ordinals |
| Treatment of evidence | Finite data read by a checker are distinguished from hand-written proofs of general laws | A general theory based on mathematical recursion and induction is central |

**The decisive advantage for this manuscript's purpose is that inputs, operations, termination conditions, and result checks can be tied to finite data of a specified type.** Readers can follow what was input to a computation, by which rules it proceeded, and which claim about the result was checked. For example, equality of two fractions in Fε only requires comparing the finite polynomials of their cross products, and order is determined by the nonzero coefficient of least degree. There is no need to expand infinitely many digits to the end.

For interval-generating labels as well, a procedure that takes a precision as input and returns a guaranteed rational interval can be given individually. The example of pi from B.4 onward likewise specifies, in turn, a finite description, the grounds for termination, equality, and the meaning of approximation. Being able to state explicitly where needed features are added and what has been proved is well suited to rechecking.

This is an advantage for the working purpose this manuscript has chosen, not an ability to handle more numbers than the surreals. Not every finitely writable program terminates, and equality in a new type is not necessarily always decidable. Nor are finite description, computability, and evidence checking themselves original discoveries of this manuscript.

### B.3 An explicit correspondence preserving infinitesimal arithmetic

The surreals contain $\omega$, which is greater than every natural number, and its reciprocal $\eta$.

$$
\omega=\{0,1,2,\ldots\mid\},\qquad
\eta=\frac1\omega>0,\qquad
\eta<r\quad(0<r\in\mathbb Q).
$$

The next proposition is an external comparison of the arithmetic of the two constructions; it does not make the surreals a premise of the internal construction of this manuscript.

**Proposition B.1 (An external correspondence preserving arithmetic and order).** Define a map from Fε to the surreals as follows. It is injective and preserves zero, one, the four arithmetic operations, and order.

$$
\iota\!\left(\frac{P(\varepsilon)}{Q(\varepsilon)}\right)
=\frac{P(\eta)}{Q(\eta)},\qquad Q\ne0.
$$

**Proof.** Let $a_d$ be the nonzero coefficient of least degree in a nonzero polynomial $P$, and let $M$ be the sum of the absolute values of the coefficients of higher degree. Since $0<\eta<1$, the following holds.

$$
P(\eta)=\eta^d\left(a_d+\sum_{j>d}a_j\eta^{j-d}\right),\qquad
\left|\sum_{j>d}a_j\eta^{j-d}\right|\le M\eta.
$$

If $M=0$, the parenthesized expression is $a_d$. If $M>0$, then $\eta<|a_d|/(2M)$, so the sign of the parenthesized expression agrees with the sign of $a_d$. Hence nonzero polynomials are mapped to nonzero values, and the denominator condition is preserved. The condition that a cross-product difference is zero is also preserved and reflected. Preservation shows that $\iota$ is well defined independently of the representation as a fraction, and reflection shows that it is injective. Preservation of the four arithmetic operations follows from substitution and finite polynomial operations, and preservation of order follows from the agreement of signs just shown. □

Under this correspondence, the following representations result.

$$
0^{\#\#}=2\varepsilon\ \longmapsto\ \frac2\omega,
\qquad
q^{\#\#}=q+2\varepsilon\ \longmapsto\ q+\frac2\omega.
$$

The four arithmetic operations on infinitesimals in this manuscript can be compared concretely with surreal arithmetic. This does not, however, mean that the rules introducing relation labels from generation records are also the same. Choosing $1/\omega$ as the image is not determined by the internal rules of this manuscript either.

Neither system has a least positive infinitesimal. This is because, for a positive infinitesimal $\delta$, the number $\delta/2$ is a smaller positive infinitesimal. In Fε, $0<\varepsilon^2<\varepsilon$, and $\varepsilon$ is not a smallest unit of spacing between numbers.

On the other hand, the image of this embedding is not the whole surreal system. Fε has no element whose square is two (Proposition 8.5), and the extension to type T of §8.10 is required. Nor can pi be obtained by unconditionally adding an element to Fε. From B.4 onward, a specified representation type for this purpose is constructed from finite procedures.

### B.4 What to add for pi

The interval-generating label of §9.4 returns a rational interval at the requested precision. Here we use all of its responses to specify one exact value. For this purpose we choose a separate type called a **rational-cut description**. We specify by finite rules “which rationals the value is greater than and which rationals it is less than,” and prove the conditions that these rules satisfy.

This type is not used in place of Fε. This is because identifying within Fε what rational precision cannot distinguish would lose even the positive ε. Nor do we transfer all interval-generating labels into a new field at once. What we add is the description of pi and the limited operations of B.8. The specification of the exact value, responses to finite precision, and the correspondence with conventional pi are defined and proved separately.

We restate the finite sums of §9.4.

$$
S_n=\sum_{j=0}^{n}\frac{(-1)^j}{2j+1},\qquad
A_m=4S_{2m},\qquad B_m=4S_{2m+1}.
$$

They can also be computed from initial values and recursion rules alone.

$$
\begin{gathered}
A_0=4,\qquad B_0=\frac83,\\
A_{m+1}=A_m-\frac8{(4m+3)(4m+5)},\qquad
B_{m+1}=B_m+\frac8{(4m+5)(4m+7)}.
\end{gathered}
$$

Below, the index $m$ is called the stage.

**Proposition B.2 (Finite intervals for pi).** This recursion terminates after finitely many steps at each stage, the upper endpoint $A_m$ strictly decreases, and the lower endpoint $B_m$ strictly increases. Moreover, the following width formula and precision guarantee hold.

$$
A_m-B_m=\frac4{4m+3}>0,\qquad
A_{2^p}-B_{2^p}<2^{-p}.
$$

**Proof.** The recursion formulas follow from the differences of adjacent pairs of terms in the finite sums. The denominators are positive integers, and each update amount is a positive rational number. The width follows because only the last term $1/(4m+3)$ remains in $S_{2m}-S_{2m+1}$. The precision guarantee follows from $4/(4\cdot2^p+3)<2^{-p}$. The recursion terminates because it uses only a finite iteration up to the stage and rational arithmetic. □

This method is short to explain but slow for obtaining many digits (§11.5).

### B.5 A rational cut given by finite rules

Specify two predicates on rational inputs by the following finite formulas.

$$
L_\pi(q)\;:\!\Longleftrightarrow\;\exists m:\mathsf N.\ q<B_m,
\qquad
U_\pi(q)\;:\!\Longleftrightarrow\;\exists m:\mathsf N.\ A_m<q.
$$

Here $L_\pi(q)$ means “$q$ lies below the value,” and $U_\pi(q)$ means “$q$ lies above the value.” Evidence for the existential statement consists of a stage $m$ and finite evidence for a rational comparison. We do not first prepare a set collecting all rational numbers or the results of infinitely many comparisons. Nor is this a decision procedure that immediately returns true or false for every input.

In general, write $\mathsf{Cut}_{\mathsf Q}$ for the type of rational-cut descriptions. A candidate value is a pair retaining the finite syntax of two predicates $L,U$. A rational $q$ for which $L(q)$ holds is said to be on the lower side, and one for which $U(q)$ holds is said to be on the upper side. Only candidates for which the following five conditions have been proved are used as values. Quantifiers and predicate names are the explanatory and logical notation of §1.2.

1. **Both sides have witnesses.** At least one rational can be exhibited on each of the lower and upper sides.
2. **Closure away from the boundary.** A rational smaller than a lower rational is also on the lower side, and a rational larger than an upper rational is also on the upper side.
3. **No endpoint is included.** For a lower rational, a larger lower rational can be exhibited; for an upper rational as well, a smaller upper rational can be exhibited. This condition is called roundedness.
4. **The sides are separated.** Every lower rational is smaller than every upper rational.
5. **A rational gap can be answered.** For any rationals $q<r$, evidence for either $L(q)$ or $U(r)$ can be returned finitely. This condition is called locatedness.

Locatedness is not a rule that always decides, for a single rational, whether it lies above or below. It uses the positive gap between two distinct rationals. For $L_\pi,U_\pi$, the conditions are proved as follows.

**Proposition B.3 (Construction of an exact cut description).** The predicates $L_\pi,U_\pi$ satisfy the five conditions. Define this finite description to be $\pi_{\mathrm{cut}}:\mathsf{Cut}_{\mathsf Q}$.

**Proof.** For the witnesses on both sides, use the comparisons $2<B_0=8/3$ and $A_0=4<5$ at stage $0$. Closure away from the boundary follows from transitivity of the order of rational numbers. For roundedness, if the witness for $L_\pi(q)$ is at stage $m$, then $q'=(q+B_m)/2$ satisfies $q<q'<B_m$ and is on the lower side at the same stage. On the upper side, use $q'=(q+A_m)/2$.

For separation, given the stage $m$ of the lower witness and the stage $n$ of the upper witness, put $k=\max(m,n)$; then the monotonicity in Proposition B.2 and the positivity of the width give the following.

$$
L_\pi(q),\ U_\pi(r)\quad\Longrightarrow\quad
q<B_m\le B_k<A_k\le A_n<r.
$$

For locatedness, given $q<r$, take $m=\lceil2/(r-q)\rceil$; then the width is $4/(4m+3)<1/m\le(r-q)/2$. If $q<B_m$, return the lower witness. Otherwise $B_m\le q$, so $A_m<B_m+(r-q)\le r$; return the upper witness. This case distinction uses finite comparison of rational numbers. The ceiling is computed by integer division, and the computation at stage $m$ terminates by Proposition B.2. □

What has been constructed is not data in which infinitely many digits have been written out in full, but two rules fixed independently of precision. By Propositions 2.2–2.3, their formulas, the recursive programs, and the evidence for individual comparisons can be transferred from finite syntax trees to symbol strings using only f. The general proofs in this section are hand-written proofs.

For example, the pair of local rule number $0$ and specification version $1$ used in the checking examples is `(f(),f(f()))` in the intermediate notation and `f(f()f(f()))` in the common syntax U. This short string is a reference to the rules stated explicitly in this section; the meaning or proof of pi does not arise from the number alone. The content of the rules is recorded in this section. The individual examples, together with the complete main text and the complete executable definitions, are reversibly archived in the [appendix “Following This Manuscript Using f Alone”](../appendices/A_New_Foundation_of_Mathematics_en_v1.5.9_f_only.md).

### B.6 What is unique in the exact description

Two descriptions of this type are said to represent the same value when it can be proved that their lower predicates are equivalent at every rational number and that their upper predicates are likewise equivalent.

$$
x=_{\mathsf{Cut}_{\mathsf Q}}y
\quad:\!\Longleftrightarrow\quad
\forall q:\mathsf Q.\
\bigl(L_x(q)\leftrightarrow L_y(q)\bigr)\land
\bigl(U_x(q)\leftrightarrow U_y(q)\bigr).
$$

This specifies the meaning of equality; it is not a procedure deciding the equality of all descriptions. Nor is any operation needed that forms the equivalence classes of descriptions as a set. We retain the adopted finite descriptions and attach proofs to the equalities that are needed.

**Proposition B.4 (Uniqueness as a rational cut).** If a description $x$ of this type satisfies $L_x(B_m)$ and $U_x(A_m)$ for every natural number $m$, then $x=_{\mathsf{Cut}_{\mathsf Q}}\pi_{\mathrm{cut}}$. The description $\pi_{\mathrm{cut}}$ itself also satisfies this condition.

**Proof.** If $L_\pi(q)$, then at the witnessing stage $m$ we have $q<B_m$ and $L_x(B_m)$, so closure away from the boundary gives $L_x(q)$. Conversely, if $L_x(q)$, roundedness gives $q'>q$ with $L_x(q')$. Choose a stage $m$ whose width is smaller than $q'-q$. Separation from $U_x(A_m)$ gives $q'<A_m$, so $B_m=A_m-(A_m-B_m)>q'-(q'-q)=q$, and stage $m$ witnesses $L_\pi(q)$.

Similarly, on the upper side, $U_\pi(q)$ implies $U_x(q)$. Conversely, if $U_x(q)$, roundedness gives $q'<q$ with $U_x(q')$. If a stage $m$ whose width is smaller than $q-q'$ is chosen, separation from $L_x(B_m)$ gives $B_m<q'$, and hence $A_m<q'+(q-q')=q$. Finally, by the strict monotonicity in Proposition B.2, $B_m<B_{m+1}$ and $A_{m+1}<A_m$, so $L_\pi(B_m)$ and $U_\pi(A_m)$ hold with stage $m+1$ as the witness. □

In this sense, an exact description differs from a single approximating interval. It specifies the order relations with the rational numbers as a whole, and the equality of descriptions giving the same specification can be proved. When an approximation is needed, it suffices to return $[B_{2^p},A_{2^p}]$. That the returned endpoints bracket this cut follows from the last part of Proposition B.4.

The scope of this uniqueness is the specified rational-cut type. In the surreal numbers, both the $\pi$ corresponding to the ordinary real number and that number plus a positive infinitesimal lie in every rational interval constructed here. This manuscript does not bring differences between elements of Fε into this equality to erase them. If a mixed operation such as $\pi_{\mathrm{cut}}+\varepsilon$ is needed, a type and operations for it are defined separately.

### B.7 Proving the correspondence with conventional pi

So far, the construction has used only recursion on rational numbers and finite evidence. Next, taking conventional analysis as the target of comparison, we prove that this cut specifies conventional pi. The integrals and real limits used here are external interpretations, not additions to the internal foundational rules. Conventional pi has the following integral representation. [NIST DLMF, 3.12.2](https://dlmf.nist.gov/3.12.E2)

$$
\pi_{\mathbb R}=4\int_0^1\frac{dt}{1+t^2}.
$$

**Proposition B.5 (Identification with conventional pi).** The cut for pi agrees with the lower and upper rational comparisons for conventional pi.

$$
L_\pi(q)\Longleftrightarrow q<\pi_{\mathbb R},\qquad
U_\pi(q)\Longleftrightarrow\pi_{\mathbb R}<q.
$$

**Proof.** The finite geometric-sum identity can be written in the following form.

$$
\frac1{1+t^2}
=\sum_{j=0}^{N}(-1)^jt^{2j}
 +(-1)^{N+1}\frac{t^{2N+2}}{1+t^2}.
$$

Integrating the finite sum and separating the positive remainder gives the following.

$$
\frac{\pi_{\mathbb R}}4-S_N=(-1)^{N+1}R_N,\qquad
R_N=\int_0^1\frac{t^{2N+2}}{1+t^2}\,dt,\qquad
0<R_N\le\frac1{2N+3}.
$$

Taking $N=2m$ and $N=2m+1$ gives $B_m<\pi_{\mathbb R}<A_m$ at every stage. Hence a finite witness on the lower or upper side implies the corresponding conventional inequality. Conversely, if $q<\pi_{\mathbb R}$, choosing a stage $m$ whose width is smaller than $\pi_{\mathbb R}-q$ gives $q<B_m$. The case $\pi_{\mathbb R}<q$ is analogous. This choice of stage uses the Archimedean property of the ordinary real numbers. This is a proof of the correspondence with the external theory. □

This proof does not interchange an infinite series with integration. It integrates a finite-sum identity and controls all stages by the explicit remainder. Nor has the length or area of a circle been newly constructed within this manuscript. The geometric connection with pi goes through the standard integral representation in the comparison theory.

Returning to the comparison with surreal numbers, the same lower and upper endpoints give the following external representation.

$$
\pi_{\mathbf{No}}=\{B_0,B_1,B_2,\ldots\mid A_0,A_1,A_2,\ldots\}.
$$

Here the surreal rule “choose the simplest number in between” is also used. The $\pi$ corresponding to the ordinary real number lies between all the lower and upper endpoints. A number simpler in construction than $\pi$ is a dyadic rational different from $\pi$, and it falls outside one of the intervals, whose widths approach zero. Hence this cut selects the $\pi$ in the real part. The condition of lying in every interval alone would also leave the number obtained by adding a positive infinitesimal to $\pi$. This is not a claim that the lower and upper sequences converge to $\pi$ in the order of the full surreal numbers. The uniqueness in this manuscript rests, as in Proposition B.4, on the rational-cut description type and its equality.

### B.8 Operations on exact descriptions and the scope of the construction

Once an exact description has been obtained, there is no need to convert it to an approximate value before operating on it. For example, for a rational number $a$ and a positive rational number $b$, define $\mathrm{Aff}_{a,b}(x)$ by the following finite rules.

$$
L_{\mathrm{Aff}_{a,b}(x)}(q)\Longleftrightarrow L_x\left(\frac{q-a}{b}\right),\qquad
U_{\mathrm{Aff}_{a,b}(x)}(q)\Longleftrightarrow U_x\left(\frac{q-a}{b}\right).
$$

This is translation by a rational number and change by a positive scale factor, read as $a+bx$. Applied to $\pi_{\mathrm{cut}}$, the lower and upper witnesses become the finite comparisons $q<a+bB_m$ and $a+bA_m<q$, respectively.

**Proposition B.6 (Positive affine transformations).** The above transformation preserves the five cut conditions and proved equalities. Moreover, for $b,d>0$, the following equalities hold (equality meaning $=_{\mathsf{Cut}_{\mathsf Q}}$).

$$
\begin{gathered}
\mathrm{Aff}_{0,1}(x)=x,\qquad
\mathrm{Aff}_{c,d}(\mathrm{Aff}_{a,b}(x))=\mathrm{Aff}_{c+da,db}(x),\\
\mathrm{Aff}_{-a/b,1/b}(\mathrm{Aff}_{a,b}(x))=x.
\end{gathered}
$$

**Proof.** The transformation $q\mapsto(q-a)/b$ on input rationals is an order-preserving bijection of the rational numbers, with inverse $p\mapsto a+bp$. Transporting the witnesses on both sides, the witnesses for roundedness, and the two rationals supplied to locatedness along this correspondence preserves the five conditions. Equivalence of predicates is also preserved by substitution. The composition formula follows from the two successive rational transformations $((q-c)/d-a)/b=(q-(c+da))/(db)$. The identity and inverse transformations are special cases of it. □

For example, $\mathrm{Aff}_{0,2}(\pi_{\mathrm{cut}})$ is exact doubling, and the general proof above shows that its composition with the transformation back to half equals the original value. If an interval response is needed, use $[a+bB_m,a+bA_m]$; a stage at which the width $b(A_m-B_m)$ is at most the requested value can be chosen finitely. Specifying the rules of an operation can be kept separate from the point at which an approximation is obtained.

What has been given for pi is an exact finite description, uniqueness as a rational cut, the correspondence with conventional pi, and positive affine transformations. A field structure on this whole type, deciding equality of two arbitrary descriptions, the transcendence of pi, and mixed operations with Fε are not treated. This is an example showing, with a concrete constant, this manuscript's policy of adding needed constructions to the same finite syntax.

## Related work and the position of this manuscript

Some components of this manuscript have direct counterparts in existing work. The following indicates which parts belong to known methods. Citing a work does not mean importing the axiom system adopted there into the internal construction of this manuscript.

**Base, successor, and finite trees.** Constructing natural numbers with a base and successor, together with recursion and induction, is a basic example of an inductive type. Finite syntax trees belong to the same method of construction. Sections 1.9 and 5.3–5.4 of *Homotopy Type Theory* describe natural numbers, W-types, and the initial-algebra view of inductive types. The comparison here concerns constructors, recursion, and induction; the book's type theory, universes, and univalence axiom are not internal premises of this manuscript. Nor have general W-types or higher equality structures been constructed from the formation rules for this manuscript's finite trees alone. [The Univalent Foundations Program, 2013](https://homotopytypetheory.org/book/)

**Church representations, syntax encodings, and natural deduction.** The λ-representations of natural numbers and pairs in §2.2, and methods for combining finite data, belong to the established techniques of the λ-calculus (Sections 3.2 and 3.4 of Selinger's lecture notes). The connection between intuitionistic natural deduction and the λ-calculus (§1.2) and the method of representing bindings by indices (de Bruijn 1972, §10.4) are also established. The f-only notation of this manuscript is a common representation of finite trees read at a specified type. It does not mean that types or reading conventions become unnecessary, or that operations or proof rules can be obtained merely by storing characters. [Selinger, 2013](https://arxiv.org/html/0804.3434v2), [de Bruijn, 1972](https://automath.win.tue.nl/archive/pdf/aut029.pdf)

**A rational function field with a positive infinitesimal.** Ordering ratios of rational-coefficient polynomials by the signs of the lowest-degree nonzero coefficients of numerator and denominator is an established construction. Hall and Todorov's Example 2.5 explicitly presents a rational function field with a positive infinitesimal $t$. The Fε of §8 is a concrete representation of this structure $\mathbb Q(t)$ with $\varepsilon$ corresponding to $t$; neither the rational function field nor its order is new in itself. This manuscript develops coefficient sequences, normalization, operations, and sign determination as finite procedures, and connects them to relation labels and to the introduction rules from generation records. Those introduction rules are not determined by the definition of the existing rational function field alone. [Hall–Todorov, 2015, Example 2.5](https://arxiv.org/html/1509.03798v1)

**Nonstandard analysis and the axiom of choice.** One method of doing calculus with infinitesimals is nonstandard analysis, initiated by Robinson in the early 1960s (Robinson 1966). Its standard construction builds the field of hyperreal numbers by regarding two sequences of real numbers as the same when they agree at the indices that a nonprincipal ultrafilter judges to be “almost all.” The existence of a nonprincipal ultrafilter cannot be proved from ZF alone, and Blass (1977) constructed a model of ZF in which there is no nonprincipal ultrafilter at all. On the other hand, there is also a theory that carries out arguments with infinitesimals without ultrafilters and, for statements expressed in the language of ZF, proves only those that ZF can prove (Hrbacek–Katz 2021). The Fε of this manuscript does not introduce infinitesimals by axioms; it builds them as finite sequences of coefficients and gives the four arithmetic operations and order by finite computation. It does not have the transfer principle (§11.5). [Hrbacek–Katz, 2021](https://doi.org/10.1016/j.apal.2021.102959)

**Real computation responding to precision requests.** O’Connor treats approximation procedures taking rational precision, coherence of responses, and correctness of operations in Coq, and also gives the positive rational separation evidence needed for operations such as reciprocals. The interval-generating labels and error guarantees of this manuscript relate to this computational approach to analysis. However, the equality of reals in that work is not transferred to Fε. In Fε, elements differing by ε are exactly distinct even when rational-precision approximations cannot separate them. [O’Connor, 2008, §§2–4](https://arxiv.org/pdf/0805.2438v1)

**Surreal numbers and finitely specified cuts.** Appendix B compares Conway's surreal numbers, as introduced by Knuth, with this manuscript's design for finite representations and checking. The arithmetic of Fε has an order-preserving counterpart inside the surreal numbers (Proposition B.1), but the constructions as a whole are not identified. Descriptions of real numbers by rational cuts also have a long history. The pi example of this manuscript expands their lower and upper decisions into finite recursion and evidence; cuts themselves are not new.

**Proof checking with a small rule system.** The design that separates the process of producing a proof from a small checking component that confirms its correctness also has precedents. Harrison discusses outputting proofs that a simpler program can recheck, and the LCF approach, which uses a small logical kernel. The computation traces and equational proof data of this manuscript follow this approach in that they put records into a form that a separate program can recheck. However, the relation between a checker and the program that produces the evidence differs from checker to checker, and some checkers share part of the implementation (§10.3). This manuscript neither adopts HOL Light's logic or axioms nor carries over its verification results to its own checkers. [Harrison, 2006, §2](https://www.cl.cam.ac.uk/~jrh13/papers/holhol.pdf)

**Computation models and proof assistants.** The relation of Corollary 10.5 to the result of [Turing (1937)](https://doi.org/10.2307/2268280) and to the Church–Turing thesis is given in §10.6, and the checks by Lean 4 ([de Moura–Ullrich, 2021](https://doi.org/10.1007/978-3-030-79876-5_37)), Rocq ([The Rocq Prover](https://rocq-prover.org/)), and Agda ([Norell, 2007](https://www.cse.chalmers.se/~ulfn/papers/thesis.pdf)) and the scope of trust in them are given in §10.3 and §10.7.

**Categories representing objects by identity arrows.** Eilenberg and Mac Lane's original paper already describes representing objects by identity arrows. The arrow-only account of §9.1 follows this idea and constructs the category from concrete finite computation histories and their concatenation. The idea of describing a category by arrows alone is not itself new. [Eilenberg–Mac Lane, 1945, p.238](https://people.math.osu.edu/cogdell.1/6112-Eilenberg%26MacLane-www.pdf)

**Work related to transformations between computation traces.** Item 11 of §13 is related to the following work. Permutation equivalence in the λ-calculus compares reduction sequences, including cases in which a nested reduction copies or erases other reductions (Lévy 1978). Traces of concurrent computation regard sequences related by swapping the order of independent events as one and the same computation (Mazurkiewicz 1977). Homotopy type theory regards a proof of an equality as a path, regards an equality between two such proofs as a path between paths, and continues this layering. Hofmann–Streicher (1998) showed, by a model built from groupoids, that the claim that all proofs of an equality are equal cannot be proved from the basic rules of type theory alone. The Agda check of §10.7 was carried out in a setting that does not use principle K, which gives this claim, so it is compatible with this view. However, computation does not run backward, so the histories of this manuscript are arrows without inverses, unlike the paths of homotopy type theory, every one of which has an inverse. Type theories that handle directed paths are also being studied (Riehl–Shulman 2017). [Mazurkiewicz, 1977](https://doi.org/10.7146/dpb.v6i78.7691), [Riehl–Shulman, 2017](https://doi.org/10.21136/HS.2017.06)

The paper therefore presents a construction that connects these components through finite f syntax, explicit procedures at each type, a distinction between generation records and relation labels, and evidence that can be rechecked. It does not claim to have established historical priority for the combination as a whole. Definitions, known correspondences, and guarantees proved here are presented in a form that readers can confirm individually.

## References

- Yuta Kimura, `1-new-number-composition-Japanese.txt`, first published August 11, 2025. Primary source for the author's intent and original proposal.
- Yuta Kimura, `memo_01.txt`. Includes unresolved proposals on recursion, continued fractions, and alternating series.
- Peter Selinger, [*Lecture Notes on the Lambda Calculus*, v2](https://arxiv.org/html/0804.3434v2), 2013. References: λ syntax in Section 2, Church numerals in §3.2, data representations in §3.4, the Church–Rosser theorem and Corollary 4.3 in Section 4, and intuitionistic natural deduction and the Curry–Howard correspondence in Section 6. Accessed September 27, 2026.
- N. G. de Bruijn, [*Lambda calculus notation with nameless dummies, a tool for automatic formula manipulation, with application to the Church–Rosser theorem*](https://automath.win.tue.nl/archive/pdf/aut029.pdf), Indagationes Mathematicae 34 (1972), 381–392. Primary source for representing bindings by indices. Accessed September 13, 2026.
- A. M. Turing, [*Computability and λ-definability*](https://doi.org/10.2307/2268280), The Journal of Symbolic Logic 2 (1937), 153–163. Agreement of λ-definability with computability by Turing machines.
- The Univalent Foundations Program, [*Homotopy Type Theory: Univalent Foundations of Mathematics*](https://homotopytypetheory.org/book/), Institute for Advanced Study, 2013. References: external comparisons with natural numbers in §1.9 and inductive types in §5.3–5.4, and the view of proofs of equality as paths. Accessed September 27, 2026.
- James F. Hall and Todor D. Todorov, [*Ordered Fields, the Purge of Infinitesimals from Mathematics and the Rigorousness of Infinitesimal Calculus*](https://arxiv.org/html/1509.03798v1), Bulgarian Journal of Physics 42 (2015), 99–127. Reference: the rational function field with infinitesimals in Example 2.5. Accessed September 27, 2026.
- Abraham Robinson, *Non-standard Analysis*, North-Holland, 1966. Nonstandard analysis.
- Karel Hrbacek and Mikhail G. Katz, [*Infinitesimal analysis without the Axiom of Choice*](https://doi.org/10.1016/j.apal.2021.102959), Annals of Pure and Applied Logic 172 (2021), 102959. A theory of infinitesimals that does not use ultrafilters.
- Donald E. Knuth, [*Surreal Numbers: How Two Ex-Students Turned on to Pure Mathematics and Found Total Happiness*](https://cs.stanford.edu/~knuth/sn.html), Addison-Wesley, 1974. The author's own bibliographic entry and introduction. Accessed October 11, 2026.
- John H. Conway, [*On Numbers and Games*, reprint of Chapters 0–2](https://ir.cwi.nl/pub/12933/12933D.pdf), *Vakantiecursus 1993: Het reële getal*, CWI Syllabus 35, CWI, 1993, pp.101–122. References: reprint pp.102–103 and 120–122. Original: Academic Press, 1976. Accessed October 11, 2026.
- Ovidiu Costin, Philip Ehrlich, Harvey M. Friedman, [*Integration on the surreals: A Conjecture of Conway, Kruskal and Norton*, arXiv v3](https://arxiv.org/html/1505.02478v3), 2015. References: the overview, §3, and §9 (treatment of foundations). Accessed October 11, 2026.
- Saugata Basu, Richard Pollack, Marie-Françoise Roy, *Algorithms in Real Algebraic Geometry*, 2nd ed., Springer, 2006. Puiseux series in §2.6, and decision algorithms of real algebraic geometry.
- Russell O’Connor, [*Certified Exact Transcendental Real Number Computation in Coq*, arXiv v1](https://arxiv.org/pdf/0805.2438v1), 2008. Published version: TPHOLs 2008, LNCS 5170, 246–261. Comparisons with rational-precision responses, coherence, and separation evidence in §§2–4. Accessed September 27, 2026.
- John Harrison, [*Towards self-verification of HOL Light*](https://www.cl.cam.ac.uk/~jrh13/papers/holhol.pdf), IJCAR 2006, LNCS 4130, 177–191. Reference: the distinction between recheckable proofs and a small logical kernel in §2. Accessed September 27, 2026.
- Leonardo de Moura and Sebastian Ullrich, [*The Lean 4 Theorem Prover and Programming Language*](https://doi.org/10.1007/978-3-030-79876-5_37), CADE-28, LNAI 12699 (2021), 625–635. Lean 4.
- The Rocq Development Team, [*The Rocq Prover*](https://rocq-prover.org/) (formerly Coq), version 9.3.0.
- Ulf Norell, [*Towards a practical programming language based on dependent type theory*](https://www.cse.chalmers.se/~ulfn/papers/thesis.pdf), PhD thesis, Chalmers University of Technology, 2007. The doctoral thesis on which Agda is based.
- Samuel Eilenberg and Saunders Mac Lane, [*General Theory of Natural Equivalences*](https://people.math.osu.edu/cogdell.1/6112-Eilenberg%26MacLane-www.pdf), Transactions of the American Mathematical Society 58 (1945), 231–294, especially p.238. Context for descriptions using arrows and identity arrows. Accessed September 13, 2026.
- Jean-Jacques Lévy, *Réductions correctes et optimales dans le lambda-calcul*, Thèse de doctorat d'État, Université Paris VII, 1978. Permutation equivalence of reduction sequences.
- Antoni Mazurkiewicz, [*Concurrent Program Schemes and their Interpretations*](https://doi.org/10.7146/dpb.v6i78.7691), DAIMI Report Series 6 (78), Aarhus University, 1977. Traces of concurrent computation.
- Martin Hofmann and Thomas Streicher, *The groupoid interpretation of type theory*, in G. Sambin and J. M. Smith (eds.), *Twenty-five Years of Constructive Type Theory*, Oxford Logic Guides 36, Oxford University Press, 1998, pp.83–111. The groupoid model.
- Emily Riehl and Michael Shulman, [*A type theory for synthetic ∞-categories*](https://doi.org/10.21136/HS.2017.06), Higher Structures 1 (2017), 147–224. A type theory that handles directed paths.
- Thomas Jech, *The Axiom of Choice*, North-Holland, 1973. The axiom of choice and propositions equivalent to it.
- Andreas Blass, *A model without ultrafilters*, Bulletin de l'Académie Polonaise des Sciences, Série des Sciences Mathématiques, Astronomiques et Physiques 25 (1977), 329–331. A model of ZF with no nonprincipal ultrafilter.
- Vaughan R. Pratt, [*Every prime has a succinct certificate*](https://doi.org/10.1137/0204018), SIAM Journal on Computing 4 (1975), 214–220. Succinct certificates for primes.
- Matilde Marcolli, [*Menger Universal Spaces — Introduction to Fractal Geometry and Chaos*](https://www.its.caltech.edu/~matilde/FractalsUToronto7.pdf), University of Toronto, 2020. External comparison with the finite-stage construction, volume, and Hausdorff dimension on pp.3–4. Accessed September 27, 2026.
- NIST, [*Digital Library of Mathematical Functions*, 3.12.2](https://dlmf.nist.gov/3.12.E2). The integral representation of conventional pi is used for external comparison. Accessed October 11, 2026.
- [Source audit](../research/source-audit-v1.5.9.md) and [application research notes](../research/applications-v1.5.9.md). Details of the differences from the original proposal and of the extensions.
