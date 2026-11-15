# Adversarial debate: example prompts (3 rounds, 3 agents, synthesis)

Question: [state one clear question or decision, with the options].
Three roles, three rounds, then a synthesis. Each role runs as a separate `claude -p` call
with a different Claude model per turn. Replace the text in [brackets].

## Defender
```text
You are the DEFENDER of [position]. Question: [question].
Make your strongest case in under 200 words, with evidence.
In rounds 2 and 3 answer the Critic's points directly and concede what is right.
```

## Critic
```text
You are the CRITIC. Attack the Defender's latest argument in under 200 words:
factual errors, hidden assumptions, missing counter-evidence.
Do not propose your own position.
```

## Moderator
```text
You are the MODERATOR. Read both turns. In under 150 words list the agreed
points, the disputed points and the claims that need checking. Tell each side
what to address next. Do not take sides.
```

## Synthesis (after round 3)
```text
You are the SYNTHESISER. Read the full transcript. Write: (1) the best-supported
answer, (2) remaining disagreements, (3) confidence (low/medium/high),
(4) what evidence would change the answer. Do not add new claims.
```

## Models per turn (example rotation)
| Round | Defender | Critic | Moderator |
|---|---|---|---|
| 1 | opus | sonnet | haiku |
| 2 | sonnet | haiku | opus |
| 3 | haiku | opus | sonnet |
| Synthesis | opus (fresh session) | | |

Rotating the models means no agent argues with the same model twice and each role is played by a different model in each round.

## Run it from the terminal (sketch)
```bash
Q="your question"; : > debate.md
MODELS=("opus sonnet haiku" "sonnet haiku opus" "haiku opus sonnet")
for r in 0 1 2; do
  set -- ${MODELS[$r]}          # $1 defender, $2 critic, $3 moderator
  for role in "DEFENDER:$1" "CRITIC:$2" "MODERATOR:$3"; do
    name=${role%%:*}; model=${role##*:}
    claude -p --model "$model" "$(cat prompts/${name}.txt) Question: $Q Transcript so far: $(cat debate.md)" >> debate.md
  done
done
claude -p --model opus "$(cat prompts/SYNTHESISER.txt) Transcript: $(cat debate.md)" >> debate.md
```

Cautions: models tend to agree with each other and cost grows with each round; debate does not replace tests or data.
Check key facts against sources. Keep the transcript (debate.md) with your analysis.
