"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { calculateFoodAmount, CalculationParams } from "@/lib/calculator";
import { withSachetTables, dryOnlyTables } from "@/lib/data";
import { FOOD_TYPE, SPECIAL_DIET, WEIGHT_GOAL } from "@/lib/constants";
import ExpandableTable from "@/components/ExpandableTable";

export default function Home() {
  const { t } = useTranslation();
  const [ageMonths, setAgeMonths] = useState<number>(12);
  const [weightKg, setWeightKg] = useState<number>(5);
  const [isSpayedNeutered, setIsSpayedNeutered] = useState<boolean>(false);
  const [foodType, setFoodType] = useState<
    typeof FOOD_TYPE.DRY_ONLY | typeof FOOD_TYPE.WITH_SACHET
  >(FOOD_TYPE.DRY_ONLY);
  const [specialDiet, setSpecialDiet] = useState<
    | typeof SPECIAL_DIET.STANDARD
    | typeof SPECIAL_DIET.WEIGHT_MANAGEMENT
    | typeof SPECIAL_DIET.KIDNEY_HEART
  >(SPECIAL_DIET.STANDARD);
  const [weightGoal, setWeightGoal] = useState<
    typeof WEIGHT_GOAL.MAINTAIN | typeof WEIGHT_GOAL.REDUCE
  >(WEIGHT_GOAL.MAINTAIN);

  const params: CalculationParams = {
    ageMonths,
    weightKg,
    isSpayedNeutered,
    foodType,
    specialDiet:
      specialDiet === SPECIAL_DIET.STANDARD ? undefined : specialDiet,
    weightGoal:
      specialDiet === SPECIAL_DIET.WEIGHT_MANAGEMENT ? weightGoal : undefined,
  };

  const result = calculateFoodAmount(params);

  return (
    <div className="container">
      <h1>{t("title")}</h1>

      <div className="section">
        <h2>{t("inputInfo")}</h2>
        <div className="form-group">
          <label htmlFor="age">{t("age")}</label>
          <input
            id="age"
            type="number"
            min="1"
            max="240"
            value={ageMonths}
            onChange={(e) => setAgeMonths(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">{t("weight")}</label>
          <input
            id="weight"
            type="number"
            min="0.1"
            max="100"
            step="0.1"
            value={weightKg}
            onChange={(e) => setWeightKg(Number(e.target.value))}
          />
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              id="spayed"
              type="checkbox"
              checked={isSpayedNeutered}
              onChange={(e) => setIsSpayedNeutered(e.target.checked)}
            />
            <label htmlFor="spayed" style={{ margin: 0, cursor: "pointer" }}>
              {t("spayedNeutered")}
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="foodType">{t("foodType")}</label>
          <select
            id="foodType"
            value={foodType}
            onChange={(e) =>
              setFoodType(
                e.target.value as
                  | typeof FOOD_TYPE.DRY_ONLY
                  | typeof FOOD_TYPE.WITH_SACHET
              )
            }
          >
            <option value={FOOD_TYPE.DRY_ONLY}>{t("dryOnly")}</option>
            <option value={FOOD_TYPE.WITH_SACHET}>{t("dryWithSachet")}</option>
          </select>
        </div>

        {foodType === FOOD_TYPE.DRY_ONLY && (
          <div className="form-group">
            <label htmlFor="specialDiet">{t("specialDiet")}</label>
            <select
              id="specialDiet"
              value={specialDiet}
              onChange={(e) =>
                setSpecialDiet(e.target.value as typeof specialDiet)
              }
            >
              <option value={SPECIAL_DIET.STANDARD}>{t("standard")}</option>
              <option value={SPECIAL_DIET.WEIGHT_MANAGEMENT}>
                {t("weightManagement")}
              </option>
              <option value={SPECIAL_DIET.KIDNEY_HEART}>
                {t("kidneyHeart")}
              </option>
            </select>
          </div>
        )}

        {specialDiet === SPECIAL_DIET.WEIGHT_MANAGEMENT && (
          <div className="form-group">
            <label htmlFor="weightGoal">{t("weightGoal")}</label>
            <select
              id="weightGoal"
              value={weightGoal}
              onChange={(e) =>
                setWeightGoal(
                  e.target.value as
                    | typeof WEIGHT_GOAL.MAINTAIN
                    | typeof WEIGHT_GOAL.REDUCE
                )
              }
            >
              <option value={WEIGHT_GOAL.MAINTAIN}>{t("maintain")}</option>
              <option value={WEIGHT_GOAL.REDUCE}>{t("reduce")}</option>
            </select>
          </div>
        )}

        {result.cups !== null && (
          <div className="result">
            <h3>{t("recommendedAmount")}</h3>
            <div className="result-value">
              {result.cups.toFixed(1)} {t("cups")}
            </div>
            <div className="result-value">
              {result.grams?.toFixed(0)} {t("grams")}
            </div>
            <div className="result-details">
              {t("tableUsed")}: {result.tableName}
              <br />
              {t("category")}: {result.column}
            </div>
          </div>
        )}

        {result.cups === null && ageMonths > 0 && weightKg > 0 && (
          <div className="error">{t("noDataFound")}</div>
        )}
      </div>

      {/* Dry Food with Sachet Section */}
      <div className="section">
        <h2>{t("dryWithSachetTables")}</h2>
        <ExpandableTable table={withSachetTables.puppy} />
        <ExpandableTable table={withSachetTables.adult} />
        <ExpandableTable table={withSachetTables.senior} />
        <ExpandableTable table={withSachetTables.weightManagement} />
      </div>

      {/* Dry Food Only Section */}
      <div className="section">
        <h2>{t("dryOnlyTables")}</h2>
        <ExpandableTable table={dryOnlyTables.puppy} />
        <ExpandableTable table={dryOnlyTables.adult} />
        <ExpandableTable table={dryOnlyTables.senior} />
        <ExpandableTable table={dryOnlyTables.weightManagement} />
        <ExpandableTable table={dryOnlyTables.kidneyHeart} />
      </div>

      {/* Cup Information */}
      <div className="section">
        <h2>{t("cupInfo")}</h2>
        <table>
          <thead>
            <tr>
              <th>{t("type")}</th>
              <th>{t("oneCup")}</th>
              <th>{t("zeroOneCup")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("puppyFood")}</td>
              <td>
                {t("approx")} 80{t("grams")}
              </td>
              <td>
                {t("approx")} 8{t("grams")}
              </td>
            </tr>
            <tr>
              <td>{t("nonPuppyFood")}</td>
              <td>
                {t("approx")} 75{t("grams")}
              </td>
              <td>
                {t("approx")} 7.5{t("grams")}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
