# Arithmetic engine provenance

`applications.mjs` and `formal-field.mjs` are byte-for-byte copies of the corresponding files in the repository's `verification/` directory, as distributed with paper v1.5.8. Their relative import is preserved. They use exact BigInt rational arithmetic, no network calls, eval, or external packages.

The lab generator uses their rational-function normalization. The separate `../checker.mjs` imports only their elementary rational arithmetic. It implements its own finite polynomial operations, binomial substitution and cross-product checks, without importing the generator or the rational-function normalizer. Shared rational arithmetic, JavaScript/BigInt, and the checker implementation remain trusted. Its acceptance certifies the recorded finite claims, not all handwritten theorems or arbitrary programs.

## Checker work limits

Certificates are bounded to 200,000 JSON characters. Before rational parsing or polynomial arithmetic, the checker enforces at most 512 characters per rational text and a total numeric-text budget of 30,000 characters. Input polynomials have degree at most 6; claimed field pairs have degree at most 18, which permits equivalent unnormalized representations within that bound. Expansion/perturbation orders remain bounded by their operation contracts. These are implementation resource limits, not restrictions of the mathematical field or its equality relation. The browser also applies its own worker execution deadline.
