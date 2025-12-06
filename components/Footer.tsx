"use client";

import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a
            href="https://github.com/maz4/dfood"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            GitHub Repository
          </a>
        </div>
        <LanguageSwitcher />
      </div>
    </footer>
  );
}
