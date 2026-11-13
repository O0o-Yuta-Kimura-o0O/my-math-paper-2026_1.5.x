(* A small port of the f-generative system to Rocq (formerly Coq).
   The contents are the same as FGen.lean: f-trees, the six trusted rules,
   the sixteen propositions, the cases of Theorem 10.4 for addition,
   multiplication and concatenation, the round trip of encoding, and binary
   numerals whose addition follows the rules of addition (Proposition 10.6).
   Only the prelude is used, and no axiom. *)

(* Lets Rocq build the induction principle of F, which is nested in list. *)
Scheme All for list.

(* Finite trees built from f alone: f nil is f(), f (cons t nil) is f(t). *)
Inductive F : Type := f : list F -> F.

(* Natural numbers: the free constructor type Nat. *)
Inductive N : Type := Z : N | S : N -> N.

(* Encode a natural number as a chain of f. *)
Fixpoint enc (n : N) : F :=
  match n with
  | Z => f nil
  | S m => f (cons (enc m) nil)
  end.

(* Decode a chain of f. A tree that is not a chain gives None. *)
Fixpoint dec (t : F) : option N :=
  match t with
  | f nil => Some Z
  | f (cons u nil) => option_map S (dec u)
  | f (cons _ (cons _ _)) => None
  end.

(* Rules add.zero and add.succ. *)
Fixpoint add (x y : N) : N :=
  match y with
  | Z => x
  | S y' => S (add x y')
  end.

(* Rules mul.zero and mul.succ. *)
Fixpoint mul (x y : N) : N :=
  match y with
  | Z => Z
  | S y' => add (mul x y') x
  end.

(* Finite sequences whose entries have the type E of events. *)
Inductive Seq (E : Type) : Type := Nil : Seq E | Cons : E -> Seq E -> Seq E.
Arguments Nil {E}.
Arguments Cons {E} _ _.

(* Rules append.nil and append.cons. *)
Fixpoint append {E : Type} (u v : Seq E) : Seq E :=
  match u with
  | Nil => v
  | Cons h t => Cons h (append t v)
  end.

(* The sixteen propositions. *)

Theorem add_leftzero : forall n, add Z n = n.
Proof. induction n as [|k IH]; simpl. reflexivity. rewrite IH. reflexivity. Qed.

Theorem add_leftsucc : forall x y, add (S x) y = S (add x y).
Proof. intros x y. induction y as [|k IH]; simpl. reflexivity. rewrite IH. reflexivity. Qed.

Theorem add_commutative : forall x y, add x y = add y x.
Proof.
  intros x y. induction y as [|k IH]; simpl.
  - rewrite add_leftzero. reflexivity.
  - rewrite IH, add_leftsucc. reflexivity.
Qed.

Theorem add_associative : forall x y z, add (add x y) z = add x (add y z).
Proof. intros x y z. induction z as [|k IH]; simpl. reflexivity. rewrite IH. reflexivity. Qed.

Theorem add_interchange : forall a b c d,
  add (add a b) (add c d) = add (add a c) (add b d).
Proof.
  intros a b c d.
  rewrite (add_associative a b (add c d)), <- (add_associative b c d),
    (add_commutative b c), (add_associative c b d), <- (add_associative a c (add b d)).
  reflexivity.
Qed.

Theorem mul_leftzero : forall n, mul Z n = Z.
Proof. induction n as [|k IH]; simpl. reflexivity. exact IH. Qed.

Theorem mul_rightone : forall x, mul x (S Z) = x.
Proof. intro x. simpl. apply add_leftzero. Qed.

Theorem mul_leftsucc : forall x y, mul (S x) y = add (mul x y) y.
Proof.
  intros x y. induction y as [|k IH]; simpl.
  - reflexivity.
  - rewrite IH, (add_associative (mul x k) k x), (add_commutative k x),
      <- (add_associative (mul x k) x k).
    reflexivity.
Qed.

Theorem mul_commutative : forall x y, mul x y = mul y x.
Proof.
  intros x y. induction y as [|k IH]; simpl.
  - rewrite mul_leftzero. reflexivity.
  - rewrite IH, mul_leftsucc. reflexivity.
Qed.

Theorem mul_leftone : forall x, mul (S Z) x = x.
Proof. intro x. rewrite (mul_commutative (S Z) x). apply mul_rightone. Qed.

Theorem mul_distributive_first : forall x y z,
  mul (add x y) z = add (mul x z) (mul y z).
