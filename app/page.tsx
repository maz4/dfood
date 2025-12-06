"use client";

import { useState } from "react";
import { calculateFoodAmount, CalculationParams } from "@/lib/calculator";
import { withSachetTables, dryOnlyTables } from "@/lib/data";
import ExpandableTable from "@/components/ExpandableTable";

export default function Home() {
  const [ageMonths, setAgeMonths] = useState<number>(12);
  const [weightKg, setWeightKg] = useState<number>(5);
  const [isSpayedNeutered, setIsSpayedNeutered] = useState<boolean>(false);
  const [foodType, setFoodType] = useState<"dry-only" | "with-sachet">(
    "dry-only"
  );
  const [specialDiet, setSpecialDiet] = useState<
    "standard" | "weight-management" | "kidney-heart"
  >("standard");
  const [weightGoal, setWeightGoal] = useState<"maintain" | "reduce">(
    "maintain"
  );

  const params: CalculationParams = {
    ageMonths,
    weightKg,
    isSpayedNeutered,
    foodType,
    specialDiet: specialDiet === "standard" ? undefined : specialDiet,
    weightGoal: specialDiet === "weight-management" ? weightGoal : undefined,
  };

  const result = calculateFoodAmount(params);

  return (
    <div className="container">
      <h1>🐕 ドッグフード給与量計算機</h1>

      <div className="section">
        <h2>入力情報</h2>
        <div className="form-group">
          <label htmlFor="age">年齢（月）</label>
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
          <label htmlFor="weight">体重（kg）</label>
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
              避妊・去勢済み
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="foodType">フードタイプ</label>
          <select
            id="foodType"
            value={foodType}
            onChange={(e) =>
              setFoodType(e.target.value as "dry-only" | "with-sachet")
            }
          >
            <option value="dry-only">ドライフードのみ</option>
            <option value="with-sachet">ドライフード + パウチ</option>
          </select>
        </div>

        {foodType === "dry-only" && (
          <div className="form-group">
            <label htmlFor="specialDiet">特別な食事</label>
            <select
              id="specialDiet"
              value={specialDiet}
              onChange={(e) =>
                setSpecialDiet(e.target.value as typeof specialDiet)
              }
            >
              <option value="standard">標準</option>
              <option value="weight-management">体重管理用</option>
              <option value="kidney-heart">腎臓・心臓の健康維持</option>
            </select>
          </div>
        )}

        {specialDiet === "weight-management" && (
          <div className="form-group">
            <label htmlFor="weightGoal">体重目標</label>
            <select
              id="weightGoal"
              value={weightGoal}
              onChange={(e) =>
                setWeightGoal(e.target.value as "maintain" | "reduce")
              }
            >
              <option value="maintain">体重維持</option>
              <option value="reduce">減量</option>
            </select>
          </div>
        )}

        {result.cups !== null && (
          <div className="result">
            <h3>推奨給与量</h3>
            <div className="result-value">
              {result.cups.toFixed(1)} カップ（1カップ = 200ml）
            </div>
            <div className="result-value">{result.grams?.toFixed(0)} g</div>
            <div className="result-details">
              使用テーブル: {result.tableName}
              <br />
              カテゴリー: {result.column}
            </div>
          </div>
        )}

        {result.cups === null && ageMonths > 0 && weightKg > 0 && (
          <div className="error">
            この組み合わせではデータが見つかりませんでした。入力値を確認してください。
          </div>
        )}
      </div>

      {/* Dry Food with Sachet Section */}
      <div className="section">
        <h2>ドライフード + パウチ 給与目安表</h2>
        <ExpandableTable table={withSachetTables.puppy} />
        <ExpandableTable table={withSachetTables.adult} />
        <ExpandableTable table={withSachetTables.senior} />
        <ExpandableTable table={withSachetTables.weightManagement} />
      </div>

      {/* Dry Food Only Section */}
      <div className="section">
        <h2>ドライフードのみ 給与目安表</h2>
        <ExpandableTable table={dryOnlyTables.puppy} />
        <ExpandableTable table={dryOnlyTables.adult} />
        <ExpandableTable table={dryOnlyTables.senior} />
        <ExpandableTable table={dryOnlyTables.weightManagement} />
        <ExpandableTable table={dryOnlyTables.kidneyHeart} />
      </div>

      {/* Cup Information */}
      <div className="section">
        <h2>計量カップ情報（重量の目安）</h2>
        <table>
          <thead>
            <tr>
              <th>種類</th>
              <th>1 カップ</th>
              <th>0.1 カップ</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>子いぬ用</td>
              <td>約 80g</td>
              <td>約 8g</td>
            </tr>
            <tr>
              <td>子いぬ用以外</td>
              <td>約 75g</td>
              <td>約 7.5g</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
