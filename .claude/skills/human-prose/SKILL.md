---
name: human-prose
description: Rewrite or draft blog posts and long-form site copy so they read as written by one person with opinions, not generated. Use when writing a new post for src/content/blog, reworking an existing one, or when asked to make writing sound human, less AI, or less formulaic.
---

# Human prose

Goal: a reader who has seen a hundred generated technical posts should not be
able to tell. The giveaway is almost never a single sentence. It is the shape.

## First, the shape (this matters more than the sentences)

Generated writing converges. Every post ends up the same length, with the same
number of sections, the same rhythm, the same confident register. Real writing
is lumpy, because a person writes until the thing is said and then stops.

Before touching a sentence, check the post against its neighbours in
`src/content/blog/`:

- **Length must vary.** If every post is 2,000-2,900 words, something is wrong.
  Real archives have 700-word posts and 4,000-word posts. A post that only had
  800 words in it should be 800 words.
- **Section count must vary.** Eight to twelve `##` headings in every post is a
  template. Some arguments are three sections. Some are one long run with no
  headings at all.
- **Delete the `## Contents` block.** Nobody hand-writes a table of contents for
  a 2,000-word post. The site already renders an "On this page" rail from the
  headings. The block in the body is machine residue.
- **Break the bolded lead-in habit.** `**Time moves.**` opening paragraph after
  paragraph is the single most recognisable pattern in the current posts. Keep
  at most one or two per post, where the contrast genuinely earns it. Elsewhere
  let the sentence carry itself.
- **Headings should not all be the same grammatical form.** A run of noun
  phrases, or a run of imperatives, reads as generated. Mix a question, a flat
  statement, a fragment.

## Then the register

Write like one engineer telling another what happened. Specifically:

- **Lead with the incident, not the principle.** "The invoice run skipped March
  for four customers" beats "Timezone handling is a common source of bugs." The
  principle is the thing you arrive at, not the thing you open with.
- **Name real things.** Real table names, real numbers, the actual error text,
  the actual Postgres version. Vagueness is what generated writing falls back
  on when it has no experience behind it. This author has the experience, so
  use it.
- **Keep the false starts.** "I assumed it was the index. It was not the index."
  Admitting the wrong first guess is something a generator never does, and it is
  the fastest way to sound like a person who was there.
- **Have an actual opinion, including unpopular ones.** "Do not use Stripe
  Subscriptions" is a position. "There are trade-offs to consider" is filler.
- **Let some things be unresolved.** "I still do not love this" is fine. Every
  post ending in a tidy summary of lessons learned is a tell.

## Sentence-level bans

Cut these on sight:

- Em-dashes. House rule for this site, no exceptions. Use a colon, a full stop,
  or brackets.
- "Let's dive in", "in today's fast-paced", "it's worth noting", "at the end of
  the day", "game-changer", "seamless", "robust", "leverage" as a verb,
  "delve", "boasts", "in conclusion", "that said" as a paragraph opener.
- The rule-of-three list where the third item is padding. If there are two real
  items, ship two.
- "Not only X, but Y." "It's not just X, it's Y."
- Opening a section by restating the heading as a sentence.
- Rhetorical questions you immediately answer, more than once per post.
- Hedging stacks: "generally tends to usually".

## Sentence-level habits to keep

- Vary sentence length hard. A long, clause-heavy explanation followed by four
  words. That contrast is what reads as a voice.
- Contractions, always. "It's", "doesn't", "you'll".
- Second person for the reader, first person for what the author did. Do not
  drift into the passive "it was decided".
- British spelling, matching the rest of the site: "optimisation",
  "behaviour", "recognise".

## Structural bones that are fine to keep

Not everything here is a tell. Keep:

- Code blocks with real, runnable snippets.
- SQL and query plans quoted literally.
- Tables comparing options.
- A short pull quote where one line is the whole argument.

## Checks before finishing

1. Read the first paragraph alone. Does it name a specific thing that happened?
2. Count bolded lead-ins. More than two, cut the rest.
3. Search for an em-dash. There must be none.
4. Compare word count and section count against the last three posts. If it
   matches all three closely, the shape is still templated.
5. Find one sentence that only this author could have written, because it
   references something they actually did. If there is none, the post is
   generic and needs a real detail added.
