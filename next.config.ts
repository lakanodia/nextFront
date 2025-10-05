import type { NextConfig } from "next";
import { apiUrl } from "./constants";


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
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
