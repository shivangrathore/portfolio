/**
 * The selling argument, in one place.
 *
 * v4 sold a list of capabilities: here are eight services, here is the stack,
 * here are some numbers. That page answers "what can you do", which is the
 * question a visitor asks *after* they have decided they have a problem worth
 * paying to solve. It never made the case that they have one.
 *
 * Every high-ticket services site worth copying runs the other order: name the
 * problem, show why the obvious fixes fail, then say what you do about it.
 * This file is that argument, so the homepage and the landing pages cannot
 * drift apart on it.
 *
 * Rule for anything added here: it has to be something a real client actually
 * said or a failure actually seen in production. No invented pain points.
 */

/** The situations a buyer recognises as their own. */
export type Problem = {
  /** The symptom, in the client's words rather than an engineer's. */
  symptom: string;
  /** What is actually going on underneath. */
  cause: string;
};

export const problems: Problem[] = [
  {
    symptom:
      "The AI demo was brilliant. Then someone uploaded a photographed invoice, and it confidently invented a supplier.",
    cause:
      "A prompt is not a pipeline. Real documents are skewed, cropped, in the wrong currency and occasionally upside down. What is missing is the tiering, the validation against records you already hold, and the confidence threshold that routes a doubtful result to a person instead of writing it to your database.",
  },
  {
    symptom:
      "Pages that were instant at a hundred customers now take six seconds at a thousand, and adding servers stopped helping months ago.",
    cause:
      "Almost always the query plan, not the hardware. A missing composite index, an N+1 hidden behind an ORM, a count over a table that has outgrown it. Cache layers get added because they are quicker to ship than reading the plan, and then the cache becomes the second problem.",
  },
  {
    symptom:
      "Every new feature breaks two old ones, and nobody wants to touch billing or permissions.",
    cause:
      "Domain logic scattered across handlers, with the rules living in whichever file happened to need them first. Multi-tenancy bolted on after the fact. It is fixable, but not by whoever is already inside it and under a deadline.",
  },
];

/**
 * The alternatives a client is actually choosing between, and the honest
 * trade-off of each. Naming them costs nothing and buys a great deal: a buyer
 * who has already priced an agency knows these numbers, and a page that
 * pretends the alternatives do not exist reads as a page written by someone
 * who has not been in the room.
 */
export type Alternative = {
  option: string;
  cost: string;
  /** The real drawback. Not a strawman: a buyer who has been burned knows. */
  catch: string;
};

export const alternatives: Alternative[] = [
  {
    option: "A dev agency",
    cost: "₹2,500 to ₹6,000 an hour",
    catch:
      "You meet the senior engineer at the pitch and get assigned the junior. An account manager sits in the middle of every question, and the people who finally understood your domain roll off the day the contract ends.",
  },
  {
    option: "The lowest bid on a marketplace",
    cost: "₹400 to ₹900 an hour",
    catch:
      "Cheap is not the problem. Unaccountable is. A bid with no named person behind it, no written scope and nothing shipped you can go and look at is the one that costs twice: once to build, once to unpick. Ask any of them for a production system with real users on it.",
  },
  {
    option: "Hiring in-house",
    cost: "3 to 6 months to fill, then a salary",
    catch:
      "The right answer if the work is permanent. A slow and expensive answer if what you actually have is eight weeks of well-defined work with a deadline in front of it.",
  },
  {
    option: "Me",
    cost: "Fixed price, from ₹8,000",
    catch:
      "Priced below what this work goes for, on purpose, because I am early in freelancing and a reference I can name is worth more than the margin. You deal with the person writing the code, and you get a straight answer about your deadline on the first call rather than a deposit taken and the timeline stretched."
  },
];

/**
 * What separates this from the last contractor they hired. Written as claims
 * that can be checked, because a claim that cannot be checked is decoration.
 */
export type Difference = {
  claim: string;
  detail: string;
};

export const differences: Difference[] = [
  {
    claim: "You talk to the person writing the code",
    detail:
      "There is no account manager, no bench and no handoff. The person on the first call is the person who ships, which is the only reason a one-person shop is worth choosing over an agency.",
  },
  {
    claim: "The number does not move unless the scope does",
    detail:
      "Fixed price per milestone, written scope, and what is explicitly out of it. Payment runs 40 percent up front, 30 at the midpoint, 30 on handover. No surprise invoice at the end.",
  },
  {
    claim: "It runs in production or it does not count",
    detail:
      "Everything on this site is live with paying users behind it. A fleet compliance platform with four UK operators on it. A game that reached a million registered players. No pilots, no prototypes presented as products.",
  },
  {
    claim: "You own all of it",
    detail:
      "Your repository, your infrastructure, your accounts, documented, from the first commit. On final payment it is yours in full. Nothing is hosted on something only I can log into.",
  },
];

