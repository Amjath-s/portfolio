/** Deterministic mock contributions for a calendar year (Phase 2 until live GitHub API). */
function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function levelFromCount(count) {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

/**
 * Returns { year, total, weeks: [{ days: [{ date, count, level }] }] }
 * Weeks are Sunday-start, matching GitHub calendar layout.
 */
export function getMockContributions(username, year) {
  const seed = hash(`${username}:${year}`);
  const start = new Date(Date.UTC(year, 0, 1));
  const end = new Date(Date.UTC(year, 11, 31));

  // Back up to Sunday of the first week
  const cursor = new Date(start);
  cursor.setUTCDate(cursor.getUTCDate() - cursor.getUTCDay());

  const weeks = [];
  let total = 0;
  let i = 0;

  while (cursor <= end || cursor.getUTCDay() !== 0) {
    const days = [];
    for (let d = 0; d < 7; d += 1) {
      const y = cursor.getUTCFullYear();
      const inYear = y === year;
      const n = hash(`${seed}:${i}:${d}`) % 100;
      let count = 0;
      if (inYear) {
        if (n > 55) count = (n % 12) + 1;
        if (n > 88) count = (n % 8) + 10;
      }
      total += count;
      days.push({
        date: cursor.toISOString().slice(0, 10),
        count,
        level: inYear ? levelFromCount(count) : -1,
      });
      cursor.setUTCDate(cursor.getUTCDate() + 1);
      i += 1;
    }
    weeks.push({ days });
    if (cursor > end && cursor.getUTCDay() === 0) break;
    // safety
    if (weeks.length > 62) break;
  }

  return { year, total, weeks };
}

export function getContributionYears(count = 5) {
  const current = new Date().getFullYear();
  return Array.from({ length: count }, (_, i) => current - i);
}
