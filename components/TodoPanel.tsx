"use client";

const ITEMS: string[] = [];

export default function TodoPanel() {
  if (process.env.NODE_ENV === "production") return null;
  if (ITEMS.length === 0) return null;
  return (
    <details className="todo-panel">
      <summary>· TODO ·</summary>
      <ul>
        {ITEMS.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
    </details>
  );
}
