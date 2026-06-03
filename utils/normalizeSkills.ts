export function normalizeSkills(skills: any[]) {
  const merged = Object.values(
    (skills || []).reduce((acc: any, skill: any) => {
      const key = skill.name.toLowerCase().trim();

      if (!acc[key]) {
        acc[key] = { ...skill };
      } else {
        acc[key].weight =
          (acc[key].weight || 1) + (skill.weight || 1);
      }

      return acc;
    }, {})
  );

  const total = merged.reduce(
    (sum: any, s: any) => sum + (s.weight || 1),
    0
  );

  return merged.map((s: any) => ({
    ...s,
    percent: total ? ((s.weight || 1) / total) * 100 : 0,
  }));
}