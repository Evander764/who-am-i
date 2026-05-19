// 一次性脚本：把 picture/重装宿舍/<hash>.jpg 按 mtime 排序，
// 复制到 public/images/dorm/01.jpg … 18.jpg
// 不删除原文件，只复制重命名。
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const src = path.join(root, "picture", "重装宿舍");
const dst = path.join(root, "public", "images", "dorm");

async function main() {
  const entries = await fs.readdir(src);
  const files = entries.filter((f) => /\.(jpe?g|png)$/i.test(f));
  const stats = await Promise.all(
    files.map(async (f) => {
      const p = path.join(src, f);
      const s = await fs.stat(p);
      return { name: f, path: p, mtime: s.mtimeMs };
    }),
  );
  stats.sort((a, b) => a.mtime - b.mtime);

  await fs.mkdir(dst, { recursive: true });

  let i = 1;
  for (const f of stats) {
    const ext = path.extname(f.name).toLowerCase().replace("jpeg", "jpg");
    const target = path.join(dst, `${String(i).padStart(2, "0")}${ext === ".jpg" ? ".jpg" : ext}`);
    await fs.copyFile(f.path, target);
    console.log(`${String(i).padStart(2, "0")}  ←  ${f.name}`);
    i += 1;
  }
  console.log(`\n✓ 复制完成：共 ${stats.length} 张 → ${path.relative(root, dst)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
