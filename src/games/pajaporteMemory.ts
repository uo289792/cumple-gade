export type CountryCard = { id: string; country: string };

export function shuffle<T>(items: readonly T[], random = Math.random): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function createCountryDeck(
  countries: readonly string[],
  pairCount: number,
): CountryCard[] {
  const available = [...new Set(countries.filter((country) => country.trim()))];
  const selected = shuffle(available).slice(
    0,
    Math.max(0, Math.min(Math.floor(pairCount), available.length)),
  );
  return shuffle(
    selected.flatMap((country) => [
      { id: `${country}-a`, country },
      { id: `${country}-b`, country },
    ]),
  );
}
