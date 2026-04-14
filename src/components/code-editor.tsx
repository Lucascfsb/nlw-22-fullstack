"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import hljs from "highlight.js";
import {
  bundledLanguagesInfo,
  createHighlighter,
  type BundledLanguage,
  type Highlighter,
} from "shiki/bundle/web";
import { twMerge } from "tailwind-merge";

import codeLanguages from "@/config/code-languages.json";

type CodeEditorProps = {
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

type LanguageMode = "auto" | "manual";

type LanguageConfig = {
  enabled: "all" | string[];
  pinned: string[];
  labelOverrides: Record<string, string>;
};

type LanguageOption = {
  id: string;
  label: string;
};

const HIGHLIGHT_DEBOUNCE_MS = 60;
const HIGHLIGHT_RELEVANCE_THRESHOLD = 5;
const FALLBACK_LANGUAGE = "plaintext";

const languageConfig = codeLanguages as LanguageConfig;

const languageInfoMap = new Map(
  bundledLanguagesInfo.map((language) => [language.id, language]),
);

const languageAliasMap = new Map<string, string>();
for (const language of bundledLanguagesInfo) {
  languageAliasMap.set(language.id, language.id);
  if (language.aliases) {
    for (const alias of language.aliases) {
      languageAliasMap.set(alias, language.id);
    }
  }
}

const availableLanguageIds =
  languageConfig.enabled === "all"
    ? bundledLanguagesInfo.map((language) => language.id)
    : languageConfig.enabled;

const availableLanguageSet = new Set(
  availableLanguageIds.filter((language) => languageInfoMap.has(language)),
);

const pinnedLanguages = languageConfig.pinned.filter((language) =>
  availableLanguageSet.has(language),
);

const sortedLanguages = availableLanguageIds
  .filter((language) => availableLanguageSet.has(language))
  .filter((language) => !pinnedLanguages.includes(language))
  .sort((a, b) => getLanguageLabel(a).localeCompare(getLanguageLabel(b), "en"));

const languageOptions: LanguageOption[] = [
  ...pinnedLanguages.map((id) => ({ id, label: getLanguageLabel(id) })),
  ...sortedLanguages.map((id) => ({ id, label: getLanguageLabel(id) })),
];

let highlighterPromise: Promise<Highlighter> | null = null;

function getLanguageLabel(languageId: string) {
  return (
    languageConfig.labelOverrides[languageId] ??
    languageInfoMap.get(languageId)?.name ??
    languageId
  );
}

function getDetectSubset() {
  const configuredLanguages =
    languageConfig.enabled === "all"
      ? hljs.listLanguages()
      : languageConfig.enabled;

  return configuredLanguages.filter((language) => hljs.getLanguage(language));
}

function resolveShikiLanguage(languageId: string | null | undefined) {
  if (
    !languageId ||
    languageId === FALLBACK_LANGUAGE ||
    languageId === "text"
  ) {
    return null;
  }

  return languageAliasMap.get(languageId) ?? null;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderPlaintext(code: string) {
  const escaped = escapeHtml(code);
  const lines = escaped.split("\n");
  const content = lines
    .map((line) => `<span class="line">${line || " "}</span>`)
    .join("\n");

  return `<pre class="shiki"><code>${content}</code></pre>`;
}

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["vesper"],
      langs: [...availableLanguageSet] as BundledLanguage[],
    });
  }

  return highlighterPromise;
}

