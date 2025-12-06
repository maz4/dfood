"use client";

import { useState } from "react";

interface TableData {
  name: string;
  data: Array<Record<string, number | string | null>>;
}

interface ExpandableTableProps {
  table: TableData;
}

export default function ExpandableTable({ table }: ExpandableTableProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!table.data || table.data.length === 0) {
    return null;
  }

  const columns = Object.keys(table.data[0]).filter((key) => key !== "weight");
  const weights = table.data.map((row) => row.weight);

  return (
    <div className="expandable-section">
      <div
        className="expandable-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 style={{ margin: 0 }}>{table.name}</h3>
        <span className={`arrow ${isExpanded ? "expanded" : ""}`}>▼</span>
      </div>
      {isExpanded && (
        <div className="expandable-content">
          <table>
            <thead>
              <tr>
                <th>現在の体重(kg)</th>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.data.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.weight}</td>
                  {columns.map((col) => (
                    <td key={col}>
                      {row[col] === null || row[col] === "-" ? "-" : row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
