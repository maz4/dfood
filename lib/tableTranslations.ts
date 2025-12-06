// Mapping of Japanese column names to translation keys
export const columnNameMap: Record<string, string> = {
  "離乳〜3か月": "columnNames.weaningTo3Months",
  "4〜6か月": "columnNames.4To6Months",
  "7〜12か月": "columnNames.7To12Months",
  "標準 1〜3歳": "columnNames.standard1To3Years",
  "標準 4〜6歳": "columnNames.standard4To6Years",
  "避妊・去勢後 1〜3歳": "columnNames.spayed1To3Years",
  "避妊・去勢後 4〜6歳": "columnNames.spayed4To6Years",
  "標準 7〜10歳": "columnNames.standard7To10Years",
  "標準 11歳〜": "columnNames.standard11PlusYears",
  "避妊・去勢後 11歳〜": "columnNames.spayed11PlusYears",
  "減量 1〜3歳": "columnNames.reduce1To3Years",
  "減量 4〜6歳": "columnNames.reduce4To6Years",
  "体重維持 1〜3歳": "columnNames.maintain1To3Years",
  "体重維持 4〜6歳": "columnNames.maintain4To6Years",
  "標準 1〜6歳": "columnNames.standard1To6Years",
  "標準 11歳以上": "columnNames.standard11PlusYearsKidney",
  "避妊・去勢後 1〜6歳": "columnNames.spayed1To6Years",
  "避妊・去勢後 7〜10歳": "columnNames.spayed7To10YearsKidney",
  "避妊・去勢後 11歳以上": "columnNames.spayed11PlusYearsKidney",
};

// Mapping of Japanese table names to translation keys
export const tableNameMap: Record<string, string> = {
  "1歳まで子いぬ用［子いぬ用パウチ1袋を併用］": "tableNames.puppyWithSachet",
  "1歳から［1歳から成犬用パウチ1袋を併用］": "tableNames.adultWithSachet",
  "7歳から ［7歳から高齢犬用パウチ1袋を併用］": "tableNames.seniorWithSachet",
  "1歳から体重管理用［1歳から成犬用パウチ1袋を併用］":
    "tableNames.weightManagementWithSachet",
  "1歳まで子いぬ用": "tableNames.puppyDryOnly",
  "1歳から": "tableNames.adultDryOnly",
  "7歳から": "tableNames.seniorDryOnly",
  "1歳から体重管理用": "tableNames.weightManagementDryOnly",
  "腎臓・心臓の健康維持": "tableNames.kidneyHeartDryOnly",
};

export function translateColumnName(
  columnName: string,
  t: (key: string) => string
): string {
  const translationKey = columnNameMap[columnName];
  if (translationKey) {
    return t(translationKey);
  }
  return columnName; // Fallback to original if no translation found
}

export function translateTableName(
  tableName: string,
  t: (key: string) => string
): string {
  const translationKey = tableNameMap[tableName];
  if (translationKey) {
    return t(translationKey);
  }
  return tableName; // Fallback to original if no translation found
}
