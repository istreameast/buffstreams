export type LeagueKey =
  | 'NBA' | 'NFL' | 'NHL' | 'MLB' | 'CFB' | 'UFC' | 'SOCCER' | 'BOXING' | 'F1';

export const FILTER_ORDER: LeagueKey[] = ['NBA', 'NFL', 'NHL', 'MLB', 'CFB', 'UFC'];

/** Normalization (unchanged behavior, extended patterns OK) */
const MAP: Array<{ key: LeagueKey; patterns: RegExp[] }> = [
  { key: 'NBA',    patterns: [/^nba$/i, /basketball/i, /nba/i] },
  { key: 'NFL',    patterns: [/^nfl$/i, /american\s*football/i, /nfl/i, /gridiron/i] },
  { key: 'NHL',    patterns: [/^nhl$/i, /ice\s*hockey/i, /nhl/i] },
  { key: 'MLB',    patterns: [/^mlb$/i, /baseball/i] },
  { key: 'CFB',    patterns: [/^cfb$/i, /ncaa\s*(football)?/i, /college\s*football/i] },
  { key: 'UFC',    patterns: [/^ufc$/i, /mma/i, /mixed\s*martial\s*arts/i] },
  { key: 'SOCCER', patterns: [/^soccer$/i, /\bfootball\b/i, /laliga/i, /premier\s*league/i, /serie\s*a/i, /bundesliga/i, /ligue\s*1/i] },
  { key: 'BOXING', patterns: [/boxing/i] },
  { key: 'F1',     patterns: [/^f1$/i, /formula\s*1/i, /formula\s*one/i] },
];

export function normalizeLeague(raw?: string): LeagueKey | 'OTHER' {
  const v = (raw || '').trim();
  for (const m of MAP) if (m.patterns.some(rx => rx.test(v))) return m.key;
  return 'OTHER';
}

/** Icon URLs inspired by your examples */
export const LEAGUE_ICONS: Record<LeagueKey, string> = {
  NFL: 'https://scdnmain.net/assets/tournament/108947.png',
  NBA: 'https://scdnmain.net/assets/tournament/177.png',
  NHL: 'https://scdnmain.net/assets/tournament/142.png',
  MLB: 'https://scdnmain.net/assets/tournament/3321.png',
  CFB: 'https://scdnmain.net/assets/tournament/698.png',
  UFC: 'https://buffstreams.plus/images/ufc.webp?v2',
  SOCCER: 'https://buffstreams.plus/images/soccer.webp?v2',
  BOXING: 'https://buffstreams.plus/images/boxing.webp?v2',
  F1: 'https://buffstreams.plus/images/f1.webp?v2',
};

/** Friendly heading names */
export const LEAGUE_TITLES: Partial<Record<LeagueKey, string>> = {
  SOCCER: 'Premier League / Soccer',
};
