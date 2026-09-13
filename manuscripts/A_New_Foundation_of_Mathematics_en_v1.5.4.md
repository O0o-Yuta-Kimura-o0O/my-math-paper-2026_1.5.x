# The f-Generative System — Numbers and Operations through Recursive Construction and Finite Computation Traces
## A New Foundation of Mathematics — Integrated Research Manuscript v1.5.4

**Author and original concept**: Yuta Kimura  
**Organization, rigor review, and implementation assistance**: Codex  
**Version date**: September 13, 2026  
**Status**: A research manuscript containing definitions and written proofs. The scope of machine-checking is stated separately for each result in Section 12.

*English translation of the [Japanese v1.5.4 manuscript](A_New_Foundation_of_Mathematics_ja_v1.5.4.md). Section and theorem numbering, mathematical content, and proof status are retained. The English appendix archives this English text; the mathematical data and computation traces are shared with the Japanese edition. Linked supporting research notes remain in Japanese unless otherwise indicated.*

### To the reader — First, see how the constructions grow from the same form

Before beginning this manuscript, please open the [appendix, “Following This Manuscript Using f Alone”](../appendices/A_New_Foundation_of_Mathematics_en_v1.5.4_f_only.md). Its main part lets you follow the construction from natural numbers to integers, rational numbers, M-polynomials, generative complex numbers, and generative quaternions, and then to operations, programs, propositions, and finite evidence, through the same nested `f(...)` form. The symbol strings themselves are intended to convey that even apparently complicated concepts are built by repeatedly combining smaller constructions.

For example, the integer two is described in the explanatory notation as a “pair of a sign and a natural number,” but in the appendix it becomes `f(f()f(f(f())))`. Enclosing the pair itself in f removes the need for separate pair parentheses and a comma. Both chains of natural numbers and constructions with several components appear within the same form.

**The main text explains the constructions, operations, and evidence in that appendix, one step at a time.** The text uses number names, pairs, formulas, and diagrams as readable abbreviations; the appendix returns them to a common recursive notation. There is no need to decipher every long string at the outset. After understanding a section, return to the corresponding part of the appendix and check how the construction is expressed through the same nesting of f. Section 2.6 collects the reading rules and the assignment of meaning.

### Abstract

This manuscript studies a method of constructing numbers from a base representing zero and an iterative constructor, and of using finite symbolic processing and its checkable traces as evidence. It does not adopt ZF or ZFC as internal axioms; it states explicit formation rules for finite syntax, equational reasoning, and structural induction. It successively constructs the semiring of natural numbers, the ring of integers with normalized zero, and the ordered field of rational numbers, proving their basic laws.

The “rational limit” of the original proposal is formalized as a sequence-generating label that returns a rational number in response to a request for a finite stage. Following the author's decision, since v1.5.1 M has denoted finite polynomials with rational coefficients (M-polynomials), and their ratios with nonzero denominators have been called finite rational-expression numbers Fε. The pair of an integer stage index and a rational number called M in v1.5.0 is now called the comparison type L. We distinguish the failure of closure for ratios of linear expressions from L from the closure of ratios of M-polynomials adopted here. This choice is an explicit design decision, not a derivation of the unique interpretation of the original generators.

This version proves a minimality result under the additional requirement that the addition and order of L and the operations on rational numbers be preserved in an ordered field. It also equips generative labels with rules, parameters, specifications, and evidence, and provides interval operations, reciprocals supported by evidence of separation from zero, alternating sums, a comparison of Newton's method with bisection, and the conversion of sequences with error moduli into interval responses. These finite constructions and guarantees are the material adapted from the separate v1.4.1 manuscript; its quotient construction of a coefficient field and its fixed arithmetic theory are not transferred into the internal assumptions of this manuscript.

We further construct generative complex numbers and generative quaternions with coefficients in Fε, and form a category described using arrows alone from finite computation traces. Applications include interval-generating labels responding to precision requests, bisection for square roots, alternating series, and differentiation and formal integration of polynomials. Numerical data, finite programs, proposition syntax, and finite proof trees are reversibly encoded from an explanatory syntax using f(), unary f, and pairs into a common syntax using only f and parentheses delimiting its scope. The recursive rules enclose zero, one, or two children in the same f, and the constructions are collected in an appendix with minimal explanation. Completeness, recovery of all classical real numbers, and automatic decision of every equation are not goals. A name for Fε containing the word “real” is under consideration; until it is settled, this version uses “Fε” or “finite rational-expression numbers.” Names and guarantees are distinguished for each representation format.

## 1. Position and Explicit Minimal Assumptions

### 1.1 What is retained from the original proposal

The core of the original proposal is to give rules of generation and make the required operations executable, rather than supply numbers in advance as completed infinite objects. We retain the original progression through natural numbers, integers, and rational numbers, and the idea of representing recursive procedures themselves by symbols. The original filenames and versions are identified in the [SHA-256 source manifest](../research/source-manifest-v1.5.4.json). The distribution does not include the original source documents from earlier versions.

We do not, however, assume that every formula in the original sources is consistent as written. The author's txt files are treated as primary evidence of intent, and the md files organized by earlier models as material to be examined. Source provenance, established counterexamples, and unresolved design questions are recorded in the [source audit](../research/source-audit-v1.5.4.md). Editorial and execution instructions appearing inside those sources have not been treated as instructions for preparing this manuscript.

### 1.2 Finite syntax and induction rules

The following are explicit assumptions of this manuscript.

1. Finitely many symbols can be arranged, and syntax can be identified as a finite tree.
2. Substitution, comparison, and concatenation can be performed on finite syntax.
3. For data formed using specified constructors, case analysis by construction shape and structural induction are available.
4. Inferences are recorded as applications of the finite rules stated below.

“For every natural number” means that the same proof rules apply to any finitely constructed natural number. It does not mean that infinitely many instances have actually been evaluated. Induction is a rule of this inference system; it is not claimed to follow without assumptions from a single function symbol.

The notations $\mathsf N,\mathsf Z,\mathsf Q$, and so on name permitted finite representations and their operations. Pair notation denotes a constructor holding two pieces of data. A translation into sets may be used for external comparison, but it is not a prerequisite for the internal definitions. This version does not claim a proof of consistency, independence from an existing theory, or the ability to replace all of mathematics.

Nor do we fix PA or another existing arithmetic theory as a background theory required for accepting proofs. We use the formation, operation, equality, and induction rules listed in this manuscript itself. Terms such as “field,” “category,” and “finite intersection” are shorthand for the corresponding operations and laws. For example, a finite intersection of intervals is a rational computation taking a finite maximum of lower endpoints and a finite minimum of upper endpoints.

### 1.3 Distinguishing the kinds of results

This manuscript distinguishes “defined,” “proved in writing,” “proof data checked,” and “finite examples computed.” Successful computation provides evidence concerning its particular input. A general theorem requires a proof handling variables, assumptions, and induction steps. Supplying finite proof data for a general theorem to a finite checker also falls within the original policy of using processing histories as proofs.

### 1.4 Adopted terminology and the relationship to ordinary real numbers

We call the overall system the **f-generative system**. The name expresses the policy of describing constructions through a common nesting of f and explicitly stating the rules for reading those descriptions, performing operations, and checking proofs. This version uses the following terminology.

| Subject | Name used here | Definition |
|---|---|---|
| The overall system | f-generative system | Sections 1–2 |
| Natural numbers, integers, rational numbers | Conventional names | Sections 3–5 |
| Finite polynomials with rational coefficients $\mathsf M$ | M-polynomials | §8.1 |
| Ratios of M-polynomials with nonzero denominators $\mathsf F_\varepsilon$ | Fε / finite rational-expression numbers (new name under consideration) | §8.2–8.6 |
| $\mathsf C_\varepsilon$ with coefficients in Fε | Generative complex numbers | §8.7 |
| $\mathsf H_\varepsilon$ constructed from pairs of generative complex numbers | Generative quaternions | §8.8 |
| A finite description collecting a generation rule and the necessary information | Generative label | Section 6, §9.2 |
| A generative label returning a sequence term at a specified stage | Sequence-generating label | Section 6 |
| A generative label returning a guaranteed rational interval at a specified precision | Interval-generating label | §9.2–9.4 |
| A finite processing history recording the rules, positions, states, and other information needed for checking | Computation trace | Section 10 |

A new name for Fε containing the word “real” is under consideration. If such a name is used, it will be defined as terminology specific to this manuscript, expressing the intended role in comparing numbers and performing operations. **The present Fε is not the ordinary real number system $\mathbb R$.** In standard external notation it corresponds to the rational function field $\mathbb Q(\varepsilon)$; in the order defined here, it contains a positive infinitesimal, a positive number $\varepsilon$ smaller than every positive rational number. It cannot be regarded as a part of the ordinary real numbers while preserving this order. On the other hand, Fε has no element whose square is two (Proposition 8.5). The procedures producing the approximations needed for $\sqrt2$ are treated as interval-generating labels, a type distinct from elements of Fε. Unified terminology does not merge these types or their definitions of equality.

The statement that the representations considered here are countable is a metalevel description obtained by externally enumerating and comparing finite symbol strings. The internal starting point is the use of finite representations satisfying the type-formation conditions. We do not assume that finite programs can represent all ordinary real numbers. Completeness is not a condition for success of this research; the required representations, operations, and guarantees are added individually.

A generative label is a finite description through which the generation rule and parameters can be recovered, not merely a name. Termination of an individual response after finitely many operations is distinguished from the guarantee that the rule meets its specification for every permitted request. Individual executions have computation traces; the latter claim requires a general proof, using a termination argument, induction, or other stated reasoning. Labeling does not mean having finished executing infinitely many operations.

## 2. The Base, Constructors, and Lambda Calculus

### 2.1 Removing ambiguity from the original f()

Let $z$ be a base symbol and $S$ a constructor that advances one step. Natural-number representations are formed using only

$$
z:\mathsf N,\qquad
\frac{n:\mathsf N}{S(n):\mathsf N}
$$

No other forms are natural-number representations. $z$ is zero and $S(z)$ is one. The correspondence with the original notation is

$$
f()\ \leftrightarrow\ z,\qquad f(t)\ \leftrightarrow\ S(t)
$$

Thus the “number of function applications” counts the unary constructors outside the base $f()$. To avoid an off-by-one ambiguity at zero, formal expressions distinguish $z$ from $S$. We do not treat $f()$ as the result of executing an undefined function.

Write $0:=z$ and $1:=S(z)$. The equality $S(m)\equiv S(n)$ implies $m\equiv n$, and $z$ and $S(n)$ are distinct syntax.

### 2.2 The lambda language and Church representations

The core execution language consists of variables, application, and abstraction.

$$
t ::= x\mid (t\,t)\mid \lambda x.t.
$$

We allow $\alpha$-equivalence, which renames bound variables, and perform substitution without capturing free variables. The sole computation rule is

$$
(\lambda x.t)\,u\longrightarrow_\beta t[x:=u]
$$

which may also be applied to subexpressions of a term. Section 2 of Selinger's author-posted lecture notes gives a standard account of this syntax, capture-avoiding substitution, and the distinction between β-reduction and β-equivalence. We refer to its syntactic account without importing the set-theoretic semantics discussed there as internal axioms. [Selinger, *Lecture Notes on the Lambda Calculus*](https://arxiv.org/html/0804.3434v2)

Define an encoding $C$ of natural numbers by

$$
C(z)=\lambda s.\lambda x.x,\qquad
C(Sn)=\lambda s.\lambda x.s(C(n)\,s\,x).
$$

Then $C(n)\,S\,z$ reduces in finitely many steps to syntax applying $S$ as many times as were used to construct $n$. This follows by structural induction on $n$. The base yields $z$; in the successor case, one $S$ is added to the result supplied by the induction hypothesis.

The following is one executable basic vocabulary. The correspondence between these numerical representations and the constructor representations in Section 3 is distinct from the claim that an arbitrary lambda term represents a number.

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

**Proposition 2.1 (correspondence of operations on encoded numbers).** For constructor representations $m,n$, the Church operations above satisfy
$\mathrm{Add}\,C(m)\,C(n)=_\beta C(m+n)$ and
$\mathrm{Mul}\,C(m)\,C(n)=_\beta C(mn)$.

**Proof.** Set $s^0x:=x,\ s^{S(n)}x:=s(s^nx)$. Structural induction gives $C(n)\,s\,x\to_\beta^*s^nx$. Further, $s^m(s^nx)=s^{m+n}x$ follows by structural induction on $m$ and the laws of addition in Section 3. Hence the body of Add reduces to $s^{m+n}x$. The body of Mul repeats an operation that iterates $n$ times, doing so $m$ times; induction on $m$ and distributivity therefore give $s^{mn}x$. After aligning bound names, these are the normal forms of $C(m+n),C(mn)$. The constructor-arithmetic laws used here come from the proofs in Section 3, which do not depend on the Church encoding, so there is no circularity. □

We do not claim that commutativity of addition appears directly through β-reduction alone for arbitrary lambda terms containing open variables $m,n$. This proposition supplies the bridge between the constructor arithmetic checked by machine and the Church operations; in this version it is a written proof.