function CodeEditor({ value, onChange, className }: CodeEditorProps) {
  const lines = value.split("\n");
  const lineCount = Math.max(lines.length, 16);
  const [languageMode, setLanguageMode] = useState<LanguageMode>("auto");
  const [manualLanguage, setManualLanguage] = useState<string | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string | null>(null);
  const [highlightedHtml, setHighlightedHtml] = useState(" ");
  const [isHighlighterReady, setIsHighlighterReady] = useState(false);
  const highlightRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const debounceRef = useRef<number | null>(null);

  const detectSubset = useMemo(() => getDetectSubset(), []);

  const autoLabel = detectedLanguage
    ? `Auto (${getLanguageLabel(detectedLanguage)})`
    : "Auto";

  const selectedLanguage =
    languageMode === "manual" && manualLanguage ? manualLanguage : "auto";

  useEffect(() => {
    let active = true;

    getHighlighter().then(() => {
      if (active) {
        setIsHighlighterReady(true);
      }
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isHighlighterReady) {
      return;
    }

    setHighlightedHtml(renderPlaintext(value));

    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }

    debounceRef.current = window.setTimeout(async () => {
      const trimmedValue = value.trim();
      let resolvedLanguage: string | null = null;
      let detected: string | null = null;

      if (languageMode === "auto" && trimmedValue.length > 0) {
        const result = hljs.highlightAuto(value, detectSubset);

        if (
          result.language &&
          result.relevance >= HIGHLIGHT_RELEVANCE_THRESHOLD
        ) {
          detected = resolveShikiLanguage(result.language);
        }
      }

      if (languageMode === "manual" && manualLanguage) {
        resolvedLanguage = resolveShikiLanguage(manualLanguage);
      } else {
        resolvedLanguage = detected;
      }

      setDetectedLanguage(detected);

      if (!resolvedLanguage || !availableLanguageSet.has(resolvedLanguage)) {
        setHighlightedHtml(renderPlaintext(value));
        return;
      }

      const highlighter = await getHighlighter();
      const html = highlighter.codeToHtml(value, {
        lang: resolvedLanguage as BundledLanguage,
        theme: "vesper",
      });

      setHighlightedHtml(html || renderPlaintext(value));
    }, HIGHLIGHT_DEBOUNCE_MS);

    return () => {
      if (debounceRef.current) {
        window.clearTimeout(debounceRef.current);
      }
    };
  }, [value, languageMode, manualLanguage, detectSubset, isHighlighterReady]);

  useEffect(() => {
    const textarea = textareaRef.current;
    const highlight = highlightRef.current;

    if (!textarea || !highlight) {
      return;
    }

    const handleScroll = () => {
      highlight.scrollTop = textarea.scrollTop;
      highlight.scrollLeft = textarea.scrollLeft;
    };

    textarea.addEventListener("scroll", handleScroll);
    return () => {
      textarea.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleLanguageChange(nextValue: string) {
    if (nextValue === "auto") {
      setLanguageMode("auto");
      setManualLanguage(null);
      return;
    }

    setLanguageMode("manual");
    setManualLanguage(nextValue);
  }

  return (
    <div
      className={twMerge(
        "border border-border-primary overflow-hidden flex flex-col",
        className,
      )}
    >
      <div className="flex items-center gap-2 h-10 px-4 border-b border-border-primary">
        <span className="size-3 rounded-full bg-accent-red" />
        <span className="size-3 rounded-full bg-accent-amber" />
        <span className="size-3 rounded-full bg-accent-green" />
        <span className="flex-1" />
        <label className="flex items-center gap-2 font-mono text-[11px] text-text-tertiary">
          <span>Language</span>
          <select
            aria-label="Language"
            value={selectedLanguage}
            onChange={(event) => handleLanguageChange(event.target.value)}
            className="bg-bg-surface border border-border-primary rounded-md px-2 py-1 text-text-primary font-mono text-[11px] focus:outline-none focus:border-border-focus"
          >
            <option value="auto">{autoLabel}</option>
            {languageOptions.map((language) => (
              <option key={language.id} value={language.id}>
                {language.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-1 bg-bg-input">
        <div className="flex flex-col items-end gap-0 py-4 px-3 w-12 border-r border-border-primary bg-bg-surface select-none">
          {Array.from({ length: lineCount }, (_, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: line numbers are index-based and never reorder
              key={i}
              className="font-mono text-xs leading-[1.625] text-text-tertiary"
            >
              {i + 1}
            </span>
          ))}
        </div>

        <div className="relative flex-1 min-h-80">
          <div
            ref={highlightRef}
            className="absolute inset-0 overflow-auto py-4 px-4 font-mono text-xs leading-[1.625] text-text-primary whitespace-pre pointer-events-none [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!bg-transparent [&_.line]:leading-[1.625]"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: shiki generates trusted HTML from code strings client-side
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
          {value.length === 0 && (
            <div className="absolute inset-0 py-4 px-4 font-mono text-xs leading-[1.625] text-text-tertiary pointer-events-none">
              {"// paste your code here..."}
            </div>
          )}
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            spellCheck={false}
            className="absolute inset-0 w-full h-full py-4 px-4 bg-transparent font-mono text-xs leading-[1.625] text-transparent caret-text-primary outline-none resize-none whitespace-pre"
          />
        </div>
      </div>
    </div>
  );
}

export { CodeEditor, type CodeEditorProps };
