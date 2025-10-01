import type { NextConfig } from "next";
import { apiUrl } from "./constants";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [`${apiUrl}`],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "natural-star-785372fcb6.strapiapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
