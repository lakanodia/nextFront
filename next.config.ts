import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] || "";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  trailingSlash: true,
  basePath: isGithubActions ? `/${repo}` : "",
  assetPrefix: isGithubActions ? `/${repo}` : "",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "natural-star-785372fcb6.strapiapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/publications",
        destination: "/en/publications",
        permanent: false,
      },      
    ];
  },
};

export default nextConfig;