Proof.
  intros x y z. induction z as [|k IH]; simpl.
  - reflexivity.
  - rewrite IH. apply add_interchange.
Qed.

Theorem mul_distributive_second : forall x y z,
  mul x (add y z) = add (mul x y) (mul x z).
Proof.
  intros x y z.
  rewrite (mul_commutative x (add y z)), (mul_distributive_first y z x),
    (mul_commutative y x), (mul_commutative z x).
  reflexivity.
Qed.

Theorem mul_associative : forall x y z, mul (mul x y) z = mul x (mul y z).
Proof.
  intros x y z. induction z as [|k IH]; simpl.
  - reflexivity.
  - rewrite IH, (mul_distributive_second x (mul y k) y). reflexivity.
Qed.

Theorem append_leftunit : forall (E : Type) (u : Seq E), append Nil u = u.
Proof. reflexivity. Qed.

Theorem append_rightunit : forall (E : Type) (u : Seq E), append u Nil = u.
Proof. intros E u. induction u as [|h t IH]; simpl. reflexivity. rewrite IH. reflexivity. Qed.

Theorem append_associative : forall (E : Type) (u v w : Seq E),
  append (append u v) w = append u (append v w).
Proof. intros E u v w. induction u as [|h t IH]; simpl. reflexivity. rewrite IH. reflexivity. Qed.

(* Theorem 10.4 for addition, multiplication and concatenation:
   two functions that satisfy the same rules agree on every input. *)

Theorem add_unique : forall g h : N -> N -> N,
  (forall x, g x Z = x) -> (forall x y, g x (S y) = S (g x y)) ->
  (forall x, h x Z = x) -> (forall x y, h x (S y) = S (h x y)) ->
  forall x y, g x y = h x y.
Proof.
  intros g h g0 gS h0 hS x y. induction y as [|k IH].
  - rewrite g0, h0. reflexivity.
  - rewrite gS, hS, IH. reflexivity.
Qed.

Theorem mul_unique : forall g h : N -> N -> N,
  (forall x, g x Z = Z) -> (forall x y, g x (S y) = add (g x y) x) ->
  (forall x, h x Z = Z) -> (forall x y, h x (S y) = add (h x y) x) ->
  forall x y, g x y = h x y.
Proof.
  intros g h g0 gS h0 hS x y. induction y as [|k IH].
  - rewrite g0, h0. reflexivity.
  - rewrite gS, hS, IH. reflexivity.
Qed.

Theorem append_unique : forall (E : Type) (g h : Seq E -> Seq E -> Seq E),
  (forall u, g Nil u = u) -> (forall a t u, g (Cons a t) u = Cons a (g t u)) ->
  (forall u, h Nil u = u) -> (forall a t u, h (Cons a t) u = Cons a (h t u)) ->
  forall t u, g t u = h t u.
Proof.
  intros E g h g0 gC h0 hC t u. induction t as [|a t IH].
  - rewrite g0, h0. reflexivity.
  - rewrite gC, hC, IH. reflexivity.
Qed.

(* add itself satisfies its rules by computation, so any function satisfying them is add. *)
Theorem add_is_determined : forall g : N -> N -> N,
  (forall x, g x Z = x) -> (forall x y, g x (S y) = S (g x y)) ->
  forall x y, g x y = add x y.
Proof.
  intros g g0 gS. apply (add_unique g add g0 gS).
  - reflexivity.
  - reflexivity.
Qed.

(* Encoding into f-trees and computation. *)

Theorem dec_enc : forall n, dec (enc n) = Some n.
Proof. induction n as [|k IH]; simpl. reflexivity. rewrite IH. reflexivity. Qed.

Example add_two_three : add (S (S Z)) (S (S (S Z))) = S (S (S (S (S Z)))).
Proof. reflexivity. Qed.

Example dec_two : dec (f (cons (f (cons (f nil) nil)) nil)) = Some (S (S Z)).
Proof. reflexivity. Qed.

Example dec_not_chain : dec (f (cons (f nil) (cons (f nil) nil))) = None.
Proof. reflexivity. Qed.

(* Binary numerals: addition computed in another representation (Proposition 10.6).
   bz is the empty numeral; b0 w and b1 w append the digits 0 and 1 to w. *)
Inductive Bin : Type := bz : Bin | b0 : Bin -> Bin | b1 : Bin -> Bin.

(* Decode a binary numeral into a chain: w0 is w + w, and w1 is S (w + w). *)
Fixpoint decB (w : Bin) : N :=
  match w with
  | bz => Z
  | b0 v => add (decB v) (decB v)
  | b1 v => S (add (decB v) (decB v))
  end.