/**
 * Social proof.
 *
 * These are outcome statements about real engagements, not quotes. Two of the
 * three clients are under NDA, so they are described rather than named, which
 * is standard for B2B work and is the honest version of the logo wall this
 * slot usually holds.
 *
 * When a real, attributable quote is collected, it goes in `quotes` below and
 * the component renders it above these. Do not put an invented quote there.
 */
export type Evidence = {
  /** The headline number or fact. Renders at display size. */
  value: string;
  /** What it counts. */
  label: string;
  /** Which engagement it came from. */
  source: string;
  /** Where a reader can go to check it. */
  href?: string;
};

export const evidence: Evidence[] = [
  // One card per project, then the engineering number last with its own source
  // label. Two Hauldrive cards sitting adjacent with identical sources read as a
  // copy-paste error, and each card now carries two figures instead of one, so
  // the band says more in the same space.
  {
    value: "4",
    label:
      "UK transport operators running the fleet platform in production, covering 80+ vehicles and 60+ drivers",
    source: "Hauldrive, contract",
    href: "/case-studies/hauldrive/",
  },
  {
    value: "81",
    // "on the platform", not "run" or "completed": the admin total includes
    // unpublished and cancelled events, and every number here has to survive
    // being asked about on a call.
    label:
      "esports organisations on the platform, with 95 scrims and tournaments created across them",
    source: "Finalist, live",
    href: "/case-studies/finalist/",
  },
  {
    value: "1M+",
    label:
      "registered players on a game I designed, built, scaled and ran alone, across 132k Discord servers",
    source: "Pokémon Discord bot",
    href: "/work/",
  },
  {
    value: "600+",
    label:
      "endpoints across five Go services behind one gateway, split out of a single backend without breaking a client",
    source: "Hauldrive, the architecture",
    href: "/case-studies/hauldrive/",
  },
];

/**
 * Attributable client quotes.
 *
 * Empty on purpose. The testimonial band renders nothing while this is empty
 * rather than showing a placeholder, so the page is never caught with a quote
 * that has no person behind it.
 *
 * To fill it: ask the Hauldrive lead and one Finalist organiser for two
 * sentences on what changed after the work shipped, and put their name, role
 * and company here. A named quote from a real client outperforms every other
 * element on this page, which is why it is worth the awkward email.
 */
export type Quote = {
  body: string;
  name: string;
  role: string;
  company: string;
  href?: string;
};

export const quotes: Quote[] = [];

/**
 * The call offer.
 *
 * The single most important block on the site. Everything else exists to get a
 * visitor to this, because the conversion that matters is the booking, not the
 * sale: the sale happens on the call.
 *
 * So the call is not "a chat". It is a named thing with a deliverable attached,
 * given away free, and it costs an hour to honour. A founder weighing 20
 * minutes against nothing says no. A founder weighing 20 minutes against a
 * written opinion on the exact problem keeping them up says yes.
 *
 * Rule for anything added here: it must be something deliverable in the call
 * itself or in the hour after it. Promise a written plan and then not send one
 * and the first impression is the last one.
 */
export type CallPromise = {
  /** What they walk away with. */
  gets: string;
  /** Why it is worth something on its own, even if they never hire me. */
  worth: string;
};

export const callPromises: CallPromise[] = [
  {
    gets: "A straight answer on whether the thing you want is actually hard",
    worth:
      "Half of what gets quoted as a six-week build is four days, and some of what sounds trivial is the part that sinks projects. Knowing which of the two you have is worth the call on its own.",
  },
  {
    gets: "The approach I would take, in writing, within a day",
    worth:
      "Not a proposal with a price at the bottom. The actual shape: what I would build first, what I would leave out, where the risk sits. Yours to keep, and yours to hand to another engineer if you would rather.",
  },
  {
    gets: "A number and a date you can plan around",
    worth:
      "A range, what moves it, and the earliest I could start. You stop guessing what this costs, which is usually the reason a decision has been sitting for a month.",
  },
  {
    gets: "An honest no, if it is a no",
    worth:
      "If this is not my work, or your deadline does not fit my calendar, you hear it in the first ten minutes along with who I would call instead. That costs us both less than finding out six weeks in.",
  },
];

/**
 * What the call is not. Named explicitly, because every one of these is a
 * reason someone does not book, and an unspoken objection cannot be answered.
 */
export const callIsNot: string[] = [
  "Not a sales call. There is no deck and nobody else joins.",
  "Not a commitment. Most people who book do not hire me, and that is fine.",
  "Not a discovery phase you pay for. It is 20 minutes and it is free.",
  "Not a form funnel. It goes straight into my calendar and I am the one who shows up.",
];
