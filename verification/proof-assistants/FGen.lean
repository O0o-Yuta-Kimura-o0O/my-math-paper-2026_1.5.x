/-
  A small port of the f-generative system to Lean 4.
  It contains the f-trees, the natural numbers and finite sequences,
  the six trusted rules and the sixteen propositions of Section 10.2,
  the cases of Theorem 10.4 (uniqueness of values fixed by rules) for
  addition, multiplication and concatenation,
  the round trip of encoding natural numbers as chains of f,
  and binary numerals whose addition follows the rules of addition
  (Proposition 10.6).
  No library is imported beyond Lean's built-in prelude, and no axiom is used.
-/
namespace FGen

/-- Finite trees built from f alone: `F.f []` is f(), `F.f [t]` is f(t). -/
inductive F where
  | f : List F -> F

/-- Natural numbers: the free constructor type Nat. -/
inductive N where
  | Z : N
  | S : N -> N

open N

/-- Encode a natural number as a chain of f. -/
def enc : N -> F
  | Z => F.f []
  | S n => F.f [enc n]

/-- Decode a chain of f. A tree that is not a chain gives `none`. -/
def dec : F -> Option N
  | F.f [] => some Z
  | F.f [t] => Option.map S (dec t)
  | F.f (_ :: _ :: _) => none

/-- Rules add.zero and add.succ. -/
def add : N -> N -> N
  | x, Z => x
  | x, S y => S (add x y)

/-- Rules mul.zero and mul.succ. -/
def mul : N -> N -> N
  | _, Z => Z
  | x, S y => add (mul x y) x

/-- Finite sequences whose entries have the type E of events. -/
inductive Seq (E : Type) where
  | Nil : Seq E
  | Cons : E -> Seq E -> Seq E

/-- Rules append.nil and append.cons. -/
def append {E : Type} : Seq E -> Seq E -> Seq E
  | .Nil, u => u
  | .Cons h t, u => .Cons h (append t u)

/- The sixteen propositions. -/

theorem add_leftzero : forall n : N, add Z n = n
  | Z => rfl
  | S k => congrArg S (add_leftzero k)

theorem add_leftsucc (x : N) : forall y : N, add (S x) y = S (add x y)
  | Z => rfl
  | S k => congrArg S (add_leftsucc x k)

theorem add_commutative (x : N) : forall y : N, add x y = add y x
  | Z => (add_leftzero x).symm
  | S k => (congrArg S (add_commutative x k)).trans (add_leftsucc k x).symm

theorem add_associative (x y : N) : forall z : N, add (add x y) z = add x (add y z)
  | Z => rfl
  | S k => congrArg S (add_associative x y k)

theorem add_interchange (a b c d : N) :
    add (add a b) (add c d) = add (add a c) (add b d) :=
  calc add (add a b) (add c d)
      = add a (add b (add c d)) := add_associative a b (add c d)
    _ = add a (add (add b c) d) := congrArg (add a) (add_associative b c d).symm
    _ = add a (add (add c b) d) := congrArg (fun t => add a (add t d)) (add_commutative b c)
    _ = add a (add c (add b d)) := congrArg (add a) (add_associative c b d)
    _ = add (add a c) (add b d) := (add_associative a c (add b d)).symm

theorem mul_leftzero : forall n : N, mul Z n = Z
  | Z => rfl
  | S k => mul_leftzero k

theorem mul_rightone (x : N) : mul x (S Z) = x := add_leftzero x

theorem mul_leftsucc (x : N) : forall y : N, mul (S x) y = add (mul x y) y
  | Z => rfl
  | S k => congrArg S <|
    calc add (mul (S x) k) x
        = add (add (mul x k) k) x := congrArg (fun t => add t x) (mul_leftsucc x k)
      _ = add (mul x k) (add k x) := add_associative (mul x k) k x
      _ = add (mul x k) (add x k) := congrArg (add (mul x k)) (add_commutative k x)
      _ = add (add (mul x k) x) k := (add_associative (mul x k) x k).symm

theorem mul_commutative (x : N) : forall y : N, mul x y = mul y x
  | Z => (mul_leftzero x).symm
  | S k => (congrArg (fun t => add t x) (mul_commutative x k)).trans (mul_leftsucc k x).symm

theorem mul_leftone (x : N) : mul (S Z) x = x :=
  (mul_commutative (S Z) x).trans (mul_rightone x)

theorem mul_distributive_first (x y : N) :
    forall z : N, mul (add x y) z = add (mul x z) (mul y z)
  | Z => rfl
  | S k => (congrArg (fun t => add t (add x y)) (mul_distributive_first x y k)).trans
      (add_interchange (mul x k) (mul y k) x y)