(* Add one, with carrying. *)
Fixpoint succB (w : Bin) : Bin :=
  match w with
  | bz => b1 bz
  | b0 v => b1 v
  | b1 v => b0 (succB v)
  end.

(* Add two numerals digit by digit; a carry is passed on by succB. *)
Fixpoint addB (v w : Bin) : Bin :=
  match v, w with
  | bz, _ => w
  | b0 v', bz => b0 v'
  | b1 v', bz => b1 v'
  | b0 v', b0 w' => b0 (addB v' w')
  | b0 v', b1 w' => b1 (addB v' w')
  | b1 v', b0 w' => b1 (addB v' w')
  | b1 v', b1 w' => b0 (succB (addB v' w'))
  end.

Theorem decB_succB : forall w, decB (succB w) = S (decB w).
Proof.
  induction w as [| v IH | v IH]; simpl.
  - reflexivity.
  - reflexivity.
  - rewrite IH. simpl. rewrite (add_leftsucc (decB v) (decB v)). reflexivity.
Qed.

(* Proposition 10.6: decoding the binary sum gives the sum of the decoded values. *)
Theorem decB_addB : forall v w, decB (addB v w) = add (decB v) (decB w).
Proof.
  induction v as [| v IH | v IH]; intro w.
  - simpl. rewrite (add_leftzero (decB w)). reflexivity.
  - destruct w as [| w | w]; simpl.
    + reflexivity.
    + rewrite IH. apply add_interchange.
    + rewrite IH, (add_interchange (decB v) (decB w) (decB v) (decB w)). reflexivity.
  - destruct w as [| w | w]; simpl.
    + reflexivity.
    + rewrite IH, (add_interchange (decB v) (decB w) (decB v) (decB w)),
        (add_leftsucc (add (decB v) (decB v)) (add (decB w) (decB w))).
      reflexivity.
    + rewrite decB_succB. simpl. rewrite IH,
        (add_leftsucc (add (decB v) (decB w)) (add (decB v) (decB w))),
        (add_leftsucc (add (decB v) (decB v)) (add (decB w) (decB w))),
        (add_interchange (decB v) (decB w) (decB v) (decB w)).
      reflexivity.
Qed.

(* Encode a chain as a binary numeral by adding one, n times. *)
Fixpoint bin (n : N) : Bin :=
  match n with
  | Z => bz
  | S m => succB (bin m)
  end.

Theorem decB_bin : forall n, decB (bin n) = n.
Proof. induction n as [|k IH]; simpl. reflexivity. rewrite decB_succB, IH. reflexivity. Qed.

(* The binary model follows the rules of addition, so by add_is_determined
   (as in Corollary 10.5) it computes add on every input. *)
Theorem addB_is_add : forall x y, decB (addB (bin x) (bin y)) = add x y.
Proof.
  apply (add_is_determined (fun x y => decB (addB (bin x) (bin y)))).
  - intro x. simpl. rewrite decB_addB. simpl. apply decB_bin.
  - intros x y. simpl. rewrite (decB_addB (bin x) (succB (bin y))),
      (decB_addB (bin x) (bin y)), (decB_succB (bin y)).
    reflexivity.
Qed.

Example addB_two_three : addB (b0 (b1 bz)) (b1 (b1 bz)) = b1 (b0 (b1 bz)).
Proof. reflexivity. Qed.

Example decB_five : decB (b1 (b0 (b1 bz))) = S (S (S (S (S Z)))).
Proof. reflexivity. Qed.

Print Assumptions add_leftzero.
Print Assumptions add_leftsucc.
Print Assumptions add_commutative.
Print Assumptions add_associative.
Print Assumptions add_interchange.
Print Assumptions mul_leftzero.
Print Assumptions mul_rightone.
Print Assumptions mul_leftsucc.
Print Assumptions mul_commutative.
Print Assumptions mul_leftone.
Print Assumptions mul_distributive_first.
Print Assumptions mul_distributive_second.
Print Assumptions mul_associative.
Print Assumptions append_leftunit.
Print Assumptions append_rightunit.
Print Assumptions append_associative.
Print Assumptions add_unique.
Print Assumptions mul_unique.
Print Assumptions append_unique.
Print Assumptions add_is_determined.
Print Assumptions dec_enc.
Print Assumptions decB_succB.
Print Assumptions decB_addB.
Print Assumptions decB_bin.
Print Assumptions addB_is_add.