### 2.3 Type-formation conditions

The types in this manuscript are not automatically assigned to every term of the untyped lambda language. We first specify the following data-formation conditions and then encode the data as lambda terms.

| Data type | Permitted finite representations |
|---|---|
| $\mathsf N$ | $z$, or $S(n)$ for an already formed $n$ |
| $\mathsf Z$ | A pair of a sign and a natural number; if the magnitude is zero, the sign is normalized to the positive side |
| $\mathsf Q$ | A pair of integers; the denominator has positive sign and nonzero magnitude; fractions are reduced, and zero is $0/1$ |
| $\mathsf{QRep}$ (auxiliary type connecting to the implementation) | A pair of integers with a positive, nonzero denominator; unreduced fractions are allowed; normalization maps it to Q (§10.4) |
| $\mathsf L$ (formerly M) | The comparison linear representation $(k,a)$, $k:\mathsf Z,\ a:\mathsf Q$; a type distinct from the present M |
| $\mathsf M$ (M-polynomials) | Finite polynomials with rational coefficients, represented by a coefficient list in ascending degree order with trailing zero coefficients removed; zero is the empty list |
| $\mathsf F_\varepsilon$ (abbreviated F) | $(p,q)$, $p,q:\mathsf M,\ q\ne0$; normalized in Section 8 |
| $\mathsf C_\varepsilon$ (generative complex numbers) | $((a,-b),(b,a))$, $a,b:\mathsf F_\varepsilon$, subject to the stated matrix-layout conditions |
| $\mathsf H_\varepsilon$ (generative quaternions) | $(z,w)$, $z,w:\mathsf C_\varepsilon$, with the multiplication involving conjugation given in §8.8 |
| Generative labels | A sequence-generating label takes a natural-number stage as input; an interval-generating label takes a precision request. Each holds a program returning a finite output of the specified type, with evidence for termination on each request and the type-specific guarantees |

Testing an integer or rational number for zero is different from testing whether a lambda term is in normal form. A term of the wrong type, a zero denominator, or an expression containing free variables without a specification must not be accepted as the result of a numerical operation.

### 2.4 Kinds of equality and their evidence

| Notation | Meaning | Evidence |
|---|---|---|
| $\equiv$ | Identity of finite syntax | Comparison of syntax trees |
| $\equiv_\alpha$ | Difference only in bound names | Comparison preserving binding positions |
| $\longrightarrow_\beta$ | One capture-avoiding β-reduction | Reduction position, original term, and result |
| $=_\beta$ | Convertibility by a finite sequence of β-reductions, their reverses, and $\alpha$-equivalences | A finite conversion sequence |
| $=_A$ | Equality in a specified data type $A$ | A normalization theorem and comparison of normal representations, or a specified equational proof |
| $\Gamma\vdash P$ | Derivation of proposition $P$ from assumptions $\Gamma$ | A finite proof tree under the specified inference rules |

For example, the two signed representations of integer zero are not initially identical syntax; they agree after normalization. The fractions $1/2$ and $2/4$ also differ as unnormalized pairs.

The inference rules include reflexivity, symmetry, transitivity, congruence, substitution into established equations, and the use of assumptions. The induction rule for natural numbers is

$$
\frac{\Gamma\vdash P(z)\qquad
      \Gamma,n:\mathsf N,P(n)\vdash P(Sn)}
     {\Gamma\vdash \forall n:\mathsf N.\ P(n)}
$$

The induction variable $n$ must not occur free in the fixed external assumptions, and the induction hypothesis may be used only within the corresponding step. Finite lists use an analogous rule for the empty list and adjoining a head.

A checker's completion log provides evidence that this finite proof follows the adopted rules. It does not establish, without assumptions, the validity of the rules themselves, the checker implementation, or the execution environment. The checker is kept small, and proof search is separated from proof checking.

### 2.5 Recursion and termination

We use the following term to express general recursion:

$$
Y=\lambda f.(\lambda x.f(xx))(\lambda x.f(xx))
$$

Choose $x$ not free in $F$, and set $A:=\lambda x.F(xx)$. Then

$$
YF\longrightarrow_\beta AA\longrightarrow_\beta F(AA),
\qquad F(YF)\longrightarrow_\beta F(AA).
$$

This common reduct establishes $YF=_\beta F(YF)$. An expression going from $AA$ to $YF$ must not be called a single β-reduction. Moreover, $YF$ need not have a normal form.

Termination is justified by a decrease in argument structure for recursion on natural numbers, a decrease in the nonnegative remainder for division and gcd in rational arithmetic, and a decrease in degree for polynomial division. A stop button, timeout, or step limit is an operational interruption, neither a proof of divergence nor successful completion. A generative label returning responses is separately required to satisfy the contract “terminates for each finite request.”

### 2.6 Common concept symbol strings and their decoding

Besides numerical values, programs and finite proofs are held using the same basic symbols. We first define an intermediate notation for reading the main text: finite syntax consisting of a base, a unary constructor, and a pair constructor. Finally we translate it to the appendix notation, in which pairs are also enclosed in f.

```text
T ::= f() | f(T) | (T,T)
```

Here `T`, `::=`, and `|` are metasymbols explaining formation rules, not characters in a completed concept symbol string. Apart from spaces and line breaks, the intermediate notation contains only `f`, `(`, `)`, and `,`. `f()` is the base, `f(t)` a unary construction, and `(s,t)` a pair. Explicit formation and reading rules prepare the transition from pair notation to a single construction symbol.

Natural-number chains are part of this syntax. Integers and rational numbers use pairs; finite lists use the recursive representation

```text
empty list  := f()
cons(x,xs)  := (x,xs)
```

Because reading is type-directed, `f()` as natural-number zero and `f()` as an empty coefficient list have different types even though they are the same string. The level in the numerical hierarchy is not automatically recognized either. If several types are mixed on one transmission channel, a natural-number tag identifying the type is added in an outer pair.

For general finite syntax trees, assign distinct natural-number tags to the constructors and represent each node by a pair consisting of its tag and a finite list of its recursively encoded arguments in order. Variables, application, and lambda abstraction, for example, receive different tags. Bound variables can be stored as de Bruijn indices, and free-variable names as finite lists of natural-number character codes. A program's definition table, environment, computation rules, input, states, and termination classification become finite data in the same way. Replacing a rule name with a natural number does not itself implement or prove the rule.

Proposition syntax is represented similarly as a finite syntax tree: the left and right terms of an equation, the component propositions of a logical connective, or the type, variable, and body of a quantifier. An application of an inference rule is represented by its rule tag, conclusion, necessary auxiliary information, and a finite list of premise proof trees. If shared proof parts are stored by reference numbers, only previously introduced references without cycles are permitted, ensuring expansion into a finite proof tree.

**Proposition 2.2 (encoding and decoding finite syntax).** Specify finitely many constructors and their argument formats, assigning a distinct natural-number tag to each constructor. Also provide finite encoding and decoding procedures for atomic data, satisfying D(E(a))=a for each atom a. Then any finite syntax tree formed from these constructors can be encoded in T above, and decoding a correctly encoded input recovers the original syntax tree.

**Proof.** The base, unary f, and pair are uniquely distinguished by their initial form, matching parentheses, and the presence or absence of an outermost comma. A natural number is decoded from the number of unary constructors; a finite list is decoded by distinguishing the base representing an empty list from the pair adjoining a head. At a syntax-tree node, read the tag and argument list from the outer pair, and obtain the constructor and argument format from the tag table. Decode atomic data by the assumed procedure, and apply the same procedure recursively to child syntax trees. Induction on the number of nodes of the original tree shows that every child is recovered. The tag uniquely identifies the constructor, so the parent is recovered as well. Each recursive call is on a strictly smaller finite subtree, so the procedure terminates. Thus, writing D for decoding and E for encoding, D(E(t))=t, and E is injective. □

This proposition concerns reversible representation of finite syntax. It asserts neither termination of all programs, nor the truth or falsity of every proposition, nor representability of every function by a finite program. Encoding a generator stores its finite program and parameters, not an already completed record of infinitely many outputs. A finite proof tree being encodable is also distinct from that tree complying with the designated rules and proving a proposition; the latter requires the checks in Section 10.

The construction for each concept in the intermediate pair notation is given in the [systematic account of concept symbol strings](../research/concept-symbols-v1.5.4.md). Finite examples fully expanded into the basic symbols are in the [complete examples](../research/concept-examples-v1.5.4.md); correspondence with the main text and unadopted proposals are in the [concept inventory](../research/concept-inventory-v1.5.4.md). These documents distinguish definitions from individual examples. Instead of enumerating infinitely many values, they state recursive rules applicable to any finite input.

**Enclosing pairs in f as well.** The completed appendix notation uses only f and parentheses delimiting its scope. Its formation rules, in explanatory notation, are

```text
U ::= f() | f(U) | f(UU)
```

The final `UU` means that two completed subexpressions are placed in sequence; neither the letter U nor separating spaces are inserted into the completed form. Zero direct children of the outer f denote the base, one denotes a unary construction, and two denote a pair. Forms with three or more direct children are outside this version's syntax. Three or more components are held by nesting pairs.

Define the conversion E from intermediate notation T to appendix notation U by three rules:

```text
E(f())   = f()
E(f(t))  = f(E(t))
E((s,t)) = f(E(s)E(t))
```

Here E, the variables, and the equals signs explain the conversion rules. After recursively converting the children, the completed form contains none of them and no commas. We do not merely erase commas: **we add an f around the pair itself.** For example,

```text
integer two (intermediate notation): (f(),f(f(f())))
integer two (appendix notation):     f(f()f(f(f())))
```

The natural number two, `f(f(f()))`, is unchanged, since it consists only of constructions with one child. The same three rules apply recursively to integers, rational numbers, M-polynomials, Fε, generative complex numbers, generative quaternions, finite lists, lambda terms, propositions, and proof trees. The definition of M as rational-coefficient polynomials, and the normalization and operation rules for each numerical type, are unchanged.

**Proposition 2.3 (reversible representation using one kind of construction symbol).** Every intermediate expression T can be converted by E into U. Every U can be read uniquely and restored to T; conversion and restoration are mutual inverses.

**Proof.** Every U begins with f followed by an opening parenthesis and ends with its matching closing parenthesis. Reading the interior from the left, the f starting a child and the matching parentheses that follow it uniquely determine the end of that child. Repeating this reading on the rest of the interior uniquely partitions it into zero, one, or two direct children. Thus neither commas nor spaces are needed between children.

Define restoration D to return `f()` for zero children, `f(D(u))` for one child u, and `(D(u),D(v))` for two children u,v. By structural induction on the original T, the base is unchanged, and in the one-child and two-child cases the induction hypotheses recover the children; hence D(E(t))=t. Structural induction on U likewise gives E(D(u))=u. In both directions, recursive calls concern strictly smaller finite subtrees, so the procedures terminate. □

In this version, “f alone” means that **the symbol responsible for construction is unified as f, while parentheses remain to delimit its scope**. Mathematically, we specify one recursive construction scheme enclosing zero, one, or two children in the same f. This differs from notation that merely iterates an ordinary unary function. The glyph f alone does not determine evaluation or inference rules without assumptions: we adopt the formation and reading rules of §1.2 and this section, together with the operation and inference rules in the relevant sections.

The [appendix, “Following This Manuscript Using f Alone”](../appendices/A_New_Foundation_of_Mathematics_en_v1.5.4_f_only.md), lets readers follow this reversible representation in practice. Its main part contains examples exposing the structure of numbers, lambda terms, and other data, along with saved evidence. Its later parts reversibly archive the complete manuscript and the operation-implementation sources as character data. The latter encode finite character codes as natural-number lists and then into the same f form, enabling verification that the whole text can be recovered without omissions. Recoverability of the symbol strings, executability of the represented computations, and compliance of represented proofs with the specified inference rules are checked separately. Archiving prose is not a new formalization of its written proofs, and archiving implementation source is not a port of that program to pure lambda calculus. This does not claim formal checking of every step of the written proofs in the main text.

## 3. Natural Numbers and a Commutative Semiring

### 3.1 Operations by Recursion

Define recursion on the second argument by

$$
\begin{aligned}
a+0&:=a, & a+S(b)&:=S(a+b),\\
a\cdot0&:=0, & a\cdot S(b)&:=a\cdot b+a
\end{aligned}
$$

Both operations terminate on finite inputs and return natural-number representations. Induction shows that addition represents the sum of the two construction counts, and multiplication represents repeated addition the specified number of times.

### 3.2 Laws of Addition

**Lemma 3.1 (Left Zero and Left Successor)** $0+a=a$ and $S(a)+b=S(a+b)$.

**Proof.** Prove the first equation by induction on $a$. The case $a=0$ holds by definition, and
$0+S(a)=S(0+a)=S(a)$.
Prove the second equation by induction on $b$. When $b=0$, both sides are $S(a)$. In the successor case,

$$
S(a)+S(b)=S(S(a)+b)=S(S(a+b))=S(a+S(b)).
$$

In each case, every step through the final equality can be written as a finite application of rules. □

