"use client";

import React, { useEffect, useMemo, useState } from "react";

type Option = {
  id: string;
  label: string;
  isCorrect: boolean;
};

type QuizModuleProps = {
  promptSound?: string;
  correctLetter?: string;
  distractors?: string[];
  onAnswer?: (isCorrect: boolean, chosen: string) => void;
};

const DEFAULT_DISTRACTORS = ["ㅓ", "ㅗ", "ㅜ"] as const;

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function HangulSoundChoiceModule({
  promptSound = "ah",
  correctLetter = "ㅏ",
  distractors,
  onAnswer,
}: QuizModuleProps) {
  const [picked, setPicked] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);
  const [options, setOptions] = useState<Option[] | null>(null);

  // Make sure we always use a stable distractor list
  const safeDistractors = useMemo(() => {
    return (distractors?.length ? distractors : [...DEFAULT_DISTRACTORS]).slice(0, 3);
  }, [distractors]);

  // Deterministic base options (no randomness here)
  const baseOptions: Option[] = useMemo(() => {
    return [
      { id: "correct", label: correctLetter, isCorrect: true },
      ...safeDistractors.map((d, idx) => ({
        id: `d${idx}`,
        label: d,
        isCorrect: false,
      })),
    ];
  }, [correctLetter, safeDistractors]);

  // Shuffle only after mount OR when the question changes
  useEffect(() => {
    setOptions(shuffle(baseOptions));
    setPicked(null);
    setLocked(false);
  }, [baseOptions]);

  const feedback = useMemo(() => {
    if (!locked || !picked || !options) return null;
    const chosen = options.find((o) => o.label === picked);
    if (!chosen) return null;
    return chosen.isCorrect
      ? { text: "Correct ✅", tone: "text-emerald-700" }
      : { text: `Not quite ❌ (answer: ${correctLetter})`, tone: "text-rose-700" };
  }, [locked, picked, options, correctLetter]);

  function choose(opt: Option) {
    if (locked) return;
    setPicked(opt.label);
    setLocked(true);
    onAnswer?.(opt.isCorrect, opt.label);
  }

  function reset() {
    setOptions(shuffle(baseOptions));
    setPicked(null);
    setLocked(false);
  }

  if (!options) {
    return (
      <div className="w-full max-w-2xl rounded-2xl border bg-white p-5 shadow-sm">
        Loading…
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl rounded-2xl border bg-white p-5 shadow-sm">
      <div className="space-y-1">
        <p className="text-sm text-zinc-600">Question</p>
        <h2 className="text-xl font-semibold text-zinc-900">
          Which letter is{" "}
          <span className="rounded-md bg-zinc-100 px-2 py-1">{promptSound}</span>{" "}
          in Korean?
        </h2>
        <p className="text-sm text-zinc-600">Tap one of the 4 rectangles.</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isPicked = picked === opt.label;
          const showCorrect = locked && opt.isCorrect;
          const showWrongPicked = locked && isPicked && !opt.isCorrect;

          const ring = showCorrect
            ? "ring-2 ring-emerald-500"
            : showWrongPicked
            ? "ring-2 ring-rose-500"
            : isPicked
            ? "ring-2 ring-zinc-400"
            : "ring-1 ring-zinc-200";

          return (
            <button
              key={opt.id}
              onClick={() => choose(opt)}
              className={
                "group relative flex h-24 items-center justify-center rounded-2xl bg-zinc-50 text-3xl font-semibold text-zinc-900 shadow-sm transition " +
                "hover:-translate-y-0.5 hover:bg-white active:translate-y-0 focus:outline-none " +
                ring
              }
              aria-pressed={isPicked}
              type="button"
            >
              {opt.label}
              {locked && opt.isCorrect && (
                <span className="absolute right-3 top-3 text-sm">✅</span>
              )}
              {locked && isPicked && !opt.isCorrect && (
                <span className="absolute right-3 top-3 text-sm">❌</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm">
          {feedback ? (
            <span className={"font-medium " + feedback.tone}>{feedback.text}</span>
          ) : (
            <span className="text-zinc-600">Choose an option to see feedback.</span>
          )}
        </div>

        <button
          type="button"
          onClick={reset}
          className="rounded-xl border bg-white px-3 py-2 text-sm font-medium text-zinc-800 shadow-sm transition hover:bg-zinc-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}