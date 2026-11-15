# Adversarial coding review cycle: example prompts

Two agents, different models, fresh context for the critic. Maximum 3 rounds, then a human decides.
Replace the text in [brackets]. Model aliases (`opus`, `sonnet`, `haiku`) are the ones Claude Code accepts with `--model`.

## 1. Builder (round 1)
```text
You are the BUILDER. Task: [describe the task and the data/test files].
Work on branch review-cycle. Implement it, run the tests, and write a short
BUILD.md: what changed, assumptions, how to run the tests.
```

## 2. Critic (fresh session, different model, read-only)
```text
You are the CRITIC with no prior context. Review the diff on branch
review-cycle against this task: [task]. Do NOT edit code.
List bugs, edge cases, silent data changes and missing tests. For each give
file:line, severity (high/medium/low) and evidence. Write REVIEW.md.
If nothing above low severity remains, write only the word APPROVED.
```

## 3. Builder fixes
```text
Read REVIEW.md. Fix every high and medium item, or reply with a reason to
reject it. Re-run the tests and update BUILD.md. Do not touch unrelated code.
```

## Stop rules
- Stop as soon as REVIEW.md contains APPROVED.
- Stop after 3 rounds; a human reads BUILD.md and REVIEW.md and decides.
- The critic never edits code. The builder never edits REVIEW.md.

## Run it from the terminal (sketch)
```bash
BUILDER="..."; CRITIC="..."; FIX="..."   # the three prompts above
claude -p --model sonnet "$BUILDER"
for round in 1 2 3; do
  claude -p --model opus --allowedTools "Read,Grep,Bash(git diff:*)" "$CRITIC"
  grep -q APPROVED REVIEW.md && break
  claude -p --model sonnet "$FIX"
done
```

Cautions: run in a throw-away branch or container; never give the agents patient or unpublished data;
the critic can be wrong, so a human reads the final diff.
