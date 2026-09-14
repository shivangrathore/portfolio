/**
 * Which rate card a visitor sees.
 *
 * The site sells to two markets that will not pay the same number. A US or UK
 * founder is comparing me against an agency at $150/hr; an Indian founder is
 * comparing me against a local shop at a fraction of that. One price list
 * loses one of them, so there are two, and the page picks.
 *
 * The pick happens in the browser, because the site is static: there is no
 * server to read an IP header. Detection is the machine's own timezone, which
 * needs no network, no third party and no round trip, so the correct price is
 * in the first paint rather than replacing a wrong one half a second later.
 * A visitor on a VPN, or an NRI who wants the other card, uses the toggle,
 * and that choice outranks detection from then on.
 */
export type Region = "in" | "intl";

/** localStorage key holding an explicit choice from the toggle. */
export const REGION_KEY = "region";

/**
 * Prices in both currencies. INR is not a conversion of the USD number: it is
 * an India-market rate set against the local weekly rate, which is why the
 * ratio is nowhere near the exchange rate.
 */
export type Price = { usd: number; inr: number };

export const usd = (amount: number) => `$${amount.toLocaleString("en-US")}`;

/** en-IN gives lakh grouping: 75,000 then 1,50,000, not 150,000. */
export const inr = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

export const priceIn = (price: Price, region: Region) =>
  region === "in" ? inr(price.inr) : usd(price.usd);
