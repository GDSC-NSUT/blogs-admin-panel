/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
module.exports = removeImports({
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "wrfwbnoxcszcsmoxwhrn.supabase.co",
                port: '',
                pathname: '/**',
            }
        ]
    }
});