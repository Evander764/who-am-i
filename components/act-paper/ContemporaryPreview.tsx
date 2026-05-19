// §04 作品 01 · Contemporary-contact
// 内联手工重制原站首页关键元素，外层加画框 + LIVE PREVIEW 角标
// 模板源自 D:/software/Contemporary-contact/app/page.tsx

const LIVE_URL = "https://contemporary-contact.vercel.app/";

export default function ContemporaryPreview() {
  return (
    <section
      id="work-contemporary"
      className="section bg-paper"
      aria-labelledby="contemporary-title"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="section-eyebrow">SECTION · 04 · WORK 01</p>
        <div className="flex items-end justify-between flex-wrap gap-x-6 gap-y-2">
          <h2 id="contemporary-title" className="section-title">
            Contemporary-contact
          </h2>
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-faint">
            Next.js · Supabase · 临时号子
          </p>
        </div>
        <p className="mt-3 max-w-2xl text-ink-soft leading-relaxed">
          一个会过期的小群。开 60 分钟，聊完就散。
          没有账号，没有历史，没有云端复印——一次性聊天室。
        </p>

        <div className="preview-frame mt-12 p-2 sm:p-4">
          {/* —— 内嵌重制：仿 Contemporary-contact 首页 —— */}
          <div className="bg-paper">
            <div className="cc-banner">
              <span>CC · TEMPORARY ROOM · 当代联系</span>
              <span>PRIVATE · NO LOGS · NO ACCOUNTS · 60min</span>
              <span>v0.1 · cc-os / 2026.05</span>
            </div>

            <div className="flex items-center justify-center px-4 sm:px-6 py-10 lg:py-14">
              <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-x-10 lg:gap-x-16 gap-y-10 items-center">
                <section className="lg:col-span-7">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-ink-faint">
                    CC · 临 时 · ROOM
                  </p>
                  <h3
                    className="mt-4 font-serif italic text-ink leading-[0.95]"
                    style={{ fontSize: "clamp(2rem, 5vw, 5rem)" }}
                  >
                    来挂个
                    <br />
                    临时号子。
                  </h3>
                  <p
                    className="mt-5 max-w-md text-ink-soft leading-relaxed"
                    style={{ fontSize: "clamp(0.9rem, 1vw, 1.05rem)" }}
                  >
                    一个会过期的小群。开 60 分钟，聊完就散。
                    <br />
                    没有账号，没有历史，没有云端复印。
                  </p>
                  <p className="mt-8 font-mono text-[10px] tracking-[0.22em] uppercase text-ink-faint">
                    INVITE · ROOM + 6-DIGIT CODE
                  </p>
                </section>

                <section className="lg:col-span-5">
                  <div className="paper-card relative p-6">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-2">
                          01 · 开张
                        </p>
                        <h4 className="font-serif text-xl italic mb-3">
                          开个新号子
                        </h4>
                        <p className="text-xs text-ink-soft mb-5 leading-relaxed">
                          先递一张申请。批准后自动开房。
                        </p>
                        <span className="btn-stamp inline-block text-xs pointer-events-none opacity-90">
                          申请开张 →
                        </span>
                      </div>

                      <div className="sm:border-l sm:border-rule-soft sm:pl-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-2">
                          02 · 入伙
                        </p>
                        <h4 className="font-serif text-xl italic mb-3">
                          有人喊你了？
                        </h4>
                        <p className="text-xs text-ink-soft mb-5 leading-relaxed">
                          带上房号、当前邀请码、想叫的名字。
                        </p>
                        <span className="btn-soft inline-block text-xs pointer-events-none">
                          入伙 →
                        </span>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className="cc-banner">
              <span>FOR YOUR EYES ONLY</span>
              <span>—— CONTEMPORARY-CONTACT ——</span>
              <span>SIGNED · LOCALHOST</span>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-y-4 gap-x-6">
          <p className="text-sm text-ink-soft max-w-xl leading-relaxed">
            上面这块是手工内嵌的预览，仅展示视觉。真实站点支持申请开房、邀请码、6 位
            recovery code 自我恢复——开 60 分钟，到点解散。
          </p>
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-stamp inline-block"
          >
            访问线上版本 →
          </a>
        </div>
      </div>
    </section>
  );
}
