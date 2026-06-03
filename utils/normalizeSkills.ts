import { Skill } from "@/types";

export function normalizeSkills(skills: Skill[]) {
  const merged: Record<string, Skill> = {};

  skills.forEach((skill) => {
    const key = skill.name.toLowerCase().trim();

    if (!merged[key]) {
      merged[key] = {
        ...skill,
        weight: skill.weight ?? 1,
      };
    } else {
      merged[key].weight =
        (merged[key].weight ?? 1) + (skill.weight ?? 1);
    }
  });

  const arr = Object.values(merged);

  const total = arr.reduce((sum: number, s) => {
    return sum + (s.weight ?? 1);
  }, 0);

  return arr.map((s) => ({
    ...s,
    percent: total ? ((s.weight ?? 1) / total) * 100 : 0,
  }));
}