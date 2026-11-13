#!/bin/sh
# Paper §10.7: the checks depend on the content of the rules. Two broken copies of each port must be rejected:
#   no-succ  : the rule add.succ without the S on its right-hand side
#   no-carry : binary addition without the carry (the rule for two trailing 1s does not use succB)
# The copies are made in a temporary folder; the files in this folder are not changed.
# Requires lean, rocq and agda on PATH. Exit status 0 means every broken copy was rejected.
set -u
here=$(cd "$(dirname "$0")" && pwd)
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
status=0

check() { # name file sed-expression command...
  name=$1; file=$2; expr=$3; shift 3
  mkdir -p "$work/$name" && cp "$here/$file" "$work/$name/$file"
  sed "$expr" "$here/$file" > "$work/$name/$file"
  if cmp -s "$here/$file" "$work/$name/$file"; then echo "$name: the edit did not apply"; status=1; return; fi
  if (cd "$work/$name" && "$@" "$file") > "$work/$name/out.txt" 2>&1; then
    echo "$name: ACCEPTED, but it should be rejected"; status=1
  else
    echo "$name: rejected ($(grep -m1 -iE 'error|failed|mismatch|unsolved' "$work/$name/out.txt" | cut -c1-100))"
  fi
}

check lean-no-succ   FGen.lean 's/^  | x, S y => S (add x y)$/  | x, S y => add x y/' lean
check rocq-no-succ   FGen.v    "s/^  | S y' => S (add x y')\$/  | S y' => add x y'/" rocq compile
check agda-no-succ   FGen.agda 's/^add x (S y) = S (add x y)$/add x (S y) = add x y/' agda --ignore-interfaces
check lean-no-carry  FGen.lean 's/^  | b1 v, b1 w => b0 (succB (addB v w))$/  | b1 v, b1 w => b0 (addB v w)/' lean
check rocq-no-carry  FGen.v    "s/^  | b1 v', b1 w' => b0 (succB (addB v' w'))\$/  | b1 v', b1 w' => b0 (addB v' w')/" rocq compile
check agda-no-carry  FGen.agda 's/^addB (b1 v) (b1 w) = b0 (succB (addB v w))$/addB (b1 v) (b1 w) = b0 (addB v w)/' agda --ignore-interfaces
exit $status
