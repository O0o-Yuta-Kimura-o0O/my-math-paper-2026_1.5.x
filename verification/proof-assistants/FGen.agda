{-# OPTIONS --safe --without-K #-}
-- A small port of the f-generative system to Agda.
-- The contents are the same as FGen.lean: f-trees, the six trusted rules,
-- the sixteen propositions, the cases of Theorem 10.4 for addition,
-- multiplication and concatenation, the round trip of encoding, and binary
-- numerals whose addition follows the rules of addition (Proposition 10.6).
-- Only the built-in modules are used. The option --safe forbids postulates.

module FGen where

open import Agda.Builtin.Equality using (_≡_; refl)
open import Agda.Builtin.List using (List; []; _∷_)
open import Agda.Builtin.Maybe using (Maybe; just; nothing)

-- Finite trees built from f alone: f [] is f(), f (t ∷ []) is f(t).
data F : Set where
  f : List F -> F

-- Natural numbers: the free constructor type Nat.
data N : Set where
  Z : N
  S : N -> N

-- Encode a natural number as a chain of f.
enc : N -> F
enc Z = f []
enc (S n) = f (enc n ∷ [])

mapMaybe : {A B : Set} -> (A -> B) -> Maybe A -> Maybe B
mapMaybe g (just a) = just (g a)
mapMaybe g nothing = nothing

-- Decode a chain of f. A tree that is not a chain gives nothing.
dec : F -> Maybe N
dec (f []) = just Z
dec (f (t ∷ [])) = mapMaybe S (dec t)
dec (f (_ ∷ _ ∷ _)) = nothing

-- Rules add.zero and add.succ.
add : N -> N -> N
add x Z = x
add x (S y) = S (add x y)

-- Rules mul.zero and mul.succ.
mul : N -> N -> N
mul x Z = Z
mul x (S y) = add (mul x y) x

-- Finite sequences whose entries have the type E of events.
data Seq (E : Set) : Set where
  Nil : Seq E
  Cons : E -> Seq E -> Seq E

-- Rules append.nil and append.cons.
append : {E : Set} -> Seq E -> Seq E -> Seq E
append Nil u = u
append (Cons h t) u = Cons h (append t u)

-- Three facts about equality, proved here instead of imported.
cong : {A B : Set} (g : A -> B) {x y : A} -> x ≡ y -> g x ≡ g y
cong g refl = refl

sym : {A : Set} {x y : A} -> x ≡ y -> y ≡ x
sym refl = refl

trans : {A : Set} {x y z : A} -> x ≡ y -> y ≡ z -> x ≡ z
trans refl q = q

-- The sixteen propositions.

add-leftzero : (n : N) -> add Z n ≡ n
add-leftzero Z = refl
add-leftzero (S k) = cong S (add-leftzero k)

add-leftsucc : (x y : N) -> add (S x) y ≡ S (add x y)
add-leftsucc x Z = refl
add-leftsucc x (S k) = cong S (add-leftsucc x k)

add-commutative : (x y : N) -> add x y ≡ add y x
add-commutative x Z = sym (add-leftzero x)
add-commutative x (S k) = trans (cong S (add-commutative x k)) (sym (add-leftsucc k x))

add-associative : (x y z : N) -> add (add x y) z ≡ add x (add y z)
add-associative x y Z = refl
add-associative x y (S k) = cong S (add-associative x y k)

add-interchange : (a b c d : N) -> add (add a b) (add c d) ≡ add (add a c) (add b d)
add-interchange a b c d =
  trans (add-associative a b (add c d))
  (trans (cong (add a) (sym (add-associative b c d)))
  (trans (cong (\ t -> add a (add t d)) (add-commutative b c))
  (trans (cong (add a) (add-associative c b d))
         (sym (add-associative a c (add b d))))))

mul-leftzero : (n : N) -> mul Z n ≡ Z
mul-leftzero Z = refl
mul-leftzero (S k) = mul-leftzero k

mul-rightone : (x : N) -> mul x (S Z) ≡ x
mul-rightone x = add-leftzero x

mul-leftsucc : (x y : N) -> mul (S x) y ≡ add (mul x y) y
mul-leftsucc x Z = refl
mul-leftsucc x (S k) = cong S
  (trans (cong (\ t -> add t x) (mul-leftsucc x k))
  (trans (add-associative (mul x k) k x)
  (trans (cong (add (mul x k)) (add-commutative k x))
         (sym (add-associative (mul x k) x k)))))

mul-commutative : (x y : N) -> mul x y ≡ mul y x
mul-commutative x Z = sym (mul-leftzero x)
mul-commutative x (S k) =
  trans (cong (\ t -> add t x) (mul-commutative x k)) (sym (mul-leftsucc k x))

mul-leftone : (x : N) -> mul (S Z) x ≡ x
mul-leftone x = trans (mul-commutative (S Z) x) (mul-rightone x)

mul-distributive-first : (x y z : N) -> mul (add x y) z ≡ add (mul x z) (mul y z)
mul-distributive-first x y Z = refl
mul-distributive-first x y (S k) =
  trans (cong (\ t -> add t (add x y)) (mul-distributive-first x y k))
        (add-interchange (mul x k) (mul y k) x y)

mul-distributive-second : (x y z : N) -> mul x (add y z) ≡ add (mul x y) (mul x z)
mul-distributive-second x y z =
  trans (mul-commutative x (add y z))
  (trans (mul-distributive-first y z x)
  (trans (cong (\ t -> add t (mul z x)) (mul-commutative y x))
         (cong (add (mul x y)) (mul-commutative z x))))

mul-associative : (x y z : N) -> mul (mul x y) z ≡ mul x (mul y z)
mul-associative x y Z = refl
mul-associative x y (S k) =
  trans (cong (\ t -> add t (mul x y)) (mul-associative x y k))
        (sym (mul-distributive-second x (mul y k) y))

append-leftunit : {E : Set} (u : Seq E) -> append Nil u ≡ u
append-leftunit u = refl

append-rightunit : {E : Set} (u : Seq E) -> append u Nil ≡ u
append-rightunit Nil = refl
append-rightunit (Cons h t) = cong (Cons h) (append-rightunit t)

append-associative : {E : Set} (u v w : Seq E) ->
  append (append u v) w ≡ append u (append v w)
append-associative Nil v w = refl
append-associative (Cons h t) v w = cong (Cons h) (append-associative t v w)

-- Theorem 10.4 for addition, multiplication and concatenation:
-- two functions that satisfy the same rules agree on every input.

add-unique : (g h : N -> N -> N) ->
  ((x : N) -> g x Z ≡ x) -> ((x y : N) -> g x (S y) ≡ S (g x y)) ->
  ((x : N) -> h x Z ≡ x) -> ((x y : N) -> h x (S y) ≡ S (h x y)) ->
  (x y : N) -> g x y ≡ h x y
add-unique g h g0 gS h0 hS x Z = trans (g0 x) (sym (h0 x))
add-unique g h g0 gS h0 hS x (S k) =
  trans (gS x k) (trans (cong S (add-unique g h g0 gS h0 hS x k)) (sym (hS x k)))

mul-unique : (g h : N -> N -> N) ->
  ((x : N) -> g x Z ≡ Z) -> ((x y : N) -> g x (S y) ≡ add (g x y) x) ->
  ((x : N) -> h x Z ≡ Z) -> ((x y : N) -> h x (S y) ≡ add (h x y) x) ->
  (x y : N) -> g x y ≡ h x y
mul-unique g h g0 gS h0 hS x Z = trans (g0 x) (sym (h0 x))
mul-unique g h g0 gS h0 hS x (S k) =
  trans (gS x k)
  (trans (cong (\ t -> add t x) (mul-unique g h g0 gS h0 hS x k)) (sym (hS x k)))

append-unique : {E : Set} (g h : Seq E -> Seq E -> Seq E) ->
  ((u : Seq E) -> g Nil u ≡ u) ->
  ((a : E) (t u : Seq E) -> g (Cons a t) u ≡ Cons a (g t u)) ->
  ((u : Seq E) -> h Nil u ≡ u) ->
  ((a : E) (t u : Seq E) -> h (Cons a t) u ≡ Cons a (h t u)) ->
  (t u : Seq E) -> g t u ≡ h t u
append-unique g h g0 gC h0 hC Nil u = trans (g0 u) (sym (h0 u))
append-unique g h g0 gC h0 hC (Cons a t) u =
  trans (gC a t u)
  (trans (cong (Cons a) (append-unique g h g0 gC h0 hC t u)) (sym (hC a t u)))

-- add itself satisfies its rules by computation, so any function satisfying them is add.
add-is-determined : (g : N -> N -> N) ->
  ((x : N) -> g x Z ≡ x) -> ((x y : N) -> g x (S y) ≡ S (g x y)) ->
  (x y : N) -> g x y ≡ add x y
add-is-determined g g0 gS =
  add-unique g add g0 gS (\ x -> refl) (\ x y -> refl)

-- Encoding into f-trees and computation.

dec-enc : (n : N) -> dec (enc n) ≡ just n
dec-enc Z = refl
dec-enc (S k) = cong (mapMaybe S) (dec-enc k)

add-two-three : add (S (S Z)) (S (S (S Z))) ≡ S (S (S (S (S Z))))
add-two-three = refl

dec-two : dec (f (f (f [] ∷ []) ∷ [])) ≡ just (S (S Z))
dec-two = refl

dec-not-chain : dec (f (f [] ∷ f [] ∷ [])) ≡ nothing
dec-not-chain = refl

-- Binary numerals: addition computed in another representation (Proposition 10.6).
-- bz is the empty numeral; b0 w and b1 w append the digits 0 and 1 to w.
data Bin : Set where
  bz : Bin
  b0 : Bin -> Bin
  b1 : Bin -> Bin

-- Decode a binary numeral into a chain: w0 is w + w, and w1 is S (w + w).
decB : Bin -> N
decB bz = Z
decB (b0 w) = add (decB w) (decB w)
decB (b1 w) = S (add (decB w) (decB w))

-- Add one, with carrying.
succB : Bin -> Bin
succB bz = b1 bz
succB (b0 w) = b1 w
succB (b1 w) = b0 (succB w)

-- Add two numerals digit by digit; a carry is passed on by succB.
addB : Bin -> Bin -> Bin
addB bz w = w
addB (b0 v) bz = b0 v
addB (b1 v) bz = b1 v
addB (b0 v) (b0 w) = b0 (addB v w)
addB (b0 v) (b1 w) = b1 (addB v w)
addB (b1 v) (b0 w) = b1 (addB v w)
addB (b1 v) (b1 w) = b0 (succB (addB v w))

decB-succB : (w : Bin) -> decB (succB w) ≡ S (decB w)
decB-succB bz = refl
decB-succB (b0 w) = refl
decB-succB (b1 w) =
  trans (cong (\ t -> add t t) (decB-succB w)) (cong S (add-leftsucc (decB w) (decB w)))

-- Proposition 10.6: decoding the binary sum gives the sum of the decoded values.
decB-addB : (v w : Bin) -> decB (addB v w) ≡ add (decB v) (decB w)
decB-addB bz w = sym (add-leftzero (decB w))
decB-addB (b0 v) bz = refl
decB-addB (b1 v) bz = refl
decB-addB (b0 v) (b0 w) =
  trans (cong (\ t -> add t t) (decB-addB v w))
        (add-interchange (decB v) (decB w) (decB v) (decB w))
decB-addB (b0 v) (b1 w) =
  cong S (trans (cong (\ t -> add t t) (decB-addB v w))
                (add-interchange (decB v) (decB w) (decB v) (decB w)))
decB-addB (b1 v) (b0 w) =
  trans (cong S (trans (cong (\ t -> add t t) (decB-addB v w))
                       (add-interchange (decB v) (decB w) (decB v) (decB w))))
        (sym (add-leftsucc (add (decB v) (decB v)) (add (decB w) (decB w))))
decB-addB (b1 v) (b1 w) =
  trans (cong (\ t -> add t t) (trans (decB-succB (addB v w)) (cong S (decB-addB v w))))
  (cong S (trans (add-leftsucc (add (decB v) (decB w)) (add (decB v) (decB w)))
          (trans (cong S (add-interchange (decB v) (decB w) (decB v) (decB w)))
                 (sym (add-leftsucc (add (decB v) (decB v)) (add (decB w) (decB w)))))))

-- Encode a chain as a binary numeral by adding one, n times.
bin : N -> Bin
bin Z = bz
bin (S n) = succB (bin n)

decB-bin : (n : N) -> decB (bin n) ≡ n
decB-bin Z = refl
decB-bin (S k) = trans (decB-succB (bin k)) (cong S (decB-bin k))

-- The binary model follows the rules of addition, so by add-is-determined
-- (as in Corollary 10.5) it computes add on every input.
addB-is-add : (x y : N) -> decB (addB (bin x) (bin y)) ≡ add x y
addB-is-add = add-is-determined (\ x y -> decB (addB (bin x) (bin y)))
  (\ x -> trans (decB-addB (bin x) bz) (decB-bin x))
  (\ x y -> trans (decB-addB (bin x) (succB (bin y)))
            (trans (cong (add (decB (bin x))) (decB-succB (bin y)))
                   (cong S (sym (decB-addB (bin x) (bin y))))))

addB-two-three : addB (b0 (b1 bz)) (b1 (b1 bz)) ≡ b1 (b0 (b1 bz))
addB-two-three = refl

decB-five : decB (b1 (b0 (b1 bz))) ≡ S (S (S (S (S Z))))
decB-five = refl
