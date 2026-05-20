type Props = {
  caption?: string;
  lang?: string;
  code: string;
  variant?: "media" | "inline";
};

/**
 * 终端风代码块。
 * - variant="media"：占满 .media-frame 容器（CC 当主视觉用）
 * - variant="inline"：克制的小卡片，放在文字列底部（Timetable 当附加亮点）
 */
export default function CodeSnippet({
  caption,
  lang = "ts",
  code,
  variant = "media",
}: Props) {
  const lines = code.replace(/\n+$/, "").split("\n");
  const padW = String(lines.length).length;

  return (
    <div className={`code-block code-block--${variant}`}>
      {caption ? (
        <div className="code-caption">
          <span className="code-caption-bracket">[</span>
          <span className="code-caption-text">
            <span className="code-caption-tag">SRC</span> · {caption}
          </span>
          <span className="code-caption-bracket">]</span>
        </div>
      ) : null}
      <pre className="code-pre" aria-label={`${caption ?? "code"} (${lang})`}>
        <code className="code-content">
          {lines.map((ln, i) => (
            <div key={i} className="code-line">
              <span className="code-ln" aria-hidden>
                {String(i + 1).padStart(padW, " ")}
              </span>
              <span className="code-src">{ln === "" ? " " : ln}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
