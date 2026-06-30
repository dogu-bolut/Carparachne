"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

interface LanguageSelectorProps {
  direction?: "up" | "down";
}

export default function LanguageSelector({
  direction = "down",
}: LanguageSelectorProps) {
  const currentLocale = useLocale();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const selectLanguage = (newLocale: "en" | "tr") => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    // 1. Override the middleware cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`;

    // 2. Strip the current locale from the URL
    let basePath = pathname;
    if (pathname.startsWith("/en")) {
      basePath = pathname.replace(/^\/en/, "") || "/";
    } else if (pathname.startsWith("/tr")) {
      basePath = pathname.replace(/^\/tr/, "") || "/";
    }

    // 3. Add the new locale prefix (Blank for TR since it is 'as-needed')
    let newPath = basePath;
    if (newLocale === "en") {
      newPath = `/en${basePath === "/" ? "" : basePath}`;
    }

    // 4. Force a hard navigation to bust the Next.js cache
    window.location.href = newPath;
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
      if (event.key === "Escape") setIsOpen(false);
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

  const currentLangLabel = currentLocale === "tr" ? "Türkçe" : "English";
  const positionClasses =
    direction === "up" ? "bottom-full mb-2" : "mt-2 top-full";

  return (
    <div ref={dropdownRef} className="relative inline-block w-full md:w-auto">
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        className="w-full md:w-auto px-4 py-2 border rounded bg-transparent hover:bg-surface-sunken flex items-center justify-between md:justify-start gap-2 text-ink transition-colors"
      >
        <span>{currentLangLabel}</span>
        <span
          className={`text-xs transition-transform duration-200 ${isOpen && direction === "up" ? "rotate-180" : ""}`}
        >
          {direction === "up" ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div
          className={`absolute right-0 w-32 bg-surface-raised shadow-modal rounded-lg border border-ink-line overflow-hidden z-50 ${positionClasses}`}
        >
          <button
            onClick={() => selectLanguage("en")}
            className={`block w-full text-left px-4 py-3 hover:bg-surface-sunken transition-colors ${currentLocale === "en" ? "text-ink font-medium" : "text-ink-muted hover:text-ink"}`}
          >
            English
          </button>
          <button
            onClick={() => selectLanguage("tr")}
            className={`block w-full text-left px-4 py-3 hover:bg-surface-sunken transition-colors ${currentLocale === "tr" ? "text-ink font-medium" : "text-ink-muted hover:text-ink"}`}
          >
            Türkçe
          </button>
        </div>
      )}
    </div>
  );
}
