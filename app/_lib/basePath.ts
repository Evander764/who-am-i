// GitHub Pages 项目站点部署在子路径下（例如 /who-am-i）。
// next/image 在 unoptimized 模式下不会自动给 public 资源加 basePath，
// 因此这些静态资源路径需要手动加前缀。
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** 给以 "/" 开头的 public 静态资源路径加上部署子路径前缀。 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}