**Theorem 3.2 (Associativity and Commutativity of Addition)**

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

**Proof.** The first equation follows by induction on $b$, with the induction step $0\cdot S(b)=0\cdot b+0$. Prove the second equation by induction on $b$ as well. The base case is zero. In the induction step,

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

**Theorem 3.4 (Semiring Laws)** Addition and multiplication on natural numbers are each commutative and associative, with zero and one as their respective identities. Multiplication distributes over addition and has zero as an absorbing element.

**Proof.** The claims about addition have already been proved. Prove commutativity of multiplication by induction on $b$. The base case is Lemma 3.3. The induction step is

$$
a\cdot S(b)=a\cdot b+a=b\cdot a+a=S(b)\cdot a.
$$

For the identity, $a\cdot1=a\cdot0+a=a$; the other side follows by commutativity. Prove the distributive law
$a\cdot(b+c)=a\cdot b+a\cdot c$ by induction on $c$. The base case is zero, and the induction step is

$$
\begin{aligned}
a\cdot(b+S(c))
 &=a\cdot S(b+c)\\
 &=a\cdot(b+c)+a\\
 &=(a\cdot b+a\cdot c)+a\\
 &=a\cdot b+a\cdot S(c).
\end{aligned}
$$

The other distributive law follows from commutativity of multiplication. Finally, prove associativity of multiplication by induction on $c$. The base case is zero, and the induction step is

$$
a\cdot(b\cdot S(c))
=a\cdot(b\cdot c+b)
=a\cdot(b\cdot c)+a\cdot b
=(a\cdot b)\cdot S(c).
$$

Thus all the laws are obtained by finite inductive proofs. □

### 3.4 Comparison, Difference, and Cancellation

Comparison is performed by removing one constructor from each of the two inputs at a time. If one side reaches zero first, the order is determined; if both reach zero simultaneously, they are equal. Define truncated subtraction by

$$
a\mathbin{\dot-}0=a,\quad
0\mathbin{\dot-}S(b)=0,\quad
S(a)\mathbin{\dot-}S(b)=a\mathbin{\dot-}b
$$

Comparison and subtraction terminate because they shorten finite structures.

The relation $a\le b$ is equivalent to the existence of a natural number $d$ such that $a+d=b$. The constructors remaining after the comparison procedure provide this $d$. If $a+d=b+d$, then $a=b$, as can be proved by induction, removing one stage of $d$ at a time. This is additive cancellation. The shapes of the constructors also imply that if $a+b=0$, both inputs are zero.

The product of nonzero $a,b$ is nonzero. Indeed, writing $b=S(c)$ gives $a\cdot b=a\cdot c+a$, and the addition retains a nonzero successor constructor. Comparison gives a total order, and transitivity follows by adding the witnesses for the differences. Multiplication by a positive number maps a positive difference to a positive product, so it preserves strict order.

## 4. Signed Integers and a Commutative Ring

### 4.1 Normalization of Zero

Let a raw integer representation be $(s,n)$, where $s$ has two possible values, positive or negative, and $n:\mathsf N$. In conceptual symbol strings, the positive sign is `f()` and the negative sign is `f(f())`. This is a reading as a sign type, not an identification with the integer values zero and one.

$$
\zeta(s,n)=
\begin{cases}
+(0),&n=0,\\
s(n),&n\ne0.
\end{cases}
$$

From now on, only representations passed through $\zeta$ are treated as integers. In particular, $-0$ is never returned. Apply this rule to every output of sign reversal, addition, and multiplication.

For addition, if the signs agree, add the magnitudes and retain the sign; if they differ, compare the magnitudes and return their difference with the sign of the larger one. Multiplication is computed from whether the signs agree and from the product of the natural-number magnitudes. For a zero result, the rule above takes precedence. These definitions give $1+(-1)=+0$ and $-(+0)=+0$.

### 4.2 Proving the Laws Using Difference Representations

To simplify the proofs, write $D(a,b)$ for the integer constructed from a pair of natural numbers $(a,b)$ by comparison and truncated subtraction. It is $+(a\mathbin{\dot-}b)$ if $a\ge b$, and $-(b\mathbin{\dot-}a)$ otherwise. This is an auxiliary operation returning the sign-and-magnitude representation already defined, not an additional number type.

**Lemma 4.1**

$$
D(a,b)=_{\mathsf Z}D(c,d)
\quad\Longleftrightarrow\quad a+d=c+b.
$$

**Proof.** If $a=b+r,\ c=d+s$, the left side is $r=s$, and additive cancellation reduces the right side to the same equation. The case where both are negative is similar. If the signs differ, write, for example, $a=b+r,\ d=c+s$; the right side is then equivalent to $r+s=0$. This holds exactly when $r=s=0$. By normalization of zero, the left side also holds exactly in this case. Totality of comparison exhausts the cases. □

This lemma shows that, for arbitrary difference representations,

$$
\begin{aligned}
D(a,b)+D(c,d)&=D(a+c,b+d),\\
-D(a,b)&=D(b,a),\\
D(a,b)D(c,d)&=D(ac+bd,ad+bc)
\end{aligned}
$$

agree with the operations on sign-and-magnitude representations. Lemma 4.1 also verifies invariance under changes of representation. For example, if $a+b'=a'+b$, the cross-sums of the two difference representations of the product are

$$
ac+bd+a'd+b'c
=c(a+b')+d(b+a')
=c(a'+b)+d(b'+a)
=a'c+b'd+ad+bc
$$

The same calculation applies to the second factor.

**Theorem 4.2** $\mathsf Z$ is a commutative ring.

**Proof.** Associativity and commutativity of addition follow by applying the natural-number laws to the components of the difference representations. The identity is $D(0,0)$, and the inverse is $D(b,a)$, whose sum with $D(a,b)$ is $D(a+b,a+b)=0$.

Commutativity of multiplication follows by exchanging the factors in the formula above. For three factors $D(a,b),D(c,d),D(e,f)$, either parenthesization gives the positive component
$ace+adf+bcf+bde$ and the negative component
$acf+ade+bce+bdf$. Expansion using the semiring laws for natural numbers proves associativity of multiplication. The multiplicative identity is $D(1,0)$. For the distributive law as well, expanding both components using the distributive laws for natural numbers gives matching components. □

In sign-and-magnitude representation, the magnitude of the product of nonzero integers is the product of nonzero natural numbers. Thus there are no zero divisors. If $ux=uy,\ u\ne0$, then $u(x-y)=0$ implies $x=y$.

### 4.3 Order on Integers

Define

$$
D(a,b)<D(c,d)\quad:\Longleftrightarrow\quad a+d<c+b
$$

By Lemma 4.1 and additive cancellation for natural numbers, changing the difference representation does not change the comparison result. An implementation can first compare the signs; if both are positive, it compares the magnitudes, and if both are negative, it compares the magnitudes in reverse order.

Transitivity follows by adding the corresponding inequalities and cancelling common terms. Adding the same integer preserves order. The product of positive integers is positive. In particular, $0<0$ is false, and the sign of zero cannot change the order.

## 5. Rational Numbers, Normalization, and an Ordered Field

### 5.1 The Denominator Condition and Normal Form

Let a raw rational-number representation be a pair of integers $(p,q)$ with $q\ne0$. If the denominator is negative, reverse both signs. If $p=0$, return $0/1$. Otherwise, divide both by the positive natural number
$g=\gcd(|p|,|q|)$ to obtain a representation satisfying

$$
q>0,\qquad \gcd(|p|,q)=1
$$

The explanatory symbol strings in the main text retain the original proposal's `(integer, integer)` form, explicitly writing the integer denominator as `(f(), positive natural number)` as well. If an existing arithmetic implementation stores the denominator as a positive natural number alone, this is an internal representation omitting its fixed positive sign. The maps that insert and remove this sign are mutually inverse and preserve both the nonzero condition and reducedness. For example, the full pair representation of `1/2` is `((f(),f(f())),(f(),f(f(f()))))`. Applying E from §2.6, the appendix represents it as `f(f(f()f(f()))f(f()f(f(f()))))`.

A zero denominator cannot form a rational number. The nonzero condition for division is not implemented by leaving evaluation to diverge.

For $d>0$, compute the natural-number quotient and remainder as follows: if $n<d$, return quotient zero and remainder $n$; otherwise, recurse on $n-d$ and increase the quotient by one. The natural number decreases at every stage. By induction, the returned pair $(k,r)$ satisfies
$n=kd+r,\ 0\le r<d$.

Euclid's procedure

$$
G(a,0)=a,\qquad G(a,b)=G(b,a\bmod b)\quad(b>0)
$$

terminates because its second argument strictly decreases. If $a=kb+r$, an integer divides both $a,b$ if and only if it divides both $b,r$. This invariant and the final pair $(g,0)$ show that the returned $g$ is a common divisor and that every common divisor divides $g$.

Tracing the same recursion backwards also yields integers $u,v$ satisfying $g=ua+vb$. Indeed, if the recursive call gives $g=u'b+v'r$, then
$g=v'a+(u'-kv')b$. At the base case $G(a,0)=a$, take $u=1,v=0$.

### 5.2 Equality and Uniqueness of Normal Form

Define

$$
\frac pq=_{\mathsf Q}\frac rs
\quad:\Longleftrightarrow\quad ps=rq
\qquad(q,s>0)
$$

Reflexivity and symmetry are immediate. If $ps=rq$ and $ru=ts$, then
$psu=rqu=tqs$, and cancellation of $s\ne0$ gives $pu=tq$, establishing transitivity.

**Theorem 5.1 (Normalization)** The normalization above preserves equality and returns a normal form. The normal form is unique among equal representations, and normalization is idempotent.

**Proof.** Simultaneous reversal of the signs and division by a common divisor preserve cross-product equality. If a common divisor $h>1$ remained after division by the gcd, then $gh$ would be a common divisor of the original numerator and denominator. But every original common divisor divides $g$, so $gh\mid g$, contradicting the order properties of positive integers. Thus the result is reduced.

To prove uniqueness explicitly, take reduced $p/q=r/s$. If $p=0$, both are $0/1$. Otherwise, reducedness and the coefficient calculation in the preceding subsection give integers $u,v$ with $up+vq=1$. Using $ps=rq$ gives

$$
s=ups+vqs=q(ur+vs)
$$

so $q$ divides $s$. Similarly, $s$ divides $q$. Both are positive, so the product and order properties of natural numbers imply $q=s$. Cancellation in the cross-product equality then gives $p=r$. If a representation is already in normal form, normalization returns the same representative again, so it is idempotent. □

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

The denominators are nonzero because the integers have no zero divisors. Invariance under changes of representation can be checked by multiplying and adding cross-product equalities. For example, if $pq'=p'q$ and $rs'=r's$, then

$$
(ps+rq)q's'=(p's'+r'q')qs
$$

so the definition of addition is independent of the representatives.

**Theorem 5.2** $\mathsf Q$ is a commutative field.

**Proof.** For three fractions $p/q,r/s,t/u$, either parenthesization of their sum gives denominator $qsu$ and numerator $psu+rqu+tqs$. Their product has numerator $prt$ and denominator $qsu$. Commutativity and distributivity follow by applying the corresponding integer laws to the cross-products. Zero is $0/1$, and one is $1/1$. The numerator of the sum with the additive inverse is zero. When $p\ne0$, cross-product comparison identifies $(p/q)(q/p)$ with one. Finally, uniqueness of normal form ensures that these also return the same representative as computation results. □

### 5.4 Comparison

For representations with positive denominators, define

$$
\frac pq<\frac rs\quad:\Longleftrightarrow\quad ps<rq
$$

Because the product of the denominators is positive, order is compatible with changes of representation and with the operations. For example, from $ps<rq,\ ru<ts$, multiplying each inequality by a positive number yields
$psu<rqu<tqs$. Cancelling positive $s$ gives $pu<tq$. This is transitivity. Taking differences shows that translation preserves order, and the product of positive fractions is positive. Thus the ordered-field laws hold.

With this comparator, $1<1$ reduces to the integer comparison $1<1$, which returns false. An implementation that decides strict order solely from the sign of the numerator meets the same specification only when it satisfies the zero-normalization and denominator-sign conditions.


## 6. Defining the Original Proposal's “Rational Limit” as a Sequence-Generating Label

### 6.1 The Finite Contract of qlim

For $a,b:\mathsf Q$, define a sequence-generating label that stores the program returning

$$
Q_{a,b}(n):=a+\frac{b}{n+1}\qquad(n:\mathsf N)
$$

and the arguments $a,b$. This is $\mathrm{qlim}(a,b)$ in the present version. It merely shifts the source material's $n=1,2,\ldots$ to zero-based inputs; the arithmetic at each stage is unchanged. If $b>0$, every output is greater than $a$; if $b<0$, every output is less than $a$. If $b=0$, it always returns $a$.

This definition does not return a single “last rational number.” What it retains is a program, its arguments, and, if needed, finite computation traces of executions already performed. A response to a specified $n$ and the sequence-generating label itself are treated as different types.

