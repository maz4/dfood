"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentLanguage = i18n.language || "ja";
  const toggleLanguage = () => {
    const newLang = currentLanguage === "ja" ? "en" : "ja";
    i18n.changeLanguage(newLang);
    localStorage.setItem("i18nextLng", newLang);
  };

  return (
    <div className="language-switcher">
      <button onClick={toggleLanguage}>
        {currentLanguage === "ja" ? "English" : "日本語"}
      </button>
    </div>
  );
}
