"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

interface LanguageSelectorProps {
  direction?: "up" | "down";
}

export default function LanguageSelector({
  direction = "down",
}: LanguageSelectorProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectLanguage = (lang: "EN" | "TR") => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const currentLangLabel = i18n.language === "TR" ? "Türkçe" : "English";

  // Determine classes based on the direction prop
  const positionClasses =
    direction === "up" ? "bottom-full mb-2" : "mt-2 top-full";

  return (
    <div ref={dropdownRef} className="relative inline-block w-full md:w-auto">
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className="w-full md:w-auto px-4 py-2 border rounded bg-transparent hover:bg-surface-sunken flex items-center justify-between md:justify-start gap-2 text-ink"
      >
        <span>{currentLangLabel}</span>
        <span
          className={`text-xs transition-transform ${isOpen && direction === "up" ? "rotate-180" : ""}`}
        >
          {direction === "up" ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 w-32 bg-surface-raised shadow-modal rounded-lg border border-ink-line overflow-hidden z-50 ${positionClasses}`}
        >
          <button
            onClick={() => selectLanguage("EN")}
            className="block w-full text-left px-4 py-3 text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors"
          >
            English
          </button>
          <button
            onClick={() => selectLanguage("TR")}
            className="block w-full text-left px-4 py-3 text-ink-muted hover:text-ink hover:bg-surface-sunken transition-colors"
          >
            Türkçe
          </button>
        </div>
      )}
    </div>
  );
}