**Proposition 6.1 (Finite Error Contract)** For any positive rational number $\delta$, a finite computation can determine a natural number $N$ and guarantee that, for every $n\ge N$,

$$
|Q_{a,b}(n)-a|<\delta
$$

**Proof.** Take $N=\lceil |b|/\delta\rceil$. The integer obtained by rounding the rational quotient upwards can be computed finitely. If $n\ge N$, then $n+1>|b|/\delta$, so $|b|/(n+1)<\delta$. The inequality also holds when $b=0$. □

This uses rational inequalities and a finitely computed response bound. The guarantee can be translated into the language of classical limits, but that translation is not used to define the generator.

### 6.2 The “Next Rational Number” and Identification of Rates

In the usual order on rational numbers, if $a<r$, then $(a+r)/2$ lies between them. Thus “the closest rational number greater than $a$” cannot be defined as a value in $\mathsf Q$. Respecting the source material's intention that “what is unique is the recursive function,” this version reads it as a generative process with a direction.

If $b\ne c$, then $Q_{a,b}$ and $Q_{a,c}$ return different values for the same input. Which observations are regarded as the same must be defined separately. In particular, an identification that discards rates or coefficients must not be assumed automatically compatible with addition.

Indeed, let $u(n)=1/(n+1)$ and $v(n)=2/(n+1)$; then $u+u=v$ at every stage. If one identifies $u=v$ because “both approach zero from the positive side,” and also allows additive-group cancellation under that identification, then $u+u=u$ gives $u=0$. Thus the distinction $u>0$ cannot be retained at the same time. The source material's statement of independence from the choice of $b$ is not adopted as a general axiom until an equivalence relation and an operational specification resolving this issue have been established.

### 6.3 Generative Labels Retaining Rules and Evidence

Use the following explanatory form for a generative label:

$$
\operatorname{Label}(\mathrm{rule},\mathrm{parameters},\mathrm{specification},\mathrm{evidence})
$$

The four components can be stored as nested pairs and all converted back to f syntax by the method of §2.6. The rule stores code and the versions of the definitions it references; the parameters store initial values and similar data; the specification stores input and output types and guarantees; and the evidence stores a finite proof description supporting the specification. Labels with the same code are not necessarily the same if their parameters or specifications differ.

For example, the specification of $\mathrm{qlim}(a,b)$ consists of its response formula at each stage and the error contract of Proposition 6.1. The proof of the general specification and the computation trace of a response actually obtained for a particular request are recorded in separate fields. A few successful examples cannot suffice for the field intended to contain a universal proof.

In this paper, “carrying a proof” means that the rules used and the proof status are made explicit. We distinguish the stage at which a written proof in the main text is referenced, the stage at which a formal proof tree has been stored, and the stage at which a checker has accepted that tree. No mechanism for automatically certifying the termination or specification of arbitrary code is introduced. Finite syntax retaining an unknown rule is not treated in the same way as a generative label with a proved contract.

When generative labels are combined by an operation, a new contract is constructed from the input labels' contracts and the operation's preservation theorem. An expression whose necessary conditions have not yet been proved can also be retained as syntax, but it remains an expression with unmet conditions, not a label with guaranteed responses. In particular, division remains in this state until evidence of separation from zero, described later, has been obtained.

## 7. The Former Linear Representation L and Its Comparison with the Relation Operator #

### 7.1 Renaming the Former M to L for Comparison

M in the earlier version v1.5.0 represented a pair consisting of an integer stage index and a rational number, as one additive formal model of the original proposal's relation operators. In this version, at the author's direction, M is changed to the polynomials of Section 8. The former representation in this section is given the separate name L and used to explain comparisons and embeddings relating to the original proposal. We do not claim that L or M is obtained simply by quotienting the generators in Section 6.

Define

$$
\mathsf L:\ (k,a),\qquad k:\mathsf Z,\ a:\mathsf Q
$$

Embed a rational number $a$ as $(0,a)$. Read the symbol $a^\#$ as $(1,a)$, $a^{\flat}$ as $(-1,a)$, and $a^{\#\#}$ as $(2,a)$. Applying a relation operator is integer addition of stage indices.

Define the operations and order by

$$
\begin{aligned}
(k,a)+(l,b)&:=(k+l,a+b),\\
-(k,a)&:=(-k,-a),\\
(k,a)<(l,b)&:\Longleftrightarrow
 a<b\ \text{or}\ (a=b\ \text{and}\ k<l)
\end{aligned}
$$

Equality means equality of both components.

### 7.2 Proof of the Additive-Group and Order Properties

**Theorem 7.1** $\mathsf L$ is a totally ordered commutative additive group, and translations preserve order.

**Proof.** Either parenthesization of the sum of three elements gives $(k+l+m,a+b+c)$. Commutativity likewise follows from commutativity in each component. Zero is $(0,0)$, and the inverse is $(-k,-a)$.

Total comparison can be performed by comparing the rational components first and, when they are equal, comparing the integer components. If $u<v<w$ and at least one comparison of rational components is strict, transitivity of their order gives $u<w$. If all three rational components are equal, use transitivity of the integer components. Adding the same $(m,c)$ preserves strict order in the rational components; in the equality case, it preserves the order of the integer components. □

In this model,

