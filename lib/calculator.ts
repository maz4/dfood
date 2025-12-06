import { withSachetTables, dryOnlyTables } from "./data";

export interface CalculationParams {
  ageMonths: number;
  weightKg: number;
  isSpayedNeutered: boolean;
  foodType: "dry-only" | "with-sachet";
  specialDiet?: "standard" | "weight-management" | "kidney-heart";
  weightGoal?: "maintain" | "reduce";
}

function findClosestWeight(weight: number, availableWeights: number[]): number {
  return availableWeights.reduce((prev, curr) =>
    Math.abs(curr - weight) < Math.abs(prev - weight) ? curr : prev
  );
}

function getAgeCategory(ageMonths: number): "puppy" | "adult" | "senior" {
  if (ageMonths < 12) return "puppy";
  if (ageMonths < 84) return "adult"; // 7 years = 84 months
  return "senior";
}

function getPuppyAgeRange(
  ageMonths: number
): "離乳〜3か月" | "4〜6か月" | "7〜12か月" {
  if (ageMonths <= 3) return "離乳〜3か月";
  if (ageMonths <= 6) return "4〜6か月";
  return "7〜12か月";
}

function getAdultAgeRange(
  ageMonths: number,
  isSpayedNeutered: boolean
): string {
  const ageYears = Math.floor(ageMonths / 12);
  if (ageYears >= 1 && ageYears <= 3) {
    return isSpayedNeutered ? "避妊・去勢後 1〜3歳" : "標準 1〜3歳";
  } else if (ageYears >= 4 && ageYears <= 6) {
    return isSpayedNeutered ? "避妊・去勢後 4〜6歳" : "標準 4〜6歳";
  }
  return isSpayedNeutered ? "避妊・去勢後 1〜3歳" : "標準 1〜3歳";
}

function getSeniorAgeRange(
  ageMonths: number,
  isSpayedNeutered: boolean
): string {
  const ageYears = Math.floor(ageMonths / 12);
  if (ageYears >= 7 && ageYears <= 10) {
    return isSpayedNeutered ? "避妊・去勢後 7〜10歳" : "標準 7〜10歳";
  } else {
    return isSpayedNeutered ? "避妊・去勢後 11歳〜" : "標準 11歳〜";
  }
}

function getWeightManagementColumn(
  ageMonths: number,
  isSpayedNeutered: boolean,
  weightGoal: "maintain" | "reduce"
): string {
  const ageYears = Math.floor(ageMonths / 12);

  if (isSpayedNeutered) {
    if (ageYears >= 1 && ageYears <= 3) {
      return `避妊・去勢後 1〜3歳`;
    } else if (ageYears >= 4 && ageYears <= 6) {
      return `避妊・去勢後 4〜6歳`;
    }
    return `避妊・去勢後 1〜3歳`;
  } else {
    const goal = weightGoal === "maintain" ? "体重維持" : "減量";
    if (ageYears >= 1 && ageYears <= 3) {
      return `${goal} 1〜3歳`;
    } else if (ageYears >= 4 && ageYears <= 6) {
      return `${goal} 4〜6歳`;
    }
    return `${goal} 1〜3歳`;
  }
}

function getKidneyHeartColumn(
  ageMonths: number,
  isSpayedNeutered: boolean
): string {
  const ageYears = Math.floor(ageMonths / 12);
  const prefix = isSpayedNeutered ? "避妊・去勢後" : "標準";

  if (ageYears >= 1 && ageYears <= 6) {
    return `${prefix} 1〜6歳`;
  } else if (ageYears >= 7 && ageYears <= 10) {
    return `${prefix} 7〜10歳`;
  } else {
    return `${prefix} 11歳以上`;
  }
}

export function calculateFoodAmount(params: CalculationParams): {
  cups: number | null;
  grams: number | null;
  tableName: string;
  column: string;
} {
  const {
    ageMonths,
    weightKg,
    isSpayedNeutered,
    foodType,
    specialDiet,
    weightGoal,
  } = params;

  const tables = foodType === "with-sachet" ? withSachetTables : dryOnlyTables;
  const ageCategory = getAgeCategory(ageMonths);

  let table;
  let column: string;

  // Determine which table and column to use
  if (specialDiet === "weight-management" && ageCategory !== "puppy") {
    table = tables.weightManagement;
    column = getWeightManagementColumn(
      ageMonths,
      isSpayedNeutered,
      weightGoal || "maintain"
    );
  } else if (specialDiet === "kidney-heart" && foodType === "dry-only") {
    table = tables.kidneyHeart;
    column = getKidneyHeartColumn(ageMonths, isSpayedNeutered);
  } else if (ageCategory === "puppy") {
    table = tables.puppy;
    column = getPuppyAgeRange(ageMonths);
  } else if (ageCategory === "senior") {
    table = tables.senior;
    column = getSeniorAgeRange(ageMonths, isSpayedNeutered);
  } else {
    table = tables.adult;
    column = getAdultAgeRange(ageMonths, isSpayedNeutered);
  }

  // Find the closest weight entry
  const availableWeights = table.data.map((row) => row.weight);
  const closestWeight = findClosestWeight(weightKg, availableWeights);
  const row = table.data.find((r) => r.weight === closestWeight);

  if (!row) {
    return { cups: null, grams: null, tableName: table.name, column };
  }

  const cups = (row as any)[column];

  if (cups === null || cups === undefined || cups === "-") {
    return { cups: null, grams: null, tableName: table.name, column };
  }

  // Convert cups to grams
  // For puppies: 1 cup = 80g, for others: 1 cup = 75g
  const gramsPerCup = ageCategory === "puppy" ? 80 : 75;
  const grams = cups * gramsPerCup;

  return {
    cups: typeof cups === "number" ? cups : null,
    grams: typeof cups === "number" ? grams : null,
    tableName: table.name,
    column,
  };
}
