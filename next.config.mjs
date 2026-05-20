/** @type {import('next').NextConfig} */

// GitHub Pages 项目站点部署在子路径下（例如 /who-am-i）。
// 构建时通过环境变量注入，本地 dev/build 留空即可。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