$$
1^\flat+1^\#=2,\qquad
0^{\#\#}-0^{\#\#\#}=0^\flat
$$

hold by componentwise calculation. There is no element of $\mathsf L$ between the elements with the same rational component and integer components $k$ and $k+1$. This may be called “adjacency” in the sense of the original proposal, but it is distinguished from continuity in analysis.

Scalar multiplication by a rational number $q$ can be performed within this representation when $qk$ is an integer; in that case, define
$q(k,a)=(qk,qa)$. Thus $(2,2)/2=(1,1)$, or equivalently $(2^{\#\#})/2=1^\#$, is possible, but $(1,1)/2$ cannot be represented within this type.

### 7.3 Ratios of Linear Expressions from L Alone Are Not Closed

Introducing a formal symbol $\varepsilon$ and reading $(k,a)$ as $a+k\varepsilon$, fractions formed from pairs of elements of this comparison representation $\mathsf L$ become ratios of linear expressions:

$$
\frac{a+k\varepsilon}{b+l\varepsilon}
$$

At this stage, $\varepsilon$ is not a symbol to which a particular rational number is assigned.

**Proposition 7.2** Representations consisting only of these ratios of linear expressions are not closed under multiplication using the usual fraction operations.

**Proof.** Since $\varepsilon$ can be represented, closure would require $\varepsilon^2$ to be representable as well. Suppose that

$$
\varepsilon^2=\frac{a+k\varepsilon}{b+l\varepsilon}
$$

Then, as an equality of finite polynomials,
$b\varepsilon^2+l\varepsilon^3=a+k\varepsilon$.
Comparing coefficients requires $a=k=b=l=0$. But the denominator must not be zero. This is a contradiction. □

This counterexample concerns only L/L under the interpretation as linear expressions given above. It neither rules out every interpretation of the relation operators nor claims that extension to polynomials is the only realization of the original proposal. M, formally adopted in the next section, allows arbitrary finite degrees, so this failure of closure does not apply to M/M.

## 8. M-polynomials, finite rational-expression numbers Fε, generative complex numbers, and generative quaternions

### 8.1 Representing M-polynomials by finite coefficient sequences

A representation of $\mathsf M$ is a finite sequence of rational numbers
$(a_0,\ldots,a_d)$,
read as $a_0+a_1\varepsilon+\cdots+a_d\varepsilon^d$. This is the polynomial type corresponding to $\mathsf P_\varepsilon$ in the preceding version; the linear representations formerly called M have been renamed L in Section 7.

The explanatory conceptual symbol string is the nested pair
`(a₀,(a₁,(…,(a_d,f())…)))`.
The subscripts, ellipsis, and coefficient names are explanatory metanotation used only here; each individual finite example expands them all. Since a coefficient's position encodes its degree, neither the character ε nor exponents need to appear inside a fully expanded value. Trailing zero coefficients on the highest-degree side are removed, and zero is represented by the empty sequence `f()`. Equality of representations is equality of the normalized coefficient sequences.

Addition is coefficientwise addition, and the $n$th coefficient of a product is defined by the finite sum

$$
(ab)_n=\sum_{i+j=n}a_i b_j
$$

The indices range only over the finite sequences. The laws of addition follow by applying the rational-number laws to each component. Associativity of multiplication follows because, under either parenthesization, the $n$th coefficient is
$\sum_{i+j+k=n}a_i b_j c_k$.
Distributivity also follows by expanding finite sums. Zero is the empty sequence, one is the singleton sequence with coefficient one, and additive inverses negate each coefficient. Thus M forms a commutative ring.

The product of the leading coefficients of nonzero polynomials $p,q$ is nonzero, so
$\deg(pq)=\deg p+\deg q$. Hence polynomials also have no zero divisors. The highest degree used here should not be confused with the least nonzero degree used below.

### 8.2 Fraction representations and the four arithmetic operations

A pair $p,q:\mathsf M,\ q\ne0$ is a fraction representation, with representations identified by

$$
\frac pq=_{\mathsf F_\varepsilon}\frac rs
\quad:\Longleftrightarrow\quad ps=rq
$$

In this version, $\mathsf F_\varepsilon$ is provisionally called the system of “finite rational-expression numbers.” Its operations have the same form as those of the familiar notation $\mathbb Q(\varepsilon)$, but the definition here uses the coefficients already constructed and procedures on finite sequences.

The four arithmetic operations are defined by the same fraction formulas as in the section on rational numbers. Nonzero denominators, transitivity of equality, and invariance of operations under changes of representation can be proved by the same cross-product calculations as in Section 5, using the absence of zero divisors among polynomials.

**Theorem 8.1.** $\mathsf F_\varepsilon$ is a commutative field. The map $\mathsf Q\to\mathsf M$ to constant polynomials and the map $\mathsf M\to\mathsf F_\varepsilon$ given by $p\mapsto p/1$ are injective and preserve zero, one, addition, and multiplication. The map $\mathsf L\to\mathsf M$ given by $(k,a)\mapsto a+k\varepsilon$ is also injective and preserves zero and addition.

**Proof.** Associativity and commutativity of addition and multiplication, and distributivity, follow by passing to common denominators and applying the polynomial laws. The inverse of a nonzero $p/q$ is $q/p$. Injectivity of the maps from Q and L to M follows by comparing the coefficients of constant or linear polynomials. Injectivity of the map from M to F follows because $p/1=r/1$ is equivalent to $p=r$. The preservation laws follow from coefficientwise calculations and the fraction formulas. Thus arbitrary fractions of M-polynomials with nonzero denominators are closed under the four arithmetic operations, excluding division by zero. □

### 8.3 gcd and a unique normal form

For $q\ne0$, polynomial division stops if the degree of the dividend is less than that of $q$; otherwise, it subtracts the appropriate power of $\varepsilon$ times $q$, scaled by the ratio of leading coefficients. The leading term vanishes and the degree strictly decreases, so the procedure terminates. Its outputs $h,r$ satisfy
$p=hq+r$ and either $r=0$ or $\deg r<\deg q$.

Use this remainder procedure to run Euclid's algorithm, and scale the gcd to have leading coefficient one. The common-divisor invariant and the identity
$g=up+vq$
obtained by tracing coefficients backward can be proved by the same procedure as in Section 5. The following normalization can therefore be defined as a finite procedure.

1. If $p=0$, return $(0,1)$.
2. Compute $g=\gcd(p,q)$ and divide both numerator and denominator by $g$.
3. Divide both numerator and denominator by the leading coefficient $c\ne0$ of the resulting denominator.

The numerator and denominator are then coprime, and the denominator has leading coefficient one. Since rational coefficients are represented in reduced form, an additional integer-content procedure is not a separate requirement for uniqueness.

**Theorem 8.2 (Uniqueness of normalization).** The procedure above preserves the value and returns a unique normal form.

**Proof.** Each step divides both numerator and denominator by the same nonzero polynomial or the same nonzero coefficient, so it preserves cross-product equality. For coprime $p,q$, one obtains $up+vq=1$. If normalized representations satisfy $p/q=r/s$, then
$s=ups+vqs=q(ur+vs)$,
so $q$ divides $s$. The reverse also holds, so their degrees agree and their quotients are nonzero constants. Since both denominators have leading coefficient one, $q=s$; the absence of zero divisors then gives $p=r$. □

### 8.4 An order that reads ε as a positive infinitesimal direction

For a nonzero polynomial $p$, let $\nu(p)$ be its least nonzero degree and $c_0(p)$ its coefficient at that degree. For a nonzero fraction, define

$$
\operatorname{sgn}\left(\frac pq\right)
:=\operatorname{sgn}(c_0(p))\operatorname{sgn}(c_0(q))
$$

Define $x<y$ to mean that $y-x$ has positive sign. Merely making the denominator's leading coefficient one does not fix the sign of its least-degree coefficient, so the numerator's sign alone must not be used.

**Theorem 8.3.** With this order, $\mathsf F_\varepsilon$ is an ordered field.

**Proof.** If $ps=rq$, the coefficients at the least nonzero degrees of the two products agree, so the sign assigned to a fraction is independent of its representation. The sign of a product is the product of the signs.

Take two positive fractions. By negating both numerator and denominator if necessary, the least-degree coefficient of each denominator can be made positive. Each numerator then also has positive sign. In the numerator $ps+rq$ of the sum, if the two terms have different least degrees, the positive coefficient at the smaller degree remains; if the degrees agree, the sum of two positive coefficients remains. Hence the sum of two positive elements is positive. Every nonzero element is either positive or negative, and cannot be both. These facts and the definition by differences imply totality, transitivity, preservation under translation, and preservation under multiplication by positive elements. □

In this order, for every positive rational number $r$,
$0<\varepsilon<r$. Indeed, the least-degree coefficient of $r-\varepsilon$ is $r>0$. Moreover, $\varepsilon^{-1}$ is greater than every positive rational number. Restricting the order to M gives an ordered ring. The embedding from L to M compares the rational components first, and compares the stage indices if their difference is zero; it therefore preserves the order of Section 7.

When using the relation operators on M, one can define $P^\#:=P+\varepsilon$ and $P^\flat:=P-\varepsilon$. Repeated application amounts to adding or subtracting an integer multiple of ε and agrees with the previous procedures on L. However, M also contains $P+\varepsilon/2$, so $P<P+\varepsilon/2<P^\#$. “Adjacency” is a property confined to L in Section 7 and does not hold throughout M or Fε.

### 8.5 The standard part is restricted to the finite part

For a nonzero fraction, put
$v(p/q)=\nu(p)-\nu(q)$.
Cross-product equality shows that this integer is independent of the representation. Call zero and the elements satisfying $v(x)\ge0$ the **finite part** $\mathsf O_\varepsilon$.

By removing a common power of $\varepsilon$ from its numerator and denominator, every element of the finite part has a representation with $q(0)\ne0$. Using such a representation, define

$$
\operatorname{st}:\mathsf O_\varepsilon\longrightarrow\mathsf Q,
\qquad \operatorname{st}(p/q):=p(0)/q(0)
$$

“Substitution of zero” here is the procedure that extracts the constant term of a finite coefficient sequence.

**Theorem 8.4.** $\mathsf O_\varepsilon$ is closed under addition and multiplication, and $\operatorname{st}$ is a unital ring homomorphism.

**Proof.** Zero and one belong to the finite part. Negation leaves the denominator's constant term unchanged, so additive inverses also belong to the finite part. Choose two representations whose denominators have nonzero constant terms. The denominators of their sum and product also have nonzero constant terms, so the results remain in the finite part. Substituting zero into the cross-product equality shows that the standard part is independent of the representation. Applying constant-term extraction to the fraction formulas for addition and multiplication directly gives preservation of addition and multiplication, and the image of one is one. □

This is not a map on all of $\mathsf F_\varepsilon$. If it were extended to the entire field while requiring both $\operatorname{st}(\varepsilon)=0$ and preservation of multiplication, then

$$
1=\operatorname{st}(\varepsilon\varepsilon^{-1})
=0\operatorname{st}(\varepsilon^{-1})=0
$$

Excluding $\varepsilon^{-1}$ from the domain is essential.

### 8.6 Scope of representation

The finite rational-expression numbers do not automatically include square roots or π.

**Proposition 8.5.** No element of $\mathsf F_\varepsilon$ satisfies $x^2=2$.

**Proof.** If a nonzero $p/q$ satisfied this equation, then $p^2=2q^2$. Comparing degrees gives $\deg p=\deg q$, and the ratio of leading coefficients would be a rational number $r$ satisfying $r^2=2$. However, if a reduced fraction $m/n$ satisfied that condition, then $m^2=2n^2$. A case distinction on the parity of natural numbers shows that if a square is even, its base is also even, so $|m|=2k$. Substitution gives $n^2=2k^2$, making $n$ even as well. This contradicts the fraction being reduced. □

An interval-generating label for $\sqrt2$ must therefore not be identified with an element of $\mathsf F_\varepsilon$. This version also gives no representation of π as a finite rational expression. Generative processes that return the required responses are handled using a separate data format in the next section.

Another boundary is that Fε has no element satisfying $x^2=\varepsilon$. For nonzero elements, $v(xy)=v(x)+v(y)$, so such an $x$ would require the integer equality $2v(x)=1$, contradicting parity. This obstruction is not removed merely by adjoining $\sqrt2$ to the coefficients. Depending on the equations needed, one must distinguish extensions to coefficients, exponents, and generative labels.

### 8.7 Generative complex numbers — applying the original construction to finite rational-expression numbers

Retaining the two-by-two representation of the original material, form, for $a,b:\mathsf F_\varepsilon$,

$$
J(a,b):=\begin{pmatrix}a&-b\\ b&a\end{pmatrix}
$$

Call this type the **generative complex numbers**, denoted by $\mathsf C_\varepsilon$. Componentwise matrix calculations give the sum and product of $J(a,b)$ and $J(c,d)$ as

$$
\begin{aligned}
J(a,b)+J(c,d)&=J(a+c,b+d),\\
J(a,b)J(c,d)&=J(ac-bd,ad+bc)
\end{aligned}
$$

so this type is closed under both operations. Equality is equality of the two components. Setting $i:=J(0,1)$ gives $i^2=J(-1,0)$, and the multiplicative identity is $J(1,0)$.

**Theorem 8.6.** $\mathsf C_\varepsilon$ is a commutative field.

**Proof.** Commutativity, associativity, and inverses for addition follow componentwise. Expanding the two-component formula above shows that multiplication is commutative. For three factors, either parenthesization gives $ace-adf-bcf-bde$ in the first component and $acf+ade+bce-bdf$ in the second, proving associativity. Distributivity follows from the same componentwise expansion.

If $J(a,b)\ne J(0,0)$, then in the ordered field $\mathsf F_\varepsilon$ one has $a^2+b^2>0$. Hence one can form

$$
J(a,b)^{-1}
=J\left(\frac a{a^2+b^2},\frac{-b}{a^2+b^2}\right)
$$

and the product has first component one and second component zero. □

This applies the construction corresponding to the original proposal's “new complex numbers” to the now-specified coefficient type. It is not identified with the entirety of the classical complex numbers. Encoding and decoding of this type, and checking of its component constraints, are implemented in the conceptual-symbol-string codec; dedicated arithmetic APIs and machine proofs of its general laws are not included in this version.

### 8.8 Generative quaternions as pairs of generative complex numbers

Without changing the representation of generative complex numbers in the preceding subsection, define conjugation by
$\overline{J(a,b)}:=J(a,-b)$.
Calculations on the two components show that conjugation preserves sums and products, and applying it twice returns the original element. Also, for $z=J(a,b)$, one has $z\overline z=J(a^2+b^2,0)$. Below, $J(r,0)$ with only a real component is written using the same notation as the coefficient $r:\mathsf F_\varepsilon$.

Define the type of generative quaternions by

$$
\mathsf H_\varepsilon:\ (z,w),\qquad z,w:\mathsf C_\varepsilon
$$

Fix its reading as $z+w j$, and define addition and multiplication by

$$
\begin{aligned}
(z,w)+(u,v)&:=(z+u,w+v),\\
-(z,w)&:=(-z,-w),\\
(z,w)(u,v)&:=(zu-w\overline v,\;zv+w\overline u)
\end{aligned}
$$

Equality is equality of the two generative complex components. Thus the conceptual-symbol-string type is `(generative complex number,generative complex number)`, retaining the four-entry matrix arrangement of each generative complex number. Merely making the type a pair does not determine generative quaternion multiplication: the rule involving conjugation given above must be supplied separately.

For $a,b,c,d:\mathsf F_\varepsilon$, the correspondence is

$$
a+bi+cj+dk\quad\longleftrightarrow\quad
\bigl(J(a,b),J(c,d)\bigr)
=\bigl(((a,-b),(b,a)),((c,-d),(d,c))\bigr).
$$

Further expanding the coefficients and their negatives on the right through F, M, rational numbers, integers, and natural numbers produces a finite symbol string containing only f, parentheses, and commas. Minus signs can be eliminated by the procedure that constructs the sign component of an integer.

**Theorem 8.7.** $\mathsf H_\varepsilon$ is an associative, noncommutative division ring and contains $\mathsf F_\varepsilon$ as a subfield of its center.

**Proof.** The additive group laws and distributivity follow from the component laws and preservation of addition by conjugation. To check associativity, use the two-by-two matrix with generative complex entries

$$
\Phi(z,w)=
\begin{pmatrix}z&-w\\\overline w&\overline z\end{pmatrix}
$$

Multiplying the entries gives $\Phi((z,w)(u,v))=\Phi(z,w)\Phi(u,v)$. Associativity of matrix multiplication follows by expanding each entry as a finite sum and applying associativity and distributivity of the generative complex numbers. Since z and w can be recovered from its first row, Φ is injective, so generative quaternion multiplication is also associative. The multiplicative identity is $(1,0)$.

For $h=(z,w)$, $z=J(a,b)$, and $w=J(c,d)$, put $\overline h:=(\overline z,-w)$ and

$$
N(h):=z\overline z+w\overline w=a^2+b^2+c^2+d^2
$$

The definition of multiplication gives $h\overline h=\overline h h=(N(h),0)$. If $h\ne0$, at least one component is nonzero, and positivity in the ordered field Fε gives $N(h)>0$. Thus

$$
h^{-1}=\left(\frac{\overline z}{N(h)},\frac{-w}{N(h)}\right)
$$

is a two-sided inverse. Here division of a component is defined using multiplication by a nonzero Fε coefficient.

Setting $i=(J(0,1),0)$, $j=(0,1)$, and $k=(0,J(0,1))$, direct multiplication gives
$i^2=j^2=k^2=-1$, $ij=k$, and $ji=-k$.
Since Fε has characteristic zero, $k\ne-k$, so multiplication is noncommutative. Elements of Fε are embedded by $r\mapsto(J(r,0),0)$; they are fixed by conjugation and commute with all components, and therefore belong to the center. □

The order of factors must be specified in division of generative quaternions. Write right division as $h/g:=hg^{-1}$ and left division as $g^{-1}h$. These generative quaternions constructed from Fε are not identified with the full quaternion system having all classical real numbers as coefficients. Theorem 8.7 is a written proof added in v1.5.1 and is not included in the machine checking of the 16 equational proof records. The ability to generate and decode conceptual symbol strings is not called machine verification of the general laws of generative quaternion arithmetic.

### 8.9 Minimality when preserving L and generating by the four arithmetic operations

Adopting ratios of polynomials is not unconditionally forced by the original proposal. However, specifying the structure to be preserved as follows allows a stronger justification for this choice.

**Theorem 8.8 (Conditional minimality).** Suppose another representation system E has the operations and laws of an ordered field, a map $j:\mathsf Q\to E$ preserving rational arithmetic, zero, and one, and a map $i:\mathsf L\to E$ preserving addition and strict order on L. Suppose also that $i(0,a)=j(a)$. Then the part formed from $i(\mathsf L)$ by finitely many applications of the four arithmetic operations, excluding division by zero, corresponds uniquely to Fε by an ordered-field isomorphism fixing the image of L.

**Proof.** Put $e:=i(1,0)$. Preservation of addition gives $i(k,a)=j(a)+ke$. Since the order on L is preserved, for every positive rational number $r$, one has $0<e<j(r)$. In what follows, omit $j$ from the notation.

Write a nonzero polynomial as $P(X)=X^m(c_0+c_1X+\cdots+c_dX^d)$, with $c_0\ne0$, and compute the finite rational number $H=\sum_{j=1}^d|c_j|$. Since $e<1$ and $e<|c_0|/[2(H+1)]$,

$$
\left|\sum_{j=1}^dc_je^j\right|\le eH<|c_0|/2.
$$

Thus $P(e)$ is nonzero, and its sign agrees with that of $c_0$. This estimate uses only inequalities for finite sums. In particular, evaluating a nonzero denominator polynomial does not give zero, so the map $P(\varepsilon)/Q(\varepsilon)\mapsto P(e)/Q(e)$ is defined. Cross products establish independence of representation and injectivity; the fraction formulas and the sign estimate above establish preservation of the four arithmetic operations and order.

This image contains Q and e and is closed under the four arithmetic operations. Conversely, each of its elements can be formed from rational coefficients and e using finitely many additions, multiplications, and reciprocals. Structural induction on finite expressions shows that the part generated by the four arithmetic operations is exactly this image. The map is unique because the images of the rational numbers and $\varepsilon$ determine the image of every polynomial ratio. □

The “part” here can be read as the range of formation of the permitted finite expressions. There is no need to define a smallest field by intersecting arbitrary subsets. The theorem claims no uniqueness for interpretations that omit order preservation, for the connection between L and qlim, or for constructions incorporating generative labels as coefficients. It strengthens the justification for adopting the present M and Fε under the explicitly stated preservation conditions.

## 9. Applications to Other Fields

The detailed definitions, proofs, and finite checking examples for this section are collected in the [application research notes](../research/applications-v1.5.4.md). The following overview explains how they connect to this system.

### 9.1 A Category of Computation Traces Described Using Arrows Alone

Starting from constructions between which one-step transitions are permitted, we form computation traces as finite sequences of transitions. A history of length zero also records the construction at its location. For a history $h$, let $d(h),c(h)$ be the empty histories at its start and end. Define composition exactly when $c(h)\equiv d(k)$, by following $h$ with $k$ through concatenation.

Equality of arrows is syntactic identity of histories. Identity arrows are empty histories. The fact that concatenating an empty history returns the original history follows from the definition of sequences. Associativity of composition is associativity of finite-sequence concatenation and can be proved by structural induction on the first sequence. We thus obtain an arrow-only description in which identity arrows specify boundaries in place of objects.

Different histories leading to the same result are not automatically identified as the same arrow here. If such an identification is added, composition must separately be proved independent of representatives. The description of objects through identity arrows already appears in the original paper of Eilenberg–Mac Lane. The contribution here is to make that description concrete using the finite computation traces we have constructed. [Eilenberg–Mac Lane, 1945, p.238](https://people.math.osu.edu/cogdell.1/6112-Eilenberg%26MacLane-www.pdf)

Examples with inverse arrows can also be constructed from generative labels. Let $(P,k)$ retain a base label P and an integer k, returning $P(n)+k$ for a sequence label and $[L_p+k,U_p+k]$ for an interval label. Defining $T_s(P,k):=(P,k+s)$, the laws of integer addition give $T_0=\mathrm{id}$, $T_t\circ T_s=T_{s+t}$, and $T_{-s}\circ T_s=\mathrm{id}$. Interval widths remain unchanged, and termination and nesting are preserved. This is translation of values; it is distinct from changing the input to $n+k$ or moving in the ε direction by the relation operator #.

Give the arrow $\tau(P,k;s)$ the identity arrow of $(P,k)$ as its source boundary and the identity arrow of $(P,k+s)$ as its target boundary. Defining composition of arrows with matching boundaries by addition of the translation amounts yields a category in which every arrow has an inverse. No decision of semantic equality between different base labels is needed: it suffices to retain the syntax of the base label and the normalized integer. The detailed formation rules and written proofs are collected in the [computation-trace extensions](../research/trace-extensions-v1.5.4.md).

### 9.2 Interval-Generating Labels That Respond to Precision Requests

Consider a generator that, for a precision $p:\mathsf N$, returns a closed rational interval $I_p=[L_p,U_p]$ together with evidence that $L_p\le U_p$ and $U_p-L_p\le2^{-p}$. This section uses the nested form satisfying $I_{p+1}\subseteq I_p$. Inclusion abbreviates rational comparisons of the lower and upper endpoints; it does not presuppose operations on arbitrary sets. The essential requirement is to guarantee compatibility between responses as well as their widths.

A finite description retaining this program and the necessary information is called an **interval-generating label**. The earlier term “precision-response representation” refers to a representation by such a label. Its contract consists of a finite response to each request, the precision guarantee, and nesting. We do not assume that every program satisfies this contract.

Two interval-generating labels $I,J$ are **response-compatible** if, for any finite precisions $p,q$,

$$
\max(L^I_p,L^J_q)\le\min(U^I_p,U^J_q)
$$

holds. This condition requires responses to intersect even at different precisions; agreement of a few examples at the same precision is insufficient. Response compatibility is reflexive, symmetric, and transitive. For transitivity, suppose that $I_p$ and $K_q$ are separated by a positive rational gap $d$. The width of $J_r$, which intersects both, must then be at least d. On the other hand, rational arithmetic allows us to find r finitely such that $2^{-r}<d$, a contradiction. This argument concerns rational endpoints; it does not assert that rational precision separates every positive element of Fε.

This version does not form a coefficient field by taking the quotient of all labels under response compatibility. Syntactic identity, equality of individual responses, and response compatibility over all requests are kept distinct, and compatibility is proved for the pairs where it is needed. Nor do we assume a procedure that automatically decides response compatibility for any two programs.

**Proposition 9.1 (Composition of labels by interval arithmetic).** From interval-generating labels satisfying the contract, labels for sums, differences, and products can be constructed by finite processing. For a reciprocal, additionally supply **evidence of separation from zero**: the response to some request $r_0$ lies on the $[d,\infty)$ side or the $(-\infty,-d]$ side, where $d>0$ is rational.

**Proof.** Interval sums and differences add or subtract endpoints; interval products take the minimum and maximum of the four endpoint products. From the initial intervals, compute rational bounds A and B on the absolute values in all responses. The widths of sums and differences are bounded by the sum of the input widths, and the width of a product is bounded by $A\operatorname{width}(J)+B\operatorname{width}(I)$. This estimate follows by splitting the difference of two endpoint products as $xy-x'y'=x(y-y')+y'(x-x')$. Thus rational comparisons and iteration of precisions find input precisions that make the width at most the target.

The reciprocal of $[L,U]$ that does not contain zero is $[1/U,1/L]$. If $|L|,|U|\ge d$, its width is $(U-L)/|LU|\le(U-L)/d^2$. It therefore suffices to use an input precision at least $r_0$ and reduce the width to at most $d^2 2^{-p}$. Division is constructed from this reciprocal and multiplication. Making the precision choices nondecreasing by taking the finite maximum up to each p makes both inputs and outputs nested. Each stage uses only finitely many rational operations, and the search that reduces a negative power of two below a positive rational threshold terminates. □

The expectation that “the denominator label ought to differ from zero” is no substitute for separation evidence. The reciprocal contract applies only after a separated interval and its output trace have been obtained. If the evidence has not yet been obtained, retain the division expression as conditional syntax. Error allocation and the checking format for finite examples are presented in the [application research notes](../research/applications-v1.5.4.md).

### 9.3 Bisection for √2

Start with the rational interval $[0,2]$ and compare the square of its midpoint $m$ with two. If $m^2<2$, replace the lower endpoint by $m$; if $m^2>2$, replace the upper endpoint by $m$. If $m^2=2$, replace the interval by $[m,m]$.

At each stage,

$$
0\le L,\qquad L^2\le2\le U^2
$$

is preserved, the intervals are nested, and the width becomes at most half its previous value. After $p+1$ iterations, the width is at most $2/2^{p+1}=2^{-p}$. A response to the requested precision therefore always terminates after finitely many iterations. This program together with its guarantee can be adopted as an interval-generating label for $\sqrt2$.

In this example, each response can be checked using only comparisons of integer and rational squares. There is no need to read a “final value” into a nonterminating expression. The expression $f=1+1/(2+f)$ in the original material gives $f^2+f-3=0$ when interpreted as a fixed point, so it is not used to define this representation.

### 9.4 Interval Processing for an Alternating Series

Let

$$
S_n:=\sum_{j=0}^{n}\frac{(-1)^j}{2j+1},\qquad
A_m:=4S_{2m},\qquad B_m:=4S_{2m+1}
$$

Direct calculation of the finite sums gives

$$
A_m-B_m=\frac4{4m+3}>0
$$

Moreover, $A_m$ decreases and $B_m$ increases. Grouping the differences into pairs of terms proves their respective signs by rational comparison. Thus $[B_m,A_m]$ is a nested sequence of rational intervals. Choosing $m=2^p$ makes the width less than $2^{-p}$.

The description retaining this finite processing is called an interval-generating label for $\Pi$. Identifying it as a description of the same value as the classical circle constant requires a separate theorem and interpretation. What this paper directly guarantees internally is the interval, nesting, width, and finite termination. The midpoint $(A_m+B_m)/2$ can be returned as a rational approximation, but is not asserted to become the exact circle constant at any finite stage. Nor does a rule setting $B_m^\#=A_m^\flat$ at each stage follow from the lexicographic model in Section 7.

### 9.5 Polynomial Differentiation and Formal Integration

For an independent formal variable $X$, define the formal derivative of
$P(X)=\sum_{k=0}^d a_kX^k$, represented by a finite coefficient sequence, as

$$
DP(X)=\sum_{k=1}^d k a_kX^{k-1}
$$

The differentiation formulas for sums and products can be proved by comparing the coefficients of finite sums. For example, the coefficient arising in degree $i+j-1$ of a product is $(i+j)a_i b_j$, which equals
$i a_i b_j+j a_i b_j$.

For a rational number $R>0$ and $|x|,|y|\le R$, finite factorization gives

$$
|P(x)-P(y)|\le
\left(\sum_{k=1}^d k|a_k|R^{k-1}\right)|x-y|
$$

Furthermore, if $|x|,|x+h|\le R,\ h\ne0$, then

$$
\left|\frac{P(x+h)-P(x)}h-DP(x)\right|
\le
\left(\sum_{k=2}^d\frac{k(k-1)}2|a_k|R^{k-2}\right)|h|.
$$

Thus the input width required for a desired error can be computed by rational arithmetic. For polynomials, this provides an example of basic response guarantees from analysis expressed as finite processing.

Because the coefficients are rational, we can form
$IP(X)=\sum_{k=0}^d a_kX^{k+1}/(k+1)$,
and coefficient calculation gives $D(IP)=P$. For rational endpoints $a,b$, we can compute $IP(b)-IP(a)$ as a formal definite integral. This finite-coefficient proof alone does not justify claiming an integration theory for general functions or a comprehensive identification with classical integration.

### 9.6 Constructing Interval-Generating Labels from General Alternating Sums

**Theorem 9.2 (Finite alternating sums and a modulus of error).** Suppose a procedure returns a rational term $a_j$ for each finite j, accompanied by a proof of $a_j\ge a_{j+1}\ge0$ and a modulus of error that returns a natural number $\mu(p)$ for each p and guarantees $a_{2\mu(p)}\le2^{-p}$. Let $S_n:=\sum_{j=0}^n(-1)^ja_j$ and $M(p):=\max(p,\mu(0),\ldots,\mu(p))$. Then

$$
I_p=[S_{2M(p)+1},S_{2M(p)}]
$$

satisfies the contract of an interval-generating label.

**Proof.** We have $S_{2m}-S_{2m+1}=a_{2m+1}\ge0$. Also,
$S_{2m+2}-S_{2m}=-a_{2m+1}+a_{2m+2}\le0$ and
$S_{2m+3}-S_{2m+1}=a_{2m+2}-a_{2m+3}\ge0$.
Thus the intervals become nested as m increases. M is nondecreasing, and the width is
$a_{2M(p)+1}\le a_{2\mu(p)}\le2^{-p}$. The terms through $2M(p)+1$ and their finite sums can be computed in finitely many steps. □

This theorem is not a rule for executing arbitrary infinite sums. It is a rule for conversion to another finite-response format when a finite-term generation rule, monotonicity, and a modulus of error are provided. Section 9.4 is a concrete example using $a_j=4/(2j+1)$.

### 9.7 Comparing Responses from Newton's Method and Bisection

Start with the upper rational bound $u_0=2$ and put $l_n=2/u_n$ and $u_{n+1}=(u_n+l_n)/2$. The response at each stage is $[l_n,u_n]$.

**Theorem 9.3.** This processing gives an interval-generating label for the square root and is response-compatible with the bisection procedure in §9.3 over all requests.

**Proof.** Initially, $1=l_0\le u_0=2$ and $l_0u_0=2$. Assume $1\le l\le u\le2$ and $lu=2$, and put $u'=(u+l)/2$ and $l'=2/u'$. Since $(u')^2-2=(u-l)^2/4\ge0$, we have $l'\le u'$. Also, $u'\le u$ and $l'\ge l$ show that the intervals are nested and retain the same bounds. It also follows that $l^2\le2\le u^2$.

The width $w=u-l$ satisfies $0\le w\le1$, and

$$
w'=\frac{w^2}{2(u+l)}\le\frac w4
$$

Here the denominator is at least four, and we used $w^2\le w$. Thus, for example, p updates reduce the width to at most $4^{-p}\le2^{-p}$, so processing terminates for each request.

Take any response $[L,U]$ from bisection and any response $[l,u]$ from Newton's method. Both have nonnegative endpoints and satisfy the square invariant. If $U<l$, then $2\le U^2<l^2\le2$, a contradiction; the case $u<L$ is analogous. The two intervals therefore intersect. □

This comparison uses finite rational arithmetic, invariants, and induction. It proves a relation between the responses guaranteed by two finite programs without adding a square-root element to Fε. It is a concrete example of how programs can play the same role in the required sense while their distinct computation histories are retained.

### 9.8 Converting a Sequence with a Modulus of Error into Finite Intervals

**Theorem 9.4 (Conversion from a modulus of error to an interval-generating label).** Suppose we are given a procedure returning a rational sequence $s_n$ and a nondecreasing natural-number procedure $\mu(k)$ for each k, and that

$$
i,j\ge\mu(k)\quad\Longrightarrow\quad |s_i-s_j|\le2^{-(k+2)}
$$

has been proved. Put $r_k:=2^{-(k+2)}$ and
$J_k=[s_{\mu(k)}-r_k,s_{\mu(k)}+r_k]$, and return

$$
I_p=\left[\max_{k\le p}(s_{\mu(k)}-r_k),\ 
          \min_{k\le p}(s_{\mu(k)}+r_k)\right]
$$

This procedure satisfies the contract of an interval-generating label. It is also response-compatible with a label obtained using another valid modulus of error for the same sequence.

**Proof.** For any $k\le p$, we have $\mu(p)\ge\mu(k)$, so the error contract places $s_{\mu(p)}$ between the endpoints of $J_k$. Thus the finite maximum of the lower endpoints is at most the finite minimum of the upper endpoints, and $I_p$ is nonempty. As p increases, the lower endpoint does not decrease and the upper endpoint does not increase; the width of $I_p$ is at most the width of $J_p$, which is $2^{-(p+1)}\le2^{-p}$. All processing is finite.

For responses at precisions p and q obtained from two moduli of error, choose n at least as large as all the finitely many thresholds used in them. The same $s_n$ lies in every constituent interval on both sides, so the responses formed by the finite maxima and minima also intersect. □

A modulus of error that is not nondecreasing can be replaced by the finite maximum up to each k. We do not assert that this conversion can be performed automatically on an arbitrary sequence for which no modulus of error has been supplied. Nor have we first supplied an element belonging to the intersection of infinitely many intervals or embedded such an element into Fε. The output is an interval-generating label retaining the rule and its guarantee.

### 9.9 Distinguishing Rational Precision from Full Fε Precision and Extending Guarantees in Analysis

The $2^{-p}$ used by interval-generating labels is **rational precision**. In contrast, if errors are measured using the order of Fε, one can consider **full Fε precision**, which permits any positive $\delta:\mathsf F_\varepsilon$ as a requested bound. These two must not be substituted for one another.

For example, at rational precision the constant zero sequence approaches both zero and ε, because $|0-\varepsilon|$ is smaller than every positive rational number. Likewise, the rational interval $[-2^{-(p+1)},2^{-(p+1)}]$ contains both zero and ε for every p. Thus shrinking rational intervals alone cannot establish equality in Fε. Since $1/(n+1)$ is a positive rational number at every finite n, it is greater than ε and does not satisfy the contract of approaching zero at full Fε precision.

If convergence at full Fε precision is defined, its condition is $\forall\delta>0\ \exists N\ \forall n\ge N:|x_n-x|<\delta$. A limit under this condition is unique. If there were two distinct candidates x and y, choose $\delta=|x-y|/3$ and apply the triangle inequality at a common sufficiently late stage to obtain $|x-y|<2|x-y|/3$, a contradiction. Restricting all positive δ in this proof to rational numbers would fail to exclude the counterexample involving ε.

**Difference quotient of the reciprocal.** When $x\ne0$, $h\ne0$, and $|h|\le|x|/2$, finite ordered-field operations alone give

$$
\left|\frac{1/(x+h)-1/x}{h}+\frac1{x^2}\right|
=\left|\frac{h}{x^2(x+h)}\right|
\le\frac{2|h|}{|x|^3}
$$

The denominator conditions are also secured by $|x+h|\ge|x|/2>0$. For any positive $\delta:\mathsf F_\varepsilon$, taking $0<|h|<\min(|x|/2,\delta|x|^3/2)$ makes the error of the difference quotient less than δ. This input width can itself be formed using the four arithmetic operations and comparisons in Fε. It therefore provides an example guaranteeing that $x\mapsto1/x$ has derivative $-1/x^2$ at full Fε precision. There is no need to introduce general real functions.

**Finite rectangle sums.** For rational endpoints $a<b$ and a polynomial P with rational coefficients, put $\Delta=(b-a)/n$, $x_j=a+j\Delta$, and $n\ge1$, and define the left-endpoint sum as $R_n=\Delta\sum_{j=0}^{n-1}P(x_j)$. Write the formal definite integral from §9.5 as $A_P=IP(b)-IP(a)$. Choose a rational R such that $|x|\le R$ between the endpoints and compute $C=\sum_{k=1}^d k|a_k|R^{k-1}$. Then

$$
|A_P-R_n|\le\frac{C(b-a)^2}{2n}
$$

follows from finite-coefficient identities. Specifically, for a monomial of degree $k\ge1$, factor as

$$
\frac{y^{k+1}-x^{k+1}}{k+1}-(y-x)x^k
=\frac{y-x}{k+1}\sum_{r=0}^{k}(y^{k-r}x^r-x^k)
$$

If $|x|,|y|\le R$, the absolute value of each difference is at most $(k-r)R^{k-1}|y-x|$, so the absolute value of the entire right-hand side is at most $kR^{k-1}|y-x|^2/2$. Multiplying by the coefficients, taking the finite sum, and using a telescoping sum over n subintervals yields the stated estimate. This proof does not use an existence theorem for the classical integral.

This estimate allows a finite choice of n for a positive rational error η: if $C=0$, every n is exact; if $C>0$, choose $n>C(b-a)^2/(2\eta)$. The formal antiderivative and the area-approximation procedure can thus be connected by error evidence. The guaranteed choice of n here is at rational precision; we do not assert that the same rectangle sums converge at full Fε precision.

## 10. The Scope of Treating Proof as Processing

### 10.1 Computation Traces for Individual Calculations

When β-reduction of a closed input is used as evidence, retain the original term, the definitions used, every rule name and application position, and the term at each step as a computation trace. For a β-step, the checker verifies that the adjacent terms agree with capture-avoiding substitution at the specified position. Expansion of named definitions is recorded as a δ-rule distinct from the core β-rule. It is not necessary to expand all definitions first: δ and β may be interleaved according to the chosen strategy. A claim that the final term is a normal form also requires checking that no subterm remains to be processed by either rule.

When accelerated host-language calculations of polynomial gcds or rational numbers are used, their outputs alone are not called β-reduction logs. We state whether a result comes from execution in pure λ-calculus, exact host-language arithmetic, a written general proof, or equational-proof checking.

### 10.2 Finite Data for General Proofs

Associativity of addition, for example, cannot be proved by trying finitely many natural numbers. The induction proof in Section 3 contains equation transformations for the zero case and for an arbitrary induction variable. These two parts, together with the application of the induction rule, are made into finite data.

The included equational-proof checker is a small checker that verifies terms with data types, recursive definitions, previously checked lemmas, assumptions, and applications of induction steps. It operates under a rule system distinct from that of the untyped λ-calculus β-reducer. Without calling them the same system, we place both under the common policy of “making finite symbolic processing into evidence that can be rechecked.”

### 10.3 Trust Boundaries

Saving a finite log alone does not guarantee that the log is correct. At least the following must be distinguished.

- The formation rules, recursion equations, and inference rules permitted in the proof.
- The checker that judges applications of those rules.
- The language implementation and computer that execute the checker.
- The data to be proved and the checking results actually saved.

This version publishes the rules and checker code, and checks the rejection of invalid proofs as well as the acceptance of valid ones. This does not amount to establishing the checker's correctness using only that same checker. Rechecking with another implementation, porting the checker to λ-calculus, and formally verifying the implementation remain future tasks.

### 10.4 The Implementation Scope of v8 and Exact Arithmetic

The implementation described in the [interpreter v8 specification](../interpreter/README.md) handles λ syntax, a fixed snapshot of named definitions, δ-expansion, leftmost-outermost β-reduction, and JSON saving, loading, and rechecking of finite computation traces. Internally, the distance to a binding site is represented by an index, while free-variable names are retained. The starting point for this approach is de Bruijn's original paper. [de Bruijn, 1972](https://automath.win.tue.nl/archive/pdf/aut029.pdf)

In addition to Church natural numbers, Booleans, and pairs, the v8.0.1 HTML adds λ-definitions for integers represented by sign and magnitude and for unreduced fraction representations formed from integer pairs. Integer zero is normalized to the positive side. The conversions to and from the earlier manuscript's “difference of two natural numbers” are made explicit as `ZFromDiff` and `ZToDiff`; the present integer representation is not replaced by difference pairs.

The auxiliary fraction type is called $\mathsf{QRep}$. It is a pair of integers whose denominator is positive and nonzero, but unreduced representations are allowed. For example, $1/2$ and $2/4$ have distinct QRep syntax but compare as equal by cross products. Since $\mathsf Q$ in Section 5 is a reduced normal representation, these two types are not treated as having the same formation conditions. The map $\operatorname{norm}:\mathsf{QRep}\to\mathsf Q$ is the rational normalization from Section 5. By representation invariance of the fraction formulas, normalizing the value of each QRep operation gives the result of the corresponding Q operation. This correspondence uses the written proof in Section 5.

QRep addition, subtraction, multiplication, and comparison are λ-definitions for inputs satisfying the type conditions. The construction procedure `QMake`, reciprocal, and division return a result representation distinguishing a successful value from a zero-denominator error. This branch preserves the type's formation conditions; it does not assign a numerical value to division by zero. We do not claim that the HTML implements gcd and reduction to lowest terms in λ-calculus, all operations on M and Fε, surface notation for # and ♭, or checking of general induction proofs. Definitions, finite execution traces, and input conditions are given in [connecting λ integer and fraction arithmetic](../research/lambda-arithmetic-v1.5.4.md).

Expanding all definitions first can inflate even unneeded parts of expressions such as fractions. v8.0.1 selects the leftmost-outermost operation across δ and β together and records the strategy name `leftmost-outermost-interleaved` in the trace. Rechecking distinguishes its version and strategy from the δ-first traces of v8.0.0. An improvement in evaluation order does not imply that arbitrary λ-terms terminate.

Concrete calculations for rational arithmetic, generators, intervals, and polynomials are implemented by [exact arithmetic for applications](../verification/applications.mjs); the four arithmetic operations on Fε, polynomial gcd, comparison, and the standard part of finite elements are implemented by [exact arithmetic for the formal field](../verification/formal-field.mjs). These are finite arithmetic calculations using JavaScript and BigInt, with evidence formats distinct from β-reduction. The interval-generating label extensions also implement known rules and local traces for finite examples; they are not a checker certifying universal specifications for arbitrary programs.

In the formal-field code, `embedL(k,a)` embeds an element of the comparison structure L into $(a+k\varepsilon)/1$. The old API name `embedM` remains solely as a compatibility name for the same function, and the operation name `embedM` in existing computation traces also follows the v1.5.0 format. The operation constructing the present M itself is `poly` for finite coefficient sequences; these names must not be confused.

Each implementation has resource bounds on input length, number of steps, depth, and so on. We distinguish “termination for any finite request” as a property of a mathematical procedure from the range accepted by the distributed code within its resource bounds. Furthermore, actual browser-screen interaction has not been fully checked in this version; the execution record documents the checks performed on the HTML computation core and UI-script syntax as code.

### 10.5 Short Traces under Assumptions and Conditions for Changing Computation Models

For algebraic and categorical laws, finite equation transformations can also be recorded without substituting numerical values. For example, under the laws of an additive group, for arbitrary c and u,

$$
(c+u)+(-u)=c+(u+(-u))=c+0=c
$$

consists of three transformations. Associativity, the inverse law, and the identity law are recorded together with application positions and substitutions for the variables. This is a general proposition under the additive-group laws, rather than a few numerical examples. For $c+u=d+u$, adding $-u$ to both sides and applying this equation yields cancellation, $c=d$. It applies to addition on the integers, rational numbers, Fε, and other structures constructed here.

For a categorical example, if arrows $f:A\to B$ and $g,h:B\to A$ satisfy $g\circ f=1_A$ and $f\circ h=1_B$, then

$$
g=g\circ1_B=g\circ(f\circ h)=(g\circ f)\circ h
=1_A\circ h=h
$$

The five transformations can be accompanied by their justifications: identity, the inverse-arrow assumption, associativity, the inverse-arrow assumption, and identity. Here A and B are readable names for boundaries; in arrow-only notation, the identity arrows $1_A,1_B$ check that each composition is compatible. Nonempty histories in the free category of histories from §9.1 need not have inverse arrows. This proof is conditional on the inverse-arrow assumptions and applies to any category satisfying them.

Outside λ-calculus as well, a trace of each transition can be retained whenever states and one-step rules have finite descriptions. Correspondences between execution models must, however, specify input encoding, initial states, simulation of each step or a finite block of steps, halting states, output reading, and, where necessary, resource relationships. Obtaining the same answer once does not prove mutual translation of all programs or equal efficiency.

The concrete example in this version uses three natural-number registers for addition. It preserves one input n, increments a counting register c from zero to n, and increments the other input m the same number of times. It uses six instructions involving zero-setting, successor, equality branching, and halting. Fourteen transitions are recorded from the initial state $(2,3,0)$ to the final state $(5,3,3)$ at the halt instruction, and five is read from the first register.

For general m and n, the loop-entry invariant is $R_0=m+c$, $R_1=n$, $R_2=c$, and $c\le n$. One iteration increments c and $R_0$ by one each, decreasing the number of remaining iterations $n-c$ by one. Since the machine halts at the branch where c=n, structural induction shows that the final output is m+n. This written guarantee for all inputs is distinguished from checking local transitions for the saved concrete inputs. The state that reaches the halt instruction is saved, but no fictitious additional transition after it is counted.

The specifications, traces, and rejection conditions for the short proofs under assumptions and the register transitions are collected in the [computation-trace extensions](../research/trace-extensions-v1.5.4.md). They are checked as an evidence format distinct from the existing 16 propositions for Nat and Seq; categorical assumptions and register-instruction specifications are not left as hidden premises.

## 11. Claims Refuted by Counterexamples and Unresolved Questions

Under this version's definitions, closure under the four arithmetic operations for ratios of linear expressions from L is refuted by Proposition 7.2, and inclusion of $\sqrt2$ among the finite rational-expression numbers is refuted by Proposition 8.5. A total standard-part operation compatible with multiplication is also refuted by the counterexample in §8.5. Identifying all rates while preserving pointwise addition and additive cancellation yet retaining nonzeroness is likewise incompatible with the calculation in §6.2. These claims are not left as merely unproved conjectures.

The following specifications or proofs, on the other hand, remain unresolved research questions.

1. Which equivalence relation, retaining which aspects of a generator's direction, rate, syntax, and history, is suitable for the intended operations on relation operators?
2. Through what maps should sequence-generating labels corresponding to the original “rational limit” and one-step relation operators be related to the number types already constructed?
3. Which error contracts should extend the square-root and alternating-sum interval-generating labels guaranteed in this version to other concrete procedures, such as exponential functions?
4. For which restricted classes of generators can equality and order be decided?
5. How should upper and lower generation processes for alternating series be connected to information about relation operator adjacency restricted to L? They cannot be the same element of L while their rational components at finite values differ. Adjacency is not required over all of M.
6. Under what conditions can finite termination and error evidence be extended to series other than monotone alternating sums, continued fractions, and analytic functions?

When new representations, observational equivalences, or operation contracts are added for study, renaming alone does not resolve these questions. Both finite processing for individual examples and general guarantees must be described.

## 12. Principal Results and Proof Status

| Result | Basis in the text | Proof status in this version |
|---|---|---|
| Correspondence between constructor representations and Church operations | Proposition 2.1 | Written proof by structural induction. No machine proof is included |
| Reversible encoding of finite data, programs, propositions, and proof trees into the basic symbols | Proposition 2.2; concept-symbol-sequence materials | Written induction proof on finite trees. Individual encodings and decodings are checked separately |
| One-to-one correspondence between the intermediate pair notation and f-only notation | Proposition 2.3; appendix | Written proof by unique reading of child boundaries and structural induction. String conversion and restoration are checked separately |
| Semiring laws for natural-number addition and multiplication | Theorems 3.2–3.4 | Written induction proofs. General propositions checked using finite proof data |
| Zero normalization and ring laws for integers | Lemma 4.1; Theorem 4.2 | Written proofs by components and signs |
| Uniqueness of rational normalization and the ordered field | Theorems 5.1–5.2; §5.4 | Written proofs using the Euclidean procedure and cross products |
| The finite error contract of qlim | Proposition 6.1 | Written proof using rational inequalities |
| The ordered additive group L (formerly M), used for comparison | Theorem 7.1 | Componentwise proof |
| Failure of closure for ratios of linear expressions from L | Proposition 7.2 | Definitive counterexample by coefficient comparison. It does not apply to the new M/M |
| The commutative ring of M-polynomials and absence of zero divisors | §8.1 | Written proof by finite coefficient calculations |
| The field, normalization, and order of finite rational-expression numbers | Theorems 8.1–8.3 | General laws have written proofs. Operations on concrete inputs and rechecking of evidence are implemented in JavaScript |
| Conditional minimality of the part generated by the four arithmetic operations while preserving addition and order on L | Theorem 8.8 | Written proof by sign estimates for finite polynomials and structural induction on finite expressions |
| The standard part of finite elements | Theorem 8.4 | General laws have written proofs. Testing membership in the finite part and concrete standard-part calculations are implemented |
| No element of Fε has square two | Proposition 8.5 | Written proof using degrees, coefficients, and coprimeness |
| Field laws for generative complex numbers | Theorem 8.6 | Written proof by component calculations. No dedicated arithmetic API is included. Encoding and decoding of values are implemented |
| Division-ring laws for generative quaternions | Theorem 8.7 | Written proof using matrix components and the norm. No machine proof of the general laws is included |
| The arrow-only category of computation traces | §9.1; application research notes | Written proof of boundary conditions and checking of general proof data for finite-sequence concatenation laws |
| Responses of the √2 and Π interval-generating labels | §9.3–9.4; application research notes | General proofs of invariants and widths; finite examples checked by exact arithmetic |
| Polynomial differentiation, error guarantees, and formal integration | §9.5; application research notes | General proofs by coefficients and finite factorization |
| Translation of generative labels and a category with inverse arrows | §9.1; trace-extension materials | Written proof using integer addition and preservation of rational interval widths |
| Interval arithmetic and reciprocals with separation evidence | Proposition 9.1; application research notes | General guarantees have written proofs. Local traces of finite responses are checked for known label rules |
| General alternating sums, Newton comparison, and conversion of sequences with a modulus of error into intervals | Theorems 9.2–9.4 | General guarantees have written proofs. Concrete requests for the included rules are checked by exact arithmetic |
| Full Fε precision, its difference from rational precision, reciprocal difference quotients, and rectangle-sum errors | §9.9 | Written proofs using ordered-field calculations and finite-coefficient factorization |
| λ arithmetic for signed integers and unreduced fractions | §10.4; λ-arithmetic materials | Type premises and the connection to normalization are explicit. δ- and β-traces for the included closed inputs are checked |
| An equation for additive-group cancellation and agreement of left and right inverse arrows | §10.5; trace-extension materials | Three-step and five-step equational traces containing variables are checked under specified structural laws and explicit assumptions |
| Register-machine addition | §10.5; trace-extension materials | The guarantee for arbitrary inputs is a written proof using an invariant and a decreasing termination measure. All transitions for concrete inputs are rechecked |

“Written proof” means that the reasoning is stated in the text, not that every step has been entered into a formal checker. Results of tests on finite examples do not enlarge the scope of what is described as machine-verified general theorems.

The [general-equation checking report](../verification/equational-report.json) records 16 propositions and 79 rewrites. The 13 natural-number propositions concern left zero, left successor, commutativity, associativity, and four-term interchange for addition, and left zero, right identity, left successor, commutativity, left identity, left and right distributivity, and associativity for multiplication. The remaining three propositions are left identity, right identity, and associativity of finite-sequence concatenation; their proof IDs are path.append.leftunit, path.append.rightunit, and path.append.associative, respectively. Trusted recursive definitions themselves, such as right zero for natural numbers, are distinguished from propositions proved from them.

These machine proofs concern the free constructor types Nat and Seq. The 16 propositions do not check the general laws from integers onward, the correspondence with Church representations, compatibility of history endpoints, or universally quantified error theorems for analytic generators. The [checking report for saved individual evidence](../verification/evidence-report.json) records traces for λ-calculus, applications including qlim, Fε, and the newly added generative labels and computation models separately by rule system. The new short equational traces likewise check derivations from declared structural laws and assumptions. Their checking does not establish the structural laws themselves without premises.

The latest results, combining the equational checker, λ core, applications, and formal field from v1.5.0 with the concept-symbol sequences, f-only notation, and the present λ arithmetic, interval-generating labels, and computation-model checks, are recorded in the [implementation checking report](../verification/verification-report.json). These are checks of implementation regression behavior, rejection behavior, and concrete examples; their count does not mean that the same number of new general mathematical theorems have been proved.

The associated executable materials are the [λ-calculus interpreter v8.0.1](../interpreter/lambda_interpreter_v8.0.1.html), [equational-proof checker](../verification/equational-checker.mjs), [finite proof data](../verification/certificates/nat-and-paths.json), [application research notes](../research/applications-v1.5.4.md), [computation-trace extensions](../research/trace-extensions-v1.5.4.md), and [connecting λ integer and fraction arithmetic](../research/lambda-arithmetic-v1.5.4.md). See the repository's checking records for the test status of each implementation.

### 12.1 Ideas Recovered from the Separate v1.4.1 Manuscript and the Scope Preserved Here

| Idea recovered from the separate manuscript | Scope adopted in this version | Distinction retained |
|---|---|---|
| Minimality of the rational-coefficient part | Theorem 8.8, conditional on preserving addition and order on L and the operations on Q | Not presented as the unique interpretation of the original proposal |
| Interval processes accompanied by evidence | The four components of a generative label and reciprocals with separation evidence | Written general guarantees are distinguished from machine-checked local traces |
| Alternating sums, Newton's method, and sequences with a modulus of error | Theorems on finite interval responses and response compatibility | No formation of a coefficient field A or A(t), or Val operation returning a designated value, is introduced |
| The distinction between rational precision and full precision | The counterexamples and explicit error guarantees of §9.9 | Equality in Fε is not determined solely by rational approximation |
| Short algebraic and categorical traces and register calculations | Checking in separate small rule systems | Individual model correspondences are distinguished from translation theorems for whole languages |
| Integers as differences and a λ-fraction library | Conversion to sign and magnitude, and the QRep auxiliary type | The present formation conditions of Z, reduced Q, and M-polynomials are preserved |

After these ideas are recovered, the text still starts from finite f syntax and the stated operation and inference rules. The fixed arithmetic theory or translation into set theory adopted by the separate manuscript is not added as an internal premise necessary for proof acceptance. The main line remains the passage between the appendix's f notation and the exposition in the main text, while the range of concretely available operations and guarantees is enlarged.

## 13. Tasks for the Next Version

First, the written proofs for integers, rational numbers, and polynomials should be transferred to finite proof data in small lemmas. In parallel, the format for independently rechecking the interpreter's substitution, environment expansion, and output logs should be developed. If all mathematical-library processing is moved to pure λ-calculus, the correspondence must be checked not only for results but also for type-formation conditions and grounds for termination.

A research question specific to the original proposal is deciding what information should be retained about generation processes. Which operations hold depends on which of finite-stage values, direction, rate, generation rules, and computation histories are preserved under equality. If a map connecting the generators in Section 6 to the relation operator model in Section 7 is supplied, the operations it preserves must be proved one by one.

For applications, the general proofs given in this version for interval arithmetic, reciprocals with separation evidence, alternating sums, Newton comparison, and conversion from a modulus of error should be transferred into machine-checkable finite proof data. Before expanding toward acceptance of arbitrary unknown programs, the specifications of labels combining known rules and the guarantees for precision allocation should be made checkable one by one. Deciding response compatibility and order in restricted representation classes is also a task. We retain the policy of concretely extending the available representations and processing; obtaining completeness or recovering all real numbers at once is not made a condition of progress.

## References and Relationships between Versions

- Yuta Kimura, `1-new-number-composition-Japanese.txt`, first published August 11, 2025. Primary source for the author's intent and original proposal.
- Yuta Kimura, `memo_01.txt`. Includes unresolved proposals on recursion, continued fractions, and alternating series.
- `A_New_Foundation_of_Mathematics_ja_01_v2.md`, `A_New_Foundation_of_Mathematics_ja_02_v2.md`, `A_New_Foundation_of_Mathematics_ja_03_v2.md`, `A_New_Foundation_of_Mathematics_ja_04_v2.md`, `A_New_Foundation_of_Mathematics_ja_05_v2.md`, `A_New_Foundation_of_Mathematics_ja_06_v2.md`, and `A_New_Foundation_of_Mathematics_ja_07_v2.md`. Materials examined and reconstructed in this version; their claims are not used as verified premises.
- `lambda_interpreter_v6_M-CR.html`. The implementation used for comparison.
- `Generative_Reals_ja_v1.4.1.md`. A comparison manuscript adopting a different construction policy. Ideas for finite constructions and proofs are recovered within the scope of §12.1, without adopting its foundational theory, coefficient field, and definitions of equality wholesale.
- Peter Selinger, [*Lecture Notes on the Lambda Calculus*, v2](https://arxiv.org/html/0804.3434v2), 2013. Reference for λ syntax, capture-avoiding substitution, and the distinction between β-reduction and β-equivalence. Accessed September 13, 2026.
- N. G. de Bruijn, [*Lambda calculus notation with nameless dummies, a tool for automatic formula manipulation, with application to the Church–Rosser theorem*](https://automath.win.tue.nl/archive/pdf/aut029.pdf), Indagationes Mathematicae 34 (1972), 381–392. Primary source for representing bindings by indices. Accessed September 13, 2026.
- Samuel Eilenberg and Saunders Mac Lane, [*General Theory of Natural Equivalences*](https://people.math.osu.edu/cogdell.1/6112-Eilenberg%26MacLane-www.pdf), Transactions of the American Mathematical Society 58 (1945), 231–294, especially p.238. Context for descriptions using arrows and identity arrows. Accessed September 13, 2026.
- [Source audit v1.5.4](../research/source-audit-v1.5.4.md) and [application research notes v1.5.4](../research/applications-v1.5.4.md). Details of the differences from the original proposal and the extensions.

This version's comparisons with existing theories explain the placement of its definitions. Its internal operations and the written proofs above are based on the finite constructions and inference rules listed in the text.
