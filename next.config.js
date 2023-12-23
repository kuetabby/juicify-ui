/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/uploads/:path*",
                destination: "https://content-api.changenow.io/uploads/:path*", // Proxy to Backend
            },
            {
                source: "/mixer/:path*",
                destination: "https://api.changenow.io/v2/:path*", // Proxy to Backend
            },
        ];
    },
}

module.exports = nextConfig
