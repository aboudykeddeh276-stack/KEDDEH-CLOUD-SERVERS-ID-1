# Verification and Proof Conventions

## Corrected meaning of verify

In this repository, verify does not mean personally sign, endorse, or certify a claim as universally true.

Verify means document adequate proof using adequate proof conventions.

Verification is the act of recording the evidence chain required for a reader, implementer, reviewer, or future tool to inspect the claim.

## Authorship authority

Primary research authorship belongs to A. Keddeh.

AI tools such as ChatGPT, Codex, and similar assistants may assist by writing, organising, testing, elaborating, or implementing under direction.

Those tools do not become the originating authors of the KEX research.

They operate only within the limits of their software and directives.

## Proof record structure

Every substantive claim should be documented with the following structure:

```text
CLAIM: proposition being evaluated
DEFINITIONS: terms required to understand the claim
ASSUMPTIONS: accepted premises
DERIVATION: logic, maths, architecture, or software reasoning
IMPLEMENTATION: files, formulas, code, workbook schemas, or modules
TEST: procedure used to examine the claim
RESULT: observed output
LIMITS: what was not proven
DEPENDENCIES: other claims or definitions required
STATUS: defined, derived, implemented, tested, supported, refuted, or undetermined
```

## Adequate proof classes

```text
CLASS_D: definition proof
CLASS_L: logical derivation proof
CLASS_M: mathematical consistency proof
CLASS_A: architectural mapping proof
CLASS_I: implementation proof
CLASS_T: test output proof
CLASS_B: benchmark proof
CLASS_R: reproducibility proof
```

## Verification rule

A claim can move from defined to implemented only when it has a corresponding file, schema, code path, formula rule, or module.

A claim can move from implemented to tested only when a repeatable test exists.

A claim can move from tested to supported only when the result is recorded with limits.

## Boundary

This convention does not claim universal truth. It records adequate proof relative to stated definitions, assumptions, implementation, and tests.
