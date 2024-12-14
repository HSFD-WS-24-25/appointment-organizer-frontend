/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@": path.resolve("./"), // For "@/..."
        };
        return config;
    },
};

export default nextConfig;