theorem mul_distributive_second (x y z : N) :
    mul x (add y z) = add (mul x y) (mul x z) :=
  calc mul x (add y z)
      = mul (add y z) x := mul_commutative x (add y z)
    _ = add (mul y x) (mul z x) := mul_distributive_first y z x
    _ = add (mul x y) (mul z x) := congrArg (fun t => add t (mul z x)) (mul_commutative y x)
    _ = add (mul x y) (mul x z) := congrArg (add (mul x y)) (mul_commutative z x)

theorem mul_associative (x y : N) : forall z : N, mul (mul x y) z = mul x (mul y z)
  | Z => rfl
  | S k => (congrArg (fun t => add t (mul x y)) (mul_associative x y k)).trans
      (mul_distributive_second x (mul y k) y).symm

theorem append_leftunit {E : Type} (u : Seq E) : append .Nil u = u := rfl

theorem append_rightunit {E : Type} : forall u : Seq E, append u .Nil = u
  | .Nil => rfl
  | .Cons h t => congrArg (Seq.Cons h) (append_rightunit t)

theorem append_associative {E : Type} :
    forall u v w : Seq E, append (append u v) w = append u (append v w)
  | .Nil, _, _ => rfl
  | .Cons h t, v, w => congrArg (Seq.Cons h) (append_associative t v w)

/- Theorem 10.4 for addition, multiplication and concatenation:
   two functions that satisfy the same rules agree on every input. -/

theorem add_unique (g h : N -> N -> N)
    (g0 : forall x, g x Z = x) (gS : forall x y, g x (S y) = S (g x y))
    (h0 : forall x, h x Z = x) (hS : forall x y, h x (S y) = S (h x y)) :
    forall x y, g x y = h x y
  | x, Z => (g0 x).trans (h0 x).symm
  | x, S k => (gS x k).trans
      ((congrArg S (add_unique g h g0 gS h0 hS x k)).trans (hS x k).symm)

theorem mul_unique (g h : N -> N -> N)
    (g0 : forall x, g x Z = Z) (gS : forall x y, g x (S y) = add (g x y) x)
    (h0 : forall x, h x Z = Z) (hS : forall x y, h x (S y) = add (h x y) x) :
    forall x y, g x y = h x y
  | x, Z => (g0 x).trans (h0 x).symm
  | x, S k => (gS x k).trans
      ((congrArg (fun t => add t x) (mul_unique g h g0 gS h0 hS x k)).trans (hS x k).symm)

theorem append_unique {E : Type} (g h : Seq E -> Seq E -> Seq E)
    (g0 : forall u, g .Nil u = u) (gC : forall a t u, g (.Cons a t) u = .Cons a (g t u))
    (h0 : forall u, h .Nil u = u) (hC : forall a t u, h (.Cons a t) u = .Cons a (h t u)) :
    forall t u, g t u = h t u
  | .Nil, u => (g0 u).trans (h0 u).symm
  | .Cons a t, u => (gC a t u).trans
      ((congrArg (Seq.Cons a) (append_unique g h g0 gC h0 hC t u)).trans (hC a t u).symm)

/-- `add` itself satisfies its rules by computation, so any function satisfying them is `add`. -/
theorem add_is_determined (g : N -> N -> N)
    (g0 : forall x, g x Z = x) (gS : forall x y, g x (S y) = S (g x y)) :
    forall x y, g x y = add x y :=
  add_unique g add g0 gS (fun _ => rfl) (fun _ _ => rfl)

/- Encoding into f-trees and computation. -/

theorem dec_enc : forall n : N, dec (enc n) = some n
  | Z => rfl
  | S k => congrArg (Option.map S) (dec_enc k)

example : add (S (S Z)) (S (S (S Z))) = S (S (S (S (S Z)))) := rfl
example : dec (F.f [F.f [F.f []]]) = some (S (S Z)) := rfl
example : dec (F.f [F.f [], F.f []]) = none := rfl

/- Binary numerals: addition computed in another representation (Proposition 10.6). -/

/-- `bz` is the empty numeral; `b0 w` and `b1 w` append the digits 0 and 1 to `w`. -/
inductive Bin where
  | bz : Bin
  | b0 : Bin -> Bin
  | b1 : Bin -> Bin

open Bin

/-- Decode a binary numeral into a chain: w0 is w + w, and w1 is S (w + w). -/
def decB : Bin -> N
  | bz => Z
  | b0 w => add (decB w) (decB w)
  | b1 w => S (add (decB w) (decB w))

