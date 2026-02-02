/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "cdn.dummyjson.com",
      port: "",        // optional, leave empty for default
      pathname: "/**"  // allows all paths on that host
    },
  ],
},

};

export default nextConfig;
