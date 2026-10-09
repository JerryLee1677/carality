export type DongchediPacingOptions = {
  delayMs: number;
  maxDelayMs: number;
  restEvery: number;
  restMs: number;
};

export function nextHumanDelayMs(
  options: DongchediPacingOptions,
  random: () => number = Math.random,
) {
  const lowerBound = Math.min(options.delayMs, options.maxDelayMs);
  const upperBound = Math.max(options.delayMs, options.maxDelayMs);
  return Math.round(lowerBound + random() * (upperBound - lowerBound));
}

export function nextHumanRestMs(
  options: DongchediPacingOptions,
  random: () => number = Math.random,
) {
  return options.restMs + Math.round(random() * options.restMs);
}

export function shouldTakeHumanRest(fetchedPages: number, options: DongchediPacingOptions) {
  return options.restEvery > 0 && fetchedPages > 0 && fetchedPages % options.restEvery === 0;
}

export function isLikelyDongchediBlock(input: { status: number; html: string }) {
  if (input.status === 403 || input.status === 429) {
    return true;
  }

  return input.html.length === 0 || !input.html.includes("__NEXT_DATA__");
}