/-- Add one, with carrying. -/
def succB : Bin -> Bin
  | bz => b1 bz
  | b0 w => b1 w
  | b1 w => b0 (succB w)

/-- Add two numerals digit by digit; a carry is passed on by `succB`. -/
def addB : Bin -> Bin -> Bin
  | bz, w => w
  | b0 v, bz => b0 v
  | b1 v, bz => b1 v
  | b0 v, b0 w => b0 (addB v w)
  | b0 v, b1 w => b1 (addB v w)
  | b1 v, b0 w => b1 (addB v w)
  | b1 v, b1 w => b0 (succB (addB v w))

theorem decB_succB : forall w : Bin, decB (succB w) = S (decB w)
  | bz => rfl
  | b0 _ => rfl
  | b1 w => (congrArg (fun t => add t t) (decB_succB w)).trans
      (congrArg S (add_leftsucc (decB w) (decB w)))

/-- Proposition 10.6: decoding the binary sum gives the sum of the decoded values. -/
theorem decB_addB : forall v w : Bin, decB (addB v w) = add (decB v) (decB w)
  | bz, w => (add_leftzero (decB w)).symm
  | b0 _, bz => rfl
  | b1 _, bz => rfl
  | b0 v, b0 w => (congrArg (fun t => add t t) (decB_addB v w)).trans
      (add_interchange (decB v) (decB w) (decB v) (decB w))
  | b0 v, b1 w => congrArg S ((congrArg (fun t => add t t) (decB_addB v w)).trans
      (add_interchange (decB v) (decB w) (decB v) (decB w)))
  | b1 v, b0 w => (congrArg S ((congrArg (fun t => add t t) (decB_addB v w)).trans
      (add_interchange (decB v) (decB w) (decB v) (decB w)))).trans
      (add_leftsucc (add (decB v) (decB v)) (add (decB w) (decB w))).symm
  | b1 v, b1 w => (congrArg (fun t => add t t)
      ((decB_succB (addB v w)).trans (congrArg S (decB_addB v w)))).trans
      (congrArg S ((add_leftsucc (add (decB v) (decB w)) (add (decB v) (decB w))).trans
        ((congrArg S (add_interchange (decB v) (decB w) (decB v) (decB w))).trans
          (add_leftsucc (add (decB v) (decB v)) (add (decB w) (decB w))).symm)))

/-- Encode a chain as a binary numeral by adding one, n times. -/
def bin : N -> Bin
  | Z => bz
  | S n => succB (bin n)

theorem decB_bin : forall n : N, decB (bin n) = n
  | Z => rfl
  | S k => (decB_succB (bin k)).trans (congrArg S (decB_bin k))

/-- The binary model follows the rules of addition, so by `add_is_determined`
    (as in Corollary 10.5) it computes `add` on every input. -/
theorem addB_is_add : forall x y : N, decB (addB (bin x) (bin y)) = add x y :=
  add_is_determined (fun x y => decB (addB (bin x) (bin y)))
    (fun x => (decB_addB (bin x) bz).trans (decB_bin x))
    (fun x y => (decB_addB (bin x) (succB (bin y))).trans
      ((congrArg (add (decB (bin x))) (decB_succB (bin y))).trans
        (congrArg S (decB_addB (bin x) (bin y)).symm)))

example : addB (b0 (b1 bz)) (b1 (b1 bz)) = b1 (b0 (b1 bz)) := rfl
example : decB (b1 (b0 (b1 bz))) = S (S (S (S (S Z)))) := rfl

end FGen

#print axioms FGen.add_leftzero
#print axioms FGen.add_leftsucc
#print axioms FGen.add_commutative
#print axioms FGen.add_associative
#print axioms FGen.add_interchange
#print axioms FGen.mul_leftzero
#print axioms FGen.mul_rightone
#print axioms FGen.mul_leftsucc
#print axioms FGen.mul_commutative
#print axioms FGen.mul_leftone
#print axioms FGen.mul_distributive_first
#print axioms FGen.mul_distributive_second
#print axioms FGen.mul_associative
#print axioms FGen.append_leftunit
#print axioms FGen.append_rightunit
#print axioms FGen.append_associative
#print axioms FGen.add_unique
#print axioms FGen.mul_unique
#print axioms FGen.append_unique
#print axioms FGen.add_is_determined
#print axioms FGen.dec_enc
#print axioms FGen.decB_succB
#print axioms FGen.decB_addB
#print axioms FGen.decB_bin
#print axioms FGen.addB_is_add
